class AverageNode {
    constructor() {
        this.state = {
            count: 0,
            sum: 0,
            done: false
        };
        this.next = () => {
            if (this.state.done) {
                return 'EOF';
            }
            let data;
            while (data !== 'EOF') {
                data = this.nextQuery.next();
                console.log('data is', data)
                if (data && data !== 'EOF') {
                    console.log('continuing');
                    const val = Object.values(data)[0];
                    this.state.sum = this.state.sum + parseFloat(val);
                    this.state.count++;
                }
            }
            this.state.done = true;
            return this.state.sum / this.state.count;
        }
    }
}

module.exports = AverageNode;