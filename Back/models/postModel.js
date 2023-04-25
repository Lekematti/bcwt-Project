'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllPosts = async () => {
    try {
        // do the LEFT (or INNER) JOIN to get owner's name as ownername (from wop_user table).
        const sql = `SELECT wop_cat.*, wop_user.name AS ownername FROM wop_cat
        LEFT JOIN wop_user ON wop_cat.owner = wop_user.user_id`;
        const [rows] = await promisePool.query(sql);
        console.log(rows);
        return rows;
    } catch (e) {
        console.error('error', e.message);
        throw new Error('sql query failed');
    }
};

const getPostById = async (id) => {
    try {
        const sql = `SELECT wop_cat.*, wop_user.name AS ownername FROM wop_cat
        LEFT JOIN wop_user ON wop_cat.owner = wop_user.user_id
        WHERE cat_id = ?`;
        const [rows] = await promisePool.query(sql, [id]);
        // console.log(rows);
        return rows;
    } catch (e) {
        console.error('error', e.message);
        throw new Error('sql query failed');
    }
};
const insertPost = async (cat) => {
    try {
        const sql = `INSERT INTO wop_cat VALUES (?, ?, ?, ?, ?, ?);`;
        const [rows] = await promisePool.query(sql, [
            null, // id is auto_increment
            cat.name,
            cat.weight,
            cat.owner,
            cat.filename,
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
    getPostById,
    insertPost,
    modifyPost,
    deletePost,
};