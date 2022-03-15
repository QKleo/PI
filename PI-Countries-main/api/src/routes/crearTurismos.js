const {Router}=require('express');
const{Countries,Turismos}=require('../db.js');




const router=Router();


router.post('/',async (req,res,next)=>{
    const{name,dificultad,duracion,temporada,paises}=req.body



 // 
    try{
    let turismo=await Turismos.findOrCreate({
        where:{
        name:name,
        dificultad:dificultad,
        duracion:duracion,
        temporada:temporada}

        
    })
    let msgP='sin vinculos'
    console.log(req.body)
    ///
    let turi=await Turismos.findOne({
        where:{
            name:name,
            dificultad:dificultad,
            duracion:duracion,
            temporada:temporada
        
        }
    })
    if(paises.length>0){
        msgP=paises.join(' ')
        for(let p of paises){

             let pais=await Countries.findOne({
               where:{name:p}
                })

            let union=turi.addCountries(pais)
            }

        }

    ////////////////////////
   

   
    
       try{ 
       names=name.split(' ')
       names.join('')    
       await router.get(`/respuesta/${name.split(' ').join('')}`,(req,res,next)=>{

            console.log('yendo')
            res.send({msg:`creaste una actividad:${name}-->con ${msgP}`})
           //res.end(`${name}`)
         })}catch(e){
             await router.get(`/respuesta/${name}`,(req,res,next)=>{
                 res.send({msg:'Algo salio mal'})
      
                })}
              
    }
    
    catch(e){
        
        await router.get(`/respuesta/${name}`,(req,res,next)=>{
            res.send({msg:'Algo salio mal revisa tus datos..'})
        })
    }
 
//console.log(turismof)

   








})









module.exports=router