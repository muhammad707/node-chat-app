var expect = require('expect');

var {Users} = require('./users.js');

describe('Users', () => {
	var users;

	beforeEach(() => {
		users = new Users();
		users.users = [{
			id: '1',
			name: 'Mike',
			room: 'Node course'
		}, {
			id: '2',
			name: 'Jen',
			room: 'Angular course'
		}, {
			id: '3',
			name: 'Caleb',
			room: 'Node course'
		}]
	});
	it('should add new user', () => {
		var users = new Users();
		user = {
			id: '1',
			name: 'Mukhammadjon',
			room: 'Node developers'
		}
		var resUser = users.addUser(user.id, user.name, user.room);

		expect(users.users).toEqual([resUser]);
	});

	it('should return names for node course', () => {
		var userList = users.getUserList('Node course');
		expect(userList.length).toBe(2);
	});

	it('should return names for Angular course', () => {
		var userList = users.getUserList('Angular course');
		expect(userList).toEqual(['Jen']);
	});
	it('should find user', () => {
		var userId = '2';
		var user = users.getUser(userId);
		expect(user.id).toBe(userId);
	});

	it('should not user', () => {
		var userId = '6';
		var user = users.getUser(userId);
		expect(user).toNotExist();
	});

	it('should remove user', () => {
		var userId = '1';
		var user = users.removeUser(userId);
		expect(user.id).toBe(userId);
	});

	it('should not remove user', () => {
		var userId = '6';
		var user = users.removeUser(userId);
		expect(user).toNotExist();
	});
});