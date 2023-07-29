const express = require('express');
const router = express.Router();
const config = require('../config');
const cache = require('../cache');
const Users = require('../models/UsersSchema.js');


function validateUser(username) {
  if (String(username).length > 30) {
    return {
      "success": false,
      "error": "Maxium username length exceeded (30 characters)"
    }
  }
  else if (isEmpty(username)) {
    return {
      "success": false,
      "error": "Username is empty"
    }
  }
  else {
    return {
      "success": true
    }
  }
}


router.use(express.json());

router.post("/add/:username", async (req, res) => {

  if (await Users.exists({username: req.params.username})) {
    res.status(409).json({
      "success": false,
      "error": "Username already in database"
    })
  }
  else {
    if ((validateUser(req.params.username)).success) {
      const user = new Users({"username": req.params.username})
      user.save().then(() => { 
        console.log(`Username ${req.params.username} has been added`);
        cache.get("accounts", (cache.get("accounts").push(req.params.username)))
        res.status(200).json({
          "success": true
        })
      })
    }
    else {
      res.status(500).json(validateUser(req.params.username))
    }
  }


});

function isEmpty(text) {
  if (text == '' || text == null) return true
  let splittedText = text.split('');
  let isEmpty = true;
  splittedText.forEach(element => {
      if (isEmpty) {
          if (element != ' ') {
              isEmpty = false
          }
      }
  });

  return isEmpty;
}


module.exports = router;