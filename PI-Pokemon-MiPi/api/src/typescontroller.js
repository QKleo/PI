const axios=require('axios');
const {Types,Nombres}=require('./db.js')


function obtenerTypes(){
    
    axios.get('https://pokeapi.co/api/v2/type')
    .then((r)=>{r.data.results.map(e=>
        Types.create({
            name:e.name,
            id:e.url.split('/')[6]
        })
        )
     
    console.log('Datos en Bd')    
    })
    .catch((err)=>console.log(err))  
}
function cargarNombres(){
    axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=1126')
    .then((r)=>{r.data.results.map(e=>
        Nombres.create({
            name:e.name,
            id:e.url.split('/')[6]
        })
        )
       
    console.log('Nombres en Bd')    
    })
    .catch((err)=>console.log(err)) 
}




module.exports={obtenerTypes,cargarNombres}