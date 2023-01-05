const path = require('path');
const fs = require('fs');
const express = require('express');
const ws = require('ws');
const broker = new ws.Server({ port: 8000 });

var chatrooms = [
	{
		id: 0,
		name: 'Room 1',
		image: 'assets/everyone-icon.png',
	}, 
	{
		id: 1,
		name: 'Room 2',
		image: 'assets/everyone-icon.png',
	},
	{
		id: 2,
		name: 'Room 3',
		image: 'assets/everyone-icon.png',
	},
];
var messages = {};

function logRequest(req, res, next){
	console.log(`${new Date()}  ${req.ip} : ${req.method} ${req.path}`);
	next();
}

// WebSocket API (broker) 
// 1. listen for new connections
// 2. listen for messages
// 3. broadcast messages to all connected clients
broker.on('connection', (socket, req) => {
	console.log(`${new Date()}  New connection`);
	socket.on('message', (data) => {
		let messageObj = JSON.parse(data);
		console.log(`${new Date()}  Message received: ${data}`);
		broker.clients.forEach(client => {
			if (client !== socket) {
				client.send(JSON.stringify(messageObj));
			}
		});
		// store message in memory
		if (!messages[messageObj.roomId]) {
			messages[messageObj.roomId] = [];
		}
		messages[messageObj.roomId].push(messageObj);
	});
});

const host = 'localhost';
const port = 3000;
const clientApp = path.join(__dirname, 'client');

// express app
let app = express();

app.use(express.json()) 						// to parse application/json
app.use(express.urlencoded({ extended: true })) // to parse application/x-www-form-urlencoded
app.use(logRequest);							// logging for debug

// serve static files (client-side)
app.use('/', express.static(clientApp, { extensions: ['html'] }));
app.listen(port, () => {
	console.log(`${new Date()}  App Started. Listening on ${host}:${port}, serving ${clientApp}`);
});

// REST API
app.get('/chat', (req, res) => {
	chatrooms.forEach(room => {
		room.messages = messages[room.id];
	});
	res.json(chatrooms);
});

app.post('/chat', (req, res) => {
	if (req.body.name === '') {
		// respond with http status code 400 (Bad Request)
		// and a message
		res.status(400).send('Room name cannot be empty');
		return;
	}
	let newRoom = {
		id: chatrooms.length,
		name: req.body.name,
		image: req.body.image,
	};
	chatrooms.push(newRoom);
	messages[newRoom.id] = [];
	res.status(200).json(newRoom);
});

