"use strict";

{
    setInterval(function () {
        var $img = document.getElementById("img");
        var bounds = $img.getBoundingClientRect();
        var $p = document.getElementById("selection-area-padding");
        var $e = document.getElementById("selection-area");
        var top = 0.13;
        var bottom = 0.84;
        var left = 0.14;
        var right = 0.88;
        $p.style.paddingTop = bounds.height * top + "px";
        $p.style.paddingBottom = bounds.height * (1 - bottom) + "px";
        $p.style.paddingLeft = bounds.width * left + "px";
        $p.style.paddingRight = bounds.width * (1 - right) + "px";
        $e.style.width = bounds.width * (right - left) + "px";
        $e.style.height = bounds.height * (bottom - top) + "px";
    }, 500);
    var mousedown = false;
    var eventElem = document.getElementById("selection-events");
    var first = true;

    var update = function update(pos) {
        if (!mousedown) return;
        var $e = document.getElementById("selection-area");

        if (first) {
            first = false;
            var $parentDot = document.getElementById("dot-spawn").getElementsByClassName("dot")[0];

            var _$dot = $parentDot.cloneNode(true);

            _$dot.classList.add('active-dot');

            $e.appendChild(_$dot);
        }

        var $dot = $e.getElementsByClassName("active-dot")[0];
        var dotBounds = $dot.getBoundingClientRect();
        var bounds = $e.getBoundingClientRect();
        var dotPos = {
            x: clamp(pos.pageX - bounds.left, 0, bounds.width) - dotBounds.width / 2,
            y: clamp(pos.pageY - bounds.top - window.scrollY, 0, bounds.height) - dotBounds.height / 2
        };
        $dot.style.left = dotPos.x + "px";
        $dot.style.top = dotPos.y + "px";
        var minx = 0 - dotBounds.width / 2;
        var maxx = bounds.width - dotBounds.width / 2;
        var miny = 0 - dotBounds.height / 2;
        var maxy = bounds.height - dotBounds.height / 2;
        var x = (dotPos.x - minx) / (maxx - minx) * 2 - 1;
        var y = (dotPos.y - miny) / (maxy - miny) * -2 + 1;
        var event = new CustomEvent("update", {
            detail: {
                x: x,
                y: y
            }
        });
        eventElem.dispatchEvent(event);
    };
    /* events handling to control the surface */
    // mouse controls


    document.getElementById("selection-area-padding").addEventListener('mousemove', update);
    document.getElementById("selection-area-padding").addEventListener('mousedown', function (e) {
        mousedown = true;
        update(e);
    }); // touch controls

    document.getElementById("selection-area-padding").addEventListener('touchmove', function (e) {
        update({
            pageX: e.changedTouches[0].pageX,
            pageY: e.changedTouches[0].pageY
        });
        e.preventDefault();
    }, {
        passive: false
    });
    document.getElementById("selection-area-padding").addEventListener('touchstart', function (e) {
        mousedown = true;
        update({
            pageX: e.changedTouches[0].pageX,
            pageY: e.changedTouches[0].pageY
        });
        e.preventDefault();
    }); // detect finger/mouse up

    ['mousedown', 'touchstart'].forEach(function (eventType) {
        document.body.addEventListener(eventType, function () {
            mousedown = true;
        });
    }); //detect finger/mouse down

    ['mouseup', 'touchend', 'touchcancel'].forEach(function (eventType) {
        document.body.addEventListener(eventType, function () {
            mousedown = false;
        });
    });
}