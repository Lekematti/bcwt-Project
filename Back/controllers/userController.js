// userController
'use strict';
const userModel = require('../models/userModel');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');

const getUserList = async (req, res) => {
    try {
        const users = await userModel.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};



// const getUser = async (req, res) => {
//     //convert id value to number
//     const userId = Number(req.params.userId);
//     //check if a number is not an integer
//     if(!Number.isInteger(userId)) {
//         res.status(400).json({error: 500, message: 'invalid id'})
//         return;
//     }
//     try {
//         const [user] = await userModel.getUserById(userId)
//         res.json(user);
//     }
//     catch (error){
//         res.status(404).json({message: 'user not found'});
//     }
// }

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

const postUser = async (req, res) => {
    console.log('Creating a new user: ', req.body);
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    const newUser = {
        userName: req.body.userName,
        email: req.body.email,
        password: password,
    };
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

