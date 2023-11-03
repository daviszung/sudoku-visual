import { sudokuClient,board, getBoard, fillBoard } from "./controls"
import { updateStats } from "./sudokuHelpers"

document.querySelector<HTMLButtonElement>("#newBoard")?.addEventListener("click", async () => {
  await getBoard()
  sudokuClient.constructVirtualBoard(board)
})

document.querySelector<HTMLButtonElement>("#solveButton")?.addEventListener("click", () => {
  const newBoard = sudokuClient.backtracking()

  if (!newBoard) {
    console.error("no board", newBoard);
    return
  }

  const diffs = Array.from({ length: 9 }, () => Array(9).fill(false));

  // Check every square in the board, if the value is 0, but we have
  // a value on the virtual board, we can fill in the value on the board
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === 0 && newBoard[i][j].value !== 0) {
        board[i][j] = newBoard[i][j].value;
        diffs[i][j] = true;
      }
    }
  }

  // Render the new board
  fillBoard(board, diffs);

  // Update Stats
  updateStats("Backtracking", Infinity, Infinity, Infinity)
});

document.querySelector<HTMLButtonElement>("#next")?.addEventListener("click", () => {
  sudokuClient.next();
});