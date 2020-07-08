// 顶点着色器程序
const VSHADER_SOURCE = `
  attribute vec4 a_Position;
  void main() {
    gl_Position = a_Position;
    gl_PointSize = 10.0;
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

  const p_Counts = initVertexBuffers(gl, a_Position);
  if (p_Counts < 0) {
    console.error("Failed to init buffer!");
    return;
  }

  // 清除画布
  gl.clearColor(0, 0, 0, 0.6);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // 画点
  gl.drawArrays(gl.POINTS, 0, p_Counts);
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
 * gl.createBuffer()
 * 创建缓冲区对象
 */

/**
 * gl.deleteBuffer(buffer)
 * 删除缓冲区对象
 * 
 * buffer 待删除的缓冲区对象
 */

/**
 * gl.bindBuffer(target, buffer)
 * 允许使用buffer表示的缓冲区对象并将其绑定到target表示的目标上
 * 
 * target 
 *  gl.ARRAR_BUFFER 缓冲区对象中包含了顶点数据
 *  gl.ELEMENT 缓冲区对象包含了顶点的索引值
 *  ARRAY_BUFFER “OpenGL ES 着色器语言 GLSL ES”
 * buffer 待绑定的缓冲区对象
 */

/**
 * gl.bufferData(target, data, usage)
 * 开辟存储空间，向绑定在target上的缓冲区对象中写入数据
 * 
 * target gl.ARRAY_BUFFER gl.ELEMENT_ARRAY_BUFFER
 * data 写入缓冲区对象的数据
 * usage 表示程序将如何使用存储在缓冲区对象中的数据，帮助WebGL优化
 *  gl.STATIC_DRAW 只会向缓冲区对象中写入一次数据，但需要绘制很多次
 *  gl.STREAM_DRAW 只会向缓冲区对象中写入一次数据，然后绘制若干次
 *  gl.DYNAMIC_DRAW 会向缓冲区对象中多次写入数据，并绘制很多次
 */

/**
 * gl.vertexAttribPointer(location, size, type, normalized, stride, offset)
 * 将绑定到 gl.ARRAY_BUFFER 的缓冲区对象分配给由location指定的 attribute 变量
 * 
 * location 待分配 attribute 变量的存储位置
 * size 指定缓冲区中每个顶点的分量个数（1-4）
 * type
 *  gl.UNSIGNED_BYTE 无符号字节 Uint8Array
 *  gl.SHORT 短整型 Int32Array
 *  gl.UNSIGNED_SHORT 无符号短整型 Uint16Array
 *  gl.INT 整型 Int32Array
 *  gl.UNSIGNED_INT 无符号整型 Uint32Array
 *  gl.FLOAT 浮点型 Float32Array
 * normalize true/false 是否将非浮点型的数据归一化到[0,1]或[-1,1]区间
 * stride 指定相邻两个顶点间的字节数，默认为0
 * offset 偏移量
 */

/**
 * gl.enableVertexAttribArray(location)
 * 开启 location 指定为 attribute 变量
 * 
 * location 待分配 attribute 变量的存储位置
 */

/**
 * gl.disableVertexArray(location)
 * 关闭 location 指定的 attribute 变量
 */