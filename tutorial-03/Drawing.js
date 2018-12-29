
class Drawable {
    constructor(color, position) {
        this.color = color;
        this.position = position;
    }

    draw(gl, uColorId, aVertexPositionId, uModelMatId) {
        throw new Error('You have to implement the method!');
    }
}

class RectangleLines extends Drawable {
    constructor(gl, color, position, width, height) {
        super(color, position);
        this.width = width;
        this.height = height;
        this.prepareRectangleBuffer(gl);
    }

    prepareRectangleBuffer(gl) {
        this.rectangleBuffer = new RectangleBuffer(gl);
    }

    createModelMat() {
        let modelMat = mat3.create();
        mat3.fromTranslation(modelMat, this.position);
        mat3.scale(modelMat, modelMat,[this.width, this.height]);
        return modelMat;
    }

    draw(gl, aVertexPositionId, uColorId, uModelMatId) {
        gl.uniform3fv(uColorId, this.color);
        gl.uniformMatrix3fv(uModelMatId, false, this.createModelMat());
        this.rectangleBuffer.draw(gl, aVertexPositionId);
    }
}

function createRectangles(numRects, posRange) {
    let rectangles = [];
    let maxSize = 100;
    for (let i = 0; i < numRects; i++) {
        let color = {r: Math.random(), g: Math.random(), b: Math.random()};
        let position = randomPosition(posRange);
        let width = randomInt(maxSize);
        let height = randomInt(maxSize);
        rectangles.push(new RectangleLines(gl, [color.r, color.g, color.b], position, width, height));
    }
    return rectangles;
}

function randomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function randomPosition(posRange) {
    let position = [randomInt(posRange.x), randomInt(posRange.y)];
    if (coinFlip()) {
        position[0] *= -1;
    }
    if (coinFlip()) {
        position[1] *= -1;
    }
    return position;
}

function coinFlip() {
    return Math.random() > 0.5;
}