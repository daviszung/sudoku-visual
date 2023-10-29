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
                this.narrowAllSquaresByRegion()
                console.log(this.#virtualBoard, this.removedPossibilities, this.revealedByNarrowing, this.valuesDeduced);
                break;
            
            case "deduceRegions":
                this.deduceAllByRegion()
                console.log(this.#virtualBoard, this.removedPossibilities, this.revealedByNarrowing, this.deducedByRegion, this.valuesDeduced);
                break;

            case "narrowAndDeduceRowsAndCols":
                this.narrowAllSquaresByRowAndColumn()
                console.log(this.#virtualBoard, this.removedPossibilities, this.revealedByNarrowing, this.deducedByRegion, this.valuesDeduced);
                break;
        
            default:
                break;
        }
        this.removedPossibilities = 0
        this.revealedByNarrowing = 0
        this.deducedByRegion = 0
        this.valuesDeduced = 0
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
                    this.revealedByNarrowing += 1
                }
            }
        });

        return square;
    };

    private narrowAllSquaresByRegion() {
        for (let row = 0; row < this.#virtualBoard!.length; row++) {
            for (let col = 0; col < this.#virtualBoard![row].length; col++) {
                this.#virtualBoard![row][col] = this.narrowSquareByRegion(this.#virtualBoard![row][col]);
            }
        };
    };


    private narrowAllSquaresByRowAndColumn() {
        const board = this.#virtualBoard!
        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[row].length; col++) {
                if (board[row][col].value > 0) {
                    continue;
                };

                const { possibleValues } = board[row][col];

                // this is for each square in the same row as the square
                possibleValues.forEach((pValue) => {
                    let deducible = true;
                    for (let x = 0; x < board[row].length; x++) {
                        if (x !== col) {
                            if (pValue === board[row][x].value) {
                                this.removedPossibilities += 1;
                                possibleValues.delete(pValue);
                                deducible = false;
                            }
                            if (deducible && board[row][x].possibleValues.has(pValue)) {
                                deducible = false;
                            }
                        }
                        continue;
                    }
                    if (deducible) {
                        this.valuesDeduced += 1;
                        board[row][col].value = pValue;
                        board[row][col].possibleValues = new Set([pValue]);
                        this.#regions[board[row][col].region].delete(pValue);
                        return;
                    }
                });

                // if possible values have been narrowed down to 1 value, we found the value of the square.
                if (possibleValues.size === 1) {
                    this.revealedByNarrowing += 1;
                    const valueIterator = possibleValues.values();
                    const { value } = valueIterator.next();
                    board[row][col].value = value;
                    this.#regions[board[row][col].region].delete(value);
                    continue;
                };

                // this is for checking the column of the square
                possibleValues.forEach((pValue) => {
                    let deducible = true;
                    for (let i = 0; i < board.length; i++) {
                        if (i !== row) {
                            if (pValue === board[i][col].value) {
                                this.removedPossibilities += 1;
                                possibleValues.delete(pValue);
                                deducible = false;
                            }
                            if (deducible && board[i][col].possibleValues.has(pValue)) {
                                deducible = false;
                            }
                        }
                        continue;
                    };
                    if (deducible) {
                        this.valuesDeduced += 1;
                        board[row][col].value = pValue;
                        board[row][col].possibleValues = new Set([pValue]);
                        this.#regions[board[row][col].region].delete(pValue);
                        return;
                    }
                });

                // if possible values have been narrowed down to 1 value, we found the value of the square. we do this twice because
                // if it is a hit, we get an early return/continue.
                if (possibleValues.size === 1) {
                    this.revealedByNarrowing += 1;
                    const valueIterator = possibleValues.values();
                    const { value } = valueIterator.next();
                    board[row][col].value = value;
                    this.#regions[board[row][col].region].delete(value);
                    continue;
                };

            };

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
            console.error("Tried to deduce board that does not exist");
            return;
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