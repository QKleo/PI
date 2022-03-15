import axios from 'axios';
import { ordenBubble } from '../utiles/bubblesort';
export const OBTENER_TODOS_PAISES='OBTENER_TODOS_PAISES';
export const OBTENER_PAIS='OBTENER_PAIS'
export const OBTENER_PAIS_MATCH='OBTENER_PAIS_MATCH'
export const OBTENER_TODOS_TURISMOS='OBTENER_TODOS_TURISMOS'
export const OBTENER_TURISMO='OBTENER_TURISMO'
export const AGREGAR_TURISMO='AGREGAR_TURISMO'
export const VINCULAR_PAIS_TURISMO='VINCULAR_PAIS_TURISMO'
export const ORDENAR='ORDENAR'
export const ORDENAR_OBJETO='ORDENAR_OBJETO'
export const UNION='UNION'
export const LEER_RESPUESTA='LEER_RESPUESTA'
export const OBTENER_TURISMOS_MATCH='OBTENER_TURISMOS_MATCH'
export const OBTENER_PAIS_ID='OBTENER_PAIS_ID'
export const FILTRAR_POR_CONTINENTE='FILTRAR_POR_CONTINENTE'
export const FILTAR_ATRIBUTO_FRONT='FILTAR_ATRIBUTO_FRONT'
export const FILTAR_PAIS_TURISMO_ATRIBUTOID='FILTAR_PAIS_TURISMO_ATRIBUTOID'

const RUTA_COUNTRIES='http://localhost:3001/countries'

export function leerRespuesta(value,defecto='crearTurismos'){
    return async function pedido(dispatch){
        let respuesta=await axios.get(`http://localhost:3001/${defecto}/respuesta/${value}`)
        return dispatch({
            type:LEER_RESPUESTA,
            payload:respuesta.data
        })
    }
}

export function obtenerPaises(){
    return async function pedido(dispatch){
        let paises=await axios.get(RUTA_COUNTRIES)
        return dispatch({
            type:OBTENER_TODOS_PAISES,
            payload:paises.data,
        })
    }
}

export function obtenerPorMatch(name){
    return async function pedido(dispatch){
        let paises=await axios(`${RUTA_COUNTRIES}?name=${name}`)
        return dispatch({
            type:OBTENER_PAIS_MATCH,
            payload:paises.data,
        })
    }
}
//------------------------------------------------------------no la uso
export function ordenar(atributo,condicion){
   // atributo="name"
   // condicion="ASC"
    return async function pedido(dispatch){
        let paises=await axios(`http://localhost:3001/ordenarPaises?atributo=${atributo}&condicion=${condicion}`)
        return dispatch({
            type:ORDENAR,
            payload:paises.data,
        })
    }
}

export function ordenarObjeto(arrayObj,atributo,bandera){
    let aux=[]
    
    return function pedido(dispatch){
    
    aux=arrayObj.map(e=>{return e[atributo]})

    if(atributo==='poblacion'){
        aux=ordenBubble(aux)
    }else{   
    aux.sort()}
      

    let nuevo=[]
       
    while(aux.length>0){
         for (let el of arrayObj){
           
            if(el[atributo]===aux[0]){
              aux.shift()
              nuevo.push(el)
            }
        } 
      
    
    }
        if(!bandera){nuevo.reverse()} //orden invertido
      
        return dispatch({
            type:ORDENAR_OBJETO,
            payload:nuevo,
        }
        )
        
      }
    }   

export function crearTurismos(payload){
    return async()=>{
        try{
            await axios.post('http://localhost:3001/crearTurismos',payload)
          //  return union

        }catch(e){
            console.log(e)
        }
    }
}

export function obtenertodosTurismos(){
    return async (dispatch)=>{
        try{
           const respuesta=await axios.get('http://localhost:3001/turismos')     
            return dispatch({
                type:OBTENER_TODOS_TURISMOS,
                payload:respuesta.data
            })

  
        }catch(e){console.log(e)}
    }
}



export function obtenerPorMatchTurismo(name){
    return async function pedido(dispatch){
        let respuesta=await axios(`http://localhost:3001/turismos?name=${name}`)
        return dispatch({
            type:OBTENER_TURISMOS_MATCH,
            payload:respuesta.data,
        })
    }
}

export function vincularPaisTurismos(payload){
    return async ()=>{
        try{
        await axios.post('http://localhost:3001/vincularPaisTurismos',payload)
        }catch(e){
            console.log(e)
        }
    }

}

export function ObtenerPaisId(id){
    return async(dispatch)=>{
        let respuesta=await axios.get(`http://localhost:3001/countries/${id}`)
        return dispatch({
            type:OBTENER_PAIS_ID,
            payload:respuesta.data
        })


    }
}

export function filtrarPorContinente(arrayObj,atributo){
    
    return function pedido(dispatch){
        let aux=arrayObj.filter(e=>e.continente===atributo)
      
    return dispatch({
        type:FILTRAR_POR_CONTINENTE,
        payload:aux
    })
}
}

export function FiltarAtributoFront(arrayObj,atributo,value){
    return (dispatch)=>{
        let aux=arrayObj.filter(e=>e[atributo].toLowerCase().match(value.toLowerCase()))
        return dispatch({

            type:FILTAR_ATRIBUTO_FRONT,
            payload:aux
        })
    }
}
export  function filtrarPaisTurismoAtributo(value,arrayP){

    return async(dispatch)=>{
        let respuesta=await axios(`http://localhost:3001/paisesTurismos/${value}`)
        let aux=[]
        if(respuesta.data.length>0){
            for(let ele of respuesta.data){
                if(arrayP.length>0){
                    for(let pele of arrayP){
                        if(ele.id===pele.id){
                            aux.push(ele)
                        }
                    }
                }
            }
        }

       if(aux.length>0){

        return dispatch({

            type:FILTAR_PAIS_TURISMO_ATRIBUTOID,
            payload:aux
        })}
        else{
            return dispatch({
                type:FILTAR_PAIS_TURISMO_ATRIBUTOID,
                payload:[{
                    name:'no hay coicidencias',
                    id:'',
                    bandera:''
                }]
            })
        }
    }

}
