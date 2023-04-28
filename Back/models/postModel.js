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
        filename: '/img/',
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
        filename: '/img/',
    },
    {
        id: '4',
        name: 'Frank',
        birthdate: '2010-10-30',
        weight: '5',
        owner: '1',
        filename: '/img/',
    },

];

const getAllPosts = async () => {
    try {
        // do the LEFT (or INNER) JOIN to get owner's name as ownername (from wop_user table).
        const sql = `SELECT * FROM message`;
        const [rows] = await promisePool.query(sql);
        console.log(rows);
        return rows;
    } catch (e) {
        console.error('error', e.message);
        throw new Error('sql query failed');
    }
};


const insertPost = async (post) => {
    try {
        const sql = `INSERT INTO message VALUES (?, ?, ?);`;
        const [rows] = await promisePool.query(sql, [
            post.title,
            post.content,
            post.photo,
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