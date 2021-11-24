const listOfUser = require("../db/user");

const getById = (id) => {
    return listOfUser[id]
}

const findOne = ({username, password}) => {
    try {
        const userId = listOfUser.findIndex((user) => user.username === username);
        if (userId === -1) {
            throw new Error('user not found')
        }
        const user = listOfUser[userId];
        user.id = userId;

        if (user.password !== password) {
            throw new Error('user not found')
        }
        
        return user;
    } catch (error) {
        throw(error)
    }
}

module.exports = {
    findOne,
    getById
}