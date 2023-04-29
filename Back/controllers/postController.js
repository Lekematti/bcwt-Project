// catController
'use strict';
const postModel = require('../models/postModel');
const {validationResult} = require('express-validator');
//const {makeThumbnail} = require('../utils/image');

const getPostList = async (req, res) => {
    try {
        const posts = await postModel.getAllPosts();
        // Functionality below is now done in 'db.js' by 'dateStrings: true' setting
        // convert ISO date to date only
        // cats = cats.map((cat) => {
        //   cat.birthdate = cat.birthdate.toISOString().split('T')[0];
        //   return cat;
        // });
        res.json(posts);
    } catch (error) {
        res.status(500).json({error: 500, message: error.message});
    }
};



const postPost = async (req, res) => {
    // console.log('posting a post', req.body, req.file);
    // if (!req.file) {
    //     res.status(400).json({
    //         status: 400,
    //         message: 'Invalid or missing image file'
    //     });
    //     return;
    // }
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        res.status(400).json({
            status: 400,
            errors: validationErrors.array(),
            message: 'Invalid post data'
        });
        return;
    }
    const newPost = {
        title: req.body.title,
        content: req.body.content,
        filename: req.file.filename,

    }
    newPost.filename = req.file.filename;
    //use req.user (extracted from token by passport) to add correct owner id
    // NOTE: owner field must not be validated anymore in cat route when uploading cats
    //newPost.owner = req.user.user_id;
    //await makeThumbnail(req.file.path, newPost.filename);
    try {
        const result = await postModel.insertPost(newPost);
        res.status(201).json({message: 'New post added'});
    } catch (error) {
        res.status(500).json({error: 500, message: error.message});
    }
};

const deletePost = async (req, res) => {

    try {
        console.log('deleting a post', req.params.id);
        // only owner of the post can delete it (TODO: or admin)
        const result = await postModel.deletePost(req.params.id/*, req.user.u_Id*/);
        res.status(200).json({message: 'post deleted!'});
    } catch (error) {
        res.status(500).json({error: 500, message: error.message});
    }
};

const postController = {getPostList, postPost, deletePost,};
module.exports = postController;
