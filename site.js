const sky = document.getElementById('sky');
let weather = 'clear';
let isNight = false;

/* ---------- sun ---------- */
const sun = document.createElement('div');
sun.className = 'sun';
sky.appendChild(sun);

/* ---------- clouds (kept sparse: one or two, slow) ---------- */
[
  { top: 10, w: 120, h: 34, dur: 150, delay: -20, op: .65 },
  { top: 24, w: 80,  h: 24, dur: 190, delay: -110, op: .5 }
].forEach(c => {
  const el = document.createElement('div');
  el.className = 'cloud';
  el.style.cssText = `top:${c.top}%;width:${c.w}px;height:${c.h}px;opacity:${c.op};animation-duration:${c.dur}s;animation-delay:${c.delay}s`;
  sky.appendChild(el);
});

/* ---------- hills, trees, little flowers ---------- */
const hills = document.createElement('div');
hills.className = 'hills';
hills.innerHTML = `
<svg viewBox="0 0 1440 190" preserveAspectRatio="none" aria-hidden="true">
  <path d="M0 120 Q 240 70 480 105 T 960 95 T 1440 110 L 1440 190 L 0 190 Z" fill="#dde8d2" opacity=".8"/>
  <path d="M0 150 Q 300 110 620 140 T 1440 135 L 1440 190 L 0 190 Z" fill="#cbdcba" opacity=".9"/>
  <g>
    <path d="M151 122 q 1 -14 -2 -24 q 5 8 4 24 Z" fill="#8a6f52"/>
    <ellipse cx="150" cy="86" rx="21" ry="17" fill="#7fa06e"/>
    <ellipse cx="138" cy="94" rx="13" ry="10" fill="#8fae7e"/>
    <ellipse cx="161" cy="93" rx="12" ry="9" fill="#6d8a5f"/>
    <ellipse cx="150" cy="79" rx="12" ry="8" fill="#9db989"/>
    <path d="M1212 118 q 2 -16 -3 -28 q 7 10 6 28 Z" fill="#8a6f52"/>
    <ellipse cx="1211" cy="74" rx="25" ry="20" fill="#7fa06e"/>
    <ellipse cx="1196" cy="84" rx="14" ry="10" fill="#8fae7e"/>
    <ellipse cx="1226" cy="82" rx="13" ry="10" fill="#6d8a5f"/>
    <ellipse cx="1212" cy="66" rx="13" ry="8" fill="#9db989"/>
    <path d="M1011 128 q 1 -11 -1.5 -19 q 4 6 3.5 19 Z" fill="#96794f"/>
    <ellipse cx="1010" cy="100" rx="16" ry="13" fill="#87a876"/>
    <ellipse cx="1001" cy="106" rx="9" ry="7" fill="#95b183"/>
    <ellipse cx="1018" cy="105" rx="9" ry="7" fill="#6d8a5f"/>
    <path d="M421 130 q 1 -10 -1.5 -17 q 4 6 3.5 17 Z" fill="#96794f"/>
    <ellipse cx="420" cy="105" rx="14" ry="11" fill="#8fae7e"/>
    <ellipse cx="412" cy="110" rx="8" ry="6" fill="#9db989"/>
    <ellipse cx="428" cy="109" rx="8" ry="6" fill="#7d9b6e"/>
    <ellipse cx="640" cy="148" rx="14" ry="7" fill="#a3c48f" opacity=".8"/>
    <ellipse cx="652" cy="150" rx="9" ry="5" fill="#8fae7e" opacity=".8"/>
    <ellipse cx="248" cy="156" rx="12" ry="6" fill="#a3c48f" opacity=".7"/>
    <ellipse cx="1120" cy="152" rx="13" ry="6" fill="#95b183" opacity=".7"/>
    <circle cx="700" cy="152" r="2.6" fill="#e8b4c0" opacity=".85"/>
    <circle cx="730" cy="158" r="2.2" fill="#f0d491" opacity=".85"/>
    <circle cx="260" cy="162" r="2.2" fill="#e8b4c0" opacity=".8"/>
    <circle cx="1330" cy="156" r="2.6" fill="#f0d491" opacity=".8"/>
    <circle cx="890" cy="160" r="2" fill="#ffffff" opacity=".8"/>
    <circle cx="530" cy="158" r="2" fill="#c9b8e0" opacity=".8"/>
  </g>
</svg>`;
sky.appendChild(hills);

