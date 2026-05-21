//receber a resposta da service e mandar de volta ---> requisições http

//acessar a service
const produtoService = require('../services/produtoService')

class produtoController{
    //GET
    async listarProduto(req, res){   //req, res --> mandar resposta aos usuarios da service
        try{
            const resultado = produtoService.listarProdutos() //acessar a service(model) especifica que lista produtos
            res.status(200).json(resultado)
        } catch(erro){
            res.status(erro.status || 500).json({     //erro.status--> erro do service
                sucesso: false,
                mensagem: erro.mensagem || "erro interno do servidor",     //erro.mensagem --> mensagem do service
                erro: erro.stack || erro
            })
        }
    }
//acesar a model correta
//armazenar no resultado
//exibir o resultado

//GET POR ID
    async buscarProdutoPorId(req,res){
        try{
            const resultado = produtoService.buscarProdutoPorId(req.params.id)
            res.json(resultado)
        } catch(erro){
            res.status(erro.status || 500).json({     //erro.status--> erro do service
                sucesso: false,
                mensagem: erro.mensagem || "erro interno do servidor",     //erro.mensagem --> mensagem do service
                erro: erro.stack || erro
            })
        }
    }

    //POST
    async cadastrarProduto(req, res){
        try{
            const resultado = await produtoService.cadastrarProduto(req.body)
            res.json(resultado)

            // 👇 AQUI entra o arquivo do multer
      const imagem = req.file

      const produto = await produtoService.cadastrarProduto({
        nome,
        preco,
        imagem: imagem ? imagem.filename : null
      })

      return res.status(201).json({
        sucesso: true,
        dados: produto
      })

        } catch(erro){
            res.status(erro.status || 500).json({     //erro.status--> erro do service
                sucesso: false,
                mensagem: erro.mensagem || "erro interno do servidor",     //erro.mensagem --> mensagem do service
                erro: erro.stack || erro
            })
        }
    }

    //PUT
    async atualizarProduto(req, res){
        try{
            const resultado = await produtoService.atualizarProduto(req.params.id, req.body)
            res.json(resultado)
        } catch{
            res.status(erro.status || 500).json({     //erro.status--> erro do service
                sucesso: false,
                mensagem: erro.mensagem || "erro interno do servidor",     //erro.mensagem --> mensagem do service
                erro: erro.stack || erro
            })
        }
    }

    //DELETE
    async deletarProduto(req, res){
        try{
            const resultado = await produtoService.deletarProduto(req.params.id)
            res.json(resultado)
        } catch(erro){
            res.status(erro.status || 500).json({     //erro.status--> erro do service
                sucesso: false,
                mensagem: erro.mensagem || "erro interno do servidor",     //erro.mensagem --> mensagem do service
                erro: erro.stack || erro
            })
        }
    }
}

module.exports = new produtoController()

