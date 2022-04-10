
import{Link}from'react-router-dom'
import { obtenerTodosDogs } from '../reducer/actions'
import { useDispatch } from 'react-redux'
import imagen from '../../src/imagesperro.png';
import fondo from '../../src/imageshuellitas.png';
import './Home.css'
export default function Landing(){
    const dispatch=useDispatch()

    return(
        <div className='fondolandig'>
            
            
            <Link to='/dogs'><button className='btn'onClick={()=>dispatch(obtenerTodosDogs())}>  <img src={imagen} alt="" /></button></Link>
        
        
        </div>
    )
}