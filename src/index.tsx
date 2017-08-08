import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Maze from './Maze';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

let mazeInputString =
  'R O Y P O\n' +
  'R R B R R R B P Y G P B B B G P B P P R\n' +
  'B G Y P R P Y Y O R Y P P Y Y R R R P P\n' +
  'B P G R O P Y G R Y Y G P O R Y P B O O\n' +
  'R B B O R P Y O O Y R P B R G R B G P G\n' +
  'R P Y G G G P Y P Y O G B O R Y P B Y O\n' +
  'O R B G B Y B P G R P Y R O G Y G Y R P\n' +
  'B G O O O G B B R O Y Y Y Y P B Y Y G G\n' +
  'P P G B O P Y G B R O G B G R O Y R B R\n' +
  'Y Y P P R B Y B P O O G P Y R P P Y R Y\n' +
  'P O O B B B G O Y G O P B G Y R R Y R B\n' +
  'P P Y R B O O R O R Y B G B G O O P B Y\n' +
  'B B R G Y G P Y G P R R P Y G O O Y R R\n' +
  'O G R Y B P Y O P B R Y B G P G O O B P\n' +
  'R Y G P G G O R Y O O G R G P P Y P B G\n' +
  'P Y P R O O R O Y R P O R Y P Y B B Y R\n' +
  'O Y P G R P R G P O B B R B O B Y Y B P\n' +
  'B Y Y P O Y O Y O R B R G G Y G R G Y G\n' +
  'Y B Y Y G B R R O B O P P O B O R R R P\n' +
  'P O O O P Y G G Y P O G P O B G P R P B\n' +
  'R B B R R R R B B B Y O B G P G G O O Y\n';

let mazeRows = mazeInputString.split('\n');
const sequence = mazeRows[0].split(' ');

// remove first line containing the possible colors
mazeRows.splice(0, 1);

// remove last line if the input file contained a new line on the last line
if (mazeRows[mazeRows.length - 1] === '') {
  mazeRows.splice(mazeRows.length - 1, 1);
}

let maze: string[] = [];
for (let mazeRow of mazeRows) {
  maze = maze.concat(mazeRow.split(' '));
}

const numberOfRows: number = mazeRows.length;
const numberOfColumns: number = mazeRows[0].split(' ').length;

ReactDOM.render(
  <Maze tiles={maze} rows={numberOfRows} columns={numberOfColumns} sequence={sequence}/>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
