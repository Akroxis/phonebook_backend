const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const contact = new Schema({
   name: { type: String, required: true},
   phone: { type: String, required: true}
});

const Contact = mongoose.model('Contact', contact);

module.exports = Contact;