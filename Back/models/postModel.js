'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllPosts = async () => {
    try {

        const sql = `SELECT * FROM message, user.Id
        LEFT JOIN user ON message.user_Id = user.Id`;
        const [rows] = await promisePool.query(sql);
        console.log(rows);
        return rows;
    } catch (e) {
        console.error('error', e.message);
        throw new Error('sql query failed');
    }
};
const insertPost = async (message) => {
    try {
        const sql = `INSERT INTO message VALUES (?, ?, ?) INTO media VALUES (?);`;
        const [rows] = await promisePool.query(sql, [
            null, // id is auto_increment
            message.header,
            message.text,
            message.filename,
        ]);
        // console.log(rows);
        return rows;
    } catch (e) {
        console.error('error', e.message);
        throw new Error('sql insert cat failed');
    }
};

const modifyPost = async (cat) => {
    try {
        const sql = `UPDATE wop_cat SET name=?, weight=?, owner=?, birthdate=?
            WHERE cat_id=?`;
        const [rows] = await promisePool.query(sql, [
            cat.name,
            cat.weight,
            cat.owner,
            cat.birthdate,
            cat.id
        ]);
        // console.log(rows);
        return rows;
    } catch (e) {
        console.error('error', e.message);
        throw new Error('sql update cat failed');
    }
};

const deletePost = async (id) => {
    try {
        const sql = `DELETE FROM wop_cat WHERE cat_id=?`;
        const [rows] = await promisePool.query(sql, [id]);
        // console.log(rows);
        return rows;
    } catch (e) {
        console.error('error', e.message);
        throw new Error('sql delete cat failed');
    }
};

module.exports = {
    getAllPosts,
    insertPost,
    modifyPost,
    deletePost,
};