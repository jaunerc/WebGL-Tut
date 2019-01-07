
function WireFrameCubeBuffer(gl) {

    function defineVertices(gl) {
        let vertices = [
            // front side
            -0.5, 0.5, 0.5,     // 0
            -0.5, -0.5, 0.5,    // 1
            0.5, -0.5, 0.5,     // 2
            0.5, 0.5, 0.5,      // 3

            // back side
            -0.5, 0.5, -0.5,    // 4
            -0.5, -0.5, -0.5,   // 5
            0.5, -0.5, -0.5,    // 6
            0.5, 0.5, -0.5,     // 7
        ];

        let buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        return buffer;
    }

    function defineColors(gl) {
        let colors = [
            // front side
            1.0, 0.0, 0.0, 1.0,
            1.0, 0.0, 0.0, 1.0,
            1.0, 0.0, 0.0, 1.0,
            1.0, 0.0, 0.0, 1.0,

            // back side
            1.0, 1.0, 0.0, 1.0,
            1.0, 1.0, 0.0, 1.0,
            1.0, 1.0, 0.0, 1.0,
            1.0, 1.0, 0.0, 1.0,
        ];

        let buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
        return buffer;
    }

    function defineLines(gl) {
        let lines = [
            // front side square
            0, 1,
            1, 2,
            2, 3,
            3, 0,

            // back side square
            4, 5,
            5, 6,
            6, 7,
            7, 4,

            // lines from front to back
            0, 4,
            1, 5,
            2, 6,
            3, 7
        ];

        let buffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(lines), gl.STATIC_DRAW);
        return buffer;
    }

    return {
        bufferVertices: defineVertices(gl),
        bufferColors: defineColors(gl),
        bufferLines: defineLines(gl),

        setPositionBuffer: function(gl, aVertexPositionId) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferVertices);
            gl.vertexAttribPointer(aVertexPositionId, 3, gl.FLOAT, false, 0, 0); // we need three coordinates now
            gl.enableVertexAttribArray(aVertexPositionId);
        },

        setColorBuffer: function(gl, aVertexColorId) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferColors);
            gl.vertexAttribPointer(aVertexColorId, 4, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(aVertexColorId);
        },

        drawTriangles: function(gl) {
            let numLines = 24; // 12 lines * 2 endpoints
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufferLines);
            gl.drawElements(gl.LINES, numLines, gl.UNSIGNED_SHORT, 0);
        },

        draw: function (gl, aVertexPositionId, aVertexColorId) {
            this.setPositionBuffer(gl, aVertexPositionId);
            this.setColorBuffer(gl, aVertexColorId);
            this.drawTriangles(gl);
        }
    }
}