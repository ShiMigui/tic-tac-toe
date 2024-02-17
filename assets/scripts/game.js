function Game() {
    const $squares = document.querySelectorAll('.square'), $msg = document.getElementById('msg');
    let _board = [], _q = '', _running = false;

    $squares.forEach((el, i) => el.addEventListener('click', () => setSquareClicked(i)));
    document.getElementById('reiniciar').addEventListener('click', start);

    function start() {
        $squares.forEach((el) => el.setAttribute('q', ''))
        _board = ['', '', '', '', '', '', '', '', ''];
        _running = true;
        atualizarQuery('x');
    }

    function setQuery(el) { el.setAttribute('q', _q) }

    function setSquareClicked(i) {
        if (!_running || _board[i]) return;

        setQuery($squares[i]);
        _board[i] = _q;

        if (verificarVitoria()) {
            alert(`Vitória de: ${_q}`);
            _running = false;
            return;
        }

        atualizarQuery(_q == 'x' ? 'o' : 'x');
    }

    function atualizarQuery(q) {
        $msg.innerText = q.toUpperCase();
        _q = q;
    }

    function verificarVitoria() {
        for (let s of [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]) {
            let first = _board[s[0]];
            if (first !== '' && _board[s[1]] == first && _board[s[2]] == first) return true;
        }
        return false;
    }

    return start;
}
Game()()