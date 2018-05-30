/* global define, it, describe, beforeEach, document */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../server/app');

const { fakeBlogs, nonExistentObjectId, createAuthorInDB, createBlogInDB } = require('../lib/fake');

const expect = chai.expect;
chai.use(chaiHttp);

describe('/api/blogs', function () {
    this.timeout(6500);

    it('GET /api/blogs/ should respond with blogs', (done) => {
        chai.request(app)
            .get('/api/blogs')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.instanceOf(Array);
                done();
            })
    });

    it('GET /api/blogs/featured should respond with featured blogs only', (done) => {
        chai.request(app)
            .get('/api/blogs/featured')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.instanceOf(Array);
                expect(res.body.every(blog => blog.featured)).to.be.true;
                done();
            })
    });

    it('GET /api/blogs/:id should respond with a blog when a valid ID is presented', (done) => {
        createAuthorInDB().then(createBlogInDB).then(blog => {
            chai.request(app)
                .get(`/api/blogs/${blog.id}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.instanceOf(Object);
                    expect(res.body.id).to.equal(blog.id);
                    done();
                })
        });
    });

    it('GET /api/blogs/:id should respond with 404 when an invalid ID is passed', (done) => {
        chai.request(app)
            .get(`/api/blogs/${nonExistentObjectId}`)
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
    });

    it('PUT /:id should update a blog', (done) => {
        createAuthorInDB().then(createBlogInDB).then(blog => {
            chai.request(app)
                .put(`/api/blogs/${blog.id}`)
                .send({ title: 'Hello World' })
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(204);

                    chai.request(app)
                        .get(`/api/blogs/${blog.id}`)
                        .end((err, res) => {
                            expect(err).to.be.null;
                            expect(res).to.have.status(200);
                            expect(res.body.id).to.equal(blog.id);
                            expect(res.body.title).to.not.equal('Helo World');
                            done();
                        })
                });
        });
    });

    it('DELETE /:id should delete a blog', (done) => {
        createAuthorInDB().then(createBlogInDB).then(blog => {
            chai.request(app)
                .delete(`/api/blogs/${blog.id}`)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);

                    chai.request(app)
                        .get(`/api/blogs/${blog.id}`)
                        .end((err, res) => {
                            expect(res).to.have.status(404);
                            done();
                        });
                });
        });
    });
});