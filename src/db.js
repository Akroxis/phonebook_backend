const mongoose = require("mongoose");

const db = async function() {
    try{
        let dbConnect = await mongoose.connect("mongodb://localhost:27017/phonebook");
        mongoose.Promise = global.Promise;
        if(dbConnect){
            console.log('Подключен к базе данных')
        }
    } catch (e) {
        throw e
    }


};

module.exports = db;