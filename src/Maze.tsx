import * as React from 'react';
import Utils from './Utils';
import Solver from './Solver';

interface MazeProps {
  tiles: string[];
  rows: number;
  columns: number;
  sequence: string[];
}

interface MazeState {
  escapePath: number[];
  message: string;
}

interface TileProps {
  value: string;
  index: number;
  path: number[];
}

interface TileState {
  isParthOfPath: boolean;
  solved: boolean;
}

interface SequenceProps {
  value: string;
}

class Maze extends React.Component<MazeProps, MazeState> {

  constructor(props: MazeProps) {
    super(props);
    this.state = { escapePath: [], message: '' };
  }

  renderRow(from: number, to: number) {
    let tiles = [];
    for (let i = from; i < to; i++) {
      let tile = this.renderTile(i);
      tiles.push(tile);
    }
    return tiles;
  }

  renderTile(i: number) {
    return (
      <Tile
        key={i}
        value={this.props.tiles[i]}
        index={i}
        path={this.state.escapePath}
      />
    );
  }

  renderSequence(i: number) {
    return (
      <Sequence
        key={i}
        value={this.props.sequence[i]}
      />
    );
  }

  handleSolvedPath(path: number[]) {
    this.setState({ 
      escapePath: path,
      message: 'Yay, you\'ve escaped!'
    });
  }

  handleCantSolve() {
    this.setState({ 
      escapePath: [],
      message: 'Nooooo! You can\'t escape from the maze :(.'
    });
  }

  handleClickSolve() {
    let solve = new Solver(this.props.tiles, this.props.rows, this.props.columns, this.props.sequence);
    let path = solve.escapeMaze();

    if (path.length > 0) {
      this.setState({
        escapePath: path,
        message: 'Yay, you\'ve escaped!'
      });
    } else {
      this.setState({
        escapePath: [],
        message: 'Nooooo! You can\'t escape from the maze :(.'
      });
    }
  }

  render() {
    let rows = [];
    for (let i = 0; i < this.props.tiles.length; i = i + this.props.columns) {
      rows.push(<div className="maze-row" key={i}>{this.renderRow(i, i + this.props.columns)}</div>);
    }

    let sequence = [];
    for (let i = 0; i < this.props.sequence.length; i++) {
      sequence.push(<div className="tile" key={i}>{this.renderSequence(i)}</div>);
    }

    return (
      <div>
        <div className="maze">
          <div>
            {rows}
          </div>
        </div>
        <p> Solve for sequence: </p>
        <div className="maze">
          <div>
            {sequence}
          </div>
        </div>
        <br />
        <button className="solve" onClick={() => this.handleClickSolve()}>
          SOLVE
        </button>
        <br/>
        <p>{this.state.message}</p>
      </div>
    );
  }
}

function Sequence(props: SequenceProps) {
  return (
    <div className="tile" style={{ 'background': Utils.GetColorFromInitial(props.value) }} />
  );
}

class Tile extends React.Component<TileProps, TileState> {

  // When the tile props are changed is because the solved method has finished.
  // As a consequence we can access the path that was found to update the state.
  componentWillReceiveProps(nextProps: TileProps) {
    this.setState({
      isParthOfPath: nextProps.path.indexOf(this.props.index) !== -1,
      solved: true
    });
  }

  render() {
    let currentTileBackgroundColor;
    let currentClassName = 'tile';

    if (!this.state || !this.state.solved) {
      currentTileBackgroundColor = Utils.GetColorFromInitial(this.props.value);
    } else if (this.state && this.state.solved) {
      if (this.state.isParthOfPath) {
        currentTileBackgroundColor = Utils.GetColorFromInitial(this.props.value);
        currentClassName = `${currentClassName} escape-tile`;
      } else {
        currentTileBackgroundColor = Utils.GetColorFromInitial(this.props.value, 0.25);
      }
    }
    const currentTileStyle = {
      'background': currentTileBackgroundColor,
    };

    return (
      <div className={currentClassName} style={currentTileStyle}>
         {/* {this.props.index}  */}
      </div>
    );
  }
}

export default Maze;