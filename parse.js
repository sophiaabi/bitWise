var SINGLE_OPERATORS = ['~', '!'];
var DOUBLE_OPERATORS = ['&', '&&', '|', '||', '<<', '>>', '>>>', '^'];
var NOT_AVAILABLE = "N/A";
var DECIMAL_REGEX = new RegExp(/-?\d+/);
//var HEX_REGEX = /0xblahblah/;

function onKeyTyped() {
  var currentText = document.getElementById('textbox').value;

  var argList = parseCurrentText(currentText);

  var isSolvable = true;
  isSolvable &= areArgsValid(argList);
  isSolvable &= isOperatorValid(argList);

  updateResultSpan(argList, isSolvable);

}

function parseCurrentText(currentText) {
  return currentText.split(' ').filter(val => val.length != 0); //remove empty strings
}

function areArgsValid(argList) {
  if (argList.length === 2 && DECIMAL_REGEX.test(argList[1])) {
    argCountSpan.textContent = "{" + argList[1] + "}";
    return true;
  }
  if (argList.length === 3 && DECIMAL_REGEX.test(argList[0]) && DECIMAL_REGEX.test(argList[2])) {
    argCountSpan.textContent = "{" + argList[0] + ", " + argList[2] + "}";
    return true;
  }
  
  argCountSpan.textContent = NOT_AVAILABLE;
  return false;
}

function isOperatorValid(argList) {
  if (argList.length === 2 && $.inArray(argList[0], SINGLE_OPERATORS) > -1) { //$.inArray() is JQuery
    operatorSpan.textContent = argList[0];
    return true;
  }
  else if (argList.length === 3 && $.inArray(argList[1], DOUBLE_OPERATORS) > -1) {
    operatorSpan.textContent = argList[1];
    return true;
  }
  
  operatorSpan.textContent = NOT_AVAILABLE;
  return false;
}

function updateResultSpan(argList, isSolvable) {
  if (isSolvable) {
    if (argList.length === 2) {
      var firstInt = parseInt(argList[1]);
      switch (argList[0]) {
        case '~':
          resultSpan.textContent = ~firstInt;
          break;
        case '!':
          resultSpan.textContent = !firstInt;
          break;
      }
    }
    else if (argList.length === 3) {
      var firstInt = parseInt(argList[0]);
      var secondInt = parseInt(argList[2]);

      switch (argList[1]) {
        case '&': 
          resultSpan.textContent = firstInt & secondInt;
          break;
        case '&&': 
          resultSpan.textContent = firstInt && secondInt;
          break;
        case '|': 
          resultSpan.textContent = firstInt | secondInt;
          break;
        case '||': 
          resultSpan.textContent = firstInt || secondInt;
          break;
        case '<<': 
          resultSpan.textContent = firstInt << secondInt;
          break;
        case '>>': 
          resultSpan.textContent = firstInt >> secondInt;
          break;
        case '>>>': 
          resultSpan.textContent = firstInt >>> secondInt;
          break;
        case '^':
          resultSpan.textContent = firstInt ^ secondInt;
          break;
      }
    }
  }

  else resultSpan.textContent = NOT_AVAILABLE;
}