const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message')

describe('generateMessage', () => {
	it('should generate new message', () => {
		var from = 'Jen';
		var text = 'What is going on?';
		var message = generateMessage(from, text);

		expect(message.createdAt).toBeA('number');
		expect(message).toInclude({from, text});
	});
});

describe('generateLocationMessage',  () => {
	it('should generate location object', () => {
		var from = 'Jen';
		var latitude = 15;
		var longitude = 18;
		var url = 'https://www.google.com/maps?q=15,18';
		var message = generateLocationMessage(from, latitude, longitude);

		expect(message.createdAt).toBeA('number');
		expect(message).toInclude({from, url});
	});
});