
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { leerRespuesta } from "../redux/actions";
import { useDispatch } from "react-redux";
import './Forms.css'

export default function Respuestas(props){
    
   const dispatch=useDispatch()
   const[res,setres]=useState('')
   // useEffect(dispatch(leerRespuesta()),[dispatch])
   //dispatch(leerRespuesta())
   const respuestasState=useSelector((state)=>state.respuesta)
   let respuesta=respuestasState
   let ajusteEspacios=props.ruta
   ajusteEspacios=ajusteEspacios.split(' ').join('')
    let respuestaVinculos=props.rutavincular.split(' ').join('')
    


    function handleOnClickV(e){
        e.preventDefault(e)
        dispatch(leerRespuesta(respuestaVinculos,'vincularPaisTurismos'))
        setres(respuesta.msg)
        setTimeout(()=>{setres('')},2000)
            
        
    }
    function handleOnClickT(e){
        e.preventDefault(e)
        dispatch(leerRespuesta(ajusteEspacios))
        setres(respuesta.msg)
        setTimeout(()=>{setres('')},2000)
            
        
    }
    
    return  ( 
        <div>
            oooo
            <button className="btn"disabled={props.control} onClick={(e)=>{handleOnClickT(e)}}>turismo creado</button>
            
            <button className="btn"onClick={(e)=>{handleOnClickV(e)}}>mensajes back end</button>
            {res}
           
        </div>
    )

}