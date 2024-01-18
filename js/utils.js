class Position {
    constructor(x, y, z=0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    // Get position in level
    getPosition() {
        return [this.x, this.y];
    }

    getId() {
        return `${this.x},${this.y},${this.z}`;
    }

    add(position) {
        return new Position(this.x + position.x, this.y + position.y, this.z + position.z)
    }
    
    distance(position) {
        return new Position(position.x - this.x, position.y - this.y, position.z - this.z)
    }

    vector() {
        return new Position(Math.sign(this.x), Math.sign(this.y));
    }
}