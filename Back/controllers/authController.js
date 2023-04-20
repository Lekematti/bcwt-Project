'use strict';
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('dotenv').config();

const login = (req, res) => {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            console.log('auth error', info);
            return res.status(401).json({
                message: 'Wrong username or password',
                // or more detailed message from passport:
                //message: info.message,
            });
        }
        req.login(user, {session: false}, (err) => {
            if (err) {
                res.json({message: err});
            }
            // generate a signed json web token with the user id in payload and return it in the response
            const token = jwt.sign({user_id: user.user_id}, process.env.JWT_SECRET);
            return res.json({user, token});
        });
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