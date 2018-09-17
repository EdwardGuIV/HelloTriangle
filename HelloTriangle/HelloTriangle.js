//HelloTriangle.js
//Vertex shader program
var VSHADER_SOURCE =
    //dynamic vertex position
    'attribute vec4 a_Position;\n' +
    //function for vertex shader
    'void main() {\n' +
    //set the gl_position to current a_Position
    ' gl_Position = a_Position;\n' +
    //end function
    '}\n';

//Fragment Shader program
var FSHADER_SOURCE =
    //Frag shader function
    'void main() {\n' +
    //setting the frag color
    ' gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); \n' +
    //end function
    '}\n';

 function main() {
    //Get the canvas element
    var canvas = document.getElementById('webgl');

     //Get the rendering context for WebGL in terms of the canvas element
     var gl = getWebGLContext(canvas);
     //If gl is null then end program and log error message
     if (!gl) {
         console.log('Failed to get the rendering context for WebGL');
         //end program
         return;
     }

     //Initialize the shaders
     //If shaders dont intialize end program
     if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
         //create log message for error
         console.log('Failed to initialize shaders');
         return;
     }

     //Write the positions of the vertices to a vertex shader
     //Call initVertexBuffer function and pass the gl variable to it
     var n = initVertexBuffers(gl);
     //if n is less than 0 then throw error message and end program
     if (n < 0) {
         console.log('Failed to set the position of the vertices');
         return;
     }

     //Set the color for clearing the <canvas>
     gl.clearColor(0, 0, 0, 1);

     //Clear the canvas
     gl.clear(gl.COLOR_BUFFER_BIT);

     //Draw the shape
     gl.drawArrays(gl.TRIANGLES, 0, n);
}

//function that creates vertex buffers
function initVertexBuffers(gl) {

    //set the vertices to float value array
    var vertices = new Float32Array([
        0, 0.5, -0.5, -0.5, 0.5, -0.5
    ]);

    var n = 3; //The number of vertices for shape

    //Create a buffer object
    var vertexBuffer = gl.createBuffer();
    //If buffer object is null or not created end function and log error message
    if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
    }

    //Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    //Write date into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    //creating position variable
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    //if position is less than 0, end function and display log error message
    if (a_Position < 0) {
        console.log('Failed to get the storage location of a_Position');
        return -1;
    }

    //Assign the buffer object to a_Postion
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

    //Enable the assignment to a_Position variable 
    gl.enableVertexAttribArray(a_Position);

    //return the amount of vertices the shape has
    return n;
}
