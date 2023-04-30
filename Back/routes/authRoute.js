'use strict';
const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const {login, logout} = require('../controllers/authController');
const {postUser} = require('../controllers/userController');

router
    .post('/login', login)
    .get('/logout', logout)
    .post(
        '/register',
        body('userName').isAlphanumeric().isLength({min: 1, max: 40}).escape().trim(),
        body('email').isEmail().normalizeEmail(),
        body('password').isLength({min: 4}).trim(),
        postUser
    );

module.exports = router;