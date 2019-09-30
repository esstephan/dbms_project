const ScanNode = require("./scan");
const ProjectionNode = require("./projection");
const SelectionNode = require("./selection");
const AverageNode = require("./average");
const NestedLoopsJoinNode = require("./nestedloops");
const { QueryTree } = require("./queryConstructors");

// -> Average
//   -> Projection(lambda r: r.ratings_rating)
//     -> NestedLoopsJoin(lambda r, s: r.id == s.movie_id)
//       -> Selection(lambda r: r.name == 'Medium Cool (1969)')
//         -> FileScan('movies')
//       -> FileScan('ratings')

const makeNestedLoopsJoin = () => {
  let currentNode, subNode;
  const tree = new QueryTree();
  const averageNode = new AverageNode();
  //root of tree is average node
  tree.head = averageNode;

  //add projection node
  const projectionNode = new ProjectionNode(["rating"]);
  tree.head.addChild(projectionNode);

  // add join node
  const joinNode = new NestedLoopsJoinNode(() => {});
  projectionNode.addChild(joinNode);
  currentNode = joinNode;

  // add two children of join node
  const selectionNodeMovies = new SelectionNode(["movieId", ">", "50"]);
  subNode = selectionNodeMovies;

  currentNode.addChild(selectionNodeMovies);

  // the selection node has a filescan as its child
  const fileScanMoviesNode = new ScanNode("movies");
  console.log("fileScanMoviesNode", fileScanMoviesNode);
  subNode.addChild(fileScanMoviesNode);

  // the ratings scan is at same level as selection
  const fileScanRatingsNode = new ScanNode("ratings");
  console.log("filescanRatingsNode", fileScanRatingsNode);
  currentNode.addChild(fileScanRatingsNode);

  return tree;
};

const logTree = node => {
  console.log("node", JSON.stringify(node));
  while (node.left || node.right) {
    console.log(JSON.stringify(node));
    if (node.left) {
      logTree(node.left);
    }
    if (node.right) {
      logTree(node.right);
    }
  }
};

const main = () => {
  const queryTree = makeNestedLoopsJoin();
  const records = [];
  let nextRecord;
  while (nextRecord !== "EOF") {
    nextRecord = queryTree.head.next();
    if (nextRecord && nextRecord !== "EOF") {
      records.push(nextRecord);
    }
  }
  console.log("records", records);
  return records;
};

// const main = () => {
//   const tree = makeNestedLoopsJoin();
//   logTree(tree);
// };

main();
