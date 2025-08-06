// background.js
const lightRays = document.getElementById('lightRays');
const ctx = lightRays.getContext('2d');
let width, height;

function resize() {
  width = lightRays.width = window.innerWidth;
  height = lightRays.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

function drawRays() {
  ctx.clearRect(0, 0, width, height);
  const rays = 20;
  const originX = width / 2;
  const originY = height / 2;
  const maxLength = Math.max(width, height) * 1.5;

  for (let i = 0; i < rays; i++) {
    const angle = (i / rays) * Math.PI * 2;
    const endX = originX + Math.cos(angle) * maxLength;
    const endY = originY + Math.sin(angle) * maxLength;

    const grad = ctx.createLinearGradient(originX, originY, endX, endY);
    grad.addColorStop(0, 'rgba(0, 255, 255, 0.5)');
    grad.addColorStop(1, 'rgba(0, 255, 255, 0)');

    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(endX, endY);
    ctx.lineWidth = 4;
    ctx.strokeStyle = grad;
    ctx.stroke();
  }
}

function animate() {
  drawRays();
  requestAnimationFrame(animate);
}
animate();
