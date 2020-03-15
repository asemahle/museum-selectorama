"use strict";

function run() {
    document.getElementById('yes').addEventListener('click', function () {
        window.location.assign('/goodbye/01-hello');
    });
    document.getElementById('no').addEventListener('click', function () {
        window.location.assign('/goodbye/03-input-feelings-before');
    });
}