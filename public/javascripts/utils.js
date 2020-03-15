let encodeGetParams = function (p) {
    return Object.keys(p).map(k => [encodeURIComponent(k), encodeURIComponent(p[k])].join("=")).join("&");
};

let clamp = function (val, min, max) {
    return Math.min(Math.max(val, min), max);
};