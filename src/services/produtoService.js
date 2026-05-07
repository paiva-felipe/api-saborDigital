const produtoRepository = require('../repositories/produtoRepository')

class produtoService{

    //BUSCAR PRODUTOS
    async listarProdutos(){
        const produtos= await produtoRepository.listarProdutos()
        return{
            sucesso: true,
            dasos: produtos,
            total: produtos.length  
        } 
    }

    //BUSCA POR Id
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

    //CADASTRAR PRODUTOS
    async cadastrarProduto(dados){
        //separar os dados do atribruto em variaveis:
        const{nome, descricao, preco, categoria, disponivel} = dados
        // ver se os obrigatorios estao preenchidos, se o preco é numero:
        if(!nome || !descricao || preco === undefined){
            throw{
                status: 400,
                mensagem: "Nome, drescrição e preço são obrigatórios!"
            }
        }
        // if do preco
        if(typeof preco !== "number" || preco <= 0){
            throw{
                status: 400,
                mensagem: "O preço deve ser um numero positivo!"
            }
        }
        // criar novo produto usada na repositorie, da as infos
        const novoProduto={
            nome = nome.trim(),
            descricao = descricao.trim(),
            preco,  //preco não tem modificações
            categoria = categoria || null,  //não é pré definido(não tem espaços)
            disponivel = disponivel || true
        }
        // só falta cadastrar no banco
        const resultado = await produtoRepository.cadastrarProduto(novoProduto)
        return{
            sucesso: true,
            mensagem: "Produto cadastrado com sucesso",
            resultado
        }
    }

    //ATUALIZAR PRODUTO
    async atualizarProduto(id, dados){
        //reutiliza duas funções --> id, validações dos dados

        //ver se id é valido
        if(!id || isNaN(id)){
            throw{
                status: 400,
                mensagem: "Id inválido"
            }
        }
        //ver se id existe, salva em produtoId
        const produtoId = await produtoRepository.buscarProdutoPorId(id)
        // if(produtoId.length === 0){} ou
        if(!produtoId){
            throw{
                status: 404,
                mensagem: "produto não encontrado"
            }
        }
        const produtoAtualizado = {} //usado no repository
        const {nome, descricao, preco, categoria, disponivel}= dados

        if(nome !== undefined || nome.trim() !== '') produtoAtualizado.nome = nome.trim() //se foi preenchido adicionar ao produto Atualizado
        if(descricao !== undefined) produtoAtualizado.descricao = descricao.trim()
        if(preco !== undefined){ //verificar preco 
            if(typeof preco !== 'number' || preco <= 0){
                throw{
                    status: 400,
                    mensagem: "O preço deve ser um número positivo!"
                }
            }
            produtoAtualizado.preco = preco //atualizar preco
        }
        if(categoria != undefined) produtoAtualizado.categoria = categoria
        if(disponivel != undefined) produtoAtualizado.disponivel = disponivel
        if(Object.keys(produtoAtualizado).length === 0){ //se nenhum dado for atualizado
            throw{
                status: 400,
                mensagem: "Nenhum dad válido enviado para a atualização"
            }
        }
        await produtoRepository.atualizarProduto(id, produtoAtualizado)
        return{
            sucesso: true,
            mensagem: "Produto atualizado"
        }
    }

    //APAGAR PRODTUDO
    async deletarProduto(id){
        if(!id || isNaN(id)){
            throw{
                status: 400,
                mensagem: "Id invalido"
            }
        }
        const idProduto= await produtoRepository.buscarProdutoPorId(id)
        if(!idProduto){
            throw{
                status: 404,
                mensagem: "produto não encontrado"
            }
        }
        await produtoRepository.apagarProduto(id)
        return{
            sucesso: true,
            mensagem: "Produto apagado"
        }
    }
}

module.exports = new produtoService()