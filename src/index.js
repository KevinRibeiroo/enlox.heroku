import db from './db.js';
import express from 'express';
import cors from 'cors';




const app = express();
app.use(cors());
app.use(express.json());



    // listar os logados

app.get('/login', async  (req, resp) => {
    try {
        let consul = await db.infoa_enl_login.findAll();

        resp.send(consul);
    } catch (erro) {
        resp.send({erro: "não estou conseguindo ler"});
    }
})



    // lgar usuario
app.post('/login', async (req, resp) => {

   try {
       let login = req.body;

       //let selection = await db.infoa_enl_usuario.findOne({where: {id_usuario: login.id_usuario}});

        let filtro = await db.infoa_enl_usuario.findOne({where:{ ds_email: login.ds_email}})


       let r = await db.infoa_enl_login.create({
           ds_email: login.ds_email,
           ds_senha: login.ds_senha,
           dt_ult_login: Date.now(),
           dt_registro: Date.now()
       });


       let logado = await db.infoa_enl_usuario.update({
        id_login: r.id_login
    },
    {
        where: {id_usuario: filtro.id_usuario}
    });

       resp.send(r);
       resp.send(logado)
   } catch (error) {
       resp.send({error: "Falha ao inserir um usuario"});
   }
});







    // cadastra usuario

    app.post('/usuario', async (req, resp) => {

        let usu = req.body;
        let consul = await db.infoa_enl_usuario.findOne({where: {nm_usuario: usu.nm_usuario}});
        let r = await db.infoa_enl_usuario.create({
            id_login: 1,
            nm_usuario: usu.nm_usuario,
            ds_cpf: usu.ds_cpf,
            nr_celular: "dssda",
            nr_telefone: usu.nr_telefone,
            ds_email: usu.ds_email,
            dt_nascimento: Date.now(),
            ds_cep:  usu.ds_cep,
            nr_casa: usu.nr_casa,
            ds_complemento: usu.ds_complemento,
            bt_sexo: 1,
            foto: "https://i1.sndcdn.com/artworks-000608006128-bvmugt-t500x500.jpg",
            dt_cadastro: Date.now(),
            dt_alteracao: Date.now(),
            bt_ativo: true
        });

        resp.send(r);
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










// inserir um produto 


app.post('/produto', async (req, resp) => {
    try {
        let produto = req.body;

        let filter = await db.infoa_enl_produto.findOne({where: {nm_produto: produto.nm_produto}});

        let r = await db.infoa_enl_produto.create({
                id_categoria: 1,
                id_usuario: 1,
                nm_produto: produto.nm_produto,
                vl_preco: produto.vl_preco,
                ds_produto: produto.ds_produto,
                bt_ativo: true,
                nr_media_avaliacao: 1,
                nr_avaliacao: produto.nr_avaliacao,
                nr_desconto: 1
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

        let list = await db.infoa_enl_chat_usuario.findOne({where: {id_usuario_comprador: id}})


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

        let r = await db.infoa_enl_chat_usuario.create({
            id_usuario_comprador: id_comprador,
            id_usuario_vendedor: id_vendedor
        });

        resp.send(r);
    } catch (error) {
        resp.send({error: "erro ao inserir os usuarios no chat"})
    }
});







app.post('/login2', async (req, resp) => {
    try {
        let login = req.body;

        let logar = await db.infoa_enl_usuario.findOne({
            where: {
                ds_email: login.ds_email
            }, raw: true});

        resp.send(logar);

    } catch (error) {
        resp.send({error: "Deu alguma coisa errada ai"})
    }
});










app.listen(process.env.PORT,
    x =>  console.log(`Oxe bglh ta lá na ${process.env.PORT}`))



   