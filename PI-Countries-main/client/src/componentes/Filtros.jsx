import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { FiltarAtributoFront, filtrarPorContinente, obtenerPaises } from "../redux/actions"
import './Filtros.css'

export default function FiltrosContinentes(props){
    const[selectedestado,setselectedestado]=useState('blank')
    const [opcion,setopcion]=useState('')
   // useEffect(()=>{dispatch(obtenerPaises())},[opcion])
    
   
    const dispatch=useDispatch()
    const [validaClick,setvalidaClick]=useState(true)
    const [match,setmatch]=useState('')
    
    
    function handleOnchange(e){
        e.preventDefault(e)
        setopcion(e.target.value)
        if(e.target.value!=='blank'){
            
             setvalidaClick(false)
            }

       
    }

    function onClick(e){
         e.preventDefault(e)
        if(props.todos.length>0 && opcion!=='blank'){
            dispatch(filtrarPorContinente(props.todos,opcion))
            setvalidaClick(true)
            setmatch('')
            
            
            }
    }
    function handleOnChangeMatch(e){
        e.preventDefault(e)
        setmatch(e.target.value)

    }
    function handleOnClickMatch(e){
        e.preventDefault(e)
        if(match.length>0){
           dispatch(FiltarAtributoFront(props.todos,'name',match))
           setmatch('')
        }
    }

    
   // let aux=props.todos.filter(e=>e.continente===atributo)

    return (
        <div style={{margin:'20px'}}>
            
           

            <input className="inputs" type="text" value={match} placeholder="Matchear nombre" onChange={(e)=>{handleOnChangeMatch(e)}}/>
           
            <button className="btn" onClick={(e)=>{handleOnClickMatch(e)}}>Match</button>
           
            <button className="btn" disabled={validaClick} onClick={(e)=>{onClick(e)}}>Filtrar por:</button>
           
           <select className="inputs" name="seleccion" id="seleccionFiltro" onChange={(e)=>{handleOnchange(e)}
           }  onFocus={(e)=>{e.target.value="blank"}}  >
            <option value="blank" >Seleccione</option>
            <option value="Asia">Asia</option>
            <option value="Africa">Africa</option>
            <option value="Oceania">Oceania</option>   
            <option value="South America">South America</option>   
            <option value="Antarctica">Antarctica</option>   
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
            <option value="North America">North America</option>
            


            </select>
        </div>
    )
}