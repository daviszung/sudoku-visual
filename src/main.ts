import "./style.css"
import { getBoard } from "./getBoard"

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="font-mono flex flex-col justify-between">
    <h1 class="text-4xl font-semibold text-center p-4">Sudoku Visual</h1>
    <div class="board">
      
    </div>
    <section id="controls" class="flex justify-around items-center">
      <div class="flex w-4/5 md:w-2/5 justify-around items-center">
        <button class="py-1 px-2 rounded bg-slate-200">Solve</button>
        <button id="newBoard" class="py-1 px-2 rounded bg-slate-200">New Board</button>
        <button class="py-1 px-2 rounded bg-slate-200">Next</button>
      </div>
    </section>
  </div>
`

document.querySelector<HTMLButtonElement>("#newBoard")?.addEventListener("click", getBoard)

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!);
