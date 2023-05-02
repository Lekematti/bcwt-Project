'use strict';
const postModel = require('../models/postModel');
const {validationResult} = require('express-validator');

const getPostList = async (req, res) => {
    try {
// Get all posts
        const posts = await postModel.getAllPosts();
        res.json(posts);
    } catch (error) {
// Return error message if any error occurred while getting posts
        res.status(500).json({error: 500, message: error.message});
    }
};

const getPost = async (req, res) => {
// Convert id value to number
    const postId = Number(req.params.id);
// Check if a number is not an integer
    if(!Number.isInteger(postId)) {
// Return error if the postId is not a valid integer
        res.status(400).json({error: 500, message: 'invalid id'})
        return;
    }
    try {
// Get post by id
        const [post] = await postModel.getPostById(postId)
        res.json(post);
    }
    catch (error) {
// Return error message if post not found
        res.status(404).json({message: 'post not found'});
    }
}
const postPost = async (req, res) => {
// Validate request body
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
// Return error message if there is any validation error
        res.status(400).json({
            status: 400,
            errors: validationErrors.array(),
            message: 'Invalid post data'
        });
        return;
    }
// Create new post object
    const newPost = {
        title: req.body.title,
        content: req.body.content,
        filename: req.file.filename,
    }
// Set filename of the new post
    newPost.filename = req.file.filename;
    try {
        // Insert new post into database
        const result = await postModel.insertPost(newPost);
        res.status(201).json({message: 'New post added'});
    } catch (error) {
        // Return error message if any error occurred while inserting new post into database
        res.status(500).json({error: 500, message: error.message});
    }
};
const deletePost = async (req, res) => {
    try {
// Delete post from database by id
        console.log('deleting a post', req.params.id);
        const result = await postModel.deletePost(req.params.id, req.user.u_Id);
        res.status(200).json({message: 'post deleted!'});
    } catch (error) {
// Return error message if any error occurred while deleting post from database
        res.status(500).json({error: 500, message: error.message});
    }
};
const postController = {getPostList, getPost, postPost, deletePost,};
module.exports = postController;
