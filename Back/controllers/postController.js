// catController
'use strict';
const postModel = require('../models/postModel');
const {validationResult} = require('express-validator');
//const {makeThumbnail} = require('../utils/image');
const cats = postModel.cats
//testi
const getCatList = (req, res) => {
    res.json(cats);
}

//testi
const getCat = (req, res) => {
    const id = req.params.catId;
    const filteredCats = cats.find(cat => cat.id === id);
    //const filteredCats2 = cats.filter(cat => id == cat.id); //other way of filtering
    if (!filteredCats){
        res.status(404).send('cat not found')
        return;
    }
    res.json(filteredCats);
}


const getPostList = async (req, res) => {
    try {
        const posts = await postModel.getAllPosts();
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

const postController = {getPostList, postPost, getCatList, getCat,};
module.exports = postController;
