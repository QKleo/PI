
const axios=require('axios');
const {Temperaments,Breed_groups}=require('./db.js');
//const Temperaments = require('./models/Temperaments.js');

const breedsRoute='https://api.thedogapi.com/v1/breeds'

//https://api.thedogapi.com/v1/breeds


let llamarBreeds=()=>{
     let str=''   
     let aux=[]
     let auxBreeds=['Desconocido']    
     let respuesta=axios(breedsRoute)

     .then((r)=>{  r.data.forEach(e=>{

        if(e.temperament!==null&&e.temperament!==undefined){
            str=str+e.temperament+','
           
     
            };
        if(e.breed_group!==undefined){    
            auxBreeds.push(e.breed_group)
            }
        });
        aux=str.split(',')
        
        const naux=new Set(aux)
        aux=Array.from(naux)
        const nauxBreedsGroup=new Set(auxBreeds)
        auxBreeds=Array.from(nauxBreedsGroup)
        
        aux.forEach(e=>{
            Temperaments.create({
                name:e
                 });


        })
        auxBreeds.forEach(e=>{
            Breed_groups.create({
                name:e
            })
        })







        console.log('temperamento en baseD');
        console.log('grupos en baseD')
    })
       

    .catch((e)=>{
        console.log(e);
    });
  
};



module.exports={llamarBreeds}