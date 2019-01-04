
function FilledCircleBuffer(gl, numPoints, color) {

    function defineVertices(gl, numPoints) {
        let vertices = [0,0];

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

        for (let i = 0; i < numPoints + 1; i++) {
            colors.push(color.r, color.g, color.b, color.a);
        }

        let buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
        return buffer;
    }

    function defineTriangles(gl, numPoints) {
        let triangles = [];

        for (let i = 2; i < numPoints + 1; i++) {
            triangles.push(0, i-1, i);
        }
        triangles.push(0, numPoints, 1);

        let buffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(triangles), gl.STATIC_DRAW);
        return buffer;
    }

    return {
        bufferVertices: defineVertices(gl, numPoints),
        bufferTriangles: defineTriangles(gl, numPoints),
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

        drawTriangles: function(gl) {
            let numTriangles = numPoints * 3; // 2 vertices per triangle corner
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufferTriangles);
            gl.drawElements(gl.TRIANGLES, numTriangles, gl.UNSIGNED_SHORT, 0);
        },

        draw: function (gl, aVertexPositionId, aVertexColorId,) {
            this.setPositionBuffer(gl, aVertexPositionId);
            this.setColorBuffer(gl, aVertexColorId);
            this.drawTriangles(gl);
        }
    }
}