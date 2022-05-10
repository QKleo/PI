
const {Pokemons}=require('./db.js')

let array=[
    {
        
        name:'henry',
        image:'',
        height:60,
        weight:100,
        hp:63,
        defense:60,
        attack:75,
        speed:45,
    },
{
    name:'timoteo',
    image:'',
    height:60,
    weight:88,
    hp:63,
    defense:76,
    attack:55,
    speed:35,
}]

function crearPokemonsInicio(){

    array.forEach((e) => {
            Pokemons.create({
            name:e.name,
            image:e.image,
            height:e.height,
            weight:e.weight,
            hp:e.hp,
            defense:e.defense,
            attack:e.attack,
            speed:e.speed,
        })
        .then(()=>{console.log('Pokemons en BD')})
        .catch((err)=>{console.log(err)})

    });
   

}

module.exports={crearPokemonsInicio}