const users = [];

const addUser = (peerId, socketId) => {
	// console.log(peerId, socketId);
	const existingUser = users.find((user) => user.socketId === socketId);

	if (existingUser) {
		return;
	}
	const user = { peerId, socketId };

	users.push(user);
	return user;
};

const allusers = () => {
	return users;
};

const removeUser = (id) => {
	const index = users.findIndex((user) => user.socketId === id);

	if (index !== -1) {
		return users.splice(index, 1)[0];
	}
};

module.exports = {
	addUser,
	allusers,
	removeUser,
};
