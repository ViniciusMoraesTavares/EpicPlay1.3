const express = require('express');
const router = express.Router();
const isAdmin = require('../middlewares/isAdmin');
const jogoController = require('../controllers/jogoController');

router.get('/', jogoController.getAllJogos);
router.post('/', isAdmin, jogoController.createJogo);
router.put('/:id', isAdmin, jogoController.updateJogo);
router.delete('/:id', isAdmin, jogoController.deleteJogo);

module.exports = router;