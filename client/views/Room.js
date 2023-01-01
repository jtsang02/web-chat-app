class Room {
    constructor({id, name, image = 'assets/everyone-icon.png', messages = []}) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.messages = messages;
    }

    addMessage(username, text) {
        if (text === '' || text.trim() === '')
            return;
        
        let messageObj = {
            user: username,
            message: text
        };

        this.messages.push(messageObj);

        if (this.onNewMessage)
            this.onNewMessage(messageObj);
    }    
}

export default Room;