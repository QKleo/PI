import { useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
//import { obtenerPorId } from "../redux/actions"
import { asignarPokemon } from "../redux/actions"
import { agregarAProyecto } from "../redux/actions"
import './Cards.css'

export default function Cards(props){
    const dispatch=useDispatch()
    const[valida,setvalida]=useState()
   // console.log(props.name)
    return(
        <div className="pokemon">
            <div className="unidad">
                <h4>name :{props.name}</h4>
                {props.name!=="no hay match"?
                <Link to='/detail'>
                    <button 
                        onClick={()=>{dispatch(asignarPokemon(props.pokemon))}}  >
                        <img src={props.image} alt="" width='100' height='100'/>
                  </button>
                </Link>:
                    <button>
                        <img src={props.image}  alt="" width='100' height='100'/>
                    </button>}

                <div>
                    {props.noEstoy&&props.name!=='no hay match'&&
                    <button onMouseEnter={()=>setvalida(true)} onMouseLeave={()=>setvalida(false)} 
                        className="btn" onClick={()=>{
                        dispatch(agregarAProyecto(props.Allpokemons,props.pokemon));
                        setvalida(false)}}>
                        Agregar al proyecto
                    </button>}
               
                </div>
            </div>
                <div>
                    {valida&&<h4>hp. :{props.hp}</h4>}
                    {valida&&<h4>atk :{props.attack}</h4>}
                    {valida&&<h4>def :{props.defense}</h4>}
                    {valida&&<h4>wght:{props.weight}</h4>}
                    {valida&&<h4>hght:{props.height}</h4>}
                    {valida&&<h4>id. :{props.id}</h4>}
                </div>            

        </div>

    )
}