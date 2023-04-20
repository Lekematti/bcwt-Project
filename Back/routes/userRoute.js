'use strict';
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {body} = require('express-validator')

router.route('/')
    .get(userController.getUserList)
    .post(
        body('name').isAlphanumeric().isLength({min: 1, max: 40}).escape().trim(),
        body('email').isEmail(),
        body('passwd').isLength({min: 8}),
        userController.postUser)
//.put(userController.putUser)

router.get("/token", userController.checkToken);

// all /cat/:id endpoints
router.route('/:id')
    .get(
        body('name').isAlphanumeric().isLength({min: 1, max: 40}).escape().trim(),
        body('email').isEmail(),
        body('passwd').isLength({min: 8}),
        userController.getUser)
//.delete(userController.deleteUser);

module.exports = router;