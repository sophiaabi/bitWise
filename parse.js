var UNARY_OPERATORS = ['~', '!'];
var BINARY_OPERATORS = ['&', '&&', '|', '||', '<<', '>>', '>>>', '^'];
var NOT_AVAILABLE = "N/A";
var DECIMAL_REGEX = new RegExp(/-?\d+/);
//var HEX_REGEX = /0xblahblah/;


function onKeyTyped() {
  var currentText = document.getElementById('textbox').value;

  var argList = parseCurrentText(currentText);

  var isSolvable = areArgsValid(argList) && isOperatorValid(argList);

  updateResultDiv(argList, isSolvable);

}

function parseCurrentText(currentText) {
  return currentText.split(' ').filter(val => val.length !== 0); //remove empty strings
}

function areArgsValid(argList) {
  if (argList.length === 2 && DECIMAL_REGEX.test(argList[1])) {
    argSpan.textContent = `{${argList[1]}}`; //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
    //binary rep
    return true;
  }
  if (argList.length === 3 && DECIMAL_REGEX.test(argList[0]) && DECIMAL_REGEX.test(argList[2])) {
    argSpan1.textContent = `${argList[0]}`;
    argSpanB1.textContent = addLeadingZeroes((+argList[0]).toString(2));  //binary rep

    argSpan2.textContent = `${argList[2]}`;
    argSpanB2.textContent = addLeadingZeroes((+argList[2]).toString(2));  //bimary rep
    return true;
  }

  argSpan1.textContent = NOT_AVAILABLE;
  argSpan2.textContent = NOT_AVAILABLE;
  return false;
}

function isOperatorValid(argList) {
  if (argList.length === 2 && $.inArray(argList[0], UNARY_OPERATORS) > -1) { //$.inArray() is JQuery
    operatorSpan.textContent = argList[0];
    return true;
  }
  if (argList.length === 3 && $.inArray(argList[1], BINARY_OPERATORS) > -1) {
    operatorSpan.textContent = argList[1];
    return true;
  }

  operatorSpan.textContent = NOT_AVAILABLE;
  return false;
}

function updateResultDiv(argList, isSolvable) {
  if (isSolvable) {
    var result, firstInt, secondInt, operator;
    if (argList.length < 3) { //unary
      operator = argList[0];
      firstInt = ""; //hide first
      secondInt = parseInt(argList[1]);
      result = findUnarySolution(operator, secondInt);
    }
    else { //binary
      operator = argList[1];
      firstInt = parseInt(argList[0]);
      secondInt = parseInt(argList[2]);
      result = findBinarySolution(operator, firstInt, secondInt);
    }

    operatorSpan.textContent = operator;

    firstIntSpan.textContent = firstInt; firstIntSpan.setAttribute('truthy', String(!!firstInt));
    secondIntSpan.textContent = secondInt; secondIntSpan.setAttribute('truthy', String(!!secondInt));
    resultSpan.textContent = result; resultSpan.setAttribute('truthy', String(!!result));

    // resultDiv.style.display = 'block';
  }
  else {
    // resultDiv.style.display = 'none';
  }
}

function findUnarySolution(operatorString, firstInt) {
  switch (operatorString) {
    case '~':
      opname.textContent = " NOT";
      return ~firstInt;
    case '!':
      opname.textContent = " BINARY NOT";
      return !firstInt;
    default:
      throw `Unary Parsing Failed. Op: {${operatorString}}. Arg: {${firstInt}}`;
  }
}

function findBinarySolution(operatorString, firstInt, secondInt) {
  switch (operatorString) {
    case '&':
      opname.textContent = " AND";
      return firstInt & secondInt;
    case '&&':
      opname.textContent = " LOGICAL AND";
      return firstInt && secondInt;
    case '|':
      opname.textContent = " OR";
      return firstInt | secondInt;
    case '||':
      opname.textContent = " LOGICAL OR";
      return firstInt || secondInt;
    case '<<':
      opname.textContent = " LEFT SHIFT";
      return firstInt << secondInt;
    case '>>':
      opname.textContent = " ARITHMETIC RIGHT SHIFT";
      return firstInt >> secondInt;
    case '>>>':
      opname.textContent = " LOGICAL RIGHT SHIFT";
      return firstInt >>> secondInt;
    case '^':
      opname.textContent = " XOR";
      return firstInt ^ secondInt;
    default:
      throw `Binary Parsing Failed. Op: {${operatorString}}. Args: {${firstInt}, ${secondInt}}`;
  }
}

function addLeadingZeroes(binValue) {
  console.log(binValue);
  console.log(typeof(binValue)); //string
  console.log(binValue.length);

  switch (binValue.length % 8) {
    case 0:
      console.log("worked");
      return binValue;
    case 1:
      console.log("worked");
      return "0000000" + binValue;
    case 2:
      console.log("worked");
      return "000000" + binValue;
    case 3:
      console.log("worked");
      return "00000" + binValue;
    case 4:
      console.log("worked");
      return "0000" + binValue;
    case 5:
      console.log("worked");
      return "000" + binValue;
    case 6:
      console.log("worked");
      return "00" + binValue;
    case 7:
      console.log("worked");
      return "0" + binValue;
    default:
      console.log("Ya done goofed");
  }
}
