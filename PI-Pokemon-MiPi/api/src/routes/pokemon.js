const {Router}=require('express');
const axios=require('axios')
const router=Router();
const {Pokemons ,Types,Nombres}=require('../db.js');



router.get('/',async(req,res,next)=>{
    try{
    let nombresApi= await Nombres.findAll({
        attributes:['name','id']
    })
    
    let nombresBd=await Pokemons.findAll({attributes:['name','id']})
    res.send([...nombresApi,...nombresBd]).end() 
    }
    catch(err){next()}
    
})
module.exports=router