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

class Game {
    static player;

    static initialize(mapSize) {
        World.initialize(mapSize);
        Screen.initialize(mapSize);
        Game.player = new Player();

        const elements = {
            'p': () => Game.player,
            'w': () => new Wall(),
            'b': () => new Box(),
            'e': () => new Enemy()

        }
        // Inserting elements into the map
        const walls = [
            ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
            ['w', '-', '-', '-', '-', '-', '-', '-', '-', 'w'],
            ['w', '-', 'w', '-', '-', 'w', '-', 'w', 'e', 'w'],
            ['w', '-', 'w', '-', 'w', 'w', '-', 'w', '-', 'w'],
            ['w', '-', 'w', '-', 'p', '-', '-', '-', '-', 'w'],
            ['w', '-', 'w', '-', 'b', '-', '-', '-', '-', 'w'],
            ['w', '-', '-', '-', 'b', 'b', '-', '-', '-', 'w'],
            ['w', '-', '-', '-', 'b', '-', '-', '-', '-', 'w'],
            ['w', '-', '-', '-', '-', '-', '-', '-', '-', 'w'],
            ['w', '-', '-', '-', '-', '-', '-', '-', '-', 'w'],

        ].forEach((row, j) => row.forEach((cell, i) => {
            if (cell in elements) {
                World.setElement(elements[cell](), new Position(i, mapSize.y - 1 - j));
            }
        }))
    }

    static updateGame(input) {
        // Recieve actions from the user from the keyboard
        if (action[input]) { Game.player.move(action[input]) }
        World.getElements(Enemy).forEach(e => e.move())
    }
}

