/* Shreenand · desktop edition. Plain JS, no build step, no dependencies. */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const ic = n => `<svg><use href="#i-${n}"/></svg>`;
const chips = a => a.map(x => `<span class="chip">${x}</span>`).join('');
const store = {
  get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
};

/* ---------------- content ---------------- */
const LINKS = {
  github: 'https://github.com/Shreenandbhattad',
  linkedin: 'https://www.linkedin.com/in/shreenandbhattad/',
  mail: 'mailto:shreenand.bhattad_ug2023@ashoka.edu.in',
  resume: '../resume.pdf'
};
const JOBS = [
  { org: 'ARTPARK · IISc Bengaluru', when: 'May 2026 – now', role: 'GenAI DevOps Intern',
    text: 'CI/CD pipelines with GitHub Actions and Docker, zero-downtime deployments to GPU servers, observability with Grafana and Loki, and benchmarking LLM serving with Ollama and vLLM.',
    tags: ['GitHub Actions', 'Docker', 'AWS', 'Grafana', 'vLLM', 'Linux'] },
  { org: 'Eka.care', when: 'Jun 2026 – now', role: 'AI Research & Engineering Intern',
    text: 'Mining 1M+ EHR records, fine-tuning ClinicalBERT for ICD-10 classification, and sequence models over patient records, with findings headed for publication.',
    tags: ['SQL', 'Pandas', 'ClinicalBERT', 'PyTorch', 'Clustering'] },
  { org: 'New and Modern · NYC', when: 'Dec 2025 – Apr 2026', role: 'Software Engineering Intern',
    text: 'Full-stack backend features, faster queries through indexing and query-plan work, typed REST APIs, Python ETL pipelines, and Redis caching on hot paths.',
    tags: ['Next.js', 'PostgreSQL', 'Python', 'Redis', 'AWS / GCP'] },
  { org: 'PsyFi Labs', when: 'Aug 2025 – Jun 2026', role: 'Product Engineering Intern',
    text: 'Built a behavioral-insights dashboard end to end, productionized an ML user-profiling model with async inference, and automated multi-source ETL.',
    tags: ['ML', 'n8n', 'OpenAI API', 'Apps Script', 'Webflow'] },
  { org: 'Koita Centre for Digital Health · Ashoka', when: 'Jan – Aug 2025', role: 'Data Insights Research Intern',
    text: 'Accelerometer and genomic data from 5,000+ biobank participants, parallel pipelines over 2+ TB of sensor data, and CNN classifiers for cardiorespiratory risk.',
    tags: ['Python', 'R', 'Multiprocessing', 'CNNs', 'Statistics'] }
];
const PROJECTS = [
  { name: 'Visual recognition & novel view synthesis', kind: 'deep learning', url: 'https://github.com/Shreenandbhattad/Computer-Vision-CS-4932',
    text: 'Image classification, zero-shot segmentation, and a small NeRF that learns to see a scene from new angles.', tags: ['PyTorch', 'ConvNeXt', 'SAM', 'CLIP', 'NeRF', 'Python'] },
  { name: 'Bank statement intelligence', kind: 'applied NLP', url: 'https://github.com/Shreenandbhattad/Deepvue',
    text: 'Teaching a pipeline to read messy bank narrations and make sense of where money actually goes.', tags: ['Python', 'scikit-learn', 'TF-IDF', 'Pandas', 'Regex / FSM'] },
  { name: 'Crowdsourced issue tracker', kind: 'full-stack', url: LINKS.github,
    text: 'A map where people can pin problems in their neighbourhood and watch them get fixed.', tags: ['PostgreSQL', 'PostGIS', 'Docker', 'AWS EC2 / S3', 'Nginx', 'Redis', 'Leaflet'] },
  { name: 'Forest fire recovery in the Himalayas', kind: 'satellite data', url: LINKS.github,
    text: 'Watching burned forests come back to life, one satellite image at a time.', tags: ['Google Earth Engine', 'Python', 'rasterio', 'GDAL', 'geopandas', 'Random Forest'] }
];
const GAMES = [
  { n: 'VOID//SHIFT', e: '🎯', u: '../voidshift.html', d: 'A hand-controlled arcade survival game. Steer a core with one finger, shield, pulse and dash with the other, and outsmart enemies that learn how you move.', hot: 1 },
  { n: 'Gesture synth', e: '🎛', u: '../gesturesynth.html', d: 'Play chords with your bare hands, tracked live with computer vision. No MIDI controller required.' },
  { n: 'The brain', e: '🧠', u: '../neural.html', d: 'A real neural network training live in your browser, written from scratch, no libraries.' },
  { n: 'The garden', e: '🌷', u: '../garden.html', d: 'Plant trees and flowers across four seasons, or send someone a bouquet as a link.' },
  { n: 'The flock', e: '🕊', u: '../flock.html', d: 'A small murmuration of birds that follows your cursor. Click to startle them.' },
  { n: 'Puzzles', e: '🧩', u: '../puzzles.html', d: 'A mini crossword bank: 43 puzzles across global, India and easy.' },
  { n: 'Flight deck', e: '🛫', u: '../flightdeck.html', d: 'Share your flight status.' }
];

