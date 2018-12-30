/**
 * This class represents a component that can be drawn.
 */
class Drawable {
    /**
     * Creates a new Drawable object.
     * @param color RGB color as list [r, g, b]
     * @param position 2d vector {x:, y:}
     */
    constructor(color, position) {
        this.color = color;
        this.position = position;
    }

    draw(gl, uColorId, aVertexPositionId, uModelMatId) {
        throw new Error('You have to implement the method!');
    }
}

/**
 * This class represents an empty rectangle with a solid border.
 */
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

    /**
     * Creates the modelview-matrix for this rectangle.
     * @returns {mat3} movelview-matrix
     */
    createModelViewMat() {
        let modelViewMat = mat3.create();
        mat3.fromTranslation(modelViewMat, this.position);
        mat3.scale(modelViewMat, modelViewMat,[this.width, this.height]);
        return modelViewMat;
    }

    draw(gl, aVertexPositionId, uColorId, uModelMatId) {
        gl.uniform3fv(uColorId, this.color);
        gl.uniformMatrix3fv(uModelMatId, false, this.createModelViewMat());
        this.rectangleBuffer.draw(gl, aVertexPositionId);
    }
}