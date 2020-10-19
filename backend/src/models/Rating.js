const { Schema, model } = require('mongoose');

const RatingSchema = new Schema({
  curierId: String,
  clientId: String,
  rating: Number,
});

module.exports = model('ratings', RatingSchema);
