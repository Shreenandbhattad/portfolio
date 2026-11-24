/* Easter eggs. Loaded after app.js and built on its globals (PAGES, openWin, MENUS, WALLS, …).
   Nothing here is needed to browse the site, it is all for the curious.
     ` (backtick) ........ Terminal         idle for a minute ... flying toasters
     ↑↑↓↓←→←→ B A ........ party mode       click the desktop ... sparkles
     boot splash, "About This Macintosh", Empty Trash, and a Sad Mac if you try `rm -rf /`        */

/* ---------- little helpers ---------- */
const esc = t => String(t).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
const PIX = { '#': '#000', b: '#dcdcdc', w: '#f4fbff', r: '#ff3b30', y: '#ffd12a', g: '#3cc45a', t: '#8a5a2b', s: '#b8b8c0', o: '#ff8a1f' };
function pixArt(rows, px = 6, extra = '') {
  let r = '';
  rows.forEach((row, y) => [...row].forEach((c, x) => { if (PIX[c]) r += `<rect x="${x}" y="${y}" width="1.02" height="1.02" fill="${PIX[c]}"/>`; }));
  return `<svg viewBox="0 0 ${rows[0].length} ${rows.length}" width="${rows[0].length * px}" height="${rows.length * px}" shape-rendering="crispEdges" style="display:block;${extra}">${r}</svg>`;
}
const MAC = face => [
  '..############..', '.#bbbbbbbbbbbb#.', '.#b##########b#.'.slice(0, 16), '.#b#wwwwwwww#b#.', '.#b#ww#ww#ww#b#.', '.#b#ww#ww#ww#b#.', '.#b#wwwwwwww#b#.',
  face === 'sad' ? '.#b#ww####ww#b#.' : '.#b#w#wwww#w#b#.', face === 'sad' ? '.#b#w#wwww#w#b#.' : '.#b#ww####ww#b#.',
  '.#b#wwwwwwww#b#.', '.#b##########b#.', '.#bbbbbbbbbbbb#.', '.#bbbb#####bbb#.', '.#bbbbbbbbbbbb#.', '.##############.'];
const happyMac = (px = 6) => pixArt(MAC('happy'), px);
const sadMac = (px = 6) => pixArt(MAC('sad'), px);
const BOMB = ['.......##.......', '.....#..#.o.....', '......###.y.....', '.....#####......', '....#######.....', '...#########....', '...#########....', '...#########....', '....#######.....', '.....#####......'];

/* ---------- audio: the startup chime and the simple beep ---------- */
let ax = null;
const audio = () => { try { ax = ax || new (window.AudioContext || window.webkitAudioContext)(); if (ax.state === 'suspended') ax.resume(); } catch (e) {} return ax; };
function note(f, t0, d, type = 'triangle', v = .12) {
  const a = audio(); if (!a) return;
  const o = a.createOscillator(), g = a.createGain(), t = a.currentTime + t0;
  o.type = type; o.frequency.value = f; g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v, t + .02); g.gain.exponentialRampToValueAtTime(.0008, t + d);
  o.connect(g); g.connect(a.destination); o.start(t); o.stop(t + d + .05);
}
const beep = () => note(740, 0, .16, 'square', .06);
const chime = () => [261.6, 329.6, 392, 523.3, 659.3].forEach((f, i) => note(f, i * .02, 1.6 - i * .1, 'triangle', .07));

/* ---------- notifications (reuses the cookie alert) ---------- */
function notify(icon, title, text) {
  $('#toast .ti').textContent = icon; $('#toast b').textContent = title;
  const b = $('#toast b'); b.nextSibling.textContent = text;
  $('#toast').classList.add('on');
}

