'use strict';
const userModel = require('../models/userModel');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');

// Get list of all users
const getUserList = async (req, res) => {
    try {
        const users = await userModel.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
// Get a user by their ID
const getUser = async (req, res) => {
    console.log(req.params);
    const id = req.params.userId;
    const user = await userModel.getUserById(id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({message: 'User not found.'});
    }
};
// Create a new user
const postUser = async (req, res) => {
    console.log('Creating a new user: ', req.body);

    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    const newUser = {
        userName: req.body.userName,
        email: req.body.email,
        password: password,
    };
    // Check if there are validation errors
    const errors = validationResult(req);
    console.log('validation errors', errors);
    if (errors.isEmpty()) {
        try {
            const result = await userModel.insertUser(newUser);
            res.status(201).json({message: 'user created', userId: result});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    } else {
        res.status(400).json({
            message: 'user creation failed',
            errors: errors.array(),
        });
    }
};
// Check if the JWT token is valid
const checkToken = (req, res) => {
    res.json({user: req.user});
};
const userController = {
    getUserList,
    getUser,
    postUser,
    checkToken,
};
module.exports = userController;