/* ---------------- window bodies ---------------- */
const PANES = [
  { tab: 'What I build', h: 'Machine learning, end to end', p: 'Models are the easy part. I like the whole path: messy data in, a pipeline that holds up, and something people can actually use. Clinical text, sensor data, satellite imagery, bank statements.',
    cta: ['See the projects', 'projects'], q: 'What does Shreenand actually build?',
    a: 'I traced it across his work and projects. Three patterns keep showing up:',
    src: [['Clinical NLP', 'Eka.care'], ['LLM serving & GPU deploys', 'ARTPARK'], ['Vision, NeRF & segmentation', 'Projects'], ['Biobank sensor pipelines', 'Koita Centre']] },
  { tab: 'Where I\'ve worked', h: 'Five internships, three kinds of team', p: 'A research centre, a health-tech startup, a New York product team and a behavioral-science startup. Each one taught me something different about shipping.',
    cta: ['See the timeline', 'work'], q: 'Where has Shreenand worked?',
    a: 'Five roles since early 2025. Most recent first:',
    src: [['GenAI DevOps Intern', 'ARTPARK · now'], ['AI Research & Engineering', 'Eka.care · now'], ['Software Engineering', 'New and Modern · NYC'], ['Product Engineering', 'PsyFi Labs']] },
  { tab: 'Play with it', h: 'A portfolio you can poke at', p: 'A neural network that trains in your browser, a synth you play with your bare hands, and an arcade game with enemies that learn how you move. Camera features run entirely on your device.',
    cta: ['Open the arcade', 'play'], q: 'Is there anything fun to try?',
    a: 'Yes. A few things are playable right now:',
    src: [['VOID//SHIFT', 'hand-tracked arcade'], ['Gesture synth', 'chords with your hands'], ['The brain', 'neural net, from scratch'], ['The garden', 'four seasons']] }
];

