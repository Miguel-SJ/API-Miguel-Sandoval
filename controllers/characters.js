let Character = require('../models/characters')

const controller = {
  getCharacters: function (req, res) {
    Character.find({}).exec()
      .then(charactersList => {
        if (!charactersList || charactersList.length === 0) {
          return res.status(404).send({ message: "No se encontraron personajes" })
        }
        return res.status(200).json(charactersList)
      })
      .catch(err => res.status(500).send({ message: `Error en la consulta: ${err}` }))
  },

  getCharacter: function (req, res) {
    let characterId = req.params.id
    if (characterId == null) return res.status(404).send({ message: "El personaje no existe" })

    Character.findById(characterId).exec()
      .then(data => {
        if (!data) return res.status(404).send({ message: "No se encontró el personaje" })
        return res.status(200).json(data)
      })
      .catch(err => res.status(500).send({ message: `Error interno -> ${err}` }))
  },

  saveCharacter: function (req, res) {
    let character = new Character()
    const { name, role, abilities } = req.body

    if (name && role) {
      character.name = name
      character.role = role
      character.abilities = abilities || []

      character.save()
        .then(storedCharacter => {
          storedCharacter
            ? res.status(200).json({ character: storedCharacter })
            : res.status(404).send({ message: "No se pudo guardar el personaje" })
        })
        .catch(error => res.status(500).send({ message: "Error al guardar el documento" }))
    } else {
      return res.status(400).send({ message: "Los datos obligatorios (nombre y rol) están incompletos" })
    }
  },

  updateCharacter: function (req, res) {
    let characterId = req.params.id
    let update = req.body

    Character.findByIdAndUpdate(characterId, update, { returnDocument: 'after' })
      .then(updatedCharacter => {
        if (!updatedCharacter) return res.status(404).send({ message: "El personaje no existe para actualizar" })
        return res.status(200).send({ character: updatedCharacter })
      })
      .catch(error => res.status(500).send({ message: `Error al actualizar: ${error}` }))
  },

  deleteCharacter: function (req, res) {
    let characterId = req.params.id

    Character.findByIdAndDelete(characterId)
      .then(removedCharacter => {
        if (!removedCharacter) return res.status(404).send({ message: "El personaje no existe para eliminar" })
        return res.status(200).send({ character: removedCharacter })
      })
      .catch(err => res.status(500).send({ message: "Error al eliminar el personaje" }))
  }
}

module.exports = controller