attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec3 aVertexColor;
attribute vec2 aVertexTextureCoord;

uniform mat4 uProjectionMat;
uniform mat4 uModelMat;
uniform mat3 uNormalMat;

varying vec3 vColor;
varying vec3 vNormalEye;
varying vec3 vVertexPositionEye3;
varying vec2 vTextureCoord;

void main() {
    // calculate the vertex position in eye Coordinate
    vec4 vertexPositionEye4 = uModelMat * vec4(aVertexPosition, 1.0);
    vVertexPositionEye3 = vertexPositionEye4.xyz / vertexPositionEye4.w;

     // calculate the normal vector in eye coordinates
    vNormalEye = normalize(uNormalMat * aVertexNormal);

    // transform and calculate texture coordinates
    vTextureCoord = aVertexTextureCoord;

    // set color for fragment shader
    vColor = aVertexColor;

    // calculate the projected position
    gl_Position = uProjectionMat * vertexPositionEye4;
}