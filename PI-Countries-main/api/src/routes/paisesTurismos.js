const {Router}=require('express');
const{Countries,Turismos}=require('../db.js');




const router=Router();


router.get('/:value',async(req,res,next)=>{
    const {value}=req.params

    try{
    const respuesta=await Countries.findAll({
        include:[{
            model:Turismos,
            attributes:['id','name','dificultad','temporada'],
            where:{id:value},
            through:{
                attributes:[]}
                
            
                
            
        }]
    })
    if(respuesta.length===0){res.send({msg:'No hay coicidencias'})}
    res.send(respuesta)
    }catch(e)
    { console.log(e)}

    
})











module.exports=router