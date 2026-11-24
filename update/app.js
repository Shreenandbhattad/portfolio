/* Shreenand · desktop edition (macOS-style). Plain JS, no build step, no dependencies. */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const ic = n => `<svg><use href="#i-${n}"/></svg>`;
const chips = a => a.map(x => `<span class="chip">${x}</span>`).join('');
const store = {
  get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
};
const small = () => matchMedia('(max-width:900px)').matches;
const reduced = () => matchMedia('(prefers-reduced-motion:reduce)').matches;

/* ================= content ================= */
const LINKS = {
  github: 'https://github.com/Shreenandbhattad',
  linkedin: 'https://www.linkedin.com/in/shreenandbhattad/',
  mail: 'mailto:shreenand.bhattad_ug2023@ashoka.edu.in',
  resume: '../resume.pdf'
};
const JOBS = [
  { org: 'ARTPARK · IISc Bengaluru', short: 'AP', col: ['#14b8a6', '#0f766e'], when: 'May 2026 – now', role: 'GenAI DevOps Intern',
    text: 'CI/CD pipelines with GitHub Actions and Docker, zero-downtime deployments to GPU servers, observability with Grafana and Loki, and benchmarking LLM serving with Ollama and vLLM.',
    tags: ['GitHub Actions', 'Docker', 'AWS', 'Grafana', 'vLLM', 'Linux'] },
  { org: 'Eka.care', short: 'EK', col: ['#ff7a66', '#e0372b'], when: 'Jun 2026 – now', role: 'AI Research & Engineering Intern',
    text: 'Mining 1M+ EHR records, fine-tuning ClinicalBERT for ICD-10 classification, and sequence models over patient records, with findings headed for publication.',
    tags: ['SQL', 'Pandas', 'ClinicalBERT', 'PyTorch', 'Clustering'] },
  { org: 'New and Modern · NYC', short: 'NM', col: ['#55555c', '#1d1d1f'], when: 'Dec 2025 – Apr 2026', role: 'Software Engineering Intern',
    text: 'Full-stack backend features, faster queries through indexing and query-plan work, typed REST APIs, Python ETL pipelines, and Redis caching on hot paths.',
    tags: ['Next.js', 'PostgreSQL', 'Python', 'Redis', 'AWS / GCP'] },
  { org: 'PsyFi Labs', short: 'PF', col: ['#a78bff', '#6a3cf0'], when: 'Aug 2025 – Jun 2026', role: 'Product Engineering Intern',
    text: 'Built a behavioral-insights dashboard end to end, productionized an ML user-profiling model with async inference, and automated multi-source ETL.',
    tags: ['ML', 'n8n', 'OpenAI API', 'Apps Script', 'Webflow'] },
  { org: 'Koita Centre for Digital Health · Ashoka', short: 'KC', col: ['#5ac8fa', '#0a60ff'], when: 'Jan – Aug 2025', role: 'Data Insights Research Intern',
    text: 'Accelerometer and genomic data from 5,000+ biobank participants, parallel pipelines over 2+ TB of sensor data, and CNN classifiers for cardiorespiratory risk.',
    tags: ['Python', 'R', 'Multiprocessing', 'CNNs', 'Statistics'] }
];
const PROJECTS = [
  { name: 'locryp: proof-carrying verification for cryptographic parameters', kind: 'cryptography', art: 'locryp', url: 'https://github.com/Shreenandbhattad/locryp',
    text: 'Decides claims like “this modulus is prime” or “this curve has exactly N points” by exact computation, and writes an evidence report where every positive answer carries a certificate anyone can re-verify. Pure Python standard library.', tags: ['Python', 'Number theory', 'Elliptic curves', 'Certificates', 'Zero dependencies'] },
  { name: 'argmin: GPS-free 3D mapping from a phone video', kind: '3D vision', art: 'argmin', url: 'https://github.com/Shreenandbhattad/argmin',
    text: 'Film a space with any smartphone and get a navigable 3D Gaussian splat plus the camera trajectory, with no GPS, LiDAR or prior map. COLMAP poses, GPU splat training, and a mobile viewer. Runs on Colab or Apple Silicon.', tags: ['COLMAP', 'Gaussian splatting', 'gsplat', 'three.js', 'Python'] },
  { name: 'Visual recognition & novel view synthesis', kind: 'deep learning', art: 'nerf', url: 'https://github.com/Shreenandbhattad/Computer-Vision-CS-4932',
    text: 'Image classification, zero-shot segmentation, and a small NeRF that learns to see a scene from new angles.', tags: ['PyTorch', 'ConvNeXt', 'SAM', 'CLIP', 'NeRF', 'Python'] },
  { name: 'Bank statement intelligence', kind: 'applied NLP', art: 'bank', url: 'https://github.com/Shreenandbhattad/Deepvue',
    text: 'Teaching a pipeline to read messy bank narrations and make sense of where money actually goes.', tags: ['Python', 'scikit-learn', 'TF-IDF', 'Pandas', 'Regex / FSM'] },
  { name: 'Crowdsourced issue tracker', kind: 'full-stack', art: 'map', url: LINKS.github,
    text: 'A map where people can pin problems in their neighbourhood and watch them get fixed.', tags: ['PostgreSQL', 'PostGIS', 'Docker', 'AWS EC2 / S3', 'Nginx', 'Redis', 'Leaflet'] },
  { name: 'Forest fire recovery in the Himalayas', kind: 'satellite data', art: 'forest', url: LINKS.github,
    text: 'Watching burned forests come back to life, one satellite image at a time.', tags: ['Google Earth Engine', 'Python', 'rasterio', 'GDAL', 'geopandas', 'Random Forest'] }
];
const GAMES = [
  { n: 'VOID//SHIFT', art: 'void', u: '../voidshift.html', d: 'A hand-controlled arcade survival game. Shield, pulse and dash against enemies that learn how you move.', hot: 1 },
  { n: 'Gesture synth', art: 'synth', u: '../gesturesynth.html', d: 'Play chords with your bare hands, tracked live with computer vision.' },
  { n: 'The brain', art: 'brain', u: '../neural.html', d: 'A real neural network training live in your browser, written from scratch.' },
  { n: 'The garden', art: 'garden', u: '../garden.html', d: 'Plant trees and flowers across four seasons, or send someone a bouquet.' },
  { n: 'The flock', art: 'flock', u: '../flock.html', d: 'A small murmuration of birds that follows your cursor. Click to startle them.' },
  { n: 'Puzzles', art: 'puzzle', u: '../puzzles.html', d: 'A mini crossword bank: 43 puzzles across global, India and easy.' },
  { n: 'Flight deck', art: 'flight', u: '../flightdeck.html', d: 'Share your flight status.' }
];

