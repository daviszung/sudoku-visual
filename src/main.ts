import { sudokuClient, getBoard, fillBoard } from "./boardUI";
import { isCheckboxChecked } from "./sudokuHelpers";

document.querySelector<HTMLInputElement>("#togglePossibleValues")?.addEventListener("change", () => {
  const isChecked = isCheckboxChecked()
  fillBoard(sudokuClient.virtualBoard, isChecked)
})

document.querySelector<HTMLButtonElement>("#newBoard")?.addEventListener("click", async () => {
  await getBoard();
});

document.querySelector<HTMLButtonElement>("#run")?.addEventListener("click", () => {
  const algo = document.querySelector("#selectAlgo") as HTMLSelectElement;
  sudokuClient.run(algo.value);
});