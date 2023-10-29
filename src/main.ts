import { board, getBoard } from "./controls"
import { Sudoku } from "./Sudoku"

let sudokuClient = new Sudoku()

// Initial Setup
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="font-mono flex flex-col justify-between h-screen">
    <h1 class="text-3xl font-semibold text-center p-3 bg-slate-800 text-slate-50">Sudoku Visual</h1>
    <section class="grid place-items-center aspect-square px-4">
      <table id="board" class="border-2 border-slate-800"></table>
    </section>
    <section id="controls" class="flex justify-around items-center pb-8 md:pb-24">
      <div class="flex w-4/5 md:w-2/5 justify-around items-center font-semibold">
        <button id="solveButton" class="py-1 px-2 rounded bg-slate-800 text-slate-50">Solve</button>
        <button id="newBoard" class="py-1 px-2 rounded bg-slate-800 text-slate-50">New Board</button>
        <button class="py-1 px-2 rounded bg-slate-800 text-slate-50">Next</button>
      </div>
    </section>
  </div>
`

document.querySelector<HTMLButtonElement>("#newBoard")?.addEventListener("click", async () => {
  await getBoard()
  sudokuClient.constructVirtualBoard(board)
})
document.querySelector<HTMLButtonElement>("#solveButton")?.addEventListener("click", () => {
  // sudokuClient.constructVirtualBoard(board)
})
document.querySelector<HTMLButtonElement>("#newBoard")?.addEventListener("click", () => {
  console.log("narrow regions");
  sudokuClient.next("narrowRegions")
})