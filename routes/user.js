const express = require('express');
const router = express.Router();
const passport = require('passport')
const userController = require('../controllers/user')

router.route('/basic')
    .post(
        passport.authenticate('local'),
        userController.basicAuth
    )

router.route('/token')
    .post(
        userController.checkBasicToken,
        passport.authenticate('local'),
        userController.getToken
    )

router.route('/profile')
    .get(
        passport.authenticate('bearer'),
        userController.getProfile
    )

module.exports = router;

