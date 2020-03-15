"use strict";

var s = window.location.href;
var name = decodeURIComponent(s.substr(s.indexOf("?name=") + 6));

function run() {
    // set the name
    document.getElementById("name").innerText = name; // go back on 'restart'

    document.getElementById("restart").addEventListener("click", function () {
        window.location.assign("/hello/01-hello");
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
            window.location.assign("/hello/03-thank-you?name=" + encodeURIComponent(name));
        }

        var xmlhttp = new XMLHttpRequest(); // new HttpRequest instance

        var theUrl = "/data";
        xmlhttp.addEventListener("load", reqListener);
        xmlhttp.open("POST", theUrl);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.send(JSON.stringify({
            displayID: name,
            x: point.x,
            y: point.y
        }));
    }); // go back to intro after timeout

    SetExitTimer('01-hello');
}