
var socket = io(); // variable to communicate with server

// Utility function that causes autoscrolling
function scrollToBottom () {
	var messages = jQuery('#messages');  // takes messages list 
	var newMessage = messages.children('li:last-child'); // takes last message
	var clientHeight = messages.prop('clientHeight'); // takes current view height
	var scrollTop  = messages.prop('scrollTop'); // takes height of scrolled messages
	var scrollHeight = messages.prop('scrollHeight'); //takes whole messages height
	var newMessageHeight = newMessage.innerHeight(); // takes new message inner height
	var lastMessageHeight = newMessage.prev().innerHeight();

	if ((clientHeight + scrollTop + newMessageHeight + lastMessageHeight) >= scrollHeight) {
		messages.scrollTop(scrollHeight);
		console.log('Should scroll');
	}
}

//invokes when client connect to server
socket.on('connect', function () {
	var params = jQuery.deparam(window.location.search);

	socket.emit('join', params, function (err) {
		if (err) {
			alert(err);
			window.location.href = '/';
		} else {
			console.log('No error');
		}
	});
});
// displays when new message comes from server
socket.on('newMessage', function(msg) {
	var formattedTime = moment(msg.createdAt).format('h:mm a');
	//console.log('New mesage: ', msg);
	// var li = jQuery('<li></li>');
	// li.text(`${msg.from} ${formattedTime}: ${msg.text}`);

	var template = jQuery('#message-template').html();
	var html =  Mustache.render(template, {
		text: msg.text,
		from: msg.from,
		createdAt: formattedTime
	});

	jQuery('#messages').append(html);
	scrollToBottom();
});

// event listener to renders current location of user
socket.on('newLocationMessage', function (msg) {

	var formattedTime = moment(msg.createdAt).format('h:mm a');
	// var li = jQuery('<li></li>'); 
	// var a = jQuery('<a target=_blank>My current location</a>');
	// li.text(`${msg.from} ${formattedTime}: `);
	// a.attr('href', msg.url);
	// li.append(a);
	var template = jQuery('#location-message-template').html();
	var html =  Mustache.render(template, {
		url: msg.url,
		from: msg.from,
		createdAt: formattedTime
	});
	jQuery('#messages').append(html);
	scrollToBottom();

});
//invokes when disconnection occurs from server
socket.on('disconnect', function () {
	console.log('Disconnect from server');
});

socket.on('updateUsersList', function (users) {
	var ol = jQuery('<ol></ol>');

	users.forEach(function(user) {
		ol.append(jQuery('<li></li>').text(user));
	});

	jQuery('#users').html(ol);
});

var messageTextbox =  jQuery('[name=messages]');
jQuery('#form-messages').on('submit', function(e) {
	e.preventDefault();

	socket.emit('createMessage', {
		from:'User',
		text: messageTextbox.val()
	}, function() {
		messageTextbox.val('');
	});
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
	if(!navigator.geolocation) {
		return alert('Geolocation is not supported by your browser');
	}
	locationButton.attr('disabled', 'disabled').text('Sending location...');
	navigator.geolocation.getCurrentPosition(function (position){
		locationButton.removeAttr('disabled').text('Send location');
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
	}, function() {
		locationButton.removeAttr('disabled').text('Send location');
		alert('Unable to fetch location');
	});
});

