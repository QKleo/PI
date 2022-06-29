
import { useSelector } from "react-redux"

export default function Paginado(props){
    let auxPokemons=useSelector(state=>state.auxPokemons)
    let Pokemons=useSelector(state=>state.Pokemons)
    
    let aux=[]
   // let num=props.max
 
   
   
    
    for(let i=1;i<=props.max+1;i++){
        aux.push(i)
    }
    //console.log(props.max)
   

    return( 
        <div>
            <div>
            <button className='btn'onClick={()=>props.setpaginado(props.paginado-1)}>←</button>


                {aux.map(e=>{
                    return <button className='btn'key={e} style={{background:e===props.paginado+1&&'blue'}} onClick={()=>props.setpaginado(e-1)}>{e}</button>
                })}
           

            <button className='btn'onClick={()=>props.setpaginado(props.paginado+1)}>→</button>
            </div>
        <div>
        <span> Pag. {props.paginado+1} Total pokemons:{auxPokemons.length>0?
                auxPokemons.length===1?auxPokemons[0].name==='no hay match'&&'0':auxPokemons.length
                :Pokemons.length===1?Pokemons[0].name==='no hay match'&&'0':Pokemons.length} 
              
        </span>     
        </div>    
        </div>

    )
}