/* ================= drawn artwork (SVG) ================= */
let uid = 0;
const gid = () => 'a' + (++uid);
function rng(seed) { let s = seed; return () => (s = (s * 16807) % 2147483647) / 2147483647; }
const svg = (inner, vb = '0 0 320 160') => `<svg class="art" viewBox="${vb}" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${inner}</svg>`;
const grad = (id, a, b, x2 = 1, y2 = 1) => `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;
const glowF = id => `<filter id="${id}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4"/></filter>`;

const ART = {
  nerf() {
    const g = gid(), f = gid(), r = rng(3);
    let rays = '', pts = '';
    [[28, 118], [60, 138], [18, 70]].forEach(([x, y]) => {
      [[0, 0], [1, 0], [0, 1], [1, 1]].forEach(([a, b]) => { rays += `<line x1="${x}" y1="${y}" x2="${176 + a * 56}" y2="${64 + b * 52}" stroke="#7fe3ff" stroke-opacity=".28" stroke-width="1"/>`; });
      rays += `<rect x="${x - 9}" y="${y - 6}" width="18" height="12" rx="3" fill="#0b1b4d" stroke="#7fe3ff" stroke-width="1.4"/><circle cx="${x + 3}" cy="${y}" r="3" fill="#7fe3ff"/>`;
    });
    for (let i = 0; i < 70; i++) pts += `<circle cx="${(170 + r() * 80).toFixed(1)}" cy="${(40 + r() * 100).toFixed(1)}" r="${(.8 + r() * 1.4).toFixed(1)}" fill="${['#7fe3ff', '#ff7ac8', '#ffd479'][i % 3]}" opacity="${(.4 + r() * .6).toFixed(2)}"/>`;
    return svg(`<defs>${grad(g, '#0a1440', '#3b1b86')}${glowF(f)}</defs><rect width="320" height="160" fill="url(#${g})"/>
      ${[...Array(9)].map((_, i) => `<line x1="${-40 + i * 50}" y1="160" x2="${110 + i * 12}" y2="104" stroke="#fff" stroke-opacity=".07"/>`).join('')}
      ${[...Array(5)].map((_, i) => `<line x1="0" y1="${112 + i * 14}" x2="320" y2="${112 + i * 14}" stroke="#fff" stroke-opacity=".07"/>`).join('')}
      <g filter="url(#${f})" opacity=".8"><polygon points="176,64 232,64 252,44 196,44" fill="#7fe3ff"/><rect x="176" y="64" width="56" height="52" fill="#7a5cff"/></g>
      ${rays}
      <g fill="none" stroke="#bff3ff" stroke-width="1.6" stroke-linejoin="round"><rect x="176" y="64" width="56" height="52"/><polygon points="176,64 196,44 252,44 232,64"/><polyline points="252,44 252,96 232,116"/></g>${pts}`);
  },
  bank() {
    const g = gid(), r = rng(11), rows = ['SWIGGY ORDER 8821', 'UPI/AMZN/PAY/4410', 'ATM WDL SELF 0011', 'NEFT SALARY NOV', 'IRCTC TKT 99213'];
    const cats = [['Food', '#ff9f43'], ['Shopping', '#a78bff'], ['Cash', '#5ac8fa'], ['Income', '#34c759'], ['Travel', '#ff6b81']];
    let list = '';
    rows.forEach((t, i) => { list += `<g transform="translate(18,${22 + i * 25})"><rect width="196" height="20" rx="6" fill="#fff" opacity=".95"/><text x="9" y="14" font-size="8.5" font-family="ui-monospace,Menlo,monospace" fill="#334155">${t}</text><rect x="${196 - 52}" y="4" width="46" height="12" rx="6" fill="${cats[i][1]}"/><text x="${196 - 29}" y="12.5" font-size="7" font-weight="700" text-anchor="middle" fill="#fff" font-family="Inter,sans-serif">${cats[i][0]}</text></g>`; });
    let arc = '', a0 = -90; const parts = [.32, .24, .16, .18, .1];
    parts.forEach((p, i) => { const a1 = a0 + p * 360, R = 38, x0 = 272 + R * Math.cos(a0 * Math.PI / 180), y0 = 80 + R * Math.sin(a0 * Math.PI / 180), x1 = 272 + R * Math.cos(a1 * Math.PI / 180), y1 = 80 + R * Math.sin(a1 * Math.PI / 180); arc += `<path d="M${x0.toFixed(1)} ${y0.toFixed(1)}A${R} ${R} 0 ${p > .5 ? 1 : 0} 1 ${x1.toFixed(1)} ${y1.toFixed(1)}" fill="none" stroke="${cats[i][1]}" stroke-width="13"/>`; a0 = a1; });
    return svg(`<defs>${grad(g, '#0f766e', '#0e4f6e')}</defs><rect width="320" height="160" fill="url(#${g})"/>${list}${arc}<text x="272" y="84" font-size="11" font-weight="800" text-anchor="middle" fill="#fff" font-family="Inter,sans-serif">₹ split</text>`);
  },
  map() {
    const g = gid(), r = rng(5);
    let blocks = '';
    for (let i = 0; i < 14; i++) blocks += `<rect x="${(r() * 300).toFixed(0)}" y="${(r() * 140).toFixed(0)}" width="${(26 + r() * 40).toFixed(0)}" height="${(18 + r() * 28).toFixed(0)}" rx="3" fill="#dbe7d4" opacity=".85"/>`;
    const pin = (x, y, c, d) => `<g transform="translate(${x},${y})"><circle r="14" fill="${c}" opacity=".18"><animate attributeName="r" values="6;18;6" dur="2.4s" begin="${d}s" repeatCount="indefinite"/><animate attributeName="opacity" values=".4;0;.4" dur="2.4s" begin="${d}s" repeatCount="indefinite"/></circle><path d="M0 0c-7-8-9-13-9-17a9 9 0 1 1 18 0c0 4-2 9-9 17z" transform="translate(0,2)" fill="${c}" stroke="#fff" stroke-width="1.5"/><circle cy="-15" r="3.200" fill="#fff"/></g>`;
    return svg(`<defs>${grad(g, '#eef3e8', '#e3ebde')}</defs><rect width="320" height="160" fill="url(#${g})"/>${blocks}
      <path d="M-10 120C60 100 90 150 170 118S280 90 330 112V170H-10z" fill="#b7d9f2" opacity=".9"/>
      <g stroke="#fff" stroke-width="9" fill="none" stroke-linecap="round"><path d="M-10 60H330"/><path d="M90-10V170"/><path d="M220-10L190 170"/><path d="M-10 20L330 100"/></g>
      <g stroke="#f6c85f" stroke-width="3" fill="none" stroke-dasharray="2 8" stroke-linecap="round"><path d="M-10 60H330"/><path d="M90-10V170"/></g>
      ${pin(70, 60, '#ff4d5e', 0)}${pin(200, 100, '#ff9f0a', .8)}${pin(262, 42, '#34c759', 1.6)}${pin(130, 120, '#ff4d5e', 2)}`);
  },
  forest() {
    const r = rng(19), cols = 22, rows = 11, w = 320 / cols, h = 160 / rows;
    let cells = '';
    for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
      const t = Math.min(1, Math.max(0, x / cols + (r() - .5) * .38 + (y / rows - .5) * .12));
      const c = t < .25 ? [74, 40, 30] : t < .45 ? [214, 96, 40] : t < .6 ? [232, 190, 70] : t < .78 ? [128, 178, 80] : [38, 120, 60];
      cells += `<rect x="${(x * w).toFixed(1)}" y="${(y * h).toFixed(1)}" width="${(w + .4).toFixed(1)}" height="${(h + .4).toFixed(1)}" fill="rgb(${c.map(v => Math.round(v + (r() - .5) * 18)).join(',')})"/>`;
    }
    return svg(`${cells}<g font-family="Inter,sans-serif" font-size="8" font-weight="700" fill="#fff"><rect x="12" y="132" width="132" height="16" rx="8" fill="#000" opacity=".45"/><text x="22" y="143">burn scar → regrowth</text></g>`);
  },
  locryp() {
    const g = gid();
    const rows = [['FIELD-PRIME', 'Fp', 'pocklington'], ['SUBGROUP-PRIME', 'secp256k1', 'morrison'], ['GENERATOR-ORDER', 'G', 'scalar mult'], ['CURVE-CARDINALITY', 'E', 'exact count'], ['EMBEDDING-DEGREE', 'r', '≥ 100']];
    const body = rows.map((r, i) => `<g transform="translate(14,${34 + i * 22})"><rect width="38" height="14" rx="2" fill="#3cc45a" stroke="#000"/><text x="19" y="10.500" font-size="8" font-weight="800" text-anchor="middle" fill="#04200a" font-family="ui-monospace,Menlo,monospace">PASS</text><text x="46" y="10.500" font-size="9" font-weight="700" fill="#e8f6ff" font-family="ui-monospace,Menlo,monospace">${r[0]}</text><text x="196" y="10.500" font-size="8" fill="#7fe3ff" font-family="ui-monospace,Menlo,monospace">${r[1]}</text><text x="250" y="10.500" font-size="8" fill="#9aa7c4" font-family="ui-monospace,Menlo,monospace">${r[2]}</text></g>`).join('');
    return svg(`<defs>${grad(g, '#0b1226', '#141d3d')}</defs><rect width="320" height="160" fill="url(#${g})"/><rect x="0" y="0" width="320" height="20" fill="#000" opacity=".45"/><g fill="#ff5f57"><circle cx="12" cy="10" r="3"/></g><g fill="#febc2e"><circle cx="23" cy="10" r="3"/></g><g fill="#28c840"><circle cx="34" cy="10" r="3"/></g>
      <text x="160" y="14" font-size="8" text-anchor="middle" fill="#9aa7c4" font-family="ui-monospace,Menlo,monospace">locryp check examples/secp256k1.toml</text>${body}
      <text x="306" y="150" font-size="22" text-anchor="end" fill="#fff" opacity=".1" font-family="Georgia,serif" font-style="italic">∀ p ∈ ℙ</text>`);
  },
  argmin() {
    const g = gid(), f = gid(), r = rng(41); let sp = '';
    for (let i = 0; i < 90; i++) {
      const t = r(), x = 40 + t * 240, wall = r() > .45, y = wall ? 20 + r() * 80 : 100 + r() * 36, c = ['#ff7ac8', '#7fe3ff', '#ffd479', '#a78bff', '#7fffb0'][i % 5];
      sp += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${(5 + r() * 9).toFixed(1)}" ry="${(3 + r() * 6).toFixed(1)}" fill="${c}" opacity="${(.25 + r() * .5).toFixed(2)}" transform="rotate(${(r() * 180).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`;
    }
    const cam = (x, y, a) => `<g transform="translate(${x},${y}) rotate(${a})"><path d="M0 0L16-9V9z" fill="#fff" opacity=".18" stroke="#fff" stroke-width=".8"/><circle r="3" fill="#ffd12a" stroke="#000"/></g>`;
    return svg(`<defs>${grad(g, '#0a0f24', '#2a1550')}<filter id="${f}"><feGaussianBlur stdDeviation="2.200"/></filter></defs><rect width="320" height="160" fill="url(#${g})"/>
      <path d="M30 140L110 60H210L290 140z" fill="#fff" opacity=".05"/><path d="M110 60H210V20H110z" fill="#fff" opacity=".04"/>
      <g filter="url(#${f})">${sp}</g>
      <path d="M44 140C90 120 120 128 160 112S250 100 282 124" fill="none" stroke="#ffd12a" stroke-width="2" stroke-dasharray="4 5" stroke-linecap="round"/>
      ${cam(60, 136, -25)}${cam(136, 120, -10)}${cam(206, 106, -20)}${cam(274, 120, 25)}
      <g font-family="Inter,sans-serif" font-size="8" font-weight="700" fill="#fff"><rect x="12" y="12" width="82" height="16" rx="8" fill="#000" opacity=".5"/><text x="22" y="23">3D Gaussian splat</text></g>`);
  },
  void() {
    const g = gid(), f = gid(), r = rng(8);
    let dots = '';
    for (let i = 0; i < 26; i++) dots += `<circle cx="${(r() * 320).toFixed(0)}" cy="${(r() * 160).toFixed(0)}" r="${(.5 + r() * 1.2).toFixed(1)}" fill="#fff" opacity="${(.15 + r() * .35).toFixed(2)}"/>`;
    const foe = (x, y, rot) => `<g transform="translate(${x},${y}) rotate(${rot})"><circle r="20" fill="#ff6b5a" opacity=".3" filter="url(#${f})"/><path d="M13 0L-9 8-4 0-9-8z" fill="#ff6b5a" stroke="#ffd6cf" stroke-width="1.2"/></g>`;
    return svg(`<defs><radialGradient id="${g}" cx=".5" cy=".5" r=".7"><stop offset="0" stop-color="#0d1330"/><stop offset="1" stop-color="#03040a"/></radialGradient>${glowF(f)}</defs><rect width="320" height="160" fill="url(#${g})"/>
      <g stroke="#a0beff" stroke-opacity=".07">${[...Array(7)].map((_, i) => `<line x1="${i * 55}" y1="0" x2="${i * 55}" y2="160"/>`).join('')}${[...Array(4)].map((_, i) => `<line x1="0" y1="${i * 45}" x2="320" y2="${i * 45}"/>`).join('')}</g>${dots}
      <path d="M130 120C150 110 165 95 188 82" stroke="#3df2ff" stroke-opacity=".5" stroke-width="5" fill="none" stroke-linecap="round" filter="url(#${f})"/>
      ${foe(60, 40, 35)}${foe(262, 52, 150)}${foe(250, 126, -150)}
      <circle cx="190" cy="80" r="44" fill="none" stroke="#a78bff" stroke-width="2" stroke-opacity=".7"/><circle cx="190" cy="80" r="30" fill="#a78bff" opacity=".12"/>
      <circle cx="190" cy="80" r="22" fill="#3df2ff" opacity=".35" filter="url(#${f})"/><circle cx="190" cy="80" r="6.500" fill="#eaffff"/><circle cx="190" cy="80" r="13" fill="none" stroke="#3df2ff" stroke-width="1.600" stroke-dasharray="14 10"/>
      <g transform="translate(120,30)"><path d="M0 0l8 8-8 8-8-8z" fill="#ffcf5a" stroke="#fff3c6"/></g><g transform="translate(40,128)"><path d="M0 -6l5 6-5 6-5-6z" fill="#8ec5ff"/></g>`);
  },
  synth() {
    const g = gid(); let bars = '';
    for (let i = 0; i < 40; i++) { const h = 14 + Math.abs(Math.sin(i * .5) * 40 + Math.sin(i * 1.3) * 22); bars += `<rect x="${12 + i * 7.4}" y="${80 - h / 2}" width="4.200" height="${h}" rx="2.100" fill="url(#${g}b)" opacity="${.5 + (i % 5) * .1}"/>`; }
    return svg(`<defs>${grad(g, '#1c1445', '#7a2a8f')}<linearGradient id="${g}b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffb4ec"/><stop offset="1" stop-color="#6fd6ff"/></linearGradient></defs><rect width="320" height="160" fill="url(#${g})"/>${bars}
      <g transform="translate(250,24)" fill="#fff" opacity=".9"><path d="M0 14c0-5 3-7 6-7s6 2 6 7v10H0z" fill="none" stroke="#fff" stroke-width="1.600"/><rect x="2.500" y="2" width="3" height="10" rx="1.500"/><rect x="7" y="0" width="3" height="12" rx="1.500"/></g>`);
  },
  brain() {
    const g = gid(), r = rng(21), layers = [4, 6, 6, 3], X = [50, 125, 200, 272]; let e = '', n = '';
    const pos = layers.map((c, li) => [...Array(c)].map((_, i) => [X[li], 80 + (i - (c - 1) / 2) * 24]));
    for (let l = 0; l < 3; l++) pos[l].forEach(a => pos[l + 1].forEach(b => { e += `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${r() > .5 ? '#7fe3ff' : '#ff9ad5'}" stroke-opacity="${(.12 + r() * .5).toFixed(2)}" stroke-width="${(.6 + r() * 1.4).toFixed(1)}"/>`; }));
    pos.flat().forEach((p, i) => { n += `<circle cx="${p[0]}" cy="${p[1]}" r="5.500" fill="#0a1330" stroke="${i % 2 ? '#7fe3ff' : '#ff9ad5'}" stroke-width="1.800"/>`; });
    return svg(`<defs>${grad(g, '#0a1330', '#1b3a7a')}</defs><rect width="320" height="160" fill="url(#${g})"/>${e}${n}`);
  },
  garden() {
    const g = gid(), r = rng(14); let fl = '';
    const cols = ['#ff8fb1', '#ffd166', '#c792ff', '#ff7a66', '#fff'];
    for (let i = 0; i < 12; i++) {
      const x = 14 + i * 26 + r() * 8, y = 70 + r() * 62, c = cols[i % cols.length], s = 7 + r() * 6;
      fl += `<line x1="${x}" y1="${y}" x2="${x}" y2="160" stroke="#2f7d32" stroke-width="2"/>${[0, 72, 144, 216, 288].map(a => `<ellipse cx="${(x + Math.cos(a * Math.PI / 180) * s).toFixed(1)}" cy="${(y + Math.sin(a * Math.PI / 180) * s).toFixed(1)}" rx="${s * .7}" ry="${s * .5}" transform="rotate(${a} ${(x + Math.cos(a * Math.PI / 180) * s).toFixed(1)} ${(y + Math.sin(a * Math.PI / 180) * s).toFixed(1)})" fill="${c}"/>`).join('')}<circle cx="${x}" cy="${y}" r="${s * .38}" fill="#f4a300"/>`;
    }
    return svg(`<defs>${grad(g, '#bfe6ff', '#fdf3d3', 0, 1)}</defs><rect width="320" height="160" fill="url(#${g})"/><circle cx="270" cy="34" r="20" fill="#ffe066"/><path d="M0 120C80 96 160 128 320 100V160H0z" fill="#7bbf6a"/><path d="M0 138C100 118 200 148 320 126V160H0z" fill="#5aa04f"/>${fl}`);
  },
  flock() {
    const g = gid(), r = rng(31); let b = '';
    for (let i = 0; i < 46; i++) { const t = i / 46, x = 30 + t * 270 + (r() - .5) * 34, y = 80 + Math.sin(t * 6.3) * 36 + (r() - .5) * 38, s = .6 + r() * .8; b += `<path transform="translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${s.toFixed(2)}) rotate(${(-20 + r() * 40).toFixed(0)})" d="M-8 0Q-4-5 0 0Q4-5 8 0Q4-2 0 3Q-4-2-8 0z" fill="#1b2340" opacity="${(.5 + r() * .5).toFixed(2)}"/>`; }
    return svg(`<defs>${grad(g, '#ffd6a5', '#9ec5ff', 0, 1)}</defs><rect width="320" height="160" fill="url(#${g})"/><circle cx="64" cy="118" r="30" fill="#fff" opacity=".35"/>${b}`);
  },
  puzzle() {
    const g = gid(); let c = '';
    const f = ['11110111', '10010100', '11111111', '10010101', '11110111', '00010100', '11111111'];
    f.forEach((row, y) => [...row].forEach((v, x) => { if (v === '1') c += `<rect x="${60 + x * 25}" y="${10 + y * 20}" width="23" height="18" rx="3" fill="#fff"/>${(x * 3 + y) % 4 === 0 ? `<text x="${60 + x * 25 + 3}" y="${10 + y * 20 + 8}" font-size="6" font-weight="700" fill="#64748b" font-family="Inter,sans-serif">${(x + y) % 9 + 1}</text>` : ''}`; else c += `<rect x="${60 + x * 25}" y="${10 + y * 20}" width="23" height="18" rx="3" fill="#1e293b"/>`; }));
    return svg(`<defs>${grad(g, '#ff8a5c', '#d6336c')}</defs><rect width="320" height="160" fill="url(#${g})"/>${c}${['C', 'R', 'O', 'S', 'S'].map((l, i) => `<text x="${64 + i * 25}" y="${64}" font-size="13" font-weight="800" fill="#1e293b" font-family="Inter,sans-serif">${l}</text>`).join('')}`);
  },
  flight() {
    const g = gid();
    return svg(`<defs>${grad(g, '#3a8dff', '#9fd0ff', 0, 1)}</defs><rect width="320" height="160" fill="url(#${g})"/>
      <g fill="#fff" opacity=".8"><ellipse cx="60" cy="40" rx="30" ry="9"/><ellipse cx="90" cy="34" rx="22" ry="8"/><ellipse cx="240" cy="118" rx="36" ry="10"/><ellipse cx="270" cy="110" rx="20" ry="7"/></g>
      <path d="M24 124C100 20 220 20 296 124" fill="none" stroke="#fff" stroke-width="2.200" stroke-dasharray="3 7" stroke-linecap="round"/>
      <g transform="translate(160,36) rotate(2)"><path d="M-22 4L22 0 -22-4-14 0z" fill="#fff"/><path d="M-4 0L-14 -16-8 -16 6 0 -8 16-14 16z" fill="#fff"/></g>
      <circle cx="24" cy="124" r="6" fill="#fff"/><circle cx="296" cy="124" r="6" fill="#ff9f0a" stroke="#fff" stroke-width="2"/>`);
  },
  blob(c1, c2, c3) {
    const g = gid(), p = gid();
    return `<svg class="bgart" viewBox="0 0 600 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true" shape-rendering="crispEdges"><defs>${grad(g, c1, c2)}<pattern id="${p}" width="4" height="4" patternUnits="userSpaceOnUse"><rect width="2" height="2" fill="#000" opacity=".18"/><rect x="2" y="2" width="2" height="2" fill="#000" opacity=".18"/></pattern></defs>
      <rect width="600" height="200" fill="url(#${g})"/><rect width="600" height="200" fill="url(#${p})"/>
      <g fill="none" stroke="${c3}" stroke-width="8">${[34, 66, 98, 130].map((r, i) => `<circle cx="520" cy="100" r="${r}" opacity="${1 - i * .2}"/>`).join('')}</g>
      <g fill="#000" opacity=".25"><rect x="0" y="176" width="600" height="24"/></g><g fill="#fff" opacity=".5"><rect x="40" y="40" width="24" height="8"/><rect x="52" y="32" width="12" height="8"/><rect x="120" y="70" width="32" height="8"/></g></svg>`;
  }
};
const px = d => `<svg class="f" viewBox="0 0 32 32" shape-rendering="crispEdges">${d}</svg>`;
const fileIcon = px('<path d="M6 2h14l6 6v22H6z" fill="#fff" stroke="#000" stroke-width="2"/><path d="M20 2v6h6" fill="#ccc" stroke="#000" stroke-width="2"/><rect x="9" y="14" width="14" height="3" fill="#ff3b30"/><rect x="9" y="19" width="14" height="2" fill="#777"/><rect x="9" y="23" width="10" height="2" fill="#777"/>');
const folderIcon = px('<path d="M2 8h10l3 3h15v17H2z" fill="#ffd12a" stroke="#000" stroke-width="2"/><rect x="4" y="14" width="24" height="2" fill="#fff" opacity=".6"/>');
const hdIcon = px('<rect x="3" y="7" width="26" height="18" fill="#dcdcdc" stroke="#000" stroke-width="2"/><rect x="6" y="10" width="20" height="3" fill="#8c8c8c"/><rect x="6" y="19" width="9" height="3" fill="#000"/><rect x="22" y="19" width="4" height="3" fill="#3cc45a" stroke="#000"/>');

