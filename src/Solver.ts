import State from './State';

class Solver {
    tiles: string[];
    rows: number;
    columns: number;
    sequence: string[];

    constructor(tiles: string[], rows: number, columns: number, sequence: string[]) {
        this.tiles = tiles;
        this.rows = rows;
        this.columns = columns;
        this.sequence = sequence;
    }

    /**
     * This method applies a classic BFS.
     * It starts from the bottom of the maze and tries to apply BFS from each starting
     * tile that corresponds to the first element in the provided sequence.
     * @param maze The maze to escape from.
     * @returns The final state. Null otherwise.
     */
    escapeMaze(): number[] {
        const startingColor = this.sequence[0];
        let startingRowCurrentIndex = this.tiles.length - 1;

        // The starting row of the maze goes from 'length' 
        // to the 'length' minus the length of a row (i.e. number of columns).
        const startingRowLastIndex = this.tiles.length - this.columns;

        while (startingRowCurrentIndex >= startingRowLastIndex) {

            // This is a valid initial tile only if it matches the starting color
            if (this.tiles[startingRowCurrentIndex] === startingColor) {
                let queue = [];
                let visitedStates = [];
                let initialState = null;

                // tslint:disable-next-line:max-line-length
                initialState = new State(this.tiles[startingRowCurrentIndex], startingRowCurrentIndex, this.rows, this.columns, this.sequence, 1);
                queue.push(initialState);

                while (!(queue.length === 0)) {
                    let currentState: State = queue.shift() as State;
                    let connectedStates: State[] = currentState.findNext(this.tiles, this.sequence);
                    for (let connectedState of connectedStates) {
                        connectedState.setParent(currentState);
                        if (this.isFinalState(connectedState)) {
                            let path: number[] = this.findPath(connectedState);
                            return path;
                        }

                        // Avoid loops by checking the visited states
                        let wasVisited = visitedStates.filter((state) => {
                            return state.index === connectedState.index &&
                                    state.parent.index === connectedState.parent.index;
                        }).length > 0;
                        if (!wasVisited) {
                            visitedStates.push(connectedState);
                            queue.push(connectedState);
                        }
                    }
                }
            }
            startingRowCurrentIndex--;
        }

        return [];
    }

    /**
     * Whether or not the state is final. (i.e. tile on first row)
     * @param state The state to check.
     * @returns True if the state is on the first row.
     */
    isFinalState(state: State) {
        return state.index < this.columns;
    }

    /**
     * Traverses the states from the final to the initial one to return the path.
     * @param finalState The state from which to gather path.
     * @returns A sequence of steps to escape the this.maze.
     */
    findPath(finalState: State) {
        let movesSequence = [];

        while (finalState !== undefined) {
            movesSequence.push(finalState.index);
            finalState = finalState.parent;
        }

        return movesSequence.reverse();
    }
}

export default Solver;