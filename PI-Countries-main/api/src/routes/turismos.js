const {Router}=require('express');
const{Countries,Turismos}=require('../db.js');




const router=Router();


router.get('/',async(req,res,next)=>{
    const turismo=req.query.name
    if(turismo){
        try{
        const respuesta=await Turismos.findAll({
            include:[{
                model:Countries,
                attributes:['id','name'],
                through:{
                    attributes:[]
                }
            }]
        })
        let respuestas=respuesta.filter(e=>e.name.toLowerCase().match(turismo.toLowerCase()));

        if(respuestas.length>0) return res.send(respuestas)


         return res.status(200).send([{name:'no hay coincidecias'}])
    }catch(e){
        console.log(e)
    }
    }

    try{
    const respuesta=await Turismos.findAll({

        include:[{
            model:Countries,
            attributes:['id','name'],
            through:{
                attributes:[]
            }

        }]
    })
    return res.status(200).send(respuesta)
}catch(e){
    console.log(e)

    }
})




module.exports=router