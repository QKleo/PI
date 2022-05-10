
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { obtenerTodos,obtenerTypes,obtenerTodosNamesDb } from "../redux/actions"
import './Landing.css'
export default function Landing(){
    const dispatch=useDispatch()

    function inicio(){
        dispatch(obtenerTodos())
        dispatch(obtenerTypes())
         dispatch(obtenerTodosNamesDb())
    }

    return(
        <div    className="fondolanding">

                <Link to='/pokemons'><button className='btn'onClick={()=>inicio()}>Inicio</button></Link>
        </div>
    )
}