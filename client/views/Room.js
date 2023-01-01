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
        
        this.messages.push({
            user: username,
            message: text
        });
    }    
}

export default Room;