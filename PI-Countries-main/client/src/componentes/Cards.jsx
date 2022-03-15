import React from "react"
import { Link } from "react-router-dom"
import { ObtenerPaisId } from "../redux/actions"
import { useDispatch } from "react-redux"
import { useState } from "react"




export default function Cards(props){
   const dispatch=useDispatch()


   const[efecto,setefecto]=useState() 
   const[texto,settexto]=useState(false) 

    function mouseCheck(e){
        e.preventDefault()
        setefecto('black')
        settexto(true)
    }
    function mouseNoCheck(e){
        e.preventDefault(e)
        setefecto('')
        settexto(false)

    }


    return(
        <div className="unidad">
            <div className="textocard">
                <h3>Nombre:{props.name} </h3>
                <h3> Continente:{props.continente} </h3>
                <h3>{texto&&`Id:${props.id}`}</h3>
            </div>
            <Link to={'/detail'}> <button  style={{borderRadius:'10px',
            opacity:texto&&'50%',background:efecto
            
            }}
            onClick={()=>dispatch(ObtenerPaisId(props.id))}
            ><img src={props.bandera} alt="" 
                className="banderasConBoton"
                onMouseLeave={(e)=>{mouseNoCheck(e)}}
                onMouseOver={(e)=>{mouseCheck(e)}}
                
            />
            
            </button></Link>

            
        </div>
    )
}