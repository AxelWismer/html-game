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

    /**
     * move element in direction VECTOR
     * @param {*} vector direction
     * @returns if movement is successful
     */
    move(vector) {
        return InteractionManager.resolveCollision(this, vector)
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
    'p': () => World.player,
    'w': () => new Wall(),
    'b': () => new Box(), 
}