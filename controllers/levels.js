let Level = require('../models/levels')

const controller = {
  getLevels: function (req, res) {
    Level.find({}).exec()
      .then(levelsList => {
        if (!levelsList || levelsList.length === 0) return res.status(404).send({ message: "No se encontraron niveles" })
        return res.status(200).json(levelsList)
      })
      .catch(err => res.status(500).send({ message: `Error: ${err}` }))
  },
  getLevel: function (req, res) {
    let levelId = req.params.id
    if (!levelId) return res.status(404).send({ message: "Nivel no encontrado" })

    Level.findById(levelId).exec()
      .then(data => {
        if (!data) return res.status(404).send({ message: "No se encontró el nivel" })
        return res.status(200).json(data)
      })
      .catch(err => res.status(500).send({ message: `Error interno: ${err}` }))
  },
  saveLevel: function (req, res) {
    let level = new Level()
    const { name, world, difficulty } = req.body

    if (name && world) {
      level.name = name
      level.world = world
      level.difficulty = difficulty || 'Media'

      level.save()
        .then(storedLevel => {
          storedLevel
            ? res.status(200).json({ level: storedLevel })
            : res.status(404).send({ message: "No se pudo guardar el nivel" })
        })
        .catch(error => res.status(500).send({ message: "Error al guardar el nivel" }))
    } else {
      return res.status(400).send({ message: "Nombre y mundo son obligatorios" })
    }
  },
  updateLevel: function (req, res) {
    let levelId = req.params.id
    let update = req.body

    Level.findByIdAndUpdate(levelId, update, { returnDocument: 'after' })
      .then(updatedLevel => {
        if (!updatedLevel) return res.status(404).send({ message: "El nivel no existe" })
        return res.status(200).send({ level: updatedLevel })
      })
      .catch(error => res.status(500).send({ message: `Error al actualizar: ${error}` }))
  },
  deleteLevel: function (req, res) {
    let levelId = req.params.id

    Level.findByIdAndDelete(levelId)
      .then(removedLevel => {
        if (!removedLevel) return res.status(404).send({ message: "El nivel no existe" })
        return res.status(200).send({ level: removedLevel })
      })
      .catch(err => res.status(500).send({ message: "Error al eliminar" }))
  }
}

module.exports = controller