
import './Home.css'

export default function Paginado(props){

    let aux=[]
    for(let i=1;i<=props.max+1;i++){
        aux.push(i)
    }
   

    return( 
        <div>
            <div>
            <button className='btn'onClick={()=>props.index(props.show-1)}>←</button>


                {aux.map(e=>{
                    return <button className='btn'key={e} style={{background:e===props.show+1&&'blue'}} onClick={()=>props.index(e-1)}>{e}</button>
                })}
           

            <button className='btn'onClick={()=>props.index(props.show+1)}>→</button>
            </div>
        <div>
        Pag. {props.show+1}    
        </div>    
        </div>

    )
}