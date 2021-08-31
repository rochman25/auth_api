class AuthenticationsHandler {
	constructor({
		userLoginUseCase,
	}) {
		this._userLoginUseCase = userLoginUseCase;

		this.postAuthenticationHandler = this.postAuthenticationHandler.bind(this);
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
}

module.exports = AuthenticationsHandler;
