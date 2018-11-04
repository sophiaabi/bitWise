var UNARY_OPERATORS = ['~', '!'];
var BINARY_OPERATORS = ['&', '&&', '|', '||', '<<', '>>', '^'];
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
  
  //return currentText.split(' ').filter(val => val.length !== 0); //remove empty strings
  var string = currentText.replace(/\s/g,'');
  var operator='';
  for(var i=0; i<2; i++)
  {
      if(string.includes(UNARY_OPERATORS[i]))
      {
        operator=UNARY_OPERATORS[i];
      }
  }
  for(var int i=0; i<7; i++)
  {
    if(string.includes(BINARY_OPERATORS[i]))
      {
        operator=BINARY_OPERATORS[i];
      }
  }
   var array=string.split(operator).filter(val => val.length !== 0);
   array[array.length]=operator;
   return array;
  
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
      operator = argList[1];
      firstInt = ""; //hide first
      if(argList[0].substring(0,1)=='b')
      {
        argList[0].replace('b','');
        secondInt=(argList[0].tostring(2));
      }
      else
      {
        secondInt = parseInt(argList[0]);
      }
      result = findUnarySolution(operator, secondInt);
    }
    else { //binary
      operator = argList[2];
      if(argList[0].substring(0,1)=='b')
      {
        argList[0].replace('b','');
        firstInt=(argList[0].tostring(2));
      }
      else
      {
        firstInt = parseInt(argList[0]);
      }
      if(argList[1].substring(0,1)=='b')
      {
        argList[1].replace('b','');
        secondInt=(argList[1].tostring(2));
      }
      else
      {
        secondInt = parseInt(argList[1]);
      }
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
      return (~firstInt).tostring(2);
    case '!':
      return (!firstInt).tostring(2);
    default:
      throw `Unary Parsing Failed. Op: {${operatorString}}. Arg: {${firstInt}}`;
  }
}

function findBinarySolution(operatorString, firstInt, secondInt) {
  switch (operatorString) {
    case '&': 
      return (firstInt & secondInt).tostring(2);
    case '&&': 
      return (firstInt && secondInt).tostring(2);
    case '|': 
      return (firstInt | secondInt).tostring(2);
    case '||': 
      return (firstInt || secondInt).tostring(2);
    case '<<': 
      return (firstInt << secondInt).tostring(2);
    case '>>': 
      return (firstInt >> secondInt).tostring(2);
    // case '>>>': 
    //   return (firstInt >>> secondInt).tostring(2);
    case '^':
      return (firstInt ^ secondInt).tostring(2);
    default:
      throw `Binary Parsing Failed. Op: {${operatorString}}. Args: {${firstInt}, ${secondInt}}`;
  }
}
