class ProjectionNode {
    constructor (fields) {
        this.fields = fields;
        this.next = () => {
            const projectedRow = {};
            const row = this.nextQuery.next();
            if (row === 'EOF') {
                return 'EOF';
            }
            if (!row) {
                return;
            }
            for (let i = 0; i < this.fields.length; i++) {
                const fieldName = this.fields[i];

                projectedRow[fieldName] = row[fieldName];
            }
            return projectedRow;
        }
    }
};

module.exports = ProjectionNode;