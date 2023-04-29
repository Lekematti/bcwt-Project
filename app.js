'use strict';
const express = require('express');
const cors = require('cors');
const postRoute = require('./Back/routes/postRoute');
const userRoute = require('./Back/routes/userRoute');
const authRoute = require('./Back/routes/authRoute');
const passport = require('./Back/utils/passport');
const app = express();
const port = 3000;


// Log requests middleware
app.use((req, res, next) => {
    console.info(req.method + ' ' + req.path);//new Date() + ': ' +
    next();
});
// Serve example-ui
app.use(express.static('Front'));
// Serve uploaded image files (example-ui compliant using root route)
app.use('/uploads',express.static('uploads'));
// serve thumbnails
app.use('/thumbnails', express.static('thumbnails'));
// responses using cors middleware
app.use(cors());
// middleware for parsing request body
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Use passport for authentication
app.use(passport.initialize());

app.use('/post', postRoute);
app.use('/auth', authRoute);
app.use('/user', passport.authenticate('jwt', {session: false}), userRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
