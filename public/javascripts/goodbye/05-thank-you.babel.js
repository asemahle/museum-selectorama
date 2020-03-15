"use strict";

// go back to intro on click 'exit'
document.getElementById("exit").addEventListener("click", Exit('00-welcome-back')); // go back to intro after 30seconds

SetExitTimer('00-welcome-back', 30 * 1000);