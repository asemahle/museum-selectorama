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
    let params = {
        x: point.x,
        y: point.y
    };
    window.location.assign("/goodbye/04-input-feelings-after?x=" + encodeURIComponent(point.x) + "&y=" + encodeURIComponent(point.y));
});

// go back to intro after timeout
SetExitTimer('00-welcome-back');