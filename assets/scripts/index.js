import { game } from "./game.js";

const { restart, $squares, selectSquare } = game();
let selected = null;

document.addEventListener("keydown", handleKeyBoard);

function handleKeyBoard(e) {
    const KEY = e.key;

    if (KEY == 'r') {
        restart();
    }
    else if (KEY.startsWith("Arrow")) {
        if (selected != null) {
            removeSelectSquare();

            if (KEY === "ArrowUp") {
                selected = (selected - 3 + 9) % 9;
            } else if (KEY === "ArrowDown") {
                selected = (selected + 3) % 9;
            } else if (KEY === "ArrowLeft") {
                selected = (selected % 3 === 0) ? selected + 2 : selected - 1;
            } else if (KEY === "ArrowRight") {
                selected = (selected % 3 === 2) ? selected - 2 : selected + 1;
            }
        }
        else selected = 0;

        addSelectSquare();
    }
    else if ((KEY == "Enter" || KEY == " ") && selected != null) selectSquare(selected);
}

function addSelectSquare() {
    $squares[selected].classList.add('select');
}

function removeSelectSquare() {
    $squares[selected].classList.remove('select');
}