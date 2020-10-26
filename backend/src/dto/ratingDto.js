class RatingDto {
  constructor({ clientId, curierId, rating }) {
    this.clientId = clientId;
    this.curierId = curierId;
    this.rating = rating;
  }
}

module.exports = {
  RatingDto,
};
