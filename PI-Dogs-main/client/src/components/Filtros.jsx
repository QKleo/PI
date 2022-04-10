import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { filtrar } from "../reducer/actions";
import { useState } from "react";
import { useEffect } from "react";
import { obtenerTodosTemperaments,breedsGroup } from "../reducer/actions";
import './Home.css'

export default function Filtros(props){
    
    const dispatch=useDispatch()
    const estadoDogs=useSelector(state=>state.Dogs)
    const estadoTemperaments=useSelector(state=>state.Temperaments)
    const estadoBreedsGroup=useSelector(state=>state.BreedsGroup)
    const[filtro,setfiltro]=useState({
        
        temperaments:'temperaments',
        breedsGroup:'breedsGroup',

    })
    useEffect(()=>dispatch(obtenerTodosTemperaments()),[estadoDogs.length])
    useEffect(()=>dispatch(breedsGroup()),[estadoDogs.length])

    function handleOnChange(e){
        const {name,value}=e.target
      //  e.preventDefault()
        setfiltro({...filtro,[name]:value})

       // settemperaments(seleccione)
        

    }

    return(
        <div>
            <div>
                <select className="btn" onChange={(e)=>handleOnChange(e)} name='temperaments' value='seleccione'>
                    <option >Seleccione</option>
                    {estadoTemperaments.map(e=>{
                        return e.name!==''&&<option key={e.id} value={e.name}>{e.name}</option>}
                        )}
                </select>
                <select className="btn" onChange={(e)=>handleOnChange(e)} name='breedsGroup' value='sleccione'>
                    <option >Seleccione</option>
                    {estadoBreedsGroup.map(e=>{
                        return e.name!==''&&<option key={e.id} value={e.name}>{e.name}</option>}
                        )}
                </select>

            </div>
            <div>
                <button className="btn"onClick={()=>{dispatch(filtrar(estadoDogs,'createInDatabase',false));
                    props.setshow(0);props.setbuscandoDogs(true)}}>existentes</button>
                <button className="btn"onClick={()=>{dispatch(filtrar(estadoDogs,'createInDatabase',true));
                    props.setshow(0);props.setbuscandoDogs(true)}}>creados</button>
            </div>
            <div >
            <button className="btn"onClick={()=>
                {dispatch(filtrar(estadoDogs,'temperaments',filtro.temperaments));props.setshow(0);
                props.setbuscandoDogs(true)}}>{filtro.temperaments}</button>

            <button className="btn" onClick={()=>
                {dispatch(filtrar(estadoDogs,'breed_group',filtro.breedsGroup));props.setshow(0);
                props.setbuscandoDogs(true)}}>{filtro.breedsGroup}</button>

            </div>
        </div>
    )
}