const PAGES = {
  home: {
    title: 'Home', icon: 'home', w: 'min(1080px,calc(100vw - 260px))', h: 'calc(100vh - 72px)', x: 'center', y: 58,
    html: () => `<div class="pad">
      <div class="me"><img src="https://avatars.githubusercontent.com/u/145998920?v=4" alt="Shreenand Bhattad" width="52" height="52"><div><b>Shreenand Bhattad</b><small>CS &amp; Economics · Ashoka University</small></div></div>
      <div class="hero">
        <div>
          <h1 class="big">Hi, I'm Shreenand.<br>I build <span class="hlb">ML systems</span></h1>
          <p class="lead">I spend my time around <span class="hl">machine learning, data, and the systems that hold them together</span>. Right now I'm interning at ARTPARK (IISc Bengaluru) and Eka.care, working on GenAI infrastructure and <span class="und">clinical data</span>.</p>
          <p class="lead" style="color:var(--mute);font-size:1rem">Open a window, drag things around. This is a tiny desktop.</p>
        </div>
        <div class="box setup">
          <h3>Work with me <span class="hl">for free</span>*</h3>
          <ul><li>Computer science student, economics minor</li><li>Interning at ARTPARK and Eka.care</li><li>Happy to talk about interesting problems</li></ul>
          <div class="row"><a class="cta" href="#work" data-open="work">See my work</a><a class="cta ghost" href="${LINKS.resume}" target="_blank" rel="noopener">Résumé</a></div>
          <small style="display:block;margin-top:10px;color:var(--mute);font-size:.72rem">*conversations are always free.</small>
        </div>
      </div>
      <div class="tabs" id="tabs">
        <div class="tabrow">${PANES.map((p, i) => `<button data-tab="${i}">${p.tab}</button>`).join('')}</div>
        <div class="tabpane" id="pane"></div>
      </div>
      <div class="stats">
        <div class="box stat"><b>1M+</b><span>EHR records mined at Eka.care</span></div>
        <div class="box stat"><b>2+ TB</b><span>sensor data processed in parallel</span></div>
        <div class="box stat"><b>5,000+</b><span>biobank participants analysed</span></div>
        <div class="box stat"><b>5</b><span>internships since early 2025</span></div>
      </div>
      <div class="eyebrow" style="margin-top:34px">Teams I've shipped with</div>
      <div class="logos"><span>ARTPARK</span><span>Eka.care</span><span>New and Modern</span><span>PsyFi Labs</span><span>Koita Centre</span></div>
    </div>`
  },
  about: {
    title: 'About', icon: 'user', w: 640, h: 560, x: 170, y: 90,
    html: () => `<div class="pad">
      <div class="me"><img src="https://avatars.githubusercontent.com/u/145998920?v=4" alt="" width="52" height="52"><div><b>hello</b><small>nice of you to drop by.</small></div></div>
      <h1 class="big" style="font-size:2rem">About me</h1>
      <p class="lead">I'm a computer science student at <span class="hl">Ashoka University</span>, with a minor in economics. I spend most of my time around machine learning, data, and the systems that hold them together.</p>
      <p class="lead">These days I'm interning at <b>ARTPARK (IISc Bengaluru)</b> and <b>Eka.care</b>, working on GenAI infrastructure and clinical data. Before that I worked with teams in New York, behavioral science, and digital health research.</p>
      <dl class="kv">
        <dt>studying</dt><dd>Computer science, minor in economics</dd>
        <dt>school</dt><dd>Ashoka University</dd>
        <dt>focus</dt><dd>ML, data pipelines, GenAI infrastructure</dd>
        <dt>currently</dt><dd>ARTPARK × Eka.care</dd>
      </dl>
      <div style="margin-top:26px;display:flex;gap:10px;flex-wrap:wrap"><a class="cta" href="#work" data-open="work">See what I've been making</a><a class="cta ghost" href="#contact" data-open="contact">Say hi</a></div>
    </div>`
  },
  work: {
    title: 'Work', icon: 'brief', w: 760, h: 640, x: 210, y: 70,
    html: () => `<div class="pad"><h1 class="big" style="font-size:2rem">Work</h1><p class="lead">Internships, and what I did there.</p>
      <div class="list">${JOBS.map(j => `<div class="box item"><div class="top"><h3>${j.org}</h3><span class="when">${j.when}</span></div>
        <p><b style="color:var(--ink)">${j.role}.</b> ${j.text}</p><div class="stack">${chips(j.tags)}</div></div>`).join('')}</div>
      <p class="lead" style="font-size:.95rem">The full story is in my <a href="${LINKS.resume}" target="_blank" rel="noopener" class="hl">résumé</a>.</p></div>`
  },
  projects: {
    title: 'Projects', icon: 'code', w: 760, h: 620, x: 250, y: 84,
    html: () => `<div class="pad"><h1 class="big" style="font-size:2rem">Projects</h1><p class="lead">Things I've built, mostly for the joy of it.</p>
      <div class="list">${PROJECTS.map(p => `<a class="box item" href="${p.url}" target="_blank" rel="noopener"><div class="top"><h3>${p.name} →</h3><span class="when">${p.kind}</span></div>
        <p>${p.text}</p><div class="stack">${chips(p.tags)}</div></a>`).join('')}</div>
      <p class="lead" style="font-size:.95rem">There's more on <a class="hl" href="${LINKS.github}" target="_blank" rel="noopener">GitHub</a>, and my internships live in the <a class="hl" href="#work" data-open="work">work</a> window.</p></div>`
  },
  play: {
    title: 'Play', icon: 'play', w: 800, h: 640, x: 290, y: 66,
    html: () => `<div class="pad"><h1 class="big" style="font-size:2rem">Play</h1><p class="lead">Little experiments, just for fun. Go on, poke around. They open in a new tab.</p>
      <div class="grid2">${GAMES.map(g => `<a class="box tile${g.hot ? ' new' : ''}" href="${g.u}" target="_blank" rel="noopener"><span class="go">↗</span><span class="em">${g.e}</span><h3>${g.n}</h3><p>${g.d}</p></a>`).join('')}</div></div>`
  },
  contact: {
    title: 'Say hi', icon: 'mail', w: 520, h: 520, x: 330, y: 100,
    html: () => `<div class="pad"><h1 class="big" style="font-size:2rem">Say hi</h1><p class="lead">Always happy to talk about interesting problems.</p>
      <div class="contactlist">
        <a class="box" href="${LINKS.mail}">${ic('mail')}<span><b>shreenand.bhattad_ug2023@ashoka.edu.in</b><small>email, the best way to reach me</small></span></a>
        <a class="box" href="${LINKS.github}" target="_blank" rel="noopener">${ic('gh')}<span><b>GitHub</b><small>Shreenandbhattad</small></span></a>
        <a class="box" href="${LINKS.linkedin}" target="_blank" rel="noopener">${ic('in')}<span><b>LinkedIn</b><small>shreenandbhattad</small></span></a>
        <a class="box" href="${LINKS.resume}" target="_blank" rel="noopener">${ic('doc')}<span><b>Résumé</b><small>PDF</small></span></a>
      </div></div>`
  },
  resume: {
    title: 'resume.pdf', icon: 'doc', w: 760, h: 700, x: 240, y: 60,
    html: () => `<div class="pad"><h1 class="big" style="font-size:2rem">Résumé</h1>
      <div style="margin-top:14px"><a class="cta" href="${LINKS.resume}" target="_blank" rel="noopener">Open full PDF ↗</a></div>
      <iframe class="pdf" src="${LINKS.resume}#toolbar=0" title="Résumé"></iframe></div>`
  },
  trash: {
    title: 'Trash', icon: 'trash', w: 460, h: 400, x: 380, y: 120,
    html: () => `<div class="pad"><h1 class="big" style="font-size:1.8rem">Trash</h1><p class="lead" style="font-size:1rem">Things that didn't make the cut.</p>
      <div class="list"><div class="box item"><h3>🗑 The first homepage</h3><p>Too many gradients. Gone.</p></div>
      <div class="box item"><h3>🗑 A cookie banner I didn't need</h3><p>Still here, it turns out. See the bottom right.</p></div>
      <a class="box item" href="../index.html"><h3>♻️ The original site →</h3><p>Not deleted. The classic version is still alive, just one folder up.</p></a></div></div>`
  }
};

