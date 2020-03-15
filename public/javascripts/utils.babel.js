"use strict";

var encodeGetParams = function encodeGetParams(p) {
    return Object.keys(p).map(function (k) {
        return [encodeURIComponent(k), encodeURIComponent(p[k])].join("=");
    }).join("&");
};

var clamp = function clamp(val, min, max) {
    return Math.min(Math.max(val, min), max);
};