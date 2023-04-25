'use strict';
const express = require('express');
const cors = require('cors');
const catRoute = require('./routes/postRoute');
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
const passport = require('./utils/passport');
const app = express();
const port = 3000;

// Log requests middleware
app.use((req, res, next) => {
    console.info(new Date() + ': ' + req.method + ' ' + req.path);
    next();
});

// Serve example-ui
app.use(express.static('example-ui'));
// Serve uploaded image files
//app.use('/uploads', express.static('uploads'));
// Serve uploaded image files (example-ui compliant using root route)
app.use(express.static('uploads'));
// serve thumbnails
app.use('/thumbnails', express.static('thumbnails'));

// Add 'Access-Control-Allow-Origin: *' header to all
// responses using cors middleware
app.use(cors());
// middleware for parsing request body
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// Use passport for authentication
app.use(passport.initialize());

app.use('/auth', authRoute);
app.use('/cat', passport.authenticate('jwt', {session: false}), catRoute);
app.use('/user', passport.authenticate('jwt', {session: false}), userRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));