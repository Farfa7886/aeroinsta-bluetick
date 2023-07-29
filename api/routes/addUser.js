const express = require('express');
const router = express.Router();
const config = require('../config');
const cache = require('../cache');
const Users = require('../models/UsersSchema.js');





router.use(express.json());

router.post("/add/:username", async (req, res) => {

  if (await Users.exists({username: req.params.username})) {
    res.status(409).json({
      "success": false,
      "error": "Username already in database"
    })
  }
  else {
    const user = new Users({"username": req.params.username})
    user.save().then(() => { 
      console.log(`Username ${req.params.username} has been added`);
      cache.get("accounts", (cache.get("accounts").push(req.params.username)))
      res.status(200).json({
        "success": true
      })
    })
  }


});

module.exports = router;