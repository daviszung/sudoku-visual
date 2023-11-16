import { sudokuClient, getBoard, board, fillBoard } from "./boardUI";
import { isCheckboxChecked, createDiffs } from "./sudokuHelpers";


document.querySelector<HTMLInputElement>("#togglePossibleValues")?.addEventListener("change", () => {
  const isChecked = isCheckboxChecked()
  const diffs = createDiffs(board, sudokuClient.virtualBoard)
  fillBoard(sudokuClient.virtualBoard, isChecked, diffs)
})

document.querySelector<HTMLButtonElement>("#newBoard")?.addEventListener("click", async () => {
  await getBoard();
});

document.querySelector<HTMLButtonElement>("#run")?.addEventListener("click", () => {
  const algo = document.querySelector("#selectAlgo") as HTMLSelectElement;
  sudokuClient.run(algo.value);
});