const {Router}=require('express');
const axios=require('axios')
const router=Router();
const {Pokemons ,Types,Nombres}=require('../db.js');


router.get('/',(req,res,next)=>{
    let aux=[]
    let aux1=[]
    const name=req.query.name

    if(name){
             axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
          //   .then((r)=>{aux1.push(r)})

             .then((info)=>{
                 //if(aux1.length>0){return res.send(aux1[0].data.name).end()}
                  return res.send({
                    id:info.data.id,
                    name:info.data.name,
                    image:info.data.sprites.other.home.front_default,
                    height:info.data.height,
                    weight:info.data.weight,
                    hp:info.data.stats[0].base_stat,
                    defense:info.data.stats[2].base_stat,
                    attack:info.data.stats[1].base_stat,
                    speed:info.data.stats[5].base_stat,
                    createInDatabase:false,
                    types:info.data.types.map((e)=>{return {
                        name:e.type.name,
                        slot:e.slot,
                        id:e.type.url.split('/')[6]
                        }})
                  }).end()
            })
            
            
            
        //return res.send({msg:`${name}`})  no
             .catch(()=>{
                 
                Pokemons.findAll({
                    include:[Types],
                    where:{name:name.toLocaleLowerCase()}
                })
                .then((r)=>{if(r.length>0){return res.send(r).end()}
                   return res.send({name:'no hay match'}).end()
                })
                .catch(()=>next())
            })
    }


    else{

    axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=40')
    .then((r)=>{
        r.data.results.forEach(e=>{return aux.push(`${e.url}`)})
        let algo=''

        //console.log(aux) no
    //   let aux1=aux.map(e=>{return algo=axios.get(e)})  no
    // Promise.all(aux1) no
    // .then((r)=>{r.map((info)=> no  
  //-----------------------------------------------     
    //Promise.all(aux.map(async(e)=>{let info=await axios.get(e);
        let aux1=aux.map(e=>{return algo=axios.get(e)})
        console.log(aux1)
         Promise.all(aux1) 
        .then((r)=>r.map((info)=>{console.log('resuelvo');
            {
            return {
            id:info.data.id,
            name:info.data.name,
            image:info.data.sprites.other.home.front_default,
            height:info.data.height,
            weight:info.data.weight,
            hp:info.data.stats[0].base_stat,
            defense:info.data.stats[2].base_stat,
            attack:info.data.stats[1].base_stat,
            speed:info.data.stats[5].base_stat,
            createInDatabase:false,
            types:info.data.types.map((e)=>{return {
                                        name:e.type.name,
                                        slot:e.slot,
                                        id:e.type.url.split('/')[6]
                                        }
                                    })
                    }
            }
   // )})no
        }))


        .then(async(r)=>{

            let bd=await Pokemons.findAll({
                include:[Types]
            });
     
            return res.status(200).send([...r,...bd])})
        
        .catch(()=>next())
   
    })
    .catch(()=>next())
}//else
})

//----------------------------------------------



router.get('/:id',(req,res,next)=>{
    const {id}=req.params
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((info)=>{return res.send(
        {
            id:info.data.id,
            name:info.data.name,
            image:info.data.sprites.other.home.front_default,
            height:info.data.height,
            weight:info.data.weight,
            hp:info.data.stats[0].base_stat,
            defense:info.data.stats[2].base_stat,
            attack:info.data.stats[1].base_stat,
            speed:info.data.stats[5].base_stat,
            createInDatabase:false,
            types:info.data.types.map((e)=>{return {
                name:e.type.name,
                slot:e.slot,
                id:e.type.url.split('/')[6]
                }})
            }
    ).end()})
    .catch(()=>{
       
               Pokemons.findAll({
                include:[Types],   
                where:{id:id}
                })
               .then((r)=>{
                   if(r.length>0){return res.send(r)}  
           
               //return res.send({msg:'nono'}).end()
               })
               .catch(()=>{return res.send({msg:'nono'}).end()})
            
        
    })
})



router.post('/',(req,res,next)=>{
    const{name,hp,defense,attack,speed,height,weight,types}=req.body
    
    let aux=[]
    let aux2=[]
    Pokemons.create({
        name:name,
        hp:hp,
        defense:defense,
        attack:attack,
        speed:speed,
        height:height,
        weight:weight
    })
    .then(()=>{return Pokemons.findOne({
        where:{
            name:name,
            hp:hp,
            defense:defense,
            attack:attack,
            speed:speed,
            height:height,
            weight:weight
        
        },
        include:[Types]

        })
    })
    .then((r)=>{
        
        const aux3=r.types.map(t=>{return t.id*1})

        for(let e of types){
            Types.findOne({where:{id:e}})
            .then(()=>{
                if(!aux3.includes(e*1)){
                    r.addTypes(e)
                }
            })
            .catch(()=>next())
        }
    })
    .then(()=>res.status(200).end())
    .catch(()=>next())
       

    
 
})
//-----------------------


router.delete('/:id',(req,res,next)=>{
    const {id}=req.params
    Pokemons.destroy({where:{id:id}})
    .then((resp)=>{
        if(resp){
            console.log('borrado')
        }else{
            console.log('no lo encontre')
        }
        res.end()
    })
   
    .catch(()=>next())
})

router.put('/:id',(req,res,next)=>{
    const{id}=req.params
    const{name,hp,defense,speed,attack,height,weight,types}=req.body
    let n=0

    Pokemons.update(
        {
            name:name,
            hp:hp,
            defense:defense,
            attack:attack,
            speed:speed,
            height:height,
            weight:weight

        },{
        where:{id:id}
    })
    .then(()=>{return Pokemons.findOne({where:{id:id}})})
    .then(async(r)=>{
        try{
        r.setTypes([])
        for(let e of types){
            let num=e*1
            n++
            let t=await Types.findOne({where:{id:num}})
            
            console.log(n)
            r.addTypes(t)
                
           
            }}
        catch(err){console.log(err)}
         
       
    })
    .then(()=>res.status(200).end())
    .then(()=>console.log('termine'))
    .catch(()=>next())
    
})


module.exports=router