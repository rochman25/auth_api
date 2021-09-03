/* istanbul ignore file */

// external agency
const {nanoid} = require('nanoid');
const bcrypt = require('bcrypt');
const Jwt = require('@hapi/jwt');
const pool = require('./database/postgres/pool');

// Service (repository, helper, manager, etc)
const UserRepositoryPostgres = require('./repository/UserRepositoryPostgres');
const AuthenticationRepositoryPostgres = require('./repository/AuthenticationRepositoryPostgres');
const BcryptEncryptionHelper = require('./security/BcryptEncryptionHelper');
const JwtTokenManager = require('./security/JwtTokenManager');

// Use case
const AddUserUseCase = require('../Applications/use_case/AddUserUseCase');
const UserLoginUseCase = require('../Applications/use_case/UserLoginUseCase');
const RefreshAuthenticationUseCase = require('../Applications/use_case/RefreshAuthenticationUseCase');
const LogoutAuthenticationUseCase = require('../Applications/use_case/LogoutAuthenticationUseCase');

const serviceInstanceContainer = {
	userRepository: new UserRepositoryPostgres(pool, nanoid),
	authenticationRepository: new AuthenticationRepositoryPostgres(pool),
	encryptionHelper: new BcryptEncryptionHelper(bcrypt),
	authenticationTokenManager: new JwtTokenManager(Jwt.token),
};

const useCaseInstaceContainer = {
	addUserUseCase: new AddUserUseCase({
		userRepository: serviceInstanceContainer.userRepository,
		encryptionHelper: serviceInstanceContainer.encryptionHelper,
	}),
	userLoginUseCase: new UserLoginUseCase({
		authenticationRepository: serviceInstanceContainer.authenticationRepository,
		authenticationTokenManager: serviceInstanceContainer.authenticationTokenManager,
		userRepository: serviceInstanceContainer.userRepository,
		encryptionHelper: serviceInstanceContainer.encryptionHelper,
	}),
	refreshAuthenticationUseCase: new RefreshAuthenticationUseCase({
		authenticationRepository: serviceInstanceContainer.authenticationRepository,
		authenticationTokenManager: serviceInstanceContainer.authenticationTokenManager,
	}),
	logoutAuthenticationUseCase: new LogoutAuthenticationUseCase({
		authenticationRepository: serviceInstanceContainer.authenticationRepository,
	}),
};

// Export all instance
module.exports = {
	...serviceInstanceContainer,
	...useCaseInstaceContainer,
};
