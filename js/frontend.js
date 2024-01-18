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


class Controller {
    static action;

    static initialize() {
        window.addEventListener("keydown", function (event) {
            // Do nothing if the event was already processed
            if (event.defaultPrevented) { return; }
            Controller.action = event.key;
            // Game.updateGame(event.key);

            // Cancel the default action to avoid it being handled twice
            event.preventDefault();
        }, true);
    }

    static readActions() {
        let action = Controller.action;
        Controller.action = null;
        return action;
    }
}