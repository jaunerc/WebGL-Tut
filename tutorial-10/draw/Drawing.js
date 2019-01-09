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
     */
    translate(vTranslation) {
        throw new Error('You have to implement the method!');
    }

    rotate(angle, vRotation) {
        throw new Error('You have to implement the method!');
    }

    /**
     * Draws the drawable.
     * @param gl The WebGL object.
     * @param context The WebGL context.
     */
    draw(gl, context, viewMatrix) {
        throw new Error('You have to implement the method!');
    }
}

class Cube extends Drawable {

    constructor(gl, position, size) {
        super(position);
        this.size = size;
        this.angle = 0;
        this.vRotation = [0, 0, 0];
        this.prepareCubeBuffer(gl);
    }

    prepareCubeBuffer(gl) {
        throw new Error('You have to implement the method!');
    }

    rotate(angle, vRotation) {
        this.angle = angle;
        this.vRotation = vRotation;
    }

    /**
     * Creates the modelview-matrix for this cube.
     * @returns {mat4} modelview-matrix
     */
    createModelViewMat(viewMatrix) {
        let modelViewMat = mat4.create();
        mat4.copy(modelViewMat, viewMatrix);
        mat4.translate(modelViewMat, modelViewMat, this.position);
        mat4.rotate(modelViewMat, modelViewMat, glMatrix.toRadian(this.angle), this.vRotation);
        mat4.scale(modelViewMat, modelViewMat, [this.size, this.size, this.size]);
        return modelViewMat;
    }

    setModelNormalMat(gl, viewMatrix, uModelMatId, uNormalMatId) {
        let modelViewMat = this.createModelViewMat(viewMatrix);
        let normalMat = mat3.create();
        mat3.normalFromMat4(normalMat, modelViewMat);

        gl.uniformMatrix4fv(uModelMatId,  false, modelViewMat);
        gl.uniformMatrix3fv(uNormalMatId, false, normalMat);
    }

    draw(gl, context, viewMatrix) {
        throw new Error('You have to implement the method!');
    }
}

class SolidCube extends Cube {

    constructor(gl, position, size) {
        super(gl, position, size);
    }

    prepareCubeBuffer(gl) {
        this.cubeBuffer = new CubeBuffer(gl);
    }

    draw(gl, context, viewMatrix) {
        //let modelViewMat = this.createModelViewMat(viewMatrix);
        //gl.uniformMatrix4fv(context.uModelMatId, false, modelViewMat);
        this.setModelNormalMat(gl, viewMatrix, context.uModelMatId, context.uNormalMatId);
        this.cubeBuffer.draw(gl, context.aVertexPositionId, context.aVertexNormalId, context.aVertexColorId);
    }
}

class TexturedCube extends Cube {

    constructor(gl, position, size) {
        super(gl, position, size);
        this.prepareCubeBuffer(gl);
    }

    prepareCubeBuffer(gl) {
        this.cubeBuffer = new CubeBuffer(gl);
    }

    draw(gl, context, viewMatrix) {
        gl.uniform1i(context.uIsTextureDrawingId, 1);
        //let modelViewMat = this.createModelViewMat(viewMatrix);
        //gl.uniformMatrix4fv(context.uModelMatId, false, modelViewMat);
        this.setModelNormalMat(gl, viewMatrix, context.uModelMatId, context.uNormalMatId);
        this.cubeBuffer.drawWithTexture(gl, context.aVertexPositionId, context.aVertexNormalId, context.aVertexTextureCoordId);
        gl.uniform1i(context.uIsTextureDrawingId, 0);
    }
}

