import { updateStats } from "./sudokuHelpers";
import { Sudoku } from "./sudoku";

export let sudokuClient: Sudoku

type Board = Row[]
type Row = Val[]
export type Val = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export let board: Board = []
let solution = []
let difficulty

export const test: Board = [
    [2, 0, 1, 4, 3, 9, 5, 0, 8],
    [9, 0, 8, 5, 2, 1, 3, 0, 4],
    [3, 5, 4, 8, 7, 6, 9, 1, 2],
    [7, 2, 3, 1, 6, 4, 8, 9, 5],
    [6, 8, 9, 2, 5, 7, 4, 3, 1],
    [4, 1, 5, 3, 9, 8, 7, 2, 6],
    [1, 3, 0, 7, 8, 5, 0, 4, 9],
    [5, 4, 0, 9, 1, 3, 0, 8, 7],
    [8, 9, 7, 6, 4, 2, 1, 5, 3],
]

// Taking 40ms - 80ms
export async function getBoard() {
    try {
        const response = await fetch("https://sudoku-api.vercel.app/api/dosuku");
        const data = await response.json()
        
        board = data.newboard.grids[0].value
        solution = data.newboard.grids[0].solution
        difficulty = data.newboard.grids[0].difficulty
        console.log(board, solution, difficulty);

        // board = test
        fillBoard(board)
        updateStats("None", 0, 0, 0)
        sudokuClient = new Sudoku()

        return
    }
    catch (error) {
        console.error(error);
    }
}

// Taking 0.7ms - 1ms
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