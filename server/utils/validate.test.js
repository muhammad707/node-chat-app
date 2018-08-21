var expect = require('expect');
var {isRealString} = require('./validate');

describe('isRealString', () => {
	it('should reject non-string values', () => {
		var notStringValue  = 1234;
		expect(isRealString(notStringValue)).toBe(false);
	});

	it('should reject string with only spaces', () => {
		var space = '         ';
		expect(isRealString(space)).toBe(false);
	});
	it('should allow string with non-space characters', () => {
		res = isRealString('  Mukhammadjon     ');

		expect(res).toBe(true);
	});
});