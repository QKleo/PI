const { Router } = require('express');

const {Breed_groups,Dogs}=require('../db.js');

const router = Router();
const axios=require('axios');

router.get('/',(req,res,next)=>{

    Breed_groups.findAll({
        attributes:['name','id'],
        include:[Dogs]
    })
    .then((r)=>{return res.send(r)})
    .catch(err=>console.log(err))
})

router.get('/:dogs',(req,res,next)=>{
    const {dogs}=req.params
        Breed_groups.findAll({
            attributes:['name'],
            include:[{
                model:Dogs,
                where:{name:dogs}
            
            }],

        })
    .then((r)=>{
            if(r.length>0){
            return res.send(r[0].dogs)}
            else{
                return res.send('algo')
            }
           
        
    })  
    .catch(err=>console.log(err))  
})

router.post('/',(req,res,next)=>{
    const{dogs,breed_groups}=req.body
    // let dog=await  Dogs.findOne({
    //      where:{name:"Henry Pug"}
    //  })
    // let breed=await Breed_groups.findOne({
    //     where:{name:"Mixed"}
    //     })
    // breed.addDogs(dog)
    Promise.all([Dogs.findOne({where:{id:dogs}}),Breed_groups.findOne({where:{name:breed_groups}})])
    .then((r)=>{r[1].addDogs(r[0]);

        return res.send("ralacion establecida")})
   
    .catch(err=>console.log(err))
    console.log('ooo')
})    
        
    
    //res.send({ms:'olo'})

    
       
    


module.exports=router