/* ---------- birds, flying by now and then ---------- */
function sendBird() {
  if (weather === 'rain' || weather === 'snow') return;
  const b = document.createElement('div');
  b.className = 'bird';
  b.style.top = (8 + Math.random() * 26) + '%';
  const dur = 13 + Math.random() * 9;
  b.style.animationDuration = dur + 's';
  const flap = (.38 + Math.random() * .25).toFixed(2);
  b.innerHTML = `<svg viewBox="0 0 34 20">
    <path class="wl" style="animation-duration:${flap}s" d="M17 10 Q 9 2 1 7"/>
    <path class="wr" style="animation-duration:${flap}s" d="M17 10 Q 25 2 33 7"/>
  </svg>`;
  sky.appendChild(b);
  setTimeout(() => b.remove(), dur * 1000 + 500);
}
setTimeout(sendBird, 6000);
setInterval(() => { if (Math.random() < .4) sendBird(); }, 60000);

/* ---------- paper planes ---------- */
const PLANE = '<svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>';
function addPlane(top, dur, delay) {
  const p = document.createElement('div');
  p.className = 'plane';
  p.innerHTML = PLANE;
  p.style.top = top + '%';
  p.style.animationDuration = dur + 's';
  p.style.animationDelay = delay + 's';
  sky.appendChild(p);
  return p;
}
/* click anywhere to send one */
document.addEventListener('click', e => {
  if (e.target.closest('a, nav, button, input, textarea, canvas')) return;
  const p = addPlane(Math.min(80, e.clientY / innerHeight * 100), 16, 0);
  p.style.animationIterationCount = 1;
  setTimeout(() => p.remove(), 16500);
});

/* ---------- butterflies, wandering about ---------- */
const butterflies = [];
const BFLY_COLORS = [['#e8a0b4', '#d4849c'], ['#f0c987', '#dcae62'], ['#a9bfd4', '#8ba7c4']];
function makeButterfly() {
  const [c1, c2] = BFLY_COLORS[Math.floor(Math.random() * BFLY_COLORS.length)];
  const b = document.createElement('div');
  b.className = 'butterfly';
  b.innerHTML = `<svg viewBox="0 0 18 16">
    <ellipse class="bw" cx="5.5" cy="6" rx="5" ry="5.5" fill="${c1}" opacity=".9"/>
    <ellipse class="bw bw2" cx="12.5" cy="6" rx="5" ry="5.5" fill="${c2}" opacity=".9"/>
    <rect x="8.4" y="3" width="1.2" height="10" rx=".6" fill="#5a5348"/>
  </svg>`;
  sky.appendChild(b);
  const me = { x: Math.random() * innerWidth, y: innerHeight * (.55 + Math.random() * .3) };
  butterflies.push(me);
  b.style.transform = `translate(${me.x}px,${me.y}px)`;
  (function wander() {
    me.x = Math.max(20, Math.min(innerWidth - 30, me.x + (Math.random() - .5) * 320));
    me.y = Math.max(innerHeight * .35, Math.min(innerHeight - 60, me.y + (Math.random() - .5) * 200));
    b.style.transform = `translate(${me.x}px,${me.y}px)`;
    setTimeout(wander, 5600 + Math.random() * 2400);
  })();
}
makeButterfly();

/* ---------- falling petals (rare, occasional, not a constant flurry) ---------- */
const PETAL_COLORS = ['#f2cdd6', '#e8b4c0', '#f7e3c8', '#dce8d0'];
function dropPetal() {
  if (weather === 'rain' || weather === 'snow') return;
  const p = document.createElement('div');
  p.className = 'petal';
  const s = 6 + Math.random() * 5;
  p.style.cssText = `left:${Math.random() * 100}vw;width:${s}px;height:${s * .8}px;
    background:${PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)]};
    animation-duration:${9 + Math.random() * 7}s`;
  sky.appendChild(p);
  setTimeout(() => p.remove(), 17000);
}
setInterval(() => { if (Math.random() < .5) dropPetal(); }, 20000);

