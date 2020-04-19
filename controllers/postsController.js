function postsController(Entry) {
  // eslint-disable-next-line consistent-return
  async function post(req, res) {
    const entry = new Entry(req.body);
    if (!req.body.title) {
      res.status(400);
      return res.send('Title is required');
    }

    await entry.save((err) => {
      if (err) {
        res.send(err);
      }
      res.status(201);
      return res.json(entry);
    });
  }

  async function get(req, res) {
    const query = {};
    if (req.query.title) {
      query.title = req.query.title;
    }

    if (req.query.content) {
      query.content = req.query.content;
    }

    if (req.query.published) {
      query.published = req.query.published;
    }

    await Entry.find(query, (err, entries) => {
      if (err) {
        return res.send(err);
      }

      const returnEntries = entries.map((entry) => {
        const newEntry = entry.toJSON();
        newEntry.links = {};
        // eslint-disable-next-line no-underscore-dangle
        newEntry.links.self = `http://${req.headers.host}/api/posts/${entry._id}`;

        return newEntry;
      });

      return res.json(returnEntries);
    });
  }
  return { post, get };
}

module.exports = postsController;