/* ---------- fx: confetti, sparkles, party mode ---------- */
function confetti(ms = 3500) {
  const c = document.createElement('canvas'); c.className = 'confetti'; document.body.appendChild(c);
  const x = c.getContext('2d'); const d = Math.min(2, devicePixelRatio || 1);
  c.width = innerWidth * d; c.height = innerHeight * d; x.scale(d, d);
  const cols = ['#ff3b30', '#ffd12a', '#3cc45a', '#2ec8e6', '#9b6bff', '#ff8a1f', '#ff5fa2'];
  const ps = [...Array(140)].map(() => ({ x: Math.random() * innerWidth, y: -20 - Math.random() * innerHeight * .6, vx: (Math.random() - .5) * 2, vy: 2 + Math.random() * 4, s: 5 + Math.random() * 6, c: cols[Math.random() * cols.length | 0] }));
  const end = performance.now() + ms;
  (function f(t) {
    x.clearRect(0, 0, innerWidth, innerHeight);
    ps.forEach(p => { p.x += p.vx; p.y += p.vy; p.vy += .04; x.fillStyle = p.c; x.fillRect(Math.round(p.x / 3) * 3, Math.round(p.y / 3) * 3, p.s, p.s); x.strokeStyle = '#000'; x.strokeRect(Math.round(p.x / 3) * 3, Math.round(p.y / 3) * 3, p.s, p.s); });
    if (t < end) requestAnimationFrame(f); else c.remove();
  })(performance.now());
}
let partyT = 0;
function party() {
  document.body.classList.add('party'); confetti(4500);
  [0, 4, 7, 12, 16].forEach((n, i) => note(392 * Math.pow(2, n / 12), i * .09, .5, 'square', .04));
  notify('🎉', 'Party mode', 'You found the Konami code. Enjoy the colours.');
  clearTimeout(partyT); partyT = setTimeout(() => document.body.classList.remove('party'), 7000);
}
function sparkle(x, y) {
  const cols = ['#ffd12a', '#ff5fa2', '#2ec8e6', '#fff', '#3cc45a'];
  for (let i = 0; i < 9; i++) {
    const e = document.createElement('i'); e.className = 'spk';
    e.style.left = x + 'px'; e.style.top = y + 'px'; e.style.background = cols[i % cols.length];
    document.body.appendChild(e);
    const a = (i / 9) * 6.283 + Math.random() * .5, d = 24 + Math.random() * 34;
    e.animate([{ transform: 'translate(0,0)', opacity: 1 }, { transform: `translate(${Math.cos(a) * d}px,${Math.sin(a) * d}px)`, opacity: 0 }], { duration: 520, easing: 'steps(6)' }).onfinish = () => e.remove();
  }
}
$('#wall').addEventListener('pointerdown', e => sparkle(e.clientX, e.clientY));

/* ---------- Konami code ---------- */
const KONAMI = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a'];
let kpos = 0;
addEventListener('keydown', e => {
  if (/input|textarea/i.test(document.activeElement.tagName)) return;
  kpos = e.key.toLowerCase() === KONAMI[kpos] ? kpos + 1 : (e.key.toLowerCase() === KONAMI[0] ? 1 : 0);
  if (kpos === KONAMI.length) { kpos = 0; party(); }
  if (e.key === '`' && !e.metaKey && !e.ctrlKey) { e.preventDefault(); openWin('terminal'); }
});

/* ---------- Sad Mac ---------- */
function crash() {
  if ($('#sad')) return;
  beep(); setTimeout(beep, 220);
  const d = document.createElement('div'); d.id = 'sad';
  d.innerHTML = `<div class="dlg">${sadMac(7)}<div><b>Sorry, a system error has occurred.</b><p>“Shreenand” has unexpectedly quit. 0x0000DEAD</p><p style="color:#666;font-size:.78rem">To be fair, you did ask for it.</p><div class="bomb">${pixArt(BOMB, 4)}</div><button class="btn" id="restart">Restart</button></div></div>`;
  document.body.appendChild(d);
  $('#restart').addEventListener('click', () => { try { sessionStorage.removeItem('sb-boot'); } catch (e) {} location.reload(); });
}

