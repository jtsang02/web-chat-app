import { createDOM, emptyDOM } from '../views/utils.js';
import { Service } from '../app.js';

class LobbyView {
    constructor(lobby) {
        this.lobby = lobby;
        this.lobby.onNewRoom = () => this.redrawList();
        this.elem = createDOM(
            `<div class="content">
                <ul class="room-list">
                    <li></li>
                </ul>
                <div class="page-control">
                    <input type="text">
                    <button>Create Room</button>
                </div>
            </div>`
        );
        this.listElem = this.elem.querySelector('.room-list');
        this.inputElem = this.elem.querySelector('input');
        this.buttonElem = this.elem.querySelector('button');
        this.redrawList();
        this.buttonElem.addEventListener('click', () => {
            let name = this.inputElem.value;
            Service.addRoom({"name": name, "image": "assets/everyone-icon.png"}).then(room => {
                this.lobby.addRoom(room.id, room.name, room.image, room.messages);
            }).catch(err => {
                console.log(err);
            });
            this.inputElem.value = '';
        });
        this.inputElem.addEventListener('keyup', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                let name = this.inputElem.value;
                Service.addRoom({"name": name, "image": "assets/everyone-icon.png"}).then(room => {
                    this.lobby.addRoom(room.id, room.name, room.image, room.messages);
                }).catch(err => {
                    console.log(err);
                });
                this.inputElem.value = '';
            }
        });
    }

    redrawList() {
        emptyDOM(this.listElem);
        this.lobby.rooms.forEach(room => {
            let li = createDOM(
                `<li>
                    <a href="#/chat/${room.id}">${room.name}</a>
                </li>`
            );
            this.listElem.appendChild(li);
        });
    }
}

export default LobbyView;