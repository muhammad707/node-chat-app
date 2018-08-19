
var socket = io(); // variable to communicate with server
//invokes when client connect to server
socket.on('connect', function () {
	console.log('Connected to server');
});
// consoles when new message comes from server
socket.on('newMessage', function(msg) {
	console.log('New mesage: ', msg);
});
//invokes when disconnection occurs from server
socket.on('disconnect', function () {
	console.log('Disconnect from server');
});

