import LobbyView from './views/LobbyView.js';
import ChatView from './views/ChatView.js';
import ProfileView from './views/ProfileView.js';
import Lobby from './views/Lobby.js';
import { emptyDOM } from './views/utils.js';

// var socket = new WebSocket("ws://99.79.42.146:3000");
var profile = { username: 'Josiah' };
let Service = {
    origin: window.location.origin,
    getAllRooms: async function () {
        const response = await fetch(Service.origin + "/chat");
        if (response.ok) {
            return await response.json();
        }
        else {
            // throw an error if the response is not ok
            throw new Error(await response.text());
        }
    },
    addRoom: async function (data) {
        const response = await fetch(Service.origin + "/chat", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            return await response.json();
        }
        else {
            // throw an error if the response is not ok
            throw new Error(await response.text());
        }
    }
}

// This is the main entry point of the application. 
function main () {
    let lobby = new Lobby();
    let lobbyView = new LobbyView(lobby);
    let socket = new WebSocket("ws://192.168.1.72:8000");
    let chatView = new ChatView(socket);
    let profileView = new ProfileView();
    
    // add event listeners
    socket.addEventListener('open', (event) => {
        console.log('Connected to server');
    });

    socket.addEventListener('close', (event) => {
        console.log('Disconnected from server');
    });

    socket.addEventListener('error', (event) => {
        console.log('Error: ' + event);
    });

    socket.addEventListener('message', (event) => {
        console.log('Message from server ', event.data);
        let messageObj = JSON.parse(event.data);
        console.log(messageObj);
        var roomObj = lobby.getRoom(messageObj.roomId);
        roomObj.addMessage(messageObj.username, messageObj.text);
    });

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

    function refreshLobby () {
        Service.getAllRooms().then(rooms => {
            rooms.forEach(room => {
                if (room.id in lobby.rooms === false)
                    lobby.addRoom(room.id, room.name, room.image, room.messages);
                else {
                    lobby.rooms[room.id].name = room.name;
                    lobby.rooms[room.id].image = room.image;
                }
            });
        }).catch(err => {
            console.log(err);
        });
    }

    // call on popstate event
    window.addEventListener('popstate', renderRoute);
    renderRoute();
    refreshLobby();
    setInterval(refreshLobby, 5000);
}

// need this to make sure the DOM is loaded before we try to access it
window.addEventListener('load', main);

export { profile, Service };