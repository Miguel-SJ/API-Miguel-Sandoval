const { Router } = require('express')
const LevelController = require('../controllers/levels')

const router = Router()

router.get('/', LevelController.getLevels)
router.get('/:id', LevelController.getLevel)
router.post('/guardar-nivel', LevelController.saveLevel)
router.put('/editar-nivel/:id', LevelController.updateLevel)
router.delete('/eliminar-nivel/:id', LevelController.deleteLevel)

module.exports = router