import { square } from "./sudoku";
import { Val } from "./controls";
type regions = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i";
export function adjustRegion(row: number, col:number) {

  let target: regions;

  if (row < 3) {
    if (col < 3) {
      target = "a";
    } else if (col >= 3 && col < 6) {
      target = "b";
    } else {
      target = "c";
    }
  } else if (row >= 3 && row < 6) {
    if (col < 3) {
      target = "d";
    } else if (col >= 3 && col < 6) {
      target = "e";
    } else {
      target = "f";
    }
  } else {
    if (col < 3) {
      target = "g";
    } else if (col >= 3 && col < 6) {
      target = "h";
    } else {
      target = "i";
    }
  };

  return target;

};


export function updateStats(algorithm: string, possibilitiesRemoved: number, revealedByNarrowing: number, valuesDeduced: number) {
  const algorithmUsedStat = document.querySelector("#algorithmUsed")!
  const possibilitiesRemovedStat = document.querySelector("#possibilitiesRemovedStat")!
  const revealedByNarrowingStat = document.querySelector("#revealedByNarrowingStat")!
  const valuesDeducedStat = document.querySelector("#valuesDeducedStat")!
  algorithmUsedStat.innerHTML = algorithm
  possibilitiesRemovedStat.innerHTML = `${possibilitiesRemoved}`
  revealedByNarrowingStat.innerHTML = `${revealedByNarrowing}`
  valuesDeducedStat.innerHTML = `${valuesDeduced}`
}

export function isValid(board: square[][], val: Val, row: number, col: number) {

  for (let x = 0; x < 9; x++) {
    if (board[row][x].value === val) {
      return false;
    }
  }

  for (let y = 0; y < 9; y++) {
    if (board[y][col].value === val) {
      return false;
    }
  }

  const startRow = row - row % 3;
  const startCol = col - col % 3;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i + startRow][j + startCol].value === val) {
        return false;
      }
    }
  }

  return true;
}

export function findEmptySquare(board: square[][]) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j].value === 0) {
        return [i, j];
      }
    }
  }
  return false;
}
