//         ["SELECTION", ["movieId", "EQUALS", "5000"]],

class SelectionNode {
    constructor (query, nextQuery) {
        this.query = query;
        this.nextQuery = nextQuery;
        this.next = () => {
            const row = this.nextQuery.next();
            if (!row) {
                return;
            }
            if (row === 'EOF') {
                return 'EOF';
            }
            const isSelected = this.doComparison(query, row);
            if (isSelected) {
                return row;
            }
            return;
        }
        this.doComparison = (query, row) => {
            const field = query[0];
            const comparator = query[1];
            const target = query[2];
            switch (comparator) {
                case 'EQUALS':
                    return row[field] === target;
                case 'NOT EQUAL':
                    return row[field] !== target;  
                case 'IS NOT NULL':
                    return !!row[field];
                case 'IS NULL':
                    return !row[field];
                case 'IN':
                    return target.includes(row[field]);      
            }
        }
    }
};

module.exports = SelectionNode;