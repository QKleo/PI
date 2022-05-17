import { ACTUALIZARDESPUESDECREAR, APIDB, ASIGNARPOKEMON, CREARPOKEMONS,
     FILTRARTIPO, LIMPIARAUXPOKEMONS, LIMPIARPOKEMONS, OBTENERPORID, 
     OBTENERTODOS, OBTENERTYPES, ODENARALFABETICAMENTE ,ORDENARALFABETICAMENTEAUX, 
     ORDENARNUMERO, ORDENARNUMEROAUX, REFRESCAR,OBTENERPORNOMBRE,NAMES, AGREGARAPROYECTO,
     LIMPIARRESPUESTA,LIMPIARPOKEMON,
     ACTUALIZARDESPUESDEELIMINAR,ACTUALIZARPOKEMON, TYPESPOSIBLES,LIMIARPOSIBLES,INVALIDA
} from "./actions"
const initialState={
    Allpokemons:[],
    Pokemons:[],
    Pokemon:{},
    auxPokemons:[],
    Types:[],
    Respuesta:[],
    Names:[],
    Posibles:[],
}



export default function rootReducer(state=initialState,actions){
        switch (actions.type){
        case OBTENERTODOS:
            return {
                ...state,
                Allpokemons:actions.payload,
                Pokemons:actions.payload,
            }  
        case ODENARALFABETICAMENTE:
            return {
                ...state,
                Pokemons:actions.payload,
                //auxPokemons:actions.payload


            }
        case ORDENARALFABETICAMENTEAUX:
            return{
                ...state,
                auxPokemons:actions.payload
            }
        case ORDENARNUMERO:
            return{
                ...state,
                Pokemons:actions.payload
            }
        case ORDENARNUMEROAUX:
            return{
                ...state,
                auxPokemons:actions.payload
            }
        case LIMPIARPOKEMONS:
            return {
                ...state,
                Pokemons:actions.payload
            }
        case LIMPIARAUXPOKEMONS:
            return{
                ...state,
                auxPokemons:actions.payload
            }
        case OBTENERTYPES:
            return {
                ...state,
                Types:actions.payload
            }
        case APIDB:
            return{
                ...state,
                auxPokemons:actions.payload
            }
        case REFRESCAR:
            return{
                ...state,
                Pokemons:actions.payload,
                auxPokemons:[]
            }
        case FILTRARTIPO:
            return{
                ...state,
                Pokemons:actions.payload,
                auxPokemons:actions.payload
            } 
        case CREARPOKEMONS:
           // console.log('respuesta')
            return{
                ...state,
                Respuesta:actions.payload
            }
        case LIMPIARRESPUESTA:
            return{
                ...state,
                Respuesta:actions.payload
            }
        case ACTUALIZARDESPUESDECREAR:
          //  console.log([...state.Allpokemons,...actions.payload])
            return{
                ...state,
                Allpokemons:[...state.Allpokemons,...actions.payload],
                Respuesta:['operacion exitosa']
            }
        case OBTENERPORID:
            return{
                ...state,
                Pokemon:actions.payload
            }
        case ASIGNARPOKEMON:
            return{
                ...state,
                Pokemon:actions.payload
            }
        case OBTENERPORNOMBRE:
           // console.log(actions.payload)
            return{
                ...state,
               // Allpokemons:actions.payload,
                auxPokemons:actions.payload,
                Pokemons:actions.payload
            }
        case NAMES:
            return{
                ...state,
                Names:actions.payload
            }
        case AGREGARAPROYECTO:
            return{
                ...state,
                Allpokemons:actions.payload
            }
        case ACTUALIZARDESPUESDEELIMINAR:
           // console.log(actions.payload)
            return{
                ...state,
                Allpokemons:actions.payload,
                Pokemons:actions.payload,
                auxPokemons:[],
                Pokemon:{},
                Respuesta:['Pokemon eliminado']
            }
        case LIMPIARPOKEMON:
            return{
                ...state,
                Pokemon:actions.payload
            }
        case ACTUALIZARPOKEMON:
          //  console.log('....actualizando')
          //  console.log(actions.payload)
            return{
                ...state,
                Allpokemons:actions.payload,
                Pokemon:[],
                auxPokemons:[],
                Pokemons:[],
                Respuesta:['valores actualizados...']
                
            }
        case TYPESPOSIBLES:
            return{
                ...state,
                Posibles:actions.payload
            }
        case LIMIARPOSIBLES:
            return{
                ...state,
                Posibles:actions.payload
            }
        case INVALIDA:
            return{
                ...state,
                Respuesta:actions.payload
            }
        default:
            return state
        }        
}   