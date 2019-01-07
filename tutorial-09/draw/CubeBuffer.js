
function CubeBuffer(gl) {

    function defineVertices(gl) {
        let vertices = [
            // front
            -0.5, 0.5, 0.5,
            -0.5, -0.5, 0.5,
            0.5, -0.5, 0.5,
            0.5, 0.5, 0.5,

            // right
            0.5, 0.5, 0.5,
            0.5, -0.5, 0.5,
            0.5, -0.5, -0.5,
            0.5, 0.5, -0.5,

            // top
            -0.5, 0.5, 0.5,
            0.5, 0.5, 0.5,
            0.5, 0.5, -0.5,
            -0.5, 0.5, -0.5,

            // left
            -0.5, 0.5, 0.5,
            -0.5, -0.5, 0.5,
            -0.5, -0.5, -0.5,
            -0.5, 0.5, -0.5,

            // bottom
            -0.5, -0.5, 0.5,
            0.5, -0.5, 0.5,
            0.5, -0.5, -0.5,
            -0.5, -0.5, -0.5,

            // back
            -0.5, 0.5, -0.5,
            -0.5, -0.5, -0.5,
            0.5, -0.5, -0.5,
            0.5, 0.5, -0.5
        ];

        let buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        return buffer;
    }

    function defineColors(gl) {
        let colors = [
            0.223, 0.242, 0.273, 1,
            0.223, 0.242, 0.273, 1,
            0.223, 0.242, 0.273, 1,
            0.223, 0.242, 0.273, 1,

            0, 0.676, 0.707, 1,
            0, 0.676, 0.707, 1,
            0, 0.676, 0.707, 1,
            0, 0.676, 0.707, 1,

            1, 0.957, 0.878, 1,
            1, 0.957, 0.878, 1,
            1, 0.957, 0.878, 1,
            1, 0.957, 0.878, 1,

            0.973, 0.711, 0, 1,
            0.973, 0.711, 0, 1,
            0.973, 0.711, 0, 1,
            0.973, 0.711, 0, 1,

            0.988, 0.235, 0.235, 1,
            0.988, 0.235, 0.235, 1,
            0.988, 0.235, 0.235, 1,
            0.988, 0.235, 0.235, 1,

            0.8, 1, 1, 1,
            0.8, 1, 1, 1,
            0.8, 1, 1, 1,
            0.8, 1, 1, 1,
        ];

        let buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
        return buffer;
    }

    function defineTextureCoords(gl) {
        let texture = [
            // Front
            0.0,  1.0,
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            // Back
            0.0,  1.0,
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            // Top
            0.0,  1.0,
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            // Bottom
            0.0,  1.0,
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            // Right
            0.0,  1.0,
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
            // Left
            0.0,  1.0,
            0.0,  0.0,
            1.0,  0.0,
            1.0,  1.0,
        ];

        let buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texture), gl.STATIC_DRAW);
        return buffer;
    }

    function defineTriangles(gl) {
        let triangles = [
            // front
            0, 1, 2,        2, 3, 0,
            // right
            4, 5, 6,        6, 7, 4,
            // top
            8, 9, 10,       10, 11, 8,
            // left
            12, 13, 14,     14, 15, 12,
            // bottom
            16, 17, 18,     18, 19, 16,
            // back
            20, 21, 22,     22, 23, 20
        ];

        let buffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(triangles), gl.STATIC_DRAW);
        return buffer;
    }

    return {
        bufferVertices: defineVertices(gl),
        bufferColors: defineColors(gl),
        bufferTexture: defineTextureCoords(gl),
        bufferTriangles: defineTriangles(gl),

        setPositionBuffer: function(gl, aVertexPositionId) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferVertices);
            gl.vertexAttribPointer(aVertexPositionId, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(aVertexPositionId);
        },

        setColorBuffer: function(gl, aVertexColorId) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferColors);
            gl.vertexAttribPointer(aVertexColorId, 4, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(aVertexColorId);
        },

        setTextureBuffer: function(gl, aVertexTextureCoordId) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferTexture);
            gl.vertexAttribPointer(aVertexTextureCoordId, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(aVertexTextureCoordId);
        },

        drawTriangles: function(gl) {
            let numTriangles = 36; // 12 triangles * 3 endpoints
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufferTriangles);
            gl.drawElements(gl.TRIANGLES, numTriangles, gl.UNSIGNED_SHORT, 0);
        },

        draw: function (gl, aVertexPositionId, aVertexColorId) {
            this.setPositionBuffer(gl, aVertexPositionId);
            this.setColorBuffer(gl, aVertexColorId);
            this.drawTriangles(gl);

            // Fix for Google Chrome
            gl.disableVertexAttribArray(aVertexPositionId);
            gl.disableVertexAttribArray(aVertexColorId);
        },

        drawWithTexture: function (gl, aVertexPositionId, aVertexTextureCoordId) {
            this.setPositionBuffer(gl, aVertexPositionId);
            this.setTextureBuffer(gl, aVertexTextureCoordId);
            this.drawTriangles(gl);

            // Fix for Google Chrome
            gl.disableVertexAttribArray(aVertexPositionId);
            gl.disableVertexAttribArray(aVertexTextureCoordId);
        }
    }
}