/* ---------- day / night cycle: a full day every 5 minutes ---------- */
const nightsky = document.createElement('div');
nightsky.className = 'nightsky';
sky.prepend(nightsky);
const nightlayer = document.createElement('div');
nightlayer.className = 'nightlayer';
const moon = document.createElement('div');
moon.className = 'moon';
nightlayer.appendChild(moon);
for (let i = 0; i < 40; i++) {
  const st = document.createElement('div');
  st.className = 'star';
  const s = Math.random() < .8 ? 1.5 : 2.5;
  st.style.cssText = `left:${Math.random() * 100}vw;top:${Math.random() * 55}vh;width:${s}px;height:${s}px;animation-duration:${2 + Math.random() * 3}s;animation-delay:${Math.random() * 3}s`;
  nightlayer.appendChild(st);
}
sky.appendChild(nightlayer);

// always land in daylight, then cycle: 2.5 min day, 2.5 min night
setInterval(() => {
  isNight = !isNight;
  document.body.classList.toggle('night', isNight);
}, 150000);
/* ---------- climate: clear, rain, snow, dry, and everyone reacts ---------- */
const precip = document.createElement('div'); precip.className = 'precip'; sky.appendChild(precip);
const drift = document.createElement('div'); drift.className = 'snowdrift'; document.body.appendChild(drift);
const heat = document.createElement('div'); heat.className = 'heatlayer'; sky.appendChild(heat);
const chip = document.createElement('div'); chip.id = 'weatherchip'; document.body.appendChild(chip);

const CHIPS = { clear: '🌤️', rain: '🌧️', snow: '❄️', dry: '☀️' };

function fillPrecip(kind) {
  precip.innerHTML = '';
  if (kind === 'rain') {
    for (let i = 0; i < 70; i++) {
      const d = document.createElement('div');
      d.className = 'drop';
      d.style.cssText = `left:${Math.random() * 100}vw;animation-duration:${.7 + Math.random() * .6}s;animation-delay:${Math.random() * 2}s`;
      precip.appendChild(d);
    }
  } else if (kind === 'snow') {
    for (let i = 0; i < 55; i++) {
      const f = document.createElement('div');
      f.className = 'flake';
      const s = 2.5 + Math.random() * 3.5;
      f.style.cssText = `left:${Math.random() * 100}vw;width:${s}px;height:${s}px;opacity:${.5 + Math.random() * .5};
        animation-duration:${6 + Math.random() * 7}s;animation-delay:${Math.random() * 8}s`;
      precip.appendChild(f);
    }
  }
}

function setWeather(w) {
  weather = w;
  document.body.classList.remove('rain', 'snow', 'dry');
  if (w !== 'clear') document.body.classList.add(w);
  if (w === 'rain' || w === 'snow') { fillPrecip(w); precip.classList.add('on'); }
  else precip.classList.remove('on');
  chip.textContent = CHIPS[w];
}
setWeather('clear');

// the sky has moods of its own: mostly clear, with the occasional surprise
setInterval(() => {
  const r = Math.random();
  setWeather(r < .42 ? 'clear' : r < .62 ? 'rain' : r < .78 ? 'snow' : r < .92 ? 'dry' : 'clear');
}, 135000);

// press W to nudge the weather along (handy for showing off)
const WORDER = ['clear', 'rain', 'snow', 'dry'];
document.addEventListener('keydown', e => {
  if (e.key.toLowerCase() === 'w' && !e.metaKey && !e.ctrlKey &&
      !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) {
    setWeather(WORDER[(WORDER.indexOf(weather) + 1) % WORDER.length]);
  }
});

/* ---------- gentle parallax + cursor tracking ---------- */
let mouseX = -9999, mouseY = -9999;
const hillsEl = document.querySelector('.hills');
document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  const nx = e.clientX / innerWidth - .5;
  if (hillsEl) hillsEl.style.transform = `translateX(${nx * -10}px)`;
  sun.style.translate = `${nx * -14}px 0`;
});

