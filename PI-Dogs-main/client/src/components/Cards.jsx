import { Link } from "react-router-dom";
import { lazy,Suspense } from "react";
import { useDispatch } from "react-redux";
import { obtenerDogId } from "../reducer/actions";
import './Cards.css'

export default function Cards(props){
    const dispatch=useDispatch()

  
     
    

    return(
        <div className="unidad">
            
            <h4>{props.name}</h4>
            <Link to='/detail'>
            <button  onClick={()=>dispatch(obtenerDogId(props.id))}> 

                   
                    <img src={props.image} width='100px' height='80px' alt="" />
                   
            </button>
            </Link>

        </div>
    )
}