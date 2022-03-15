import { useState } from "react";
import { useSelector } from "react-redux";




export default function SeleccionPais(props){

    const todosLosPaises=useSelector((state)=>state.paises)
  //  const [paisesSelect,setpaisesSelect]=useState(todosLosPaises)
    const [valida,setvalida]=useState(false)
    const[select,setselect]=useState()

    function handleOnChange(e){
        e.preventDefault(e)
       if(e.target.value!=='blank' && !valida){
        setselect(e.target.value)
        
        setvalida(true)}
        

    }
    function handleOnClick(e){
        e.preventDefault(e)
        
        setvalida(false)
        setselect('')
    }

    return(
        <div>
        <select size='6'name="paisesSelect" id="paisesSelect" onChange={(e)=>handleOnChange(e)}>
            <option value="blank" key='blank' name='blank'>Seleccionar</option>
            {todosLosPaises.map(p=>
            {return   <option name={p.name} value={p.name} key={p.name}>{p.name} id:{p.id}
            
            
            
            </option>})}
        
        
        
        
      
        
        </select>
        <div>
            {select}
            <button onClick={()=>props.listaPaises(select)}>enviar</button>
            <button onClick={(e)=>handleOnClick(e)}>Limpiar Seleccion Pais</button>
        </div>    
        </div>
    )
}