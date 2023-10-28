
export async function getBoard() {
    try {
        console.log("here");
        const response = await fetch("https://sudoku-api.vercel.app/api/dosuku");
        const body = await response.json()
        console.log(body);
    }
    catch (error) {
        console.error(error);
    }

}