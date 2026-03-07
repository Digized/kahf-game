/* ============================================================
   SURAH KAHF VISUAL NOVEL — animations.js
   Animation controller: triggers named CSS animations on elements
   ============================================================ */

'use strict';

const AnimationController = (() => {

  const animLayer = () => document.getElementById('animation-layer');
  const gameContainer = () => document.getElementById('game-container');

  /* ── Registry ──────────────────────────────────────────────── */
  const animations = {

    /* ── Cave Entrance ─────────────────────────────────────── */
    'cave-close': (opts = {}) => {
      const layer = animLayer();
      layer.innerHTML = '';

      // Dark overlay that expands from edges
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position: absolute; inset: 0;
        background: radial-gradient(circle at 50% 60%, transparent 40%, #000 70%);
        animation: caveClose 2.5s cubic-bezier(0.4,0,0.2,1) forwards;
        animation-delay: ${opts.delay || 0}ms;
      `;
      layer.appendChild(overlay);

      // Stars appearing
      setTimeout(() => {
        for (let i = 0; i < 40; i++) {
          const star = document.createElement('div');
          const x = Math.random() * 100;
          const y = Math.random() * 60;
          const size = Math.random() * 2 + 1;
          const delay = Math.random() * 2000 + 500;
          star.style.cssText = `
            position: absolute;
            left: ${x}%; top: ${y}%;
            width: ${size}px; height: ${size}px;
            background: white; border-radius: 50%;
            animation: starAppear 0.8s ease ${delay}ms both, caveStar ${2 + Math.random() * 2}s ease-in-out ${delay + 800}ms infinite;
          `;
          layer.appendChild(star);
        }
      }, 1500);

      return 3500;
    },

    /* ── Boat Damage (CENTERPIECE) ─────────────────────────── */
    'boat-damage': (opts = {}) => {
      const layer = animLayer();
      layer.innerHTML = '';

      // Screen shake
      setTimeout(() => {
        const gc = gameContainer();
        gc.classList.add('screen-shake');
        setTimeout(() => gc.classList.remove('screen-shake'), 700);
      }, 300);

      // Boat SVG container
      const boatContainer = document.createElement('div');
      boatContainer.style.cssText = `
        position: absolute;
        bottom: 15%; left: 50%;
        transform: translateX(-50%);
        width: min(400px, 85vw);
        animation: boatRock 0.8s ease 0.3s both;
      `;

      boatContainer.innerHTML = `
        <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;overflow:visible;">
          <!-- Hull -->
          <path d="M 30 100 Q 200 160 370 100 L 350 140 Q 200 190 50 140 Z"
                fill="#5c3d1e" stroke="#3a2510" stroke-width="2"/>

          <!-- Plank Left — will crack -->
          <rect id="plank-left" x="60" y="90" width="100" height="18" rx="3"
                fill="#7a5230" stroke="#5c3d1e" stroke-width="1.5"
                style="transform-origin: 60px 99px;
                       animation: plankCrackLeft 1.2s cubic-bezier(0.4,0,0.2,1) 0.4s both;"/>

          <!-- Plank Center — splits -->
          <rect id="plank-center" x="150" y="88" width="100" height="20" rx="3"
                fill="#8a6040" stroke="#5c3d1e" stroke-width="1.5"
                style="transform-origin: 200px 98px;
                       animation: plankCrackCenter 1.4s cubic-bezier(0.4,0,0.2,1) 0.5s both;"/>

          <!-- Plank Right — will crack -->
          <rect id="plank-right" x="240" y="90" width="100" height="18" rx="3"
                fill="#7a5230" stroke="#5c3d1e" stroke-width="1.5"
                style="transform-origin: 340px 99px;
                       animation: plankCrackRight 1.2s cubic-bezier(0.4,0,0.2,1) 0.4s both;"/>

          <!-- Crack line -->
          <line x1="200" y1="88" x2="200" y2="108"
                stroke="#2a1a08" stroke-width="3" stroke-dasharray="4,2"
                style="animation: fadeToBlack 0.3s ease 0.5s both; opacity:0;"/>

          <!-- Water rising through gap -->
          <g style="animation: waterRise 1.5s ease 0.8s both; transform-origin: 200px 108px;">
            <ellipse cx="200" cy="108" rx="45" ry="12" fill="rgba(42,100,160,0.7)"/>
            <ellipse cx="200" cy="104" rx="35" ry="8" fill="rgba(60,130,200,0.5)"
                     style="animation: waterWave 0.8s ease-in-out 1.2s infinite;"/>
          </g>

          <!-- Splash droplets -->
          ${[...Array(8)].map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const dx = Math.cos(angle) * (30 + Math.random() * 20);
            const dy = -Math.abs(Math.sin(angle)) * (20 + Math.random() * 30) - 10;
            return `<circle cx="200" cy="108" r="${2 + Math.random() * 3}"
                      fill="rgba(100,180,255,0.8)"
                      style="--dx:${dx}px; --dy:${dy}px;
                             animation: splashDrop 0.8s ease ${0.9 + i * 0.05}s both;"/>`;
          }).join('')}

          <!-- Mast -->
          <line x1="200" y1="20" x2="200" y2="95" stroke="#4a2e10" stroke-width="6" stroke-linecap="round"/>
          <!-- Sail -->
          <path d="M 200 25 L 260 60 L 200 90 Z" fill="rgba(220,200,160,0.85)" stroke="#b0a080" stroke-width="1"/>
        </svg>
      `;

      layer.appendChild(boatContainer);

      // Flash effect
      const flash = document.createElement('div');
      flash.style.cssText = `
        position: absolute; inset: 0;
        animation: flashWhite 0.4s ease 0.35s both;
        pointer-events: none;
      `;
      layer.appendChild(flash);

      return 3000;
    },

    /* ── Garden Destruction ────────────────────────────────── */
    'garden-destroy': (opts = {}) => {
      const layer = animLayer();
      layer.innerHTML = '';

      // Color shift overlay
      const colorShift = document.createElement('div');
      colorShift.style.cssText = `
        position: absolute; inset: 0;
        background: linear-gradient(to bottom, rgba(255,100,0,0.3), rgba(180,60,0,0.2));
        animation: fadeIn 2s ease forwards;
        mix-blend-mode: multiply;
      `;
      layer.appendChild(colorShift);

      // Wilting leaves
      const leafColors = ['#4a7c3f', '#5a8c4f', '#3a6c2f', '#6a9c5f'];
      for (let i = 0; i < 12; i++) {
        const leaf = document.createElement('div');
        const x = 10 + Math.random() * 80;
        const y = 20 + Math.random() * 50;
        const size = 20 + Math.random() * 30;
        const delay = Math.random() * 1500;
        const color = leafColors[Math.floor(Math.random() * leafColors.length)];

        leaf.style.cssText = `
          position: absolute;
          left: ${x}%; top: ${y}%;
          width: ${size}px; height: ${size * 0.6}px;
          background: ${color};
          border-radius: 50% 0 50% 0;
          transform-origin: left center;
          animation: leafWilt 2s ease ${delay}ms both;
        `;
        layer.appendChild(leaf);
      }

      // Fire elements
      setTimeout(() => {
        for (let i = 0; i < 6; i++) {
          const fire = document.createElement('div');
          const x = 15 + Math.random() * 70;
          fire.style.cssText = `
            position: absolute;
            bottom: 20%; left: ${x}%;
            width: ${15 + Math.random() * 20}px;
            height: ${30 + Math.random() * 40}px;
            background: linear-gradient(to top, #ff4400, #ff8800, #ffcc00);
            border-radius: 50% 50% 20% 20%;
            animation: fireLick ${0.4 + Math.random() * 0.3}s ease-in-out infinite;
            animation-delay: ${Math.random() * 300}ms;
            opacity: 0.85;
          `;
          layer.appendChild(fire);
        }

        // Smoke
        for (let i = 0; i < 4; i++) {
          const smoke = document.createElement('div');
          const x = 20 + Math.random() * 60;
          smoke.style.cssText = `
            position: absolute;
            bottom: 35%; left: ${x}%;
            width: ${20 + Math.random() * 20}px;
            height: ${20 + Math.random() * 20}px;
            background: rgba(80,80,80,0.5);
            border-radius: 50%;
            animation: smokeRise 2s ease ${Math.random() * 500}ms infinite;
          `;
          layer.appendChild(smoke);
        }
      }, 1500);

      return 4000;
    },

    /* ── Wall Rising ───────────────────────────────────────── */
    'wall-rise': (opts = {}) => {
      const layer = animLayer();
      layer.innerHTML = '';

      const wallContainer = document.createElement('div');
      wallContainer.style.cssText = `
        position: absolute;
        bottom: 10%; left: 50%;
        transform: translateX(-50%);
        width: min(500px, 90vw);
      `;

      // Build wall SVG with staggered bricks
      const rows = 6;
      const cols = 8;
      const brickW = 60;
      const brickH = 22;
      const gap = 3;
      const totalW = cols * (brickW + gap);
      const totalH = rows * (brickH + gap);

      let bricksHTML = '';
      for (let r = 0; r < rows; r++) {
        const offset = r % 2 === 0 ? 0 : brickW / 2;
        for (let c = 0; c < cols; c++) {
          const x = c * (brickW + gap) + offset - (r % 2 === 0 ? 0 : gap / 2);
          const y = (rows - 1 - r) * (brickH + gap);
          const delay = (r * 0.12 + c * 0.04).toFixed(2);
          const shade = 140 + Math.floor(Math.random() * 30);
          bricksHTML += `
            <rect x="${x}" y="${y}" width="${brickW}" height="${brickH}" rx="2"
                  fill="rgb(${shade},${shade - 20},${shade - 40})"
                  stroke="rgba(0,0,0,0.3)" stroke-width="1"
                  style="animation: brickRise 0.5s cubic-bezier(0.34,1.56,0.64,1) ${delay}s both;"/>
          `;
        }
      }

      wallContainer.innerHTML = `
        <svg viewBox="0 0 ${totalW} ${totalH}" xmlns="http://www.w3.org/2000/svg"
             style="width:100%; animation: wallGlow 2s ease-in-out 2s infinite;">
          ${bricksHTML}
        </svg>
      `;

      layer.appendChild(wallContainer);

      // Iron pour effect
      const ironPour = document.createElement('div');
      ironPour.style.cssText = `
        position: absolute;
        top: 0; left: 50%;
        transform: translateX(-50%);
        width: 40px; height: 60%;
        background: linear-gradient(to bottom, #ff8800, #cc4400, #882200);
        opacity: 0.7;
        animation: ironPour 1.5s ease 1.5s both;
        border-radius: 0 0 50% 50%;
      `;
      layer.appendChild(ironPour);

      return 4000;
    },

    /* ── Screen Shake ──────────────────────────────────────── */
    'screen-shake': (opts = {}) => {
      const gc = gameContainer();
      gc.classList.add('screen-shake');
      setTimeout(() => gc.classList.remove('screen-shake'), 700);
      return 700;
    },

    /* ── Flash White ───────────────────────────────────────── */
    'flash-white': (opts = {}) => {
      const layer = animLayer();
      const flash = document.createElement('div');
      flash.style.cssText = `
        position: absolute; inset: 0;
        animation: flashWhite 0.5s ease both;
        pointer-events: none;
      `;
      layer.appendChild(flash);
      setTimeout(() => flash.remove(), 600);
      return 600;
    },

    /* ── Flash Red ─────────────────────────────────────────── */
    'flash-red': (opts = {}) => {
      const layer = animLayer();
      const flash = document.createElement('div');
      flash.style.cssText = `
        position: absolute; inset: 0;
        animation: flashRed 0.6s ease both;
        pointer-events: none;
      `;
      layer.appendChild(flash);
      setTimeout(() => flash.remove(), 700);
      return 700;
    },

    /* ── Dust Particles ────────────────────────────────────── */
    'dust': (opts = {}) => {
      const layer = animLayer();
      for (let i = 0; i < 15; i++) {
        const dust = document.createElement('div');
        const x = Math.random() * 100;
        const y = 40 + Math.random() * 40;
        const dx = (Math.random() - 0.5) * 80;
        const dy = -(20 + Math.random() * 40);
        const size = 2 + Math.random() * 4;
        const delay = Math.random() * 1000;
        dust.style.cssText = `
          position: absolute;
          left: ${x}%; top: ${y}%;
          width: ${size}px; height: ${size}px;
          background: rgba(201,168,76,0.4);
          border-radius: 50%;
          --dx: ${dx}px; --dy: ${dy}px;
          animation: dustFloat ${1.5 + Math.random()}s ease ${delay}ms both;
        `;
        layer.appendChild(dust);
        setTimeout(() => dust.remove(), 3000 + delay);
      }
      return 2000;
    },

    /* ── Garden Wither ─────────────────────────────────────── */
    'garden-wither': (opts = {}) => {
      const layer = animLayer();
      layer.innerHTML = '';

      // Green-to-orange background tint overlay
      const tint = document.createElement('div');
      tint.style.cssText = `
        position: absolute; inset: 0;
        background: linear-gradient(to bottom, rgba(180,80,0,0.0), rgba(180,80,0,0.55));
        animation: gardenBurn 3s ease forwards;
        pointer-events: none;
      `;
      layer.appendChild(tint);

      // Falling leaf particles
      for (let i = 0; i < 20; i++) {
        const leaf = document.createElement('div');
        const x = 10 + Math.random() * 80;
        const size = 6 + Math.random() * 8;
        const delay = Math.random() * 2000;
        const dur = 1.5 + Math.random() * 1.5;
        leaf.style.cssText = `
          position: absolute;
          left: ${x}%; top: -5%;
          width: ${size}px; height: ${size}px;
          background: ${Math.random() > 0.5 ? '#8a4a00' : '#5a2a00'};
          border-radius: 50% 0 50% 0;
          opacity: 0.8;
          animation: leafFall ${dur}s ease ${delay}ms both;
        `;
        layer.appendChild(leaf);
        setTimeout(() => leaf.remove(), (dur * 1000) + delay + 500);
      }

      // Smoke wisps
      for (let i = 0; i < 6; i++) {
        const smoke = document.createElement('div');
        const x = 15 + Math.random() * 70;
        const delay = 800 + Math.random() * 1500;
        smoke.style.cssText = `
          position: absolute;
          left: ${x}%; bottom: 20%;
          width: 30px; height: 60px;
          background: radial-gradient(ellipse, rgba(80,40,0,0.3), transparent);
          border-radius: 50%;
          animation: smokeRise ${2 + Math.random()}s ease ${delay}ms both;
        `;
        layer.appendChild(smoke);
        setTimeout(() => smoke.remove(), 4000 + delay);
      }

      setTimeout(() => { if (layer) layer.innerHTML = ''; }, 4500);
      return 3500;
    },

    /* ── Clear ─────────────────────────────────────────────── */
    'clear': () => {
      animLayer().innerHTML = '';
      return 0;
    },
  };

  /* ── Trigger ───────────────────────────────────────────────── */
  function trigger(name, target, opts = {}) {
    if (!name) return;

    if (animations[name]) {
      return animations[name](opts);
    }

    // Fallback: add CSS class to target element
    if (target) {
      const el = typeof target === 'string' ? document.querySelector(target) : target;
      if (el) {
        el.classList.add(name);
        const duration = opts.duration || 1000;
        if (opts.once !== false) {
          setTimeout(() => el.classList.remove(name), duration);
        }
        return duration;
      }
    }

    console.warn('[AnimationController] Unknown animation:', name);
    return 0;
  }

  /* ── Clear all ─────────────────────────────────────────────── */
  function clearAll() {
    const layer = animLayer();
    if (layer) layer.innerHTML = '';
  }

  return { trigger, clearAll, animations };

})();
