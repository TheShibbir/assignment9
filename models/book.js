const mongoose = require('mongoose');
const {Schema} = mongoose;
const bookSchema = new Schema({
  title: { type: String,
    trim :true,
     required: true },
  author: { type: String, required: true },
  description: { type: String },
  publishedYear: { type: Number }
});

module.exports = mongoose.model('Book', bookSchema);
