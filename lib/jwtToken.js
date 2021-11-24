require("dotenv").config();
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const jwt = require('jwt-simple');

const encode = async(user) => {
  try {
    const payload = {
        name: user.username,
        id: user.id,
        exp: new Date().setDate(new Date().getDate() + 60)
    }
    const token = jwt.encode(payload, CLIENT_SECRET);
    return token;
  } catch (error) {
    throw(error)
  }
};

const decode = async(token) => {
  try {
    const date = new Date().getTime();
    const decoded = jwt.decode(token, CLIENT_SECRET) || {};
    const {name, exp, id} = decoded;

    if(!name || !exp || id === undefined) {
        throw(new Error('Invalid token'))
    }

    if (exp < date) {
        throw(new Error('Invalid token'))
    }

    return decoded;

  } catch (error) {
    throw(error)
  }
}

const jwtToken = {
    encode,
    decode
};

module.exports = jwtToken;
  