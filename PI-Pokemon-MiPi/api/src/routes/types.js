

const {Router}=require('express');
const axios=require('axios');

const {Pokemons ,Types}=require('../db.js');

const router=Router();

router.get('/',(req,res,next)=>{
    Types.findAll({
        include:[Pokemons]
    })
    .then((r)=>{return res.send(r)})
    .catch(()=>next())
})

router.get('/:name',(req,res,next)=>{
    
    
    const{name}=req.params
    axios.get('https://pokeapi.co/api/v2/type')
    .then((r)=>{return r.data.results})
    .then((r)=>{console.log(r);return r.filter(e=>e.name===name)})
    .then(async(r)=>{
        if(r[0]){
            let respuestaBd=await Types.findAll({
                where:{name:name},
                include:[Pokemons],
                attributes:['name'],
            })
            let respuesta=await axios.get(r[0].url)
            let pokemones=respuesta.data.pokemon
            pokemones=pokemones.map(e=>{return e.pokemon.name})
           // respuestaBd=respuestaBd[0].pokemons
           
            if(respuestaBd[0].pokemons.length>0){
                respuestaBd=respuestaBd[0].pokemons.map(e=>e.name)
               return res.send([...pokemones,...respuestaBd]).end()   
            }
            
            return res.send(pokemones).end()
        
        }else{return res.send({msg:'no hay type'}).end()}
    
    
    })
   
    .catch(()=>next())
    
})

module.exports=router;