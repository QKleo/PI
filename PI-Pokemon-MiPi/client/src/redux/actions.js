import axios from 'axios';
import { ordenarBublee } from '../utiles/ordenarNumeros';

export const ODENARALFABETICAMENTE='ODENARALFABETICAMENTE'
export const OBTENERTODOS='OBTENERTODOS'
export const LIMPIARPOKEMONS='LIMPIARPOKEMONS'
export const LIMPIARAUXPOKEMONS='LIMPIARAUXPOKEMONS'
export const OBTENERTYPES='OBTENERTYPES'
export const APIDB='APIDB'
export const ORDENARALFABETICAMENTEAUX='ORDENARALFABETICAMENTEAUX'
export const REFRESCAR='REFRESCAR'
export const FILTRARTIPO='FILTRARTIPO'
export const CREARPOKEMONS='CREARPOKEMONS'
export const ACTUALIZARDESPUESDECREAR='ACTUALIZARDESPUESDECREAR'
export const OBTENERPORID='OBTENERPORID'
export const ASIGNARPOKEMON='ASIGNARPOKEMON'
export const ORDENARNUMERO='ORDENARNUMERO'
export const ORDENARNUMEROAUX='ORDENARNUMEROAUX'
export const OBTENERPORNOMBRE='OBTENERPORNOMBRE'
export const NAMES='NAMES'
export const AGREGARAPROYECTO='AGREGARAPROYECTO'
export const LIMPIARRESPUESTA='LIMPIARRESPUESTA'
export const ELIMINARPOKEMONDB='ELIMINARPOKEMONDB'
export const ACTUALIZARDESPUESDEELIMINAR='ACTUALIZARDESPUESDEELIMINAR'
export const ACTUALIZARPOKEMON='ACTUALIZARPOKEMON'
export const LIMPIARPOKEMON='LIMPIARPOKEMON'
export const TYPESPOSIBLES='TYPESPOSIBLES'
export const LIMIARPOSIBLES='LIMIARPOSIBLES'
export const INVALIDA="INVALIDA"

export function obtenerTodos(arrObj=[],value){
   // console.log('estoy')
    if(arrObj.length>0 && value){
      //  console.log('paso')
       // let aux=[]
        return (dispatch)=>{
           let aux=arrObj.filter((e)=>e.name.toLowerCase().match(value.toLowerCase()))
          //  console.log(aux)
            if(aux.length>0){
                return dispatch({
                    type:OBTENERPORNOMBRE,
                    payload:aux,
                })
            }else{
            axios.get(`http://localhost:3001/pokemons?name=${value}`)
            .then((r)=>{
                //let noEstoy={noEstoy:true}
                let resp=r.data
                 resp={...resp,noEstoy:true}
                return dispatch({
                    type:OBTENERPORNOMBRE,
                    payload:[resp]
                }) 

            })

            }
        }
    }else{
    return (dispatch)=>{
        axios.get('http://localhost:3001/pokemons')
        .then((r)=>{
            return dispatch({
                type:OBTENERTODOS,
                payload:r.data
            })
        })
        .catch((err)=>console.log(err))
    }}
}
export function ordenarAlfabeticamente(arrObj,arrObjaux,atributo,asc=false){
    let aux=[]
    let estado=[]
   // let obj=[]
    return (dispatch)=>{
        if(arrObjaux.length>0){arrObj=arrObjaux}
        if(arrObj.length>0){
        aux=arrObj.map(e=>{return e[atributo]})
        
        let nuevo=aux.sort()
      //  console.log(nuevo)
        if(asc){
            nuevo=nuevo.reverse()

        }
        while(nuevo.length>0){
            for(let e of arrObj){
                if(e[atributo]===nuevo[0]){
                    estado.push(e)
                    nuevo.shift()
                }
            }
        }

        if(arrObjaux.length>0){
            return dispatch({
                type:ORDENARALFABETICAMENTEAUX,
                payload:estado
            })
        }
        return dispatch({
            type:ODENARALFABETICAMENTE,
            payload:estado
        })
    }}
}

export function limpiarPokemons(){
    return(dispatch)=>{
       return dispatch({
           type:LIMPIARPOKEMONS,
           payload:[]
       })
    }
}

export function limpiarAuxPokemons(){
    return(dispatch)=>{
       return dispatch({
           type:LIMPIARAUXPOKEMONS,
           payload:[]
       })
    }
}

export function obtenerTypes(){
    return(dispatch)=>{
        axios.get('http://localhost:3001/types')
        .then((r)=>{
            return dispatch({
                type:OBTENERTYPES,
                payload:r.data
            })
        })
        .catch((err)=>console.log(err))
    }
}

export function apiDb(arrObj,value){
    return(dispatch)=>{
        let nuevo=arrObj.filter(e=>e.createInDatabase===value)
        if(nuevo.length===0){nuevo=[{name:'no hay match',id:'xx',image:''}]}
        return dispatch({
            type:APIDB,
            payload:nuevo
        })
    }
}
export function refrescar(All){
    return(dispatch)=>{

        return dispatch({
            type:REFRESCAR,
            payload:All
            
        })
    }
}
export function filtrarTipo(arrObj,value){
    let nuevo=[]
    let aux=[]
    return(dispatch)=>{
        nuevo=arrObj.filter(e=>e.types.length>0)
        nuevo.filter(e=>e.types.forEach(i=>{if(i.name===value){aux.push(e)}}))
        if(aux.length===0){aux=[{name:'no hay match',id:'xx',image:''}]} 
   
        return dispatch({
            type:FILTRARTIPO,
            payload:aux
        })
    }
}

