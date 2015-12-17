'use strict';

var chai = require('chai');
var should = chai.should();
var supertest = require('supertest');

var server = supertest.agent('http://localhost:8080');

describe('Material route', () => {
    var token;
    before((done) => {
        server
            .post('/api/authenticate')
            .send({ email: 'they@gmail.com', password: '$cotland' })
            .end((err, res) => {
                token = res.body.token;
                done();
            });
    });
    describe('POST - /api/material --- adds a new material', () => {
        it('should return 403 status code if no siding name is submitted', (done) => {
            server
                .post('/api/material')
                .send({ token: token })
                .expect('Content-type', /json/)
                .expect(403)
                .end((err, res) => {
                    res.body.error.should.be.a('string');
                    res.body.success.should.equal(false);
                    res.status.should.equal(403);
                    done();
                });
        });
        it('should return 403 status code if only spaces are submitted as a material name', (done) => {
            server
                .post('/api/material')
                .send({ token: token, name: '            ' })
                .expect('Content-type', /json/)
                .expect(403)
                .end((err, res) => {
                    res.body.error.should.be.a('string');
                    res.body.success.should.equal(false);
                    res.status.should.equal(403);
                    done();
                });
        });
        it('should log a new material to the database', (done) => {
            server
                .post('/api/material')
                .send({ token: token, name: 'plaster' })
                .expect('Content-type', /json/)
                .expect(200)
                .end((err, res) => {
                    res.body.error.should.equal(false);
                    res.body.success.should.equal(true);
                    res.status.should.equal(200);
                    done();
                });
        });
    });
    describe('DELETE - /api/material/:id --- deletes a material', () => {
        it('should return a 422 status code if an item that does not exist is asked to be deleted', (done) => {
            server
                .delete('/api/material/566b8a543b1nope4c1fb0daf')
                .send({ token: token })
                .expect('Content-type', /json/)
                .expect(422)
                .end((err, res) => {
                    res.body.error.should.be.a('string');
                    res.body.success.should.equal(false);
                    res.status.should.equal(422);
                    done();
                });
        });
    });
    describe('POST - /ap/material/:id --- toggles whether a siding style is associated with the material', () => {
        it('should return a 403 status code if a valid id is not sent', (done) => {
            server
                .post('/api/material/asdlkfjaslkdjf')
                .send({ token: token })
                .expect('Content-type', /json/)
                .expect(422)
                .end((err, res) => {
                    res.body.error.should.be.a('string');
                    res.body.success.should.equal(false);
                    res.status.should.equal(422);
                    done();
                });
        });
        it('should return 422 if the submitted material id is not found in the database', (done) => {
            server
                .post('/api/material/asdlkfjaslkdjf:asdfasdfakjshdlkfjha')
                .send({ token: token })
                .expect('Content-type', /json/)
                .expect(422)
                .end((err, res) => {
                    res.body.error.should.be.a('string');
                    res.body.success.should.equal(false);
                    res.status.should.equal(422);
                    done();
                });
        });
        //////// we gotta get some mocking going on
    });
});






