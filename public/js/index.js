
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

// event listener to renders current location of user
socket.on('newLocationMessage', function (msg) {
	var li = jQuery('<li></li>');
	var a = jQuery('<a target=_blank>My current location</a>');
	li.text(`${msg.from}: `);
	a.attr('href', msg.url);
	li.append(a);
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

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
	if(!navigator.geolocation) {
		return alert('Geolocation is not supported by your browser');
	}

	navigator.geolocation.getCurrentPosition(function (position){
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
	}, function() {
		alert('Unable to fetch location');
	});
});

