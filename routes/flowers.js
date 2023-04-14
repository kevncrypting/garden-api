const express = require('express');
const router = express.Router();
const fs = require('fs');

const FLOWERS_FILE = './data/flowers.json';

router.route('/')
  .get((req, res) => {
    fs.readFile(FLOWERS_FILE, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send(`There was a problem reading the file.`);
        return;
      }
      res.json(JSON.parse(data));
    })
  })
  .post((req, res) => {
    fs.readFile(FLOWERS_FILE, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('There was a problem reading the file.');
        return;
      }
      const flowersArray = JSON.parse(data);
  
      const newFlower = {
        id: (flowersArray.length + 1),
        name: req.body.name,
        description: req.body.description,
        sun_shade_preference: req.body.sun_shade_preference,
        days_to_germination: req.body.days_to_germination,
        days_to_harvest: req.body.days_to_harvest,
        varieties: req.body.varieties
      };
  
      flowersArray.push(newFlower);
  
      fs.writeFile(FLOWERS_FILE, JSON.stringify(flowersArray), err => {
        if (err) {
          console.error(err);
          res.status(500).send('There was a problem writing to the file.');
          return;
        }
        res.json(newFlower);
      })
    })
  })

router.get('/:id', (req, res) => {
  fs.readFile(FLOWERS_FILE, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('There was a problem reading the file.');
      return;
    }

    const flowersArray = JSON.parse(data);
    const newFlower = flowersArray.find(flower => flower.id === req.params.id);

    if (!newFlower) {
      res.status(404).send('Flower not found');
      return;
    }

    res.json(newFlower);
  })
})

module.exports = router;