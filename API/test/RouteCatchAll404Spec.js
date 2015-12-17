'use strict';

var chai = require('chai');
var should = chai.should();
var supertest = require('supertest');

var server = supertest.agent('http://localhost:8080');

describe('Last Catch-all Route', () => {
    it('should return a 404 status code', (done) => {
        server
            .get('/paintwithallthecolorsofthewind')
            .expect('Content-type', /json/)
            .expect(404)
            .end((err, res) => {
                res.status.should.equal(404);
                res.body.success.should.equal(false);
                res.body.error.should.equal('not a route');
                done();
            });
    });
});