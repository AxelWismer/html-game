class Screen {
    static screenSize;

    static initialize(screenSize) {
        Screen.screenSize = screenSize;
    }

    static getScreen() {
        let draw = Array(Screen.screenSize.y).fill().map(() => Array(Screen.screenSize.x).fill())
        World.getPositions().forEach(([element, position]) => {
            draw[Screen.screenSize.y - 1 - position.y][position.x] = element.symbol;
        });
        return draw
    }

    static drawHTML() {
        document.getElementById("grid").innerHTML = Screen.getScreen().map(row =>
            row.map(cell => `<div class="grid-item">${cell ? cell : '-'}</div>`).join(' ')).join('\n')
    }

    static drawLogs() {
        console.log(Screen.getScreen().map(row =>
            row.map(cell => cell ? cell : '-').join(' ')).join('\n'));
    }
}
const action = {
    '': new Position(0, 0),
    undefined: new Position(0, 0),
    'ArrowUp': new Position(0, 1),
    'ArrowDown': new Position(0, -1),
    'ArrowLeft': new Position(-1, 0),
    'ArrowRight': new Position(1, 0)
}

class Controller {
    static initialize() {
        Game.initialize(new Position(10, 10));
        Screen.drawHTML();
        Screen.drawLogs();
        window.addEventListener("keydown", function (event) {
            // Do nothing if the event was already processed
            if (event.defaultPrevented) { return; }
            Game.updateGame(event.key);
            Screen.drawHTML();
            Screen.drawLogs();
            // Cancel the default action to avoid it being handled twice
            event.preventDefault();
        }, true);
    }
}
Controller.initialize();