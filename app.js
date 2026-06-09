// ===== NAVIGATION =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
navToggle?.addEventListener('click', () => navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// ===== TABS =====
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tabId = btn.dataset.tab;
    btn.closest('.tabs').querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    btn.closest('.tabs').querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    document.getElementById('tab-' + tabId)?.classList.add('active');
  });
});

// ===== SOLUTIONS =====
document.querySelectorAll('.btn-solution').forEach(btn => {
  btn.addEventListener('click', () => {
    const sol = document.getElementById(btn.dataset.target);
    const open = sol.classList.toggle('open');
    btn.textContent = open ? 'Lösung verbergen' : 'Lösung anzeigen';
    if (open && window.MathJax) MathJax.typesetPromise([sol]);
  });
});

// ===== FUNCTION FAMILIES =====
const FUNCTIONS = [
  {
    label: 'f_t(x) = t·x²',
    paramName: 't',
    paramMin: -3, paramMax: 3, paramDefault: 1,
    fn: (x, t) => t * x * x,
    derivative: (x, t) => 2 * t * x,
    extremum: (t) => t !== 0 ? [{ x: 0, y: 0, type: t > 0 ? 'min' : 'max' }] : [],
    ortskurve: null,
    familyParams: [-2, -1, -0.5, 0.5, 1, 2],
    description: `
      <h3>Parabelnschar $f_t(x) = t \\cdot x^2$</h3>
      <p>Der Parameter $t$ streckt ($|t| > 1$) oder staucht ($|t| < 1$) die Normalparabel.
      Für $t > 0$ öffnet sie nach oben, für $t < 0$ nach unten.</p>
      <p>Alle Parabeln haben den Scheitelpunkt im Ursprung $(0,0)$.</p>
      <p><strong>Extrempunkt:</strong> $E_t = (0,0)$ für alle $t \\neq 0$</p>
    `
  },
  {
    label: 'f_a(x) = x³ − a·x',
    paramName: 'a',
    paramMin: -3, paramMax: 3, paramDefault: 1,
    fn: (x, a) => x * x * x - a * x,
    derivative: (x, a) => 3 * x * x - a,
    extremum: (a) => {
      if (a <= 0) return [];
      const xs = Math.sqrt(a / 3);
      return [
        { x: xs, y: xs * xs * xs - a * xs, type: 'min' },
        { x: -xs, y: -xs * xs * xs + a * xs, type: 'max' }
      ];
    },
    ortskurve: (x) => x * x * x - (3 * x * x) * x / x, // y = -2x³/3√(3)... simplified
    ortskurvePts: (tMin, tMax) => {
      const pts = [];
      for (let a = 0.1; a <= tMax; a += 0.05) {
        const xs = Math.sqrt(a / 3);
        pts.push({ x: xs, y: xs * xs * xs - a * xs });
        pts.push({ x: -xs, y: -xs * xs * xs + a * xs });
      }
      return pts;
    },
    familyParams: [-2, -1, 1, 2, 3],
    description: `
      <h3>Kubische Schar $f_a(x) = x^3 - a \\cdot x$</h3>
      <p>Für $a > 0$ hat die Kurve zwei Extrempunkte bei $x = \\pm\\sqrt{a/3}$.
      Für $a \\leq 0$ gibt es keine Extrempunkte.</p>
      <p><strong>Hochpunkt:</strong> $H_a = \\left(-\\sqrt{\\tfrac{a}{3}},\\; \\tfrac{2a}{3}\\sqrt{\\tfrac{a}{3}}\\right)$</p>
      <p><strong>Tiefpunkt:</strong> $T_a = \\left(+\\sqrt{\\tfrac{a}{3}},\\; -\\tfrac{2a}{3}\\sqrt{\\tfrac{a}{3}}\\right)$</p>
    `
  },
  {
    label: 'f_k(x) = x²/k + k',
    paramName: 'k',
    paramMin: 0.5, paramMax: 4, paramDefault: 1,
    fn: (x, k) => (x * x) / k + k,
    derivative: (x, k) => 2 * x / k,
    extremum: (k) => [{ x: 0, y: 2 * k, type: 'min' }],
    ortskurvePts: (tMin, tMax) => {
      const pts = [];
      for (let k = 0.2; k <= tMax; k += 0.05) {
        pts.push({ x: 0, y: 2 * k });
      }
      return pts;
    },
    familyParams: [0.5, 1, 1.5, 2, 3],
    description: `
      <h3>Schar $f_k(x) = \\frac{x^2}{k} + k$, $k > 0$</h3>
      <p>Der Parameter $k$ streckt die Parabel und hebt den Scheitelpunkt an.
      Der Extrempunkt liegt immer auf der $y$-Achse.</p>
      <p><strong>Extrempunkt:</strong> $E_k = (0, 2k)$ – liegt auf der positiven $y$-Achse.</p>
      <p><strong>Ortskurve:</strong> Die positive $y$-Achse ($x = 0$, $y > 0$).</p>
      <p>Es gilt stets: $f_k(x) \\geq 2|x|$ (AM-GM-Ungleichung)</p>
    `
  },
  {
    label: 'f_t(x) = x² − 2tx + t',
    paramName: 't',
    paramMin: -3, paramMax: 3, paramDefault: 1,
    fn: (x, t) => x * x - 2 * t * x + t,
    derivative: (x, t) => 2 * x - 2 * t,
    extremum: (t) => [{ x: t, y: -t * t + t, type: 'min' }],
    ortskurvePts: (tMin, tMax) => {
      const pts = [];
      for (let t = tMin; t <= tMax; t += 0.05) {
        pts.push({ x: t, y: -t * t + t });
      }
      return pts;
    },
    familyParams: [-2, -1, 0, 1, 2, 3],
    description: `
      <h3>Parabelnschar $f_t(x) = x^2 - 2tx + t$</h3>
      <p>Jede Parabel hat denselben Öffnungskoeffizient 1.
      Der Scheitelpunkt wandert mit dem Parameter $t$.</p>
      <p><strong>Extrempunkt:</strong> $E_t = (t,\\; -t^2 + t)$</p>
      <p><strong>Ortskurve:</strong> $y = -x^2 + x$ (nach-oben geöffnete Parabel)</p>
    `
  }
];