/* ---------- the dog ---------- */
const dog = document.createElement('div');
dog.className = 'dog';
dog.innerHTML = `<svg viewBox="0 0 56 44">
  <path class="tail" d="M9 22 Q 2 18 4 11" stroke="#b3855a" stroke-width="4" fill="none" stroke-linecap="round"/>
  <g class="legB">
    <rect x="13" y="24" width="4" height="13" rx="2" fill="#b3855a"/>
    <rect x="20" y="24" width="4" height="13" rx="2" fill="#c89b6e"/>
  </g>
  <g class="legF">
    <rect x="30" y="24" width="4" height="13" rx="2" fill="#b3855a"/>
    <rect x="37" y="24" width="4" height="13" rx="2" fill="#c89b6e"/>
  </g>
  <g class="torso">
    <ellipse cx="26" cy="22" rx="17" ry="10" fill="#c89b6e"/>
    <ellipse cx="20" cy="24" rx="8" ry="6" fill="#e6cfae"/>
    <g class="head">
      <circle cx="42" cy="12" r="9" fill="#c89b6e"/>
      <ellipse cx="49" cy="15" rx="5" ry="3.6" fill="#e6cfae"/>
      <circle cx="52.5" cy="13.5" r="2" fill="#3a362f"/>
      <circle class="eye" cx="43" cy="10" r="1.6" fill="#3a362f"/>
      <circle class="eye" cx="43.6" cy="9.4" r=".5" fill="#fff"/>
      <path class="lid" d="M41.2 10 q 1.8 1.4 3.6 0" stroke="#3a362f" stroke-width="1" fill="none" stroke-linecap="round"/>
      <path class="ear" d="M34 6 Q 31 16 37 15 Q 39 9 38 5 Z" fill="#a87c4f"/>
      <path class="tongue" d="M49 18 q 1.5 5 3.5 4 q 1.5 -1 -.5 -5 Z" fill="#e8889a"/>
    </g>
  </g>
</svg>`;
document.body.appendChild(dog);

/* physics-based movement: the dog accelerates, coasts, and eases to a stop
   like a real animal, and its gait speeds up with its stride */
let BED = Math.max(80, innerWidth * .1);   // his spot, under the left tree
addEventListener('resize', () => { BED = Math.max(80, innerWidth * .1); });
const D = {
  x: BED, vx: 0, dir: 1,
  target: BED, wantSpeed: 0, maxSpeed: 1.2,
  jumpY: 0, jumpV: 0,
  state: 'sleep', stateUntil: 1e9, nextThink: 800
};
const ACCEL = .045, FRICTION = .93;
dog.classList.add('sleep');

function setDogState(s, ms) {
  dog.classList.remove('sit', 'sniff', 'spin', 'crouch', 'sleep');
  D.state = s;
  D.stateUntil = performance.now() + ms;
  if (s === 'sit') dog.classList.add('sit');
  if (s === 'sniff') dog.classList.add('sniff');
  if (s === 'spin') dog.classList.add('spin');
  if (s === 'crouch') dog.classList.add('crouch');
}

function dogJump(power) {
  if (D.jumpY === 0) {
    D.jumpV = power;
    dog.classList.remove('crouch');
  }
}

function nearestButterfly() {
  let best = null, bd = 1e9;
  for (const bf of butterflies) {
    const d = Math.abs(bf.x - D.x);
    if (bf.y > innerHeight - 280 && d < 320 && d < bd) { best = bf; bd = d; }
  }
  return best;
}

/* he starts off asleep; a click beside him wakes him for a while */
let awakeUntil = 0;
let playJumps = 0, boredUntil = 0;   // butterflies are fun, five pounces' worth

document.addEventListener('click', e => {
  if (D.state !== 'sleep') return;
  if (Math.abs(e.clientX - D.x) < 170 && e.clientY > innerHeight - 300) {
    setDogState('idle', 0);            // stirs awake...
    dogJump(4.2);                      // ...with a little stretch-hop
    dog.classList.add('happy');
    awakeUntil = performance.now() + 50000;
    playJumps = 0; boredUntil = 0;     // fresh enthusiasm
    D.nextThink = performance.now() + 900;
  }
});

