let gl;

let context = {
    shaderProgram: null
};

let texture = {
    imgSource: "countryside512.jpg",
    object: null
};

let scene = {
    clearColor: {r:0.4, g:0.823, b:1, a:1},
    numRectangles: 100,
    rectanglePosRange: {x: 250, y: 250},
    rectangleColor: null,
    rectangleTexture: null
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
            texture.object = loadTexture(gl, texture.imgSource, draw);
            prepareScene();
            draw();
        })
}

/**
 * Gets the IDs of the shader variables.
 */
function prepareGlVariables() {
    context.aVertexPositionId = gl.getAttribLocation(context.shaderProgram, "aVertexPosition");
    context.aVertexColorId = gl.getAttribLocation(context.shaderProgram, "aVertexColor");
    context.aVertexTextureCoordId = gl.getAttribLocation(context.shaderProgram, "aVertexTextureCoord");

    context.uProjectionMatId = gl.getUniformLocation(context.shaderProgram, "uProjectionMat");
    context.uModelMatId = gl.getUniformLocation(context.shaderProgram, "uModelMat");
    context.uIsTextureDrawingId = gl.getUniformLocation(context.shaderProgram, "uIsTextureDrawing");
    context.uSamplerId = gl.getUniformLocation(context.shaderProgram, "uSampler");
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
    scene.rectangleTexture = new Rectangle(gl, [1, 0, 0], [-200, 0], 250, 250);
    scene.rectangleColor = new Rectangle(gl, [1, 0, 0], [+200, 0], 250, 250)
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

    enableTexture();

    gl.uniform1i(context.uIsTextureDrawingId, 1);
    scene.rectangleTexture.draw(gl, context.aVertexPositionId,
        context.aVertexColorId, context.aVertexTextureCoordId, context.uModelMatId);

    gl.uniform1i(context.uIsTextureDrawingId, 0);
    scene.rectangleColor.draw(gl, context.aVertexPositionId,
        context.aVertexColorId, context.aVertexTextureCoordId, context.uModelMatId);
}

function enableTexture() {
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D , texture.object);
    gl.uniform1i(context.uSamplerId, 0);
}
