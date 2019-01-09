precision mediump float;

uniform sampler2D uSampler;
uniform bool uIsTextureDrawing;

varying vec3 vColor;
varying vec3 vNormalEye;
varying vec3 vVertexPositionEye3;
varying vec2 vTextureCoord;

void main() {
    vec4 color = vec4(vColor, 1);

    if (uIsTextureDrawing) {
        color = texture2D(uSampler , vTextureCoord);
    }

    gl_FragColor = color;
}