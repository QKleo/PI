const { Router } = require('express');
const { route } = require('./pokemons.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
const pokemons=require('./pokemons.js');
const types=require('./types.js')
const pokemon=require('./pokemon.js')
const pokemonsdb=require('./pokemonsdb.js')
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/pokemons',pokemons)
router.use('/types',types)
router.use('/pokemon',pokemon)
router.use('/pokemonsdb',pokemonsdb)
module.exports = router;
