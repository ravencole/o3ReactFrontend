'use strict';

var chai = require('chai');
var should = chai.should();
var supertest = require('supertest');

var server = supertest.agent('http://localhost:8080');


describe('Auth route', () => {
    it('should return 403 status code no user and/or password is submitted', (done) => {
        server
            .post('/api/authenticate')
            .send({})
            .expect('Content-type', /json/)
            .expect(403)
            .end((err, res) => {
                res.body.error.should.be.a('string');
                res.body.success.should.equal(false);
                res.status.should.equal(403);
                done();
            });
    });
    it('should return 422 status code if no user is found for the email address submitted', (done) => {
        server
            .post('/api/authenticate')
            .send({ email: 'thiscantberight@netscape.net', password: '$itnalta' })
            .expect('Content-type', /json/)
            .expect(422)
            .end((err, res) => {
                res.body.error.should.be.a('string');
                res.body.success.should.equal(false);
                res.status.should.equal(422);
                done();
            });
    });
    it('should return 422 status code if the wrong password is submitted', (done) => {
        server
            .post('/api/authenticate')
            .send({ email: 'they@gmail.com', password: '$itnalta' })
            .expect('Content-type', /json/)
            .expect(422)
            .end((err, res) => {
                res.body.error.should.be.a('string');
                res.body.success.should.equal(false);
                res.status.should.equal(422);
                done();
            });
    });
    it('should authenticate a user', (done) => {
        server
            .post('/api/authenticate')
            .send({ email: 'they@gmail.com', password: '$cotland' })
            .expect('Content-type', /json/)
            .expect(200)
            .end((err, res) => {
                res.status.should.equal(200);
                res.body.error.should.equal(false);
                res.body.success.should.equal(true)
                should.exist(res.body.token);
                done();
            });
    });
    it('should return 403 status code if no JWT is sent when a request is made to a protected route', (done) => {
        server
            .get('/api')
            .send({})
            .expect('Content-type', /json/)
            .expect(403)
            .end((err, res) => {
                res.status.should.equal(403);
                res.body.error.should.be.a('string');
                res.body.success.should.equal(false);
                done();
            });
    });
    it('should return 403 status code if the wrong token is sent', (done) => {
        let wrongToken = 'eyJ0eXAiOfghjnhbgvftyuhjbgvftgyhujnhI1NiJ9.eyJfaWQiOiI1NjY4OTVjMGEzN2M5NjAwYmFiZDc5OGEiLCJlbWFpbCI6InRoZXlAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkaHpEbmRFbjVhV0JFc3EuaGN6VkJNdTVtRHRmWm9lemlVdDE3YWJVN0NraElSVDdLblVjeUsiLCJfX3YiOjB9.oCfsQdumL62XZ6WlHJHGF67899OIUHYGTR6oXC_6Q3ACtyIjHf3skYYLy9Ats';
        server
            .get('/api')
            .send({ token: wrongToken})
            .expect('Content-type', /json/)
            .expect(403)
            .end((err, res) => {
                res.status.should.equal(403);
                res.body.error.should.be.a('string');
                res.body.success.should.equal(false);
                done();
            });
    });
    it('should allow a user with the correct token through to protected routes', (done) => {
        (() => {
            server
                .post('/api/authenticate')
                .send({ email: 'they@gmail.com', password: '$cotland' })
                .expect('Content-type', /json/)
                .expect(200)
                .end((err, res) => {
                    testAPI(res.body.token);
                });
        })();
        function testAPI(token) {
            server
                .get('/api')
                .send({ token: token })
                .expect('Content-type', /json/)
                .expect(200)
                .end((err, res) => {
                    res.status.should.equal(200);
                    res.body.error.should.equal(false);
                    res.body.success.should.equal(true);
                    done();
                });
        }
    });
});









