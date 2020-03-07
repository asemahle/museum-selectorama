/**
 * @return {string}
 */
function GetDisplayID() {
    const colours = ['Red', 'Yellow', 'Pink', 'Green', 'Purple', 'Orange', 'Blue', 'Black', 'White'];
    const animals = ['Aardvark', 'Orangutan', 'Hippopotamus', 'Giraffe', 'Platypus', 'Sea Slug', 'Jellyfish', 'Potato'];
    return colours[Math.floor(Math.random() * colours.length)] + ' ' +
        animals[Math.floor(Math.random() * animals.length)];
}

function Success(displayID) {
    const $message = document.getElementById('success-message');
    $message.innerText = `Thank you, ${displayID}`;

    const $default = document.getElementById("default");
    $default.classList.add('hide');
    const $success = document.getElementById('success');
    $success.classList.remove('hide');

    setTimeout(() => {
        $default.classList.remove('hide');
        $success.classList.add('hide');
    }, 2500);
}

function Failure() {
    // hmmm...
}

document.getElementById("selection-area").addEventListener('click', (e) => {
    const $e = document.getElementById("selection-area");
    const bounds = $e.getBoundingClientRect();

    const $dot = document.getElementById("dot-spawn").getElementsByClassName("dot")[0];
    const $newDot = $dot.cloneNode(true);
    const dotBounds = $dot.getBoundingClientRect();
    $newDot.style.left = (e.pageX - dotBounds.width / 2) + "px";
    $newDot.style.top = (e.pageY - dotBounds.height / 2) + "px";
    $e.prepend($newDot);

    const displayID = GetDisplayID();
    const x = e.clientX - bounds.x - bounds.width/2;
    const y = e.clientY - bounds.y - bounds.height/2;

    fetch('/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            displayID: displayID,
            x: x,
            y: y
        }),
    }).then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            Success(displayID);
        })
        .catch((error) => {
            console.error('Error:', error);
            Failure()
        });

    console.log(x, y);
});