var operator_DOM = document.getElementById("operator");
var n1_DOM = document.getElementById("n1");
var n2_DOM = document.getElementById("n2");
var output_DOM = document.getElementById("output");

function parseTheThing(n1string, n2string, operatorString) {
  // do code
  return n1string + n2string + operatorString; // TODO this
}

function thingToDoWhenParametersChange() {
  // console.log("Numbers are now: " + n1_DOM.value + " and " + n2_DOM.value + " and operator is now: " + operator_DOM.value);
  var new_output = parseTheThing(n1_DOM.value, n2_DOM.value, operator.value);
  var i = 0;
  var outputInterval = setInterval(function() {
    output_DOM.innerHTML = new_output.slice(0, i).replace(/0/g, '<span style="color: red;">0</span>').replace(/1/g, '<span style="color: blue;">1</span>')
    i++;
    if(i == new_output.length) {
      clearInterval(outputInterval);
    }
  }, 100);
}

operator_DOM.onchange = thingToDoWhenParametersChange;
n1.onchange = thingToDoWhenParametersChange;
n2.onchange = thingToDoWhenParametersChange;
