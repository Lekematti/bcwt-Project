'use strict';
const express = require('express');
const multer = require('multer');
const router = express.Router();
const postController = require('../controllers/postController');
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

router.get('/', postController.getPostList)

router.route('/')
    .get(postController.getPostList)
    .post(upload.single('filename'),
        body('title'),
        body('content'),
        body('filename'),
        body('timeStamp'),
        body('user_Id'),
        postController.postPost
    )
router.route('/:id')
    .delete(postController.deletePost);

module.exports = router;