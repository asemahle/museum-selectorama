"use strict";

var encodeGetParams = function encodeGetParams(p) {
    return Object.entries(p).map(function (kv) {
        return kv.map(encodeURIComponent).join("=");
    }).join("&");
};

var clamp = function clamp(val, min, max) {
    return Math.min(Math.max(val, min), max);
};