
const { Router } = require('express');

const {Dogs,Temperaments,Breed_groups}=require('../db.js');

const router = Router();
const axios=require('axios');

const breedsRoute='https://api.thedogapi.com/v1/breeds';
//let obj={name:''}

router.get('/', (req,res,next)=>{
     const name=req.query.name
     
    // if(name){console.log('kk')}
        let obj={}
        let aux=[]
        axios.get(breedsRoute)
        .then((r)=>{return r.data.map(e=>{
            obj={
                name:e.name,
                life_span:e.life_span,
                weight:e.weight.metric.split('-').length===2?e.weight.metric:
                `${e.weight.metric*1-3} - ${e.weight.metric!=="NaN"?e.weight.metric:'30'}`,
                height:e.height.metric,
                createInDatabase:false,
                image:e.image.url,
                id:e.id,
                bred_for:e.bred_for===undefined?'Desconocido':e.bred_for===""?'Desconocido':e.bred_for,
                breed_group:e.breed_group===undefined?'Desconocido':e.breed_group===""?'Desconocido':e.breed_group,
                temperaments:e.temperament!==null&&e.temperament!==undefined&&e.temperament.split(',')
            }
            let corregirW=obj.weight.split('-')
            if(corregirW[0]==="NaN "){
                obj.weight=`${corregirW[1]*1-3}-${corregirW[1]}`
            }
            let corregirH=obj.height.split('-')
            if(!corregirH[1]){
                obj.height=`${corregirH[0]*1-8} - ${corregirH[0]}`
            }
            let corregirLife=obj.life_span.split(' ')
            if(corregirLife.length<4){
                obj.life_span=`${corregirLife[0]*1-5} - ${corregirLife[0]} years`
            }
            if (corregirLife.length>4){
                obj.life_span=`${corregirLife[0]} - ${corregirLife[2]} years`

            }
           // console.log(corregirLife)
            //console.log(obj.life_span)
           // console.log(obj.breed_group)
            console.log(obj.bred_for.split(','))
            aux.push(obj)
             })
        })
      
        .then(()=>{return   Dogs.findAll({
            attributes:['name','life_span','weight','height','createInDatabase','image','id',
            'breed_groupsId'],
            include:[{
                model:Temperaments,
                attributes:['name'],
                through:{attributes:[]},
                
          
            }]
            //  ,{

            // model:Breeds_groups,
            // attributes:['name'],
            // //through:{attributes:[]},
            // }]




                     }) 
        })
       
        .then((r)=>{return [...aux,...r]
        
        })

        .then((r)=>{

             !name&&res.status(200).send(r);
             

             if(name){ let resp=r.filter(e=>e.name&&e.name.toLowerCase().match(name.toLowerCase()))
               
               if(resp.length>0){return res.status(200).send(resp)};

               return res.status(200).send({name:'no hay match',height:'1-1',weight:'1-1',life_span:'1-1',image:''})
                
            
            };

            
        
        
        })

        
       // .then((r)=>{return res.send(r)})
        .catch(e=>{console.log(e)});
  
});

