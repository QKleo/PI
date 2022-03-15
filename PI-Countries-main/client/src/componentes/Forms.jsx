import { useState } from "react"
import { Link } from "react-router-dom"
import {useDispatch}from "react-redux"
import { crearTurismos, obtenertodosTurismos} from "../redux/actions"
import { validar } from "../utiles/validarString"
import {validarNumero} from "../utiles/validarnumero"
import { useEffect } from "react"
import { useSelector } from "react-redux" 
import Respuestas from "./Respuestas"
import TodosTurismos from "./Turismos"
import { vincularPaisTurismos } from "../redux/actions"
import './Forms.css'

export default function Forms(){
    let n=0
    const respuesta=useSelector((state)=>state.respuesta)
    const todosLosPaises=useSelector((state)=>state.paises)
    const turismos=useSelector(state=>state.turismos)
    const dispatch=useDispatch()
    //const estadotodoslosturismos=useSelector(state=>state.turismos)

    useEffect(()=>{dispatch(obtenertodosTurismos())},[respuesta])
    const [formsEnviar,setformsEnviar]=useState([])
    const[forms,setforms]=useState(
        {
            name:'',
            dificultad:'',
            duracion:'',
            temporada:'',
            paises:[],
            actividad:[]
        }
    )
    const[control,setcontrol]=useState(true)
   
    const aux=[]
  //-----------------------------------------------------------------------------  
    function handleInputChange(e){
        e.preventDefault()
        if(e.target.value!=='blank'){

        const {name,value}=e.target
        if(name!=='paises' && name!=='actividad'){
        setforms({...forms,[name]:value})
    }else{
        setforms({...forms,[name]:[value,...forms[name]]})
        
    }
    
    }}
   
//-------------------------------------------------------------------------------
    function  handleInputOnClick(o){
        o.preventDefault()
        dispatch(crearTurismos(forms))
        dispatch(obtenertodosTurismos())
       n++
        
 //------------------------------------------------------------------------------       
    }
    function handleCheck(e){

     e.preventDefault(e) 

     if(validarNumero(forms.duracion)&&validar(forms.name)&&forms.name.length<20&&
     forms.temporada.length>1&&forms.dificultad!==''&&forms.name.split(' ').join('')!==''){
        setcontrol(false)
        
     }
     
     else{
         
         setcontrol(true)}
        
    
    }

  //---------------------------------------------------------------------------------      
   
   //-------------------------------------------------------------------------------- 
     function handleLimpiesa(){
         setforms({name:'',dificultad:'',duracion:'',temporada:'',paises:[],actividad:[]})
         setcontrol(true)
     }   

    function vinculoOnClick(e){
        e.preventDefault(e)
        dispatch(vincularPaisTurismos([forms.paises,forms.actividad]))
        
    }

    function selctPaisEnviar(e){
        setformsEnviar([forms.paises,forms.name])
    }
  //----------------------------------------------------------------------------------  
    function nose(e){
        e.preventDefault(e)
        console.log('kk')
    }


    return(
        <div>
            <div className="controlVista">
                <span>{control&&'False'}{!control&&'True'}</span>
            </div>

            <Link to='/countries'><button className="btnSup" onClick={()=>{setforms({name:'',dificultad:'',duracion:'',temporada:'',paises:[],actividad:[]})}}>volver</button></Link>
            <button className="btnSup"onClick={ ()=>{handleLimpiesa()}}
            
            
            >  Limpiar</button>
            <div>
          
                  <br />
                    <form   action="http://localhost:3001/crearTurismos" autoComplete="off"  method="post">
                           
                    <button className="btn" onClick={(e)=>handleCheck(e)}>Validar envio {control}</button>

                    <button className="btn"onClick={(o)=>{handleInputOnClick(o)}} disabled={control}>Crear Turismo</button>

                        <label className="inputselect"htmlFor="">Nombre</label>
                        
                        <input  className="inputselect"name='name' disabled={!control} value={forms.name}
                         onChange={(e)=>handleInputChange(e)} 
                         type="text" placeholder="Nombre"
                         id='inputName'/>

                        <label className="inputselect"htmlFor="">Dificultad</label>

                        <select className="inputselect"name="dificultad" disabled={!control} id="selectDificultad" 
                        
                            onChange={(e)=>handleInputChange(e)}>
                            <option value="blank">Seleccione</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            
                        </select>

                     
                        <label className="inputselect"htmlFor="">Duracion</label>
                        <input className="inputselect"name='duracion'  disabled={!control} value={forms.duracion} type="text"
                            onChange={(e)=>handleInputChange(e)} placeholder='Duracion'
                            id='inputDuracion'/>


                        <label className="inputselect"htmlFor="">Temporada</label>

                        <select className="inputselect" name="temporada" disabled={!control} id="selectTemporada" 
                            onChange={(e)=>handleInputChange(e)}>
                            <option value="blank">Seleccione</option>
                            <option value="Verano">Verano</option>
                            <option value="Primavera">Primavera</option>
                            <option value="Otoño">Otoño</option>
                            <option value="Invierno">Invierno</option>
                            
                            
                        </select>

                <div>
                        
                        <select className="inputselect" name='paises' onChange={(e)=>{handleInputChange(e)}}>
                            <option value="pais seleccion">seleccione pais</option>
                            {todosLosPaises.length&&todosLosPaises.map(e=>{
                               return <option key={e.id} value={e.name}>{e.name}</option>
                            })}



                        </select>
                        <select className="inputselect"  name="actividad" id="xd"  onChange={(e)=>{handleInputChange(e)}}>
                <option  key='x' name='blank' value="blank">Seleccione</option>
            {turismos.map(element => {
                return <option name={element.name }  key={element.id} value={element.name}>{element.name}
                id:{element.id} temporada:{element.temporada}
                </option>
                
            })
            }    
                
            </select>

                       </div> 
                    </form>
                 
                    <button className="btn"onClick={(e)=>{vinculoOnClick(e)}}>vincular</button>
                    {/* <button className="btn"onClick={(e)=>{setforms(forms.name)}}>sumarTurimo</button>
                    <button className="btn"onClick={(e)=>{selctPaisEnviar(e)}}>sumarPais</button> */}
                <Respuestas ruta={forms.name} control={control} rutavincular={forms.paises.join('')+forms.actividad.join('')}/>
            </div>  
            <div>
               
                {/* <TodosTurismos paises={setforms}/>     */}
            </div>  
            <div className="procesar">

                <li>{forms.name}</li>
                <li>{forms.dificultad}</li>
                <li>{forms.duracion}</li>
                <li>{forms.temporada}</li>

                {forms.paises.length>0&&forms.paises.map((e)=>{
                    return <li key={e}>{e}</li>})}

                {forms.actividad.length>0&&forms.actividad.map((e)=>{
                    return <li key={forms.actividad.indexOf(e)}>{e}</li>
                })}
            
            
            
                
            
               
                
                    






            </div>  
        </div>
    )
} 