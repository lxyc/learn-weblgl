// 顶点着色器程序
const VSHADER_SOURCE = `
  attribute vec4 a_Position;
  uniform float u_CosB, u_SinB;
  void main() {
    gl_Position.x = a_Position.x * u_CosB - a_Position.y * u_SinB;
    gl_Position.y = a_Position.x * u_SinB + a_Position.y * u_CosB;
    gl_Position.z = a_Position.z;
    gl_Position.w = 1.0;
  }
`;
// 片元着色器程序
const FSHADER_SOURCE = `
  void main() {
    gl_FragColor = vec4(0.8, 0.5, 0.1, 1.0);
  }
`;

ready(() => {
  // 获取画布元素
  const canvas = document.querySelector("#webgl");

  if (!canvas) {
    console.error("Failed to retrieve the <canvas> element!");
    return;
  }

  const gl = canvas.getContext("webgl2");
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.error("Failed to initialize shaders!");
  }

  const a_Position = gl.getAttribLocation(gl.program, "a_Position");
  if (a_Position < 0) {
    console.error("Failed to get the storage attribute location!");
    return;
  }

  const u_CosB = gl.getUniformLocation(gl.program, "u_CosB");
  const u_SinB = gl.getUniformLocation(gl.program, "u_SinB");

  const tAngle = 90;
  const tRadian = (tAngle * Math.PI) / 180;

  gl.uniform1f(u_SinB, Math.sin(tRadian));
  gl.uniform1f(u_CosB, Math.cos(tRadian));

  const p_Counts = initVertexBuffers(gl, a_Position);
  if (p_Counts < 0) {
    console.error("Failed to init buffer!");
    return;
  }

  // 清除画布
  gl.clearColor(0, 0, 0, 0.6);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // 画点
  gl.drawArrays(gl.TRIANGLES, 0, p_Counts);
});

function initVertexBuffers(gl, a_Position) {
  // 顶点数据
  const pointers = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5]);
  const n = 3;

  // 创建缓冲区对象
  const vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.error("Failed to create buffer!");
    return -1;
  }

  // 绑定对象到缓冲区指针上
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  // 写入数据到缓冲区
  gl.bufferData(gl.ARRAY_BUFFER, pointers, gl.STATIC_DRAW);
  // 将缓冲区对象分配给a_Position变量
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
  // 连接a_Position变量与分配给他的缓冲区对象
  gl.enableVertexAttribArray(a_Position);

  return n;
}

/**
 * gl.drawArrays(mode, first, count)
 *
 * mode
 *  gl.POINTS   点
 *  gl.LINES  线段
 *  gl.LINE_STRIP  线条
 *  gl.LINE_LOOP  回路
 *  gl.TRIANGLES  三角形
 *  gl.TRIANGLE_STRIP 三角带
 *  gl.TRIANGLE_FAN 三角扇
 */
