function UpdateList() {
    fetch('/data', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            RenderList(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function RenderList(data) {
    const $list = document.getElementById('user-list');
    $list.innerHTML = '';
    for (user of data) {
        if (user.IS_COMPLETED === 0) {
            const $item = document.createElement('li');
            $item.setAttribute('data', user.ID);
            $item.innerText = user.DISPLAY_ID;
            $list.appendChild($item);
        }
    }
}

let selectedID = null;
function GetSelection() {
    const $list = document.getElementById('default');
    $list.classList.add('hide');
    const $selection = document.getElementById('selection');
    $selection.classList.remove('hide');
}

function CompleteSelection() {
    const $list = document.getElementById('default');
    $list.classList.remove('hide');
    const $selection = document.getElementById('selection');
    $selection.classList.add('hide');
}

document.getElementById('user-list').addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        selectedID = e.target.getAttribute('data');
        GetSelection();
    }
});

document.getElementById("selection-area").addEventListener('click', (e) => {
    const $e = document.getElementById("selection-area");
    const bounds = $e.getBoundingClientRect();

    const $dot = document.getElementById("dot-spawn").getElementsByClassName("dot")[0];
    const $newDot = $dot.cloneNode(true);
    const dotBounds = $dot.getBoundingClientRect();
    $newDot.style.left = (e.pageX - dotBounds.width / 2) + "px";
    $newDot.style.top = (e.pageY - dotBounds.height / 2) + "px";
    $e.prepend($newDot);

    const x = e.clientX - bounds.x - bounds.width/2;
    const y = e.clientY - bounds.y - bounds.height/2;

    fetch(`/data/complete/${selectedID}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            x: x,
            y: y
        }),
    });

    console.log(x, y);

    CompleteSelection();
});

// listen for updates
const source = new EventSource('/data/stream');
source.addEventListener('message', function(e) {
    console.log("DATA RECEIVED", e.data);
    UpdateList();
}, false);

// initial update
UpdateList();