'use strict';

var chai = require('chai');
var should = chai.should();
var supertest = require('supertest');

var server = supertest.agent('http://localhost:8080');

describe('All route', () => {
    it('should return json data from the server', (done) => {
        server
            .get('/api/all')
            .expect('Content-type', /json/)
            .expect(200)
            .end((err, res) => {
                should.exist(res.body.materials);
                should.exist(res.body.siding);
                done();
            });
    });
});