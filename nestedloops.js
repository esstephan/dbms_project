const filescan = require("./scan");
const { Node } = require("./queryConstructors");

// -> Average
//   -> Projection(lambda r: r.ratings_rating)
//     -> NestedLoopsJoin(lambda r, s: r.id == s.movie_id)
//       -> Selection(lambda r: r.name == 'Medium Cool (1969)')
//         -> FileScan('movies')
//       -> FileScan('ratings')

const joinFunctionStatic = (movie, rating) => {
  console.log("movie", movie, "rating", rating);
  if ((rating.movieId = movie.movieId)) {
    return {
      userId: rating.userId,
      movieId: rating.movieId,
      rating: rating.rating,
      timestamp: rating.timestamp,
      title: movie.title,
      genres: movie.genres
    };
  }
};

class NestedLoopsJoinNode extends Node {
  constructor(joinFunction) {
    super();
    this.state = {
      outerLoopComplete: false,
      innerLoopComplete: false
    };
    this.next = () => {
      let outerRow, innerRow;
      while (!this.state.outerLoopComplete) {
        while (!outerRow) {
          outerRow = this.left.next();
        }

        if (outerRow === "EOF") {
          this.state.outerLoopComplete = true;
          return "EOF";
        }
        while (!this.state.innerLoopComplete) {
          innerRow = this.right.next();
          if (innerRow === "EOF") {
            this.state.innerLoopComplete = true;
          }
          const result = joinFunctionStatic(outerRow, innerRow);
          if (result) {
            return result;
          }
        }
      }
    };
  }
}

module.exports = NestedLoopsJoinNode;
