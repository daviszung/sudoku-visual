// new strategy:
// make a copy of the board with 81 squares.
// each square will have an object {}
// type square = {
//   value: number | undefined;
//   possibleValues: Set<number>;
//   region: string;
// }
// I think this is all the data that each square needs to have
// I can loop over each square and have all the data in one place for each square
// the squares do not neccessarily need to have regions, i could determine the region while looping,
// but i think it might be easier to determine region when building out the board copy


const boardTest: number[][] = [[5,3,0,0,7,0,0,0,0],[6,0,0,1,9,5,0,0,0],[0,9,8,0,0,0,0,6,0],[8,0,0,0,6,0,0,0,3],[4,0,0,8,0,3,0,0,1],[7,0,0,0,2,0,0,0,6],[0,6,0,0,0,0,2,8,0],[0,0,0,4,1,9,0,0,5],[0,0,0,0,8,0,0,7,9]];
const boardTest2: number[][] = [[5,0,0,6,0,0,0,9,4],[0,0,7,5,0,0,0,0,3], [0,0,9,0,0,0,0,0,7], [9,0,0,4,1,0,0,3,0], [0,8,0,0,0,0,0,4,0], [3,0,0,0,0,0,6,5,0], [0,0,0,1,0,0,0,0,0], [2,0,0,3,9,6,0,0,0], [7,0,0,0,0,0,9,0,0]];
const boardTest3: number[][] = [
  [0, 0, 0, 2, 6, 0, 7, 0, 1],
  [6, 8, 0, 0, 7, 0, 0, 9, 0],
  [1, 9, 0, 0, 0, 4, 5, 0, 0],
  [8, 2, 0, 1, 0, 0, 0, 4, 0],
  [0, 0, 4, 6, 0, 2, 9, 0, 0],
  [0, 5, 0, 0, 0, 3, 0, 2, 8],
  [0, 0, 9, 3, 0, 0, 0, 7, 4],
  [0, 4, 0, 0, 5, 0, 0, 3, 6],
  [7, 0, 3, 0, 1, 8, 0, 0, 0]];
const boardTest4: number[][] = [[0,1,0,0,0,0,0,5,0], [4,0,0,0,0,0,7,0,0], [3,0,0,2,0,5,0,0,0], [0,9,8,0,0,1,0,0,0], [0,0,0,0,9,0,0,0,0], [0,0,7,0,8,0,0,4,0], [0,0,0,0,0,0,9,7,8], [0,0,0,1,3,0,0,0,4], [0,0,0,6,0,0,0,0,1]]

// now we have a crude setup, in which none of the undetermined squares have narrowed down their possible values at all.
// we can now start the process of narrowing down possible values by checking regions, rows, and columns.

// what about deduction? by using sets, it is less computationally heavy to search through possible values. deduction happens by looking at each of the possible values
// in the square that we are observing. we deduce first by region, and then by row and column.


// when narrowing by row and column, we do this process for each possible value. we look at each square in the row/column, and look at the value
// if the square's value is the possible value, we can eliminate the possible value.
// if the possible value we are looking for is in the set of possible values of the square we are observing, make a note of it, this rules out deduction.
// if we go through an entire row/column and do not find the value we are looking for in the possible values of the column, we have deduced the value of our original square.


// console.time('Narrow All By Region');

// boardCopy = narrowAllSquaresByRegion(boardCopy);

// console.timeEnd('Narrow All By Region');

// console.time('Narrow All By Row and Column');

// boardCopy = narrowAllSquaresByRowAndColumn(boardCopy);

// console.timeEnd('Narrow All By Row and Column');

// console.log("ON PASS:")


// removedPossibilities = 0;
// revealedByNarrowing = 0;
// valuesDeduced = 0;

let loops = 0;

function solveSudoku(board: square[][]): number[][] {

  let solved = true;

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col].value === 0){
        solved = false;
        break;
      }
    }
  };

  if (solved || loops > 2){
    const finalBoard: number[][] = []
    for (let row = 0; row < board.length; row++) {
      const resultRow: number[] = [];
      for (let col = 0; col < board[row].length; col++) {
        resultRow.push(board[row][col].value)
      }
      finalBoard.push(resultRow)
    };
    return finalBoard;
  };

  loops += 1;

  board = narrowAllSquaresByRegion(board);

  board = narrowAllSquaresByRowAndColumn(board);

  board = deduceAllByRegion(board);
  

  return solveSudoku(board);
};

console.time("solve sudoku")

const final = solveSudoku(boardCopy);
for (let i = 0; i < final.length; i++) {
  let array = final[i];
  let arrayString = "[" + array.join(", ") + "]";
  console.log(arrayString);
};


console.timeEnd("solve sudoku")

console.log("TOTAL POSSIBLE VALUES REMOVED: ", removedPossibilities);
console.log("TOTAL VALUES REVEALED BY NARROWING: ", revealedByNarrowing);
console.log("TOTAL VALUES SUCCESSFULLY DEDUCED: ", valuesDeduced);
console.log("TOTAL VALUES SUCCESSFULLY DEDUCED BY REGION: ", deducedByRegion, "\n");
