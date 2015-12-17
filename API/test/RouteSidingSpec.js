var chai = require('chai');
var should = chai.should();
var supertest = require('supertest');
var Siding = require('./../app/models/siding');

var server = supertest.agent('http://localhost:8080');

describe('Siding route', () => {
    var token;
    before((done) => {
        server
            .post('/api/authenticate')
            .send({ email: 'they@gmail.com', password: '$cotland' })
            .end((err, res) => {
                token = res.body.token;
                done();
            });
        // function setItemToBeDeleted() {
        //     console.log('2');
        //     server
        //         .post('/api/siding')
        //         .send({ name: sidingName , token: token })
        //         .end((err, res) => {
        //             console.log('3');
        //             getIdItemToDelete();
        //         });
        // }
        // function getIdItemToDelete() {
        //     Siding.find({name: sidingName }, (err, siding) => {
        //         if (err) {
        //             console.log(err);
        //             done();
        //         } else if (!siding) {
        //             console.log('not found');
        //             done();
        //         } else {
        //             deleteItemId = siding.id;
        //             console.log(deleteItemId);
        //             done();
        //         }
        //     });
        // }
    });
    describe('POST -- /api/siding', () => {
        it('should return 403 status code if no siding name is submitted', (done) => {
        server
            .post('/api/siding')
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
        it('should return 403 status code if only spaces are submitted as a siding name', (done) => {
            server
                .post('/api/siding')
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
        it('should log a new siding to the database', (done) => {
            server
                .post('/api/siding')
                .send({ token: token, name: 'structolite' })
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
    describe('DELETE -- /api/siding/:id', () => {
        it('should return a 422 status code if an item that does not exist is asked to be deleted', (done) => {
            server
                .delete('/api/siding/566b8a543b1nope4c1fb0daf')
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
        xit('should delete a siding from the database', (done) => {
            var sidingTestName = '856747ertdfgyut67';
            
        });
    });
});







