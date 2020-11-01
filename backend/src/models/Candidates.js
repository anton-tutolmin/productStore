const { Schema, model } = require('mongoose');

const CandidateSchema = new Schema({
  orderId: {
    type: String,
    index: true,
  },
  curierId: {
    type: String,
    index: true,
  },
});

module.exports = model('candidates', CandidateSchema);
