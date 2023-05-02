'use strict';
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {body} = require('express-validator')

router.route('/')
    .get(userController.getUserList)
    .post(
        body('userName').isAlphanumeric().isLength({min: 1, max: 40}).escape().trim(),
        body('email').isEmail().normalizeEmail(),
        body('password').isLength({min: 4}),
        userController.postUser)
router.get("/token", userController.checkToken);
router.get("/:userId", userController.getUser);

module.exports = router;