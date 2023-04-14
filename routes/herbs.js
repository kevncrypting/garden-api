const express = require('express');
const router = express.Router();
const fs = require('fs');

const HERBS_FILE = './data/herbs.json';

router.route('/')
  .get((req, res) => {
    fs.readFile(HERBS_FILE, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send(`There was a problem reading the file.`);
        return;
      }
      res.json(JSON.parse(data));
    })
  })
  .post((req, res) => {
    fs.readFile(HERBS_FILE, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('There was a problem reading the file.');
        return;
      }
      const herbsArray = JSON.parse(data);
  
      const newHerb = {
        id: (herbsArray.length + 1),
        name: req.body.name,
        description: req.body.description,
        sun_shade_preference: req.body.sun_shade_preference,
        days_to_germination: req.body.days_to_germination,
        days_to_harvest: req.body.days_to_harvest,
        varieties: req.body.varieties
      };
  
      herbsArray.push(newHerb);
  
      fs.writeFile(HERBS_FILE, JSON.stringify(herbsArray), err => {
        if (err) {
          console.error(err);
          res.status(500).send('There was a problem writing to the file.');
          return;
        }
        res.json(newHerb);
      })
    })
  })

router.get('/:id', (req, res) => {
  fs.readFile(HERBS_FILE, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('There was a problem reading the file.');
      return;
    }

    const herbsArray = JSON.parse(data);
    const newHerb = herbsArray.find(herb => herb.id === parseInt(req.params.id));

    if (!newHerb) {
      res.status(404).send('Vegetable not found');
      return;
    }

    res.json(newHerb);
  })
})

module.exports = router;