const express = require('express'); // express  library
const path = require('path'); // libaray to create relative path of file
const http = require('http'); //http library to create server
const socketIO = require('socket.io'); //registering socketIO library
const {generateMessage, generateLocationMessage} = require('./utils/message'); // generates message
const {isRealString} = require('./utils/validate');
var port = process.env.PORT || 3000;
var publicPath = path.join(__dirname, '../public'); // creates relative path to public folder
var app = express(); //registering express server
app.use(express.static(publicPath)); // renders index.html file to browser
var server = http.createServer(app); 
var io = socketIO(server); // creates server client communication via io
io.on("connection", (socket) => {
	console.log('New user connected');

	// greeting to new user
	socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

	// informs others about new user
	socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User joined'));

	// Event listener to validate user to enter room 
	socket.on('join', (params, callback) => {
		if (!isRealString(params.name) || !isRealString(params.room)) {
			callback('Name and room name are required.');
		}
	});

	// listens create message emitter
	socket.on('createMessage', function(msg, callback) {
		console.log('Message created: ', msg);
		// Event emitter for al users
		io.emit('newMessage', generateMessage(msg.from, msg.text));

		callback();
	});

	//generates user's location and sends to browser
	socket.on('createLocationMessage', function (coords) {
		io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
	});
	// invokes when user is disconnected
	socket.on('disconnect', () => {
		console.log('User was disconnected');
	});
});
server.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});