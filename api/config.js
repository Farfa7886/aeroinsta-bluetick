require('dotenv').config()

module.exports = {
  mongodb: {
    username: "api",
    password: process.env.MONGODB_PASSWORD
  },
  api: {
    port: 3000
  }
}