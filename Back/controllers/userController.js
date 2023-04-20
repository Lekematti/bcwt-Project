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

const getUser = async (req, res) => {
    //convert id value to number
    const userId = Number(req.params.id);
    //check if a number is not an integer
    if(!Number.isInteger(userId)) {
        res.status(400).json({error: 500, message: 'invalid id'})
        return;
    }
    try {
        const [user] = await userModel.getUserById(userId)
        res.json(user);
    }
    catch (error){
        res.status(404).json({message: 'user not found'});
    }
}
const postUser = async (req, res) => {
    console.log('Creating a new user: ', req.body);
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.passwd, salt);
    const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: password,
        role: 1, // default user role (normal user)
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


/*const putUser = async (reg, res) => {
    console.log('modify a user', req.body);
    try {
        const user = req.body;
        const result = await userModel.modifyUser(user)
        // send correct response if upload successful
        res.status(200).json({message: 'user modified'});
    }
    catch (error){
        res.status(400).json({error: 500, message: 'user modifying failed'})
    }
}

const deleteUser = async (reg, res) => {
    console.log('delete a cat', req.params.userId);
    try {
        const result = await userModel.deleteUser(req.params.userId)
        // send correct response if upload successful
        res.status(200).json({message: 'user deleted'});
    }
    catch (error){
        res.status(400).json({error: 500, message: 'user deletion failed'})
    }
}*/
const checkToken = (req, res) => {
    res.json({user: req.user});
};

const userController = {getUserList, getUser, postUser, checkToken,} // putUser, deleteUser
module.exports = userController;