// ===== CANVAS GRAPHER =====
const canvas = document.getElementById('mainCanvas');
const ctx = canvas?.getContext('2d');
if (!ctx) throw new Error('Canvas nicht unterstützt');

let currentFnIdx = 0;
let currentParam = 1;
let showFamily = true;
let showOrtskurve = false;
let showExtrema = true;

const COLORS = ['#818cf8','#a78bfa','#67e8f9','#86efac','#fcd34d','#f9a8d4','#fb923c'];
const MAIN_COLOR = '#4f46e5';
const ORTSKURVE_COLOR = '#ef4444';

function worldToCanvas(x, y, scale, originX, originY) {
  return [originX + x * scale, originY - y * scale];
}

function drawGrid(scale, ox, oy, w, h) {
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 1;
  const step = scale;
  for (let gx = ox % step; gx < w; gx += step) {
    ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, h); ctx.stroke();
  }
  for (let gy = oy % step; gy < h; gy += step) {
    ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(w, gy); ctx.stroke();
  }

  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 1.5;
  // x-axis
  ctx.beginPath(); ctx.moveTo(0, oy); ctx.lineTo(w, oy); ctx.stroke();
  // y-axis
  ctx.beginPath(); ctx.moveTo(ox, 0); ctx.lineTo(ox, h); ctx.stroke();

  ctx.fillStyle = '#94a3b8';
  ctx.font = '11px system-ui';
  ctx.textAlign = 'center';
  for (let i = -5; i <= 5; i++) {
    if (i === 0) continue;
    const [px] = worldToCanvas(i, 0, scale, ox, oy);
    if (px > 10 && px < w - 10) {
      ctx.fillText(i, px, oy + 14);
      ctx.beginPath(); ctx.moveTo(px, oy - 3); ctx.lineTo(px, oy + 3); ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1; ctx.stroke();
    }
    const [, py] = worldToCanvas(0, i, scale, ox, oy);
    if (py > 10 && py < h - 10) {
      ctx.textAlign = 'right';
      ctx.fillText(i, ox - 6, py + 4);
      ctx.beginPath(); ctx.moveTo(ox - 3, py); ctx.lineTo(ox + 3, py); ctx.stroke();
    }
  }
  ctx.textAlign = 'left';
  ctx.fillText('x', w - 14, oy - 6);
  ctx.textAlign = 'center';
  ctx.fillText('y', ox + 10, 12);
}

function plotFn(fn, param, color, lineWidth, scale, ox, oy, w) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.lineJoin = 'round';
  let first = true;
  const xMin = (0 - ox) / scale;
  const xMax = (w - ox) / scale;
  const steps = 600;
  const dx = (xMax - xMin) / steps;
  for (let i = 0; i <= steps; i++) {
    const x = xMin + i * dx;
    const y = fn(x, param);
    if (!isFinite(y) || Math.abs(y) > 1e5) { first = true; continue; }
    const [cx, cy] = worldToCanvas(x, y, scale, ox, oy);
    if (first) { ctx.moveTo(cx, cy); first = false; } else ctx.lineTo(cx, cy);
  }
  ctx.stroke();
}

function drawExtrema(extrema, scale, ox, oy) {
  extrema.forEach(e => {
    if (!isFinite(e.x) || !isFinite(e.y)) return;
    const [cx, cy] = worldToCanvas(e.x, e.y, scale, ox, oy);
    ctx.beginPath();
    ctx.arc(cx, cy, 6, 0, 2 * Math.PI);
    ctx.fillStyle = e.type === 'max' ? '#7c3aed' : '#06b6d4';
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
  });
}

