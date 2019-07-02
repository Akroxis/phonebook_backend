const ContactModel = require("../models/contact.model");
const express = require("express");
const router = express.Router();
const fs = require('fs');

router.post('/contacts', (req, res) => {
  if(!req.body) {
    return res.status(400).send(`Request body is missing`);
  }
  if(!req.body.name) {
    return res.status(400).send(`You should set name for your contact`);
  }
  const model = new ContactModel(req.body);
  model.save()
    .then(doc => {
      if(!doc || doc.length === 0) {
        return res.status(500).send(doc);
      }
      res.status(201).send(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    })
});

router.put("/contacts", (req, res) => {
  if(!req.query.id) {
    return res.status(400).send('Missing URL parameter: id')
  }
  ContactModel.findOneAndUpdate({
    _id: req.query.id
  }, req.body, {
    new: true
  })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err)
    })
});


router.get("/contacts", (req, res) => {
  if(!req.query.name) {
    ContactModel.find()
      .then(doc => {
        res.json(doc)
      })
      .catch(err => {
        res.status(500).json(err)
      });
  }
  if(req.query.name) {
    ContactModel.findOne({
      name: req.query.name
    })
      .then(doc => {
        res.json(doc)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
});

router.get("/contacts", (req, res) => {
  console.warn("here>>>")
  if(req.query.textfile) {
      ContactModel.find()
          .then(doc => {
              res.pipe(doc);
              console.warn("here>>>")
              fs.writeFile('contacts.txt', res.json(doc), (err) => {
                  err ? console.log(error) : console.log("File Created!");
              });

          })
          .catch(err => {
              res.status(500).json(err)
          });
  }
});

router.delete("/contacts", (req, res) => {
  if(!req.query.name) {
    return res.status(400).send('Missing URL parameter: name')
  }
  ContactModel.findOneAndRemove({
    _id: req.query.id
  }, req.body, {
    new: true
  })
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
});

module.exports = router;
