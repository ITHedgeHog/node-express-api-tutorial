const express = require('express');
const postController = require('../controllers/postsController');

function routes(Entry) {
  const postRouter = express.Router();
  const controller = postController(Entry);
  postRouter.route('/posts')
    .post(controller.post)
    .get(controller.get);

  postRouter.use('/posts/:postId', (req, res, next) => {
    Entry.findById(req.params.postId, (err, entry) => {
      if (err) {
        return res.send(err);
      }

      if (entry) {
        req.entry = entry;
        return next();
      }
      return res.statusCode(404);
    });
  });
  postRouter.route('/posts/:postId')
    .get((req, res) => {
      const returnEntry = req.entry.toJSON();
      returnEntry.links = {};
      returnEntry.links.filterByPublished = `http://${req.headers.host}/api/posts?published=${req.entry.published}`;
      returnEntry.links.filterByAuthors = `http://${req.headers.host}/api/posts?authors=${req.entry.authors.replace(' ', '%20')}`;
      res.json(returnEntry);})
    .put((req, res) => {
      const { entry } = req;
      entry.title = req.body.title;
      entry.content = req.body.content;
      entry.authors = req.body.authors;
      entry.published = req.body.published;
      entry.save((err) => {
        if (err) {
          return res.send(err);
        }

        return res.json(entry);
      });
    })
    .patch((req, res) => {
      const { entry } = req;

      // eslint-disable-next-line no-underscore-dangle
      if (req.body._id) {
        // eslint-disable-next-line no-underscore-dangle
        delete req.body._id;
      }

      Object.entries(req.body).forEach((item) => {
        const key = item[0];
        const value = item[1];
        entry[key] = value;
      });

      entry.save((err) => {
        if (err) {
          return res.send(err);
        }

        return res.json(entry);
      });
    })
    .delete((req, res) => {
      req.entry.remove((err) => {
        if (err) {
          return res.send(err);
        }
        return res.statusCode(204);
      });
    });


  return postRouter;
}

module.exports = routes;