/* ================= window bodies ================= */
const PANES = [
  { tab: 'What I build', h: 'Machine learning, end to end', p: 'Models are the easy part. I like the whole path: messy data in, a pipeline that holds up, and something people can actually use. Clinical text, sensor data, satellite imagery, bank statements.',
    cta: ['See the projects', 'projects'], q: 'What does Shreenand actually build?', a: 'I traced it across his work and projects. Four patterns keep showing up:',
    src: [['Clinical NLP', 'Eka.care'], ['LLM serving & GPU deploys', 'ARTPARK'], ['Vision, NeRF & segmentation', 'Projects'], ['Biobank sensor pipelines', 'Koita Centre']] },
  { tab: "Where I've worked", h: 'Five internships, three kinds of team', p: 'A research centre, a health-tech startup, a New York product team and a behavioral-science startup. Each one taught me something different about shipping.',
    cta: ['See the timeline', 'work'], q: 'Where has Shreenand worked?', a: 'Five roles since early 2025. Most recent first:',
    src: [['GenAI DevOps Intern', 'ARTPARK · now'], ['AI Research & Engineering', 'Eka.care · now'], ['Software Engineering', 'New and Modern · NYC'], ['Product Engineering', 'PsyFi Labs']] },
  { tab: 'Play with it', h: 'A portfolio you can poke at', p: 'A neural network that trains in your browser, a synth you play with your bare hands, and an arcade game with enemies that learn how you move. Camera features run entirely on your device.',
    cta: ['Open the arcade', 'play'], q: 'Is there anything fun to try?', a: 'Yes. A few things are playable right now:',
    src: [['VOID//SHIFT', 'hand-tracked arcade'], ['Gesture synth', 'chords with your hands'], ['The brain', 'neural net, from scratch'], ['The garden', 'four seasons']] }
];
const ring = (p, c1, c2, id) => `<svg width="78" height="78" viewBox="0 0 78 78"><defs>${grad(id, c1, c2)}</defs><circle cx="39" cy="39" r="31" fill="none" stroke="#ddd" stroke-width="8"/><circle cx="39" cy="39" r="35.5" fill="none" stroke="#000" stroke-width="1.5"/><circle cx="39" cy="39" r="26.5" fill="none" stroke="#000" stroke-width="1.5"/><circle cx="39" cy="39" r="31" fill="none" stroke="url(#${id})" stroke-width="8" stroke-linecap="butt" stroke-dasharray="${(p * 194.8).toFixed(1)} 200" transform="rotate(-90 39 39)"/></svg>`;
const cloudCols = ['#2ec8e6', '#ffd12a', '#ff5fa2', '#3cc45a', '#ff8a1f', '#9b6bff'];

