import { Link } from "react-router-dom"
import Card from './Card.jsx'
import { limpiarAuxPokemons,limpiarPokemons,refrescar } from "../redux/actions.js"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { limpiarPokemon } from "../redux/actions.js"
export default function Detail(){
    const All=useSelector(state=>state.Allpokemons)
    useEffect(()=>dispatch(refrescar(All)),[All.length])
    //,()=>{return dispatch(limpiarAuxPokemons())}
    const dispatch=useDispatch()

    return(
        <div>
            <div>
                  <Link to='/pokemons'><button onClick={()=>dispatch(limpiarPokemon())}>volver</button></Link>   
            </div>
            <div>
                  <Card/>  
            
            </div>
        
        
        </div>
    )
}