const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const { sampleMovies, sampleRatings } = require('./sampleData');

class ScanNode {
    constructor (filenames) {
        this.filenames = filenames;
        this.state = {
            calls: 0,
        };
        this.next = () => {
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
                this.file = sampleMovies;
                this.state.calls++;
                return this.file[0];
            }
            if (this.file[this.state.calls]) {
                const record = this.file[this.state.calls];
                this.state.calls++;
                return record;
            }
            return 'EOF';
        }
    };
}

module.exports = ScanNode;
