const mongoose = require('mongoose');

const { Schema } = mongoose;

const entryModel = new Schema(
  {
    title: { type: String },
    content: { type: String },
    authors: { type: String },
    published: { type: Boolean, default: false },
  },
);

module.exports = mongoose.model('Entry', entryModel);
