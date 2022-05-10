const {Router}=require('express');
const axios=require('axios')
const router=Router();
const {Pokemons ,Types,Nombres}=require('../db.js');



router.get('/',(req,res,next)=>{
    Nombres.findAll({
        attributes:['name','id']
    })
    .then((r)=>{return res.send(r).end()})
    .catch(()=>next())
})
module.exports=router