const mongoose = require("mongoose");

const server = "ds243055.mlab.com:43055";
const database = 'phonebook_db';
const user = 'admin';
const password = "123qwe123";

mongoose.connect(`mongodb://${user}:${password}@${server}/${database}`, { useNewUrlParser: true });

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true},
  phone: { type: String, required: true, unique: true}
});

module.exports = mongoose.model("Contact", ContactSchema);
