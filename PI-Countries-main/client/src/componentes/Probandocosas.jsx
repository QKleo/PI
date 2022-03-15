import { useState } from "react"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import'./Probandocosas.css'
const color='green'

export default function Probandocosas(){
let valor=9
let array=[]
const[pruebaselect,setpruebaselect]=useState('blank')


const[posicion,setposicion]=useState(1)
const[pinto,setpinto]=useState(false)
const hola=pinto&&true
//const dispatch=useDispatch()
//useEffect(()=>{dispatch(setpinto(true))},[hola])
for(let i=0;i<valor;i++){
    array.push(i)
}

    function handleOnClick(e){
        e.preventDefault(e)

        setposicion(posicion+1)
       


      //  setcontrolo('pp')
        
    }  
    let nose='gggggggggggggggg'
    let pintor='green'

    function handleonchange(e){
        e.preventDefault(e)
        
         setpinto(pinto+1)
         
    }
   let alguno='red'

    let yo=''
   function handleprueba(e){
       e.preventDefault(e)
       setpruebaselect(e.target.name)}
       
    function  handleyo(e){
        e.preventDefault(e)
        setpruebaselect('blank')
       
    
   }
    return(
        <div>
            {/* {valor}
            {controlo}
            {pinto&&'hola'}
            <button 
            onMouseOver={(a)=>a='blue'}
            onMouseLeave={()=>{return alguno='black'}}
            onAuxClickCapture={()=>setcontrolo('leo')}  
            style={{color:"darkslateblue",background:"darkslateblue"}} 
            
            onClick={(e)=>handleOnClick(e)} >yyyyy</button> */}
            <button onClick={()=>setposicion(1)}/>

            <div>
            posicion  {posicion}
            pinto {pinto}    
            <form name='pp'>
            {array.length&&array.map(n=> 
            {return(
            <input className="algo"
           
            onClick={(e)=>{handleOnClick(e)}}
            onChange={(e)=>{handleonchange(e)}}
            style={{background:n===posicion&&'red'}}
            value={n} 
            onMouseEnter={()=>setpinto(true)}
            //placeholder={array.indexOf(e)} 
            type='button' key={array.indexOf(n)}/>)}
            
            )}
            </form>
            </div>
                {nose}



                <select  onChange={(e)=>{handleprueba(e)}} name="" id="" onFocus={(e)=>e.target.value='blank'} >
                        <option name='kk' value='blank' >'1' </option>
                        <option  name='leo'value="2">'2'</option>    
                        <option name='algo' value="jjj">3</option>
                    
                </select>
                <button onClick={(e)=>handleyo(e)}></button>
                {pruebaselect}
                {yo}

        </div>
    )
}