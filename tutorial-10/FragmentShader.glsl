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
const float diffuseFactor = 1.0;
const float shininess = 64.0;

void main() {
    vec3 baseColor = vColor;
    if (uIsTextureDrawing) {
        baseColor = texture2D(uSampler , vTextureCoord).rgb;
    }

    if (uEnableLighting) {
        vec3 color;
        vec3 directionToLight;
        vec3 vertexNormal;
        vec3 reflection;
        vec3 eyeDirection;
        vec3 ambientColor;
        vec3 diffuseColor;
        vec3 specularColor;
        float cosPhi;

        color = baseColor;

        // calculates the vector from the current vertex to the light source
        directionToLight = normalize(uLightPosition - vVertexPositionEye3);

        // normalizes the vertex normal vector
        vertexNormal = normalize(vNormalEye);

        // ambient lighting
        ambientColor = ambientFactor * color;

        // diffuse lighting
        cosPhi = dot(vNormalEye, directionToLight);
        cosPhi = clamp(cosPhi, 0.0, 1.0);
        diffuseColor = diffuseFactor * cosPhi * color;

        // specular lighting
        // calculate reflection
        reflection = 2.0 * (dot(vertexNormal, directionToLight)) * vertexNormal - directionToLight;
        reflection = normalize(reflection);

        // calculate the direction to the camera position
        eyeDirection = -normalize(vVertexPositionEye3);
        cosPhi = dot(reflection, eyeDirection);
        cosPhi = clamp(cosPhi, 0.0, 1.0);
        cosPhi = pow(cosPhi, shininess);

        if (cosPhi > 0.0) {
            specularColor = uLightColor * cosPhi;
            diffuseColor = diffuseColor * (1.0 - cosPhi);
        } else {
            specularColor = vec3(0.0, 0.0, 0.0);
        }

        gl_FragColor = vec4(ambientColor + diffuseColor + specularColor, 1);
    } else {
        gl_FragColor = vec4(baseColor, 1.0);
    }
}