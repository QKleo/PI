//const { use } = require('chai');
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();


const dogs=require('./dogs.js')
const temperaments=require('./temperaments.js')
const breedsGroup=require('./breeds_group.js')
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs',dogs)
router.use('/temperaments',temperaments)
router.use('/breedsGroup',breedsGroup)

module.exports = router;
