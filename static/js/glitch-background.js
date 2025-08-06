// glitch-background.js

const canvas = document.createElement('canvas');
canvas.id = 'bg';
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = '01ABXYZシズビボデミギクユゾフネノル'.split('');
const fontSize = 14;
const columns = canvas.width / fontSize;

const drops = new Array(Math.floor(columns)).fill(1);

function draw() {
  // Semi-transparent background to create trail effect
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#0ff';
  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    // Reset drop randomly to top when it reaches bottom
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

setInterval(draw, 100); // Slower speed

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  columns = canvas.width / fontSize;
  drops = new Array(Math.floor(columns)).fill(1);
});