import db from './db.js'; 
import express from 'express' 
import cors from 'cors'

const devs = express(); 
devs.use(cors());



devs.get('/produto', async (req,resp) => {
    try{
        let produtos = await db.tb_produto.findAll()
        resp.send(produtos);
    } catch (e){
        resp.send({erro: "Não foi possível consultar os produtos"})
    }
})


devs.post('/produto', async (req,resp) => {
    try {
        let pro = req.body;

        let p = await db.tb_produto.findOne({where: {nm_produto: pro.produto, ds_categoria: pro.categoria, vl_preco_de: pro.vl_preco_de, vl_preco_por: pro.vl_preco_por, vl_avaliacao: pro.vl_avaliacao, ds_produto: pro.descricao_produto, qtd_estoque: pro.qtd_estoque,img_produto: pro.img, bt_ativo: pro.ativo, dt_inclusao: pro.dt_inclusao }})
        if (p != null)
        return resp.send({erro: "O produto já foi cadastrado"})
        
        let u  = await db.tb_produto.create({
            nm_produto: pro.produto,
            ds_categoria: pro.categoria, 
            vl_preco_de: pro.preco_de, 
            vl_preco_por: pro.preco_por, 
            vl_avaliacao: pro.avaliacao, 
            ds_produto: pro.descricao_produto, 
            qtd_estoque: pro.estoque,
            img_produto: pro.img, 
            bt_ativo: pro.ativo,
             dt_inclusao: pro.dt_inclusao
        })
        resp.send(u);
       } catch(e) {resp.send ({erro: 'Ocorreu um erro, o produto não foi cadastrado!'})}
})



devs.put('/produto/:id', async (req,resp) =>{
    try{
        let id = req.params.id;
        let d = req.body;

        let dut = await db.tb_produto.update(
            {
                nm_produto: pro.produto,
                ds_categoria: pro.categoria, 
                vl_preco_de: pro.vl_preco_de, 
                vl_preco_por: pro.vl_preco_por, 
                vl_avaliacao: pro.vl_avaliacao, 
                ds_produto: pro.descricao_produto, 
                qtd_estoque: pro.qtd_estoque,
                img_produto: pro.img, 
                dt_inclusao: pro.dt_inclusao
            },
            {
                where: {id_produto: id}
            });
            resp.sendStatus(200);
      } catch (e) {
          resp.send({erro: e.toString()});
      }
})


devs.delete('/produto/:id', async (req,resp) => {
    try{
        let t = await db.tb_produto.destroy ({where: { id_produto: req.params.id}});
        resp.sendStatus(200)
    } catch (e){
        resp.send({erro: e.toString()});
    }
})






devs.listen(process.env.PORT,      
         x => console.log(`O servidor subiu na porta ${process.env.PORT} aleluia`))