export function CrearPkemons(value){
   
    return(dispatch)=>{
       // console.log('estoy enviando')
        axios.post('http://localhost:3001/pokemons',value)
        .then(()=>{return [`creando...${value.name}..espere`]})
        .then((r)=>{
           // console.log('kk')
            dispatch({
                type:CREARPOKEMONS,
                payload:r
            })
        })
        
        .catch((err)=>console.log(err));
    } 
}

export function limpiarRespuesta(){
    return(dispatch)=>{
        return dispatch({
            type:LIMPIARRESPUESTA,
            payload:'' 
        })
    }
}

export function actualizarDespuesDeCrear(value){
    return(dispatch)=>{
        axios.get(`http://localhost:3001/pokemons?name=${value}`)
        .then((r)=>{
            
            return dispatch({
            type:ACTUALIZARDESPUESDECREAR,
            payload:r.data
            })
        })
        .catch((err)=>console.log(err))
    }
}

export function obtenerPorId(value){
    return(dispatch)=>{
        axios.get(`http://localhost:3001/pokemons/${value}`)
        .then((r)=>{
            return dispatch({
            type:OBTENERPORID,
            payload:r.data,
            })
        })
        .catch((err)=>console.log(err))
    }
}
export function asignarPokemon(value){
    return (dispatch)=>{

        return dispatch({
            type:ASIGNARPOKEMON,
            payload:value
        })
    }
}
export function ordenarNumero(arrObj,arrObjaux,atributo,asc=false){
    return(dispatch)=>{
        let aux=[]
        let nuevo=[]
        let estado=[]
        if(arrObjaux.length>0){arrObj=arrObjaux}
        aux=arrObj.map(e=>{return e[atributo]})
        nuevo=ordenarBublee(aux)
        if(asc){
            nuevo.reverse()
        }
        while(nuevo.length>0){
            for(let e of arrObj){
                if(e[atributo]===nuevo[0]){
                    estado.push(e)
                    nuevo.shift()
                }
            }
        }
        if(arrObjaux.length>0){
        return dispatch({
            type:ORDENARNUMEROAUX,
            payload:estado
        })
        }
        return dispatch({
            type:ORDENARNUMERO,
            payload:estado
        })
    }
}

export function obtenerTodosNamesDb(){
    return(dispatch)=>{
        axios.get('http://localhost:3001/pokemon')
        .then((r)=>{

             return dispatch({
                type:NAMES,
                payload:r.data
            })
        })
        .catch((err)=>console.log(err))
    }
}
export function agregarAProyecto(arrObj,pokemon){
    return(dispatch)=>{
        
        pokemon.noEstoy=false
        let nuevo=[...arrObj,pokemon]
        return dispatch({
            type:AGREGARAPROYECTO,
            payload:nuevo
        })
    }

}
export function eliminarPokemonDb(value){
    let resp=''
    return(dispatch)=>{
    axios.delete(`http://localhost:3001/pokemons/${value}`)
    .then(()=>{
        return dispatch({
            type:ELIMINARPOKEMONDB,
            payload:resp
        })
    })
    .catch((err)=>console.log(err))
    }
}
export function actualizarDespuesDeEliminar(arrObj){
    
    
    return async(dispatch)=>{
        try{
        let api=arrObj.filter(e=>e.createInDatabase===false)
        let bd=await axios.get('http://localhost:3001/pokemonsdb')
        bd=bd.data
       // console.log(api)
       // console.log(bd)
       // console.log([...api,...bd])
        return dispatch({
            type:ACTUALIZARDESPUESDEELIMINAR,
            payload:[...api,...bd]
        })
        }catch(err){console.log(err)}
    }
}  


export function actualizarPokemon(arrObj,id,payload){
   
    return (dispatch)=>{
        let api=arrObj.filter(e=>e.createInDatabase===false)
        axios.put(`http://localhost:3001/pokemons/${id}`,payload)
        .then(()=>{
            axios.get('http://localhost:3001/pokemonsdb')
            .then((r)=>{return r.data})
            .then((r)=>{
              //  console.log('cambios....')
                return dispatch({
                type:ACTUALIZARPOKEMON,
                payload:[...api,...r]
                })
            })
            .catch((err)=>console.log(err))
        })
        .catch((err)=>console.log(err))
    }
}

export function limpiarPokemon(){
    return(dispatch)=>{
        return dispatch({
            type:LIMPIARPOKEMON,
            payload:''
        })
    }
}
export function typesPosibles(value){

    return (dispatch)=>{
        if(value){
        axios.get(`http://localhost:3001/types/${value}`)
        .then((datos)=>{

        return dispatch({
            type:TYPESPOSIBLES,
            payload:datos.data
            })
        })
        .catch((err)=>console.log(err))}
    }

}
export function limpiarPosibles(){
    return (dispatch)=>{
        return dispatch({
            type:LIMIARPOSIBLES,
            payload:''
        })
    }
}
export function invalida(){
    return(disptach)=>{
        return disptach({
            type:INVALIDA,
            payload:['operacion invalida']
        })
    }
}





