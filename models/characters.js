let mongoose = require('mongoose')
let Schema = mongoose.Schema

let CharacterSchema = Schema({
  name: String,
  role: String,
  abilities: [String]
})

module.exports = mongoose.model('Character', CharacterSchema, 'characters')