import React from 'react';
import Buscar from './Buscar'; 
import Paginado from './Paginado';
import { Link } from 'react-router-dom';
import { useState ,useEffect } from "react";
import { useDispatch ,useSelector } from "react-redux";
import { obtenerPaises} from '../redux/actions';
import Ordenamiento from './Ordenamiento';
import Cards from './Cards';
import TodosTurismos from './Turismos';
import FiltrosContinentes from './Filtros';
import './Home.css'
import FiltroPorTurismos from './Filtroturismos';


const ELEMENTAMOSTRAR=10





export default function Home(){
    
    const dispatch=useDispatch()
   // useEffect(()=>{dispatch(obtenerPaises())},[dispatch])

    const estadoCountries=useSelector((state)=>state.paises)
    
    const [inicio,setinicio]=useState(0)

    
   


    let fin=0
    let marcador=inicio*ELEMENTAMOSTRAR
    if (marcador===0){ fin=marcador+9}
    else{
     marcador=(inicio*ELEMENTAMOSTRAR)-1  
     fin=marcador+ELEMENTAMOSTRAR}
    
    const marcadorPaginado=estadoCountries.length&&estadoCountries.slice(marcador,fin)
    let largo=estadoCountries.length
   
    if(inicio===-1){setinicio(0)}
    
    
    if(inicio>=Math.floor(largo/ELEMENTAMOSTRAR)+1){
        setinicio(Math.floor(largo/ELEMENTAMOSTRAR))}
    
   // useEffect(()=>{dispatch(props.funcion())},[dispatch])
  //  let ruta='/ordenPaises'
    
    return(
        <div>
             <FiltroPorTurismos/>
            <div> < FiltrosContinentes todos={estadoCountries}/></div>
           
            {/* <TodosTurismos/> */}
            {/* {largo===250&&<p>cantidad de paises:{largo} 
            <Link to={ruta}><button>Ordenar</button></Link></p>} */}
            <div style={{fontFamily:'monospace',fontSize:'large',fontWeight:'bolder',margin:'10px'}}>cantidad de paises:{largo} 
            
            
            <Ordenamiento/></div>

            <Buscar setinicio={setinicio}/>
            
            
            <Paginado value={setinicio} inicio={inicio} totalElementos={largo}/>
            <Link to='/crear'><button className='btn'>vamos a crear algo </button></Link>
            <div className='homeVistaBanderas'>
                
                {estadoCountries.length>0&&marcadorPaginado.map((countries)=>

                    
                <div key={marcadorPaginado.indexOf(countries)} >   
                <Cards key={countries.id} name={countries.name} bandera={countries.bandera}
                continente={countries.continente} 
                id={countries.id}
       
                />  </div>)}
           
                
                
                
            </div>
            
        </div>
    )
}