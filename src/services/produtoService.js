const produtoRepository = require('../repositories/produtoRepository')

class produtoService{
    async listarProdutos(){
        const produtos= await produtoRepository.listarProdutos()
        return{
            sucesso: true,
            dasos: produtos,
            total: produtos.length  
        } 
    }

    async buscarProdutoPorId(id){
        if(!id || isNaN(id)){
            throw{status: 400, 
                  mensagem:"id inválido"
                }
        }
        const produto= await produtoRepository.buscarProdutoPorId(id)
        if(!produto){
            throw{
                status: 404,
                mensagem: "produto não encontrado"
            }
        }
        return{
            sucesso: true,
            dados: produto[0]
        }
    }
}