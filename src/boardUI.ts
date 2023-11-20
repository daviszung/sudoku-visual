import { isCheckboxChecked, updateStats } from "./sudokuHelpers";
import { Sudoku, square } from "./sudoku";

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

        board = adjustDifficulty(data.newboard.grids[0].value, data.newboard.grids[0].solution)

        updateStats("None", 0, 0, 0)

        sudokuClient = new Sudoku(board)

        const renderPossibleValues = isCheckboxChecked()
        fillBoard(sudokuClient.virtualBoard, renderPossibleValues)

        return
    }
    catch (error) {
        console.error(error);
    }

}

export function fillBoard(board: square[][], renderPossibleValues: boolean, diffs?: Array<boolean[]>) {
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
            square.className = `w-10 h-10 border-r border-slate-800 grid grid-cols-3 grid-rows-3 aspect-square text-xl font-semibold md:text-2xl`
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
            // If the checkbox is checked to render possible values, render them
            if (board[i][j].value === 0) {
                if (renderPossibleValues) {
                    board[i][j].possibleValues.forEach((value) => {
                        const subElement = document.createElement("span");
                        subElement.className = `text-xs grid place-items-center font-base text-slate-500`;
                        subElement.innerHTML = `${value}`;
                        square.appendChild(subElement);
                    });
                } else {
                    square.innerHTML = "&nbsp"
                }

            } else {
                square.innerHTML = `${board[i][j].value}`;
                square.classList.remove("grid-rows-3", "grid-cols-3");
                square.classList.add("place-items-center");
            }

            row.appendChild(square);
        }

        rows.push(row);
    }

    targetBoard?.replaceChildren(...rows);
}

function sleep(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

export async function paintSquare(row: number, col: number, val: number) {
    await sleep(20);
    const square = document.querySelector(`#row${row}col${col}`);
    if (square) {
        square.innerHTML = `${val}`;
        square.classList.add("text-green-600", "place-items-center");
        square.classList.remove("grid-rows-3", "grid-cols-3");

    } else {
        console.error("Square not found");
    }

    return;
}

// An easy sudoku will have 41 empty squares
// A medium level sudoku will have 46 empty squares
// I just want to use easy and medium difficulty for now
function adjustDifficulty(board: Board, solution: Board) {

    let desiredEmptySquares = Math.random() < .5 ? 41 : 46;

    let emptySquares = 0;

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === 0) {
                emptySquares += 1;
            }
        }
    }

    let squaresToFill = emptySquares - desiredEmptySquares;

    while (squaresToFill > 0) {

        const randomNum = Math.floor(Math.random() * (81 - 1 + 1)) + 1;
        const row = Math.floor((randomNum - 1) / 9);
        const col = (randomNum - 1) % 9;

        if (board[row][col] === 0) {
            board[row][col] = solution[row][col];
            squaresToFill -= 1;
        }

    }

    return board;

}