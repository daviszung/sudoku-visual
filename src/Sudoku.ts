import { adjustRegion } from "./sudokuHelpers";
import { Val } from "./controls";

type regions = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i";
type RegionCache = Set<Val>
export type square = {
  value: Val;
  possibleValues: Set<Val>;
  region: regions;
}
type RegionsDict = {
  [index in regions]: RegionCache
}
type Algo = "narrowRegions" | "narrowAndDeduceRowsAndCols" | "deduceRegions"


// Using the Sudoku Class
// Create an instance of Sudoku using "const myInstance = new Sudoku()"
// Pass in an unsolved board to Sudoku using "myInstance.constructVirtualBoard(unsolvedBoardHere)"

export class Sudoku {
    // virtual board
    #virtualBoard: square[][] | undefined

    // region caches
    #regionA: RegionCache
    #regionB: RegionCache
    #regionC: RegionCache
    #regionD: RegionCache
    #regionE: RegionCache
    #regionF: RegionCache
    #regionG: RegionCache
    #regionH: RegionCache
    #regionI: RegionCache

    // region dict
    #regions: RegionsDict

    // meta
    removedPossibilities: number
    revealedByNarrowing: number
    valuesDeduced: number
    deducedByRegion: number

    constructor () {

        this.#virtualBoard = undefined

        this.#regionA = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        this.#regionB = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        this.#regionC = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        this.#regionD = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        this.#regionE = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        this.#regionF = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        this.#regionG = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        this.#regionH = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        this.#regionI = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        
        this.#regions = {
            a: this.#regionA,
            b: this.#regionB,
            c: this.#regionC,
            d: this.#regionD,
            e: this.#regionE,
            f: this.#regionF,
            g: this.#regionG,
            h: this.#regionH,
            i: this.#regionI,
        }

        this.removedPossibilities = 0
        this.revealedByNarrowing = 0
        this.valuesDeduced = 0
        this.deducedByRegion = 0
    }

    public constructVirtualBoard(board: Array<number[]>) {
        if (!board.length) {
            console.error("Tried to construct virtual board with empty blueprint")
            return
        }
        const boardCopy = [];

        for (let i = 0; i < board.length; i++) {
            const row: square[] = [];

            for (let k = 0; k < board[i].length; k++) {
                const region = adjustRegion(i, k);

                if (board[i][k] > 0) {
                    this.#regions[region].delete(board[i][k] as Val);

                    const square: square = {
                        value: board[i][k] as Val,
                        possibleValues: new Set([board[i][k] as Val]),
                        region: region
                    };
                    row.push(square);
                } else {
                    const square: square = {
                        value: board[i][k] as Val,
                        possibleValues: new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]),
                        region: region
                    };
                    row.push(square);
                }

            };
            boardCopy.push(row);
        };

        this.#virtualBoard = boardCopy
        return;     

    }

    public next(algo: Algo) {
        switch (algo) {
            case "narrowRegions":
                console.log(this.#virtualBoard);
                this.narrowAllSquaresByRegion(this.#virtualBoard!)
                console.log(this.#virtualBoard);
                break;
            
            case "deduceRegions":
                console.log(this.#virtualBoard);
                this.deduceAllByRegion()
                console.log(this.#virtualBoard);
                break;
        
            default:
                break;
        }


    }

    private narrowSquareByRegion(square: square) {
        if (square.value > 0) {
            return square;
        };

        square.possibleValues.forEach((value) => {
            if (!this.#regions[square.region].has(value)) {
                square.possibleValues.delete(value);
                this.removedPossibilities += 1;
                if (square.possibleValues.size === 1) {
                    const valueIterator = square.possibleValues.values();
                    const { value } = valueIterator.next();
                    square.value = value;
                }
            }
        });

        return square;
    };

    private narrowAllSquaresByRegion(board: square[][]) {
        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[row].length; col++) {
                board[row][col] = this.narrowSquareByRegion(board[row][col]);
            }
        };

        return board;
    };


    private deduceByRegion(row: number, col: number) {
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;

        const { possibleValues } = this.#virtualBoard![row][col];

        possibleValues.forEach((pValue) => {
            let deducible = true;
            for (let i = startRow; i < startRow + 3; i++) {
                for (let j = startCol; j < startCol + 3; j++) {
                    if ((i === row && j === col)) {
                        continue;
                    }
                    if (this.#virtualBoard![i][j].value === pValue) {
                        possibleValues.delete(pValue);
                        this.removedPossibilities += 1;
                        deducible = false;
                    }
                    if (this.#virtualBoard![i][j].possibleValues.has(pValue)) {
                        deducible = false;
                    }
                }
            };
            if (deducible) {
                this.deducedByRegion += 1;
                this.#virtualBoard![row][col].value = pValue;
                this.#virtualBoard![row][col].possibleValues = new Set([pValue]);
                this.#regions[this.#virtualBoard![row][col].region].delete(pValue);
                return;
            }
        });
    }


    private deduceAllByRegion() {
        if (!this.#virtualBoard) {
            console.error("Tried to deduce board that does not exist")
            return
        }

        for (let row = 0; row < this.#virtualBoard.length; row++) {
            for (let col = 0; col < this.#virtualBoard[row].length; col++) {
                if (this.#virtualBoard[row][col].value === 0) {
                    this.deduceByRegion(row, col);
                }
            }
        }
        return this.#virtualBoard;
    };
}