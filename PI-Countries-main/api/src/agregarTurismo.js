
const {Turismos}=require('./db.js');


const agregarTurismo= async(value)=>{
    try{
    await Turismos.create({
    name:value.name,
    dificultad:value.dificultad,  
    duracion:value.duracion,  
    temporada:value.temporada
    // }
    })
    console.log('turismos cargados')
   

    }
    catch(err){
        console.log(err)
    }
    }







module.export={agregarTurismo}