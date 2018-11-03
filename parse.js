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
    argDebugSpan.textContent = `{${argList[1]}}`; //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
    return true;
  }
  if (argList.length === 3 && DECIMAL_REGEX.test(argList[0]) && DECIMAL_REGEX.test(argList[2])) {
    argDebugSpan.textContent = `{${argList[0]}, ${argList[2]}}`;
    return true;
  }
  
  argDebugSpan.textContent = NOT_AVAILABLE;
  return false;
}

function isOperatorValid(argList) {
  if (argList.length === 2 && $.inArray(argList[0], UNARY_OPERATORS) > -1) { //$.inArray() is JQuery
    operatorDebugSpan.textContent = argList[0];
    return true;
  }
  if (argList.length === 3 && $.inArray(argList[1], BINARY_OPERATORS) > -1) {
    operatorDebugSpan.textContent = argList[1];
    return true;
  }
  
  operatorDebugSpan.textContent = NOT_AVAILABLE;
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
    
    resultDiv.style.display = 'block';
  }
  else {
    resultDiv.style.display = 'none';
  }
}

function findUnarySolution(operatorString, firstInt) {
  switch (operatorString) {
    case '~':
      return ~firstInt;
    case '!':
      return !firstInt;
    default:
      throw `Unary Parsing Failed. Op: {${operatorString}}. Arg: {${firstInt}}`;
  }
}

function findBinarySolution(operatorString, firstInt, secondInt) {
  switch (operatorString) {
    case '&': 
      return firstInt & secondInt;
    case '&&': 
      return firstInt && secondInt;
    case '|': 
      return firstInt | secondInt;
    case '||': 
      return firstInt || secondInt;
    case '<<': 
      return firstInt << secondInt;
    case '>>': 
      return firstInt >> secondInt;
    case '>>>': 
      return firstInt >>> secondInt;
    case '^':
      return firstInt ^ secondInt;
    default:
      throw `Binary Parsing Failed. Op: {${operatorString}}. Args: {${firstInt}, ${secondInt}}`;
  }
}