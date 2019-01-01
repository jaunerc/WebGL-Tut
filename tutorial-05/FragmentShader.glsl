precision mediump float;

uniform sampler2D uSampler;
uniform bool uIsTextureDrawing;

varying vec4 vColor;
varying vec2 vTextureCoord;

void main() {
    vec4 color = vColor;

    if (uIsTextureDrawing) {
        color = texture2D(uSampler , vTextureCoord);
    }

    gl_FragColor = color;
}