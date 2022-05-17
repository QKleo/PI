import { useDispatch } from "react-redux"

import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { filtrarTipo,obtenerTodos,
    limpiarPosibles,typesPosibles, limpiarAuxPokemons } from "../redux/actions"

export default function Filtros(props){
   
    const dispatch=useDispatch()
    let namesMostra
    
    const Pokemons=useSelector(state=>state.Pokemons)
    const Types=useSelector(state=>state.Types)
    const Names=useSelector(state=>state.Names)
    const Posibles=useSelector(state=>state.Posibles)
    const[valores,setvalores]=useState({
        nombre:'',
        Types:'',
        names:'',
        posibles:'',
    })
    useEffect(()=>{dispatch(limpiarPosibles());return()=>{limpiarEstadoPosibles()}},[])
  
    if(valores.nombre.length>0){
        namesMostra=Names.filter(e=>e.name.match(valores.nombre.toLowerCase()))
    }
    if(valores.nombre.length===0){
        namesMostra=Names
    }
    function control(str){
        str=str.split('-').join('')
        let primero=/\W/.test(str)
       
        return !parseInt(str*1)&&!primero
    }
            
        
    

    function handleOnChange(e){
        e.preventDefault(e)
        const{name,value}=e.target
        name==='nombre'&&setvalores({['nombre']:control(value)?value:valores.nombre})
        name==='names'&&setvalores({['nombre']:value})
        name==='Types'&&setvalores({['Types']:value,['names']:'',['nombre']:''})
        name==='posibles'&&setvalores({['nombre']:value})
            
        
    }
   // console.log(valores.Types)
    function handleOnClick(e){
        e.preventDefault(e)
        if(Pokemons.length===1&&Pokemons[0].name==='no hay match'){
           // return<h4 className="white">no hay</h4>
           console.log('no hay match')
        }else{
            dispatch(filtrarTipo(Pokemons,valores.Types))

        }
    }
    function limpiarEstadoPosibles(){
        dispatch(limpiarPosibles())
    }
   

    return(
        <div className="filtro">
            <div>
                <input className="btn" type="text"readOnly 
                value={`cantidad types:${Types.length}`}/>
            </div>
           
            <div>
                <button className="btn" 
                    onClick={()=>props.cambiar(true)}>BD
                </button>
                <button className="btn" 
                    onClick={()=>props.cambiar(false)}>API
                </button>
                <button className="btn" onClick={()=>dispatch(limpiarAuxPokemons())}>All
                </button>    
            </div>

            <div>
                <div>
                <div>
                    <select name="Types" className="btn" value=''
                        onChange={(e)=>handleOnChange(e)}  id="" >
                        
                            <option value="">Types</option>
                            {Types.length>0&&Types.map((e)=>{
                            return <option key={e.id }value={e.name}>{e.name}</option>})}
                    
                    </select>
                </div>

                   
                <button className="btn"
                    onClick={(e)=>{
                        handleOnClick(e)
                    }}>
                    Filtrar por tipo
                </button>
                <div>
                    <label htmlFor="" className="btn">su seleccion:{valores.Types?valores.Types:
                    'sin seleccion'}</label>
                </div>
                <div>
                    <select name='posibles' className="btn" value=''id=""
                        onChange={(e)=>handleOnChange(e)}>
                        <option value="">Pokemones posibles por type</option>
                        {Posibles.length>0&&Posibles.map((e,i)=>{
                        return <option key={i} value={e}>{e}</option>
                    })}
                </select> 
                <button className='btn'onClick={()=> dispatch(typesPosibles(valores.Types))}>O</button>   
                </div>
                </div>   
            </div>
            <div>
                <input type='text'
                    className="btn" 
                    value={valores.nombre}
                    // value={valores.nombre?valores.nombre:valores.names}
                    placeholder="nombre" name="nombre" autoComplete="off"
                    onChange={(e)=>handleOnChange(e) }/>
               
                <button className="btn" 
                        onClick={()=>{dispatch(obtenerTodos(props.Allpokemons,
                        valores.nombre.length>0?valores.nombre:'no hay seleccion'
                     //   valores.names.length>0?valores.names:
                        
                        ));
                        ;setvalores({['nombre']:'',['names']:'',['Types']:'',['posibles']:''});
                        dispatch(limpiarPosibles())}}>
                        Search
                </button>

                    {/* {valores.nombre}
                    {valores.names} */}
            </div>
            <div>
                <select className='btn' style={{position:'static',marginLeft:'5px'}}value=''
                        name="names" id="" onChange={(e)=>handleOnChange(e)} >
                        <option>seleccione nombre pokemon api/bd</option>
                        {Names.length>0&&namesMostra.map(e=>{
                        return <option key={e.id}> {e.name}</option>}
                  
                    )}
                </select>
                <span>
                  <input readOnly
                     className="btn" style={{position:'static'}}value={`nombres en Proy:${namesMostra.length}`}/>
                </span>
            </div>
           
        </div>
    )
}