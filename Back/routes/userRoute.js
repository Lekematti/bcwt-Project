'use strict';
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {body} = require('express-validator')

router.route('/')
    .get(userController.getUserList)
    .post(

        body('userNameIn').isAlphanumeric().isLength({min: 1, max: 40}).escape().trim(),
        body('userNameUp').isAlphanumeric().isLength({min: 1, max: 40}).escape().trim(),
        //body('emailUp').isEmail().normalizeEmail(),
        body('passwordIn').isLength({min: 4}),
        body('passwordUp').isLength({min: 4}),
        userController.postUser)

router.route('/')
    .get(
        body('userNameUp').isAlphanumeric().isLength({min: 1, max: 40}).escape().trim(),
        body('emailUp').isEmail().normalizeEmail(),
        body('passwordUp').isLength({min: 4}),
        userController.getUser)


//router.get("/token", userController.checkToken);
//.delete(userController.deleteUser);

module.exports = router;