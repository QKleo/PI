


export default function Paginado(props){
    let aux=[]
   // let num=props.max
   //if(props.auxPokemons.length>0){props.setmax(Math.floor(props.auxPokemons.length/props.elementosMostrar))
    
//}
   
   
    
    for(let i=1;i<=props.max+1;i++){
        aux.push(i)
    }
   

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
        Pag. {props.paginado+1}    
        </div>    
        </div>

    )
}