/* ---------------- window manager ---------------- */
const winsEl = $('#wins');
const open = {};
let zTop = 20, cascade = 0;
const small = () => matchMedia('(max-width:860px)').matches;

function place(win, spec) {
  const vw = innerWidth, vh = innerHeight;
  const w = spec.w, h = spec.h;
  win.style.width = typeof w === 'number' ? Math.min(w, vw - 24) + 'px' : w;
  win.style.height = typeof h === 'number' ? Math.min(h, vh - 76) + 'px' : h;
  const wpx = win.getBoundingClientRect().width;
  let x = spec.x === 'center' ? (vw - wpx) / 2 : spec.x + cascade * 18;
  x = Math.max(8, Math.min(x, vw - wpx - 8));
  win.style.left = x + 'px';
  win.style.top = (spec.y + (spec.x === 'center' ? 0 : cascade * 14)) + 'px';
}

function focusWin(id) {
  Object.entries(open).forEach(([k, w]) => w.classList.toggle('inactive', k !== id));
  const w = open[id]; if (!w) return;
  w.style.zIndex = ++zTop;
  $$('#nav button').forEach(b => b.classList.toggle('on', b.dataset.open === id));
  if (location.hash.slice(1) !== id) history.replaceState(null, '', '#' + id);
}

function openWin(id) {
  const spec = PAGES[id]; if (!spec) return;
  if (open[id]) { focusWin(id); return; }
  const win = document.createElement('div');
  win.className = 'win'; win.dataset.id = id;
  win.innerHTML = `<div class="tbar"><span style="color:var(--mute);display:flex;width:16px;height:16px">${ic(spec.icon)}</span><span class="t">${spec.title}</span>
    <button class="wb mx" aria-label="Maximize">${ic('max')}</button><button class="wb cl" aria-label="Close">${ic('x')}</button></div>
    <div class="body">${spec.html()}</div><div class="grip"></div>`;
  winsEl.appendChild(win);
  place(win, spec);
  if (id !== 'home') cascade = (cascade + 1) % 6;
  open[id] = win;
  focusWin(id);
  if (id === 'home') startTabs(win);
  win.addEventListener('pointerdown', () => focusWin(id));
  $('.cl', win).addEventListener('click', e => { e.stopPropagation(); closeWin(id); });
  $('.mx', win).addEventListener('click', () => win.classList.toggle('max'));
  $('.tbar', win).addEventListener('dblclick', e => { if (!e.target.closest('button')) win.classList.toggle('max'); });
  dragify(win); resizify(win);
}
function closeWin(id) {
  const w = open[id]; if (!w) return;
  w.classList.add('closing');
  setTimeout(() => w.remove(), 150);
  delete open[id];
  if (id === 'home') clearInterval(tabTimer);
  const next = Object.keys(open).pop();
  if (next) focusWin(next); else { history.replaceState(null, '', location.pathname); $$('#nav button').forEach(b => b.classList.remove('on')); }
}
function dragify(win) {
  const bar = $('.tbar', win);
  bar.addEventListener('pointerdown', e => {
    if (e.target.closest('button') || small() || win.classList.contains('max')) return;
    const r = win.getBoundingClientRect(), dx = e.clientX - r.left, dy = e.clientY - r.top;
    bar.setPointerCapture(e.pointerId);
    const mv = ev => {
      win.style.left = Math.max(-r.width + 90, Math.min(innerWidth - 90, ev.clientX - dx)) + 'px';
      win.style.top = Math.max(54, Math.min(innerHeight - 40, ev.clientY - dy)) + 'px';
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
    const mv = ev => {
      win.style.width = Math.max(340, ev.clientX - r.left) + 'px';
      win.style.height = Math.max(240, ev.clientY - r.top) + 'px';
    };
    const up = () => { g.removeEventListener('pointermove', mv); g.removeEventListener('pointerup', up); };
    g.addEventListener('pointermove', mv); g.addEventListener('pointerup', up);
  });
}

/* ---------------- home: auto-rotating tabs with a scripted "ask" demo ---------------- */
let tabTimer = null, tabIdx = 0, tabProg = 0, tabPaused = false, typeToken = 0;
const TAB_MS = 9000;
function showPane(win, i) {
  tabIdx = i; tabProg = 0;
  const p = PANES[i], pane = $('#pane', win), token = ++typeToken;
  $$('.tabrow button', win).forEach((b, k) => { b.classList.toggle('on', k === i); b.style.setProperty('--p', '0%'); });
  pane.innerHTML = `<div class="ask"><div class="hd"><span>Ask Shreenand</span><span>sample answers</span></div><div class="q" id="q"></div><div class="a" id="a" style="min-height:2.6em"></div><div id="srcs"></div></div>
    <div class="txt"><h3>${p.h}</h3><p>${p.p}</p><a class="cta" href="#${p.cta[1]}" data-open="${p.cta[1]}">${p.cta[0]}</a></div>`;
  const q = $('#q', pane), a = $('#a', pane), s = $('#srcs', pane);
  if (matchMedia('(prefers-reduced-motion:reduce)').matches) {
    q.textContent = p.q; a.textContent = p.a;
    s.innerHTML = p.src.map(r => `<div class="src in"><i></i>${r[0]}<small>${r[1]}</small></div>`).join(''); return;
  }
  let n = 0; q.classList.add('caret');
  (function type() {
    if (token !== typeToken) return;
    q.textContent = p.q.slice(0, ++n);
    if (n < p.q.length) return setTimeout(type, 28);
    q.classList.remove('caret');
    setTimeout(() => {
      if (token !== typeToken) return;
      a.textContent = p.a;
      p.src.forEach((r, k) => setTimeout(() => {
        if (token !== typeToken) return;
        const d = document.createElement('div'); d.className = 'src'; d.innerHTML = `<i></i>${r[0]}<small>${r[1]}</small>`;
        s.appendChild(d); requestAnimationFrame(() => d.classList.add('in'));
      }, 350 + k * 450));
    }, 350);
  })();
}
function startTabs(win) {
  showPane(win, 0);
  $$('.tabrow button', win).forEach(b => b.addEventListener('click', () => { tabPaused = true; showPane(win, +b.dataset.tab); }));
  $('#tabs', win).addEventListener('pointerenter', () => tabPaused = true);
  $('#tabs', win).addEventListener('pointerleave', () => tabPaused = false);
  clearInterval(tabTimer);
  tabTimer = setInterval(() => {
    if (tabPaused || document.hidden) return;
    tabProg += 100;
    const b = $$('.tabrow button', win)[tabIdx]; if (b) b.style.setProperty('--p', (tabProg / TAB_MS * 100) + '%');
    if (tabProg >= TAB_MS) showPane(win, (tabIdx + 1) % PANES.length);
  }, 100);
}

/* ---------------- desktop icons, nav, links ---------------- */
const ICONS_L = [['home', 'Home', 'home'], ['about', 'About', 'user'], ['work', 'Work', 'brief'], ['projects', 'Projects', 'code'], ['play', 'Play', 'play', 1], ['resume', 'Résumé', 'doc']];
const ICONS_R = [['_classic', 'Classic site', 'back', 0, '../index.html'], ['_gh', 'GitHub', 'gh', 0, LINKS.github], ['_in', 'LinkedIn', 'in', 0, LINKS.linkedin], ['contact', 'Say hi', 'mail'], ['trash', 'Trash', 'trash']];
const mkIcon = ([id, label, icon, hot, href]) => href
  ? `<a class="ico" href="${href}" ${href.startsWith('http') ? 'target="_blank" rel="noopener"' : ''}><div class="g">${ic(icon)}</div>${label}</a>`
  : `<button class="ico${hot ? ' hot' : ''}" data-open="${id}"><div class="g">${ic(icon)}</div>${label}</button>`;
$('#iconsL').innerHTML = ICONS_L.map(mkIcon).join('');
$('#iconsR').innerHTML = ICONS_R.map(mkIcon).join('');
document.addEventListener('click', e => {
  const t = e.target.closest('[data-open]');
  if (!t) return;
  e.preventDefault(); openWin(t.dataset.open);
});

/* ---------------- spotlight search (⌘K, Ctrl+K or /) ---------------- */
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
  spRes.innerHTML = shown.length ? shown.map((i, k) => `<button class="${k === sel ? 'sel' : ''}" data-k="${k}">${i.n}<small>${i.t}</small></button>`).join('') : '<div style="padding:16px;color:var(--mute);font-size:.9rem">nothing found. try “vision” or “docker”.</div>';
}
function openSpot() { spot.classList.add('on'); spIn.value = ''; sel = 0; renderSpot(); setTimeout(() => spIn.focus(), 0); }
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
  if (!spot.classList.contains('on')) { if (e.key === 'Escape') { const top = Object.keys(open).sort((a, b) => open[b].style.zIndex - open[a].style.zIndex)[0]; if (top) closeWin(top); } return; }
  if (e.key === 'Escape') closeSpot();
  else if (e.key === 'ArrowDown') { e.preventDefault(); sel = Math.min(sel + 1, shown.length - 1); renderSpot(); }
  else if (e.key === 'ArrowUp') { e.preventDefault(); sel = Math.max(sel - 1, 0); renderSpot(); }
  else if (e.key === 'Enter') { e.preventDefault(); runSpot(sel); }
});

