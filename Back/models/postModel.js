'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

//testi
const cats = [
    {
        id: '1',
        name: 'Frank',
        birthdate: '2010-10-30',
        weight: '5',
        owner: '1',
        filename: 'img/',
    },
    {
        id: '2',
        name: 'James',
        birthdate: '2015-12-25',
        weight: '11',
        owner: '2',
        filename: 'http://placekitten.com/400/302',
    },
    {
        id: '3',
        name: 'Frank',
        birthdate: '2010-10-30',
        weight: '5',
        owner: '1',
        filename: 'img/',
    },
    {
        id: '4',
        name: 'Frank',
        birthdate: '2010-10-30',
        weight: '5',
        owner: '1',
        filename: 'img/',
    },

];

const getAllPosts = async () => {
    try {
        const [rows] = await promisePool.query(
            `SELECT message.*, user.name AS ownername FROM message 
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
            post.photo,
            post.timeStamp,
            post.user_Id,
        ]);
        // console.log(rows);
        return rows;
    } catch (e) {
        console.error('error', e.message);
        throw new Error('sql insert post failed');
    }
};


module.exports = {
    getAllPosts,
    insertPost,
    cats,
};