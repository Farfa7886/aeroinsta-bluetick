const mongoose = require('mongoose')
const Users = require('../models/UsersSchema')
const cache = require('../cache')

async function getUsers() {
  const all = await Users.find()

  var finalArray = [];

  all.forEach((username) => {
    finalArray.push(username.username)
  })


  return finalArray
}

module.exports = { getUsers }