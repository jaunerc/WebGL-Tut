let gl;

let context = {
    shaderProgram: null
};

let scene = {
    clearColor: {r:0.4, g:0.823, b:1, a:1},
    numRectangles: 100,
    rectanglePosRange: {x: 250, y: 250},
    rectangles: null
};

// Starts the program when the entire page loads
window.onload = start;

/**
 * Starts the program. After initializing webgl this function calls the draw
 * function.
 */
function start() {
    let canvas = document.getElementById("myCanvas");
    gl = prepareWebGL(canvas);
    context.shaderProgram = gl.createProgram();

    loadShader(gl, context.shaderProgram)
        .finally(() => {
            prepareGlVariables();
            prepareClearColor();
            prepareScene();
            draw();
        })
}

/**
 * Gets the IDs of the shader variables.
 */
function prepareGlVariables() {
    context.aVertexPositionId = gl.getAttribLocation(context.shaderProgram, "aVertexPosition");
    context.uColorId = gl.getUniformLocation(context.shaderProgram, "uColor");
    context.uProjectionMatId = gl.getUniformLocation(context.shaderProgram, "uProjectionMat");
    context.uModelMatId = gl.getUniformLocation(context.shaderProgram, "uModelMat");
}

/**
 * Sets the clear color for the webgl object.
 */
function prepareClearColor() {
    let color = scene.clearColor;
    gl.clearColor(color.r, color.g, color.b, color.a);
}

/**
 * Prepares the scene before drawing.
 */
function prepareScene() {
    setUpProjectionMat();
    scene.rectangles = createRectangles(scene.numRectangles, scene.rectanglePosRange);
}

/**
 * Sets up the projection matrix. This matrix provides the world coordinates.
 */
function setUpProjectionMat() {
    let projectionMat = mat3.create();
    mat3.fromScaling(projectionMat, [2.0 / gl.drawingBufferWidth, 2.0 / gl.drawingBufferHeight]);
    gl.uniformMatrix3fv(context.uProjectionMatId, false, projectionMat);
}

/**
 * Draws the scene.
 */
function draw() {
    gl.clear(gl.COLOR_BUFFER_BIT);

    scene.rectangles.forEach(function (rect) {
        rect.draw(gl, context.aVertexPositionId, context.uColorId, context.uModelMatId);
    })
}

/**
 * Creates rectangles with random properties.
 * @param numRects The number of rectangles
 * @param posRange Min and max position as 2d vector {x:, y:}
 * @returns {Array} List of rectangles.
 */
function createRectangles(numRects, posRange) {
    let rectangles = [];
    let maxSize = 100;
    for (let i = 0; i < numRects; i++) {
        let color = {r: Math.random(), g: Math.random(), b: Math.random()};
        let position = randomPosition(posRange);
        let width = randomInt(maxSize);
        let height = randomInt(maxSize);
        rectangles.push(new Rectangle(gl, [color.r, color.g, color.b], position, width, height));
    }
    return rectangles;
}

/**
 * Gets a random integer in the interval [0, max -1].
 * @param max Upper bound
 * @returns {number} A random integer
 */
function randomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

/**
 * Gets a random position.
 * @param posRange The range for the position [-x,x] [-y,y]
 * @returns {number[]} A random position as list [x, y]
 */
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

/**
 * Gets a random boolean.
 * @returns {boolean} A random boolean
 */
function coinFlip() {
    return Math.random() > 0.5;
}