/* ---------------- clock, toast, wallpaper grass ---------------- */
const tick = () => { $('#clock').textContent = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }); };
tick(); setInterval(tick, 20000);
const toast = $('#toast');
if (store.get('sb-toast') !== '1') setTimeout(() => toast.classList.add('on'), 1800);
$('#toastX').addEventListener('click', () => { toast.classList.remove('on'); store.set('sb-toast', '1'); });

(function grass() {
  let seed = 7; const r = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const layers = [['#4f7f3a', .5, 190, 1], ['#5d8f45', .7, 150, 1.2], ['#7fae5b', .9, 110, 1.5]];
  $('#grass').innerHTML = layers.map(([c, o, h, wd]) => {
    let d = '';
    for (let i = 0; i < 230; i++) {
      const x = r() * 1200, hh = h * (.3 + r() * .7), lean = (r() - .5) * 46;
      d += `M${x.toFixed(0)} 300q${(lean * .3).toFixed(1)} ${-hh * .6} ${lean.toFixed(1)} ${-hh}q${(-lean * .3 - wd * 3).toFixed(1)} ${hh * .55} ${(wd * 5).toFixed(1)} ${hh}z`;
    }
    return `<path d="${d}" fill="${c}" opacity="${o}"/>`;
  }).join('');
})();

/* ---------------- boot: deep links like #work, otherwise the home window ---------------- */
function route() {
  const id = location.hash.slice(1);
  if (id === 'home' || !PAGES[id]) { openWin('home'); } else { openWin('home'); if (!small()) openWin(id); else { closeWin('home'); openWin(id); } }
}
route();
addEventListener('hashchange', () => { const id = location.hash.slice(1); if (PAGES[id]) openWin(id); });
