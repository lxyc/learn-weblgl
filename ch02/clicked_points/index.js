// 顶点着色程序
const VSHADER_SOURCE = `
  attribute vec4 a_Position;
  attribute float a_PointSize;
  void main() {
    gl_Position = a_Position;
    gl_PointSize = a_PointSize;
  }
`;

// 片元着色器
const FSHADER_SOURCE = `
  precision mediump float;
  uniform vec4 u_FragColor;
  void main() {
    gl_FragColor = u_FragColor;
  }
`;

ready(() => {
  const canvas = document.querySelector("#webgl");
  const gl = canvas.getContext("webgl2");

  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.error("Failed to initialize shaders!");
  }

  const a_Position = gl.getAttribLocation(gl.program, "a_Position");
  const a_PointSize = gl.getAttribLocation(gl.program, "a_PointSize");
  if (a_Position < 0 || a_PointSize < 0) {
    console.error("Failed to get the storage attribute location!");
    return;
  }
  
  const u_FragColor = gl.getUniformLocation(gl.program, "u_FragColor");
  if (!u_FragColor) {
    console.error("Failed to get the storage uniform location");
    return;
  }

  gl.vertexAttrib1f(a_PointSize, 10.0);
  gl.uniform4f(u_FragColor, 1.0, 0.0, 0.0, 1.0);

  canvas.addEventListener('click', (evt) => {
    handleClick(evt, gl, a_Position);
  });

  // 清空颜色缓冲区
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
});


const points = [];
const handleClick = (evt, gl, pLocation) => {
  const { clientX: x, clientY: y } = evt;
  const rect = evt.target.getBoundingClientRect();

  const pointX = (x - rect.left) / (rect.width / 2) - 1;
  const pointY = 1 - (y - rect.top) / (rect.height / 2);
  points.push([pointX, pointY]);
  
  gl.clear(gl.COLOR_BUFFER_BIT);
  
  points.forEach(([x, y]) => {
    gl.vertexAttrib3f(pLocation, x, y, 0.0);
    gl.drawArrays(gl.POINTS, 0, 1);
  });
};
