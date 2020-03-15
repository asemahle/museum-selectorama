"use strict";

var s = window.location.href;
var name = s.substr(s.indexOf("?name=") + 6); // set the name

document.getElementById("name").innerText = name; // go back to intro on click 'exit'

document.getElementById("exit").addEventListener("click", Exit); // go back to intro after 30seconds

SetExitTimer(30 * 1000);