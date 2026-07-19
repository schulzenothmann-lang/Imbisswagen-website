/* =====================================================
   Funktionsscharen – app.js
   Interactive learning website for function families
   ===================================================== */

'use strict';

// ─── UTILITIES ─────────────────────────────────────────────────────────────

function lerp(a, b, t) { return a + (b - a) * t; }

// HSL color from position in schar (0..1) → string
function schaarColor(pos, alpha) {
  const h = lerp(220, 290, pos);
  const s = 70;
  const l = lerp(65, 45, Math.abs(pos - 0.5) * 2);
  return alpha !== undefined
    ? `hsla(${h},${s}%,${l}%,${alpha})`
    : `hsl(${h},${s}%,${l}%)`;
}

// ─── CANVAS PLOTTER BASE ────────────────────────────────────────────────────

class FunctionPlotter {
  constructor(canvasId, options) {
    options = options || {};
    this.canvas = document.getElementById(canvasId);
    this.ctx    = this.canvas.getContext('2d');
    this.W = this.canvas.width;
    this.H = this.canvas.height;
    this.xMin = options.xMin !== undefined ? options.xMin : -5;
    this.xMax = options.xMax !== undefined ? options.xMax :  5;
    this.yMin = options.yMin !== undefined ? options.yMin : -6;
    this.yMax = options.yMax !== undefined ? options.yMax :  6;
    this.bgColor    = options.bgColor    || '#0f0f23';
    this.gridColor  = options.gridColor  || 'rgba(255,255,255,0.07)';
    this.axisColor  = options.axisColor  || 'rgba(255,255,255,0.35)';
    this.labelColor = options.labelColor || 'rgba(255,255,255,0.45)';
  }

  toPixel(x, y) {
    var px = ((x - this.xMin) / (this.xMax - this.xMin)) * this.W;
    var py = this.H - ((y - this.yMin) / (this.yMax - this.yMin)) * this.H;
    return [px, py];
  }

  clear() {
    this.ctx.fillStyle = this.bgColor;
    this.ctx.fillRect(0, 0, this.W, this.H);
  }

  drawGrid() {
    var ctx = this.ctx;
    ctx.save();
    ctx.strokeStyle = this.gridColor;
    ctx.lineWidth = 1;
    for (var x = Math.ceil(this.xMin); x <= this.xMax; x++) {
      var px = this.toPixel(x, 0)[0];
      ctx.beginPath(); ctx.moveTo(px, 0); ctx.lineTo(px, this.H); ctx.stroke();
    }
    for (var y = Math.ceil(this.yMin); y <= this.yMax; y++) {
      var py = this.toPixel(0, y)[1];
      ctx.beginPath(); ctx.moveTo(0, py); ctx.lineTo(this.W, py); ctx.stroke();
    }
    ctx.restore();
  }

  drawAxes() {
    var ctx = this.ctx;
    ctx.save();
    ctx.strokeStyle = this.axisColor;
    ctx.lineWidth = 1.5;

    var yAxis = this.toPixel(0, 0)[1];
    ctx.beginPath(); ctx.moveTo(0, yAxis); ctx.lineTo(this.W, yAxis); ctx.stroke();

    var xAxis = this.toPixel(0, 0)[0];
    ctx.beginPath(); ctx.moveTo(xAxis, 0); ctx.lineTo(xAxis, this.H); ctx.stroke();

    ctx.fillStyle = this.labelColor;
    ctx.font = '11px system-ui,sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    for (var x = Math.ceil(this.xMin); x <= this.xMax; x++) {
      if (x === 0) continue;
      var px2 = this.toPixel(x, 0)[0];
      ctx.beginPath(); ctx.strokeStyle = this.axisColor;
      ctx.moveTo(px2, yAxis - 4); ctx.lineTo(px2, yAxis + 4); ctx.stroke();
      if (Math.abs(x) <= 4) ctx.fillText(x, px2, yAxis + 6);
    }
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    for (var y2 = Math.ceil(this.yMin); y2 <= this.yMax; y2++) {
      if (y2 === 0) continue;
      var py2 = this.toPixel(0, y2)[1];
      ctx.beginPath(); ctx.strokeStyle = this.axisColor;
      ctx.moveTo(xAxis - 4, py2); ctx.lineTo(xAxis + 4, py2); ctx.stroke();
      if (Math.abs(y2) <= 8) ctx.fillText(y2, xAxis - 7, py2);
    }

