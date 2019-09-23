const ScanNode = require('./scan');
const ProjectionNode = require('./projection');
const SelectionNode = require('./selection');
const AverageNode = require('./average');

const findByIDQuery = [
    ["PROJECTION", ["title"]],
    ["SELECTION", ["movieId", "EQUALS", "50"]],
    ["FILESCAN", ["movies"]]
]

const averageRatingsQuery = [
    ["AVERAGE"],
    ["PROJECTION", ["rating"]],
    ["SELECTION", ["movieId", "EQUALS", "34"]],
    ["FILESCAN", ["ratings"]]
];

const queries = averageRatingsQuery;

const makeQueryNode = (type, query) => {
    switch (type) {
        case 'FILESCAN':
            return new ScanNode(query);
        case 'PROJECTION':
            return new ProjectionNode(query);  
        case 'SELECTION':
            return new SelectionNode(query);  
        case 'AVERAGE':
            return new AverageNode();    
    }
};
    
class QueryList {
    constructor(){
        this.head = null;
    }
}

const main = () => {
    if (!queries.length) {
        return;
    }
    
    const queryTree = new QueryList();
    let currentNode = queryTree.head;
    
    for (let i = 0; i < queries.length; i++) {
        const command = queries[i][0];
        const query = queries[i][1];
        if (i === 0) {
            const firstQuery = makeQueryNode(command, query);
            queryTree.head = firstQuery;
            currentNode = firstQuery;
        } else {
            currentNode.nextQuery = makeQueryNode(command, query);
            currentNode = currentNode.nextQuery;
        }
    }
    
    const records = [];
    let nextRecord;
    while (nextRecord !== 'EOF') {
        nextRecord = queryTree.head.next();
        if (nextRecord && nextRecord !== 'EOF') {
            records.push(nextRecord);
        }
    }
    console.log('records', records);
    return records;
}

main();
