import db from './db.js';
import express from 'express';
import cors from 'cors';
import Sequelize from 'sequelize'


const {Op, col} = Sequelize;




const app = express();
app.use(cors());
app.use(express.json());








    // cadastra usuario

    app.post('/usuario', async (req, resp) => {



        try {
            
        
        let usu = req.body;


        let consul = await db.infoa_enl_usuario.findOne({where: {nm_usuario: usu.nm_usuario}});

        
        let r = await db.infoa_enl_usuario.create({
            nm_usuario: usu.nm_usuario,
            nm_nome: usu.nm_nome,
            ds_cpf: usu.ds_cpf,
            nr_celular: usu.nr_celular,
            nr_telefone: usu.nr_telefone,
            ds_email: usu.ds_email,
            ds_senha: usu.ds_senha,
            dt_nascimento: Date.now(),
            ds_cep:  usu.ds_cep,
            nr_casa: usu.nr_casa,
            ds_complemento: usu.ds_complemento,
            ds_bairro: "vish",
            ds_cidade: "eita",
            bt_sexo: 1,
            img_foto: usu.img,
            dt_cadastro: Date.now(),
            dt_alteracao: Date.now(),
            bt_ativo: true,
            dt_ult_login:Date.now()
        });

        resp.send(r);
    }
        catch (error) {
            resp.send({error: "insere direito"})   
        }
    })



// listar os cadastros

app.get('/usuario/:id', async (req, resp) => {

    try {
        let consul = await db.infoa_enl_usuario.findOne({where: {id_usuario: req.params.id}});

        resp.send(consul);
    } catch (error) {
        resp.send({error: "Deu erro na listagem"})
    }
});





 // deletar um usuario

 app.delete('/usuario/:id', async (req, resp) => {
    try {
        let id = req.params.id;

        let del = await db.infoa_enl_usuario.destroy({
            where: {id_usuario: id}
        });

        resp.sendStatus(200);
    } catch (error) {
        resp.send({error: "erro ao deletar um usuario"})
    }
});




app.put('/usuario/:id', async (req, resp) => {
    try {
        let id = req.params.id;
        const usu = req.body;

        const r = await db.infoa_enl_usuario.update({img_foto: usu.img},{where: {id_usuario: id}})


        resp.send(r);

    } catch (error) {
        resp.send({error: "erro ao alterar o usuario"})
    }
})






// inserir um produto 


app.post('/produto/:id', async (req, resp) => {
    try {
        
        let produto = req.body;
        let id = req.params.id;
       
        let filter = await db.infoa_enl_produto.findOne({where: {nm_produto: produto.nm_produto}});


        let r = await db.infoa_enl_produto.create({
                id_categoria: 2,//categorias foram criadas; id de 1 a 7
                id_usuario: id,
                ds_imagem1: produto.img,
                ds_imagem2: produto.img2,
                ds_imagem3: produto.img3,
                ds_imagem4: produto.img4,
                nm_produto: produto.nm_produto,
                vl_preco: produto.vl_preco,
                ds_produto: produto.ds_produto,
                bt_ativo: true,
                nr_media_avaliacao: 1,
                nr_avaliacao: produto.nr_avaliacao,
                nr_desconto: produto.desc
                
        });

        
        resp.send(r);
        
    } catch (error) {
        resp.send({error: "Erro ao inserir o produto meu cumpadrade"})
    }
});




// listar  os produttoos

app.get('/produto/:id', async (req, resp) => {
    try {
        let id = req.params.id;

        let list = await db.infoa_enl_produto.findOne({where: {id_usuario: id}});


        resp.send(list);
    } catch (error) {
        resp.send({error: "erro ao listar os produtos"})
    }
});


//listar produto por categoria
app.get('/produtos/:id',async (req,resp) =>{
    try {
        let id = req.params.id;
        let r = await db.infoa_enl_produto.findAll({where:{id_categoria:id}});
        resp.send(r);
    } catch (error) {
        resp.send({error:"Produto não encontrado."})
        
    }
})



app.get('/produto', async (req, resp) => {
    try {
        let consul = await db.infoa_enl_produto.findAll({
            order:[
                ['nr_desconto','desc']]
        });


        resp.send(consul);
    } catch (error) {
        resp.send({error: "erro ao listar "})
    }
})


// alterar produto

app.put('/produto/:id', async (req, resp) => {
    try {
        let id = req.params.id;
      
        let produto = req.body;

        let r = await db.infoa_enl_produto.update({
            id_categoria: produto.id_categoria,
            nm_produto: produto.nm_produto,
            vl_preco: produto.vl_preco,
            ds_produto: produto.ds_produto,
            nr_desconto: 1
        },
        {
            where: {id_produto: id}
        });


        resp.send(r);
    } catch (error) {
        resp.send({error: "produto não foi alterado devido a um erro ai"})
    }
});







// deletar produto 

