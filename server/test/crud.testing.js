const app = require('../server')
const user_router = require('../routes/user_routes');
const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;
chai.use(chaiHttp);

describe('CRUD Operation Checker for each Database', () => {
    it('GET /users should return all users', (done) => {
        chai.request(user_router)
        .get('/')
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    })
})