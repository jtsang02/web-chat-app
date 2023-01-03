import Room from '../views/Room.js';

class Lobby {
    constructor() {
        this.rooms = [];
    }

    getRoom(roomId) {
        return this.rooms.find(room => room.id === roomId);
    }

    addRoom(id, name, image, messages) {
        if (name === '')
            return;
        let newRoom = new Room({id, name, image, messages});
        this.rooms.push(newRoom);
        if (this.onNewRoom)
            this.onNewRoom(newRoom);
    }
}

export default Lobby;