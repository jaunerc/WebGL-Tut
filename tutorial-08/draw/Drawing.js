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

