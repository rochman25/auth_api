/* eslint-disable no-undef */
const NotFoundError = require('../NotFoundError');
const ClientError = require('../ClientError');

describe('AuthenticationError', () => {
	it('should create AuthenticationError correctly', () => {
		const notFoundError = new NotFoundError('not found!');

		expect(notFoundError).toBeInstanceOf(NotFoundError);
		expect(notFoundError).toBeInstanceOf(ClientError);
		expect(notFoundError).toBeInstanceOf(Error);

		expect(notFoundError.statusCode).toEqual(404);
		expect(notFoundError.message).toEqual('not found!');
		expect(notFoundError.name).toEqual('NotFoundError');
	});
});
