import db from './db.js';
import express from 'express';
import cors from 'cors';
import Sequelize from 'sequelize'
import multer from 'multer';
import path from 'path';
import enviarEmail from './email.js';
import { send } from 'process';

const {Op, col} = Sequelize;




const app = express();
app.use(cors());
app.use(express.json());


app.get('/vistorecentemente', async (req, resp) => {
    const { id } = req.query;
    try {
        const r = await db.infoa_enl_visto_recentemente.findAll({
            raw: true,
            where: { 'id_usuario': id },
            order: [['dt_visualizacao', 'desc']],
            limit: 10,
            include: [
                {
                    model: db.infoa_enl_produto,
                    as: 'id_produto_infoa_enl_produto',
                    required: true,
                    //attributes: []
                }
            ],
            //attributes: []
        })

        const result = r.map(item => { return {
            "id_produto": item.id_produto_infoa_enl_produto.id_produto,
            "id_categoria": item.id_produto_infoa_enl_produto.id_categoria,
            "id_usuario": item.id_produto_infoa_enl_produto.id_usuario,
            "ds_imagem1": item.id_produto_infoa_enl_produto.ds_imagem1,
            "ds_imagem2": item.id_produto_infoa_enl_produto.ds_imagem2,
            "ds_imagem3": item.id_produto_infoa_enl_produto.ds_imagem3,
            "ds_imagem4": item.id_produto_infoa_enl_produto.ds_imagem4,
            "nm_produto": item.id_produto_infoa_enl_produto.nm_produto,
            "vl_preco": item.id_produto_infoa_enl_produto.vl_preco,
            "ds_produto": item.id_produto_infoa_enl_produto.ds_produto,
            "bt_ativo": item.id_produto_infoa_enl_produto.bt_ativo,
            "nr_media_avaliacao": item.id_produto_infoa_enl_produto.nr_media_avaliacao,
            "nr_avaliacao": item.id_produto_infoa_enl_produto.nr_avaliacao,
            "nr_desconto": item.id_produto_infoa_enl_produto.nr_desconto
        }})

        resp.send(r);
    } catch (e) {
        console.log(e);
        resp.send({ error: 'Deu ruim'})
    }
})

function Validador(usuario,nome,cpf,celular,email,senha,cep,cidade,rua) {
    let msg = " ";
    if(usuario.length === 0)
        msg+="Credenciais de usu??rio inv??lido.";
    if(nome.length === 0)
        msg+="Credenciais de nome inv??lido.";
    if(cpf.length !== 11)
        msg+="Credenciais de cpf inv??lido.";
    if(celular.length !== 11)
        msg+="Credenciais de celular inv??lido. Adicione o ddd";
    if(!email.includes("@"))
        msg+="Credenciais de email inv??lido.";
    if(senha.length === 0)
        msg+="Credenciais de usu??rio inv??lido.";
    if(cep.length !== 8)
        msg+="Credenciais de cep inv??lido.";
    if(cidade.length === 0)
        msg+="Credenciais de cidade inv??lido.";
    if(rua.length === 0)
        msg+="Credenciais de rua inv??lido.";
    
}

app.post('/vistorecentemente', async (req, resp) => {
    const { usuario, produto } = req.body;
    try {
        const r = await db.infoa_enl_visto_recentemente.create({
            id_usuario: usuario,
            id_produto: produto,
            dt_visualizacao: Date.now()
        })
        resp.sendStatus(200);
    } catch (e) {
        resp.send({ error: 'Deu ruim'})
    }

})


    // cadastra usuario

    app.post('/usuario', async (req, resp) => {



        try {
            
        
        let usu = req.body;
        //let consul = await db.infoa_enl_usuario.findOne({where: {nm_usuario: usu.nm_usuario}});

        let r = await db.infoa_enl_usuario.create({
            nm_usuario: usu.nm_usuario,
            nm_nome: usu.nm_nome,
            ds_cpf: usu.ds_cpf,
            nr_celular: usu.nr_celular,
            ds_email: usu.ds_email,
            ds_senha: usu.ds_senha,
            dt_nascimento: Date.now(),
            ds_cep: usu.ds_cep,
            nr_casa: usu.nr_casa,
            ds_cidade: usu.ds_cidade,
            bt_sexo: 1,
            img_foto: "qualquer",
            dt_cadastro: Date.now(),
            dt_alteracao: Date.now(),
            bt_ativo: true,
            ds_bairro: "Concei????o",
            dt_ult_login:Date.now(),
            nm_rua: usu.nm_rua
            //ds_codigo:usu.ds_codigo
        });
        
    
        resp.send(r);
    }
        catch (error) {
            console.log(error)
            resp.send({error})   
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



app.get('/usuario', async (req, resp) => {
    try {
        let consul = await db.infoa_enl_usuario.findAll();
        resp.send(consul);
    } catch (error) {
        resp.send({error: "erro ao listar "})
    }
})

//upload de foto pro usuario ai

const storage1= multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploadsPerfil/')
    },
    filename: function(req, file, cb) {
        const unique = Date.now() + "-" +  Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + "-" + unique + path.extname(file.originalname))
    }
});

