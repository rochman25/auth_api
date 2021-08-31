/* eslint-disable no-unused-vars */
class AuthenticationTokenManager {
	async createAccessToken(token) {
		throw new Error('AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
	}

	async createRefreshToken(token) {
		throw new Error('AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
	}
}

module.exports = AuthenticationTokenManager;
