import { OBTENER_TODOS_PAISES ,OBTENER_PAIS_MATCH, 
    ORDENAR, ORDENAR_OBJETO, UNION, LEER_RESPUESTA,
     OBTENER_TODOS_TURISMOS, OBTENER_TURISMOS_MATCH, 
     VINCULAR_PAIS_TURISMO, OBTENER_PAIS_ID,
     FILTRAR_POR_CONTINENTE,
     FILTAR_ATRIBUTO_FRONT,FILTAR_PAIS_TURISMO_ATRIBUTOID} from "./actions"



const initialState={
    paises:[],
    turismos:[],
    pais:[],
    respuesta:[]
}

export default function rootReducer(state=initialState,actions){
    switch(actions.type){
        case OBTENER_TODOS_PAISES:
            return{
                ...state,
                paises:actions.payload
            }
        case OBTENER_PAIS_MATCH:
            return{
                ...state,
                paises:actions.payload
            }
        case ORDENAR:
            return{
                ...state,
                paises:actions.payload
            }
        case ORDENAR_OBJETO:
            return{
                ...state,
                paises:actions.payload
            }
        case UNION:
            return{
                ...state
            }
        case LEER_RESPUESTA:
            return{
                ...state,
                respuesta:actions.payload
            }
        case OBTENER_TODOS_TURISMOS:
            return {
                ...state,
                turismos:actions.payload
            }
        case OBTENER_TURISMOS_MATCH:
            return{
                ...state,
                turismos:actions.payload

            }
        case VINCULAR_PAIS_TURISMO:
            return state
                
        case OBTENER_PAIS_ID:
            return {
                ...state,
                pais:actions.payload
            }           
        case FILTRAR_POR_CONTINENTE:
            return {
                ...state,
                paises:actions.payload
            }  
            
        case FILTAR_ATRIBUTO_FRONT:
            return {
                ...state,
                paises:actions.payload
            }
        case FILTAR_PAIS_TURISMO_ATRIBUTOID:
            return {
                ...state,
                paises:actions.payload
            }
            
        default:
            return state    
    }


}