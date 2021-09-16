import db from './db.js'; 
import express from 'express' 
import cors from 'cors'

const devs = express(); 
devs.use(cors());
devs.use(express.json());


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
        let data = new Date();



        if (!pro.nome || pro.nome.replace === '' )
        return resp.send({erro: "O nome do produto é obrigatório"})
   
        if ( pro.nome.length <= 4)
        return resp.send({erro:"O campo nome precisa ter mais do que 4 caracteres"})  
       
   
        if (pro.precoD < 0 )
        return resp.send({erro:"O preço não pode ser negativo"})    
      

        if (pro.precoP < 0 )
        return resp.send({erro:"O preço não pode ser negativo"})   
        

         if (isNaN(pro.precoP) ) {return resp.send({erro: 'Letras não podem ser utilizadas no preço por'})};
       
        
        if (isNaN(pro.precoD) ) {return resp.send({erro:'Letras não podem ser utilizadas no preço de'})}; 
      

        if (!pro.cat || pro.cat.replace === '')
        return resp.send({erro:"A categoria é obrigatória"}) 
      
   
        if (!pro.ava || pro.ava.replace === '')
        return resp.send({erro: "A avaliação é obrigatória"}) 

        
        if (pro.ava != parseInt(pro.ava))
            return resp.send({erro:'Letras não podem ser utilizadas no campo avaliação'});
      

        if (!pro.est || pro.est.replace === '')
        return resp.send({erro: "O estoque é obrigatório"}) 
        
        
        if (pro.est != parseInt(pro.est))
            return resp.send({erro:'Letras não podem ser utilizadas no campo estoque'});
        

        if (!pro.img || pro.img.replace === '')
        return resp.send({erro: "O link da imagem é obrigatório"}) 

        if (!pro.des || pro.des.replace === '')
        return resp.send({erro: "A descrição é obrigatória"}) 
    

         let p = await db.tb_produto.findOne({where: {nm_produto: pro.nome}})
         if (p != null)
         return resp.send({erro: "O produto já foi cadastrado"})
        
        
        let u  = await db.tb_produto.create({
            nm_produto: pro.nome,
            vl_preco_de: pro.precoD, 
            ds_categoria: pro.cat, 
            vl_preco_por: pro.precoP, 
            vl_avaliacao: pro.ava, 
            ds_produto: pro.des, 
            qtd_estoque: pro.est,
            img_produto: pro.img,
            bt_ativo:pro.ativo,
            dt_inclusao: data

        }) 

        resp.send(u);
       } catch(e) {resp.send (e.toString())}
})



devs.put('/produto/:id', async (req,resp) =>{
    try{
        let id = req.params.id;
        let pro = req.body;


        
        if (!pro.nome || pro.nome.replace === '' )
        return resp.send({erro: "O nome do produto é obrigatório"})
   
        if ( pro.nome.length <= 4)
        return resp.send({erro:"O campo nome precisa ter mais do que 4 caracteres"})  
       
   
        if (pro.preD < 0 )
        return resp.send({erro:"O preço não pode ser negativo"})    
      

        if (pro.preP < 0 )
        return resp.send({erro:"O preço não pode ser negativo"})   
        

        if (pro.preP === NaN)
        return toast.error('Letras não podem ser utilizadas no preço');
       

        if (pro.preD === NaN)
        return resp.send({erro:"Letras não podem ser utilizadas no preço"})   
      

        if (!pro.cat || pro.cat.replace === '')
        return resp.send({erro:"A categoria é obrigatória"}) 
      
   
        if (!pro.ava || pro.ava.replace === '')
        return resp.send({erro: "A avaliação é obrigatória"}) 
      

        if (!pro.est || pro.est.replace === '')
        return resp.send({erro: "O estoque é obrigatório"}) 
        

        if (pro.est === NaN)
        return resp.send({erro: "Letras não podem ser utilizadas no estoque"})
        

        if (!pro.img || pro.img.replace === '')
        return resp.send({erro: "O link da imagem é obrigatório"}) 
       



        let dut = await db.tb_produto.update(
            {
                nm_produto: pro.nome,
                ds_categoria: pro.cat, 
                vl_preco_de: pro.precoD, 
                vl_preco_por: pro.precoP, 
                vl_avaliacao: pro.ava, 
                ds_produto: pro.des, 
                qtd_estoque: pro.est,
                img_produto: pro.img
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
