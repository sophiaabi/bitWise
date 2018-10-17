document.getElementById("app").innerHTML = `
<h1>Hello Parcel!</h1>
<div>
   for more info about Parcel.
</div>
`;


function onTestChange() {
  var key = window.event.keyCode;

  // If the user has pressed enter
  if (key === 13) {
  		var text = document.getElementById("textbox");
      alert("your text was " + text.value);
      return false;
  }
  else {
      return true;
  }
}