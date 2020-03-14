"use strict";

function UpdateList() {
    fetch('/data', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log('Success:', data);
        RenderList(data);
    }).catch(function (error) {
        console.error('Error:', error);
    });
}

function RenderList(data) {
    var $list = document.getElementById('user-list');
    $list.innerHTML = '';
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            user = _step.value;

            if (user.IS_COMPLETED === 0) {
                var $item = document.createElement('li');
                $item.setAttribute('data', user.ID);
                $item.innerText = user.DISPLAY_ID;
                $list.appendChild($item);
            }
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
}

var selectedID = null;

function GetSelection() {
    var $list = document.getElementById('default');
    $list.classList.add('hide');
    var $selection = document.getElementById('selection');
    $selection.classList.remove('hide');
}

function CompleteSelection() {
    var $list = document.getElementById('default');
    $list.classList.remove('hide');
    var $selection = document.getElementById('selection');
    $selection.classList.add('hide');
}

document.getElementById('user-list').addEventListener('click', function (e) {
    if (e.target.tagName === 'LI') {
        selectedID = e.target.getAttribute('data');
        GetSelection();
    }
}); // listen for updates

var source = new EventSource('/data/stream');
source.addEventListener('message', function (e) {
    console.log("DATA RECEIVED", e.data);
    UpdateList();
}, false); // initial update

UpdateList();