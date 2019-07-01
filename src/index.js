const express = require('express');
const app = express();

const personRoute = require('./routes/person');
const path = require("path");

const bodyParser = require("body-parser");
const contactRoute = require("./routes/contact");

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body);
    next()
});
app.use(personRoute);
app.use(contactRoute);
app.use(express.static('public'));

app.use((req, res, next) => {
    res.status(404).send('We think you are lost');
});

app.use((err, req, res, next) => {
    console.error(err.stack);

    res.sendFile(path.join(__dirname, '../public/500'))
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.info("hello epta"));
