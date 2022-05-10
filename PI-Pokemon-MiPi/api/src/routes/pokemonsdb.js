const {Router}=require('express');

const router=Router();
const {Pokemons ,Types}=require('../db.js');

router.get('/',(req,res,next)=>{
    Pokemons.findAll({
        include:[Types]
    })
    .then((r)=>res.status(200).send(r))
    
    .catch(()=>next())

})



module.exports=router