function dogThink(now) {
  if (D.state === 'sleep') return;     // only a click beside him wakes him

  // heading to bed: walk to his spot, then settle down
  if (D.state === 'bedtime') {
    if (Math.abs(D.x - BED) < 16 && Math.abs(D.vx) < .3 && D.jumpY === 0) {
      D.wantSpeed = 0;
      setDogState('sleep', 1e9);
      dog.classList.add('sleep');
    } else {
      D.target = BED; D.wantSpeed = 1;
    }
    return;
  }
  // been awake a while? amble home for a nap
  if (now > awakeUntil) {
    dog.classList.remove('happy');
    setDogState('bedtime', 1e9);
    D.target = BED; D.maxSpeed = 1; D.wantSpeed = 1;
    return;
  }

  // busy doing something? let it finish
  if (now < D.stateUntil && ['spin', 'sit', 'sniff', 'crouch'].includes(D.state)) {
    // ...unless something exciting shows up
    if (D.state !== 'crouch' && ((now > boredUntil && nearestButterfly()) || (mouseY > innerHeight - 240 && Math.abs(mouseX - D.x) < 320))) {
      D.stateUntil = 0;
    } else return;
  }

  const prey = now > boredUntil ? nearestButterfly() : null;
  if (prey) {
    dog.classList.add('happy');
    const gap = prey.x - D.x;
    if (Math.abs(gap) < 55 && D.jumpY === 0) {
      // anticipation: crouch, then pounce
      if (D.state !== 'crouch') { setDogState('crouch', 260); D.wantSpeed = 0; }
      else if (now >= D.stateUntil) {
        setDogState('chase', 0); dogJump(6.8);
        if (++playJumps >= 5) {        // that's enough excitement
          boredUntil = now + 40000;
          playJumps = 0;
        }
      }
    } else {
      setDogState('chase', 0);
      D.target = prey.x - Math.sign(gap) * 24;
      D.maxSpeed = 2.8; D.wantSpeed = 2.8;
    }
    D.nextThink = now + 350;
    return;
  }

  // cursor down near the grass? trot over, but stop politely nearby
  if (mouseY > innerHeight - 240 && Math.abs(mouseX - D.x) < 320) {
    dog.classList.add('happy');
    const gap = mouseX - D.x;
    if (Math.abs(gap) > 64) {
      setDogState('follow', 0);
      D.target = mouseX - Math.sign(gap) * 52;
      D.maxSpeed = 2.3; D.wantSpeed = 2.3;
    } else {
      D.wantSpeed = 0;
      if (D.jumpY === 0 && Math.random() < .06) dogJump(4.6);
      if (Math.random() < .012) setDogState('spin', 900);
    }
    D.nextThink = now + 250;
    return;
  }

  dog.classList.remove('happy');

  if (now > D.nextThink) {
    const wet = weather === 'rain', cold = weather === 'snow', hot = weather === 'dry';
    const dice = Math.random();
    if (dice < (hot ? .02 : cold ? .05 : .1)) {   // zoomies!! (not in this heat)
      dog.classList.add('happy');
      setDogState('zoom', 2600);
      D.target = 40 + Math.random() * (innerWidth - 110);
      D.maxSpeed = 5.5; D.wantSpeed = 5.5;
    } else if (dice < .18 && !wet && !hot) {      // chase own tail
      D.wantSpeed = 0;
      setDogState('spin', 1100 + Math.random() * 700);
    } else if (dice < .3 && !wet && !cold) {      // something smells interesting
      D.wantSpeed = 0;
      setDogState('sniff', 1600 + Math.random() * 1800);
    } else if (dice < (hot ? .68 : wet ? .3 : .48)) {  // sit and watch the world
      D.wantSpeed = 0;
      setDogState('sit', 2500 + Math.random() * 4000);
    } else if (dice < (cold ? .78 : .56) && D.jumpY === 0) {  // a hop (bounding, if snowy)
      dogJump(cold ? 6.2 : 4.2);
    } else {                                      // amble somewhere new
      setDogState('walk', 0);
      D.target = 40 + Math.random() * (innerWidth - 110);
      D.maxSpeed = .9 + Math.random() * .7;
      D.wantSpeed = D.maxSpeed;
    }
    D.nextThink = now + 2800 + Math.random() * 3600;
  }
}