app.delete('/produto/:id', async (req, resp) => {
    try {
        let id = req.params.id;

        let del = await db.infoa_enl_produto.destroy({where: {id_produto: id}})


        resp.sendStatus(200);
    } catch (error) {
        resp.send({error: "erro ao deletar produto"})
    }
});


// listar os chats do usurio

app.get('/chat_usu/:id', async (req, resp) => {
    try {
        let id = req.params.id;

        const list = await db.infoa_enl_chat_usuario.findAll({where: {[Op.or] : [{id_usuario_comprador: id}, {id_usuario_vendedor: id}]}, 
            include:[
                {
                model: db.infoa_enl_usuario,
                as: "id_usuario_vendedor_infoa_enl_usuario" , 
                required: true
                },
                {
                    model: db.infoa_enl_usuario,
                    as: "id_usuario_comprador_infoa_enl_usuario" , 
                    required: true
                } 
            ]})


        resp.send(list);
    } catch (error) {
        resp.send({error: "erro ao ler os seus chats"})
    }
})


// inserindo os valores na tb_chat_usu

app.post('/chat_usu/:id_comprador/:id_vendedor', async (req, resp) => {
    try {
        let id_comprador = req.params.id_comprador;
        let id_vendedor = req.params.id_vendedor;

        const consul = await db.infoa_enl_chat_usuario.findOne({where: { id_usuario_comprador: id_comprador,
            id_usuario_vendedor: id_vendedor}});


        if (consul != null)
            return resp.send({erro: 'já existe essse chat'});    
        

        let r = await db.infoa_enl_chat_usuario.create({
            id_usuario_comprador: id_comprador,
            id_usuario_vendedor: id_vendedor
        });


        resp.send(r);
    } catch (error) {
        resp.send({error: "erro ao inserir os usuarios no chat"})
    }
});


app.delete('/chat_usu/:id', async (req, resp) => {
    try {
        let id = req.params.id;


        const del = await db.infoa_enl_chat.destroy({where:{[Op.or] : [{id_usuario_comprador: id}, {id_usuario_vendedor: id}]} })
    } catch (error) {
        
    }
})




app.post('/login', async (req, resp) => {
    try {
        let login = req.body;

        let logar = await db.infoa_enl_usuario.findOne({
            where: {
                ds_email: login.ds_email,
                ds_senha: login.ds_senha
            }, raw: true});


        let lastLogin = await db.infoa_enl_usuario.update({dt_ult_login: Date.now()}, 
        {where: {
            id_usuario: logar.id_usuario
        }})
        resp.send(logar);

    } catch (error) {
        resp.send({error: "Deu alguma coisa errada ai"})
    }
});




app.post('/categoria', async (req, resp) => {
    try {
        let category = req.body;

        let r = await db.infoa_enl_categoria.create({
            nm_categoria: category.nm_categoria
        });


        resp.send(category);
    } catch (error) {
        resp.send({error: "falha ao inserir uma categoria"})
    }
});



app.get('/categoria', async (req, resp) => {
    try {
        let consul = await db.infoa_enl_categoria.findAll();


        resp.send(consul);
    } catch (error) {
        resp.send({error: "Falha ao listar as categorias"})
    }
})


app.post('/chat/:id/:id2', async (req, resp) => {
    try {
        let chat = req.body;
        let id = req.params.id;

        //let consul = await db.infoa_enl_chat.findOne({where: {id_usuario: id}})

        
        let id_chat_usu = await db.infoa_enl_chat_usuario.findOne({
            where: {id_usuario_comprador: id, id_usuario_vendedor: req.params.id2}
        });

        let r = await db.infoa_enl_chat.create({
            id_usuario: id,
            id_chat_usuario: id_chat_usu.id_chat_usuario,
            ds_mensagem: chat.msg,
            dt_mensagem: new Date()
        });


        resp.send(r);
        
    } catch (error) {
        resp.send({error: "erro ao inserir mensagem"});
    }
});



app.get('/chat/:id/:id2', async (req, resp) => {
    try {
        let id_chat_usu = await db.infoa_enl_chat_usuario.findOne({
            where: { [Op.or]: [{id_usuario_comprador: req.params.id, id_usuario_vendedor: req.params.id2}, {id_usuario_comprador: req.params.id2, id_usuario_vendedor: req.params.id}]
        }});

        let chat = await db.infoa_enl_chat.findAll({where: {id_chat_usuario: id_chat_usu.id_chat_usuario},
            include: [
                {
                    model: db.infoa_enl_chat_usuario,
                    as: "id_chat_usuario_infoa_enl_chat_usuario",
                    required: true,

                    include: [
                        {
                            model: db.infoa_enl_usuario,
                            as: "id_usuario_vendedor_infoa_enl_usuario" , 
                            required: true 
                        }
                    ]
                }
            ]});

        resp.send(chat);
    } catch (error) {
        resp.send({error: "erro ao ler mensagens"})
    }
})


app.listen(process.env.PORT,
    x =>  console.log(`Oxe bglh ta lá na ${process.env.PORT}`))



   