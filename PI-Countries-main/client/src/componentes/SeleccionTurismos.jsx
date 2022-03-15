
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { vincularPaisTurismos } from "../redux/actions"


export default function SeleccionTurismos(props){
    const dispatch=useDispatch()
  
    function handleEnviar(e){
        e.preventDefault(e)
      //  dispatch(vincularPaisTurismos(props.lista))
    }
    
   

    return(
        <div>
           
            <button onClick={()=>props.setlistaTurismos(()=>props.listaTurismos.slice(1))}>Eliminar Turismo</button>
           
        </div>
    )
}