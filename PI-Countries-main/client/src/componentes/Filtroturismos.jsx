

import { useEffect } from "react";
import { Dispatch } from "react";
import { useState } from "react";
import TodosTurismos from "./Turismos";
import { filtrarPaisTurismoAtributo, obtenertodosTurismos, ordenarObjeto } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import './Filtroturismos.css'

export default function FiltroPorTurismos(){
    const dispatch=useDispatch()
    const turismos=useSelector(state=>state.turismos)
    const todoslospaises=useSelector(state=>state.paises)

    const [selectTurismos,setselectTurismos]=useState('')
    
    
    const[seleccionTurismo,setseleccionTurismo]=useState()
    
    let aux={}
    

    useEffect(()=>{dispatch(obtenertodosTurismos())},[turismos.length])
   
    function handleonclick(e){
        e.preventDefault(e)

        if(seleccionTurismo){
        dispatch(filtrarPaisTurismoAtributo(seleccionTurismo,todoslospaises))}
        setseleccionTurismo('')
    }
   


    function handleonchange(e){
        e.preventDefault(e)
        if(e.target.value!=='blank'){
        setseleccionTurismo(e.target.value)
        setselectTurismos('')
        }    
    }

    return (
        <div className="vista">
         <label>Turismos :</label>
           <select className='boxDesplegable' value={selectTurismos} name=''id="" onChange={(e)=>{handleonchange(e)}}>
                <option className='vista' value="blank">seleccione</option>
           {turismos.length>0&&turismos.map(element =>{

                aux[element.id]=element.name
                return <option className="vista" key={element.id} value={element.id}>
                {element.name} Temporada:{element.temporada}
                
           
               
                </option>
                
                
            })
            }    
            </select>
            <button className="boxDesplegable" onClick={(e)=>{handleonclick(e)}}>Filtrar Pais</button>
            <br></br>
            <label style={{textAlign:'end' ,margin:'10px'}}>{aux[seleccionTurismo]}</label>
        </div>
    )
}