const upload1 = multer({storage: storage1 })

app.put('/usuario/:id', upload1.single('foto'), async (req, resp) => {
    try {
        let id = req.params.id;
        const usu = req.body;
        const {path} = req.file;

        const r = await db.infoa_enl_usuario.update(
            {
                img_foto: path
            },

            {
                where: {id_usuario: id}
             })

        console.log(path)
        console.log(req.file)
        resp.send(r);

    } catch (error) {
        resp.send({error: "erro ao alterar o usuario"})
    }
})

app.get('/usuariozin', async(req, resp) => {
    let dirname = path.resolve();
    resp.sendFile(req.query.imagem, {root: path.join(dirname)})
})


//put de email, n??mero, nome e endere??o

app.put('/usuarioEmail/:id', async (req, resp) => {
    try {
        let id = req.params.id;
      
        let usuario = req.body;

        let r = await db.infoa_enl_usuario.update(
            {
                ds_email: usuario.email
            },
        {
            where: {id_usuario: id}
        });

        console.log(usuario)
        console.log(id)
        resp.send(r);
    } catch (error) {
        resp.send({error: "endere??o n??o foi alterado devido a um erro ai"})
    }
});

app.put('/usuarioNumero/:id', async (req, resp) => {
    try {
        let id = req.params.id;
      
        let usuario = req.body;

        let r = await db.infoa_enl_usuario.update(
            {
                nr_celular: usuario.num
            },
        {
            where: {id_usuario: id}
        });

        console.log(usuario)
        console.log(id)
        resp.send(r);
    } catch (error) {
        resp.send({error: "n??mero n??o foi alterado devido a um erro ai"})
    }
});

app.put('/usuarioNick/:id', async (req, resp) => {
    try {
        let id = req.params.id;
      
        let usuario = req.body;

        let r = await db.infoa_enl_usuario.update(
            {
                nm_usuario: usuario.nick
            },
        {
            where: {id_usuario: id}
        });

        console.log(usuario)
        console.log(id)
        resp.send(r);
    } catch (error) {
        resp.send({error: "nick n??o foi alterado devido a um erro ai"})
    }
});


app.put('/usuarioEndereco/:id', async (req, resp) => {
    try {
        let id = req.params.id;
      
        let usuario = req.body;

        let r = await db.infoa_enl_usuario.update(
            {
                nm_rua: usuario.endereco
            },
        {
            where: {id_usuario: id}
        });

        console.log(usuario)
        console.log(id)
        resp.send(r);
    } catch (error) {
        resp.send({error: "nick n??o foi alterado devido a um erro ai"})
    }
});



app.post('/cartao/:id', async (req, resp) => {
    try {
        let {nrCartao, nrCvc, dtVal} = req.body;
     
        let id = req.params.id;
    
        const r = await db.infoa_enl_cartao_credito.create({
            id_usuario: id,
            nr_cartao: nrCartao, 
            nr_cvc: nrCvc, 
            dt_validade: Date.now()
        });
  
        resp.sendStatus(200);
    } catch (error) {
        resp.send({ error: 'Deu ruim'})
    }

})


// inserir um produto 

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        const unique = Date.now() + "-" +  Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + "-" + unique + path.extname(file.originalname))
    }
});

const upload = multer({storage: storage}); 

