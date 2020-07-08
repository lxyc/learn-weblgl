// 顶点着色器程序
const VSHADER_SOURCE = `
void main() {
  gl_Position = vec4(0.5, 0.5, 0.0, 1); // 设置坐标
  gl_PointSize = 10.0; // 设置尺寸
}`;
// 片元着色器程序
const FSHADER_SOURCE = `
void main() {
  gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0); // 设置颜色
}`;

ready(() => {
  // 获取画布元素
  const canvas = document.querySelector("#webgl");

  if (!canvas) {
    console.error("Failed to retrieve the <canvas> element!");
    return;
  }

  // 获取绘图上下文
  const gl = canvas.getContext("webgl2");

  // 初始化着色器
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.error("Failed to initialize shaders!");
  }

  // 清除画布
  gl.clearColor(0, 0, 0, 0.6);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // 画点
  gl.drawArrays(gl.POINTS, 0, 1);
});

/**
 * gl_Position 顶点位置 vec4
 * gl_PointSize 点的尺寸
 * 
 * gl_FragColor 片元颜色
 * 
 * 齐次坐标 vec4(x, y, z, w) 能够提高三维坐标的精度
 * 等价于 (x/w, y/w, z/w)
 */

/**
 * gl.drawArrays(mode, first, count)
 * 执行顶点着色器，按照mode参数指定方式绘制图形
 * mode gl.POINTS / gl.LINES / gl.LINE_STRIP / gl.LINE_LOOP / gl.TRIANGLES / gl.TRIANGLE_STRIP / gl.TRIANGLE_FAN
 * first 指定从哪个顶点开始绘制
 * count 指定绘制需要用到多少个顶点
 */