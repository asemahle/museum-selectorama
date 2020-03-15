function Exit(location) {
    return () => {
        let where = window.location.href.substring(0, window.location.href.lastIndexOf('/')) + "/" + location;
        window.location.assign(where);
    }
}

function SetExitTimer(location, when = 5 * 60 * 1000) {
    setTimeout(Exit(location), when);
}