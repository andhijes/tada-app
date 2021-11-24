require("dotenv").config();
const CLIENT_KEY = process.env.CLIENT_KEY;
const SALT = process.env.SALT;

const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const signToken = async() => {
  try {
    const date = new Date().toDateString()
    const key = CLIENT_KEY + date;
    const basicSign = await bcrypt.hash(key, SALT);
    return basicSign;
  } catch (error) {
    throw(error)
  }
};

const compareToken = async(hash) => {
  const date = new Date().toDateString()
  const key = CLIENT_KEY + date;
  return await bcrypt.compare(key, hash)
}

const _signToken = user => {
    return JWT.sign(
      {
        iss: "tadaApp",
        sub: user.id
      },
      'wfweofehfowehfiowehf'
    );
  };

const basicToken = {
    signToken,
    compareToken
};

module.exports = basicToken;
  