import TicTacToe from "./TicTacToe.js";

export const game = () => {
    // DOM elements
    const $board = document.getElementById("board");
    const $squares = document.querySelectorAll('.square');
    const $currentPlayer = document.getElementById('current-player');
    const $points = document.querySelectorAll("h2 span");
    const $restartButton = document.getElementById('restart');

    // Props
    const _squaresArray = Array.from($squares);
    const _points = { x: 0, o: 0 }
    let _running = true;

    // Entity
    const ticTacToe = TicTacToe.startANewGame();

    // Event listeners
    $board.addEventListener('click', handleBoardClick);
    $restartButton.addEventListener('click', restart);

    updateCurrentPlayer();

    function handleBoardClick(event) {
        const index = _squaresArray.indexOf(event.target);
        selectSquare(index);
    }

    function restart() {
        ticTacToe.restart();
        updateCurrentPlayer();
        for (let i = 0; i < $squares.length; i++) setSquareQuery(i, null);

        _running = true;
    }

    function setSquareQuery(index = 0, value = null) {
        $squares[index].setAttribute('query', value);
    }

    function selectSquare(index = 0) {
        if (!_running) return;

        try {
            let current = ticTacToe.currentPlayer;
            ticTacToe.selectSquare(index);
            setSquareQuery(index, current);
            updateCurrentPlayer();

            const winner = ticTacToe.victory();
            if (winner) {
                _points[winner] += 1;
                _running = false;
                updatePoints();
            }
        }
        catch (e) {
            alert(e);
            console.error(e);
        }
    }

    function updateCurrentPlayer() {
        $currentPlayer.innerText = ticTacToe.currentPlayer.toUpperCase();
    }

    function updatePoints() {
        $points[0].innerText = _points.x;
        $points[1].innerText = _points.o;
    }

    return { restart, $squares, selectSquare };
}