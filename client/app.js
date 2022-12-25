function main () {

    // routing function
    function renderRoute () {
        // get the path from the url
        let path = window.location.hash;
        console.log(path);
        let pageView = document.getElementById('page-view');

        // lobby page
        if (path === "#/") {
            // empty the content of #page-view
            emptyDOM(pageView);
            // populate the content of #page-view with the content of index.html
            newDomElement = createDOM(
                `<div class="content">
                    <ul class="room-list">
                        <li>
                            <a href="/chat">chat 1</a>
                        </li>
                        <li>
                            <a href="/chat">chat 2</a>
                        </li>
                        <li>
                            <a href="/chat">chat 3</a>
                        </li>
                    </ul>
                    <div class="page-control">
                        <input type="text">
                        <button>Create Room</button>
                    </div>
                </div>`
            );
            pageView.appendChild(newDomElement);
        }
        // chat page
        else if (path.includes("chat")) {
            // empty the content of #page-view
            emptyDOM(pageView);
            // populate the content of #page-view with the content of chat.html
            newDomElement = createDOM(
                `<div class = "content">
                    <h4 class="room-name">
                        <img src="assets/everyone-icon.png" alt="">
                        Everyone in CPEN 322
                    </h4>
                    <div class = "message-list">
                        <div class = "message">
                            <span class="message-sender">Sender</span>
                            <span class="message-text">Message</span>
                        </div>
                        <div class = "message my-message">
                            <span class="message-user">User</span>
                            <span class="message-text">Message</span>
                        </div>
                    </div>
                    <div class = "page-control">
                        <textarea name="" id="" cols="30" rows="10"></textarea>
                        <button>Send</button>
                    </div>
                </div>`
            );
            pageView.appendChild(newDomElement);
        }
        // profile page
        else if (path.includes("profile")) {
            // empty the content of #page-view
            emptyDOM(pageView);
            // populate the content of #page-view with the content of profile.html  
            newDomElement = createDOM(
                `<div class = "content">
                    <div class="profile-form">
                        <div class = "form-field">
                            <label for="user-setting">Username</label>
                            <input type="text" id="user-name">
                        </div>
                        <div class = "form-field">
                            <label for="user-setting">Password</label>
                            <input type="text" id="user-password">
                        </div>
                        <div class = "form-field">
                            <label for="user-setting">Avatar Image</label>
                            <span>
                                <img src="assets/profile-icon.png" alt="">
                                <input type="file" id="user-image">
                            </span>
                            </input>
                        </div>
                        <div class = "form-field">
                            <label for="user-setting">About</label>
                            <textarea name="" id="" cols="10" rows="10"></textarea>
                        </div>
                    </div>
                    <div class="page-control">
                        <button>Save</button>
                    </div>
                </div>`
            );
            pageView.appendChild(newDomElement);
        }
    }
    // call on popstate event
    window.addEventListener('popstate', renderRoute);
    renderRoute();
}

// need this to make sure the DOM is loaded before we try to access it
window.addEventListener('load', main);

//----------------------------------------------------------------------------------------------//
// helper functions for DOM manipulation

// Removes the contents of the given DOM el ement (equivalent to elem.innerHTML = '' but faster)
function emptyDOM (elem) {
    while (elem.firstChild) 
        elem.removeChild(elem.firstChild);
}

// Creates a DOM element from the given HTML string
function createDOM (htmlString) {
    let template = document.createElement('template');
    template.innerHTML = htmlString.trim();
    return template.content.firstChild;
}