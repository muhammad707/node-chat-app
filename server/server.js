const express = require('express'); // express  library
const path = require('path'); // libaray to create relative path of file
const http = require('http'); //http library to create server
const socketIO = require('socket.io');

var port = process.env.PORT || 3000;
var publicPath = path.join(__dirname, '../public'); // creates relative path to public folder
var app = express();
app.use(express.static(publicPath)); // renders index.html file to browser
var server = http.createServer(app);
var io = socketIO(server);
io.on("connection", (socket) => {
	console.log('New user connected');
	socket.emit('newMessage', {
		from: 'Saidamir',
		text: 'What is up',
		createdAt: 123
	});

	socket.on('createMessage', function(msg) {
		console.log('Message created: ', msg);
	});

	socket.on('disconnect', () => {
		console.log('User was disconnected');
	});
});


server.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});