/* ---------- flying toasters (screensaver) ---------- */
const toasterSvg = frame => `<svg viewBox="0 0 40 30" width="76" height="57" shape-rendering="crispEdges"><g stroke="#000" stroke-width="1.4" stroke-linejoin="round">
  <path d="${frame ? 'M6 10 0 3l9 3 8 4z' : 'M6 14 0 22l9-3 8-5z'}" fill="#fff"/><path d="${frame ? 'M12 8 6 0l10 4 6 6z' : 'M12 16 8 26l9-4 5-7z'}" fill="#eee"/>
  <rect x="9" y="9" width="26" height="16" rx="3" fill="#c6c9d2"/><rect x="9" y="9" width="26" height="5" rx="2" fill="#e6e8ee"/><rect x="12" y="11" width="8" height="2" fill="#333"/><rect x="24" y="11" width="8" height="2" fill="#333"/>
  <rect x="9" y="22" width="26" height="3" fill="#8a8d97"/><rect x="12" y="25" width="4" height="3" fill="#555"/><rect x="28" y="25" width="4" height="3" fill="#555"/></g></svg>`;
const toastSvg = `<svg viewBox="0 0 24 24" width="48" height="48" shape-rendering="crispEdges"><rect x="2" y="2" width="20" height="20" rx="3" fill="#8a5a2b" stroke="#000" stroke-width="1.4"/><rect x="5" y="5" width="14" height="14" rx="2" fill="#e8b866"/></svg>`;
let saver = null, idleT = 0;
function startSaver() {
  if (saver) return;
  closeMenu(); const el = document.createElement('div'); el.id = 'saver'; document.body.appendChild(el);
  const items = [...Array(9)].map((_, i) => {
    const kind = i < 6 ? 'toaster' : 'toast', d = document.createElement('div'); d.className = 'fly'; d.innerHTML = kind === 'toaster' ? toasterSvg(0) : toastSvg; el.appendChild(d);
    return { d, kind, x: Math.random() * (innerWidth + 300), y: Math.random() * innerHeight - 100, v: 1.2 + Math.random() * 1.4, f: 0 };
  });
  let tick = 0, raf;
  (function loop() {
    tick++;
    items.forEach(it => {
      it.x -= it.v * 1.6; it.y += it.v; it.d.style.transform = `translate(${it.x}px,${it.y}px)`;
      if (it.kind === 'toaster' && tick % 9 === 0) it.d.innerHTML = toasterSvg(it.f ^= 1);
      if (it.y > innerHeight + 60 || it.x < -100) { it.x = innerWidth * Math.random() + innerWidth * .4; it.y = -70; }
    });
    raf = requestAnimationFrame(loop);
  })();
  saver = { stop() { cancelAnimationFrame(raf); el.remove(); saver = null; } };
  const off = () => { if (saver) saver.stop(); removeEventListener('pointerdown', off, true); removeEventListener('keydown', off, true); };
  setTimeout(() => { addEventListener('pointerdown', off, true); addEventListener('keydown', off, true); addEventListener('pointermove', mv); }, 400);
  let moved = 0; function mv(e) { if (Math.abs(e.movementX) + Math.abs(e.movementY) > 0 && ++moved > 6) { off(); removeEventListener('pointermove', mv); } }
}
const bumpIdle = () => { clearTimeout(idleT); if (!saver) idleT = setTimeout(startSaver, 60000); };
['pointermove', 'pointerdown', 'keydown', 'wheel'].forEach(ev => addEventListener(ev, bumpIdle, { passive: true }));
bumpIdle();

/* ---------- the Terminal ---------- */
const FORTUNES = [
  "Your model isn't overfitting. It's just really committed.", 'There are two hard problems: naming things, cache invalidation, and off-by-one errors.',
  "git commit -m 'final'  (it was not final)", 'A watched loss curve never converges.', 'It works on my machine. Ship the machine.',
  'Premature optimization is the root of all evil. Mature optimization is the root of all weekends.', 'All models are wrong. Some are on fire.', 'The data is clean. (The data is not clean.)'];
