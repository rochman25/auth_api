/* eslint-disable no-unused-vars */
class UserRepository {
	async addUser(newUser) {
		throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
	}

	async verifyAvailableUsername(username) {
		throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
	}
}

module.exports = UserRepository;
