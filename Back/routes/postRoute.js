'use strict';
const express = require('express');
const multer = require('multer');
const router = express.Router();
const catController = require('../controllers/postController');
const {body} = require('express-validator');

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
        // accept file
        cb(null, true);
    } else {
        // reject file
        cb(null, false);
    }
};
const upload = multer({dest: 'uploads/', fileFilter});

// Root of cat endpoing (e.g. http://localhost:3000/cat)
router.route('/')
    .get(catController.getPostList)
    .post(upload.single('post'),
        body('postName').isAlphanumeric().isLength({min: 1, max: 50}).escape().trim(),
        body('postText').isDate(),
        body('file').isInt({min: 1}),
        catController.post
    )
    .put(
        body('postName').isAlphanumeric().isLength({min: 1, max: 50}),
        body('postText').isLength({min:1, max:255}),
        body('file').isFloat({min: 0.1, max: 50}),
        catController.putPost
    );

// All /cat/:id endpoints
router.route('/:id')
    .get(postController.getPost)
    .delete(catController.deletePost);

module.exports = router;