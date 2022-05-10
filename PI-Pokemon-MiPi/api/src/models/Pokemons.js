const { DataTypes }  = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemons', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image:{
      type:DataTypes.STRING,
    },
    hp:{
      type:DataTypes.INTEGER,
    },
    defense:{
      type:DataTypes.INTEGER,
    },
    attack:{
      type:DataTypes.INTEGER,
    },
    speed:{
      type:DataTypes.INTEGER,
    },
    height:{
      type:DataTypes.INTEGER,
    },
    weight:{
      type:DataTypes.INTEGER,
    },
    createInDatabase:{
      type:DataTypes.BOOLEAN,
      defaultValue:true,
    },
    id:{
      type:DataTypes.UUID,
      allowNull:false,
      primaryKey:true,
      defaultValue:DataTypes.UUIDV4
    },
  });
};
//- ID (Número de Pokemon) * : No puede ser un ID de un pokemon ya existente en la API pokeapi
//- Nombre *
//- Vida
//- Fuerza
//- Defensa
//- Velocidad
//- Altura
//- Peso

// id:info.data.id,
// name:info.data.name,*
// image:info.data.sprites.other.home.front_default,*
// height:info.data.height,*
// weight:info.data.weight,*
// hp:info.data.stats[0].base_stat,*
// defense:info.data.stats[2].base_stat,*
// attack:info.data.stats[1].base_stat,*
// speed:info.data.stats[5].base_stat,