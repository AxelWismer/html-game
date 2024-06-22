class Screen {
    static screenSize;

    static initialize(screenSize) {
        Screen.screenSize = screenSize;
    }

    static getScreen() {
        const screenCenter = new Position(5,5,0);
        const distanceToCenter = new Position(Math.floor(Screen.screenSize.x / 2), Math.floor(Screen.screenSize.y / 2))
        const screenTopLeftWorldPosition = screenCenter.substract(distanceToCenter);
        const screenBottomRightWorldPosition = screenTopLeftWorldPosition.add(Screen.screenSize).substract(new Position(1, 1));

        // Set number of columns in html template
        document.querySelector(":root").style.setProperty('--column-var', Screen.screenSize.x)

        // Draw is an array of all the cells to be filled with the element sprites
        let draw = Array(Screen.screenSize.y).fill().map(() => Array(Screen.screenSize.x).fill())

        // Fill the draw array with the elements in the world
        World.getElementsWithin(screenTopLeftWorldPosition, screenBottomRightWorldPosition).forEach(([element, position]) => {
            // transform world position to screen position
            const screenPosition = position.substract(screenTopLeftWorldPosition);
            draw[Screen.screenSize.y - 1 - screenPosition.y][screenPosition.x] = element?.symbol;
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