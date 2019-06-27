const mongoose = require('mongoose');

const server = 'localhost:27017';
const database = 'phonebook';

mongoose.connect(`mongodb://@${server}/${database}`);

let ContactsSchema = new mongoose.Schema({
   name: String,
   phone: String
});

module.exports = mongoose.model('Contact', ContactsSchema);