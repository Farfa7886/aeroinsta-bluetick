require('dotenv').config()

module.exports = {
  mongodb: {
    username: process.env.MONGODB_USERNAME,
    password: process.env.MONGODB_PASSWORD
  },
  api: {
    port: 3000
  }
}