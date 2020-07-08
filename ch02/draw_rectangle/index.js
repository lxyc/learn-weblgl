function main() {
  // 获取画布元素
  const canvas = document.querySelector("#container");
  // 获取绘图上下文
  const ctx = canvas.getContext("2d");
  
  // 设置填充色
  ctx.fillStyle = "rgba(0, 0, 255, 1.0)";
  // 填充矩形
  ctx.fillRect(120, 10, 150, 150);
}
