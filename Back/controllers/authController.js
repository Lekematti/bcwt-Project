'use strict';
const jwt = require('jsonwebtoken');
const passport = require('passport');
const userModel = require('../models/userModel'); // import the module that defines userModel
require('dotenv').config();

const login = async (req, res) => {
    passport.authenticate('local', { session: false }, async (err, user, info) => {
        if (err || !user) {
            return res.status(401).json({
                message: 'Wrong username or password',
            });
        }

        try {
            // Get user by username
            const [user] = await userModel.getUserLogin(user.userName);

            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Check if password is correct
            const isPasswordCorrect = await bcrypt.compare(user.password, user.password);

            if (!isPasswordCorrect) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Generate and send JWT token
            const token = jwt.sign({ Id: user.u_Id }, process.env.JWT_SECRET);
            return res.json({ user: user, token });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Something went wrong' });
        }
    })(req, res);
};
const logout = (req, res) => {
    // Client logs out itself by removing the token from local/session storage
    res.json({message: 'Logged out!'});
};

module.exports = {
    login,
    logout,
};
