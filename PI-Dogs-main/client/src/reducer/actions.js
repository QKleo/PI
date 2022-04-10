
import axios from 'axios';
import { ordenBubble } from '../utiles/bubblesort';



export const OBTENER_TODOS_DOGS='OBTENER_TODOS_DOGS';
export const OBTENER_DOG_ID='OBTENER_DOG_ID';
export const OBTENER_TODOS_TEMPERAMENST='OBTENER_TODOS_TEMPERAMENTS';
export const ENVIAR_FORMULARIO='ENVIAR_FORMULARIO';
export const OBTENER_DOGS_POR_MATCH='OBTENER_DOGS_POR_MATCH';
export const LIMPIAR_DOG='LIMPIAR_DOG';
export const ORDENAR='ORDENAR';
export const FILTRAR='FILTRAR';
export const ELIMINAR_DOGS_DB='ELIMINAR_DOGS_DB';
export const ACTUALIZAR_DOG='ACTUALIZAR_DOG';
export const LIMPIAR_DOGS='LIMPIAR_DOGS';
export const OBTENER_BREEDS_GROUP='OBTENER_BREEDS_GROUP';

export function obtenerTodosDogs(){
    return (dispatch)=>{

        axios.get('http://localhost:3001/dogs')

        .then((r)=>{return dispatch({
            type:OBTENER_TODOS_DOGS,
            payload:r.data

        })})
        .catch(e=>console.log(e));
         
    }
    
}

export function obtenerDogId(value){

        return (dispatch)=>{
            axios.get(`http://localhost:3001/dogs/${value}`)
            .then((r)=>{return dispatch({
                type:OBTENER_DOG_ID,
                payload:r.data
            })})
            .catch(e=>console.log(e));
        }



}

export function obtenerTodosTemperaments(){
    return (dispatch)=>{
        axios.get('http://localhost:3001/temperaments')
        .then((r)=>{ return dispatch({
            type:OBTENER_TODOS_TEMPERAMENST,
            payload:r.data
        })

        })
        .catch(e=>console.log(e));
    }
}

export function enviarFormulario(payload){
    return()=>{
        axios.post('http://localhost:3001/dogs',payload)
        .then(()=>{
            return 'form enviado'
                

            
        })
        .catch(err=>console.log(err));
    } 
}

export function obtenerDogsPorMatch(value,arraObj){
    let aux=[]
    return (dispatch)=>{
        aux=arraObj.filter((e)=>e.name.toLowerCase().match(value.toLowerCase()))


       return dispatch({
           type:OBTENER_DOGS_POR_MATCH,
           payload:aux,
       })
    }
}
export function limpiarDog(){
    return (dispatch)=>{
        dispatch({
        type:LIMPIAR_DOG,
        payload:'',
        })
    }
}
export function limpiarDogs(){
    return (dispatch)=>{
        dispatch({
            type:LIMPIAR_DOGS,
            payload:'',
        })
    }
}

