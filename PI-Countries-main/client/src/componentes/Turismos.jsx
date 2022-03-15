import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { obtenertodosTurismos } from "../redux/actions";
import SeleccionTurismos from "./SeleccionTurismos";
import SeleccionPais from "./SeleccionPais";
import { vincularPaisTurismos } from "../redux/actions";

export default function TodosTurismos(props){
    const arrayAux=[]
    const turismos=useSelector((state)=>state.turismos)
    const dispatch=useDispatch()
    const[listaTurismos,setlistaTurismos]=useState([])
    const[turismosAPais,setturismosAPais]=useState([])
    const[paisesAEnviar,setpaisesAEnviar]=useState()

    useEffect(()=>{dispatch(obtenertodosTurismos())},[turismos.length])

    function handleChange(e) {
        e.preventDefault(e)
       
        if(listaTurismos.includes(e.target.value)|| e.target.value==='blank'){
            setlistaTurismos(listaTurismos)}else{
            setlistaTurismos([
                e.target.value,...listaTurismos])

               
           
                
        
               
      
         }

         

    }

    function handleEnviar(e){
        e.preventDefault(e)
        dispatch(vincularPaisTurismos(turismosAPais))
    }
    function cancelarEnvio(e){
        e.preventDefault(e)
        setturismosAPais('')
        setpaisesAEnviar('')
    }

    return(
        <div>
            <select  size='5' name="selccionTurismos" id="xd"  onChange={(e)=>handleChange(e)}>
                <option  key='x' name='blank' value="blank">Seleccione</option>
            {turismos.map(element => {
                return <option name={element.name }  key={element.id} value={element.name}>{element.name}
                id:{element.id} temporada:{element.temporada}
                </option>
                
            })
            }    
                
            </select>
         
              <SeleccionPais listaPaises={setpaisesAEnviar} paises={props.paises} />
              <SeleccionTurismos listaTurismos={listaTurismos} setlistaTurismos={setlistaTurismos}/> 
            <div>
                {paisesAEnviar}
                <button onClick={()=>{setlistaTurismos('')}}>Limpiar seleccion Turismo</button>
                <button onClick={()=>{setturismosAPais([paisesAEnviar,...listaTurismos])}}> Vincular Pais-Turismos</button>
                <button onClick={(e)=>{cancelarEnvio(e)} }>Cancelar envio</button>
            </div>  
            <div>
                
                    <button onClick={(e)=>handleEnviar(e)}>Enviar Vinculo</button>    
            </div> 
           {turismosAPais.length}
           {turismosAPais[0]}
        </div>

    )
}