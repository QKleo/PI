
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { actualizarDespuesDeEliminar, actualizarPokemon, CrearPkemons,obtenerTodosNamesDb, limpiarAuxPokemons, obtenerTypes } from "../redux/actions"
import { useSelector } from "react-redux"
import { actualizarDespuesDeCrear,limpiarRespuesta,invalida,limpiarPokemons,limpiarPokemon,obtenerTodos } from "../redux/actions"
import { refrescar } from "../redux/actions"

export default function Forms(){
//let actualizar=false
const dispatch=useDispatch()
const Types=useSelector(state=>state.Types)
const All=useSelector(state=>state.Allpokemons)
const Respuesta=useSelector(state=>state.Respuesta)
const Pokemon=useSelector(state=>state.Pokemon)
const Names=useSelector(state=>state.Names)

let namesEstan=Names.length>0&&Names.map(e=>e.name)
//console.log(namesEstan)
//console.log(Pokemon)
const objetoMostrar={}
const[validar,setvalidar]=useState(false)
const[local,setlocal]=useState({

    name:Pokemon.name?Pokemon.name:'',
    hp:Pokemon.hp?Pokemon.hp.toString():'',
    defense:Pokemon.defense?Pokemon.defense.toString():'',
    attack:Pokemon.attack?Pokemon.attack.toString():'',
    speed:Pokemon.speed?Pokemon.speed.toString():'',
    height:Pokemon.height?Pokemon.height.toString():'',
    weight:Pokemon.weight?Pokemon.weight.toString():'',
    types:Pokemon.types?Pokemon.types.map(e=>`${e.id}`):[],
    actualizar:Pokemon.name?true:false,
    nameInicial:Pokemon.name?Pokemon.name:''
   // respuesta:Respuesta[0]


}) 

   
    //console.log(Pokemon.types)
    useEffect(()=>{controlRepetido(local.name)},[local.name])
    useEffect(()=>{ dispatch(obtenerTodosNamesDb())},[All.length])

    function validarNumero(str,len){
        if(str.length>len){return false}
        if(str*1>2000){return false}
        return parseInt(str*1)&&true
    }

    function validarCadena(str,len){
   
    
         if(str.length>len){return false}
    
            str=str.split('-').join('')
            let primero=/\W/.test(str)
            let segundo=/\d/.test(str)
            return !primero && !segundo 
      
    }
    function validarTypes(arr,value){
        if(local.actualizar){
           arr=arr.map(e=>{return e})
         //  console.log(arr)
        }
      //  console.log(value,'aqui')
      //  console.log(local.types)
        return !arr.includes(value)
    }
    function controlRepetido(str){
        if(local.actualizar){
            namesEstan=namesEstan.length>0&&namesEstan.filter(e=>e!==local.nameInicial)
        }
  
        if(namesEstan.includes(str)){setvalidar(true)}
        else{setvalidar(false)}
    }

    function handleOnChange(e){
        e.preventDefault(e)
        const{name,value}=e.target
        
        name==='name'&&setlocal({...local,[name]:validarCadena(value,25)?value.toLowerCase():local.name})
     
        name==='types'&&setlocal({...local,[name]:validarTypes(local[name],value)?
            [value,...local[name]]:local[name] })
              //  console.log(local.types)
        
        
        name==='hp'&&setlocal({...local,[name]:validarNumero(value,4)?value:local[name].length>0?local[name].slice(1):''})
        name==='defense'&&setlocal({...local,[name]:validarNumero(value,4)?value:local[name].length>0?local[name].slice(1):''})
        name==='attack'&&setlocal({...local,[name]:validarNumero(value,4)?value:local[name].length>0?local[name].slice(1):''})
        name==='speed'&&setlocal({...local,[name]:validarNumero(value,4)?value:local[name].length>0?local[name].slice(1):''})
        name==='weight'&&setlocal({...local,[name]:validarNumero(value,4)?value:local[name].length>0?local[name].slice(1):''})
        name==='height'&&setlocal({...local,[name]:validarNumero(value,4)?value:local[name].length>0?local[name].slice(1):''})
       
    
    
    }
    function handleOnClick(e){
        e.preventDefault(e)
        if(local.name.length>0&&local.attack.length>0&&local.defense.length>0&&
            local.speed.length>0&&local.weight.length>0&&local.hp.length>0&&local.height.length>0
            ){
                if(local.actualizar&&!validar){
                  //  dispatch(actualizarPokemon(Pokemon.id,local))
                   // setlocal({...local,['types']:local.types})
                    console.log(local.types)
                    actualizarDespuesActualizar()
                    limpiarFormulario()
                  //  dispatch(obtenerTodos())

                }else{
                if(!validar){
               // setvalidar('mostraTrue')
                    
                    dispatch(CrearPkemons(local))
                    actualizarDespues()
                    limpiarFormulario()
                    
                    }else{dispatch(invalida())}
                }
            }
            else{
                dispatch(invalida())
            }
        }
    function actualizarDespues(){

        dispatch(actualizarDespuesDeCrear(local.name))
       // dispatch(refrescar(All))
        //console.log(All)

    }
    function actualizarDespuesActualizar(){
        
        dispatch(actualizarPokemon(All,Pokemon.id,local))
        dispatch(refrescar(All))
    }

    function limpiarFormulario(){
       // setvalidar('mostraFalse')
        setlocal({
            name:'',
            hp:'',
            defense:'',
            attack:'',
            speed:'',
            height:'',
            weight:'',
            types:[],
            //respuesta:Respuesta[0]
        })
        dispatch(limpiarPokemon())
    }
   
   

    return (
        <div >
            
            
            <Link to='/pokemons'>
                <button className='btn'onClick={()=>{dispatch(limpiarPokemon());dispatch(limpiarRespuesta())}}>
                    volver
                </button>
            </Link>   
        
            <div><h4>Formulario</h4></div>
        <div>
            <form  autoComplete="off">
            <div>
            <label className='btn'htmlFor="">nombre </label>
            <input className='btn' type="text" placeholder={Pokemon.name?Pokemon.name:"nombre"} 
                value={local.name}name="name" onChange={(e)=>handleOnChange(e)}/>

                {!validar&&<span className='btn'>
                    {!local.name?'invalido':'ok'}
                    
                </span>}
                {validar&&<span className="btn">
                    ya existe
                </span>}    
            </div>
            <div>
            <label className='btn'  htmlFor="">{". "+". "+"hp "}</label>
            <input className='btn'type="text" placeholder={Pokemon.hp?Pokemon.hp:"hp"}
                value={local.hp} name="hp"onChange={(e)=>handleOnChange(e)}/>
                <span className='btn'>
                    {!local.hp?'invalido':'ok'}
                </span>
            </div>
            <div>
            <label className='btn'htmlFor="">defense</label>
            <input className='btn'type="text" placeholder={Pokemon.defense?Pokemon.defense:"defense"}
                value={local.defense} name="defense"onChange={(e)=>handleOnChange(e)}/>
                <span className='btn'>
                    {!local.defense?'invalido':'ok'}
                </span>
            </div>
            <div>
            <label className='btn'htmlFor="">{"attack "}</label>
            <input className='btn'type="text" placeholder={Pokemon.attack?Pokemon.attack:"attack"}
                value={local.attack} name="attack"onChange={(e)=>handleOnChange(e)}/>
                <span className='btn'>
                    {!local.attack?'invalido':'ok'}
                </span>
            </div>
            <div>
            <label className='btn'htmlFor="">{"."+"speed "}</label>
            <input className='btn'type="text" placeholder={Pokemon.speed?Pokemon.speed:"speed"}
                name="speed" value={local.speed} onChange={(e)=>handleOnChange(e)}/>
                <span className='btn'>
                    {!local.speed?'invalido':'ok'}
                </span>
            </div>
            <div>
            <label className='btn'htmlFor="">{"height "}</label>
            <input className='btn'type="text" placeholder={Pokemon.heigh?Pokemon.height:"height"} 
                name="height"value={local.height} onChange={(e)=>handleOnChange(e)}/>
                <span className='btn'>
                    {!local.height?'invalido':'ok'}
                </span>
            </div>
            <div>
            <label className='btn'htmlFor="">{"weight "}</label>
            <input className='btn'type="text" placeholder={Pokemon.weight?Pokemon.weight:"weight"}
                name="weight"value={local.weight} onChange={(e)=>handleOnChange(e)}/>
                <span className='btn'>
                    {!local.weight?'invalido':'ok'}
                </span>
            
            </div>
            <div>
                <select className='btn'name="types" onChange={(e)=>handleOnChange(e)} value=''>
                        <option>seleccione</option>
                       {Types.length>0&&Types.map((e,i)=>{

                           {objetoMostrar[e.id]=e.name}

                        return <option key={i}value={e.id}>{e.name}</option>})}
                
                    
                </select>
            </div>


        <button className='btn'
            onClick={(e)=>handleOnClick(e)}
            >{local.actualizar?'actualizar':'enviar'}</button>
        <br/>    
       
       

        </form>
        </div>
       
        {Respuesta.length>0&&<li>.......{Respuesta[0]}<button onClick={()=>dispatch(limpiarRespuesta())}>X</button></li> }

                {local.types&&local.types.map((e,i)=>

                <li key={i}>{objetoMostrar[e]}<button onClick={()=> 
                    
                    setlocal({...local,['types']:local.types.filter(el=>el!==e)})}>X</button></li>
                    
                    )}
       
        </div>
    )
}