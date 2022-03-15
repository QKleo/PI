const { DataTypes, INTEGER } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Countries', {
    id:{
      type:DataTypes.STRING,
      allowNull:false,
      primaryKey:true
      
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
      
    },
    bandera :{
      type:DataTypes.STRING,
      allowNull:false
    },
    continente:{
      type:DataTypes.STRING,
      allowNull:false
    },
    capital:{
      type:DataTypes.STRING,
      allowNull:false
    },
    subregion:{
      type:DataTypes.STRING,
      allowNull:true
    },
    area:{
      type:DataTypes.STRING,
      allowNull:true
    },
    poblacion:{
      type:INTEGER,
      allowNull:true
    },
    createInDb:{
      type:DataTypes.BOOLEAN,
      defaultValue:false
      
    },
   
  });
  
};
