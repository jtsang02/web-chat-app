import { createDOM } from '../views/utils.js';
import { profile } from '../app.js';

class ChatView {
    constructor(socket) {
        this.socket = socket;
        this.room = null;
        this.elem = createDOM(
            `<div class = "content">
                <h4 class="room-name">
                    Room Name
                </h4>
                <div class = "message-list">
                </div>
                <div class = "page-control">
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                    <button>Send</button>
                </div> 
            </div>`
        );
        this.titleElem = this.elem.querySelector('.room-name');
        this.chatElem = this.elem.querySelector('.message-list');
        this.inputElem = this.elem.querySelector('textarea');
        this.ButtonElem = this.elem.querySelector('button');
        this.ButtonElem.addEventListener('click', () => this.sendMessage());
        this.inputElem.addEventListener('keyup', (e) => {   
            if (e.key === 'Enter' && !e.shiftKey)
                this.sendMessage();
        });
    }

    setRoom(room) {
        // helper function to create new message
        function createMessage(message) {
            if (message.user === profile.username) {
                return createDOM(
                    `<div class = "message my-message">
                        <span class="message-user">${message.user}</span>
                        <span class="message-text">${message.message}</span>
                    </div>`
                );
            }
            return createDOM(
                    `<div class = "message">
                        <span class="message-sender">${message.user}</span>
                        <span class="message-text">${message.message}</span>
                    </div>`
                );
        }

        this.room = room;
        this.titleElem.innerHTML = `
            <img src="assets/everyone-icon.png" alt="">
            ${room.name}
        `;
        this.chatElem.innerHTML = '';

        this.room.messages.forEach(message => {
            let div = createMessage(message);
            this.chatElem.appendChild(div);
        });

        this.room.onNewMessage = (message) => {
            let div = createMessage(message);
            this.chatElem.appendChild(div);
        };
    }

    sendMessage() {
        let message = this.inputElem.value;
        this.room.addMessage(profile.username, message);
        this.inputElem.value = '';
        // send the message to the server
        this.socket.send(JSON.stringify({
            roomId: this.room.id,
            username: profile.username,
            text: message
        }));
    }
}

export default ChatView;