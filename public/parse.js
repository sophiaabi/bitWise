var UNARY_OPERATORS = ['~', '!'];
var BINARY_OPERATORS = ['&&', '||', '<<', '>>>', '^', '&', '|', '>>'];
var DECIMAL_REGEX = new RegExp(/-?\d+/);
var HEX_REGEX = new RegExp(/0x[\da-zA-Z]+/)

class EquationObj {
  static parseIncomingText(text) {
    //strip spaces
    var newStr = text.replace(/\s+/g, '');
    for (let op of UNARY_OPERATORS) {
      var index = newStr.indexOf(op);
      if (index >= 0) {
        return ([op , newStr.substring(index+op.length)]);
      }
    }
    for (let op of BINARY_OPERATORS) {
      var index = newStr.indexOf(op);
      if (index >= 0) {
        return ([newStr.slice(0, index), newStr.substring(index, index+op.length), newStr.slice(index+op.length)]);
      }
    }
    return {};
  }

  isValid() {
    var ret = (this.firstVal != "" && this.firstBase != "" && this.operator != "");
    if (this.isUnaryEquation())
      return ret;
    else
      return (ret && this.secondVal != "" && this.secondBase != "");
  }

  isUnaryEquation() {
    return this.isUnary;
  }

  getResult() {
    if (this.isUnaryEquation())
        return this.findUnarySolution();
    else
        return this.findBinarySolution();
  }

  static getBase(val) {
    if (DECIMAL_REGEX.test(val))
      return 'd';
    if (HEX_REGEX.test(val))
      return 'h';
    return "";
  }

  static getOperator(op, opList) {
    if (opList.includes(op))
      return op;
    return "";
  }

  findUnarySolution() {
      switch (this.operator) {
        case '~':
          return ~this.firstVal;
        case '!':
          return !this.firstVal;
        default:
          throw `Unary Parsing Failed. Op: {${this.operator}}. Arg: {${this.firstVal}}`;
      }
    }

  findBinarySolution() {
    switch (this.operator) {
      case '&': 
        return this.firstVal & this.secondVal;
      case '&&': 
        return this.firstVal && this.secondVal;
      case '|': 
        return this.firstVal | this.secondVal;
      case '||': 
        return this.firstVal || this.secondVal;
      case '<<': 
        return this.firstVal << this.secondVal;
      case '>>': 
        return this.firstVal >> this.secondVal;
      case '>>>': 
        return this.firstVal >>> this.secondVal;
      case '^':
        return this.firstVal ^ this.secondVal;
      default:
        throw `Binary Parsing Failed. Op: {${this.operator}}. Args: {${this.firstVal}, ${this.secondVal}}`;
    }
  }
  constructor(text) {
    var argList = EquationObj.parseIncomingText(text);
    console.log(argList);
    if (argList.length === 2) {
      this.firstVal = argList[1];
      this.firstBase = EquationObj.getBase(argList[1]);
      this.operator = EquationObj.getOperator(argList[0], UNARY_OPERATORS);
      this.isUnary = true;
    }
    else if (argList.length === 3) {
      this.firstVal = argList[0];
      this.firstBase = EquationObj.getBase(argList[0]);
      this.secondVal = argList[2];
      this.secondBase = EquationObj.getBase(argList[2]);
      this.operator = EquationObj.getOperator(argList[1], BINARY_OPERATORS);
      this.isUnary = false;
    }
    else {
      this.firstVal = this.secondVal = this.firstBase = this.secondBase = this.operator = ""
    }
  }
}

function onKeyTyped() {
  $.ajax({
  url: '/fuck',
  data: {"shit": "fuck"},
  success: function(data) {
    console.log(data);
  }
});

  var currentText = document.getElementById('textbox').value;
  var equationObj = new EquationObj(currentText);
  if (equationObj.isValid()) {
    updateResultDiv(equationObj);
  }
}

function updateResultDiv(equationObj) {
  var result = equationObj.getResult();
  resultSpan.textContent = result;
  resultSpan.setAttribute('truthy', String(!!result));
}

document.getElementById('textbox').addEventListener('input', onKeyTyped);