const PAGES = {
  home: {
    title: 'Home', icon: 'home', w: 'min(1060px,calc(100vw - 150px))', h: 'calc(100vh - 128px)', x: 'center', y: 40,
    html: () => `<div class="pad">
      <div class="banner"><canvas id="net"></canvas><div class="in">
        <div class="who"><img src="https://avatars.githubusercontent.com/u/145998920?v=4" alt="Shreenand Bhattad" width="92" height="92">
          <div><h1>Shreenand Bhattad</h1><p>Machine learning, data, and the systems that hold them together.</p>
          <div class="tags"><span>Ashoka University · CS &amp; Economics</span><span>ARTPARK</span><span>Eka.care</span></div></div></div>
        <div class="acts"><a class="btn" href="#work" data-open="work">See my work</a><a class="btn glass" href="#contact" data-open="contact">Say hi</a></div>
      </div></div>
      <div class="widgets">
        <div class="card wd s3"><h4>Right now</h4>
          ${JOBS.slice(0, 2).map(j => `<div class="now"><div class="mono" style="background:linear-gradient(160deg,${j.col[0]},${j.col[1]})">${j.short}</div><div><b>${j.role}</b><small>${j.org} · ${j.when}</small></div></div>`).join('')}
          <div class="now"><div class="mono" style="background:linear-gradient(160deg,#c68bff,#6e3bff)">A</div><div><b>Studying CS, minor in economics</b><small>Ashoka University</small></div></div></div>
        <div class="card wd s3"><h4>By the numbers</h4><div class="rings">
          <div class="ringw">${ring(.92, '#2ec8e6', '#2ec8e6', 'rg1')}<div class="rv" style="position:absolute;left:0;right:0;top:0;height:78px;display:flex;align-items:center;justify-content:center;font-family:var(--font);font-weight:800;font-size:1rem">1M+</div><small style="display:block;margin-top:6px;color:var(--mute);font-size:.7rem">EHR records<br>mined</small></div>
          <div class="ringw">${ring(.74, '#ff8a1f', '#ff8a1f', 'rg2')}<div class="rv" style="position:absolute;left:0;right:0;top:0;height:78px;display:flex;align-items:center;justify-content:center;font-family:var(--font);font-weight:800;font-size:1rem">2TB+</div><small style="display:block;margin-top:6px;color:var(--mute);font-size:.7rem">sensor data<br>processed</small></div>
          <div class="ringw">${ring(.6, '#3cc45a', '#3cc45a', 'rg3')}<div class="rv" style="position:absolute;left:0;right:0;top:0;height:78px;display:flex;align-items:center;justify-content:center;font-family:var(--font);font-weight:800;font-size:1rem">5k+</div><small style="display:block;margin-top:6px;color:var(--mute);font-size:.7rem">biobank<br>participants</small></div></div></div>
        <div class="card wd s4" id="tabs"><h4>Ask about me <span>sample answers</span></h4><div class="tabrow">${PANES.map((p, i) => `<button data-tab="${i}">${p.tab}</button>`).join('')}</div><div class="tabpane" id="pane"></div></div>
        <a class="card wd s2 gamew" href="../voidshift.html" target="_blank" rel="noopener"><span class="new">NEW</span>${ART.void().replace('class="art"', 'class="art" style="position:absolute;inset:0;width:100%;height:100%;border-radius:0"')}<div class="tx"><b>VOID//SHIFT</b><small>Play it with your hands →</small></div></a>
        <div class="card wd s6"><h4>Toolbox</h4><div class="cloud">${['PyTorch', 'Python', 'SQL', 'Docker', 'GitHub Actions', 'AWS', 'vLLM', 'Grafana', 'ClinicalBERT', 'Pandas', 'PostgreSQL', 'Redis', 'Next.js', 'R', 'GDAL', 'CLIP', 'NeRF', 'scikit-learn'].map((t, i) => `<span style="background:${cloudCols[i % cloudCols.length]}">${t}</span>`).join('')}</div></div>
      </div></div>`
  },
  about: {
    title: 'About', icon: 'user', w: 680, h: 600, x: 160, y: 70,
    html: () => `<div class="pad"><div class="hero2" style="min-height:190px;align-items:flex-start;justify-content:flex-end">${ART.blob('#0e6a94', '#2aa5c7', '#ffd12a')}
        <img src="https://avatars.githubusercontent.com/u/145998920?v=4" alt="" width="84" height="84" style="border-radius:50%;border:3px solid #fff;box-shadow:0 8px 24px rgba(0,0,0,.4);margin-bottom:12px"><h1>Hello, I'm Shreenand</h1><p>Nice of you to drop by.</p></div>
      <p class="lead">I'm a computer science student at <b>Ashoka University</b>, with a minor in economics. I spend most of my time around machine learning, data, and the systems that hold them together.</p>
      <p class="lead">These days I'm interning at <b>ARTPARK (IISc Bengaluru)</b> and <b>Eka.care</b>, working on GenAI infrastructure and clinical data. Before that I worked with teams in New York, behavioral science, and digital health research.</p>
      <div class="facts"><div class="card fact"><small>Studying</small><b>Computer science + economics minor</b></div><div class="card fact"><small>School</small><b>Ashoka University</b></div>
        <div class="card fact"><small>Focus</small><b>ML, data pipelines, GenAI infra</b></div><div class="card fact"><small>Currently</small><b>ARTPARK × Eka.care</b></div></div>
      <div style="margin-top:22px;display:flex;gap:10px;flex-wrap:wrap"><a class="btn" href="#work" data-open="work">See what I've been making</a><a class="btn sec" href="#contact" data-open="contact">Say hi</a></div></div>`
  },
  work: {
    title: 'Work', icon: 'brief', w: 780, h: 660, x: 200, y: 60,
    html: () => `<div class="pad"><div class="hero2">${ART.blob('#b8400a', '#ff8a1f', '#ffd12a')}<h1>Work</h1><p>Internships, and what I did there.</p></div>
      <div class="list">${JOBS.map(j => `<div class="card job"><div class="mono" style="background:linear-gradient(160deg,${j.col[0]},${j.col[1]})">${j.short}</div><div><div class="top"><h3>${j.org}</h3><span class="when">${j.when}</span></div>
        <div class="role">${j.role}</div><p>${j.text}</p><div>${chips(j.tags)}</div></div></div>`).join('')}</div>
      <p class="lead" style="font-size:.9rem">The full story is in my <a href="${LINKS.resume}" target="_blank" rel="noopener" style="color:var(--blue);font-weight:600">résumé</a>.</p></div>`
  },
  projects: {
    title: 'Projects', icon: 'code', w: 760, h: 660, x: 240, y: 56,
    html: () => `<div class="pad"><div class="hero2">${ART.blob('#0a6b2e', '#3cc45a', '#e0ff5a')}<h1>Projects</h1><p>Things I've built, mostly for the joy of it.</p></div>
      <div class="list">${PROJECTS.map(p => `<a class="card pcard" href="${p.url}" target="_blank" rel="noopener">${ART[p.art]()}<div class="tx"><div class="top"><h3>${p.name} →</h3><span class="when">${p.kind}</span></div>
        <p>${p.text}</p><div style="margin-top:6px">${chips(p.tags)}</div></div></a>`).join('')}</div>
      <p class="lead" style="font-size:.9rem">There's more on <a href="${LINKS.github}" target="_blank" rel="noopener" style="color:var(--blue);font-weight:600">GitHub</a>.</p></div>`
  },
  play: {
    title: 'Play', icon: 'play', w: 820, h: 670, x: 280, y: 50,
    html: () => `<div class="pad"><div class="hero2">${ART.blob('#8a1a5a', '#ff5fa2', '#ffd12a')}<h1>Play</h1><p>Little experiments, just for fun. They open in a new tab.</p></div>
      <div class="grid2">${GAMES.map(g => `<a class="card tile" href="${g.u}" target="_blank" rel="noopener">${g.hot ? '<span class="new">NEW</span>' : ''}${ART[g.art]()}<div class="tx"><h3>${g.n}</h3><p>${g.d}</p></div></a>`).join('')}</div></div>`
  },
  contact: {
    title: 'Say hi', icon: 'mail', w: 540, h: 540, x: 330, y: 80,
    html: () => `<div class="pad"><div class="hero2" style="min-height:130px">${ART.blob('#1a4fa0', '#2ec8e6', '#ffffff')}<h1>Say hi</h1><p>Always happy to talk about interesting problems.</p></div>
      <div class="clist">
        <a class="card" href="${LINKS.mail}"><span class="ci g-contact">${ic('mail')}</span><span><b>shreenand.bhattad_ug2023@ashoka.edu.in</b><small>Email, the best way to reach me</small></span></a>
        <a class="card" href="${LINKS.github}" target="_blank" rel="noopener"><span class="ci g-gh">${ic('gh')}</span><span><b>GitHub</b><small>Shreenandbhattad</small></span></a>
        <a class="card" href="${LINKS.linkedin}" target="_blank" rel="noopener"><span class="ci g-home">${ic('in')}</span><span><b>LinkedIn</b><small>shreenandbhattad</small></span></a>
        <a class="card" href="${LINKS.resume}" target="_blank" rel="noopener"><span class="ci g-resume">${ic('doc')}</span><span><b>Résumé</b><small>PDF</small></span></a>
      </div></div>`
  },
  resume: {
    title: 'Résumé.pdf', icon: 'doc', w: 760, h: 700, x: 250, y: 52,
    html: () => `<div class="pad"><h1 class="big">Résumé</h1><div style="margin-top:12px"><a class="btn" href="${LINKS.resume}" target="_blank" rel="noopener">Open full PDF ↗</a></div><iframe class="pdf" src="${LINKS.resume}#toolbar=0" title="Résumé"></iframe></div>`
  },
  trash: {
    title: 'Trash', icon: 'trash', w: 480, h: 420, x: 380, y: 110,
    html: () => `<div class="pad"><h1 class="big">Trash</h1><p class="lead">Things that didn't make the cut.</p>
      <div class="list"><div class="card job" style="grid-template-columns:1fr"><div><h3>🗑 The first homepage</h3><p>Too many gradients. Gone.</p></div></div>
      <div class="card job" style="grid-template-columns:1fr"><div><h3>🗑 The guestbook backend</h3><p>Paused and forgotten. It will be back, one day.</p></div></div>
      <a class="card job" href="../index.html" style="grid-template-columns:1fr;text-decoration:none"><div><h3>♻️ The original site →</h3><p>Not deleted. The classic version is still alive, one folder up.</p></div></a></div></div>`
  }
};

