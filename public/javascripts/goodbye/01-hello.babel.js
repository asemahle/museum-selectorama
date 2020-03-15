"use strict";

var userNameTimeout = 2 * 60 * 60 * 1000; // 2hours

var selectedUser = null;
var $selection = null;

function UpdateList() {
    function reqListener() {
        var data = JSON.parse(this.response);
        console.log('Success:', data);
        RenderList(data);
    }

    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener);
    oReq.open("GET", "/data");
    oReq.send();
}

function RenderList(data) {
    var $list = document.getElementById('user-list');
    var now = new Date();
    $list.innerHTML = '';
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        var _loop = function _loop() {
            var user = _step.value;

            if (user.IS_COMPLETED === 0 && now - new Date(user.START_TIME) < userNameTimeout) {
                // create list item
                var $item = document.createElement('div');
                $item.classList.add("text-block-4");
                $item.setAttribute('data', user.ID);
                $item.innerText = user.DISPLAY_ID; // select item on click

                $item.addEventListener("click", function (e) {
                    SelectItem($item, user);
                    e.stopPropagation();
                }); // create the item in the selected state if its id is already selected

                if (selectedUser !== null && selectedUser.ID === user.ID) {
                    SelectItem($item, user);
                } // add item to dom


                $list.insertBefore($item, $list.firstChild);
            }
        };

        for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            _loop();
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
} // Causes an item in the list to enter the "selected" state


function SelectItem($item, user) {
    selectedUser = user;
    if ($selection !== null) $selection.classList.remove("selected");
    $item.classList.add("selected");
    $selection = $item;
    document.getElementById("submit").classList.remove("hide");
}

function run() {
    // Un-select all items when page body is clicked
    document.body.addEventListener("click", function () {
        selectedUser = null;
        if ($selection) $selection.classList.remove("selected");
        $selection = null;
        document.getElementById("submit").classList.add("hide");
    }); // go to next page on 'continue'

    document.getElementById("submit").addEventListener("click", function () {
        if (selectedUser === null) return;
        var params = {
            id: selectedUser.ID,
            name: selectedUser.DISPLAY_ID
        };
        window.location.assign("/goodbye/02-input-feelings?id=" + encodeURIComponent(selectedUser.ID) + "&name=" + encodeURIComponent(selectedUser.DISPLAY_ID));
    }); // go to next page on 'cannot find myself'

    document.getElementById("not-found").addEventListener("click", function () {
        source.close();
        window.location.assign("/goodbye/03-input-feelings-before");
    }); // listen for updates

    var source = new EventSource('/data/stream');
    source.addEventListener('message', function (e) {
        console.log("DATA RECEIVED", e.data);
        UpdateList();
    }, false); // initial update

    UpdateList();
    SetExitTimer('00-welcome-back', 30 * 1000);
}