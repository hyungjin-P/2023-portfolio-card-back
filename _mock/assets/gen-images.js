'use strict';
// node _mock/assets/gen-images.js — seed 가 쓰는 SVG 일러스트를 _mock/assets/img/ 에 다시 그린다.
// 도형(면·원·물결·줄무늬)만 쓰는 추상 그림이고 사진·글꼴·외부 참조가 없다. 시드가 고정이라 매번 같은 파일이 나온다.
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, 'img');

function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 2 ** 32;
  };
}

const PALETTES = [
  ['#f4efe6', '#1f4e5f', '#79a7ac', '#e6b655', '#d96c4f'],
  ['#efe9f4', '#2d2a4a', '#6c5b9e', '#e8a1b8', '#f2d07a'],
  ['#eef3ea', '#2f4a32', '#88a56b', '#d9c38a', '#c46d4f'],
  ['#f6ece4', '#5a3a2e', '#c98b6b', '#9bb7c4', '#33505c'],
  ['#e9eff4', '#1d3557', '#457b9d', '#a8dadc', '#e63946'],
];

const f = (n) => Number(n.toFixed(1));

function waves(r, w, h, colors) {
  let out = '';
  const rows = 5 + Math.floor(r() * 3);
  for (let i = 0; i < rows; i++) {
    const y = (h / rows) * i + h / rows / 2;
    const amp = h * (0.03 + r() * 0.05);
    let d = `M0 ${f(y)}`;
    for (let x = 0; x <= w; x += w / 8) d += ` Q${f(x + w / 16)} ${f(y + (i % 2 ? amp : -amp))} ${f(x + w / 8)} ${f(y)}`;
    out += `<path d="${d} V${h} H0 Z" fill="${colors[1 + (i % 4)]}" opacity="${f(0.35 + r() * 0.4)}"/>`;
  }
  return out;
}

function blocks(r, w, h, colors) {
  let out = '';
  for (let i = 0; i < 7; i++) {
    const bw = w * (0.15 + r() * 0.35);
    const bh = h * (0.15 + r() * 0.35);
    out += `<rect x="${f(r() * (w - bw))}" y="${f(r() * (h - bh))}" width="${f(bw)}" height="${f(bh)}" rx="${f(r() * 24)}" fill="${colors[1 + (i % 4)]}" opacity="${f(0.5 + r() * 0.45)}"/>`;
  }
  return out;
}

function circles(r, w, h, colors) {
  let out = '';
  for (let i = 0; i < 9; i++) {
    out += `<circle cx="${f(r() * w)}" cy="${f(r() * h)}" r="${f(Math.min(w, h) * (0.05 + r() * 0.22))}" fill="${colors[1 + (i % 4)]}" opacity="${f(0.45 + r() * 0.5)}"/>`;
  }
  return out;
}

function stripes(r, w, h, colors) {
  let out = '';
  const n = 9 + Math.floor(r() * 6);
  for (let i = 0; i < n; i++) {
    const x = (w / n) * i;
    out += `<rect x="${f(x)}" y="${f(h * r() * 0.3)}" width="${f(w / n - 6)}" height="${f(h * (0.5 + r() * 0.5))}" fill="${colors[1 + (i % 4)]}" opacity="${f(0.55 + r() * 0.4)}"/>`;
  }
  return out;
}

function svg(w, h, seed, palette, painters) {
  const r = rng(seed);
  const colors = PALETTES[palette];
  const body = painters.map((p) => p(r, w, h, colors)).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><rect width="${w}" height="${h}" fill="${colors[0]}"/>${body}</svg>\n`;
}

const IMAGES = [
  ['cover-01', 1600, 900, 11, 0, [waves, circles]],
  ['cover-02', 1600, 900, 12, 1, [stripes, circles]],
  ['artwork-01', 1200, 900, 21, 0, [waves]],
  ['artwork-02', 1200, 900, 22, 0, [waves, circles]],
  ['artwork-03', 900, 1200, 23, 4, [waves]],
  ['artwork-04', 1200, 900, 24, 3, [blocks, circles]],
  ['artwork-05', 900, 1200, 25, 3, [blocks]],
  ['artwork-06', 1200, 900, 26, 2, [stripes]],
  ['artwork-07', 1000, 1000, 27, 2, [circles, blocks]],
  ['artwork-08', 900, 1200, 28, 1, [stripes, circles]],
  ['artwork-09', 900, 1200, 29, 1, [blocks, circles]],
  ['artwork-10', 1000, 1000, 30, 4, [circles]],
  ['profile-01', 400, 400, 41, 0, [circles]],
  ['profile-02', 400, 400, 42, 1, [blocks]],
];

fs.mkdirSync(OUT, { recursive: true });
for (const [name, w, h, seed, palette, painters] of IMAGES) {
  fs.writeFileSync(path.join(OUT, `${name}.svg`), svg(w, h, seed, palette, painters));
}
console.log(`${IMAGES.length}개 → ${path.relative(process.cwd(), OUT)}`);
