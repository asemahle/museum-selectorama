let s = window.location.href;
let oldX = decodeURIComponent(s.substring(s.indexOf("?x=") + 3, s.indexOf("&")));
let oldY = decodeURIComponent(s.substr(s.indexOf("&y=") + 3));

// go back on 'restart'
document.getElementById("restart").addEventListener("click", function() {
    window.location.assign("/goodbye/00-welcome-back");
});

// selection area controls
let point = {x: 0, y: 0};
let nextElem = document.getElementById("next");
let eventElem = document.getElementById("selection-events");
eventElem.addEventListener('update', function(e) {
    point.x = e.detail.x;
    point.y = e.detail.y;
    nextElem.classList.remove("hide");
});

// go forward on 'done'
document.getElementById("next").addEventListener("click", function() {
    function reqListener () {
        window.location.assign("/goodbye/05-thank-you");
    }

    let xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
    let theUrl = '/data/fullAdd';
    xmlhttp.addEventListener("load", reqListener);
    xmlhttp.open("POST", theUrl);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify({
        x1: oldX,
        y1: oldY,
        x2: point.x,
        y2: point.y
    }));
});

// go back to intro after timeout
SetExitTimer('00-welcome-back');