const NEOFETCH = [
  '   .------------.   shreenand@ashoka', '   | .--------. |   -----------------', '   | | ^    ^ | |   OS: Shreenand OS 9.2', '   | |  \\__/  | |   Host: Ashoka University',
  "   | '--------' |   Kernel: machine learning", '   |  [=====]   |   Uptime: since 2023', "   '------------'   Shell: curiosity", '                    Now: ARTPARK x Eka.care'];
const OPENABLE = ['home', 'about', 'work', 'projects', 'play', 'contact', 'resume', 'trash', 'sys', 'terminal'];
const CMDS = {
  help: () => ['commands:', '  about  work  projects  play  contact  resume   open a window', '  open <name>        same thing, with more words', '  ls                 look around', '  whoami  neofetch   who is this?',
    '  fortune  date  echo <text>  clear', '  wall <name|1-6>    change wallpaper', '  game <void|synth|brain|garden|flock|puzzles>', '  toaster  party     fun', '  and a few you will have to find…'],
  ls: () => ['about/  work/  projects/  play/  contact/  resume.pdf  secret.txt'],
  whoami: () => ['shreenand. cs + economics @ ashoka. ml, data, and the systems that hold them together.'],
  neofetch: () => NEOFETCH, fortune: () => [FORTUNES[Math.random() * FORTUNES.length | 0]], date: () => [new Date().toString()],
  echo: a => [a.join(' ')], pwd: () => ['/Users/shreenand/portfolio/update'], cat: a => a[0] === 'secret.txt' ? ['the real treasure was the friends we made along the way.', '(also: try ↑↑↓↓←→←→BA)'] : a[0] ? ['cat: ' + a[0] + ': is not that kind of file'] : ['cat: what?'],
  sudo: () => ['nice try. you are not in the sudoers file. this incident will be reported (to nobody).'], hello: () => ['hi there 👋'], hi: () => ['hi there 👋'], vim: () => ['you can check in any time you like, but you can never leave.'], exit: () => ['there is no escape. (click the close box.)'],
  toaster: () => { setTimeout(startSaver, 300); return ['🍞 engaging flying toasters… (move the mouse to stop)']; }, party: () => { party(); return ['🎉']; },
  crash: () => { setTimeout(crash, 400); return ['initiating the bomb…']; },
  rm: a => { if (a.join(' ').includes('-rf')) { setTimeout(crash, 1500); return ['removing /System… ', 'removing /Users… ', 'removing /Applications… ', 'oh no.']; } return ['rm: refusing. these files are load-bearing.']; },
  wall: a => { const q = (a.join(' ') || '').toLowerCase(); let i = WALLS.findIndex((w, k) => String(k + 1) === q || w.name.toLowerCase().includes(q)); if (!q || i < 0) return ['wallpapers: ' + WALLS.map((w, k) => (k + 1) + '=' + w.name).join(', ')]; wallIdx = i; store.set('sb-wall', i); applyWall(); return ['desktop picture set to ' + WALLS[i].name]; },
  game: a => { const m = { void: 'voidshift', synth: 'gesturesynth', brain: 'neural', garden: 'garden', flock: 'flock', puzzles: 'puzzles' }[(a[0] || '').toLowerCase()]; if (!m) return ['usage: game <void|synth|brain|garden|flock|puzzles>']; window.open('../' + m + '.html', '_blank'); return ['launching ' + a[0] + '…']; },
  open: a => { const n = (a[0] || '').toLowerCase().replace(/\/$/, ''); if (OPENABLE.includes(n)) { openWin(n); return ['opening ' + n + '…']; } return ['open: no such window: ' + (a[0] || '')]; }
};
['about', 'work', 'projects', 'play', 'contact', 'resume'].forEach(n => { CMDS[n] = () => { openWin(n); return ['opening ' + n + '…']; }; });
CMDS.cd = CMDS.open; CMDS.clear = () => null;

