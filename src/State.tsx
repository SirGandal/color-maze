class State {
    tile: string;
    index: number;
    rows: number;
    sequence: string[];
    columns: number;
    parent: State;
    nextColorIndex: number;
    directions: [[number, number]];

    constructor(tile: string,
                index: number,
                rows: number,
                columns: number,
                sequence: string[],
                nextColorIndex: number) {
        this.tile = tile;
        this.sequence = sequence;
        this.index = index;
        this.rows = rows;
        this.columns = columns;
        this.nextColorIndex = nextColorIndex >= sequence.length ? 0 : nextColorIndex;

        // All the possible directions this state can move to.
        // In this case diagonal movements [1, 1], [1, -1], [-1, 1], [-1, -1] are not permitted.
        this.directions = [[0, -1], [-1, 0], [0, 1], [1, 0]];
    }

    // Converts row/col to universal index.
    getIndex(row: number, col: number) {
        return row * this.columns + col;
    }

    // Gets the row index from the universal index.
    getRow() {
        return Math.floor(this.index / this.columns);
    }

    // Gets the column index from the universal index.
    getCol() {
        return Math.floor(this.index % this.columns);
    }

    // Sets the parent of this node. (i.e. how we arrived to the current state)
    setParent(parent: State) {
        this.parent = parent;
    }

    // Checks if we can move to the next state. Specifically if the the next index
    // is on the board and of a color that is the next on the sequence.
    // Using row and columns indexes here as it is easier to deal with.
    checkNext(row: number, column: number, maze: string[]) {
        // tslint:disable-next-line:max-line-length
        return row >= 0 && row < this.rows && column >= 0 && column < this.columns && maze[this.getIndex(row, column)] === this.sequence[this.nextColorIndex];
    }

    // Finds the next possible tiles to move onto based on the sequence.
    findNext(maze: string[], sequence: string[]): State[] {

        let currentRow = this.getRow();
        let currentColumn = this.getCol();

        let nextState = [];

        for (let direction of this.directions) {
            let tmpRow = currentRow + direction[0];
            let tmpCol = currentColumn + direction[1];

            if (this.checkNext(tmpRow, tmpCol, maze)) {
                let nextStateIndex = this.getIndex(tmpRow, tmpCol);
                // tslint:disable-next-line:max-line-length

                nextState.push(new State(maze[nextStateIndex], nextStateIndex, this.rows, this.columns, this.sequence, this.nextColorIndex + 1));
                // tslint:disable-next-line:max-line-length
                // console.log(`(${currentRow},${currentColumn})-${this._getIndex(currentRow, currentColumn)} -> (${tmpRow},${tmpCol})-${connectedIndex}`);
            }
        }

        return nextState;
    }
}

export default State;