'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllUsers = async () => {
    try {
        const sql = `SELECT Id, email, userName FROM user`;
        const [rows] = await promisePool.query(sql);
        // console.log(rows);
        return rows;
    } catch (e) {
        console.error('error', e.message);
        throw new Error('sql query failed');
    }
};
const getUserLogin = async (email) => {
    //console.log('get user login for', email);
    try {
        const [rows] = await promisePool.execute(
            'SELECT * FROM user WHERE email=?;',
            [email]);
        console.log('getUserLogin result:', rows);
        return rows;
    } catch (e) {
        console.log('error', e.message);
    }
};
const getUserById = async (id) => {
    try {
        const sql = `SELECT Id, email, userName, FROM user WHERE Id=?`;
        const [rows] = await promisePool.query(sql, [id]);
        // console.log(rows);
        return rows[0];
    } catch (e) {
        console.error('error', e.message);
        throw new Error('sql query failed');
    }
};


// const insertUser = async (user) => {
//     console.log('insertuser', user)
//     try {
//         const sql = `INSERT INTO user VALUES (null, ?, ?, ?)`;
//         const [rows] = await promisePool.query(sql, [
//             user.email,
//             user.userName,
//             user.password
//         ]);
//         console.log(rows);
//         return rows;
//     } catch (e) {
//         throw new Error('sql query failed');
//     }
// }

const insertUser = async (user) => {
    try {
        const sql = 'INSERT INTO user VALUES (null, ?, ?, ?)';
        const values = [user.userName, user.email, user.password];
        const [result] = await promisePool.query(sql, values);
        return result.insertId;
    } catch (e) {
        console.error('error', e.message);
        throw new Error('sql query failed');
    }
};

/*const updateUser = async (user) => {
    try {
        const sql = 'UPDATE user SET name=?, email=?, password=?, role=? WHERE Id=?';
        const values = [user.name, user.email, user.password, user.role];
        const [result] = await promisePool.query(sql, values);
        return result.insertId;
    } catch (e) {
        console.error('error', e.message);
        throw new Error('sql query failed');
    }
};*/
// User authentication
module.exports = {
    getAllUsers,
    getUserLogin,
    getUserById,
    insertUser,

};