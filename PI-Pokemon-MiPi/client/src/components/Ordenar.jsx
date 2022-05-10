import { limpiarAuxPokemons, limpiarPokemons, ordenarAlfabeticamente } from "../redux/actions"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { ordenarNumero } from "../redux/actions"

export default function Ordenar(props){
    
   
    const dispatch=useDispatch()

   
    
    return(
        <div>
            <div>
                <button className='btn'onClick={()=>{dispatch(ordenarAlfabeticamente
                (props.arrObj,props.arrObjaux,'name'))
            }} >A-z</button>
                    <button className='btn'onClick={()=>{dispatch(ordenarAlfabeticamente
                (props.arrObj,props.arrObjaux,'name',true))
            }} >Z-a</button>
                <button className='btn'onClick={()=>dispatch(ordenarNumero
                    (props.arrObj,props.arrObjaux,'hp',true))}>Max-hp</button>
                <button className='btn'onClick={()=>dispatch(ordenarNumero
                    (props.arrObj,props.arrObjaux,'hp'))}>Min-hp</button>
            </div>
        </div>

    )
}