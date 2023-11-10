import { sudokuClient,board, getBoard } from "./controls"

const delaySettings = {
  "fast": 0,
  "slow": 20,
  "superSlow": 50
} as const

document.querySelector<HTMLButtonElement>("#newBoard")?.addEventListener("click", async () => {
  await getBoard()
  sudokuClient.constructVirtualBoard(board)
})

document.querySelector<HTMLButtonElement>("#run")?.addEventListener("click", () => {
  let selected: keyof typeof delaySettings = "fast"

  const speedSelection: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[type="radio"]')

  for (let i = 0; i < speedSelection.length; i++) {
    if (speedSelection[i].checked) {
      selected = speedSelection[i].id as keyof typeof delaySettings
    }
  }

  const algo = document.querySelector("#selectAlgo") as HTMLSelectElement;

  sudokuClient.run(algo.value, delaySettings[selected]);

});