/* ================= window manager ================= */
const winsEl = $('#wins');
const open = {};
let zTop = 20, cascade = 0, current = null;
const DOCK = [['home', 'Home', 'home', 'g-home'], ['about', 'About', 'user', 'g-about'], ['work', 'Work', 'brief', 'g-work'], ['projects', 'Projects', 'code', 'g-projects'],
  ['play', 'Play', 'play', 'g-play'], ['contact', 'Say hi', 'mail', 'g-contact'], ['resume', 'Résumé', 'doc', 'g-resume'], 'sep',
  ['_gh', 'GitHub', 'gh', 'g-gh', LINKS.github], ['trash', 'Trash', 'trash', 'g-trash']];

function dockRect(id) { const el = $(`.dk[data-open="${id}"]`); return el ? el.getBoundingClientRect() : { left: innerWidth / 2 - 20, top: innerHeight - 50, width: 40, height: 40 }; }

function place(win, spec) {
  const vw = innerWidth, vh = innerHeight;
  win.style.width = typeof spec.w === 'number' ? Math.min(spec.w, vw - 24) + 'px' : spec.w;
  win.style.height = typeof spec.h === 'number' ? Math.min(spec.h, vh - 130) + 'px' : spec.h;
  const wpx = win.offsetWidth;
  let x = spec.x === 'center' ? (vw - wpx) / 2 : spec.x + cascade * 20;
  x = Math.max(8, Math.min(x, vw - wpx - 8));
  win.style.left = x + 'px';
  win.style.top = (spec.y + (spec.x === 'center' ? 0 : cascade * 16)) + 'px';
}
function setApp(id) { $('#mApp').textContent = id ? PAGES[id].title.replace('.pdf', '') : 'Shreenand'; }
function focusWin(id) {
  current = id;
  Object.entries(open).forEach(([k, w]) => w.classList.toggle('inactive', k !== id));
  const w = open[id]; if (!w) return;
  w.style.zIndex = ++zTop;
  setApp(id);
  if (location.hash.slice(1) !== id) history.replaceState(null, '', '#' + id);
}
function syncDock() { $$('.dk[data-open]').forEach(d => d.classList.toggle('open', !!open[d.dataset.open])); }

