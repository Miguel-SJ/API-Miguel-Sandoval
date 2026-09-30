const { Router } = require('express')
const CharacterController = require('../controllers/characters')

const router = Router()

router.get('/', CharacterController.getCharacters)
router.get('/:id', CharacterController.getCharacter)
router.post('/guardar-personaje', CharacterController.saveCharacter)
router.put('/editar-personaje/:id', CharacterController.updateCharacter)
router.delete('/eliminar-personaje/:id', CharacterController.deleteCharacter)

module.exports = router