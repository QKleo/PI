const {Router}=require('express');
const{Countries,Turismos}=require('../db.js');




const router=Router();



router.post('/',async (req,res,next) =>{
    //  const country=req.body.Brunei
    //  const turismo=req.body.Sky
    const mensaje={}
    const llego=req.body
    const indice=llego.length
    for(let j=0;j<llego[0].length;j++){
      try{
      
      let pais= await Countries.findOne({
          where:{name:llego[0][j]}
      })
      for(let i=0;i<llego[1].length;i++){
      let turi= await Turismos.findOne({
          where:{name:llego[1][i]}
      })
        
      
      if(pais&&turi){
      console.log('llega pais')
      pais.addTurismos(turi)
      const voy={...mensaje,[llego[0][j]]:llego[1][i] }
      
      let rut1=llego[0].join('')
      let rut2=llego[1].join('')
      let rut=rut1+rut2
      await router.get(`/respuesta/${rut.split(' ').join('')}`,(req,res,next)=>{
          res.send({msg:`vinculos establecidos...${llego[0]}-->${llego[1]}`}) })
          let a=rut.split(' ').join('')
          console.log(a)
      }else{
          console.log({msg:'Algo salio mal :('})
         
      }}
      
      
  }catch(error){console.log(error)}}
  
  console.log('aqqquuuuuu')
  console.log(req.body)
  
  
  
  })







module.exports=router