app.post('/produto/:idUsu/:idCateg', upload.array('imgPrincipal', 4),   async (req, resp) => {
    try {
        
        let {nmproduto, desc , preco} = req.body;
        let idCategoria = req.params.idCateg;
        let idUsu = req.params.idUsu;
        const path   = req.files[0].path;
    
        //const r1 = [req.files.map((x))]

        //const filoi = await db.infoa_enl_produto.findOne({where: {nm_produto: produto.nm_produto}});

        if (nmproduto === '' || desc === '' || preco === '')
        return resp.send({error: "n??o se pode inserir campos null"})
     
        console.log(nmproduto)
      
        const r = await db.infoa_enl_produto.create({
            id_categoria: idCategoria,
            id_usuario: idUsu,
            nm_produto: nmproduto,
            vl_preco: preco,
            ds_produto: desc,
            bt_ativo: 1,
            nr_media_avaliacao: 1,
            nr_avaliacao: 3,
            nr_desconto: 20,
            ds_imagem1: path,
            ds_imagem2: req.files[1].path,
            ds_imagem3: req.files[2].path,
            ds_imagem4: req.files[3].path

        });
        
       
        
        console.log(req.body)

        resp.send(r);
        
        
    } catch (error) {
        resp.send({error: "Erro ao inserir o produto."})
    }
});

app.get('/produtinho', async(req, resp) => {
    let dirname = path.resolve();
    resp.sendFile(req.query.imagem, {root: path.join(dirname)})
})


// listar  os produttoos

app.get('/produtoss/:id', async (req, resp) => {
    try {
        let id = req.params.id;
        let page = req.query.page || 0;
        if (page <= 0) page = 1;
      
        const itemsPerPage = 5;
        const skipItems    = (page-1) * itemsPerPage;

        let list = await db.infoa_enl_produto.findAll(
            
            {
                limit: itemsPerPage,
                offset: skipItems,
                where: {id_usuario: id}});


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
        resp.send({error:"Produto n??o encontrado."})
        
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
        resp.send({error: "produto n??o foi alterado devido a um erro ai"})
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



        if (id_comprador === id_vendedor){
            return resp.send({error: "N??o se pode iniciar um chat consigo msm"})
        }
       

        const consul = await db.infoa_enl_chat_usuario.findOne({where: {[Op.or]: [{id_usuario_comprador: id_comprador,
            id_usuario_vendedor: id_vendedor}, {id_usuario_comprador: id_vendedor,
                id_usuario_vendedor: id_comprador}]}});

       
        if (consul != null) {

            


            return resp.send({erro: 'j?? existe essse chat'});    
        }

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


        const del = await db.infoa_enl_chat_usuario.destroy({where:{id_chat_usuario: id} })
        resp.sendStatus(200);
    } catch (error) {
        
    }
})

app.get('/chat_usu2/:id_chat_usu', async (req, resp) => {
        try {
            let id = req.params.id_chat_usu;

            let listar = await db.infoa_enl_chat_usuario.findOne({where: {id_chat_usuario: id}, 
            include: [
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
            ]});

            resp.send(listar);
        } catch (error) {
            resp.send({error: 'erro ao listar os chat'})
        }
});



app.post('/login', async (req, resp) => {
    try {
        let login = req.body;

  
        let logar = await db.infoa_enl_usuario.findOne({
            where: {
                ds_email: login.ds_email,
                ds_senha: login.ds_senha
            }, raw: true});

            
            
            if (login.ds_email === "" || login.ds_senha === "") {
                return resp.send({error: "N??o pode ser inserido campos vazios"})
            }
          
            if (logar === null){
                return resp.send({error: "Senha ou Email incorretos"})
            }
            
           

        let lastLogin = await db.infoa_enl_usuario.update({dt_ult_login: Date.now()}, 
        {where: {
            id_usuario: logar.id_usuario
        }})


       
        

        resp.send(logar);

    } catch (error) {
        resp.send({error: "Deu alguma coisa errada ai"})
    }
});



app.post('/esqueciASenha', async(req, resp)=>{
    try {
        
  
    let usu = await db.infoa_enl_usuario.findOne({where:{
        ds_email: req.body.ds_email
    }})
    
        if(!usu){
            resp.send({error:"Email inv??lido."})
        }
    
        let code = Math.floor(Math.random() * (9999 - 1000) ) + 1000;
  
        await db.infoa_enl_usuario.update({
          ds_codigo: code
        },{
            where:{id_usuario:usu.id_usuario}
        })
        enviarEmail(usu.ds_email,'Recupera????o de Senha',`
        <h2>Recupera????o de Senha</h2>
        </br>
        <p>Ol??, ${usu.nm_nome}. Utilize o c??digo abaixo para recuperar sua senha e aproveitar os produtos Enlox.</p>
        <p>C??digo: <b>${code}</b></p>
        `
        )
        resp.sendStatus(200)
    } catch (error) {
        resp.send({error:"Errado"})
    }


});



