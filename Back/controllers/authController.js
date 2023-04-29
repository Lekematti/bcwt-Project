'use strict';
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('dotenv').config();

const login = (req, res) => {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        console.log('err:', err);
        console.log('user:', user);
        console.log('info:', info);
        if (err || !user) {
            console.log('auth error', info);
            return res.status(401).json({
                message: 'Wrong username or password',
            });
        }
        req.login(user, {session: false}, (err) => {
            if (err) {
                res.json({message: err});
            }
            // generate a signed json web token with the user id in payload and return it in the response
            const token = jwt.sign({Id: user.Id}, process.env.JWT_SECRET);
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