function openWin(id) {
  const spec = PAGES[id]; if (!spec) return;
  const dk = $(`.dk[data-open="${id}"]`);
  if (dk && !open[id]) { dk.classList.remove('bounce'); void dk.offsetWidth; dk.classList.add('bounce'); }
  if (open[id]) { restoreWin(id); focusWin(id); return; }
  const win = document.createElement('div');
  win.className = 'win'; win.dataset.id = id;
  win.innerHTML = `<div class="tbar"><button class="bx r" aria-label="Close"></button><span class="t">${spec.title}</span><button class="bx y" aria-label="Collapse"></button><button class="bx g" aria-label="Zoom"></button></div>
    <div class="body">${spec.html()}</div><div class="grip"></div>`;
  winsEl.appendChild(win);
  place(win, spec);
  const wr = win.getBoundingClientRect(), dr = dockRect(id);
  win.style.setProperty('--ox', (dr.left + dr.width / 2 - wr.left) + 'px'); win.style.setProperty('--oy', (dr.top - wr.top) + 'px');
  if (id !== 'home') cascade = (cascade + 1) % 6;
  open[id] = win; syncDock(); focusWin(id);
  if (id === 'home') { startTabs(win); startNet(win); }
  win.addEventListener('pointerdown', () => { if (current !== id) focusWin(id); });
  $('.r', win).addEventListener('click', e => { e.stopPropagation(); closeWin(id); });
  $('.y', win).addEventListener('click', e => { e.stopPropagation(); minWin(id); });
  $('.g', win).addEventListener('click', e => { e.stopPropagation(); win.classList.toggle('max'); });
  $('.tbar', win).addEventListener('dblclick', e => { if (!e.target.closest('button')) win.classList.toggle('max'); });
  dragify(win); resizify(win);
}
function minWin(id) { const w = open[id]; if (w) w.classList.toggle('shaded'); }      // classic windowshade
function restoreWin(id) { const w = open[id]; if (w) w.classList.remove('shaded'); }
function closeWin(id) {
  const w = open[id]; if (!w) return;
  w.classList.add('closing'); setTimeout(() => w.remove(), 170);
  delete open[id]; syncDock();
  if (id === 'home') { clearInterval(tabTimer); netStop = true; }
  const next = Object.keys(open).filter(k => !open[k].classList.contains('min')).sort((a, b) => open[b].style.zIndex - open[a].style.zIndex)[0];
  if (next) focusWin(next); else { current = null; setApp(null); history.replaceState(null, '', location.pathname); }
}
function dragify(win) {
  const bar = $('.tbar', win);
  bar.addEventListener('pointerdown', e => {
    if (e.target.closest('button') || small() || win.classList.contains('max')) return;
    const r = win.getBoundingClientRect(), dx = e.clientX - r.left, dy = e.clientY - r.top;
    bar.setPointerCapture(e.pointerId);
    const mv = ev => {
      win.style.left = Math.max(-r.width + 100, Math.min(innerWidth - 100, ev.clientX - dx)) + 'px';
      win.style.top = Math.max(28, Math.min(innerHeight - 60, ev.clientY - dy)) + 'px';
    };
    const up = () => { bar.removeEventListener('pointermove', mv); bar.removeEventListener('pointerup', up); };
    bar.addEventListener('pointermove', mv); bar.addEventListener('pointerup', up);
  });
}
function resizify(win) {
  const g = $('.grip', win);
  g.addEventListener('pointerdown', e => {
    if (win.classList.contains('max')) return;
    e.preventDefault(); e.stopPropagation(); focusWin(win.dataset.id);
    const r = win.getBoundingClientRect(); g.setPointerCapture(e.pointerId);
    const mv = ev => { win.style.width = Math.max(360, ev.clientX - r.left) + 'px'; win.style.height = Math.max(260, ev.clientY - r.top) + 'px'; };
    const up = () => { g.removeEventListener('pointermove', mv); g.removeEventListener('pointerup', up); };
    g.addEventListener('pointermove', mv); g.addEventListener('pointerup', up);
  });
}

/* ================= home: tabs + scripted "ask" demo ================= */
let tabTimer = null, tabIdx = 0, tabProg = 0, tabPaused = false, typeToken = 0;
const TAB_MS = 9000;
function showPane(win, i) {
  tabIdx = i; tabProg = 0;
  const p = PANES[i], pane = $('#pane', win), token = ++typeToken;
  $$('.tabrow button', win).forEach((b, k) => { b.classList.toggle('on', k === i); b.style.setProperty('--p', '0%'); });
  pane.innerHTML = `<div class="txt"><h3>${p.h}</h3><p>${p.p}</p><a class="btn" href="#${p.cta[1]}" data-open="${p.cta[1]}">${p.cta[0]}</a></div>
    <div class="ask"><div class="hd"><i></i>Ask Shreenand</div><div class="q" id="q"></div><div class="a" id="a" style="min-height:2.6em"></div><div id="srcs" style="display:grid;gap:6px"></div></div>`;
  const q = $('#q', pane), a = $('#a', pane), s = $('#srcs', pane);
  const row = r => `<i></i>${r[0]}<small>${r[1]}</small>`;
  if (reduced()) { q.textContent = p.q; a.textContent = p.a; s.innerHTML = p.src.map(r => `<div class="src in">${row(r)}</div>`).join(''); return; }
  let n = 0; q.classList.add('caret');
  (function type() {
    if (token !== typeToken) return;
    q.textContent = p.q.slice(0, ++n);
    if (n < p.q.length) return setTimeout(type, 26);
    q.classList.remove('caret');
    setTimeout(() => {
      if (token !== typeToken) return;
      a.textContent = p.a;
      p.src.forEach((r, k) => setTimeout(() => {
        if (token !== typeToken) return;
        const d = document.createElement('div'); d.className = 'src'; d.innerHTML = row(r);
        s.appendChild(d); requestAnimationFrame(() => d.classList.add('in'));
      }, 300 + k * 420));
    }, 300);
  })();
}
function startTabs(win) {
  showPane(win, 0);
  $$('.tabrow button', win).forEach(b => b.addEventListener('click', () => { tabPaused = true; showPane(win, +b.dataset.tab); }));
  const t = $('#tabs', win);
  t.addEventListener('pointerenter', () => tabPaused = true); t.addEventListener('pointerleave', () => tabPaused = false);
  clearInterval(tabTimer);
  tabTimer = setInterval(() => {
    if (tabPaused || document.hidden) return;
    tabProg += 100;
    const b = $$('.tabrow button', win)[tabIdx]; if (b) b.style.setProperty('--p', (tabProg / TAB_MS * 100) + '%');
    if (tabProg >= TAB_MS) showPane(win, (tabIdx + 1) % PANES.length);
  }, 100);
}

