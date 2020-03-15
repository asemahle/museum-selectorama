{
    setInterval( ()=> {
        let $img = document.getElementById("img");
        let bounds = $img.getBoundingClientRect();
        let $p = document.getElementById("selection-area-padding");
        let $e = document.getElementById("selection-area");

        let top = 0.13;
        let bottom = 0.84;
        let left = 0.14;
        let right = 0.88;

        $p.style.paddingTop = bounds.height * top + "px";
        $p.style.paddingBottom = bounds.height * (1 - bottom) + "px";
        $p.style.paddingLeft = bounds.width * left + "px";
        $p.style.paddingRight = bounds.width * (1 - right) + "px";

        $e.style.width = bounds.width * (right - left) + "px";
        $e.style.height = bounds.height * (bottom - top) + "px";
    }, 500);

    let mousedown = false;

    let eventElem = document.getElementById("selection-events");
    let first = true;

    let update = function(pos) {
        if (!mousedown) return;

        let $e = document.getElementById("selection-area");
        if (first) {
            first = false;
            let $parentDot = document.getElementById("dot-spawn").getElementsByClassName("dot")[0];
            let $dot = $parentDot.cloneNode(true);
            $dot.classList.add('active-dot');
            $e.appendChild($dot);
        }
        let $dot = $e.getElementsByClassName("active-dot")[0];
        let dotBounds = $dot.getBoundingClientRect();
        let bounds = $e.getBoundingClientRect();
        let dotPos = {
            x: clamp(pos.pageX - bounds.left, 0, bounds.width) - dotBounds.width/2,
            y: clamp(pos.pageY - bounds.top - window.scrollY, 0, bounds.height) - dotBounds.height/2
        };


        $dot.style.left = dotPos.x + "px";
        $dot.style.top = dotPos.y + "px";

        let minx = 0 - dotBounds.width/2;
        let maxx = bounds.width - dotBounds.width/2;
        let miny = 0 - dotBounds.height/2;
        let maxy = bounds.height - dotBounds.height/2;
        let x = ((dotPos.x - minx)/(maxx-minx)) * 2 - 1;
        let y = ((dotPos.y - miny)/(maxy-miny)) * -2 + 1;

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
    document.getElementById("selection-area-padding").addEventListener('mousemove', update);
    document.getElementById("selection-area-padding").addEventListener('mousedown', function(e) {
        mousedown = true;
        update(e);
    });

    // touch controls
    document.getElementById("selection-area-padding").addEventListener('touchmove', (e) => {
        update({
            pageX: e.changedTouches[0].pageX,
            pageY: e.changedTouches[0].pageY
        });
        e.preventDefault();
    }, {passive: false});
    document.getElementById("selection-area-padding").addEventListener('touchstart', function(e) {
        mousedown = true;
        update({
            pageX: e.changedTouches[0].pageX,
            pageY: e.changedTouches[0].pageY
        });
        e.preventDefault();
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