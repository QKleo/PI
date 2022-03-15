
import'./Paginado.css'
import { useState } from "react"




const elementosPorPagina=10


export default function Paginado(props){

    

    let total=props.totalElementos
    let mostar=Math.floor(total/elementosPorPagina)+1
    let numeros=[]
    for(let i=1;i<=mostar;i++){numeros.push(i)}


   




    return(
        <div >
            <div className='contenedorbotones'>

               <button className='botonespaginado'
               
                onClick={()=>props.value(props.inicio-1)}>←</button>
             
             
                   {numeros.map((n)=><button className="botonespaginado"key={n} 
                   onClick={()=>props.value(n-1)}
                   style={{background:n===props.inicio+1&&'red'}}> {n} </button>)}
              


                 <button className="botonespaginado" onClick={()=>props.value(props.inicio+1)}>→</button>
            </div>
            <div className='paginado'>
                  <h4> Pag..{props.inicio+1}</h4>
            </div>







        </div>
    )
}