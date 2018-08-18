var socket = io();
socket.on('connect', function () {
	console.log('Connected to server');

	// socket.emit('createEmail', {
	// 	to: 'sirojiddinov.1881@mail.ru',
	// 	text: 'I am good'
	// });

	socket.emit('createMessage', {
		to: 'Saidamir',
		text: 'I am good. what about you? '
	});
});
// socket.on('newEmail', function(email){
// 	console.log('New email', email);
// });
socket.on('newMessage', function(msg) {
	console.log('New mesage: ', msg);
});

socket.on('disconnect', function () {
	console.log('Disconnect from server');
});

