/// tem a regras, cria os metodosconst pool = require('../config/database') /// ---> liga ao banco

class PodutoRepository{
    async listarProdutos(){
        const listaProdutos= await pool.query('SELECT * FROM produto')  //---> espera a resporta do db e acessa o db
        return listaProdutos
    }
    async buscarProdutoPorId(id){
        const mostrarProduto = await pool.query('SELECT * FROM produto WHERE id = ?', [id])
        return mostrarProduto[0]
    }
    async cadastrarProduto(dadosProduto){
        const resultadoCadastro = await pool.query('INSERT INTO produto SET ?', [dadosProduto])
        return resultadoCadastro.insertId
    }
    async atualizarProduto(id, produtoData){
        const produtoAtualizado = await pool.query('UPDATE produto SET ?  WHERE id=?'[dadosProduto, id])
        return produtoAtualizado
    }
    async apagarProduto(id){
        await pool.query('DELETE * FROM produto WHERE id=?', [id])
        return true 
    }
}  /// função acabou aqui, afinal verificções é obrigação da service

module.eports = new ProdutoRepository() 