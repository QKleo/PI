import { Link } from "react-router-dom"
import Card from './Card.jsx'
import { limpiarRespuesta,obtenerTodosNamesDb,refrescar } from "../redux/actions.js"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { limpiarPokemon } from "../redux/actions.js"
export default function Detail(){
    const All=useSelector(state=>state.Allpokemons)
    const Respuesta=useSelector(state=>state.Respuesta)
    useEffect(()=>dispatch(refrescar(All)),[All.length])
    useEffect(()=>dispatch(obtenerTodosNamesDb(),[All.length]))
    
    const dispatch=useDispatch()
    console.log(Respuesta,'algo')
    return(
        <div>
            <div>
                  <Link to='/pokemons'><button onClick={()=>{dispatch(limpiarPokemon());
                    dispatch(limpiarRespuesta())}}
                  
                    >volver</button>
                  </Link>   
            </div>
            <div>
                  <Card/>  
                {Respuesta.length>0&&<h4 style={{color:'white'}}>{Respuesta[0]}</h4>}
            </div>
        
        
        </div>
    )
}