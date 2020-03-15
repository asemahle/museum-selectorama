"use strict";

function Exit(location) {
    return function () {
        var where = window.location.href.substring(0, window.location.href.lastIndexOf('/')) + "/" + location;
        window.location.assign(where);
    };
}

function SetExitTimer(location) {
    var when = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5 * 60 * 1000;
    setTimeout(Exit(location), when);
}