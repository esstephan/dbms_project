const { Node } = require("./queryConstructors");

class SelectionNode extends Node {
  constructor(compareFunction) {
    super();
    this.next = () => {
      const row = this.left.next();
      if (row === "EOF") {
        return "EOF";
      }
      const isSelected = this.doComparison(compareFunction, row);
      if (isSelected) {
        return row;
      }
    };
    this.doComparison = (compareFunction, row) => {
      const field = compareFunction[0];
      const comparator = compareFunction[1];
      const target = compareFunction[2];
      switch (comparator) {
        case "EQUALS":
          return row[field] === target;
        case "NOT EQUAL":
          return row[field] !== target;
        case "IS NOT NULL":
          return !!row[field];
        case "IS NULL":
          return !row[field];
        case "IN":
          return target.includes(row[field]);
        case ">":
          return row[field] > target;
        case "<":
          return row[field] < target;
      }
    };
  }
}

module.exports = SelectionNode;
