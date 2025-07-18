const mongoose = require('mongoose');

const connectdb = async () =>{
    try {
        await mongoose.connect('mongodb+srv://afrozprince033:Abcdefghij@cluster0.vlfrk.mongodb.net/mydb');
        console.log("connected to database")
    } catch(err) {
        console.log(err)
    }
}

module.exports = connectdb;