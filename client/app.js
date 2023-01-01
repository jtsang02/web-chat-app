import LobbyView from './views/LobbyView.js';
import ChatView from './views/ChatView.js';
import ProfileView from './views/ProfileView.js';
import Lobby from './views/Lobby.js';

// This is the main entry point of the application. 
function main () {

    let lobby = new Lobby();
    let lobbyView = new LobbyView(lobby);
    let chatView = new ChatView();
    let profileView = new ProfileView();

    function renderRoute () {
        // get the path from the url
        let path = window.location.hash;
        // console.log(path);
        let pageView = document.getElementById('page-view');

        // lobby page
        if (path === "#/") {
            // empty the content of #page-view
            emptyDOM(pageView);
            // populate the content of #page-view with the content of index.html
            pageView.appendChild(lobbyView.elem);
        }
        // chat page
        else if (path.includes("chat")) {
            // empty the content of #page-view
            emptyDOM(pageView);
            // populate the content of #page-view with the content of chat.html
            pageView.appendChild(chatView.elem);
        }
        // profile page
        else if (path.includes("profile")) {
            // empty the content of #page-view
            emptyDOM(pageView);
            // populate the content of #page-view with the content of profile.html  
            pageView.appendChild(profileView.elem);
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
