module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        _id: String,
        backdrop: String,
        cast: [String],
        classification: String,
        director: String,
        genres: [String],
        imdb_rating: Number,
        length: String,
        overview: String,
        poster: String,
        released_on: Date,
        slug: String,
        title: String,
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, ...object } = this.toObject();
      object.id = this._id;
      return object;
    });
  
    const MoviesList = mongoose.model("MovieList", schema);
    return MoviesList;
  };
  