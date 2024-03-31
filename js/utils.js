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

    substract(position){
        return new Position(this.x - position.x, this.y - position.y, this.z - position.z)
    }

    vector() {
        return new Position(Math.sign(this.x), Math.sign(this.y));
    }

    static getSurroundingPositions(center, distance) {
        const positions = []
        for (let x = center.x - distance; x <= center.x + distance; x++) {
            for (let y = center.y - distance; y <= center.y + distance; y++) {
                positions.push(new Position(x, y, center.z));
            }
        }
        return positions;
    }
}