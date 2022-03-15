import { obtenerPorMatch } from "../redux/actions"
import { useState } from "react"
import { useDispatch } from "react-redux"

export default function Buscando(){
    const dispatch=useDispatch()
    const[Buscar,setBuscar]=useState("")
   
    function handleInputChange(e){
        
        e.preventDefault()
        setBuscar(e.target.value)
        
    }
    

    function handleOnClick(e){
        
        e.preventDefault()
        dispatch(obtenerPorMatch(Buscar))
        setBuscar("")
       
    }

    

    return(
        <div>
            voy a buscar algo
            <input className='inputs'value={Buscar} type='text' placeholder="Nombre"
            onChange={(e)=>handleInputChange(e)}/>
            


            <button className="btn" type='submit' onClick={(e)=>handleOnClick(e)} >Buscar/Reset</button>
           
        </div>
    )
}