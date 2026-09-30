let mongoose = require('mongoose')
let Schema = mongoose.Schema

let LevelSchema = Schema({
  name: String,
  world: Number,
  difficulty: String
})

module.exports = mongoose.model('Level', LevelSchema, 'levels')