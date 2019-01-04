attribute vec2 aVertexPosition;
attribute vec2 aVertexTextureCoord;
attribute vec4 aVertexColor;

uniform mat3 uProjectionMat;
uniform mat3 uModelMat;

varying vec4 vColor;
varying vec2 vTextureCoord;

void main() {
    vec3 pos = uProjectionMat * uModelMat * vec3(aVertexPosition, 1.0);

    vColor = aVertexColor;
    vTextureCoord = aVertexTextureCoord;

    gl_Position = vec4(pos.xy / pos.z, 0.0, 1.0);
}