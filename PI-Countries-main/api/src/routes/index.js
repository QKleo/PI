const axios = require('axios');
const { Router } = require('express');
//const { route } = require('../app.js');
//const { crearTurismos } = require('../cagarDb.js');
const {Countries,Turismos} =require('../db.js');
//const Turismo = require('../models/Turismo.js');
//let agregarTurismo=require('../agregarTurismo.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const imagenDefault='countries.png'

const router = Router();
const countryRoute=require('./country.js');
const paisesTurismos=require('./paisesTurismos.js');
const crearTurismos=require('./crearTurismos.js');
const vincularPaisTurismos=require('./vincularPaisTurismos.js');
const countries=require('./countries.js');
const turismos=require('./turismos.js')
//const { use } = require('chai');
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//countries?name=
//col.match(cacocla)
router.use('/turismos',turismos)



router.use('/countries',countries)

//----------------------------------------------------no la uso
router.use('/country',countryRoute)

//------------------------------------------------------modificar vinculos   


router.use('/vincularPaisTurismos',vincularPaisTurismos)


//--------------------------------------------------------    
router.post('/Activity',async (req,res,next)=>{
    const value=req.body
    await agregarTurismo(value)
    res.status(200).send({msg:'turismo creado :)'})
})       
//-------------------------------------------------------no la uso
router.get('/ordenarPaises',async(req,res,next)=>{
   const atributo=req.query.atributo;
   const condicion=req.query.condicion;
   
   
   //.slice(1,(condicion.length)-1)
   
    let orden=await Countries.findAll({
        order:[[atributo , condicion]]
    })

    res.status(200).send(orden)
    
    // else if(condicion==="DESC"){
    //     let orden= await Countries.findAll({
    //         order:[[atributo ,"DESC"]]
    //     })
    //     return res.status(200).send(orden)
    // }
})
//--------------------------------------------------------------
router.use('/crearTurismos',crearTurismos)

//---------------------------------------------------
router.use('/paisesTurismos',paisesTurismos)


module.exports = router;