

Uses this API:
https://sudoku-api.vercel.app/


Algos: 

Narrow by region -
Narrow by Region looks at each square on the board and for every square it looks at all of the square's possible values. Let's say a square has two possible values, 5 and 7. The algorithm checks if 5 or 7 are anywhere else in that 3x3 region of the board. If it doesn't find 5 or 7 anywhere else, it moves to the next square. But if it does find one of those values (let's say it finds 7), it will remove 7 from the possible values of that square, and then count how many possible values the square has left. Since 5 is the only remaining possible value, we are able to determine that the value of the square is 5!