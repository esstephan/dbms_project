const { Node } = require("./queryConstructors");

class ProjectionNode extends Node {
  constructor(fields) {
    super();
    this.fields = fields;
    this.next = () => {
      const projectedRow = {};
      const row = this.left.next();
      if (row === "EOF") {
        return "EOF";
      }
      if (row) {
        for (let i = 0; i < this.fields.length; i++) {
          const fieldName = this.fields[i];

          projectedRow[fieldName] = row[fieldName];
        }
        return projectedRow;
      }
    };
  }
}

module.exports = ProjectionNode;
