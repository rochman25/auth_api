/* istanbul ignore file */

// external agency
const {nanoid} = require('nanoid');
const bcrypt = require('bcrypt');
const pool = require('./database/postgres/pool');

// Service (repository, helper, manager, etc)
const UserRepositoryPostgres = require('./repository/UserRepositoryPostgres');
const BcryptEncryptionHelper = require('./security/BcryptEncryptionHelper');

// Use case
const AddUserUseCase = require('../Applications/use_case/AddUserUseCase');

const serviceInstanceContainer = {
	userRepository: new UserRepositoryPostgres(pool, nanoid),
	encryptionHelper: new BcryptEncryptionHelper(bcrypt),
};

const useCaseInstaceContainer = {
	addUserUseCase: new AddUserUseCase({
		userRepository: serviceInstanceContainer.userRepository,
		encryptionHelper: serviceInstanceContainer.encryptionHelper,
	}),
};

// Export all instance
module.exports = {
	...serviceInstanceContainer,
	...useCaseInstaceContainer,
};
