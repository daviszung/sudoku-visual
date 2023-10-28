type Board = Array<number[]>
type Row = number[]
type Val = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

let board = []
let solution = []
let difficulty

export async function getBoard() {

    try {
        const response = await fetch("https://sudoku-api.vercel.app/api/dosuku");
        const data = await response.json()
        board = data.newboard.grids[0].value
        solution = data.newboard.grids[0].solution
        difficulty = data.newboard.grids[0].difficulty
        console.log(board, solution, difficulty);

        fillBoard(board)

        return
    }
    catch (error) {
        console.error(error);
    }
}

function fillBoard(board: Board) {
    const rows = []
    const targetBoard = document.querySelector("#board")

    for (let i = 0; i < 9; i++) {

        const row = document.createElement("tr")
        row.className = "grid grid-rows-1 grid-cols-9 border-black border-b"
        if (i === 8) {
            row.classList.remove("border-b")
        }

        for (let j = 0; j < 9; j++) {
            const square = document.createElement("td")
            square.className = `border-r border-black grid place-items-center`
            if (j === 8) {
                square.classList.remove("border-r")
            }
            square.innerHTML = `${board[i][j] !== 0 ? board[i][j] : "-"}`
            row.appendChild(square)
        }

        rows.push(row)
    }

    targetBoard?.replaceChildren(...rows)

    console.log("board fill");

}