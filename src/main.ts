import { getBoard } from "./getBoard"

// Initial Setup
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="font-mono flex flex-col justify-between px-4 h-screen">
    <h1 class="text-4xl font-semibold text-center p-4">Sudoku Visual</h1>
    <table id="board" class="border-2 border-black">
      
    </table>
    <section id="controls" class="flex justify-around items-center pb-4 md:pb-24">
      <div class="flex w-4/5 md:w-2/5 justify-around items-center">
        <button class="py-1 px-2 rounded bg-slate-200">Solve</button>
        <button id="newBoard" class="py-1 px-2 rounded bg-slate-200">New Board</button>
        <button class="py-1 px-2 rounded bg-slate-200">Next</button>
      </div>
    </section>
  </div>
`

document.querySelector<HTMLButtonElement>("#newBoard")?.addEventListener("click", getBoard)

export const board = []