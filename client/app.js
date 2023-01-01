import LobbyView from './views/LobbyView.js';
import ChatView from './views/ChatView.js';
import ProfileView from './views/ProfileView.js';
import Lobby from './views/Lobby.js';
import { emptyDOM } from './views/utils.js';

var profile = { username: 'Josiah' };

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
            let room = lobby.getRoom(parseInt(path.split("/")[2], 10));   // get the room id from the url
            if (room !== undefined && room !== null)
                chatView.setRoom(room);
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

export { profile };