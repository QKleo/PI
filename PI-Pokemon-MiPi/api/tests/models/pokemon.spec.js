const { Pokemons, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Pokemons model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('no hay conexion a la database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Pokemons.sync({ force: true }));
    describe('name', () => {
      it('muestra error si name is null', (done) => {
        Pokemons.create({})
          .then(() => done(new Error('name es requerido ')))
          .catch(() => done());
      });
      it('si name es valido lo crea', () => {
        Pokemons.create({ name: 'Pikachu' });
      });
    });
  });
});
