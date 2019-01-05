
function WireFrameCubeBuffer(gl) {

    function defineVertices(gl) {
        let vertices = [
            -0.5, 0.5, 0.5,
            -0.5, -0.5, 0.5,
            0.5, 0.5, 0.5,
            0.5, -0.5, 0.5,

            -0.5, 0.5, -0.5,
            -0.5, -0.5, -0.5,
            0.5, 0.5, -0.5,
            0.5, -0.5, -0.5
        ];

        let buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        return buffer;
    }

    function defineColors(gl) {
        let colors = [
            1.0, 0.0, 0.0, 1.0,
            1.0, 0.0, 0.0, 1.0,
            1.0, 0.0, 0.0, 1.0,
            1.0, 0.0, 0.0, 1.0,

            0.0, 1.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
        ];

        let buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
        return buffer;
    }

    function defineLines(gl) {
        let lines = [
            0, 1,
            1, 2,
            2, 3,
            3, 0,

            4, 5,
            5, 6,
            6, 7,
            7, 4,

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
        draw: function (gl) {

        }
    }
}