    // Axis arrows
    ctx.fillStyle = this.axisColor;
    ctx.beginPath();
    ctx.moveTo(this.W - 2, yAxis);
    ctx.lineTo(this.W - 10, yAxis - 5);
    ctx.lineTo(this.W - 10, yAxis + 5);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(xAxis, 2);
    ctx.lineTo(xAxis - 5, 10);
    ctx.lineTo(xAxis + 5, 10);
    ctx.fill();

    // Axis labels
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.font = 'italic 13px system-ui';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('x', this.W - 6, yAxis - 12);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText('y', xAxis + 10, 4);

    ctx.restore();
  }

  drawCurve(fn, color, lineWidth, alpha) {
    var ctx = this.ctx;
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.globalAlpha = alpha !== undefined ? alpha : 1;
    ctx.lineJoin = 'round';
    ctx.beginPath();
    var steps = this.W * 2;
    var first = true;
    for (var i = 0; i <= steps; i++) {
      var x = this.xMin + (i / steps) * (this.xMax - this.xMin);
      var y = fn(x);
      if (!isFinite(y) || Math.abs(y) > 1e6) { first = true; continue; }
      var pt = this.toPixel(x, y);
      if (first) { ctx.moveTo(pt[0], pt[1]); first = false; }
      else ctx.lineTo(pt[0], pt[1]);
    }
    ctx.stroke();
    ctx.restore();
  }

  drawPoint(x, y, color, radius, label) {
    var ctx = this.ctx;
    var pt = this.toPixel(x, y);
    ctx.save();
    ctx.fillStyle = color;
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(pt[0], pt[1], radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    if (label) {
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 11px system-ui';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'bottom';
      ctx.fillText(label, pt[0] + 6, pt[1] - 4);
    }
    ctx.restore();
  }

  drawDashedLine(x1, y1, x2, y2, color, lw, dash) {
    var ctx = this.ctx;
    var p1 = this.toPixel(x1, y1);
    var p2 = this.toPixel(x2, y2);
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = lw || 1.5;
    ctx.setLineDash(dash || [5, 4]);
    ctx.beginPath();
    ctx.moveTo(p1[0], p1[1]);
    ctx.lineTo(p2[0], p2[1]);
    ctx.stroke();
    ctx.restore();
  }
}

// ─── PLOTTER 0: QUADRATIC f_t(x) = t·x² ────────────────────────────────────

var p0 = new FunctionPlotter('canvas0', { xMin: -5, xMax: 5, yMin: -8, yMax: 8 });

function drawPlot0() {
  var t    = parseFloat(document.getElementById('slider0t').value);
  var n    = parseInt(document.getElementById('slider0n').value);
  var rng  = parseFloat(document.getElementById('slider0r').value);
  var vert = document.getElementById('chk0vert').checked;
  var ok   = document.getElementById('chk0ok').checked;
  var zeros= document.getElementById('chk0zeros').checked;

  document.getElementById('val0t').textContent  = t.toFixed(1);
  document.getElementById('val0n').textContent  = n;
  document.getElementById('val0r').textContent  = rng;

  p0.clear();
  p0.drawGrid();
  p0.drawAxes();

  // Family curves
  for (var i = 0; i < n; i++) {
    var tVal = (n === 1) ? t : -rng + (2 * rng * i) / (n - 1);
    var pos  = i / (n - 1);
    var isActive = Math.abs(tVal - t) < (2 * rng / (n - 1)) * 0.55 + 0.01;
    var color = (isActive && vert) ? '#06b6d4' : schaarColor(pos, 0.9);
    var lw    = (isActive && vert) ? 3 : 1.2;
    var alp   = (isActive && vert) ? 1 : 0.45;
    (function(tv){ p0.drawCurve(function(x){ return tv * x * x; }, color, lw, alp); })(tVal);
  }

  // Active thick highlighted curve
  p0.drawCurve(function(x){ return t * x * x; }, '#f0abfc', 2.5, 1);

  // Ortskurve: for f_t(x)=t·x², the vertex is always at (0,0). Mark y-axis.
  if (ok) {
    var ctx0 = p0.ctx;
    var axX0 = p0.toPixel(0, 0)[0];
    ctx0.save();
    ctx0.strokeStyle = '#fbbf24';
    ctx0.lineWidth = 2;
    ctx0.setLineDash([5, 4]);
    ctx0.beginPath();
    ctx0.moveTo(axX0, 0);
    ctx0.lineTo(axX0, p0.H);
    ctx0.stroke();
    ctx0.restore();
    p0.drawPoint(0, 0, '#fbbf24', 7, 'Ortsk.: (0,0)');
  }

  // Nullstelle at (0,0)
  if (zeros) {
    p0.drawPoint(0, 0, '#34d399', 6, 'N(0|0)');
  }
}

