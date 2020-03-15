let s = window.location.href;
let name = decodeURIComponent(s.substr(s.indexOf("?name=")+6));

function run() {
    // set the name
    document.getElementById("name").innerText = name;

    // go back to intro on click 'exit'
    document.getElementById("exit").addEventListener("click", Exit('01-hello'));

    // go back to intro after 30seconds
    SetExitTimer('01-hello', 30 * 1000);
}