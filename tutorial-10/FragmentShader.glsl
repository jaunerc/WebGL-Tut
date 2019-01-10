precision mediump float;

uniform sampler2D uSampler;
uniform bool uIsTextureDrawing;

uniform bool uEnableLighting;
uniform vec3 uLightPosition;
uniform vec3 uLightColor;

varying vec3 vColor;
varying vec3 vNormalEye;
varying vec3 vVertexPositionEye3;
varying vec2 vTextureCoord;

const float ambientFactor = 0.2;

void main() {
    vec3 baseColor = vColor;
    if (uIsTextureDrawing) {
        baseColor = texture2D(uSampler , vTextureCoord).rgb;
    }

    if (uEnableLighting) {
        vec3 color = baseColor;

        // ambient lighting
        color = ambientFactor * color;

        gl_FragColor = vec4(color, 1);
    } else {
        gl_FragColor = vec4(baseColor, 1.0);
    }
}