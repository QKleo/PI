

import { useSelector } from "react-redux"
import { useEffect } from "react"
import { eliminarDogsDb ,filtrar,obtenerTodosDogs} from "../reducer/actions"
import imagen from '../../src/dog.png'
import { useDispatch } from "react-redux"
import { limpiarDog } from "../reducer/actions"
import { Link } from "react-router-dom"
import './Card.css'

export default function Card(){
    
    let obj={}
    
    let temperaments=''
    
    let Dog=useSelector((state)=>state.Dog)
    let Dogs=useSelector((state)=>state.Dogs)
    let estadoBreedGroup=useSelector((state)=>state.BreedsGroup)
    const dispatch=useDispatch()
  //  useEffect(()=>{mostrar()})
    
    
    


    
   
    for(let e of Dog){
        if(typeof(e)==='object'){
            temperaments=e.temperaments
           
        }
        obj={
            name:e.name,
            id:e.id,
            image:e.image,
            life_span:e.life_span,
            weight:e.weight,
            height:e.height,
            bred_for:e.bred_for!==undefined?e.bred_for:'Desconocido',
            breed_group:e.breed_group!==undefined&&e.breed_group!==null?
                         e.breed_group:'Desconocido',
            breed_groupsId:e.breed_groupsId&&e.breed_groupsId,
            //     estadoBreedGroup.length>0&&estadoBreedGroup.filter(j=>
            //         e.breed_groupsId===j.id):'no estoy',
    

            createInDatabase:e.createInDatabase,
        }
    }
    if(obj.createInDatabase){
        if(obj.breed_groupsId){
    let coincideBreed=estadoBreedGroup.filter(e=>e.id===obj.breed_groupsId)
    obj.breed_groupsId=coincideBreed[0].name}else{obj.breed_groupsId='Desconocido'}}
    //console.log(coincideBreed[0].name)}

    return(
        <div className="vista">
               
            
            <div className="giro">
            <div  className="giro-interno"  >
            <div className="giro-frontal">
            <img src={obj.image!==''?obj.image:imagen} width='300px' alt="" />
            <br />
            </div>
            <div className="giro-detras" style={{textAlign:'left'}}>
            <li> name:{obj.name}</li>
            <li >id:{obj.id}</li>
            <li>life_span:{obj.life_span}</li>
            <li>weight:{obj.weight}</li>
            <li>height:{obj.height}</li>
            {!obj.createInDatabase?<li>breed_group:{obj.breed_group}</li>:
            
            <li>breed_group:{obj.breed_groupsId}</li>}
            <li><span>breed_for:{obj.bred_for} </span></li>
           
            </div>
            
            </div>
            </div>

            <div className="temperaments">
                {temperaments.length>0&&temperaments.map(e=>
                    
                    typeof(e)==='object'?<li key={e.id}> {e.name} 
                    </li>:
                    <li key={temperaments.indexOf(e)}>{e}</li>
                    
                    
                )}
              
                {obj.createInDatabase&&<button className="btn" onClick={()=>{dispatch(eliminarDogsDb(obj.id));

                dispatch(limpiarDog());dispatch(obtenerTodosDogs())
                 }}>Eliminar en DB</button>}
                {obj.createInDatabase&&<Link to='/forms'><button className="btn">Actualizar</button></Link>}

            </div>

            

                
        </div>
    )
}