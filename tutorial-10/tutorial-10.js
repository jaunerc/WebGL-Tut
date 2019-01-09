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
    lightPosition: [0, 0, 0], // Position of the light source
    lightColor: [1, 1, 1], // light color
    cubes: []
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
    updateScene();
    draw();
    window.requestAnimationFrame(drawAnimated);
}

/**
 * Gets the IDs of the shader variables.
 */
function prepareGlVariables() {
    context.aVertexPositionId = gl.getAttribLocation(context.shaderProgram, "aVertexPosition");
    context.aVertexNormalId = gl.getAttribLocation(context.shaderProgram, "aVertexNormal");
    context.aVertexColorId = gl.getAttribLocation(context.shaderProgram, "aVertexColor");
    context.aVertexTextureCoordId = gl.getAttribLocation(context.shaderProgram, "aVertexTextureCoord");

    context.uProjectionMatId = gl.getUniformLocation(context.shaderProgram, "uProjectionMat");
    context.uModelMatId = gl.getUniformLocation(context.shaderProgram, "uModelMat");
    context.uNormalMatId = gl.getUniformLocation(context.shaderProgram, "uNormalMat");

    // Lighting
    context.uEnableLightingId = gl.getUniformLocation(context.shaderProgram, "uEnableLighting");
    context.uLightPositionId = gl.getUniformLocation(context.shaderProgram, "uLightPosition");
    context.uLightColorId = gl.getUniformLocation(context.shaderProgram, "uLightColor");


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
    setUpLight();
    setUpProjectionMat();
    let cube1 = new TexturedCube(gl, [-10, 0, -30], 10);
    let cube2 = new SolidCube(gl, [10, 0, -30], 10);
    scene.cubes.push(cube1);
    scene.cubes.push(cube2);
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

    scene.cubes.forEach((cube) => cube.rotate(yAngle, [xAxis, yAxis, zAxis]));
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

function setUpLight() {
    gl.uniform1i(context.uEnableLightingId, 1);
    gl.uniform3fv(context.uLightPositionId, scene.lightPosition);
    gl.uniform3fv(context.uLightColorId, scene.lightColor);
}

/**
 * Draws the scene.
 */
function draw() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // z-buffer

    gl.enable(gl.DEPTH_TEST); // z-buffer

    enableTexture();

    let viewMatrix = setUpViewMat();
    scene.cubes.forEach((cube) => cube.draw(gl, context, viewMatrix));
}

function enableTexture() {
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D , texture.object);
    gl.uniform1i(context.uSamplerId, 0);
}
