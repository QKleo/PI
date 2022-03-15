const axios=require('axios');
const {Countries,Turismos} =require('./db.js')
const All='https://restcountries.com/v3/all'

const Deportes=require('./turismoCreados')


let llamada=async()=>{
    try{
        
        let respuesta= await axios(All)
        respuesta.data.forEach(element => {
       
        let ciudad=element.capital
        if(ciudad){
            if(Array.isArray(ciudad)){
                ciudad=ciudad.join(' ')
            }

        }else{
            ciudad='Desconocido'
        }
        Countries.create({
            id:element.cca3,
            name:element.name.common,
            bandera :element.flags[1],
                     
            continente:element.continents[0],
           
                           
            capital:ciudad,
            subregion:element.subregion,
            area:element.area,
            poblacion:element.population,
        
            
        })
           // console.log(element.area ,element.name.common,element.population,element.subregion)
        });
        console.log('Datos subidos a bd :)')
        
    }catch(error){console.log(error)}
   
};


const crearTurismos= ()=>{
    try{
      Deportes.forEach(ele=>{

            Turismos.create({
            name:ele.name,
            dificultad:ele.dificultad,  
            duracion:ele.duracion,  
            temporada:ele.temporada
            // }
            })

        
      })
        


    
    console.log('turismos cargados')
   

    }
    catch(err){
        console.log(err)
    }
    }

    


module.exports= {
    llamada,
    crearTurismos}
