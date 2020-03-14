const userNameTimeout = 2 * 60  * 60 * 1000; // 2hours
let selectedUser = null;
let $selection = null;

function UpdateList() {
    fetch('/data', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            RenderList(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function RenderList(data) {
    const $list = document.getElementById('user-list');
    const now = new Date();
    $list.innerHTML = '';
    for (let user of data) {
        if (user.IS_COMPLETED === 0 && now - (new Date(user.START_TIME)) < userNameTimeout ) {
            // create list item
            const $item = document.createElement('div');
            $item.classList.add("text-block-4");
            $item.setAttribute('data', user.ID);
            $item.innerText = user.DISPLAY_ID;

            // select item on click
            $item.addEventListener("click", function(e) {
                SelectItem($item, user);
                e.stopPropagation();
            });

            // create the item in the selected state if its id is already selected
            if (selectedUser !== null && selectedUser.ID === user.ID) {
                SelectItem($item, user);
            }

            // add item to dom
            $list.insertBefore($item, $list.firstChild);
        }
    }
}

// Causes an item in the list to enter the "selected" state
function SelectItem($item, user) {
    selectedUser = user;
    if ($selection !== null) $selection.classList.remove("selected");
    $item.classList.add("selected");
    $selection = $item;
    document.getElementById("submit").classList.remove("hide");
}

function run() {
    // Un-select all items when page body is clicked
    document.body.addEventListener("click", function() {
        selectedUser = null;
        if ($selection) $selection.classList.remove("selected");
        $selection = null;
        document.getElementById("submit").classList.add("hide");
    });

    // go to next page on 'continue'
    document.getElementById("submit").addEventListener("click", function() {
        if (selectedUser === null) return;
        let params = {
            id: selectedUser.ID,
            name: selectedUser.DISPLAY_ID,
        };
        window.location.assign("/goodbye/02-input-feelings?" + encodeGetParams(params));
    });

    // go to next page on 'cannot find myself'
    document.getElementById("not-found").addEventListener("click", function() {
        source.close();
        window.location.assign("/goodbye/03-input-feelings-before");
    });

    // listen for updates
    const source = new EventSource('/data/stream');
    source.addEventListener('message', function(e) {
        console.log("DATA RECEIVED", e.data);
        UpdateList();
    }, false);

    // initial update
    UpdateList();

    document.body.innerText = "heyo";
}

