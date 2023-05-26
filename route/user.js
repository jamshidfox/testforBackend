const express = require('express');
const fs = require('fs');
const path = require('path');
const route = express.Router();

const db = path.resolve() + '/db/database.txt';

route.get('/all_users', async (req, res) => {
  await fs.readFile(db, 'utf8', async (err, data) => {
    await res.send(data);
  });
});
route.post('/newUser', (req, res) => {
  const { name, age } = req.body;
  const newData = { name, age };

  fs.readFile(db, 'utf8', (err, data) => {
    if (err) {
      res.send(err);
    } else {
      let user = [];
      try {
        user = JSON.parse(data);
      } catch (err) {
        console.error('Error parsing JSON:', err);
      }
      user.push(newData);
      fs.writeFile(db, JSON.stringify(user), (err, data) => {
        if (err) res.send(err);
        else res.send('Successfully created');
      });
    }
  });
});

module.exports = route;