router.get('/:id',(req,res,next)=>{
    const {id}=req.params
    let obj={}
    let aux=[]
    let respuestaApi=axios.get(breedsRoute)
    .then((r)=>{return r.data.map(e=>{
        // let corregir=e.weight.metric.split('-')
        // if(corregir.length===1){
        //     let ajuste=`1-${corregir[0]}`
        // }
        obj={
            name:e.name,
            life_span:e.life_span,
            weight:e.weight.metric.split('-').length===2?e.weight.metric:
            `${e.weight.metric*1-3} - ${e.weight.metric!=="NaN"?e.weight.metric:'30'}`,
            height:e.height.metric,
            createInDatabase:false,
            image:e.image.url,
            id:e.id,
            bred_for:e.bred_for===undefined?'Desconocido':e.bred_for===""?'Desconocido':e.bred_for,
            breed_group:e.breed_group===undefined?'Desconocido':e.breed_group===""?'Desconocido':e.breed_group,
            temperaments:e.temperament!==null&&e.temperament!==undefined&&e.temperament.split(',')
        }
        let corregirW=obj.weight.split('-')
        if(corregirW[0]==="NaN "){
            obj.weight=`${corregirW[1]*1-3}-${corregirW[1]}`
        }
        let corregirH=obj.height.split('-')
        if(!corregirH[1]){
            obj.height=`${corregirH[0]*1-8} - ${corregirH[0]}`
        }
        let corregirLife=obj.life_span.split(' ')
        if(corregirLife.length<4){
            obj.life_span=`${corregirLife[0]*1-5} - ${corregirLife[0]} years`
        }
        if (corregirLife.length>4){
            obj.life_span=`${corregirLife[0]} - ${corregirLife[2]} years`

        }
        aux.push(obj)
         })
    })
  
    .then(()=>{return   Dogs.findAll({
        attributes:['name','life_span','weight','height','createInDatabase','image','id',
        'breed_groupsId'],
        include:[{
            model:Temperaments,
            attributes:['name','id'],
            through:{attributes:[]}
        }]
                 }) 
    })
   
    .then((r)=>{return [...aux,...r]
    
    })

    .then((r)=>{

        

         if(id){ 
            let resp=r.filter(e=>e.id&&e.id.toString()===id.toString())

             if(resp.length>0){ 
              //  console.log('manda id si hay') 
                return res.send(resp)};



           res.status(200).send({msg:'no hay match'})
            
        
        };

        
    
    
    })

    
  
    .catch(e=>{console.log(e)});



})

router.post('/',(req,res,next)=>{
    const {name,life_span,weight,height,temperaments}=req.body
    
   

    Dogs.findOrCreate({
        where:{
            name:name,
            life_span:life_span,
            weight:weight,
            height:height,
           
            image:''}
    })
    .then(()=>{return Dogs.findOne({
        where:{name:name,
            life_span:life_span,
            weight:weight,
            height:height,
            createInDatabase:true
        },
        include:["temperaments"]
    })
    })

    .then((r)=>{ 
     //   if(r.temperaments){
            const aux=r.temperaments.map(t=>{return t.id*1})
        
        for(let e of temperaments){
            Temperaments.findOne({where:{id:e}})
            .then(()=>{
                if(!aux.includes(e*1)){
                r.addTemperaments(e);
                console.log('creando')};
                console.log(aux)   
            
            })
          
            .catch((e)=>console.log(e)); 
        }
    })

    .catch(e=>{console.log(e)});


})


router.delete('/:id',(req,res,next)=>{
    const {id}=req.params
    Dogs.destroy({
        where:{id:id}
    }).then( (resp)=>{
        if(resp){
            console.log('borrado')
        }else{
            console.log('no lo encontre')
        }
    })
    .catch((err)=>console.log(err))
    console.log('pego delete')
})
router.put('/:id',(req,res,next)=>{
    const{id}=req.params
    const{name,life_span,weight,height,temperaments}=req.body
    Dogs.update(
        {
            name:name,
            life_span:life_span,
            weight:weight,
            height:height,
            temperaments:temperaments,


        },{
        where:{id:id}
    })
    .then(()=>{return Dogs.findOne({where:{id:id}})})
    .then(r=>{
        //const aux=r.temperaments.map(t=>{return t.id*1})
        r.setTemperaments([])
        for(let e of temperaments){
            Temperaments.findOne({where:{id:e}})
            .then(()=>{
              
                r.addTemperaments(e);
                })
            }
         
       
    })
    .then(()=>res.status(200).end('termine'))
    .catch(err=>console.log(err))
    console.log('pego put')
})

router.get('/temperaments/:temperaments',(req,res,next)=>{
    const {temperaments}=req.params
    Dogs.findAll({
        attributes:['name','height','weight','life_span','createInDatabase','image','id'],
        include:[{
            attributes:['name','id'],
            model:Temperaments,
           
            
            where:{name:temperaments}
        }]
    })
    .then((r)=>{return res.send(r)})
    .catch(err=>console.log(err))
})



module.exports=router