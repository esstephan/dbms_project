const fs = require("fs");
const path = require("path");
const { sampleMovies, sampleRatings } = require("./sampleData");
const { Node } = require("./queryConstructors");

class ScanNode extends Node {
  constructor(filename) {
    super();
    this._filename = filename;
    this.state = {
      calls: 0
    };
    this.next = () => {
      const fileLookup = {
        movies: sampleMovies,
        ratings: sampleRatings
      };

      const fileToRead = fileLookup[this._filename];
      if (this.state.calls === 0) {
        // const results = [];
        // const fileLocation = path.join(__dirname, this.filenames[0])
        // fs.createReadStream('/Users/Erica/DatabaseClass/ml-20m/movies.csv')
        // .pipe(csv())
        // .on('data', (data) => {
        //     console.log(data);
        //     results.push(data);
        // })
        // .on('end', () => {
        //     console.log('results', results);
        //     this.file = results;
        // });
        this.state.calls++;
        return fileToRead[0];
      }
      if (fileToRead[this.state.calls]) {
        const record = fileToRead[this.state.calls];
        this.state.calls++;
        return record;
      } else {
        return "EOF";
      }
    };
  }
}

module.exports = ScanNode;
