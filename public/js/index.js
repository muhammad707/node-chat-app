
var socket = io(); // variable to communicate with server
//invokes when client connect to server
socket.on('connect', function () {
	console.log('Connected to server');
});
// consoles when new message comes from server
socket.on('newMessage', function(msg) {
	console.log('New mesage: ', msg);
	var li = jQuery('<li></li>');
	li.text(`${msg.from}: ${msg.text}`);

	jQuery('#messages').append(li);
});
//invokes when disconnection occurs from server
socket.on('disconnect', function () {
	console.log('Disconnect from server');
});

jQuery('#form-messages').on('submit', function(e) {
	e.preventDefault();

	socket.emit('createMessage', {
		from:'User',
		text: jQuery('[name=messages]').val()
	}, function(data) {

	});
});

