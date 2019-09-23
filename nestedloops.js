const filescan = require('./scan');

const doComparison = (outerRow, innerRow, params) => {

}

// -> Average
//   -> Projection(lambda r: r.ratings_rating)
//     -> NestedLoopsJoin(lambda r, s: r.id == s.movie_id)
//       -> Selection(lambda r: r.name == 'Medium Cool (1969)')
//         -> FileScan('movies')
//       -> FileScan('ratings')

class nestedLoopsJoinNode (outer, inner, comparisonFunction, nextQuery) {
    constructor (outer, inner, comparisonFunction, nextQuery) {
        this.nextQuery = nextQuery;
        this.state = {
            outerLoopComplete: false,
            innerLoopComplete: false,
        }
        this.next = () => {
            const scanOuter = new ScanNode(outer);
            const scanInner = new ScanNode(inner);
            // establish state of outer loop
        
            // get first outer row
            // call scan.js on outer table
            // if 'EOF' we are done, return
            while (!this.state.outerLoopComplete) {
                let outerRow = scanOuter.next();
                if (outerRow === 'EOF') {
                    this.setState({outerLoopComplete: true});
                    return;
                }
                while (!this.state.innerLoopComplete) {
                    let innerRow = scanInner.next();
                    const potentialJoin = 
                }
        
            }
        
                // get inner row
        }
    }

}



class NestedLoopsJoin {
    constructor (outer, inner, query) {
        this.state = {
            outerLoopComplete: false,
            innerLoopComplete: false,
        }
    }
}