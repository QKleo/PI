
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ordenarObjeto } from "../redux/actions";
import './Ordenamiento.css'

export default function Ordenamiento(){
       const dispatch=useDispatch()
       const estado=useSelector((state)=>state.paises) 

return(
    <div >
        <button className='btn' onClick={()=>dispatch(ordenarObjeto(estado,'name'))}>Orden Z-A </button>
        <button className='btn'onClick={()=>dispatch(ordenarObjeto(estado,'name',true))}>Orden A-Z </button>
        <button className='btn'onClick={()=>dispatch(ordenarObjeto(estado,'poblacion'))}>Orden Max-Min</button>
        <button className='btn'onClick={()=>dispatch(ordenarObjeto(estado,'poblacion',true))}>Orden Min-Max</button>
    </div>
)

}