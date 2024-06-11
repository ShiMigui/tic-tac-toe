export default class TicTacToe {
    constructor(squares = [], currentPlayer = '') {
        this.setGameProps(squares, currentPlayer);
    }

    set currentPlayer(currentPlayer = '') {
        currentPlayer = currentPlayer.toLowerCase().trim();

        if (currentPlayer != 'x' && currentPlayer != 'o' && currentPlayer != null) {
            throw new Error(`Value of current player must be equals to 'x', 'o' or null! value = ${currentPlayer}`);
        }

        this._currentPlayer = currentPlayer;
    }
    get currentPlayer() { return this._currentPlayer; }

    set squares(squares = []) {
        if (squares.length != 9) {
            throw new Error(`Board's squares number must be equal to 9! length: ${squares.length}`);
        }

        this._squares = squares;
    }
    get squares() { return this._squares; }

    setGameProps(squares = [], currentPlayer = '') {
        this.squares = squares;
        this.currentPlayer = currentPlayer;
    }

    restart() {
        this.squares.fill(null);
        this.currentPlayer = 'x';
    }

    static startANewGame(){
        return new TicTacToe(new Array(9), 'x');
    }

    victory() {
        for (let position of [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]) {
            let first = this.squares[position[0]];
            if (first !== null && this.squares[position[1]] == first && this.squares[position[2]] == first) {
                return first;
            }
        }
        return null;
    }

    nextPlayer() {
        this.currentPlayer = this.currentPlayer == 'x' ? 'o' : 'x';
    }

    selectSquare(squareIndex = 0) {
        if (squareIndex < 0 || squareIndex > 8) {
            throw new Error(`Square index must be between 0 and 8! Square index = ${squareIndex}`);
        }

        if(this.squares[squareIndex] != null){
            throw new Error(`Square is already taken by '${this.squares[squareIndex].toUpperCase()}'`);
        }

        this.squares[squareIndex] = this.currentPlayer;
        this.nextPlayer();
    }
}