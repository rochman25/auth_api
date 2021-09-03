class AuthenticationsHandler {
	constructor({
		userLoginUseCase,
		refreshAuthenticationUseCase,
		logoutAuthenticationUseCase,
	}) {
		this._userLoginUseCase = userLoginUseCase;
		this._refreshAuthenticationUseCase = refreshAuthenticationUseCase;
		this._logoutAuthenticationUseCase = logoutAuthenticationUseCase;

		this.postAuthenticationHandler = this.postAuthenticationHandler.bind(this);
		this.putAuthenticationHandler = this.putAuthenticationHandler.bind(this);
		this.deleteAuthenticationHandler = this.deleteAuthenticationHandler.bind(this);
	}

	async postAuthenticationHandler(request, h) {
		const {accessToken, refreshToken} = await this._userLoginUseCase.execute(request.payload);
		const response = h.response({
			status: 'success',
			data: {
				accessToken,
				refreshToken,
			},
		});
		response.code(201);
		return response;
	}

	async putAuthenticationHandler(request) {
		const accessToken = await this._refreshAuthenticationUseCase
			.execute(request.payload);

		return {
			status: 'success',
			data: {
				accessToken,
			},
		};
	}

	async deleteAuthenticationHandler(request) {
		await this._logoutAuthenticationUseCase.execute(request.payload);
		return {
			status: 'success',
		};
	}
}

module.exports = AuthenticationsHandler;
