const mongoose = require('mongoose')

const { Schema, model } = mongoose

const userSchema = new Schema({
  name: String,
  username: { type: String, required: true },
  password: { type: String, required: true },
})

module.exports = model('User', userSchema)