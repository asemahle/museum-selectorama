function run() {
    document.getElementById('yes').addEventListener('click', () => {
        window.location.assign('/goodbye/01-hello')
    });
    document.getElementById('no').addEventListener('click', () => {
        window.location.assign('/goodbye/03-input-feelings-before')
    });
}