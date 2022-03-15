import {ObtenerPaisId } from "../redux/actions"
import { useDispatch } from "react-redux" 
import { useState } from "react"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import './Cards.css'


export default function Detalle(){
    const pais=useSelector(state=>state.pais)
    const dispatch=useDispatch()
    const[area,setarea]=useState('****************')
    //useEffect(()=>dispatch(ObtenerPaisId("ARG")),[dispatch])
    const todos=useSelector(state=>state.paises)
    
    let turismos=''
    let obj={}
    if(pais.length>0){
    for(let el of pais){
        if(typeof(el)==='object'){
            turismos=el.Turismos
        }
    obj={

        name:el.name,
        id:el.id,
        continente:el.continente,
        capital:el.capital,
        subregion:el.subregion,
        area:el.area,
        bandera:el.bandera,
        poblacion:el.poblacion

    }    
    }}


    

    function handleOnchange(e){
        
        e.preventDefault()
        let buscarid=e.target.value
        dispatch(ObtenerPaisId(buscarid))
        setarea('****************')
    }






    return(
        <div>
             <Link to='/countries'><button className="btn">volver</button></Link>
             <button >Aplicar</button>
                <h4>
                    <select className="inputs" name="idis" id="idis" 
                    onChange={(e)=>handleOnchange(e)}
                  
                    >
                        <option key="selecion"value="" name='blank'   >Seleccione id</option>

                    {todos.length>0&&todos.map(e=>{
                        
                        return <option  key={e.id}name={e.name}value={e.id}> {e.id}
                        
                        </option> 
                        
                    })}



                    </select>
                    
                    <img style={{margin:'30px',borderRadius:'10px',
                        borderStyle:'double'    }} src={obj.bandera} alt="" />
                    

                    <div style={{display:'flex',justifyContent:'center'}}>
                    <ul style={{textAlign:'center'}}>
                        <li> Nombre:{obj.name}</li>
                        <li>id:{obj.id}</li>
                        <li>Continente:{obj.continente}</li>
                        <li>Area :{area}</li>
                        <li><button className="btn"
                        onClick={(e)=>setarea(obj.area)}>KM2</button>
                        <button className="btn" onClick={(e)=>setarea(obj.area/1000000)}>Mill.KM2</button></li>
                        <li>Subregion:{obj.subregion}</li>
                        <li>Ciudad cap:{obj.capital}</li>
                        <li>Poblacion:{obj.poblacion}</li>
                    </ul>

                    </div>
                    <div style={{display:'flex',
                    flexDirection:'column',justifyItems:'center',justifyContent:'center',marginLeft:'30%',
                    marginRight:'30%',borderBlockColor:"black",borderStyle:'double'
                }}>
                        Activiades:
                        {turismos.length>0&&turismos.map((e)=>{
                        return <ul style={{textAling:'center'}} key={turismos.indexOf(e)}>
                            
                            
                         <li style={{textAlign:'left',justifyContent:'center'}} key={e.id}>{e.name}  {e.temporada}
                             --Dificultad:{e.dificultad}--Disponible durante {e.duracion}-dias</li>
                        
                        
                        </ul>
                    })}
                    </div>
                </h4>

            
        </div>
    )
}