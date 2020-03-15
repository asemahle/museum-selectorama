"use strict";

var s = window.location.href;
var id = decodeURIComponent(s.substring(s.indexOf("?id=") + 4, s.indexOf("&")));
var name = decodeURIComponent(s.substr(s.indexOf("&name=") + 6)); // set the name

document.getElementById("name").innerText = name; // go back on 'restart'

document.getElementById("restart").addEventListener("click", function () {
    window.location.assign("/goodbye/00-welcome-back");
}); // selection area controls

var point = {
    x: 0,
    y: 0
};
var nextElem = document.getElementById("next");
var eventElem = document.getElementById("selection-events");
eventElem.addEventListener('update', function (e) {
    point.x = e.detail.x;
    point.y = e.detail.y;
    nextElem.classList.remove("hide");
}); // go forward on 'done'

document.getElementById("next").addEventListener("click", function () {
    function reqListener() {
        window.location.assign("/goodbye/05-thank-you");
    }

    var xmlhttp = new XMLHttpRequest(); // new HttpRequest instance

    var theUrl = '/data/complete/' + id;
    xmlhttp.addEventListener("load", reqListener);
    xmlhttp.open("POST", theUrl);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify({
        userID: id,
        x: point.x,
        y: point.y
    }));
}); // go back to intro after timeout

SetExitTimer('00-welcome-back');