let lastT = 0, nextShake = 4000;
(function dogLoop(now) {
  const dt = Math.min((now - lastT) / 16.7, 2.5) || 1;
  lastT = now;
  dogThink(now);

  // weather manners: shake off the rain, pant in the heat
  if (weather === 'rain' && now > nextShake) {
    dog.classList.add('shake');
    setTimeout(() => dog.classList.remove('shake'), 700);
    nextShake = now + 5000 + Math.random() * 6000;
  }
  dog.classList.toggle('pant', weather === 'dry');
  const wmul = weather === 'snow' ? .55 : weather === 'dry' ? .72 : 1;

  // jump physics with squash and stretch
  if (D.jumpY > 0 || D.jumpV > 0) {
    D.jumpY += D.jumpV * dt;
    D.jumpV -= .4 * dt;
    if (D.jumpY <= 0) { D.jumpY = 0; D.jumpV = 0; }
  }

  // ease toward the target: accelerate, then brake as it gets close
  const gap = D.target - D.x;
  const braking = Math.min(Math.abs(gap) / 90, 1);
  const desired = (D.wantSpeed || 0) * wmul * braking * Math.sign(gap);
  if (Math.abs(gap) > 4 && D.wantSpeed > 0 && D.state !== 'sit' && D.state !== 'sniff' && D.state !== 'spin') {
    D.vx += (desired - D.vx) * ACCEL * dt;
  } else {
    D.vx *= Math.pow(FRICTION, dt);
  }
  D.x += D.vx * dt;
  D.x = Math.max(30, Math.min(innerWidth - 30, D.x));

  // face where it's going (only commit to a turn at real speed)
  if (Math.abs(D.vx) > .25) D.dir = D.vx > 0 ? 1 : -1;

  // gait follows stride: faster run = quicker steps
  const speed = Math.abs(D.vx);
  if (speed > .18 && D.jumpY === 0) {
    dog.classList.add('trot');
    dog.style.setProperty('--gait', Math.max(.13, .38 - speed * .045) + 's');
  } else {
    dog.classList.remove('trot');
  }
  if (D.state === 'zoom' && Math.abs(gap) < 10 && now < D.stateUntil) {
    // bounce back the other way, because zoomies
    D.target = 40 + Math.random() * (innerWidth - 110);
  }

  // a touch of stretch mid-air
  const svgEl = dog.querySelector('svg');
  if (D.jumpY > 2 && !dog.classList.contains('crouch')) {
    svgEl.style.transform = `scaleY(${1 + Math.min(D.jumpV * .02, .12)})`;
  } else if (!dog.classList.contains('sit') && !dog.classList.contains('crouch')) {
    svgEl.style.transform = '';
  }

  dog.style.transform = `translate(${D.x - 28}px,${-D.jumpY}px) scaleX(${D.dir})`;
  requestAnimationFrame(dogLoop);
})(0);

/* ---------- soft page transitions (extensionless-friendly) ---------- */
document.querySelectorAll('a[href]').forEach(a => {
  const href = a.getAttribute('href');
  if (!href || /^(https?:|mailto:|tel:|#)/.test(href) || a.target === '_blank' || /\.(pdf|png|jpe?g|svg)$/i.test(href)) return;
  a.addEventListener('click', e => {
    if (e.metaKey || e.ctrlKey) return;
    e.preventDefault();
    let url = href;
    // local preview from disk still needs the extension
    if (location.protocol === 'file:' && !/\.html($|#)/.test(url)) {
      url = url.replace(/^([\w-]+)/, '$1.html');
    }
    document.body.classList.add('leaving');
    setTimeout(() => location.href = url, 220);
  });
});
// if someone arrives at the .html address online, quietly tidy it
if (/^https?:$/.test(location.protocol) && /\.html$/.test(location.pathname)) {
  history.replaceState(null, '', location.pathname.replace(/\.html$/, '') + location.search + location.hash);
}

/* ---------- soft reveal ---------- */
const io = new IntersectionObserver(es => {
  es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: .15 });
document.querySelectorAll('.fade').forEach(el => io.observe(el));
