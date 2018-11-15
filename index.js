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

var express = require('express');
var app = express();

app.get('/', function (request, response) {
   // render the views/index.ejs template file
   response.render('index', {title: 'fuck'})
});

module.exports = app;