export function ordenar(arraObj,atributo,bandera=true,posicion=1){
    let aux=[]
    let aux1=[]
    let aux2=[]
    let nuevo=[]
    return (dispatch)=>{
        aux=arraObj.map(e=>e[atributo])
        if(atributo==='name'){
            
            aux.sort()
     
            if(!bandera){
                aux.reverse()
            }
            while(aux.length>0){
               
                for(let element of arraObj){
                    if(element[atributo]===aux[0]){
                        aux.shift()
                        nuevo.push(element)
                    }
                }
            }
            
        }
        else if(atributo==='height'||atributo==='weight'||atributo==='life_span'){

            for(let elemnt of aux){
                let elemnts=''
              //  let elemnts=elemnt.split('-')
                if(atributo==='life_span'){
                     elemnts=elemnt.split('y')[0].split(' ')
                     
                     
                }else{ elemnts=elemnt.split('-')}
              
               aux1.push(elemnts[posicion]*1)
               // console.log(elemnts[2])
            }
            
           aux1= ordenBubble(aux1)
           
            if(!bandera){
                aux1.reverse()
               
            }
            while(aux1.length>0){
                
               
                for(let e of arraObj){
                  let arr=''
                    if(atributo==='life_span'){
                       
                       
                        
                        if(e[atributo].split('y')[0].split(' ')[posicion]*1===aux1[0] ){
                           
                          
                            aux1.shift()
                            
                            
                            nuevo.push(e)
                        }
                    }
                   
                    else if(e[atributo].split('-')[posicion]*1===aux1[0]){
                       
                        aux1.shift()
                        nuevo.push(e)
                     }
        
                }
            }
           
        
        }


      return dispatch({
            type:ORDENAR,
            payload:nuevo,
        })
    }
}
export function filtrar(arraObj,atributo,value=''){
    let nuevo=[]
    let nuevoF=[]
    let nuevoS=[]
    let nuevoEsp=[]
   // let nuevodb=[]
    return async (dispatch)=>{
        if(atributo==='temperaments'){
            if(value[0]===' '){
                 value=value.slice(1)}
        console.log(value)
        //nuevo=arraObj.filter(e=>Array.isArray(e[atributo])&&e[atributo].length>0&&e[atributo].match(`${value}`))
        nuevo=arraObj.filter(e=>e.createInDatabase===false)
        nuevo=nuevo.filter(e=>e.temperaments.length>0)
        
        nuevoS=nuevo.filter(e=>e.temperaments.includes(value))
        nuevoEsp=nuevo.filter(e=>e.temperaments.includes(' '+value))
      //  nuevodb=arraObj.filter(e=>e.createInDatabase===true)
       // nuevodb=nuevodb.filter(e=>e.temperaments.length>0)
      //  console.log(nuevoEsp,'con')
       // console.log(nuevoS,'sin')
         if(nuevoEsp.length>0){
             for(let e of nuevoEsp){
                 nuevoF.push(e)
             }
           }
        if(nuevoS.length>0){
            for(let e of nuevoS){
                nuevoF.push(e)
            }
        }
        // for(let i=0;nuevodb.length>i;i++){
        //     for(let j=0;nuevodb[i].temperaments.length>j;j++){
        //         if(nuevodb[i].temperaments[j].name===value || nuevodb[i].temperaments[j].name===' '+value){
        //             nuevoF.push(nuevodb[i])
        //         }}}
        
        let resp1= await axios.get('http://localhost:3001/dogs/temperaments/'+value)
        let resp2= await axios.get('http://localhost:3001/dogs/temperaments/'+' '+value)
          
            
            for(let e of resp1.data){
                nuevoF.push(e)
                
            }
            for(let e of resp2.data){
                nuevoF.push(e)
            }
        
        
        nuevo=nuevoF
        }
        else if(atributo==='breed_group'){
            nuevo=arraObj.filter(e=>e[atributo]===value)
            let respDb=await axios.get('http://localhost:3001/breedsGroup')
             respDb=respDb.data.filter(e=>e.name===value)
            for(let e of respDb[0].dogs){
            nuevo.push(e)
            }
           // console.log(respDb)
        }
        
        else{
        nuevo=arraObj.filter(e=>e[atributo]===value)
        }    



        return dispatch({
            type:FILTRAR,
            payload:nuevo
        })
    }
}

export function eliminarDogsDb(value){
    return ()=>{

        axios.delete(`http://localhost:3001/dogs/${value}`)
        .then(()=>{
        return console.log('eliminando')
        })
        .catch(err=>console.log(err));
    }
}

export function actualizarDog(value,payload){
    return ()=>{
        axios.put(`http://localhost:3001/dogs/${value}`,payload)
        .then(()=>{
        return console.log('actualizado')})
        .catch(err=>console.log(err));
    }
}

export function breedsGroup(){
    return (dispatch)=>{
        axios.get('http://localhost:3001/breedsGroup')
        .then((r)=>{
            return dispatch({
                type:OBTENER_BREEDS_GROUP,
                payload:r.data
            })
        })
       
    }
}

export function enviarBreedGroups(payload){
    return()=>{
        axios.post('http://localhost:3001/breedsGroup',payload)
        .then(()=>{
            return 'asociando'
                

            
        })
        .catch(err=>console.log(err));
    } 
}


