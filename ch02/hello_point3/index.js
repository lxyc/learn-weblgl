// 顶点着色程序
const VSHADER_SOURCE = `
  attribute vec4 a_Position; // 声明attribute变量
  attribute float a_PointSize; // 限定符 数据类型 变量名
  void main() {
    gl_Position = a_Position;
    gl_PointSize = a_PointSize;
  }
`;

// 片元着色器
const FSHADER_SOURCE = `
  precision mediump float; // 精度限定
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

  // 获取attribute变量地址
  const a_Position = gl.getAttribLocation(gl.program, "a_Position");
  const a_PointSize = gl.getAttribLocation(gl.program, "a_PointSize");
  if (a_Position < 0 || a_PointSize < 0) {
    console.error("Failed to get the storage location!");
    return;
  }

  // 获取uniform变量地址
  const u_FragColor = gl.getUniformLocation(gl.program, "u_FragColor");
  if (!u_FragColor) {
    console.error("Failed to get the storage uniform location!");
    return;
  }

  // 根据地址给attribute变量赋值
  gl.vertexAttrib3f(a_Position, 0.5, 0.5, 0.0);
  gl.vertexAttrib1f(a_PointSize, 10.0);

  // 根据地址给uniform变量赋值
  gl.uniform4f(u_FragColor, 1.0, 1.0, 1.0, 1.0);

  // 清空颜色缓冲区
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.drawArrays(gl.POINTS, 0, 1);
});

/**
 * gl.getUniformLocation(program, name)
 * 获取指定名称的 uniform 变量的存储位置
 * 
 * program 指定包含顶点着色器和片元着色器的着色器程序对象
 * name uniform变量名称
 */

/**
 * gl.uniform4f(location, v0, v1, v2, v3)
 * 将数据(v0, v1, v2, v3)传输给由location参数指定的uniform变量
 * 
 * location 变量地址
 * v* 分量值
 */
