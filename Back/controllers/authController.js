'use strict';
const jwt = require('jsonwebtoken');
const passport = require('passport');
// Loading environment variables from .env file.
require('dotenv').config();

const login = (req, res) => {
    console.log(req.body)
    // Authenticating the user using passport middleware.
    passport.authenticate('local', {session: false}, (err, user, info) => {
        console.log("error: ",err)
        console.log("user not found: ",!user)
        // If authentication fails due to an error or a missing user
        if (err || !user) {
            console.log('auth error', info);
            return res.status(401).json({
                // Returning an Unauthorized status and a JSON response with an error message.
                message: 'Wrong username or password',
            });
        }
        req.login(user, {session: false}, (err) => {
            if (err) {
                res.json({message: err});
            }
            // generate a signed json web token with the user id in payload and return it in the response
            const token = jwt.sign({u_Id: user.u_Id}, process.env.JWT_SECRET);
            return res.json({user, token});
        });
    })(req, res);
};
const logout = (req, res) => {
    // Client logs out itself by removing the token from local/session storage
    res.json({message: 'Logged out!'});
};
// Exporting the login and logout functions to be used in other modules.
module.exports = {
    login,
    logout,
};
