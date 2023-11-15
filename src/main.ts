import { sudokuClient, board, getBoard } from "./boardUI";

document.querySelector<HTMLButtonElement>("#newBoard")?.addEventListener("click", async () => {
  await getBoard();
  sudokuClient.constructVirtualBoard(board);
});

document.querySelector<HTMLButtonElement>("#run")?.addEventListener("click", () => {
  const algo = document.querySelector("#selectAlgo") as HTMLSelectElement;
  sudokuClient.run(algo.value);
});