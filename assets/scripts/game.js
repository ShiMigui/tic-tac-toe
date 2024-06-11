import TicTacToe from "./TicTacToe.js";

const game = () => {
    // dom elements
    const $squares = document.querySelectorAll('.square');
    const $currentPlayer = document.getElementById('current-player');
    const $points = document.querySelectorAll("h2 span");
    const $restartButton = document.getElementById('restart');

    // props
    const _points = { x: 0, o: 0 }
    let _running = true;

    // entity
    const ticTacToe = TicTacToe.startANewGame();

    // events
    $squares.forEach((el, i) => el.addEventListener('click', () => selectSquare(i)));
    $restartButton.addEventListener('click', restart);

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
        }
    }

    function updateCurrentPlayer(){
        $currentPlayer.innerText = ticTacToe.currentPlayer.toUpperCase();
    }

    function updatePoints(){
        $points[0].innerText = _points.x;
        $points[1].innerText = _points.o;
    }
}

game()