function render() {
  if (!ctx) return;
  const W = canvas.width, H = canvas.height;
  const scale = 60;
  const ox = W / 2, oy = H / 2;
  const fn = FUNCTIONS[currentFnIdx];

  ctx.clearRect(0, 0, W, H);
  drawGrid(scale, ox, oy, W, H);

  // Family curves
  if (showFamily) {
    fn.familyParams.forEach((p, i) => {
      plotFn(fn.fn, p, COLORS[i % COLORS.length] + '88', 1.5, scale, ox, oy, W);
    });
  }

  // Ortskurve
  if (showOrtskurve && fn.ortskurvePts) {
    const pts = fn.ortskurvePts(fn.paramMin, fn.paramMax);
    ctx.beginPath();
    ctx.strokeStyle = ORTSKURVE_COLOR;
    ctx.lineWidth = 2.5;
    ctx.setLineDash([6, 4]);
    pts.sort((a, b) => a.x - b.x).forEach((p, i) => {
      const [cx, cy] = worldToCanvas(p.x, p.y, scale, ox, oy);
      if (i === 0) ctx.moveTo(cx, cy); else ctx.lineTo(cx, cy);
    });
    ctx.stroke();
    ctx.setLineDash([]);
  }

  // Main curve
  plotFn(fn.fn, currentParam, MAIN_COLOR, 3, scale, ox, oy, W);

  // Extrema
  if (showExtrema) {
    const extrema = fn.extremum(currentParam);
    drawExtrema(extrema, scale, ox, oy);
  }

  updateInfo(fn);
  updateLegend(fn);
}

function updateInfo(fn) {
  const extrema = fn.extremum(currentParam);
  let html = `<div class="info-row"><span>Parameter ${fn.paramName}:</span><strong>${currentParam.toFixed(2)}</strong></div>`;
  if (extrema.length === 0) {
    html += `<div class="info-row"><span>Extrempunkte:</span><strong>keine</strong></div>`;
  } else {
    extrema.forEach(e => {
      if (!isFinite(e.x) || !isFinite(e.y)) return;
      html += `<div class="info-row"><span>${e.type === 'max' ? 'Hochpunkt' : 'Tiefpunkt'}:</span><strong>(${e.x.toFixed(2)}, ${e.y.toFixed(2)})</strong></div>`;
    });
  }
  document.getElementById('infoContent').innerHTML = html;
}

function updateLegend(fn) {
  const leg = document.getElementById('canvasLegend');
  let html = `<span class="leg-item"><span class="leg-color" style="background:${MAIN_COLOR}"></span>$f_{${currentParam.toFixed(1)}}(x)$</span>`;
  if (showFamily) html += `<span class="leg-item"><span class="leg-color" style="background:#818cf8;opacity:.7"></span>Schar</span>`;
  if (showOrtskurve) html += `<span class="leg-item"><span class="leg-color" style="background:${ORTSKURVE_COLOR};border-style:dashed"></span>Ortskurve</span>`;
  leg.innerHTML = html;
  if (window.MathJax) MathJax.typesetPromise([leg]);
}

function updateFnDescription() {
  const el = document.getElementById('fnDescription');
  el.innerHTML = FUNCTIONS[currentFnIdx].description;
  if (window.MathJax) MathJax.typesetPromise([el]);
}

function initControls() {
  const fn = FUNCTIONS[currentFnIdx];
  const slider = document.getElementById('paramSlider');
  slider.min = fn.paramMin;
  slider.max = fn.paramMax;
  slider.step = 0.1;
  slider.value = fn.paramDefault;
  currentParam = fn.paramDefault;
  document.getElementById('paramMin').textContent = fn.paramMin;
  document.getElementById('paramMax').textContent = fn.paramMax;
  document.getElementById('paramLabel').textContent = `Parameter $${fn.paramName}$`;
  document.getElementById('paramValue').textContent = currentParam.toFixed(1);
  if (window.MathJax) MathJax.typesetPromise([document.getElementById('paramLabel')]);
}

// Slider
document.getElementById('paramSlider')?.addEventListener('input', e => {
  currentParam = parseFloat(e.target.value);
  document.getElementById('paramValue').textContent = currentParam.toFixed(1);
  render();
});

// Toggles
document.getElementById('showFamily')?.addEventListener('change', e => { showFamily = e.target.checked; render(); });
document.getElementById('showOrtskurve')?.addEventListener('change', e => { showOrtskurve = e.target.checked; render(); });
document.getElementById('showExtrema')?.addEventListener('change', e => { showExtrema = e.target.checked; render(); });

// Function selector
document.querySelectorAll('.fn-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.fn-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFnIdx = parseInt(btn.dataset.fn);
    initControls();
    updateFnDescription();
    render();
    if (window.MathJax) MathJax.typesetPromise([document.querySelector('.function-selector')]);
  });
});

// Responsive canvas
function resizeCanvas() {
  const panel = canvas.parentElement;
  const w = Math.min(panel.clientWidth, 700);
  const ratio = 460 / 700;
  canvas.style.width = w + 'px';
  canvas.style.height = (w * ratio) + 'px';
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Init
initControls();
updateFnDescription();
render();

// Re-render after MathJax loads
window.addEventListener('load', () => {
  setTimeout(() => {
    if (window.MathJax) {
      MathJax.typesetPromise();
    }
    render();
  }, 500);
});
