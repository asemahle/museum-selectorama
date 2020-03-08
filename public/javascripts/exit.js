function Exit() {
    let where = window.location.href.substring(0, window.location.href.lastIndexOf('/')) + "/01-hello";
    window.location.assign(where);

}

function SetExitTimer(when = 5 * 60 * 1000) {
    setTimeout(Exit, when);
}