type Board = Row[]
type Row = Val[]
export type Val = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export let board: Board = []
let solution = []
let difficulty

// Taking 40ms - 80ms
export async function getBoard() {
    try {
        const response = await fetch("https://sudoku-api.vercel.app/api/dosuku");
        const data = await response.json()
        board = data.newboard.grids[0].value
        solution = data.newboard.grids[0].solution
        difficulty = data.newboard.grids[0].difficulty
        console.log(board, solution, difficulty);

        fillBoard(board)

        return board
    }
    catch (error) {
        console.error(error);
    }
}

// Taking 0.7ms - 1ms
function fillBoard(board: Board) {
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