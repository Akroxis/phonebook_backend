const express = require('express');
const app = express();

const personRoute = require('./routes/person');


const db = require("./db");

app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`);
    next()
});
app.use(personRoute);
app.use(express.static('public'));

app.use((req, res, next) => {
    res.status(404).send('We think you are lost');
});

app.use((err, req, res, next) => {
    console.error(err.stack);

    res.sendFile(path.join(__dirname, '../public/500'))
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => db());