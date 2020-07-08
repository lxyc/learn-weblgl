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
  if (a_Position < 0) {
    console.error("Failed to get the storage attribute location!");
    return;
  }

  const u_FragColor = gl.getUniformLocation(gl.program, "u_FragColor");
  if (!u_FragColor) {
    console.error("Failed to get the storage uniform location");
    return;
  }

  canvas.onmousedown = (evt) => {
    click(evt, canvas, gl, a_Position, u_FragColor);
  };

  // 清空颜色缓冲区
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
});

const points = [];
const colors = [];
const click = (evt, canvas, gl, pLocation, fLocation) => {
  let { clientX: x, clientY: y } = evt;
  const rect = evt.target.getBoundingClientRect();

  x = (x - rect.left) / (canvas.width / 2) - 1;
  y = 1 - (y - rect.top) / (canvas.height / 2);
  points.push({ x, y });

  let pColor;
  if (x > 0) {
    pColor = y > 0 ? [1.0, 0.0, 0.0, 1.0] : [0.0, 1.0, 0.0, 1.0];
  } else {
    pColor = y > 0 ? [0.0, 0.0, 1.0, 1.0] : [1.0, 1.0, 1.0, 1.0];
  }
  colors.push(pColor);

  // 绘制前先用指定颜色清空缓冲区。否则默认 clear() 黑色全透明背景色
  gl.clear(gl.COLOR_BUFFER_BIT);

  points.forEach((_, index) => {
    const point = points[index];
    const color = colors[index];

    gl.vertexAttrib3f(pLocation, point.x, point.y, 0.0);
    gl.uniform4f(fLocation, ...color);
    gl.drawArrays(webgl.POINTS, 0, 1);
  });
};
