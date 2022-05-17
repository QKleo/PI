
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import './Card.css'
import imagen from '../pokemon.png';
import { eliminarPokemonDb,actualizarDespuesDeEliminar } from "../redux/actions";
import { useDispatch } from "react-redux";

import pokebolaRota from '../pokebola2.png'

export default function Card(){

    const Pokemon=useSelector(state=>state.Pokemon)
    const Allpokemons=useSelector(state=>state.Allpokemons)
    const dispatch=useDispatch()
   // console.log(Pokemon)
   

   
    return(
        <div>
               
               
            <div className="vista">
                <div className="giro">
                    <div  className="giro-interno"  >
                        <div className="giro-frontal">
                            <img src={Pokemon.image?Pokemon.image:
                                Pokemon.name?imagen:pokebolaRota} width='300px'height='300px' alt="" />
                            <br />
                        </div>
                        <div className="giro-detras" style={{textAlign:'left'}}>
                            <li> name:{Pokemon.name&&Pokemon.name}</li>
                            <li >id:{Pokemon.id&&Pokemon.id}</li>
                            <li>hp:{Pokemon.hp&&Pokemon.hp}</li>
                            <li>speed:{Pokemon.speed&&Pokemon.speed}</li>
                            <li>weight:{Pokemon.weight&&Pokemon.weight}</li>
                            <li>height:{Pokemon.height&&Pokemon.height}</li>
                            <li>defense:{Pokemon.defense&&Pokemon.defense}</li>
                            <li>attack:{Pokemon.attack&&Pokemon.attack}</li>
                        </div>
                    </div>
                </div>
            </div>
            <div className="type">
                <h4>Types :</h4>

                {Pokemon.types&&Pokemon.types.length>0&&Pokemon.types.map((e,i)=>{
                    return <li key={e.id}>{e.name}</li>})}
            </div>
            {Pokemon.createInDatabase&&
                    <div>
                        {/* <Link to='/pokemons'> */}
                            <button className="btn" onClick={()=>{
                                dispatch(eliminarPokemonDb(Pokemon.id));
                                dispatch(actualizarDespuesDeEliminar(Allpokemons))
                                
                                    }}>Eliminar
                            </button>
                        {/* </Link> */}
                        <Link to='/formulario'>
                            <button className="btn">Actualizar</button>
                        </Link>
                    </div>}
              
        </div>
    )


}