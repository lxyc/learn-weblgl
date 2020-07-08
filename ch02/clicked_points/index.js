// 顶点着色程序
const VSHADER_SOURCE = `
  attribute vec4 a_Position;
  void main() {
    gl_Position = a_Position;
    gl_PointSize = 10.0;
  }
`;

// 片元着色器
const FSHADER_SOURCE = `
  void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1);
  }
`;

ready(() => {
  const canvas = document.querySelector("#webgl");
  const gl = canvas.getContext("webgl2");

  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.error("Failed to initialize shaders!");
  }

  canvas.onmousedown = (evt) => {
    click(evt, canvas, gl, a_Position);
  };

  const a_Position = gl.getAttribLocation(gl.program, "a_Position");
  if (a_Position < 0) {
    console.error("Failed to get the storage attribute location!");
    return;
  }

  // 清空颜色缓冲区
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
});

const points = [];
const click = (evt, canvas, gl, pLocation) => {
  let { clientX: x, clientY: y } = evt;
  const rect = evt.target.getBoundingClientRect();

  x = (x - rect.left) / (canvas.width / 2) - 1;
  y = 1 - (y - rect.top) / (canvas.height / 2);
  points.push({ x, y });

  gl.clear(gl.COLOR_BUFFER_BIT);

  points.forEach((point) => {
    gl.vertexAttrib3f(pLocation, point.x, point.y, 0.0);
    gl.drawArrays(webgl.POINTS, 0, 1);
  });
};
