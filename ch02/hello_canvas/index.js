ready(() => {
  // 获取画布元素
  const canvas = document.querySelector("#webgl");

  if (!canvas) {
    console.error("Failed to retrieve the <canvas> element!");
    return;
  }

  // 获取绘图上下文
  const gl = canvas.getContext("webgl2");
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
});

/**
 * gl.clearColor(red, green, blue, alpha)
 * 指定绘图区域的背景色
 * 色值为 0.0 到 0.1
 */

/**
 * gl.clear(buffer)
 * 将指定缓冲区设定为预定的值。如果清空的是颜色缓冲区，那么将使用 gl.clearColor() 指定的值
 * gl.COLOR_BUFFER_BIT 颜色缓存
 * gl.DEPTH_BUFFER_BIT 深度缓冲区
 * gl.STENCIL_BUFFER_BIT 模版缓冲区
 */
