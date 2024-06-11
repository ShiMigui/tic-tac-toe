const $squares = document.querySelectorAll('.square'), $msg = document.getElementById('current-player');
let _board = [], _q = '', _running = false;

$squares.forEach((el, i) => el.addEventListener('click', () => setSquareClicked(i)));
document.getElementById('restart').addEventListener('click', start);

function start() {
    $squares.forEach((el) => el.setAttribute('q', ''))
    _board = ['', '', '', '', '', '', '', '', ''];
    _running = true;
    syncQuery('x');
}

function setQuery(el) { el.setAttribute('q', _q) }

function setSquareClicked(i) {
    if (!_running || _board[i]) return;

    setQuery($squares[i]);
    _board[i] = _q;

    if (verifyVictory()) {
        alert(`Victorious: ${_q}`);
        _running = false;
        return;
    }

    syncQuery(_q == 'x' ? 'o' : 'x');
}

function syncQuery(q) {
    $msg.innerText = q.toUpperCase();
    _q = q;
}

function verifyVictory() {
    for (let s of [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]) {
        let first = _board[s[0]];
        if (first !== '' && _board[s[1]] == first && _board[s[2]] == first) return true;
    }
    return false;
}

start();