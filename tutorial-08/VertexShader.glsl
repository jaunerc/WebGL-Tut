attribute vec3 aVertexPosition;
attribute vec2 aVertexTextureCoord;
attribute vec4 aVertexColor;

uniform mat4 uProjectionMat;
uniform mat4 uModelMat;

varying vec4 vColor;
varying vec2 vTextureCoord;

void main() {
    vColor = aVertexColor;

    vTextureCoord = aVertexTextureCoord;

    gl_Position = uProjectionMat * uModelMat * vec4(aVertexPosition, 1);
}