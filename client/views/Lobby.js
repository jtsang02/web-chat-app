import Room from '../views/Room.js';

class Lobby {
    constructor() {
        this.rooms = [
            new Room({id: 1, name: 'Room 1'}),
            new Room({id: 2, name: 'Room 2'}),
            new Room({id: 3, name: 'Room 3'}),
            new Room({id: 4, name: 'Room 4'}),
        ];
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