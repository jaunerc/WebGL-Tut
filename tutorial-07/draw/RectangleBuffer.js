
function RectangleBuffer(gl) {

    function defineVertices(gl) {
        let vertices = [
            -0.5, 0.5,
            -0.5, -0.5,
            0.5, -0.5,

            -0.5, 0.5,
            0.5, 0.5,
            0.5, -0.5
        ];

        let buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        return buffer;
    }

    function defineColors(gl) {
        let colors = [
            1, 0, 0, 1,
            0, 1, 0, 1,
            0, 0, 1, 1,

            1, 0, 0, 1,
            0, 1, 0, 1,
            0, 0, 1, 1
        ];

        let buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
        return buffer;
    }
    
    function defineTextureCoords(gl) {
        let textureCoordinates = [
            0.0,  1.0,
            0.0,  0.0,
            1.0,  0.0,

            0.0,  1.0,
            1.0,  1.0,
            1.0,  0.0,
        ];

        let buffer = gl.createBuffer ();
        gl.bindBuffer(gl.ARRAY_BUFFER , buffer);
        gl.bufferData(gl.ARRAY_BUFFER , new  Float32Array(textureCoordinates), gl.STATIC_DRAW);
        return buffer;
    }

    function defineTriangles(gl) {
        let triangles = [
            0, 1, 2,
            3, 4, 5
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
            gl.vertexAttribPointer(aVertexPositionId, 2, gl.FLOAT, false, 0, 0);
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
            let numTriangles = 2 * 3; // 2 vertices per triangle corner
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufferTriangles);
            gl.drawElements(gl.TRIANGLES, numTriangles, gl.UNSIGNED_SHORT, 0);
        },

        draw: function (gl, aVertexPositionId, aVertexColorId) {
            this.setPositionBuffer(gl, aVertexPositionId);
            this.setColorBuffer(gl, aVertexColorId);
            this.drawTriangles(gl);
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