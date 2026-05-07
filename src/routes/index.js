//tratar toda base ---> centraliza os end points
const express = require('express')
const router = express.Router()
const produtoRoutes = require('./produtoRoutes') //trabalha com o routes

//rota para testar se servidor ta funcionando
router.get('/', (req, res) =>{
    res.json({
        mensagem: 'API Sabor Digital',
        versao: '5.0.8'
    })
})

//end points
router.use('/produtos', produtoRoutes)
router.use('/pedidoss', pedidoRoutes)
router.use('/cardapios', cardapioRoutes)
router.use('/usuarios', usuarioRouter)

module.exports = router