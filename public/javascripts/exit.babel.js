"use strict";

function Exit() {
    var where = window.location.href.substring(0, window.location.href.lastIndexOf('/')) + "/01-hello";
    window.location.assign(where);
}

function SetExitTimer() {
    var when = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5 * 60 * 1000;
    setTimeout(Exit, when);
}