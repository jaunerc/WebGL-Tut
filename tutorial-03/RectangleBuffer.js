
function RectangleBuffer(gl) {

    function defineVertices(gl) {
        let vertices = [
            -0.5, 0.5,
            -0.5, -0.5,
            0.5, -0.5,
            0.5, 0.5
        ];

        let buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        return buffer;
    }

    function defineLines(gl) {
        let lines = [
            0, 1,
            1, 2,
            2, 3,
            3, 0
        ];

        let buffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(lines), gl.STATIC_DRAW);
        return buffer;
    }

    return {
        bufferVertices: defineVertices(gl),
        bufferLines: defineLines(gl),
        draw: function (gl, aVertexPositionId) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.bufferVertices);
            gl.vertexAttribPointer(aVertexPositionId, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(aVertexPositionId);

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufferLines);
            gl.drawElements(gl.LINES, 8, gl.UNSIGNED_SHORT, 0);
        }
    }
}