document.getElementById('slider0t').addEventListener('input', drawPlot0);
document.getElementById('slider0n').addEventListener('input', drawPlot0);
document.getElementById('slider0r').addEventListener('input', drawPlot0);
document.getElementById('chk0vert').addEventListener('change', drawPlot0);
document.getElementById('chk0ok').addEventListener('change', drawPlot0);
document.getElementById('chk0zeros').addEventListener('change', drawPlot0);


// ─── PLOTTER 1: CUBIC f_a(x) = x³ − a·x ────────────────────────────────────

var p1 = new FunctionPlotter('canvas1', { xMin: -5, xMax: 5, yMin: -10, yMax: 10 });

function drawPlot1() {
  var a   = parseFloat(document.getElementById('slider1a').value);
  var n   = parseInt(document.getElementById('slider1n').value);
  var rng = parseFloat(document.getElementById('slider1r').value);
  var vert= document.getElementById('chk1vert').checked;
  var ok  = document.getElementById('chk1ok').checked;
  var ext = document.getElementById('chk1ext').checked;

  document.getElementById('val1a').textContent = a.toFixed(1);
  document.getElementById('val1n').textContent = n;
  document.getElementById('val1r').textContent = rng;

  var info = document.getElementById('info1');
  if (a > 0) {
    var xe = Math.sqrt(a / 3);
    var yTief =  xe * xe * xe - a * xe;
    var yHoch = -xe * xe * xe - a * (-xe);
    info.innerHTML = 'Extremstellen: x = &plusmn;' + xe.toFixed(2) + '<br>' +
      'Hochpunkt: (&minus;' + xe.toFixed(2) + ' | ' + yHoch.toFixed(2) + ')<br>' +
      'Tiefpunkt: (' + xe.toFixed(2) + ' | ' + yTief.toFixed(2) + ')';
  } else if (a === 0) {
    info.innerHTML = 'a = 0: Sattelpunkt bei (0,&thinsp;0), keine Extrema';
  } else {
    info.innerHTML = 'a &lt; 0: Keine reellen Extrema';
  }

  p1.clear();
  p1.drawGrid();
  p1.drawAxes();

  for (var i = 0; i < n; i++) {
    var aVal = (n === 1) ? a : -rng + (2 * rng * i) / (n - 1);
    var pos  = i / (n - 1);
    var isActive = Math.abs(aVal - a) < (2 * rng / (n - 1)) * 0.55 + 0.01;
    var color = (isActive && vert) ? '#818cf8' : schaarColor(pos, 0.9);
    var lw    = (isActive && vert) ? 3 : 1.2;
    var alp   = (isActive && vert) ? 1 : 0.45;
    (function(av){ p1.drawCurve(function(x){ return x*x*x - av*x; }, color, lw, alp); })(aVal);
  }

  p1.drawCurve(function(x){ return x*x*x - a*x; }, '#c084fc', 2.5, 1);

  // Ortskurve: parametric (xe, ye) where xe = ±sqrt(a/3), ye = xe³ - a·xe
  if (ok) {
    var ctx1 = p1.ctx;
    ctx1.save();
    ctx1.strokeStyle = '#fbbf24';
    ctx1.lineWidth = 2.5;
    ctx1.setLineDash([5, 3]);

    // Upper branch (hochpunkt, xe negative)
    ctx1.beginPath();
    var first1 = true;
    for (var ai = 0.01; ai <= rng * 2; ai += 0.04) {
      var xeH = -Math.sqrt(ai / 3);
      var yeH  = xeH*xeH*xeH - ai*xeH;
      var ptH  = p1.toPixel(xeH, yeH);
      if (first1) { ctx1.moveTo(ptH[0], ptH[1]); first1 = false; }
      else ctx1.lineTo(ptH[0], ptH[1]);
    }
    ctx1.stroke();

    // Lower branch (tiefpunkt, xe positive)
    ctx1.beginPath();
    var first2 = true;
    for (var ai2 = 0.01; ai2 <= rng * 2; ai2 += 0.04) {
      var xeT = Math.sqrt(ai2 / 3);
      var yeT = xeT*xeT*xeT - ai2*xeT;
      var ptT = p1.toPixel(xeT, yeT);
      if (first2) { ctx1.moveTo(ptT[0], ptT[1]); first2 = false; }
      else ctx1.lineTo(ptT[0], ptT[1]);
    }
    ctx1.stroke();
    ctx1.restore();

    // Label
    var lblPt = p1.toPixel(-3.5, p1.yMax - 1);
    ctx1.save();
    ctx1.fillStyle = '#fbbf24';
    ctx1.font = '11px system-ui';
    ctx1.fillText('-- Ortskurve der Extrema', lblPt[0], lblPt[1]);
    ctx1.restore();
  }

  // Extrempunkte of active curve
  if (ext && a > 0) {
    var xeA = Math.sqrt(a / 3);
    var yHA = -xeA*xeA*xeA - a*(-xeA);
    var yTA =  xeA*xeA*xeA - a*xeA;
    p1.drawPoint(-xeA, yHA, '#4ade80', 6, 'H');
    p1.drawPoint( xeA, yTA, '#f87171', 6, 'T');
  }

  // Wendepunkt always at (0,0)
  p1.drawPoint(0, 0, '#94a3b8', 4);
}

