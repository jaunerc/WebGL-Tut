precision mediump float;

uniform sampler2D uSampler;
uniform bool uIsTextureDrawing;

uniform bool uEnableLighting;
uniform vec3 uLightColor;
uniform vec3 uLightPosition;

varying vec3 vColor;
varying vec3 vNormalEye;
varying vec3 vVertexPositionEye3;
varying vec2 vTextureCoord;
varying vec3 vLightPositionEye3;

const float ambientFactor = 0.1;
const float diffuseFactor = 1.0;
const float shininess = 128.0;

const vec3 specularMaterialColor = vec3(0.3, 0.3, 0.3);

void main() {
    vec3 baseColor = vColor;
    if (uIsTextureDrawing) {
        baseColor = texture2D(uSampler , vTextureCoord).rgb;
    }

    if (uEnableLighting) {
        vec3 color = baseColor;

        // calculates the vector from the current vertex to the light source
        vec3 directionToLight = normalize(uLightPosition - vVertexPositionEye3);

        // normalizes the vertex normal vector
        vec3 vertexNormal = normalize(vNormalEye);

        // ambient lighting
        vec3 ambientColor = ambientFactor * uLightColor * color;

        // diffuse lighting
        float cosAngle = dot(vNormalEye, directionToLight);
        cosAngle = clamp(cosAngle, 0.0, 1.0);
        vec3 diffuseColor = diffuseFactor * cosAngle * color * uLightColor;

        vec3 specularColor = vec3(0.0, 0.0, 0.0);
        if (cosAngle > 0.0) {
            // specular lighting
            vec3 reflection = 2.0 * (dot(vertexNormal, directionToLight)) * vertexNormal - directionToLight;
            reflection = normalize(reflection);

            // calculate the direction to the camera position
            vec3 eyeDirection = -normalize(vVertexPositionEye3);
            float cosPhi = dot(reflection, eyeDirection);
            cosPhi = clamp(cosPhi, 0.0, 1.0);
            cosPhi = pow(cosPhi, shininess);

            specularColor = specularMaterialColor*cosPhi + uLightColor * cosPhi;
        }

        gl_FragColor = vec4(ambientColor + diffuseColor + specularColor, 1);
    } else {
        gl_FragColor = vec4(baseColor, 1.0);
    }
}