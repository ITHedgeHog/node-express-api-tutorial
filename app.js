const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
// eslint-disable-next-line no-unused-vars
let port;
if (process.env.ENV === 'Test') {
  // eslint-disable-next-line no-unused-vars
  const db = mongoose.connect('mongodb://localhost/rpg1_test', { useNewUrlParser: true, useUnifiedTopology: true });
  port = process.env.PORT || 3050;
} else {
  // eslint-disable-next-line no-unused-vars
  const db = mongoose.connect('mongodb://localhost/rpg1', { useNewUrlParser: true, useUnifiedTopology: true });
  port = process.env.PORT || 3000;
}


const Entry = require('./models/entryModel');
const postRouter = require('./routes/postsRouter')(Entry);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/api', postRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my RPG API');
});

// eslint-disable-next-line no-console
app.server = app.listen(port, () => { console.log(`running on port ${port}`); });

module.exports = app;
