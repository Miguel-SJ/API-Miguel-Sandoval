let mongoose = require('mongoose')
let Schema = mongoose.Schema

let ScoreSchema = Schema({
  player: String,
  score: Number,
  level: String
})

module.exports = mongoose.model('Score', ScoreSchema, 'scores')