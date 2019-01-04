
function CircleBuffer(gl, numPoints, color) {

    function defineVertices(gl, numPoints) {
        let vertices = [];

        let angle = 2 * Math.PI / numPoints;

        for (let phi = 0; phi < 2*Math.PI; phi += angle) {
            let x = Math.sin(phi);
            let y = Math.cos(phi);
            vertices.push(x, y);
        }

        let buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        return buffer;
    }

    function defineColors(gl, numPoints, color) {
        let colors = [];

        for (let i = 0; i < numPoints; i++) {
            colors.push(color.r, color.g, color.b, color.a);
        }

        let buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
        return buffer;
    }

    function defineLines(gl, numPoints) {
        let lines = [];

        for (let i = 1; i < numPoints; i++) {
            lines.push(i-1, i);
        }
        lines.push(0, numPoints-1); // the last line to complete the circle.

        let buffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(lines), gl.STATIC_DRAW);
        return buffer;
    }

    return {
        bufferVertices: defineVertices(gl, numPoints),
        bufferLines: defineLines(gl, numPoints),
        bufferColors: defineColors(gl, numPoints, color),

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

        drawLines: function(gl) {
            let numLines = 2 * numPoints;
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufferLines);
            gl.drawElements(gl.LINES, numLines, gl.UNSIGNED_SHORT, 0);
        },

        draw: function (gl, aVertexPositionId, aVertexColorId,) {
            this.setPositionBuffer(gl, aVertexPositionId);
            this.setColorBuffer(gl, aVertexColorId);
            this.drawLines(gl);
        }
    }
}