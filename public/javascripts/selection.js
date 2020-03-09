{
    let mousedown = false;

    let eventElem = document.getElementById("selection-events");
    let first = true;

    let update = function(e) {
        if (!mousedown) return;

        let $e = document.getElementById("selection-area");
        if (first) {
            first = false;
            let $parentDot = document.getElementById("dot-spawn").getElementsByClassName("dot")[0];
            let $dot = $parentDot.cloneNode(true);
            $e.prepend($dot);
        }
        let $dot = $e.getElementsByClassName("dot")[0];
        const dotBounds = $dot.getBoundingClientRect();
        let bounds = $e.getBoundingClientRect();
        let dotPos = {
            x: clamp(e.pageX, bounds.x, bounds.x + bounds.width) - dotBounds.width/2,
            y: clamp(e.pageY, bounds.y, bounds.y + bounds.height) - dotBounds.height/2
        };


        $dot.style.left = dotPos.x + "px";
        $dot.style.top = dotPos.y + "px";

        let x = ((dotPos.x + dotBounds.width/2 - bounds.x) / bounds.width) * 2 - 1;
        let y = ((dotPos.y + dotBounds.height/2 - bounds.y) / bounds.height) * -2 + 1;

        let event = new CustomEvent("update", {
            detail: {
                x: x,
                y: y
            }
        });
        eventElem.dispatchEvent(event);
    };

    /* events handling to control the surface */
    // mouse controls
    document.getElementById("area-container").addEventListener('mousemove', update);
    document.getElementById("area-container").addEventListener('mousedown', function(e) {
        mousedown = true;
        update(e);
    });

    // touch controls
    document.getElementById("area-container").addEventListener('touchmove', (e) => {
        e.pageX = e.touches[0].pageX;
        e.pageY = e.touches[0].pageY;
        update(e);
    });
    document.getElementById("area-container").addEventListener('touchstart', function(e) {
        mousedown = true;
        e.pageX = e.changedTouches[0].pageX;
        e.pageY = e.changedTouches[0].pageY;
        update(e);
    });

    // detect finger/mouse up
    ['mousedown', 'touchstart'].forEach((eventType) => {
        document.body.addEventListener(eventType, function() {
            mousedown = true;
        });
    });

    //detect finger/mouse down
    ['mouseup', 'touchend', 'touchcancel'].forEach((eventType) => {
        document.body.addEventListener(eventType, function() {
            mousedown = false;
        });
    });
}