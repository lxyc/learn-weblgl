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

  const a_Position = gl.getAttribLocation(gl.program, "a_Position");
  const a_PointSize = gl.getAttribLocation(gl.program, "a_PointSize");

  if (a_Position < 0 || a_PointSize < 0) {
    console.error("Failed to get the storage location!");
    return;
  }

  // 根据地址给attribute变量赋值
  gl.vertexAttrib3f(a_Position, 0.5, 0.5, 0.0);
  gl.vertexAttrib1f(a_PointSize, 10.0);

  // 清空颜色缓冲区
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.drawArrays(gl.POINTS, 0, 1);
});


/**
 * 关键词 attribute 为存储限定符，它表示接下来的变量是一个 attribute 变量
 * 变量声明格式：<存储限定符> <类型> <变量名>
 */

/**
 * gl.getAttribLocation(program, name)
 * 获取 attribute 变量的地址
 * 
 * program 指定包含顶点着色器和片元着色器的着色器程序对象
 * name 指定想要获取其储存地址的 attribute 变量的名称
 */

/**
 * gl.vertexAttrib3f(location, v0, v1, v2)
 * 给 location 变量赋值
 * 
 * 类似的还有：
 * gl.vertexAttrib1f(location, v0)
 * gl.vertexAttrib2f(location, v0, v1)
 * gl.vertexAttrib3f(location, v0, v1, v2)
 * gl.vertexAttrib4f(location, v0, v1, v2, v3)
 */