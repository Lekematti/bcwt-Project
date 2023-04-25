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

const getPost = async (req, res) => {
    // convert id value to number
    const postId = Number(req.params.id);
    // check if number is not an integer
    if (!Number.isInteger(postId)) {
        res.status(400).json({error: 500, message: 'invalid id'});
        return;
    }
    // TODO: wrap to try-catch
    const [post] = await postModel.getPostById(postId);
    // console.log('getCat', cat);
    if (post) {
        res.json(post);
    } else {
        // send response 404 if id not found in array
        // res.sendStatus(404);
        res.status(404).json({message: 'post not found.'});
    }
};

const postPost = async (req, res) => {
    // console.log('posting a post', req.body, req.file);
    if (!req.file) {
        res.status(400).json({
            status: 400,
            message: 'Invalid or missing image file'
        });
        return;
    }
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        res.status(400).json({
            status: 400,
            errors: validationErrors.array(),
            message: 'Invalid post data'
        });
        return;
    }
    const newPost = req.body;
    newPost.filename = req.file.filename;
    newPost.userName = req.user.Id;
    await makeThumbnail(req.file.path, newPost.filename);
    try {
        const result = await postModel.insertpost(newpost);
        res.status(201).json({message: 'new post added!'});
    } catch (error) {
        res.status(500).json({error: 500, message: error.message});
    }
};

const putPost = async (req, res) => {
    // console.log('modifying a post', req.body);
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        res.status(400).json({
            status: 400,
            errors: validationErrors.array(),
            message: 'Invalid PUT data'
        });
        return;
    }
    const post = req.body;
    post.userName = req.user.Id;
    if (req.params.id) {
        post.id = parseInt(req.params.id);
    }
    try {
        console.log('updating a post', req.body);
        // only owner of the cat can update it's data (req.user.user_id == cat.owner)
        // checked in catModel with sql query
        const result = await postModel.modifyPost(post, req.user.Id);
        res.status(200).json({message: 'pot modified!'});
    } catch (error) {
        res.status(500).json({error: 500, message: error.message});
    }
};

const deletePost = async (req, res) => {
    // console.log('deleting a post', req.params.id);
    try {
        // only owner of the cat can delete it (TODO: or admin)
        const result = await postModel.deletePost(req.params.id, req.user.Id);
        res.status(200).json({message: 'cat deleted!'});
    } catch (error) {
        res.status(500).json({error: 500, message: error.message});
    }
};

const postController = {getPostList, getPost, postPost, putPost, deletePost};
module.exports = postController;

