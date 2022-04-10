import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { ordenar } from "../reducer/actions";
import './Home.css'
export default function Ordenamiento(props){

    const dispatch=useDispatch()
    const estadoDogs=useSelector(state=>state.Dogs)

    return(
         <div>
             <div>
                 <button className='btn'onClick={()=>{dispatch(ordenar(estadoDogs,'name',true));
                props.setshow(0)}}>A-z</button>
                 <button className='btn'onClick={()=>{dispatch(ordenar(estadoDogs,'name',false));
                props.setshow(0)}}>Z-a</button>
             </div>
             <div>
                 <button className='btn'onClick={()=>{dispatch(ordenar(estadoDogs,'weight',true,0));
                props.setshow(0)}}>weightMin</button>
                 <button className='btn'onClick={()=>{dispatch(ordenar(estadoDogs,'weight',false));
                props.setshow(0)}}>weightMax</button>
             </div>
             <div>
                 <button className='btn'onClick={()=>{dispatch(ordenar(estadoDogs,'height',true,0));
                props.setshow(0)}}>heightMin</button>
                 <button className='btn'onClick={()=>{dispatch(ordenar(estadoDogs,'height',false));
                props.setshow(0)}}>heightMax</button>
             </div>
             <div>
                 <button className='btn'onClick={()=>{dispatch(ordenar(estadoDogs,'life_span',true,0));
                props.setshow(0)}}>life_spanMin</button>
                 <button className='btn'onClick={()=>{dispatch(ordenar(estadoDogs,'life_span',false,2));
                props.setshow(0)}}>life_spanMax</button>
             </div>

        </div>    
    )
}