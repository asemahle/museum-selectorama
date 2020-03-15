"use strict";

var activeNames = []; // names with incomplete records
// get data to prevent duplicate names

function UpdateNames() {
    function reqListener() {
        var data = JSON.parse(this.response);
        console.log('Success:', data);
        activeNames = data.filter(function (user) {
            return user.IS_COMPLETED === 0;
        }).map(function (user) {
            return user.DISPLAY_ID.trim().toLowerCase();
        });
    }

    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener);
    oReq.open("GET", "/data");
    oReq.send();
}

function run() {
    var submitContainer = document.getElementById("submit");
    var inputField = document.getElementById("name");
    var invalidName = document.getElementById("invalid-name"); // clear input on reload

    inputField.value = ""; // show and hide the submit button based on whether there is a name

    inputField.addEventListener("input", function () {
        var name = this.value.trim();
        var nameIsUnique = activeNames.indexOf(name.toLowerCase()) === -1;

        if (name.length && nameIsUnique) {
            submitContainer.classList.remove("hide");
        } else {
            submitContainer.classList.add("hide");
        }

        if (nameIsUnique) {
            invalidName.classList.add("hide");
        } else {
            invalidName.classList.remove("hide");
        }
    }); // go to next page on submit

    submitContainer.addEventListener("click", function () {
        var params = {
            name: inputField.value.trim()
        };
        window.location.assign("/hello/02-input-feelings?name=" + encodeURIComponent(params.name));
    }); // listen for updates

    var source = new EventSource('/data/stream');
    source.addEventListener('message', function (e) {
        console.log("DATA RECEIVED", e.data);
        UpdateNames();
    }, false); // initial update

    UpdateNames();
}