document.getElementById('slider1a').addEventListener('input', drawPlot1);
document.getElementById('slider1n').addEventListener('input', drawPlot1);
document.getElementById('slider1r').addEventListener('input', drawPlot1);
document.getElementById('chk1vert').addEventListener('change', drawPlot1);
document.getElementById('chk1ok').addEventListener('change', drawPlot1);
document.getElementById('chk1ext').addEventListener('change', drawPlot1);


// ─── PLOTTER 2: MIXED f_k(x) = (1/k)·x² + k ───────────────────────────────

var p2 = new FunctionPlotter('canvas2', { xMin: -6, xMax: 6, yMin: -1, yMax: 9 });

function drawPlot2() {
  var k   = parseFloat(document.getElementById('slider2k').value);
  var n   = parseInt(document.getElementById('slider2n').value);
  var rng = parseFloat(document.getElementById('slider2r').value);
  var vert= document.getElementById('chk2vert').checked;
  var ok  = document.getElementById('chk2ok').checked;
  var vex = document.getElementById('chk2vex').checked;

  document.getElementById('val2k').textContent = k.toFixed(1);
  document.getElementById('val2n').textContent = n;
  document.getElementById('val2r').textContent = rng;

  document.getElementById('info2').innerHTML =
    'Scheitelpunkt: (0, ' + k.toFixed(2) + ')<br>' +
    '&Ouml;ffnung 1/k = ' + (1/k).toFixed(2) + '<br>' +
    'Ortskurve der Scheitelpunkte: y-Achse';

  p2.clear();
  p2.drawGrid();
  p2.drawAxes();

  var kMin = 0.3;
  var kMax = Math.max(kMin + 0.1, rng);

  for (var i = 0; i < n; i++) {
    var kVal = kMin + ((kMax - kMin) * i) / (n - 1);
    var pos  = i / (n - 1);
    var isActive = Math.abs(kVal - k) < ((kMax - kMin) / (n - 1)) * 0.55 + 0.01;
    var color = (isActive && vert) ? '#06b6d4' : schaarColor(pos, 0.9);
    var lw    = (isActive && vert) ? 3 : 1.2;
    var alp   = (isActive && vert) ? 1 : 0.45;
    if (Math.abs(kVal) > 0.01) {
      (function(kv){ p2.drawCurve(function(x){ return (1/kv)*x*x + kv; }, color, lw, alp); })(kVal);
    }
  }

  if (Math.abs(k) > 0.01)
    p2.drawCurve(function(x){ return (1/k)*x*x + k; }, '#67e8f9', 2.5, 1);

  // Ortskurve: vertices lie on y-axis between (0, kMin) and (0, kMax)
  if (ok) {
    var ctx2 = p2.ctx;
    var axX2 = p2.toPixel(0, 0)[0];
    var py2Min = p2.toPixel(0, kMin)[1];
    var py2Max = p2.toPixel(0, kMax)[1];

    ctx2.save();
    ctx2.strokeStyle = '#fbbf24';
    ctx2.lineWidth = 2;
    ctx2.setLineDash([5, 4]);
    ctx2.beginPath();
    ctx2.moveTo(axX2, 0);
    ctx2.lineTo(axX2, p2.H);
    ctx2.stroke();

    ctx2.setLineDash([]);
    ctx2.lineWidth = 6;
    ctx2.globalAlpha = 0.7;
    ctx2.beginPath();
    ctx2.moveTo(axX2, py2Max);
    ctx2.lineTo(axX2, py2Min);
    ctx2.stroke();
    ctx2.restore();

    var lblPt2 = p2.toPixel(0.3, kMax - 0.3);
    ctx2.save();
    ctx2.fillStyle = '#fbbf24';
    ctx2.font = '11px system-ui';
    ctx2.fillText('Ortskurve (y-Achse)', lblPt2[0], lblPt2[1]);
    ctx2.restore();
  }

  // Scheitelpunkt
  if (vex) {
    p2.drawPoint(0, k, '#f0abfc', 7, 'S(0|' + k.toFixed(1) + ')');
  }
}