PAGES.terminal = {
  title: 'Terminal', icon: 'code', w: 660, h: 430, x: 120, y: 90,
  html: () => `<div class="term"><div class="out"></div><div class="line"><span class="ps">shreenand@mac ~ %</span><input spellcheck="false" autocomplete="off" autocapitalize="off" aria-label="terminal input"></div></div>`,
  init(win) {
    const out = $('.out', win), inp = $('input', win), term = $('.term', win), hist = []; let hi = 0;
    const print = (t, cls = '') => { const d = document.createElement('div'); d.className = cls; d.innerHTML = esc(t) || '&nbsp;'; out.appendChild(d); };
    print('Shreenand OS 9.2 — Terminal'); print("type 'help' to see what I can do."); print('');
    term.addEventListener('pointerdown', e => { if (!e.target.closest('input')) setTimeout(() => inp.focus(), 0); });
    setTimeout(() => inp.focus(), 60);
    inp.addEventListener('keydown', e => {
      e.stopPropagation();
      if (e.key === 'Enter') {
        const line = inp.value.trim(); inp.value = ''; print('shreenand@mac ~ % ' + line, 'cmd'); if (!line) return;
        hist.push(line); hi = hist.length;
        const [c, ...a] = line.split(/\s+/), f = CMDS[c.toLowerCase()];
        if (!f) { beep(); print(c + ': command not found. try “help”.'); }
        else { const r = f(a); if (r === null) out.innerHTML = ''; else r.forEach(l => print(l)); }
        term.scrollTop = term.scrollHeight; $('.body', win).scrollTop = 1e6;
      } else if (e.key === 'ArrowUp') { e.preventDefault(); if (hi > 0) inp.value = hist[--hi]; }
      else if (e.key === 'ArrowDown') { e.preventDefault(); inp.value = hi < hist.length - 1 ? hist[++hi] : (hi = hist.length, ''); }
      else if (e.key === 'Escape') inp.blur();
      else if (e.key === 'l' && e.ctrlKey) { e.preventDefault(); out.innerHTML = ''; }
    });
  }
};

/* ---------- About This Macintosh ---------- */
PAGES.sys = {
  title: 'About This Macintosh', icon: 'user', w: 500, h: 520, x: 300, y: 70,
  html: () => `<div class="pad sys"><div class="top">${happyMac(7)}<div><h1 class="big" style="font-size:1.7rem">Shreenand OS</h1><div style="margin-top:3px">Version 9.2 · Platinum</div><div style="color:var(--mute);font-size:.82rem;margin-top:4px">© Shreenand Bhattad. Built by hand, with some help.</div></div></div>
    <dl class="kv"><dt>Built-in Memory</dt><dd>64 MB of curiosity</dd><dt>Virtual Memory</dt><dd>Off (coffee on)</dd><dt>Largest Unused Block</dt><dd>1.2 GB of free time ☕</dd></dl>
    <div class="mem">${[['ARTPARK.app', 62, '#2ec8e6'], ['Eka.care.app', 54, '#ff5fa2'], ['Classes.app', 38, '#ffd12a'], ['Side projects', 70, '#3cc45a'], ['Sleep', 12, '#9b6bff']].map(([n, v, c]) => `<div class="mrow"><span>${n}</span><div class="mbar"><i style="width:${v}%;background:${c}"></i></div></div>`).join('')}</div>
    <p class="hintline">psst: press <kbd>&#96;</kbd> (backtick) for a terminal. try the Konami code. leave the mouse alone for a minute.</p></div>`
};

