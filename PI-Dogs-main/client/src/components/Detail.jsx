import {Link}from 'react-router-dom';
//import Card from './Card';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { limpiarDog, limpiarDogs } from '../reducer/actions';
import  { Suspense,lazy } from "react";


import './Home.css'


const Card=lazy(()=>import("./Card") )

export default function Detail(){
    const dispatch=useDispatch()


    return(
        <div>
            <Link to='/dogs' ><button className='btn'onClick={()=>{dispatch(limpiarDog());dispatch(limpiarDogs())}}>volver</button></Link>
            
            <Suspense fallback={<h4 style={{color:'white'}}>Cargando..</h4>}>
            <Card/>
            </Suspense>

        </div>
    )
}                          