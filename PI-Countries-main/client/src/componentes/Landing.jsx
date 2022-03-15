import React from "react";
import {Link} from 'react-router-dom';
import styled from "styled-components";
import { obtenerPaises } from "../redux/actions";
import { useDispatch } from "react-redux";
const Lboton=styled.button
`background-color: brown;
border:2px solid lightgray;
border-radius: 5px;
color: black;
 padding: 8px;
 box-shadow: 5px 5px 0px gray;
 font-style: Arial;
 font-weight: blod;
 bolder :900;
 font-size:1.2rem`
 
 ; 


export default function Landing(){
    const dispatch=useDispatch()


    function handleOnClick(e){
        e.preventDefault(e)
        dispatch(obtenerPaises())
    }



    return (
        <div>
            <h1>COUNTRIES</h1>
            <Link to='/countries' ><Lboton onMouseOver={(e)=>handleOnClick(e)}>Inicio</Lboton></Link>
        </div>
    )

}