/* ---------- Empty Trash ---------- */
const trashHtml = PAGES.trash.html;
PAGES.trash.html = () => {
  const h = trashHtml(), i = h.lastIndexOf('</div></div>');
  return h.slice(0, i) + '</div><div style="margin-top:18px"><button class="btn" id="emptyTrash">Empty Trash…</button><p class="lead" id="trashMsg" style="font-size:.85rem;min-height:1.4em"></p></div></div>' + h.slice(i + 12);
};
PAGES.trash.init = win => {
  const b = $('#emptyTrash', win); let n = 0; if (!b) return;
  b.addEventListener('click', () => {
    n++; beep();
    const m = $('#trashMsg', win), items = $$('.job', win);
    items.forEach(i => i.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-6px)' }, { transform: 'translateX(6px)' }, { transform: 'translateX(0)' }], { duration: 280, iterations: 2 }));
    m.textContent = n === 1 ? 'The items are locked. They are load-bearing memories.' : n === 2 ? "Seriously, they can't be deleted. Maybe try the terminal…" : 'Okay okay. ' + (n > 3 ? 'You are persistent.' : '');
    if (n === 4) confetti(2500);
  });
};

/* ---------- patch the window manager + menus + search to know about all this ---------- */
const _openWin = openWin;
openWin = function (id) {
  _openWin(id);
  const w = open[id], sp = PAGES[id];
  if (w && sp && sp.init && !w.dataset.init) { w.dataset.init = 1; sp.init(w); }
};
const _logo = MENUS.logo;
MENUS.logo = () => [{ l: 'About This Macintosh…', f: () => openWin('sys') }, ..._logo()];
const _go = MENUS.go;
MENUS.go = () => [..._go(), { s: 1 }, { l: 'Terminal', k: '`', f: () => openWin('terminal') }, { l: 'About This Macintosh', f: () => openWin('sys') }];
const _help = MENUS.help;
MENUS.help = () => [..._help(), { s: 1 }, { l: 'Screen saver', f: startSaver }, { l: 'Party mode', f: party }];
ITEMS.push(
  { n: 'Terminal', k: 'shell command line console', a: () => openWin('terminal'), t: 'app' },
  { n: 'About This Macintosh', k: 'system memory specs', a: () => openWin('sys'), t: 'app' },
  { n: 'Flying toasters', k: 'screensaver toaster after dark', a: startSaver, t: 'fun' },
  { n: 'Party mode', k: 'konami confetti disco', a: party, t: 'fun' },
  { n: 'Sad Mac', k: 'crash error bomb', a: crash, t: 'fun' });
if (['terminal', 'sys'].includes(location.hash.slice(1))) openWin(location.hash.slice(1));

/* ---------- boot splash (once per tab) ---------- */
(function boot() {
  let seen = false; try { seen = sessionStorage.getItem('sb-boot') === '1'; sessionStorage.setItem('sb-boot', '1'); } catch (e) {}
  if (seen || new URLSearchParams(location.search).has('noboot')) return;
  const s = document.createElement('div'); s.id = 'splash';
  s.innerHTML = `<div class="in">${happyMac(9)}<div class="wt">Welcome to Shreenand OS</div><div class="ext" id="ext"></div><div class="pbar"><i id="pfill"></i></div><div class="sm">click or press any key to skip</div></div>`;
  document.body.appendChild(s);
  const cols = ['#ff3b30', '#ff8a1f', '#ffd12a', '#3cc45a', '#2ec8e6', '#9b6bff'];
  [...Array(6)].forEach((_, i) => setTimeout(() => { const e = document.createElement('b'); e.style.background = cols[i]; $('#ext').appendChild(e); }, 350 + i * 260));
  requestAnimationFrame(() => { $('#pfill').style.width = '100%'; });
  let done = false;
  const finish = (gesture) => { if (done) return; done = true; if (gesture) chime(); s.classList.add('out'); setTimeout(() => s.remove(), 360); removeEventListener('pointerdown', skip, true); removeEventListener('keydown', skip, true); };
  const skip = () => finish(true);
  addEventListener('pointerdown', skip, true); addEventListener('keydown', skip, true);
  setTimeout(() => finish(false), 2400);
})();

console.log('%c Shreenand OS 9.2 ', 'background:#000;color:#fff;font:700 14px monospace;padding:6px', '\nhi 👋 curious? press ` for a terminal, or try ↑↑↓↓←→←→BA');
