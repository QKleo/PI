

import { OBTENER_TODOS_DOGS,OBTENER_DOG_ID, OBTENER_TODOS_TEMPERAMENST,
    ENVIAR_FORMULARIO,OBTENER_DOGS_POR_MATCH, LIMPIAR_DOG, ORDENAR, FILTRAR, 
    ELIMINAR_DOGS_DB, ACTUALIZAR_DOG, LIMPIAR_DOGS,OBTENER_BREEDS_GROUP } from "./actions";


const initialSate={
    Dogs:[],
    Dog:[],
    Temperaments:[],
    BreedsGroup:[]
}


export default function rootReducer(state=initialSate,actions){

    switch (actions.type){
        case OBTENER_TODOS_DOGS:
            return{
                ...state,
                Dogs:actions.payload
            }

        case OBTENER_DOG_ID:
            return{
                ...state,
                Dog:actions.payload
            }

        case OBTENER_TODOS_TEMPERAMENST:
            return{
                ...state,
                Temperaments:actions.payload
            }
        case ENVIAR_FORMULARIO:
            return{
                state,
            }
        case OBTENER_DOGS_POR_MATCH:
            return{
                ...state,
                Dogs:actions.payload
            }
        case LIMPIAR_DOG:
            return{
                ...state,
                Dog:actions.payload
            }
        case LIMPIAR_DOGS:
            return{
                ...state,
                Dogs:actions.payload
            }

        case ORDENAR:
            return{
                ...state,
                Dogs:actions.payload
            }
        case FILTRAR:
            return{
                ...state,
                Dogs:actions.payload
            }
        case ELIMINAR_DOGS_DB:
            return{
                state,
            }
        case ACTUALIZAR_DOG:
            return{
                state,
            }
        case OBTENER_BREEDS_GROUP:
            return{
                ...state,
                BreedsGroup:actions.payload
            }

        default:
            return state
    }
}