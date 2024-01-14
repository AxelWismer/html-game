class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    getPosition() {
        return [this.x, this.y];
    }
    
    getId() {
        return `${this.x},${this.y}`;
    }
    
    add(position) {
        return new Position(this.x + position.x, this.y + position.y)
    }
    distance(position) {
        return new Position(position.x - this.x, position.y - this.y)
    }
    
    vector() {
        return new Position(Math.sign(this.x), Math.sign(this.y));
    }
    
    maxDirection() {
        return Math.abs(this.x) >= Math.abs(this.y) ? new Position(this.x, 0): new Position(0, this.y);
    }
    
    minDirection() {
        return Math.abs(this.x) < Math.abs(this.y) ? new Position(this.x, 0): new Position(0, this.y);
    }
}