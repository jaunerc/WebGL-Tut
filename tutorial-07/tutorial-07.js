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
    drawables: []
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
            texture.object = loadTexture(gl, texture.imgSource);
            prepareScene();
            window.requestAnimationFrame(drawAnimated);
        })
}

/**
 * Invokes the draw method and request this function again.
 * @param timeStamp The time difference since the last call.
 */
function drawAnimated(timeStamp) {
    updateDrawables(timeStamp);
    draw();
    window.requestAnimationFrame(drawAnimated);
}

/**
 * Updates the drawable objects.
 * @param timeStamp The time difference since the last call.
 */
function updateDrawables(timeStamp) {
    scene.drawables.forEach((drawable) => {
        drawable.updatePosition(timeStamp);
    });
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
    let circle1 = new FilledCircle(gl, [-300,100], 100, 24, {r:1, g:0, b:0, a:1});
    let circle2 = new SolidCircle(gl, [300,100], 50, 3, {r:0, g:0.5, b:0.5, a:1});
    let circle3 = new SolidCircle(gl, [0,-100], 150, 5, {r:0, g:0, b:1, a:1});

    let rect1 = new ColoredRectangle(gl, [-200, 0], 120, 100);
    let rect2 = new TexturedRectangle(gl, [+200, 0], 100, 100);

    scene.drawables.push(circle1);
    scene.drawables.push(circle2);
    scene.drawables.push(circle3);
    scene.drawables.push(rect1);
    scene.drawables.push(rect2);
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

    scene.drawables.forEach((drawable) =>{
        drawable.draw(gl, context);
    });
}

function enableTexture() {
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D , texture.object);
    gl.uniform1i(context.uSamplerId, 0);
}
