const { Router } = require('express')
const ScoreController = require('../controllers/scores')

const router = Router()

router.get('/', ScoreController.getScores)
router.get('/:id', ScoreController.getScore)
router.post('/guardar-puntuacion', ScoreController.saveScore)
router.put('/editar-puntuacion/:id', ScoreController.updateScore)
router.delete('/eliminar-puntuacion/:id', ScoreController.deleteScore)

module.exports = router