document.getElementById('slider2k').addEventListener('input', drawPlot2);
document.getElementById('slider2n').addEventListener('input', drawPlot2);
document.getElementById('slider2r').addEventListener('input', drawPlot2);
document.getElementById('chk2vert').addEventListener('change', drawPlot2);
document.getElementById('chk2ok').addEventListener('change', drawPlot2);
document.getElementById('chk2vex').addEventListener('change', drawPlot2);


// ─── HERO CANVAS ────────────────────────────────────────────────────────────

function initHeroCanvas() {
  var canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var W = canvas.width, H = canvas.height;
  var animT = 0;

  var COLORS = [
    '#818cf8','#a78bfa','#c084fc','#e879f9','#06b6d4','#22d3ee','#67e8f9'
  ];

  function toPixelHero(x, y) {
    var xMin = -4.5, xMax = 4.5, yMin = -5.5, yMax = 5.5;
    return [
      ((x - xMin) / (xMax - xMin)) * W,
      H - ((y - yMin) / (yMax - yMin)) * H
    ];
  }

  function drawHeroFrame() {
    // Trail effect
    ctx.fillStyle = 'rgba(15,15,35,0.15)';
    ctx.fillRect(0, 0, W, H);

    var nCurves = 7;
    var tMax = 2.5 + Math.sin(animT * 0.25) * 0.9;

    for (var i = 0; i < nCurves; i++) {
      var tVal = -tMax + (2 * tMax * i) / (nCurves - 1);
      var color = COLORS[i % COLORS.length];
      var alpha = 0.5 + 0.5 * Math.sin(animT * 0.4 + i * 0.9);

      ctx.save();
      ctx.strokeStyle = color;
      ctx.lineWidth = (i === Math.floor(nCurves / 2)) ? 2.5 : 1.5;
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      var firstH = true;
      for (var xi = 0; xi <= 200; xi++) {
        var x = -4.5 + (9 * xi) / 200;
        var y = tVal * x * x;
        var pt = toPixelHero(x, y);
        if (firstH) { ctx.moveTo(pt[0], pt[1]); firstH = false; }
        else ctx.lineTo(pt[0], pt[1]);
      }
      ctx.stroke();
      ctx.restore();
    }

    // Animated parameter label
    ctx.save();
    var tActive = tMax * Math.sin(animT * 0.25);
    ctx.fillStyle = 'rgba(103,232,249,0.85)';
    ctx.font = 'bold 14px system-ui';
    ctx.fillText('t = ' + tActive.toFixed(2), 16, 22);
    ctx.restore();

    animT += 0.018;
    requestAnimationFrame(drawHeroFrame);
  }

  // Initial bg
  ctx.fillStyle = 'rgba(15,15,35,1)';
  ctx.fillRect(0, 0, W, H);
  drawHeroFrame();
}

