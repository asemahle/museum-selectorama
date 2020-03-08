let encodeGetParams = function (p) {
    return Object.entries(p).map(kv => kv.map(encodeURIComponent).join("=")).join("&");
};

let clamp = function (val, min, max) {
    return Math.min(Math.max(val, min), max);
};