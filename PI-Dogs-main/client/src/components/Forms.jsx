import { Link } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { useEffect } from "react"
import { actualizarDog, enviarBreedGroups, enviarFormulario, limpiarDog, limpiarDogs, obtenerTodosTemperaments } from "../reducer/actions"
import { obtenerTodosDogs } from "../reducer/actions"
import './Home.css'


export default function Forms(){

const objetoMostar={}
const dispatch=useDispatch()
const temperaments=useSelector((state)=>state.Temperaments)
const dogs=useSelector((state)=>state.Dogs)
const dog=useSelector((state)=>state.Dog)
const breedsGroup=useSelector((state)=>state.BreedsGroup)
useEffect(()=>dispatch(obtenerTodosTemperaments()),[dogs.length])
let dogObj={}
let actualizar=true
if(dog===''|| dog.length===0){ actualizar=false}

dog!==''&&dog.map(e=>{
    dogObj={
    id:e.id,    
    name: e.name,
    height:e.height,
    weight:e.weight,
    life_span:e.life_span,
    temperaments:e.temperaments.map(e=>e.id),
    breed_group:e.breed_groupsId&&breedsGroup.filter(j=>  j.id===e.breed_groupsId),
    }
})
    

if(actualizar){
    let ayuda=dogObj.breed_group&&dogObj.breed_group[0].name
    dogObj.breed_group=ayuda
}

const [forms,setforms]=useState({

    name:actualizar?dogObj.name:'',
    heightMax:actualizar?dogObj.height.split(' ')[2]:'',
    heightMin:actualizar?dogObj.height.split(' ')[0]:'',
    weightMax:actualizar?dogObj.weight.split(' ')[2]:'',
    weightMin:actualizar?dogObj.weight.split(' ')[0]:'',
    life_spanMax:actualizar?dogObj.life_span.split(' ')[2]:'',
    life_spanMin:actualizar?dogObj.life_span.split(' ')[0]:'',
    temperaments:actualizar?dogObj.temperaments:[],
    breed_group:actualizar&&dogObj.breed_group,
    

})
    
   // console.log(dogObj.breed_group[0].name,'estoy')
    function validarNumero(str,len){
        if(str.length>len){return false}
        if(str*1>200){return false}
    return parseInt(str*1)&&true
    }

    function validarCadena(str,len){
       
        
        if(str.length>len){return false}
        
            str=str.split(' ').join('')
            let primero=/\W/.test(str)
            let segundo=/\d/.test(str)
            
            return !primero && !segundo 
          
    }

    function validarTemperament(arr,value){
        if(actualizar){
           arr=arr.map(e=>{return `${e}`})
           console.log(arr)
        }
        return !arr.includes(value)
    }

    function handleOnChange(e){
        e.preventDefault()
        const{name,value}=e.target
        name==='temperaments'&&setforms({...forms,[name]:validarTemperament(forms[name],value)?
            [value,...forms[name]]:forms[name]})

        name==='name'&&setforms({...forms,[name]:validarCadena(value,25)?
                        value:window.alert('lenght max 25,solo caracteres alfabeticos')?'':''}) 

        name==='weightMax'&&setforms({...forms,[name]:validarNumero(value,3)?value
        :window.alert('no no')?'':''})
        name==='weightMin'&&setforms({...forms,[name]:validarNumero(value,3)?value
            :window.alert('no no')?'':''})
        name==='life_spanMax'&&setforms({...forms,[name]:validarNumero(value,2)?value
        :window.alert('no..no')?'':''})
        name==='life_spanMin'&&setforms({...forms,[name]:validarNumero(value,2)?value
            :window.alert('no..no')?'':''})
        name==='heightMax'&&setforms({...forms,[name]:validarNumero(value,3)?value
        :window.alert('no ,no')?'':''})
        name==='heightMin'&&setforms({...forms,[name]:validarNumero(value,3)?value
            :window.alert('no ,no')?'':''})

        name==='breed_group'&&setforms({...forms,[name]:value})
    }

    function handleOnClick(e){
        e.preventDefault(e)
        
        let formulario={
            name:forms.name.length>0&&forms.name[0].toUpperCase()+forms.name.slice(1),
            height:`${forms.heightMin} - ${forms.heightMax}`,
            weight:`${forms.weightMin} - ${forms.weightMax}`,
            life_span:`${forms.life_spanMin} - ${forms.life_spanMax} years`,
            temperaments:forms.temperaments
        

        }
        if(formulario.name.length>0&&forms.heightMax!==''&&forms.heightMin!==''&&
        forms.weightMax!==''&&forms.weightMin!==''&&forms.life_spanMax!==''
        &&forms.life_spanMin!==''){
            if(forms.life_spanMax*1>forms.life_spanMin*1&&forms.weightMax*1>forms.weightMin*1
                &&forms.heightMax*1>forms.heightMin*1){
                    if(actualizar){
                        dispatch(actualizarDog(dogObj.id,formulario));

                        if(forms.breed_group){ 
                            dispatch(enviarBreedGroups({dogs:dogObj.id,breed_groups:forms.breed_group}))
                        }
                        dispatch(limpiarDog());
                        setforms({
                            name:'',
                            heightMax:'',
                            heightMin:'',
                            weightMax:'',
                            weightMin:'',
                            life_spanMax:'',
                            life_spanMin:'',
                            temperaments:[],

                        })
                        
                      //  dispatch(obtenerTodosDogs());
                    }else{
                        dispatch(enviarFormulario(formulario))
                        setforms({
                            name:'',
                            heightMax:'',
                            heightMin:'',
                            weightMax:'',
                            weightMin:'',
                            life_spanMax:'',
                            life_spanMin:'',
                            temperaments:[],

                        })
            
            
            }
            }
            else{window.alert('error max vrs min')}
        }else{window.alert('faltan datos')}
    }

   



    return(
        <div>
            

            <div>
                <Link to='/dogs'><button className="btn"onClick={()=>{dispatch(limpiarDogs());dispatch(obtenerTodosDogs());dispatch(limpiarDog())}}>volver</button></Link>
            </div>
            <form action="" autoComplete="off">
            <div>
                <select className="btn"name="temperaments" id="" onChange={(e)=>handleOnChange(e)} value={''}>
                        <option>seleccione</option>
                    {temperaments.map(e=>

                      {  { objetoMostar[e.id]=e.name}
                            
                        

                    return  e.name!==''&&  <option className="btn" key={e.id} value={e.id}>{e.name}</option>
                    }
                        
                        
                        )}


                </select>

            <input className="btn"type="text" name='name' value={forms.name} placeholder=
                {dogObj.name?dogObj.name:'name'} 
            onChange={(e)=>handleOnChange(e)}/>

            </div>

                        <div>
                            <div>
                            <label className="btn"htmlFor="">heightMax</label>
                            <input className="btn"type='text' name='heightMax' value={forms.heightMax}
                            onChange={(e)=>handleOnChange(e)} placeholder={dogObj.height?dogObj.height.split(' ')[2]
                        :'heightMax'}/>
                            <label className="btn"htmlFor="">heightMin</label>
                            <input className="btn"type='text' name='heightMin' value={forms.heightMin}
                            onChange={(e)=>handleOnChange(e)} 
                            placeholder={dogObj.height?dogObj.height.split(' ')[0]:'heightMin'}/>
                            </div>
                             {/* ------------------ */}
                            <div>
                            <label className="btn"htmlFor="">weigthMax</label>
                            <input className="btn"type='text' name='weightMax' value={forms.weightMax}
                            onChange={(e)=>handleOnChange(e)}
                            placeholder={dogObj.weight?dogObj.weight.split(' ')[2]:'weightMax'}/>

                            <label className="btn"htmlFor="">weigthMin</label>
                            <input className="btn"type='text' name='weightMin' value={forms.weightMin}
                            onChange={(e)=>handleOnChange(e)}
                            placeholder={dogObj.weight?dogObj.weight.split(' ')[0]:'weightMin'}/>

                            </div>
                            {/* ------------------ */}
                            <div>
                            <label className="btn"htmlFor="">life_spanMax</label>
                             <input className="btn"type='text' name='life_spanMax' value={forms.life_spanMax}
                            onChange={(e)=>handleOnChange(e)}
                            placeholder={dogObj.life_span?dogObj.life_span.split(' ')[2]
                        :'life_spanMax'}/>

                             <label className="btn"htmlFor="">life_spanMin</label>
                             <input className="btn"type='text' name='life_spanMin' value={forms.life_spanMin}
                            onChange={(e)=>handleOnChange(e)}
                            placeholder={dogObj.life_span?dogObj.life_span.split(' ')[0]
                        :'life_spanMin'}/>
                            </div>

                        </div>

                        
                        <button className="btn"onClick={(e)=>handleOnClick(e)}>{actualizar?
                        'Actualizar':'Enviar'}</button>
                        
            </form>
            {!actualizar&&
            <button className="btn" onClick={()=>setforms({
                   name:'',
                   heightMax:'',
                   heightMin:'',
                   weightMax:'',
                   weightMin:'',
                   life_spanMax:'',
                   life_spanMin:'',
                   temperaments:[],

            })}>Limpiar</button>
        }
            <br />
            {/* {forms.temperaments.length>0&&forms.temperaments[0]}  */}
            {forms.temperaments&&forms.temperaments.map((e)=>

           
            <li key={e}>{objetoMostar[e]}  <button onClick={()=> setforms({...forms,['temperaments']:forms.temperaments.filter(el=>el!==e)})} style={{background:'red'}}>x</button></li>
            )}
           
            <br />
                
            {/* {forms.temperaments.length>0&&forms.temperaments[i]}     */}
           
            <br/>
          {actualizar&&'actualizar'}
            formulario
            <div>
               {actualizar&& <select className="btn" name="breed_group" id="" onChange={(e)=>{handleOnChange(e)}   }>

                {breedsGroup.map((e)=>{return e.name!==''&&<option key={e.id}value={e.name}>{e.name}</option>})}
                
                
                </select>}
               {actualizar&& <li style={{color:'white'}}>
                {forms.breed_group}
                {/* /{console.log(forms.breed_group)} */}
                </li>}
                {/* {actualizar&&<button disabled={!forms.breed_group&&true} className="btn" onClick={()=>{
                  dispatch(enviarBreedGroups({dogs:dogObj.id,breed_groups:forms.breed_group}))
                }}>set breeds dog</button>} */}
                

            </div>

        </div>
    )
}