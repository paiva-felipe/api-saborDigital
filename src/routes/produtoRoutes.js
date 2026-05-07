//trabalha diretamente com o express
const express = require('express')
const router = express.Router()
const produtoController = require('../controllers/produtoController')

//definir o metodo http utilizado
router.get('/', produtoController.listarProduto)
router.get('/:id', produtoController.buscarProdutoPorId)
router.post('/', produtoController.cadastrarProduto)
router.put('/:id', produtoController.atualizarProduto)
router.delete('/:id', produtoController.deletarProduto)

module.exports = router