// This module is responsible for communicating with the database to perform CRUD operations on the "message" table.
'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

// Retrieve all posts from the "message" table and join them with "user" table based on "user_Id".
const getAllPosts = async () => {
    try {
        const [rows] = await promisePool.query(
            `SELECT * FROM message LEFT JOIN user ON message.user_Id = user.u_Id
         ORDER BY message.timestamp DESC`);
        return rows;
    } catch (error) {
        console.error('error occurred while executing the query:', error);
        throw error;
    }
};
// Retrieve a post from the "message" table with a specific id, and join it with the "user" table based on "user_Id".
const getPostById = async (id) => {
    try {
        const sql = `SELECT message.*, user.userName AS Owner FROM message LEFT JOIN user ON message.user_Id = user.u_Id WHERE m_Id =?`;
        const [rows] = await promisePool.query(sql, [id]);
        return rows;
    } catch (e) {
        console.error('error', e.message);
        throw new Error('sql query failed');
    }
};
// Insert a new post into the "message" table.
const insertPost = async (post) => {
    try {
        const sql = `INSERT INTO message VALUES (?, ?, ?, ?, ?, ?);`;
        const [rows] = await promisePool.query(sql, [
            null,
            post.title,
            post.content,
            post.filename,
            post.timeStamp,
            post.user_Id,
        ]);
        console.log(rows);
        return rows;
    } catch (e) {
        console.error('error', e.message);
        throw new Error('sql insert post failed');
    }
};
// Delete a post with a specific id from the "message" table.
const deletePost = async (id, userId) => {
    try {
        const sql = 'DELETE FROM message WHERE m_Id=? AND user_Id=?';
        const [rows] = await promisePool.query(sql, [id, userId]);
        console.log(rows);
        return rows;
    } catch (e) {
        console.error('error', e.message);
        throw new Error('sql delete post failed');
    }
};
// Export the functions for use in other modules.
module.exports = {
    getAllPosts,
    getPostById,
    insertPost,
    deletePost,
};