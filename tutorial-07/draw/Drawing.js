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

    /**
     * Updates the position.
     * @param timeStamp The time difference since the last call.
     */
    updatePosition(timeStamp) {
        throw new Error('You have to implement the method!');
    }

    /**
     * Draws the drawable.
     * @param gl The WebGL object.
     * @param context The WebGL context.
     */
    draw(gl, context) {
        throw new Error('You have to implement the method!');
    }
}

/**
 * This class represents a basic rectangle.
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
}

/**
 * This class represents a colored rectangle.
 */
class ColoredRectangle extends Rectangle {
    constructor(gl, position, width, height) {
        super(gl, position, width, height);
    }

    draw(gl, context) {
        gl.uniformMatrix3fv(context.uModelMatId, false, super.createModelViewMat());
        this.rectangleBuffer.draw(gl, context.aVertexPositionId, context.aVertexColorId);
    }
}

/**
 * This class represents a textured rectangle.
 */
class TexturedRectangle extends Rectangle {
    constructor(gl, position, width, height) {
        super(gl, position, width, height);
    }

    draw(gl, context) {
        gl.uniform1i(context.uIsTextureDrawingId, 1);
        gl.uniformMatrix3fv(context.uModelMatId, false, super.createModelViewMat());
        this.rectangleBuffer.drawWithTexture(gl, context.aVertexPositionId, context.aVertexTextureCoordId);
        gl.uniform1i(context.uIsTextureDrawingId, 0);
    }
}

/**
 * This class represents a circle.
 */
class Circle extends Drawable {
    constructor(gl, position, size, numPoints, color) {
        super(position);
        this.size = size;
        this.numPoints = numPoints;
        this.color = color;
        this.angle = 0;
        this.lastTime = 0;
        this.speed = 1;
        this.prepareCircleBuffer(gl);
    }

    updatePosition(timeStamp) {
        let timeDiff = timeStamp - this.lastTime;
        this.angle += this.speed / timeDiff;
        if (this.angle > 2*Math.PI) {
            this.angle = 0;
        }
        this.lastTime = timeStamp;
    }

    prepareCircleBuffer(gl) {
        this.circleBuffer = new CircleBuffer(gl, this.numPoints, this.color);
    }

    createModelViewMat() {
        let modelViewMat = mat3.create();
        mat3.translate(modelViewMat, modelViewMat, this.position);
        mat3.rotate(modelViewMat, modelViewMat, this.angle);
        mat3.scale(modelViewMat, modelViewMat,[this.size / 2, this.size / 2]);
        return modelViewMat;
    }
}

class SolidCircle extends Circle {
    constructor(gl, position, size, numPoints, color) {
        super(gl, position, size, numPoints, color);
    }

    draw(gl, context) {
        gl.uniformMatrix3fv(context.uModelMatId, false, super.createModelViewMat());
        this.circleBuffer.draw(gl, context.aVertexPositionId, context.aVertexColorId);
    }
}

class FilledCircle extends Circle {
    constructor(gl, position, size, numPoints, color) {
        super(gl, position, size, numPoints, color);
    }

    prepareCircleBuffer(gl) {
        this.circleBuffer = new FilledCircleBuffer(gl, this.numPoints, this.color);
    }

    draw(gl, context) {
        gl.uniformMatrix3fv(context.uModelMatId, false, super.createModelViewMat());
        this.circleBuffer.draw(gl, context.aVertexPositionId, context.aVertexColorId);
    }
}