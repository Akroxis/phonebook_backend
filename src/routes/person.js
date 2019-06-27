const express = require('express');
const router = express.Router();


router.get("/person", (req, res)=> {
    res.send('You have requested a person')
});

router.get("/person/:name", (req, res)=> {
    res.send(`You've requested a person ${req.params.name}`)
});

router.get("/error", (req, res)=> {
    throw new Error('An Forced error detected')
});

module.exports = router;