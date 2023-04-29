'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllPosts = async () => {
    try {
        const [rows] = await promisePool.query(
            `SELECT * FROM message 
    LEFT JOIN user ON message.user_Id = user.Id ORDER BY message.timestamp DESC`
        );
        return rows;
    } catch (error) {
        console.error('error occurred while executing the query:', error);
        throw error;
    }
};

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

module.exports = {
    getAllPosts,
    insertPost,
};