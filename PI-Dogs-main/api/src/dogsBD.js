
const {Dogs}=require('./db.js')


const arrayDogs=[{

    name:'Henry Pug',
    height:'14 - 18',
    weight:'25 - 33',
    life_span:'35 - 45 years',
    image:''
},
{
   name:'Henry Bulldozer',
   height:'30 - 58',
   weight:'35 - 45',
   life_span:'9 - 14 years',
   image:''

}

]

let cargarDogs=()=>{

        arrayDogs.forEach(e=>{

            
           Dogs.create({
              name:e.name,
              height:e.height,
              weight:e.weight,
              life_span:e.life_span,
              image:e.image
           })
           .then(()=>{console.log('ok')})
           .catch(e=>{console.log(e)})
        })

        




}

module.exports={cargarDogs}