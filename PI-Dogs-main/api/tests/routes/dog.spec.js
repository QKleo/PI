/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dogs, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  name: 'Pugi',
  weight:'3-5',
  height:'8,10',
  life_span:'10-8'
};

describe('dogs routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Dogs.sync({ force: true })
    .then(() => Dogs.create(dog)))
   // .catch(err=>console.log(err))
  describe('GET /dogs', () => {
    it('should get 200', () =>
      agent.get('/dogs').expect(200)
    );
  });
  describe('GET /dogs?name=Pugi',()=>{
    
    it('should get 200',(done)=>{
    agent.get('/dogs?name=Pugi').expect(200)
    .then(()=>done())
    })
    
  })
  describe('GET /dogs?name=Pepa pig',()=>{
    it('should get Match',(done)=>{
    agent.get('/dogs?name=Pepa pig').expect(
      {
        name:'no hay match',
        height:'1-1',
        weight:'1-1',
        life_span:'1-1',
        image:'',

      })
    
      .then(()=>done())
      .catch((e)=>console.log(e))

    })

  })
})