// ─── HERO BACKGROUND CANVAS ──────────────────────────────────────────────────

function initHeroBgCanvas() {
  var canvas = document.getElementById('heroBgCanvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = canvas.offsetWidth  || window.innerWidth;
    canvas.height = canvas.offsetHeight || window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  var particles = [];
  for (var pi = 0; pi < 55; pi++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      hue: 200 + Math.random() * 100
    });
  }

  function animateBg() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(function(p) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'hsl(' + p.hue + ',70%,70%)';
      ctx.fill();
    });
    requestAnimationFrame(animateBg);
  }
  animateBg();
}


// ─── TABS ────────────────────────────────────────────────────────────────────

function initTabs() {
  document.querySelectorAll('.tab-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var tab = btn.dataset.tab;
      document.querySelectorAll('.tab-btn').forEach(function(b){ b.classList.remove('active'); });
      document.querySelectorAll('.tab-content').forEach(function(c){ c.classList.remove('active'); });
      btn.classList.add('active');
      document.getElementById('tab' + tab).classList.add('active');
      setTimeout(function() {
        if (tab === '0') drawPlot0();
        if (tab === '1') drawPlot1();
        if (tab === '2') drawPlot2();
      }, 50);
    });
  });
}


// ─── NAVIGATION ──────────────────────────────────────────────────────────────

