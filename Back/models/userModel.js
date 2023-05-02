//This is a module for user-related database operations.
'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

// Get all users from the database
const getAllUsers = async () => {
    try {
        const sql = `SELECT u_Id, userName ,email FROM user`;
        const [rows] = await promisePool.query(sql);
        return rows;
    } catch (e) {
        console.error('error', e.message);
        throw new Error('sql query failed');
    }
};
// Get user login data (username and password) by username
const getUserLogin = async (user) => {
    try {
        console.log('get user login for', user);
        const [rows] = await promisePool.execute(
            'SELECT userName, password FROM user WHERE userName=?;',
            [user]);
        console.log('getUserLogin result:', rows);
        return rows;
    } catch (e) {
        console.log('error', e.message);
    }
};
// Get a user's details by ID
const getUserById = async (id) => {
    try {
        const sql = `SELECT u_Id, userName, email FROM user WHERE u_Id=?`;
        const [rows] = await promisePool.query(sql, [id]);
        return rows[0];
    } catch (e) {
        console.error('error', e.message);
        throw new Error('sql query failed');
    }
};
// Insert a new user into the database
const insertUser = async (user) => {
    try {
        const sql = `INSERT INTO user VALUES (null, ?, ?, ?)`;
        const values = [user.userName, user.email, user.password];
        const [result] = await promisePool.query(sql, values);
        return result.insertId;
    } catch (e) {
        console.error('error', e.message);
        throw new Error('sql query failed');
    }
};
module.exports = {
    getAllUsers,
    getUserLogin,
    getUserById,
    insertUser,
};