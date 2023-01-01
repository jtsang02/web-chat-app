import { createDOM, emptyDOM } from '../views/utils.js';

class ChatView {
    constructor() {
        this.elem = createDOM(
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
        this.titleElem = this.elem.querySelector('.room-name');
        this.chatElem = this.elem.querySelector('.message-list');
        this.inputElem = this.elem.querySelector('textarea');
        this.ButtonElem = this.elem.querySelector('button');
    }
}

export default ChatView;