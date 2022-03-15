const {Router}=require('express');
const{Countries,Turismos}=require('../db.js');




const router=Router();



router.get('/',async (req,res,next)=>{
    const nombre=req.query.name
  
    if(nombre){
        try{
        const respuesta= await Countries.findAll({
            attributes:['name','id','continente','bandera','poblacion'],
            include :[
                {
                    model:Turismos,
                    attributes:['name','dificultad','duracion','temporada'],
                    through:{
                        attributes:[]}
                }
            ]
        });
     
        let respuestas=respuesta.filter(e=>e.name.toLowerCase().match(nombre.toLowerCase()));

        if(respuestas.length>0) return res.status(200).send(respuestas)


         return res.status(200).send([{name:'no hay coincidecias',id:'x',continente:'XXX',bandera:imagenDefault}])
        }catch(error){
            res.status(404).send('no..no..no :(')
        };
    };
    
    try{
      
    const respuesta=await Countries.findAll({
        
        attributes:['name','continente','bandera','id','poblacion'],
  
        include:[{
            model:Turismos,
            attributes:['name','dificultad','duracion','temporada'],
            through:{
                attributes:[]}
            }]
    })

    return res.status(200).send(respuesta);
    }catch(error){
        next
        return res.status(404).send('Unable to connect to the database:',error)};
    
})
router.get('/:id',async (req,res,next)=>{ 
    const {id}=req.params;
    try{
    const respuesta=await Countries.findAll(
       { include:[{
            model:Turismos,
            attributes:['id','name','dificultad','duracion','temporada'],
            through:{
                attributes:[]}
            }]}

    );
    let respuestas=respuesta.filter(e=>e.id===id.toUpperCase());
    if (respuestas.length>0) return res.status(200).send(respuestas);
    res.status(200).send({msg:'No hay coincidencias'});
    }catch(error){
        console.log(error)
    };
})






module.exports=router;