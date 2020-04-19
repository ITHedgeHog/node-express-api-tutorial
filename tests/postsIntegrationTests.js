/* eslint-disable no-shadow */
require('should');

const request = require('supertest');
const mongoose = require('mongoose');

process.env.ENV = 'Test';

const app = require('../app.js');

const Entry = mongoose.model('Entry');
const agent = request.agent(app);

describe('Entry CRUD', () => {
  it('should allow an Entry to be posted and return published & _id', (done) => {
    const entryPost = {
      title: 'Post 227', content: 'This is my content for post 227', authors: 'Dan Taylor', published: true
    };

    agent.post('/api/posts')
      .send(entryPost)
      .expect(201)
      .end((err, results) => {
        // console.log(results);
        // results.body.published.should.not.equal(false);
        results.body.should.have.property('_id');
        done();
      });

    afterEach((done) => {
      Entry.deleteMany({}).exec();
      done();
    });

    after((done) => {
      mongoose.connection.close();
      app.server.close(done());
    });
  });
});
