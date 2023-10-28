import "./style.css"
import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="font-serif flex flex-col justify-between">
    <h1 class="text-4xl text-center p-4">Sudoku Visual</h1>
    <div class="board" >
      
    </div>
    <section id="controls" class="flex justify-around items-center">
      <div class="flex w-4/5 md:w-2/5 justify-around items-center">
        <button class="py-1 px-2 rounded bg-slate-200">Solve</button>
        <button class="py-1 px-2 rounded bg-slate-200">New Board</button>
        <button class="py-1 px-2 rounded bg-slate-200">Next</button>
      </div>
    </section>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!);