app.post('/validarCodigo', async(req, resp)=>{
    try {
        
    
    const usu = await db.infoa_enl_usuario.findOne({where:{
        ds_email: req.body.ds_email
    }})
  
    if(!usu){
        resp.send({error:"Email inv??lido."})
    }
    if(usu.ds_codigo !== req.body.ds_codigo){
        resp.send({error:"C??digo inv??lido."})
    }
    resp.sendStatus(200)
} catch (error) {
        resp.send({error:"Erro"})
}
});




app.put('/resetarSenha', async(req, resp)=>{
    try {
        
   
    const usu = await db.infoa_enl_usuario.findOne({where:{
        ds_email: req.body.ds_email
    }})
  
    if(!usu){
        resp.send({error:"Email inv??lido."})
    }
    if(usu.ds_codigo !== req.body.ds_codigo || usu.ds_codigo === '' ){
        resp.send({error:"C??digo inv??lido."})
    }

    await db.infoa_enl_usuario.update({
        ds_senha: req.body.senhaAlterada,
        ds_codigo:''//aqui ?? para o c??digo random ser usado apenas uma vez
    },{
        where:{id_usuario: usu.id_usuario}
    })
    resp.sendStatus(200)
} catch (error) {
     resp.send({error:"Erro"})   
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



app.get('/categoria/:id', async (req, resp) => {
    try {
        let consul = await db.infoa_enl_categoria.findOne({where: {id_categoria: req.params.id}});


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

        
        //let id_chat_usu = await db.infoa_enl_chat_usuario.findOne({
            //where: {id_usuario_comprador: id, id_usuario_vendedor: req.params.id2}
        //});

        let r = await db.infoa_enl_chat.create({
            id_usuario: id,
            id_chat_usuario: req.params.id2,
            ds_mensagem: chat.msg,
            dt_mensagem: new Date()
        }, 
        {
            where: {id_chat_usuario: req.params.id2}
        });


        resp.send(r);
        
    } catch (error) {
        resp.send({error: "erro ao inserir mensagem"});
    }
});



app.get('/chat/:id', async (req, resp) => {
    try {
        //let id_chat_usu = await db.infoa_enl_chat_usuario.findOne({
          //  where: { [Op.or]: [{id_usuario_comprador: req.params.id, id_usuario_vendedor: req.params.id2}, {id_usuario_comprador: req.params.id2, id_usuario_vendedor: req.params.id}]
        //}});

        let chat = await db.infoa_enl_chat.findAll({where: {id_chat_usuario: req.params.id},
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





// test 

app.post('/produta/:idUsu/:idCateg', async (req, resp) => {
    try {

        let produt = req.body;
        let idCategoria = req.params.idCateg;
        let idUsu = req.params.idUsu;




        const r = await db.infoa_enl_produto.create({
            id_categoria: idCategoria,
            id_usuario: idUsu,
            nm_produto: produt.nm,
            vl_preco: 110,
            ds_produto: produt.ds,
            bt_ativo: 1,
            nr_media_avaliacao: 1,
            nr_avaliacao: 3,
            nr_desconto: 20,
            ds_imagem1: "sdad",
            ds_imagem2: "sd",
            ds_imagem3: "dsa",
            ds_imagem4: "dasda"

        });


        resp.send(r);

        
    } catch (error) {
        resp.send({error: "Falha ao inserir produto"});
    }
});

app.post('/usuaria', async (req, resp) => {
    try {
        
    
    let usu = req.body;

    //let consul = await db.infoa_enl_usuario.findOne({where: {nm_usuario: usu.nm_usuario}});
    let r = await db.infoa_enl_usuario.create({
        nm_usuario: usu.nm,
        nm_nome: "das",
        ds_email: "dh",
        ds_senha: "sha",
        dt_nascimento: Date.now(),
        nr_casa: 12,
        ds_cidade: "as",
        bt_sexo: 1,
        ds_bairro: "dhask",
        dt_cadastro: Date.now(),
        bt_ativo: 1,
        dt_ult_login: Date.now()
    });
    
    console.log("aaaaaa")
    resp.send(r);
}
    catch (error) {
        resp.send({error: "insere direito?"})   
    }
})

app.listen(process.env.PORT,
    x =>  console.log(`Oxe bglh ta l?? na ${process.env.PORT}`))



   