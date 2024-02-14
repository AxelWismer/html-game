class World {
    static mapSize;
    static grid;
    static elementToPosition;
    static positionToElement;
    static player;

    static initialize(mapSize) {
        World.mapSize = mapSize;
        World.elementToPosition = {};
        World.positionToElement = {};
    }

    static deleteElement(worldElement) {
        // Check if the object is already in the map and update the position
        let oldPosition = World.elementToPosition[worldElement.getId()];
        if (oldPosition) {
            delete World.positionToElement[oldPosition.getId()];
            delete World.elementToPosition[worldElement.getId()];
        }
    }

    static setElement(worldElement, position) {
        this.deleteElement(worldElement);
        World.elementToPosition[worldElement.getId()] = position;
        // Map the new position to the element    
        World.positionToElement[position.getId()] = worldElement;
    }

    static getPosition(worldElement) {
        return World.elementToPosition[worldElement.getId()];
    }

    static getPositions() {
        return Object.values(World.elementToPosition).map(position => {
            return [World.getElement(position), position]
        });
    }

    static inMap(position) {
        return position.x >= 0 && position.x < World.mapSize.x
            && position.y >= 0 && position.y < World.mapSize.y;
    }

    static getElement(position) {
        return World.positionToElement[position.getId()];
    }

    static positionIsFree(position) {
        return this.getElement(position) === undefined;
    }

    static getGrid() {
        return World.elementToPosition;
    }

    static getElements(type) {
        return Object.values(World.positionToElement).filter(e => e instanceof type);
    }

    static getPlayer() {
        return World.getElements(Player)[0];
    }
}

const MOVES = {
    '': new Position(0, 0),
    undefined: new Position(0, 0),
    'ArrowUp': new Position(0, 1),
    'ArrowDown': new Position(0, -1),
    'ArrowLeft': new Position(-1, 0),
    'ArrowRight': new Position(1, 0)
}

class Game {
    static player;
    static count = 0;

    static initialize(refreshRate) {
        // initialize world based on map data
        const mapSize = new Position(mapDataJSON.size.x, mapDataJSON.size.y);
        World.initialize(mapSize);
        Screen.initialize(mapSize);

        Controller.initialize();
        Game.player = new Player();

        // Inserting elements into the map
        mapDataJSON.elements.forEach((element) => {
            const createElement = ELEMENTS[element.type]();
            console.log(createElement);
            World.setElement(createElement, new Position(element.position.x, mapSize.y - 1 - element.position.y));
        });
        
        setInterval(Game.updateGame, refreshRate)
    }

    static updateGame() {
        const input = Controller.readActions();
        // Recieve actions from the user from the keyboard
        if (input) { 
            Game.player.move(MOVES[input]) 
        }
        
        // Update screen
        Screen.drawHTML();
        // Screen.drawLogs();
    }
}

Game.initialize(100);