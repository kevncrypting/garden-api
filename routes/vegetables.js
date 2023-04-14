const express = require('express');
const router = express.Router();
const fs = require('fs');

const VEGETABLES_FILE = './data/vegetables.json';

router.route('/')
  .get((req, res) => {
    fs.readFile(VEGETABLES_FILE, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send(`There was a problem reading the file.`);
        return;
      }
      res.json(JSON.parse(data));
    })
  })
  .post((req, res) => {
    fs.readFile(VEGETABLES_FILE, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('There was a problem reading the file.');
        return;
      }
      const vegetablesArray = JSON.parse(data);
  
      const newVegetable = {
        id: (vegetablesArray.length + 1),
        name: req.body.name,
        description: req.body.description,
        sun_shade_preference: req.body.sun_shade_preference,
        days_to_germination: req.body.days_to_germination,
        days_to_harvest: req.body.days_to_harvest,
        varieties: req.body.varieties
      };
  
      vegetablesArray.push(newVegetable);
  
      fs.writeFile(VEGETABLES_FILE, JSON.stringify(vegetablesArray), err => {
        if (err) {
          console.error(err);
          res.status(500).send('There was a problem writing to the file.');
          return;
        }
        res.json(newVegetable);
      })
    })
  })

router.get('/:id', (req, res) => {
  fs.readFile(VEGETABLES_FILE, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('There was a problem reading the file.');
      return;
    }

    const vegetablesArray = JSON.parse(data);
    const newVegetable = vegetablesArray.find(vegetable => vegetable.id === req.params.id);

    if (!newVegetable) {
      res.status(404).send('Vegetable not found');
      return;
    }

    res.json(newVegetable);
  })
})

module.exports = router;