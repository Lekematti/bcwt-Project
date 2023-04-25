// catController
'use strict';
const catModel = require('../models/postModel');
const {validationResult} = require('express-validator');
//const {makeThumbnail} = require('../utils/image');

const getPostList = async (req, res) => {
    try {
        const cats = await catModel.getAllCats();
        // Functionality below is now done in 'db.js' by 'dateStrings: true' setting
        // convert ISO date to date only
        // cats = cats.map((cat) => {
        //   cat.birthdate = cat.birthdate.toISOString().split('T')[0];
        //   return cat;
        // });
        res.json(cats);
    } catch (error) {
        res.status(500).json({error: 500, message: error.message});
    }
};

const getPost = async (req, res) => {
    // convert id value to number
    const catId = Number(req.params.id);
    // check if number is not an integer
    if (!Number.isInteger(catId)) {
        res.status(400).json({error: 500, message: 'invalid id'});
        return;
    }
    // TODO: wrap to try-catch
    const [cat] = await catModel.getCatById(catId);
    // console.log('getCat', cat);
    if (cat) {
        res.json(cat);
    } else {
        // send response 404 if id not found in array
        // res.sendStatus(404);
        res.status(404).json({message: 'Cat not found.'});
    }
};

const post = async (req, res) => {
    // console.log('posting a cat', req.body, req.file);
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
    const newCat = req.body;
    newCat.filename = req.file.filename;
    // use req.user (extracted from token by passport) to add correct owner id
    // NOTE: owner field must not be validated anymore in cat route when uploading cats
    newCat.owner = req.user.user_id;
    await makeThumbnail(req.file.path, newCat.filename);
    try {
        const result = await postModel.insertCat(newCat);
        res.status(201).json({message: 'new cat added!'});
    } catch (error) {
        res.status(500).json({error: 500, message: error.message});
    }
};

const putPost = async (req, res) => {
    // console.log('modifying a cat', req.body);
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        res.status(400).json({
            status: 400,
            errors: validationErrors.array(),
            message: 'Invalid PUT data'
        });
        return;
    }
    const cat = req.body;
    // for now owner is always the logged in user (read from token)
    cat.owner = req.user.user_id;
    // Note the two alternatives for passing the cat id in router
    if (req.params.id) {
        cat.id = parseInt(req.params.id);
    }
    try {
        console.log('updating a cat', req.body);
        // only owner of the cat can update it's data (req.user.user_id == cat.owner)
        // checked in catModel with sql query
        const result = await postModel.modifyCat(cat, req.user.user_id);
        res.status(200).json({message: 'cat modified!'});
    } catch (error) {
        res.status(500).json({error: 500, message: error.message});
    }
};

const deletePost = async (req, res) => {
    // console.log('deleting a cat', req.params.id);
    try {
        // only owner of the cat can delete it (TODO: or admin)
        const result = await catModel.deleteCat(req.params.id, req.user.user_id);
        res.status(200).json({message: 'cat deleted!'});
    } catch (error) {
        res.status(500).json({error: 500, message: error.message});
    }
};

const catController = {getPostList, getPost, post, putPost, deletePost};
module.exports = catController;


