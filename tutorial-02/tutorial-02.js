let gl;

let context = {
    shaderProgram: null
};

let scene = {
    clearColor: {r:0.4, g:0.823, b:1, a:1},
    rectangleColor: {r:1.0, g:0.0, b:1.0},
    rectangleBuffer: null
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
}

/**
 * Sets the clear color for the webgl object.
 */
function prepareClearColor() {
    let color = scene.clearColor;
    gl.clearColor(color.r, color.g, color.b, color.a);
}

function prepareScene() {
    scene.rectangleBuffer = new RectangleBuffer(gl);
}

/**
 * Draws the scene.
 */
function draw() {
    gl.clear(gl.COLOR_BUFFER_BIT);

    let rectColor = scene.rectangleColor;
    gl.uniform3f(context.uColorId, rectColor.r, rectColor.g, rectColor.b);

    scene.rectangleBuffer.draw(gl, context.aVertexPositionId);
}