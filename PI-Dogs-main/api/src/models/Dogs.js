const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dogs', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height:{
      type: DataTypes.STRING,
      allowNull:false
    },
    weight:{
      type:DataTypes.STRING,
      allowNull:false
    },
    life_span:{
      type:DataTypes.STRING,
    },
    id:{
      type:DataTypes.UUID,
      allowNull:false,
      primaryKey:true,
      defaultValue:DataTypes.UUIDV4
    },
    createInDatabase:{
      type:DataTypes.BOOLEAN,
      defaultValue:true

    },
    image:{
      type:DataTypes.STRING
    }
  });
};

//ID *
//- Nombre *
//- Altura *
//- Peso *
//- Años de vida