import { updateStats } from "./sudokuHelpers";
import { Sudoku } from "./sudoku";

export let sudokuClient: Sudoku

type Board = Row[]
type Row = Val[]
export type Val = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export let board: Board = []

// Taking ~48ms typically. Takes 60ms or more on first request 
export async function getBoard() {

    try {
        const response = await fetch("https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value,solution}}}");
        const data = await response.json()

        board = data.newboard.grids[0].value

        fillBoard(board)

        updateStats("None", 0, 0, 0)

        sudokuClient = new Sudoku()

        return
    }
    catch (error) {
        console.error(error);
    }

}

export function fillBoard(board: Board, diffs?: Array<boolean[]>) {
    const rows = []
    const targetBoard = document.querySelector("#board")

    for (let i = 0; i < 9; i++) {

        const row = document.createElement("tr")
        row.className = "grid grid-rows-1 grid-cols-9 border-slate-800 border-b"
        if (i === 8) {
            row.classList.remove("border-b")
        } else if (i === 2 || i === 5) {
            row.classList.add("border-b-2")
            row.classList.remove("border-b")
        }

        for (let j = 0; j < 9; j++) {
            const square = document.createElement("td")
            square.id = `row${i}col${j}`
            square.className = `w-10 h-10 border-r border-slate-800 grid place-items-center aspect-square text-xl font-semibold md:text-2xl`
            if (j === 8) {
                square.classList.remove("border-r")
            } else if (j === 2 || j === 5) {
                square.classList.add("border-r-2")
                square.classList.remove("border-r")
            }

            // If the square was revealed or deduced by the last algo, make it green
            if (diffs && diffs[i][j]) {
                square.classList.add("text-green-600")
            }

            // Draw the square's value in the square, if the value is zero, make an empty space
            if (board[i][j] !== 0) {
                square.innerHTML = `${board[i][j]}`;
            } else {
                square.innerHTML = "&nbsp"
            }

            row.appendChild(square);
        }

        rows.push(row);
    }

    targetBoard?.replaceChildren(...rows);
}

function sleep (time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export async function paintSquare(row: number, col: number, val: number, delay: number) {
    await sleep(delay)
    const square = document.querySelector(`#row${row}col${col}`);
    if (square) {
        square.innerHTML = `${val}`;
        square.classList.add("text-green-600");
    } else {
        console.error("Square not found");
    }

    return;
}