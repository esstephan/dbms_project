class QueryTree {
  constructor() {
    this.head = null;
  }
}

class Node {
  constructor(...args) {
    this.left = null;
    this.right = null;
    this.addChild = node => {
      if (!this.left) {
        this.left = node;
      } else if (!this.right) {
        this.right = node;
      } else {
        return new Error("node is full");
      }
    };
  }
}

module.exports = { QueryTree, Node };
