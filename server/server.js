const express = require('express'); // express  library
const path = require('path'); // libaray to create relative path of file
const http = require('http'); //http library to create server
const socketIO = require('socket.io'); //registering socketIO library

var port = process.env.PORT || 3000;
var publicPath = path.join(__dirname, '../public'); // creates relative path to public folder
var app = express(); //registering express server
app.use(express.static(publicPath)); // renders index.html file to browser
var server = http.createServer(app); 
var io = socketIO(server); // creates server client communication via io
io.on("connection", (socket) => {
	console.log('New user connected');

	// greeting to new user
	socket.emit('newMessage', {
		from: 'Admin',
		text: 'Welcome to the chat app',
		createdAt: new Date().getTime()
	});

	// informs others about new user
	socket.broadcast.emit('newMessage', {
		from: 'Admin',
		text: 'New user joined',
		createdAt: new Date().getTime()
	});
	// listens create message emitter
	socket.on('createMessage', function(msg) {
		console.log('Message created: ', msg);
		// Event emitter for al users
		io.emit('newMessage', {  // when new message comes it emits for all users
			from: msg.from, // sender 
			text: msg.text, //actual message
			createdAt: new Date().getTime() // date of message
		});
	});
	// invokes when user is disconnected
	socket.on('disconnect', () => {
		console.log('User was disconnected');
	});
});
server.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});