const basicToken = require("../lib/basicToken")
const jwtToken = require("../lib/jwtToken");
const userModel = require('../model/user')

const basicAuth = async(req, res) => {
    try {
        const userToken = await basicToken.signToken()
        return res.json({
            basicToken: userToken,
        })
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            status: false,
            message: 'Unauthorized'
        })
    }
}

const checkBasicToken = async(req, res, next) => {
    try {
        const auth = req.headers.authorization || '';
        const token = auth.split(' ');
        if (!token[1]){
            throw(new Error('token not match'))
        }
        const checkToken = await basicToken.compareToken(token[1])
        if (!checkToken) {
            throw(new Error('token not match'))
        }
        return next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            status: false,
            message: 'Unauthorized'
        })
    }
}

const getToken = async(req, res) => {
    try {
        const {username} = req.body;
        const payload = {
            username,
            id: req.user && req.user.id
        };
        const bearerToken = await jwtToken.encode(payload)
        return res.json({
            bearerToken
        })
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            status: false,
            message: 'Unauthorized'
        })
    }
}

const getProfile = async(req, res, next) => {
    try {
        const  user = userModel.getById(req.user.id) || {}
        return res.json({
            status: true,
            data: user
        })
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            status: false,
            message: 'Unauthorized'
        })
    }
}


module.exports = {
    getToken,
    basicAuth,
    checkBasicToken,
    getProfile
}