class WorldElement {
    static id = 0;
    constructor(symbol) {
        this.symbol = symbol;
        this.id = WorldElement.id++;
    }
    getPosition() {
        return World.getPosition(this);
    }

    getId() {
        return this.id;
    }

    move() {
        return false;
    }
}

class MovingElement extends WorldElement {
    constructor(symbol) {
        super(symbol);
    }

    move(vector, chained = false) {
        let newPosition = this.getPosition().add(vector);
        let element = World.getElement(newPosition);

        if (!World.inMap(newPosition)) { return false }
        
        // check if place we want to move into is free
        // if not, propagate move if chained is true
        if (!element || chained && element.move(vector)) {
            World.setElement(this, newPosition);
            return true;
        }
        return false;
    }
}

class Player extends MovingElement {
    constructor() {
        super('😺');
    }

    move(vector) {
        return super.move(vector, true)
    }
}

class Wall extends WorldElement {
    constructor() {
        super('🗻');
    }
}

class Box extends MovingElement {
    constructor() {
        super('📦');
    }

    move(vector) {
        // Check if the position is valid
        return super.move(vector)
    }
}

const ELEMENTS = {
    'p': () => Game.player,
    'w': () => new Wall(),
    'b': () => new Box(), 
}