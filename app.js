const express = require('express')
const characters_routes = require('./routes/characters')
const levels_routes = require('./routes/levels')
const scores_routes = require('./routes/scores')

const app = express()

// settings
app.set('port', process.env.PORT || 3000)

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes
app.use('/api/characters', characters_routes)
app.use('/api/levels', levels_routes)
app.use('/api/scores', scores_routes)

module.exports = app