function initNav() {
  var navbar    = document.getElementById('navbar');
  var hamburger = document.getElementById('hamburger');
  var navLinks  = document.getElementById('navLinks');

  window.addEventListener('scroll', function() {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    highlightNavLink();
  });

  hamburger.addEventListener('click', function() {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(function(a) {
    a.addEventListener('click', function(){ navLinks.classList.remove('open'); });
  });
}

function highlightNavLink() {
  var sections = ['einfuehrung', 'grundlagen', 'interaktiv', 'aufgaben'];
  var current = '';
  sections.forEach(function(id) {
    var el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 120) current = id;
  });
  document.querySelectorAll('.nav-links a').forEach(function(a) {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}


// ─── FADE-IN INTERSECTION OBSERVER ───────────────────────────────────────────

function initFadeIn() {
  if (!window.IntersectionObserver) {
    document.querySelectorAll('.fade-in').forEach(function(el){ el.classList.add('visible'); });
    return;
  }
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in').forEach(function(el){ obs.observe(el); });
}


// ─── SLIDER FILL SYNC ────────────────────────────────────────────────────────

function syncSliderFill(slider) {
  var min = parseFloat(slider.min);
  var max = parseFloat(slider.max);
  var val = parseFloat(slider.value);
  var pct = ((val - min) / (max - min)) * 100;
  slider.style.setProperty('--val', pct + '%');
}

function initSliders() {
  document.querySelectorAll('input[type="range"]').forEach(function(s) {
    syncSliderFill(s);
    s.addEventListener('input', function(){ syncSliderFill(s); });
  });
}


// ─── QUIZ ─────────────────────────────────────────────────────────────────────

var CORRECT = { 1: 'b', 2: 'b', 4: 'b', 5: 'c' };
var score = 0;
var currentQ = 1;
var answered = {};

function updateProgress(q) {
  var pct = ((q - 1) / 5) * 100;
  document.getElementById('quizProgress').style.width = pct + '%';
  document.getElementById('quizProgressText').textContent = 'Aufgabe ' + q + ' von 5';
  document.getElementById('scoreBadge').textContent = score + ' Pkt.';
}

function initQuiz() {
  document.querySelectorAll('.option-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var q   = parseInt(btn.dataset.q);
      var val = btn.dataset.val;
      if (answered[q]) return;
      answered[q] = val;

      var correct = CORRECT[q];
      var fb = document.getElementById('fb' + q);
      var allBtns = document.querySelectorAll('.option-btn[data-q="' + q + '"]');

      allBtns.forEach(function(b){ b.disabled = true; });
      allBtns.forEach(function(b) {
        if (b.dataset.val === correct) b.classList.add('correct');
        else if (b.dataset.val === val && val !== correct) b.classList.add('wrong');
      });

      if (val === correct) {
        score++;
        document.getElementById('scoreBadge').textContent = score + ' Pkt.';
        fb.className = 'feedback-box show success';
        fb.innerHTML = '<span class="feedback-icon">&#x2705;</span>' +
          '<span class="feedback-text"><strong>Richtig!</strong> Sehr gut!</span>';
      } else {
        fb.className = 'feedback-box show error';
        fb.innerHTML = '<span class="feedback-icon">&#x274C;</span>' +
          '<span class="feedback-text"><strong>Leider falsch.</strong> Schau dir die L&ouml;sung an.</span>';
      }

      var nextBtn = document.getElementById('next' + q);
      if (nextBtn) nextBtn.style.display = 'inline-flex';
      if (window.MathJax) MathJax.typesetPromise([fb]).catch(function(){});
    });
  });
}

window.checkInput = function(q, correctAnswer) {
  if (answered[q]) return;
  var input = document.getElementById('input' + q);
  var val   = (input.value || '').trim().replace(',', '.');
  var fb    = document.getElementById('fb' + q);
  answered[q] = val;

  var isCorrect = val !== '' && Math.abs(parseFloat(val) - parseFloat(correctAnswer)) < 0.05;
  input.disabled = true;
  input.classList.add(isCorrect ? 'correct' : 'wrong');

  if (isCorrect) {
    score++;
    document.getElementById('scoreBadge').textContent = score + ' Pkt.';
    fb.className = 'feedback-box show success';
    fb.innerHTML = '<span class="feedback-icon">&#x2705;</span>' +
      '<span class="feedback-text"><strong>Richtig!</strong> x&thinsp;=&thinsp;' + correctAnswer + ' ist korrekt.</span>';
  } else {
    fb.className = 'feedback-box show error';
    fb.innerHTML = '<span class="feedback-icon">&#x274C;</span>' +
      '<span class="feedback-text"><strong>Nicht ganz.</strong> ' +
      (val ? 'Deine Antwort: ' + val + '. ' : '') +
      'Die richtige Antwort ist x&thinsp;=&thinsp;' + correctAnswer + '.</span>';
  }

  var nextBtn = document.getElementById('next' + q);
  if (nextBtn) nextBtn.style.display = 'inline-flex';
  if (window.MathJax) MathJax.typesetPromise([fb]).catch(function(){});
};

window.showSolution = function(q) {
  var sol = document.getElementById('sol' + q);
  sol.classList.add('show');
  var nextBtn = document.getElementById('next' + q);
  if (nextBtn) nextBtn.style.display = 'inline-flex';
  if (!answered[q]) answered[q] = 'skipped';
  if (window.MathJax) MathJax.typesetPromise([sol]).catch(function(){});
};

window.nextQuestion = function(q) {
  var prev = document.getElementById('q' + (q - 1));
  prev.style.opacity = '0.55';
  prev.style.pointerEvents = 'none';
  var next = document.getElementById('q' + q);
  next.style.display = 'block';
  currentQ = q;
  updateProgress(q);
  setTimeout(function(){
    next.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (window.MathJax) MathJax.typesetPromise([next]).catch(function(){});
  }, 100);
};

