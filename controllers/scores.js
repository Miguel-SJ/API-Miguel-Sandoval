let Score = require('../models/scores')

const controller = {
  getScores: function (req, res) {
    Score.find({}).exec()
      .then(scoresList => {
        if (!scoresList || scoresList.length === 0) return res.status(404).send({ message: "No se encontraron puntuaciones" })
        return res.status(200).json(scoresList)
      })
      .catch(err => res.status(500).send({ message: `Error: ${err}` }))
  },
  getScore: function (req, res) {
    let scoreId = req.params.id
    if (!scoreId) return res.status(404).send({ message: "Puntuación no encontrada" })

    Score.findById(scoreId).exec()
      .then(data => {
        if (!data) return res.status(404).send({ message: "No se encontró la puntuación" })
        return res.status(200).json(data)
      })
      .catch(err => res.status(500).send({ message: `Error interno: ${err}` }))
  },
  saveScore: function (req, res) {
    let scoreObj = new Score()
    const { player, score, level } = req.body

    if (player && score) {
      scoreObj.player = player
      scoreObj.score = score
      scoreObj.level = level || 'N. Sanity Beach'

      scoreObj.save()
        .then(storedScore => {
          storedScore
            ? res.status(200).json({ score: storedScore })
            : res.status(404).send({ message: "No se pudo guardar la puntuación" })
        })
        .catch(error => res.status(500).send({ message: "Error al guardar" }))
    } else {
      return res.status(400).send({ message: "Jugador y puntuación son obligatorios" })
    }
  },
  updateScore: function (req, res) {
    let scoreId = req.params.id
    let update = req.body

    Score.findByIdAndUpdate(scoreId, update, { returnDocument: 'after' })
      .then(updatedScore => {
        if (!updatedScore) return res.status(404).send({ message: "La puntuación no existe" })
        return res.status(200).send({ score: updatedScore })
      })
      .catch(error => res.status(500).send({ message: `Error al actualizar: ${error}` }))
  },
  deleteScore: function (req, res) {
    let scoreId = req.params.id

    Score.findByIdAndDelete(scoreId)
      .then(removedScore => {
        if (!removedScore) return res.status(404).send({ message: "La puntuación no existe" })
        return res.status(200).send({ score: removedScore })
      })
      .catch(err => res.status(500).send({ message: "Error al eliminar" }))
  }
}

module.exports = controller