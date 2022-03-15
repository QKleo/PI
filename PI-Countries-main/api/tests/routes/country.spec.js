/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Countries,Turismos, conn } = require('../../src/db.js');

const agent = session(app);
const turismo = {
  name: 'pelota canasta',
  dificultad:'5',
  temporada:'Invierno',
  duracion:'7'

};

describe('turismos routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Turismos.sync({ force: true })
    .then(() => Turismos.create(turismo)));
  describe('GET /turismos', () => {
    it('should get 200', () =>
      agent.get('/turismos').expect(200)
    );
  });

  describe('GET /Countries',()=>{
    it('mostrar 200',()=>
    agent.get('/countries').expect(200))
  })

  describe('GET /countries?name=',()=>{
    it('mostrar 200 cuando hay match',()=>
    agent.get('/countries?name=argentina').expect(200))
  })

  describe('GET countries por query',()=>{
    it('mostra mensaje cuando no hay match',()=>
    agent.get('/countries?name=Japon').expect(200))
  })

  describe('GET countries por id',()=>{
    it('buscar por id',()=>
    agent.get('/countries/COL').expect(200))
  })

 

});