window.showResult = function() {
  var q5 = document.getElementById('q5');
  q5.style.opacity = '0.55';
  q5.style.pointerEvents = 'none';

  var result = document.getElementById('quizResult');
  result.classList.add('show');
  document.getElementById('quizProgress').style.width = '100%';
  document.getElementById('quizProgressText').textContent = 'Abgeschlossen!';
  document.getElementById('resultScore').innerHTML = score + '<span>/5</span>';

  var stars, msg, sub;
  if (score === 5) {
    stars = '&#x2B50;&#x2B50;&#x2B50;'; msg = 'Ausgezeichnet! Perfekt!';
    sub = 'Du hast alle Aufgaben richtig gel&ouml;st. Hervorragende Leistung!';
  } else if (score >= 4) {
    stars = '&#x2B50;&#x2B50;&#x2B50;'; msg = 'Sehr gut gemacht!';
    sub = 'Fast alles richtig &ndash; du kennst Funktionsscharen sehr gut.';
  } else if (score >= 3) {
    stars = '&#x2B50;&#x2B50;'; msg = 'Gut gemacht!';
    sub = 'Solides Grundverst&auml;ndnis. &Uuml;be weiter mit dem interaktiven Teil!';
  } else if (score >= 2) {
    stars = '&#x2B50;'; msg = 'Weiter so!';
    sub = 'Schau dir die Einf&uuml;hrung nochmal an und versuche es erneut.';
  } else {
    stars = '&#x1F4AA;'; msg = 'Nicht aufgeben!';
    sub = 'Lies die Theorie und probiere es nochmal &ndash; du schaffst das!';
  }

  document.getElementById('starRow').innerHTML = stars;
  document.getElementById('resultMsg').innerHTML = msg;
  document.getElementById('resultSub').innerHTML = sub;
  setTimeout(function(){
    result.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 100);
};

window.resetQuiz = function() {
  score = 0; currentQ = 1;
  Object.keys(answered).forEach(function(k){ delete answered[k]; });
  updateProgress(1);

  for (var i = 1; i <= 5; i++) {
    var card = document.getElementById('q' + i);
    card.style.opacity = '';
    card.style.pointerEvents = '';
    card.style.display = (i === 1) ? 'block' : 'none';

    var fb = document.getElementById('fb' + i);
    if (fb) { fb.className = 'feedback-box'; fb.innerHTML = ''; }
    var sol = document.getElementById('sol' + i);
    if (sol) sol.classList.remove('show');
    var nextBtn = document.getElementById('next' + i);
    if (nextBtn) nextBtn.style.display = 'none';

    card.querySelectorAll('.option-btn').forEach(function(b){
      b.disabled = false;
      b.classList.remove('correct', 'wrong');
    });

    var inp = card.querySelector('.quiz-input');
    if (inp) { inp.value = ''; inp.disabled = false; inp.classList.remove('correct', 'wrong'); }
  }

  document.getElementById('quizResult').classList.remove('show');
  setTimeout(function(){
    document.getElementById('q1').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
};


// ─── MATHJAX TYPESET ─────────────────────────────────────────────────────────

function typesetAll() {
  if (window.MathJax && MathJax.typesetPromise) {
    MathJax.typesetPromise().catch(function(e){ console.warn('MathJax:', e); });
  }
}


// ─── INIT ────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', function() {
  initNav();
  initFadeIn();
  initTabs();
  initSliders();
  initQuiz();
  initHeroCanvas();
  initHeroBgCanvas();

  drawPlot0();
  drawPlot1();
  drawPlot2();
  updateProgress(1);

  // Re-typeset MathJax after load
  if (window.MathJax && window.MathJax.startup && window.MathJax.startup.promise) {
    window.MathJax.startup.promise.then(typesetAll);
  }
  setTimeout(typesetAll, 1800);
});

window.addEventListener('resize', function() {
  drawPlot0();
  drawPlot1();
  drawPlot2();
});
