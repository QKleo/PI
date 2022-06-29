
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiDb, limpiarAuxPokemons, limpiarPokemons,refrescar } from "../redux/actions";
//import  Cards  from "./Cards";
import { useState } from "react";
import imagen from '../pokemon.png';
import pokebolaRota from '../pokebola2.png';
import Filtros from "./Filtros";
import Ordenar from "./Ordenar";
import Paginado from "./Paginado";
import { Link } from "react-router-dom";
import { Suspense,lazy } from "react";
import './Home.css';
//const Cards=lazy(()=>import("./Cards"))




export default function Home(){
    const Cards=lazy(()=>import("./Cards"))
    const elementosMostrar=12
    let PokemonsMostrar=[]
    
    const dispatch=useDispatch()
    const Allpokemons=useSelector(state=>state.Allpokemons)
    let auxPokemons=useSelector(state=>state.auxPokemons)
    let Pokemons=useSelector(state=>state.Pokemons)
    
 
    let maxi
    const[paginado,setpaginado]=useState(0)
    useEffect(()=>{dispatch(refrescar(Allpokemons))},[Allpokemons.length])
    useEffect(()=>setpaginado(0),[dispatch])
    
//---------------------------------------------------------------------
    let end=paginado*elementosMostrar+elementosMostrar


    if (auxPokemons.length===0 && Pokemons.length>0){
        maxi=Math.floor(Pokemons.length/elementosMostrar)
            
        PokemonsMostrar=Pokemons.slice(paginado*elementosMostrar,end)
        
    }

    if(auxPokemons.length>0 && Pokemons.length>0){
        maxi=Math.floor(auxPokemons.length/elementosMostrar)
        PokemonsMostrar=auxPokemons.slice(paginado*elementosMostrar,end)
        
        }
    
   

    if(paginado<0){setpaginado(0)}
    if(paginado>maxi){setpaginado(maxi)}
//----------------------------------------------------------------------       

      
//--------------------------------------------------------------------    
    function cambiar(value){
       
       dispatch(apiDb(Pokemons,value))
       
   }
   function todos(e){
       e.preventDefault(e)
       dispatch(limpiarAuxPokemons())
       dispatch(limpiarPokemons())
       dispatch(refrescar(Allpokemons))
       
       
   }
 
    //console.log(Types)
    
    return(

        <div>
            <div style={{padding:'0px'}} >
             <Filtros cambiar={cambiar}  auxPokemons={auxPokemons} Pokemons={Pokemons}
                elementosMostrar={elementosMostrar} Allpokemons={Allpokemons} /> 
            </div>
            
            <div style={{padding:'0px'}}>
         
            {/* <h5 style={{padding:'0px'}}>Total pokemons{auxPokemons.length>0?
                auxPokemons.length===1?auxPokemons[0].name==='no hay match'&&'0':auxPokemons.length
                :Pokemons.length===1?Pokemons[0].name==='no hay match'&&'0':Pokemons.length} 
            </h5>     */}
            
               <div style={{padding:'0px'}}>
                <Ordenar arrObj={Pokemons} arrObjaux={auxPokemons}/>
                </div>
            </div>
           
            <div>
                <Paginado setpaginado={setpaginado} paginado={paginado} max={maxi} 
                 auxPokemons={auxPokemons} elementosMostrar={elementosMostrar}/> 
            </div>
           
            <button className='btn'style={{padding:'0px'}}onClick={(e)=>todos(e)}>Refrescar</button>

            <Link to='/formulario'>
                <button className='btn'style={{padding:'0px'}}>Crear un Pokemon</button>
            </Link>
            
            <div className="homeVista" > 
           
                {PokemonsMostrar.length===0&&Allpokemons.length===0&&<h4 className="white">..espere... </h4>}
                <Suspense fallback={()=>{ setTimeout(8000);<h4  className="white">cargando...</h4>}}>
                   
                    {Pokemons.length>0&&PokemonsMostrar.map(e=>
                
                    <div key={PokemonsMostrar.indexOf(e)} >
    
                        <Cards name={e.name} image={e.image?e.image:e.name==='no hay match'?
                        pokebolaRota:imagen}
                            id={e.id} 
                            hp={e.hp} attack={e.attack} height={e.height} weight={e.weight}
                            pokemon={e} noEstoy={e.noEstoy?true:false} defense={e.defense}
                            Allpokemons={Allpokemons}/>
                        
                    </div>

                )}
                </Suspense>
            </div>  
        </div>
    )
}