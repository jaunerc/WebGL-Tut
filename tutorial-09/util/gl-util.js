
/**
 * Prepares a webgl debug context.
 * @param canvas The canvas to draw to
 * @returns {*}
 */
function prepareWebGL(canvas) {
    var context = canvas.getContext("webgl");
    if (!context) {
        alert("Your Browser does not support WebGL :-(");
    }
    return WebGLDebugUtils.makeDebugContext(context);
}

/**
 * Loads the fragment and vertex shader. Both shaders are attached to the shader program.
 * @param gl The webgl context
 * @param shaderProgram The webgl shader program
 * @returns A promise
 */
async function loadShader(gl, shaderProgram) {
    // The shader file paths are locally
    const fragmentUrl = './FragmentShader.glsl';
    const vertexUrl = './VertexShader.glsl';

    // This function waits for the two fetch
    // calls to be complete.
    const fragmentSource = await fetch(fragmentUrl)
        .then(function (response) {
            return response.text();
        });
    const vertexSource = await fetch(vertexUrl)
        .then(function (response) {
            return response.text();
        });

    let vertexShader = createAndCompileShader(gl, gl.VERTEX_SHADER, vertexSource);
    let fragmentShader = createAndCompileShader(gl, gl.FRAGMENT_SHADER, fragmentSource);

    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Failed to setup shader");
        return false;
    }
    gl.useProgram(shaderProgram);
    console.log("webgl is ready");
}

/**
 * Creates and compiles a shader.
 * @param gl The webgl context
 * @param shaderType The webgl shader type
 * @param shaderSource The source code of the shader
 * @returns {*}
 */
function createAndCompileShader(gl, shaderType, shaderSource) {
    let shader = gl.createShader(shaderType);
    gl.shaderSource(shader, shaderSource);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert("Shader Compile Error: " + gl.getShaderInfoLog(shader));
        return false;
    }
    return shader;
}


function loadTexture(gl, imgSource) {
    let image = new Image();
    let textureObj = gl.createTexture();
    image.onload = function () {
        //  create a new  texture
        gl.bindTexture(gl.TEXTURE_2D, textureObj);

        // set  parameters  for  the  texture
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
        gl.generateMipmap(gl.TEXTURE_2D);

        // turn  texture  off  again
        gl.bindTexture(gl.TEXTURE_2D, null);
    };
    image.src = imgSource;
    return textureObj;
}