/* ================= home banner: a live neural-network field that follows the cursor ================= */
let netStop = false;
function startNet(win) {
  const cv = $('#net', win); if (!cv) return;
  netStop = false;
  const ctx = cv.getContext('2d'); let W = 0, H = 0; const mouse = { x: -999, y: -999 };
  const N = 54, nodes = [...Array(N)].map(() => ({ x: Math.random(), y: Math.random(), vx: (Math.random() - .5) * .00022, vy: (Math.random() - .5) * .0003, r: 1.2 + Math.random() * 2 }));
  function fit() { const r = cv.getBoundingClientRect(), d = Math.min(2, devicePixelRatio || 1); W = r.width; H = r.height; cv.width = W * d; cv.height = H * d; ctx.setTransform(d, 0, 0, d, 0, 0); }
  fit(); new ResizeObserver(fit).observe(cv);
  cv.parentElement.addEventListener('pointermove', e => { const r = cv.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
  cv.parentElement.addEventListener('pointerleave', () => { mouse.x = mouse.y = -999; });
  let last = performance.now();
  (function loop(t) {
    if (netStop || !cv.isConnected) return;
    const dt = Math.min(40, t - last); last = t;
    ctx.clearRect(0, 0, W, H);
    for (const n of nodes) {
      n.x += n.vx * dt; n.y += n.vy * dt;
      if (n.x < 0 || n.x > 1) n.vx *= -1; if (n.y < 0 || n.y > 1) n.vy *= -1;
      const px = n.x * W, py = n.y * H, dx = mouse.x - px, dy = mouse.y - py, d = Math.hypot(dx, dy);
      if (d < 140) { n.x += dx / d * .0006 * dt * (1 - d / 140); n.y += dy / d * .0006 * dt * (1 - d / 140); }
    }
    for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
      const a = nodes[i], b = nodes[j], d = Math.hypot((a.x - b.x) * W, (a.y - b.y) * H);
      if (d < 120) { ctx.strokeStyle = `rgba(255,255,255,${(1 - d / 120) * .5})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x * W, a.y * H); ctx.lineTo(b.x * W, b.y * H); ctx.stroke(); }
    }
    for (const n of nodes) {
      const x = n.x * W, y = n.y * H, near = Math.hypot(mouse.x - x, mouse.y - y) < 120;
      const gr = ctx.createRadialGradient(x, y, 0, x, y, n.r * 5); gr.addColorStop(0, near ? 'rgba(255,209,42,.95)' : 'rgba(255,255,255,.7)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(x, y, n.r * 5, 0, 6.283); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(x, y, n.r, 0, 6.283); ctx.fill();
    }
    requestAnimationFrame(loop);
  })(last);
}

/* ================= dock (with magnification) ================= */
const dock = $('#dock');
dock.innerHTML = DOCK.map(d => d === 'sep' ? '<span class="dsep"></span>' : d[4]
  ? `<a class="dk" href="${d[4]}" target="_blank" rel="noopener" aria-label="${d[1]}"><span class="tip">${d[1]}</span><span class="ic ${d[3]}">${ic(d[2])}</span></a>`
  : `<button class="dk" data-open="${d[0]}" aria-label="${d[1]}"><span class="tip">${d[1]}</span><span class="ic ${d[3]}">${ic(d[2])}</span><span class="dot"></span></button>`).join('');
const dks = $$('.dk', dock), BASE = 52;
let dockRaf = 0;
function mag(mx) {
  dks.forEach(el => {
    const r = el.getBoundingClientRect(), c = r.left + r.width / 2;
    const s = mx == null ? 1 : 1 + .5 * Math.exp(-Math.pow((mx - c) / 62, 2));
    const px = small() ? 46 : BASE; el.style.width = el.style.height = (px * s).toFixed(1) + 'px';
  });
}
dock.addEventListener('pointermove', e => { if (small() || reduced()) return; cancelAnimationFrame(dockRaf); const x = e.clientX; dockRaf = requestAnimationFrame(() => mag(x)); });
dock.addEventListener('pointerleave', () => { cancelAnimationFrame(dockRaf); dks.forEach(el => { el.style.transition = 'width .18s,height .18s'; }); mag(null); setTimeout(() => dks.forEach(el => el.style.transition = 'none'), 220); });

/* ================= desktop items ================= */
$('#dt').innerHTML = `<button class="dti" data-open="about">${hdIcon}<span>Macintosh HD</span></button><button class="dti" data-open="resume">${fileIcon}<span>Résumé.pdf</span></button><a class="dti" href="../index.html">${folderIcon}<span>Classic site</span></a>`;
document.addEventListener('click', e => {
  const t = e.target.closest('[data-open]');
  if (!t) return;
  e.preventDefault(); closeMenu(); openWin(t.dataset.open);
});

/* ================= menu bar menus ================= */
const menu = $('#menu'); let menuFor = null;
const uri = svg => `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
const checker = (a, b2) => uri(`<svg xmlns="http://www.w3.org/2000/svg" width="4" height="4" shape-rendering="crispEdges"><rect width="4" height="4" fill="${a}"/><rect width="2" height="2" fill="${b2}"/><rect x="2" y="2" width="2" height="2" fill="${b2}"/></svg>`);
const cloudTile = uri(`<svg xmlns="http://www.w3.org/2000/svg" width="480" height="280" shape-rendering="crispEdges"><g fill="#fff"><rect x="60" y="50" width="96" height="16"/><rect x="40" y="66" width="140" height="16"/><rect x="56" y="82" width="116" height="16"/><rect x="84" y="34" width="48" height="16"/><rect x="300" y="170" width="120" height="16"/><rect x="276" y="186" width="168" height="16"/><rect x="292" y="202" width="136" height="16"/><rect x="324" y="154" width="56" height="16"/></g><g fill="#cfe6fb"><rect x="56" y="98" width="116" height="8"/><rect x="292" y="218" width="136" height="8"/></g></svg>`);
const rainbow = uri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" preserveAspectRatio="none"><g transform="skewY(-18) translate(0,420)"><rect y="0" width="1600" height="80" fill="#3cc45a"/><rect y="80" width="1600" height="80" fill="#ffd12a"/><rect y="160" width="1600" height="80" fill="#ff8a1f"/><rect y="240" width="1600" height="80" fill="#ff3b30"/><rect y="320" width="1600" height="80" fill="#9b6bff"/><rect y="400" width="1600" height="80" fill="#2ec8e6"/></g></svg>`);
const WALLS = [
  { name: 'Bondi Blue', color: '#2aa5c7', image: 'radial-gradient(circle at 80% 24%,rgba(255,255,255,.6) 0 2.5%,rgba(255,255,255,.2) 2.5% 16%,transparent 16.4%),radial-gradient(circle at 18% 88%,rgba(255,255,255,.22) 0 26%,transparent 26.4%),repeating-linear-gradient(0deg,rgba(255,255,255,.07) 0 2px,transparent 2px 4px),linear-gradient(160deg,#6fe0f5,#2aa5c7 48%,#0a6f8f)', size: 'auto', repeat: 'no-repeat' },
  { name: 'System 7 Teal', color: '#008080', image: checker('#008080', '#007070'), size: '4px 4px', repeat: 'repeat' },
  { name: 'Rainbow', color: '#f4ead2', image: rainbow + ',' + checker('#f4ead2', '#ebe0c4'), size: '100% 100%,4px 4px', repeat: 'no-repeat,repeat' },
  { name: 'Clouds', color: '#4a90e2', image: cloudTile + ',linear-gradient(180deg,#2f74d0,#7db6f2 70%,#bfe0fb)', size: '480px 280px,100% 100%', repeat: 'repeat,no-repeat' },
  { name: 'Stone', color: '#b4b4b4', image: checker('#b9b9b9', '#a3a3a3'), size: '4px 4px', repeat: 'repeat' },
  { name: 'Aqua', color: '#1f6fe0', image: 'radial-gradient(ellipse 60% 40% at 50% -8%,rgba(255,255,255,.55),transparent 70%),radial-gradient(circle at 78% 70%,rgba(255,255,255,.2) 0 14%,transparent 14.4%),repeating-linear-gradient(0deg,rgba(255,255,255,.07) 0 2px,transparent 2px 4px),linear-gradient(170deg,#7fc4ff,#1f6fe0 50%,#0a2f8f)', size: 'auto', repeat: 'no-repeat' }
];
let wallIdx = +store.get('sb-wall') || 0;
function applyWall() {
  const w = WALLS[wallIdx % WALLS.length], st = $('#wall').style;
  st.backgroundColor = w.color; st.backgroundImage = w.image; st.backgroundSize = w.size; st.backgroundRepeat = w.repeat;
}
applyWall();
const winList = () => Object.keys(open);
const MENUS = {
  logo: () => [{ l: 'About this site', f: () => openWin('about') }, { l: 'Classic site', f: () => location.href = '../index.html' }, { l: 'GitHub', f: () => window.open(LINKS.github, '_blank') }, { s: 1 },
    { l: 'Next desktop picture', f: () => { wallIdx = (wallIdx + 1) % WALLS.length; store.set('sb-wall', wallIdx); applyWall(); } }, { l: 'Spotlight search', k: '⌘K', f: openSpot }],
  file: () => [{ l: 'Open résumé', f: () => openWin('resume') }, { l: 'Say hi', f: () => openWin('contact') }, { s: 1 }, { l: 'Close window', k: 'esc', f: () => current && closeWin(current) }],
  go: () => Object.entries(PAGES).filter(([k]) => k !== 'trash').map(([k, p]) => ({ l: p.title, f: () => openWin(k) })),
  window: () => [{ l: 'Minimize', f: () => current && minWin(current) }, { l: 'Zoom', f: () => current && open[current].classList.toggle('max') }, { l: 'Close all', f: () => winList().forEach(closeWin) }, { s: 1 },
    ...winList().map(k => ({ l: PAGES[k].title, c: k === current, f: () => { restoreWin(k); focusWin(k); } }))],
  help: () => [{ l: 'Search', k: '⌘K', f: openSpot }, { l: 'Visit the original site', f: () => location.href = '../index.html' }, { l: 'Email me', f: () => location.href = LINKS.mail }],
  ctl: () => WALLS.map((w, i) => ({ l: w.name, c: i === wallIdx % WALLS.length, f: () => { wallIdx = i; store.set('sb-wall', i); applyWall(); } }))
};
function openMenu(key, btn) {
  if (menuFor === btn) return closeMenu();
  closeMenu(); menuFor = btn; btn.classList.add('on');
  menu.innerHTML = MENUS[key]().map((it, i) => it.s ? '<hr>' : `<button data-i="${i}"><span class="ck">${it.c ? '✓' : ''}</span>${it.l}${it.k ? `<small>${it.k}</small>` : ''}</button>`).join('');
  const items = MENUS[key]();
  const r = btn.getBoundingClientRect();
  menu.style.left = Math.min(r.left, innerWidth - 250) + 'px'; menu.style.top = '28px'; menu.classList.add('on');
  menu.onclick = e => { const b = e.target.closest('button[data-i]'); if (!b) return; const it = items[+b.dataset.i]; closeMenu(); it && it.f && it.f(); };
}
function closeMenu() { menu.classList.remove('on'); if (menuFor) menuFor.classList.remove('on'); menuFor = null; }
$('#mLogo').addEventListener('click', e => { e.stopPropagation(); openMenu('logo', e.currentTarget); });
$('#ctlBtn').addEventListener('click', e => { e.stopPropagation(); openMenu('ctl', e.currentTarget); });
$$('#mb [data-menu]').forEach(b => b.addEventListener('click', e => { e.stopPropagation(); openMenu(b.dataset.menu, b); }));
$('#mApp').addEventListener('click', e => { e.stopPropagation(); openMenu('logo', e.currentTarget); });
document.addEventListener('pointerdown', e => { if (!e.target.closest('.menu,#mb')) closeMenu(); });

/* ================= spotlight (⌘K, Ctrl+K or /) ================= */
const spot = $('#spot'), spIn = $('#spotIn'), spRes = $('#spotRes');
const ITEMS = [
  ...Object.entries(PAGES).map(([id, p]) => ({ n: p.title, k: id, a: () => openWin(id), t: 'window' })),
  ...GAMES.map(g => ({ n: g.n, k: g.n + ' game play ' + g.d, a: () => window.open(g.u, '_blank'), t: 'game' })),
  ...JOBS.map(j => ({ n: j.org + ' · ' + j.role, k: j.tags.join(' ') + ' ' + j.text, a: () => openWin('work'), t: 'work' })),
  ...PROJECTS.map(p => ({ n: p.name, k: p.tags.join(' ') + ' ' + p.text, a: () => window.open(p.url, '_blank'), t: 'project' })),
  { n: 'GitHub', k: 'code repos', a: () => window.open(LINKS.github, '_blank'), t: 'link' },
  { n: 'LinkedIn', k: 'social', a: () => window.open(LINKS.linkedin, '_blank'), t: 'link' },
  { n: 'Classic site', k: 'original old version', a: () => location.href = '../index.html', t: 'link' }
];
let sel = 0, shown = [];
function renderSpot() {
  const q = spIn.value.trim().toLowerCase();
  shown = (q ? ITEMS.filter(i => (i.n + ' ' + i.k).toLowerCase().includes(q)) : ITEMS.slice(0, 8)).slice(0, 9);
  sel = Math.min(sel, Math.max(0, shown.length - 1));
  spRes.innerHTML = shown.length ? shown.map((i, k) => `<button class="${k === sel ? 'sel' : ''}" data-k="${k}">${i.n}<small>${i.t}</small></button>`).join('') : '<div style="padding:16px;color:var(--mute)">No results. Try “vision” or “docker”.</div>';
}
function openSpot() { closeMenu(); spot.classList.add('on'); spIn.value = ''; sel = 0; renderSpot(); setTimeout(() => spIn.focus(), 0); }
function closeSpot() { spot.classList.remove('on'); }
function runSpot(k) { const it = shown[k]; if (!it) return; closeSpot(); it.a(); }
spIn.addEventListener('input', () => { sel = 0; renderSpot(); });
spRes.addEventListener('click', e => { const b = e.target.closest('button'); if (b) runSpot(+b.dataset.k); });
spot.addEventListener('pointerdown', e => { if (e.target === spot) closeSpot(); });
$('#searchBtn').addEventListener('click', openSpot);
addEventListener('keydown', e => {
  const typing = /input|textarea/i.test(document.activeElement.tagName);
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); spot.classList.contains('on') ? closeSpot() : openSpot(); return; }
  if (e.key === '/' && !typing) { e.preventDefault(); openSpot(); return; }
  if (!spot.classList.contains('on')) { if (e.key === 'Escape') { closeMenu(); if (current) closeWin(current); } return; }
  if (e.key === 'Escape') closeSpot();
  else if (e.key === 'ArrowDown') { e.preventDefault(); sel = Math.min(sel + 1, shown.length - 1); renderSpot(); }
  else if (e.key === 'ArrowUp') { e.preventDefault(); sel = Math.max(sel - 1, 0); renderSpot(); }
  else if (e.key === 'Enter') { e.preventDefault(); runSpot(sel); }
});

/* ================= clock, toast ================= */
const tick = () => {
  const d = new Date();
  $('#clock').textContent = d.toLocaleDateString([], { weekday: 'short', day: 'numeric', month: 'short' }) + '  ' + d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
};
tick(); setInterval(tick, 20000);
const toast = $('#toast');
if (store.get('sb-toast') !== '1') setTimeout(() => toast.classList.add('on'), 2200);
$('#toastX').addEventListener('click', () => { toast.classList.remove('on'); store.set('sb-toast', '1'); });

/* ================= boot: deep links like #work, otherwise the home window ================= */
function route() {
  const id = location.hash.slice(1);
  if (!id || id === 'home' || !PAGES[id]) openWin('home');
  else if (small()) openWin(id);
  else { openWin('home'); openWin(id); }
}
route();
addEventListener('hashchange', () => { const id = location.hash.slice(1); if (PAGES[id]) openWin(id); });
