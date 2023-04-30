'use strict';
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {body} = require('express-validator')

router.route('/')
    .get(userController.getUserList)
    .post(

        body('username').isAlphanumeric().isLength({min: 1, max: 40}).escape().trim(),
        body('email').isEmail().normalizeEmail(),
        body('password').isLength({min: 4}),
        userController.postUser)
router.get("/token", userController.checkToken);
/*router.route('/')
    .get(
        body('userNameUp').isAlphanumeric().isLength({min: 1, max: 40}).escape().trim(),
        body('emailUp').isEmail().normalizeEmail(),
        body('passwordUp').isLength({min: 4}),
        userController.getUser)*/
//.delete(userController.deleteUser);
router.route('/:id')
    .get(userController.getUser)
module.exports = router;