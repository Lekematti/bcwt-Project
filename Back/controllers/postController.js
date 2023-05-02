// catController
'use strict';
const postModel = require('../models/postModel');
const {validationResult} = require('express-validator');

const getPostList = async (req, res) => {
    try {
        const posts = await postModel.getAllPosts();
        res.json(posts);
    } catch (error) {
        res.status(500).json({error: 500, message: error.message});
    }
};


const getPost = async (req, res) => {
    //convert id value to number
    const postId = Number(req.params.id);
    //check if a number is not an integer
    if(!Number.isInteger(postId)) {
        res.status(400).json({error: 500, message: 'invalid id'})
        return;
    }
    try {
        const [post] = await postModel.getPostById(postId)
        res.json(post);
    }
    catch (error) {
        res.status(404).json({message: 'post not found'});
    }
}


const postPost = async (req, res) => {
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

const postController = {getPostList, getPost, postPost, deletePost,};
module.exports = postController;
