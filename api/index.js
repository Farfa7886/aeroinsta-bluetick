const express = require('express');
const app = express();
const config = require('./config.js');
const morgan = require('morgan');
const cache = require('./cache.js')
const mongoose = require('mongoose');
const { getUsers } = require('./helpers/queryUsers.js');
const Users = require('./models/UsersSchema.js');
const cors = require('cors')

var apiStarted = false;

const connectionString = `mongodb+srv://${config.mongodb.username}:${config.mongodb.password}@aeroinstabluetick.jhtp0lq.mongodb.net/?retryWrites=true&w=majority`

function tryConnection() {
  mongoose.connect(connectionString).then(async () => {
    console.log("Connected to database")
    cache.set("accounts", await getUsers())
    apiStarted = true;
  })
  .catch((err) => {
    tryConnection();
  })
}
console.log("Connecting to database")
tryConnection()


app.use(cors({
  origin: '*'
}))

app.use(express.json());
app.use(morgan('combined'));
app.use("/", require("./routes/addUser.js"));

app.all("/" , function (req, res) {
  if (apiStarted) {
    res.send(cache.get('accounts'))
  }
  else {
    res.send("Api is starting")
  }
})

app.listen(config.api.port, () => {
  console.log("API started on port " + config.api.port + " (http://localhost:" + config.api.port + ")");
}) 

module.exports = { app };