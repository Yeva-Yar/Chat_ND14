let mysql = require("mysql2")
require("dotenv").config()

let db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS
})

let adb = db.promise()

async function getUsers(content, author_id){
    try{
        let [users, flieds] = await adb.query("SELECT * FROM User")
        return users
    }catch(err){
        throw err.message
    }
}

async function addMessage(content, author_id){
    try{
        let [users, flieds] = await adb.query("insert into Message(content, author_id) values(?,?)" , [content,author_id])
        return users
    }catch(err){
        throw err.message
    }
}

async function getMessages(content, author_id){
    try{
        let [users, flieds] = await adb.query(`SELECT m.id, m.content, m.author_id, u.login
            FROM Message as m
            JOIN User as u
            ON m.author_id = u.id`)
        return users
    }catch(err){
        throw err.message
    }
}



async function existUsers(login){
    try{
        let [users, flieds] = await adb.query("SELECT * FROM User WHERE login = ?", [login])
        return users.length > 0
    }catch(err){
        throw err.message
    }
}

async function getUser(login){
    try{
        let [users, flieds] = await adb.query("SELECT * FROM User WHERE login = ?", [login])
        return users
    }catch(err){
        throw err.message
    }
}

async function addUsers(login, password){
    try{
        let [users, flieds] = await adb.query("INSERT INTO User(login, pasword)VALUES(?,?)", [login, password])
        return users
    }catch(err){
        throw err.message
    }
}

module.exports = {
    getUsers,
    getMessages,
    addMessage,
    existUsers,
    addUsers,
    getUser
}