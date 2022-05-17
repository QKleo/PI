/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemons, conn } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
  name: 'Pikachu',
};

describe('Pokemons routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('No hay connexio a la database:', err);
  }));
  beforeEach(() => Pokemons.sync({ force: true })
    .then(() => Pokemons.create(pokemon)));
  describe('GET /pokemons', () => {
    it('muestra status 200', async() =>
      await agent.get('/pokemons').expect(200)
    ).timeout(50000);
  });
  it('espera mas de 40 pokes', (done) => { 
    agent.get('/pokemons')
    .then( response => response.body)
    .then( array => {
      expect(array.length >= 40).equal(true)
      done();
    })
    .catch(() => done(new Error('no hay mas de 40 pokemons')));
}).timeout(50000);

});

describe('GET /pokemons/:idPokemon', () => {
  it('muestra  status 200', (done) => {
       agent.get(`/pokemons/25`).expect(200)
       .then(() => done())
       .catch(() => done(new Error('no hay status 200')));
  });

   it('si hay un error 404', (done) => {
      agent.get(`/pokemons/570000`).expect(404)
       .then(() => done())
       .catch(() => done(new Error('no hay status 404')));
   });
 });

