const AuthenticationRepository = require('../AuthenticationRepository');

describe('AuthenticationRepository interface', () => {
	it('should throw error when invoke unimplemented method', async () => {
		const authenticationRepository = new AuthenticationRepository();

		await expect(authenticationRepository.addToken('')).rejects.toThrowError('AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
	});
});
