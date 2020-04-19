/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
const should = require('should');
const sinon = require('sinon');
const postsController = require('../controllers/postsController');

describe('Post Controller Tests', () => {
  describe('Post', () => {
    it('should not allow empty title on post', () => {
      // eslint-disable-next-line func-names
      const Entry = function (entry) { this.save = () => { }; };

      const req = {
        body: {
          content: 'Content'
        }
      };

      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy()
      };

      const controller = postsController(Entry);
      controller.post(req, res);

      res.status.calledWith(400).should.equal(true, `Bad Status ${res.status.args[0][0]}`);
      res.send.calledWith('Title is required').should.equal(true);
    });
  });
});
