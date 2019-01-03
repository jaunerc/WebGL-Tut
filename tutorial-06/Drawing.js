/**
 * This class represents a component that can be drawn.
 */
class Drawable {
    /**
     * Creates a new Drawable object.
     * @param position 2d vector {x:, y:}
     */
    constructor(position) {
        this.position = position;
    }

    draw(gl, uColorId, aVertexPositionId, uModelMatId) {
        throw new Error('You have to implement the method!');
    }
}

/**
 * This class represents an empty rectangle with a solid border.
 */
class Rectangle extends Drawable {
    constructor(gl, position, width, height) {
        super(position);
        this.width = width;
        this.height = height;
        this.angle = 0;
        this.lastTime = 0;
        this.speed = 1 / 10;
        this.prepareRectangleBuffer(gl);
    }

    prepareRectangleBuffer(gl) {
        this.rectangleBuffer = new RectangleBuffer(gl);
    }

    updatePosition(timeStamp) {
        let timeDiff = timeStamp - this.lastTime;
        this.angle += this.speed / timeDiff;
        if (this.angle > 2*Math.PI) {
            this.angle = 0;
        }
        this.lastTime = timeStamp;
    }

    /**
     * Creates the modelview-matrix for this rectangle.
     * @returns {mat3} modelview-matrix
     */
    createModelViewMat() {
        let modelViewMat = mat3.create();
        mat3.translate(modelViewMat, modelViewMat, this.position);
        mat3.rotate(modelViewMat, modelViewMat, this.angle);
        mat3.scale(modelViewMat, modelViewMat,[this.width, this.height]);
        return modelViewMat;
    }

    draw(gl, aVertexPositionId, aVertexColorId, aVertexTextureCoordId, uModelMatId) {
        gl.uniformMatrix3fv(uModelMatId, false, this.createModelViewMat());
        this.rectangleBuffer.draw(gl, aVertexPositionId, aVertexColorId, aVertexTextureCoordId);
    }
}