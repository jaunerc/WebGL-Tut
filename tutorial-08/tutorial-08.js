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
    eyePosition: [0, 0, 5],
    lookAtCenter: [0, 0, 0],
    lookAtUp: [0, 1, 0],
    cube: null
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
            //texture.object = loadTexture(gl, texture.imgSource, draw);
            prepareScene();
            window.requestAnimationFrame(drawAnimated);
        })
}

/**
 * Invokes the draw method and request this function again.
 * @param timeStamp The time difference since the last call.
 */
function drawAnimated(timeStamp) {
    updateScene();
    draw();
    window.requestAnimationFrame(drawAnimated);
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
    scene.cube = new Cube(gl, [0, 0, -20], 10);
}

function updateScene() {
    let rotateYSlider = document.getElementById("rotateAngleSlider");
    let rotateYInfo = document.getElementById("rotateAngleInfo");
    let rotateXBox = document.getElementById("rotateXBox");
    let rotateYBox = document.getElementById("rotateYBox");
    let rotateZBox = document.getElementById("rotateZBox");

    let xAxis = (rotateXBox.checked) ? 1 : 0;
    let yAxis = (rotateYBox.checked) ? 1 : 0;
    let zAxis = (rotateZBox.checked) ? 1 : 0;

    let yAngle = parseInt(rotateYSlider.value);
    rotateYInfo.value = yAngle;
    scene.cube.rotate(yAngle, [xAxis, yAxis, zAxis]);
}

/**
 * Sets up the projection matrix. This matrix provides the world coordinates.
 */
function setUpProjectionMat() {
    let projectionMat = mat4.create();
    let screenRatio = gl.drawingBufferWidth / gl.drawingBufferHeight;
    mat4.perspective(projectionMat, glMatrix.toRadian(45), screenRatio, 1, 300);
    gl.uniformMatrix4fv(context.uProjectionMatId , false , projectionMat);
}

function setUpViewMat() {
    let viewMatrix = mat4.create();
    mat4.lookAt(viewMatrix, scene.eyePosition, scene.lookAtCenter, scene.lookAtUp);
    return viewMatrix;
}

/**
 * Draws the scene.
 */
function draw() {
    gl.clear(gl.COLOR_BUFFER_BIT);

    let viewMatrix = setUpViewMat();
    scene.cube.draw(gl, context, viewMatrix);
}

function enableTexture() {
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D , texture.object);
    gl.uniform1i(context.uSamplerId, 0);
}
