import { getBoard } from "./getBoard"

// Initial Setup
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="font-mono flex flex-col justify-between h-screen">
    <h1 class="text-4xl font-semibold text-center p-4 bg-slate-800 text-slate-50">Sudoku Visual</h1>
    <section class="grid place-items-center w-full aspect-square px-4">
      <table id="board" class="border-2 border-slate-800 w-full md:w-3/5"></table>
    </section>
    <section id="controls" class="flex justify-around items-center pb-8 md:pb-24">
      <div class="flex w-4/5 md:w-2/5 justify-around items-center font-semibold">
        <button class="py-1 px-2 rounded bg-slate-800 text-slate-50">Solve</button>
        <button id="newBoard" class="py-1 px-2 rounded bg-slate-800 text-slate-50">New Board</button>
        <button class="py-1 px-2 rounded bg-slate-800 text-slate-50">Next</button>
      </div>
    </section>
  </div>
`

document.querySelector<HTMLButtonElement>("#newBoard")?.addEventListener("click", getBoard)