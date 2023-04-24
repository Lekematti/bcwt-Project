'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllUsers = async () => {
    try {
        const sql = `SELECT Id, name, email FROM user`;
        const [rows] = await promisePool.query(sql);
        // console.log(rows);
        return rows;
    } catch (e) {
        console.error('error', e.message);
        throw new Error('sql query failed');
    }
};
const getUserById = async (id) => {
    try {
        const sql = `SELECT Id, name, email, role FROM user WHERE Id=?`;
        const [rows] = await promisePool.query(sql, [id]);
        // console.log(rows);
        return rows[0];
    } catch (e) {
        console.error('error', e.message);
        throw new Error('sql query failed');
    }
};

const insertUser = async (user) => {
    try {
        const sql = 'INSERT INTO user VALUES (null, ?, ?, ?, ?)';
        const values = [user.name, user.email, user.password, user.role];
        const [result] = await promisePool.query(sql, values);
        return result.insertId;
    } catch (e) {
        console.error('error', e.message);
        throw new Error('sql query failed');
    }
};

const updateUser = async (user) => {
    try {
        const sql = 'UPDATE user SET name=?, email=?, password=?, role=? WHERE Id=?';
        const values = [user.name, user.email, user.passwd, user.role];
        const [result] = await promisePool.query(sql, values);
        return result.insertId;
    } catch (e) {
        console.error('error', e.message);
        throw new Error('sql query failed');
    }
};

// const deleteUser = async (id) => {
//   try {
//     const sql = `DELETE FROM wop_user WHERE user_id=?`;
//     const [rows] = await promisePool.query(sql, [id]);
//     //console.log(rows);
//     return rows;
//   } catch (e) {
//     console.error("error", e.message);
//     throw new Error('sql delete user failed');
//   }
// }
// User authentication
const getUserLogin = async (email) => {
    //console.log('get user login for', email);
    try {
        const [rows] = await promisePool.execute(
            'SELECT * FROM user WHERE email = ?;',
            [email]);
        return rows;
    } catch (e) {
        console.log('error', e.message);
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    getUserLogin,
    insertUser,
    updateUser,
};





