const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userSchema = new Schema({
  uuid: String,
  name: String,
  username: String,
  password: String,
  email: String,
  token: String,
  created_at: {
    type: Date,
    default: Date.now()
  },
  updated_at: {
    type: Date,
    default: Date.now()
  },
  role: {
    type: String,
    default: 'user'
  }
})

let User = mongoose.model('User', userSchema)
module.exports = User