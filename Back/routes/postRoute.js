'use strict';
const express = require('express');
const multer = require('multer');
const router = express.Router();
const postController = require('../controllers/postController');
const {body} = require('express-validator');

// const fileFilter = (req, file, cb) => {
//     const allowedTypes = ['image/jpeg', 'image/png'];
//     if (allowedTypes.includes(file.mimetype)) {
//         // accept file
//         cb(null, true);
//     } else {
//         // reject file
//         cb(null, false);
//     }
// };
const upload = multer({dest: 'uploads/'/*, fileFilter*/});


//testi
router.get('/', postController.getPostList)
router.get('/uploads', postController.getPostList)
router.get('/:catId',postController.getCat)

// Root of cat endpoing (e.g. http://localhost:3000/post)
router.route('/')
    .get(postController.getPostList)
    .post(upload.single('photo'),
        body('title'),
        body('content'),
        body('photo'),
        body('timeStamp'),
        body('user_Id'),
        postController.postPost
    )
    // .put(
    //     body('postName'),
    //     body('postText'),
    //     body('file'),
    //     postController.putPost
    // );

// All :id endpoints
// router.route('/:id')
//     .get(postController.getPost)
//     .delete(postController.deletePost);

module.exports = router;