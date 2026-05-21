const express = require('express')
const app =express()

const routes = require('./routes')  //vai buscar o index.js(routes)
app.use('/', routes)
module.exports = app

app.use("/uploads", express.static("uploads")) //isso faz a imagem virar URL.










////////////////////////////************************///////////////////////////////**************************///////////////////////////////
// const app = express()
// app.use(express.json())

// const queryAsync = (sql, values = []) => {
//     return new Promise((resolve, reject) =>{
//         pool.query(sql, values, (err, results)=>{
//             if(err) reject(err)
//             else resolve(results)
//         })
//     })
// }

// function verificarId(id){
//      if(!id || isNaN(id)){
//             return res.status(400).json({
//                 sucesso: false,
//                 mensagem: 'ID de produto inválido'
//             })
//         }
// }

// app.get('/', (req,res) => {
//     res.send("API RESTAURANTE")
// })

// app.get('/produtos', async (req,res) =>{
//     try{
//         const produtos= await queryAsync('SELECT * FROM produto ORDER BY id DESC')
//         res.json({
//             sucesso: true,
//             dados: produtos,
//             total: produtos.length
//         })
//     }catch (erro) {
//         console.error('Erro ao listar produtos:',erro)
//         res.status(500).json({
//             sucesso: false,
//             mensagem: 'Erro ao listar produtos',
//             erro: erro.message
//         })
//     }
// })

// app.get('/produtos/:id', async (req,res) =>{
//     try{
//         const{id} = req.params
//         if(!id || isNaN(id)){
//             return res.status(400).json({
//                 sucesso: false,
//                 mensagem: 'ID de produto inválido'
//             })
//         }
//         const produtos = await queryAsync('SELECT * FROM produto WHERE id= ?', [id])
//         if (produtos.length === 0){
//             return res.status(404).json({
//                 sucesso: false,
//                 mensagem: 'Produto não encontrado'
//             })
//         }
//         res.json({
//             sucesso: true,
//             dados: produtos[0]
//         })
//     } catch (erro){
//         console.error('Erro ao encontrar produto:',erro)
//         res.status(500).json({
//             sucesso: false,
//             mensagem: 'Erro ao encontrar produto',
//             erro: erro.message
//     })
//     }
// })

// app.post('/produtos', async(req,res) =>{
//     try {
//         const {nome, descricao, preco, disponivel} = req.body

//         if(!nome || !descricao || !preco || !disponivel){
//             return res.status(400).json({
//                 sucesso: false,
//                 mensagem: 'O nome, descrição, preço e disponibilidade são obrigatórios'
//             })
//         }

//         if(typeof preco !== 'number' || preco <= 0 ){
//             return res.status(400).json({
//                 sucesso: false,
//                 mensagem: 'O preço deve ser um número positivo.'
//             })
            
//         }

//         if(typeof disponivel !== 'boolean' || preco <= 0 ){
//             return res.status(400).json({
//                 sucesso: false,
//                 mensagem: 'variavel invalida'
//             })
//         }

//         const novoProduto = {
//             nome: nome.trim(),
//             descricao: descricao.trim(),
//             preco: preco,
//             disponivel: disponivel
//         }
//         const resultado = await queryAsync('INSERT INTO produto SET ?',[novoProduto])
//         res.status(201).json({
//             sucesso: true,
//             mensagem: 'Produto cadastrado com sucesso.',
//             id: resultado.insertId
//         })
//     } catch (erro) {
//         console.error('Erro ao salvar produto:', erro)
//         res.status(500).json({
//             sucesso: false,
//             mensagem: 'Erro ao salvar produto',
//             erro: erro.message
//         })
//     }
// } )

// app.put('/produtos/:id', async(req,res) =>{
//     try {
//         const {id}= req.params
//         const {nome, descricao, preco, disponivel}= req.body
//         if(!id || isNaN(id)){
//             return res.status(400).json({
//                 sucesso: false,
//                 mensagem: 'ID do produto inválido'
//             })
//         }
//         const produtoExiste= await queryAsync('SELECT * FROM produto WHERE id =?', [id])
//         if(produtoExiste.length === 0){
//             return res.status(404).json({
//                 sucesso: false,
//                 mensagem:'Produto não encontrado'
//             })
//         }
//         const produtoAtualizado={}
//         if(nome !== undefined) produtoAtualizado.nome = nome.trim()
//         if(descricao !== undefined) produtoAtualizado.descricao = descricao.trim()
//         if(preco !== undefined){
//             if(typeof preco !== 'number' || preco <= 0){
//                 res.status(400).json({
//                     sucesso: false,
//                     mensagem: 'O preço deve ser um numero positivo!'
//                 })
//             }
//             produtoAtualizado.preco = preco
//         }
//         if(disponivel !== undefined){
//             if(typeof disponivel !== 'boolean' || preco <= 0 ){
//                 return res.status(400).json({
//                     sucesso: false,
//                     mensagem: 'variavel invalida'
//                 })
//             }
//             produtoAtualizado.classificacao= classificacao
//         } 
        
//         if(Object.keys(produtoAtualizado).length === 0){
//             res.status(400).json({
//                 sucesso: false,
//                 mensagem:'Nenhum campo para atualizar'
//             })
//         }
//         await queryAsync('UPDATE produto SET ? WHERE id =?', [produtoAtualizado, id])
//         res.json({
//             sucesso: true,
//             mensagem:'Produto atualizado.'
//         })
//     } catch (erro) {
//         console.error('Erro ao atualizar produto:', erro)
//         res.status(500).json({
//             sucesso: false,
//             mensagem: 'Erro ao atualizar produto.',
//             erro: erro.message
//         })
//     }
// })

// //
// app.delete('/produtos/:id', async(req,res) =>{
//     try {
//         const {id}= req.params
//         if(!id || isNaN(id)){
//             return res.status(400).json({
//                 sucesso: false,
//                 mensagem: 'ID sala inválido'
//             })
//         }
//         const produtoExiste= await queryAsync('SELECT * FROM produto WHERE id =?', [id])
//         if(produtoExiste.length === 0){
//             return res.status(404).json({
//                 sucesso: false,
//                 mensagem:'Poduto não encontrada'
//             })
//         }
//         await queryAsync('DELETE FROM produto WHERE id= ?', [id])
//         res.status(200).json({
//             sucesso: true,
//             mensagem: 'Produto apagado'
//         })
//     } catch (erro) {
//         console.error('Erro ao apagar o produto:', erro)
//         res.status(500).json({
//             sucesso: false,
//             mensagem: 'Erro ao apagar o produto.',
//             erro: erro.message
//         })
//     }
// })

// module.exports= app