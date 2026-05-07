/// tem a regras, cria os metodos const pool = require('../config/database') /// ---> liga acesso ao banco

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

    // async atualizarProduto(id, produtoData){
    //     const produtoAtualizado = await pool.query('UPDATE produto SET ?  WHERE id=?'[dadosProduto, id]) //atualiza tudo
    //     return produtoAtualizado
    // }
    async atualizarProduto(id, dadosProduto){                                              //dadosProduto
        //dois arrays vazios, ver qual campo e valor atualizar                     //    campos       dado
        const camposProdutos = []                                                  // 0) nome=?        Pastel
        const dadoProduto = []                                                     // 1) preco=?       12.00
        for(const[key, value] of Object.entries(dadosProduto)){
            camposProdutos.push(`${key} = ?`)
            dadosProduto.push(value)
        }
        if(camposProdutos.length === 0) return null
        dadosProduto.push(id)
        const query = `UPDATE produto SET ${camposProdutos.join(',')} WHERE id = ?`  //separar eles por virgula 
        const resultado = await produtoController.query(query, dadosProduto)         // UPDATE produto SET nome=?, preco=? WHERE id=?
        return resultado.affectedRows //ver se a atualização afetou alguem
    }
    async apagarProduto(id){
        await pool.query('DELETE * FROM produto WHERE id=?', [id])
        return true 
    }
}  /// função acabou aqui, afinal verificções é obrigação da service

module.eports = new ProdutoRepository() 