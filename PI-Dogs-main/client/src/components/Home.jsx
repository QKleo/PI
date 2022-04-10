
import { Link } from "react-router-dom"

import { useState,useEffect } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { obtenerTodosDogs } from "../reducer/actions"
//import Cards from "./Cards"
import Paginado from "./Paginado"
import { match } from "assert"
import { obtenerDogsPorMatch } from "../reducer/actions"
import imagen from '../../src/dog.png'
//import Filtros from "./Ordenamiento"
import Ordenamiento from "./Ordenamiento"
import Filtros from "./Filtros"
import './Home.css'
import { Suspense,lazy } from "react"
const Cards=lazy(()=>import("./Cards"))



export default function Home(){

    const[matchear,setmatchear]=useState('')
    const elementsWatcher=8;

    const dispatch=useDispatch();
    const DogsState= useSelector((state)=>state.Dogs);
    const DogState=useSelector((state)=>state.Dog);
    useEffect(()=>{dispatch(obtenerTodosDogs())},[DogState.length]);
    const[show,setshow]=useState(0)

    const[buscandoDogs,setbuscandoDogs]=useState(false)

    const end=show*elementsWatcher+elementsWatcher
    const DogsWatcher=DogsState.slice(show*elementsWatcher,end)

    function match(){
        dispatch(obtenerDogsPorMatch(matchear,DogsState))
        setmatchear('')
        setbuscandoDogs(true)
      
    }
    function handleOnChange(e){
        e.preventDefault(e)
        setmatchear(e.target.value)
    }
    let max=Math.floor(DogsState.length/elementsWatcher)
    if(show<0){setshow(0)}
    if(show>max){setshow(max)}

    return(
        <div className="fondo">
            <div className="homeVista">
                <Ordenamiento setshow={setshow}/>
                <Filtros setshow={setshow}  setbuscandoDogs={setbuscandoDogs}/>
            </div>
            <div>
                <Link to='/forms'><button className="btn">formulario</button></Link>
                
            
            <button className="btn"style={{borderRadius:'70px',height:'60px'}}onClick={()=>{dispatch(obtenerTodosDogs());setshow(0);setbuscandoDogs(false)}}>recarga</button>
            </div>
            <div>
                <input className="btn"onChange={(e)=>handleOnChange(e)} value={matchear}type="text" placeholder="serach name"/>
                <button className="btn"onClick={()=>match(matchear)}>Search..</button>
            </div>

            <div>
                <Paginado index={setshow} show={show} max={max}/>
                
            </div>
            Dogs in page:{DogsState.length}
          
            <div className="homeVista">
            <Suspense fallback={<h4 style={{color:'white'}}>cargando...</h4>}>    
            {DogsState.length>0&&DogsWatcher.map(e=>
                
                <div key={DogsWatcher.indexOf(e)} >

                    <Cards name={e.name} image={e.image?e.image:imagen} id={e.id}/>
                </div>
                
                
                )}
            </Suspense>   
           
            {DogsState.length===0&&buscandoDogs&&<h3 style={{color:"whitesmoke"}}>
                No hay Dogs....recargue..</h3>}
            {DogsState.length===0&&!buscandoDogs&&<h3 style={{color:"whitesmoke"}}>cargando..</h3>} 
            </div>


          
           
        </div>
    )
}