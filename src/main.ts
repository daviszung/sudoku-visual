import { sudokuClient,board, getBoard } from "./controls"

document.querySelector<HTMLButtonElement>("#newBoard")?.addEventListener("click", async () => {
  await getBoard()
  sudokuClient.constructVirtualBoard(board)
})

document.querySelector<HTMLButtonElement>("#go")?.addEventListener("click", () => {

  const algo = document.querySelector("#selectAlgo") as HTMLSelectElement;

  sudokuClient.go(algo.value);

});