/* ============================================================
   SURAH KAHF VISUAL NOVEL — engine.js
   Core visual novel engine: scenes, dialogue, choices, state
   ============================================================ */

'use strict';

const VNEngine = (() => {

  /* ── State ─────────────────────────────────────────────────── */
  let state = {
    storyId:      null,
    sceneIndex:   0,
    stepIndex:    0,
    choices:      {},       // choiceId → chosen option index
    flags:        {},       // arbitrary boolean flags
    started:      false,
    paused:       false,
    typing:       false,    // typewriter in progress
    waitingInput: false,    // waiting for tap/click to advance
    verseOpen:    false,
    choicesOpen:  false,
  };

  let storyData   = null;   // loaded story object
  let scenes      = [];     // flat array of scenes
  let currentScene = null;
  let typewriterTimer = null;
  let onCompleteCallback = null;

  /* ── DOM refs ──────────────────────────────────────────────── */
  const dom = {};

  function cacheDom() {
    dom.container        = document.getElementById('game-container');
    dom.sceneBg          = document.getElementById('scene-bg');
    dom.transitionOverlay= document.getElementById('transition-overlay');
    dom.charactersLayer  = document.getElementById('characters-layer');
    dom.animationLayer   = document.getElementById('animation-layer');
    dom.dialogueLayer    = document.getElementById('dialogue-layer');
    dom.dialogueBox      = document.getElementById('dialogue-box');
    dom.speakerName      = document.getElementById('speaker-name');
    dom.dialogueText     = document.getElementById('dialogue-text');
    dom.advanceIndicator = document.getElementById('advance-indicator');
    dom.verseDisplay     = document.getElementById('verse-display');
    dom.choicesLayer     = document.getElementById('choices-layer');
    dom.choicesContainer = document.querySelector('.choices-container');
    dom.progressBar      = document.getElementById('progress-bar');
    dom.hudTitle         = document.getElementById('hud-story-title');
    dom.pauseMenu        = document.getElementById('pause-menu');
    dom.toast            = document.getElementById('toast');
  }

  /* ── Public API ────────────────────────────────────────────── */
  function init(containerId) {
    cacheDom();
    bindEvents();
    console.log('[VNEngine] Initialized');
  }

  function loadStory(data) {
    storyData = data;
    scenes    = data.scenes || [];
    state.storyId    = data.id;
    state.sceneIndex = 0;
    state.stepIndex  = 0;
    state.started    = false;

    if (dom.hudTitle) dom.hudTitle.textContent = data.title || '';

    // Restore progress
    const saved = loadProgress(data.id);
    if (saved) {
      state.sceneIndex = saved.sceneIndex || 0;
      state.stepIndex  = saved.stepIndex  || 0;
      state.choices    = saved.choices    || {};
      state.flags      = saved.flags      || {};
    }
  }

  function start() {
    state.started = true;
    goToScene(state.sceneIndex, state.stepIndex);
  }

  function onComplete(cb) {
    onCompleteCallback = cb;
  }

  /* ── Scene Navigation ──────────────────────────────────────── */
  function goToScene(sceneIdx, stepIdx = 0) {
    if (sceneIdx >= scenes.length) {
      handleStoryEnd();
      return;
    }

    state.sceneIndex = sceneIdx;
    state.stepIndex  = stepIdx;
    currentScene     = scenes[sceneIdx];

    updateProgress();
    applySceneBackground(currentScene);
    applySceneCharacters(currentScene);
    triggerSceneAnimation(currentScene);

    // Audio
    if (window.AudioManager) {
      if (currentScene.ambient) AudioManager.playAmbient(currentScene.ambient);
    }

    processStep();
  }

  function nextStep() {
    if (state.typing) {
      skipTypewriter();
      return;
    }
    if (state.verseOpen || state.choicesOpen || state.paused) return;

    state.stepIndex++;
    const steps = currentScene.steps || [];

    if (state.stepIndex >= steps.length) {
      // Move to next scene
      const nextSceneIdx = currentScene.next !== undefined
        ? currentScene.next
        : state.sceneIndex + 1;
      transitionToScene(nextSceneIdx);
    } else {
      processStep();
    }
  }

  function transitionToScene(nextIdx, type = 'fade') {
    const overlay = dom.transitionOverlay;
    overlay.style.transition = 'opacity 0.4s ease';
    overlay.style.opacity = '1';

    setTimeout(() => {
      goToScene(nextIdx, 0);
      overlay.style.opacity = '0';
    }, 420);
  }

  /* ── Step Processing ───────────────────────────────────────── */
  function processStep() {
    const steps = currentScene.steps || [];
    if (state.stepIndex >= steps.length) {
      nextStep();
      return;
    }

    const step = steps[state.stepIndex];
    saveProgress();

    switch (step.type) {
      case 'dialogue':
        showDialogue(step);
        break;
      case 'verse':
        showVerse(step);
        break;
      case 'choice':
        showChoices(step);
        break;
      case 'animation':
        triggerAnimation(step);
        autoAdvance(step.duration || 1000);
        break;
      case 'wait':
        hideDialogue();
        autoAdvance(step.duration || 1500);
        break;
      case 'narration':
        showNarration(step);
        break;
      case 'character':
        updateCharacter(step);
        autoAdvance(step.duration || 600);
        break;
      case 'sound':
        if (window.AudioManager) AudioManager.playSfx(step.src);
        autoAdvance(100);
        break;
      case 'flag':
        state.flags[step.key] = step.value !== undefined ? step.value : true;
        autoAdvance(50);
        break;
      case 'goto':
        goToScene(step.scene, step.step || 0);
        break;
      default:
        console.warn('[VNEngine] Unknown step type:', step.type);
        autoAdvance(100);
    }
  }

  function autoAdvance(ms) {
    state.waitingInput = false;
    hideAdvanceIndicator();
    setTimeout(() => {
      if (!state.paused && !state.verseOpen && !state.choicesOpen) {
        nextStep();
      }
    }, ms);
  }

  /* ── Dialogue ──────────────────────────────────────────────── */
  function showDialogue(step) {
    dom.dialogueLayer.style.display = 'block';
    dom.speakerName.textContent = step.speaker || '';
    dom.dialogueText.classList.remove('arabic-mode');

    // Highlight active character
    highlightCharacter(step.speaker);

    typewriterEffect(step.text, () => {
      state.waitingInput = true;
      showAdvanceIndicator();
    });
  }

  function showNarration(step) {
    dom.dialogueLayer.style.display = 'block';
    dom.speakerName.textContent = '';
    dom.dialogueText.classList.remove('arabic-mode');

    typewriterEffect(step.text, () => {
      state.waitingInput = true;
      showAdvanceIndicator();
    });
  }

  function hideDialogue() {
    dom.dialogueLayer.style.display = 'none';
    hideAdvanceIndicator();
  }

  /* ── Typewriter ────────────────────────────────────────────── */
  function typewriterEffect(text, onDone) {
    clearTimeout(typewriterTimer);
    state.typing = true;
    dom.dialogueText.textContent = '';
    dom.dialogueText.classList.add('typewriter-cursor');
    hideAdvanceIndicator();

    const speed = 28; // ms per character
    let i = 0;

    function tick() {
      if (i < text.length) {
        dom.dialogueText.textContent = text.slice(0, i + 1);
        i++;
        typewriterTimer = setTimeout(tick, speed);
      } else {
        state.typing = false;
        dom.dialogueText.classList.remove('typewriter-cursor');
        if (onDone) onDone();
      }
    }

    tick();
  }

  function skipTypewriter() {
    clearTimeout(typewriterTimer);
    state.typing = false;
    dom.dialogueText.classList.remove('typewriter-cursor');
    // Show full text
    const steps = currentScene.steps || [];
    const step  = steps[state.stepIndex];
    if (step && (step.text)) {
      dom.dialogueText.textContent = step.text;
    }
    state.waitingInput = true;
    showAdvanceIndicator();
  }

  /* ── Verse Display ─────────────────────────────────────────── */
  function showVerse(step) {
    state.verseOpen = true;
    hideDialogue();

    const vd = dom.verseDisplay;
    vd.innerHTML = buildVerseHTML(step);
    vd.classList.add('active');

    // Auto-play audio
    if (step.audio && window.AudioManager) {
      setTimeout(() => AudioManager.playVerse(step.audio), 600);
    }

    // Bind continue button
    const btn = vd.querySelector('.verse-continue-btn');
    if (btn) {
      btn.addEventListener('click', closeVerse, { once: true });
    }

    // Bind audio button
    const audioBtn = vd.querySelector('.verse-audio-btn');
    if (audioBtn && step.audio) {
      audioBtn.addEventListener('click', () => {
        if (window.AudioManager) AudioManager.playVerse(step.audio);
        audioBtn.classList.add('playing');
      });
    }
  }

  function buildVerseHTML(step) {
    const audioBtn = step.audio
      ? `<button class="verse-audio-btn">🔊 Play Recitation</button>`
      : '';

    return `
      <div class="verse-card">
        <div class="verse-ref">${step.ref || 'Surah Al-Kahf'}</div>
        <div class="verse-arabic">${step.arabic || ''}</div>
        <div class="verse-divider"></div>
        ${step.transliteration ? `<div class="verse-transliteration">${step.transliteration}</div>` : ''}
        <div class="verse-translation">${step.translation || ''}</div>
        ${audioBtn}
        <button class="verse-continue-btn">Continue ›</button>
      </div>
    `;
  }

  function closeVerse() {
    state.verseOpen = false;
    dom.verseDisplay.classList.remove('active');
    if (window.AudioManager) AudioManager.stopVerse();
    setTimeout(() => nextStep(), 300);
  }

  /* ── Choices ───────────────────────────────────────────────── */
  function showChoices(step) {
    state.choicesOpen = true;
    hideDialogue();

    const layer = dom.choicesLayer;
    const container = dom.choicesContainer;
    container.innerHTML = '';

    if (step.prompt) {
      const p = document.createElement('div');
      p.className = 'choices-prompt';
      p.textContent = step.prompt;
      container.appendChild(p);
    }

    step.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.textContent = opt.text;
      btn.addEventListener('click', () => selectChoice(step, idx, opt), { once: true });
      container.appendChild(btn);
    });

    layer.classList.add('active');
  }

  function selectChoice(step, idx, opt) {
    state.choicesOpen = false;
    state.choices[step.id] = idx;
    dom.choicesLayer.classList.remove('active');

    if (opt.goto !== undefined) {
      transitionToScene(opt.goto);
    } else if (opt.gotoStep !== undefined) {
      state.stepIndex = opt.gotoStep - 1; // will be incremented by nextStep
      nextStep();
    } else {
      nextStep();
    }
  }

  /* ── Background ────────────────────────────────────────────── */
  function applySceneBackground(scene) {
    const bg = dom.sceneBg;

    if (scene.bg) {
      if (scene.bg.startsWith('#') || scene.bg.startsWith('rgb') || scene.bg.startsWith('linear') || scene.bg.startsWith('radial')) {
        bg.style.backgroundImage = 'none';
        bg.style.background = scene.bg;
        bg.classList.remove('has-image');
      } else {
        bg.style.background = '#0a0a0f';
        bg.style.backgroundImage = `url(${scene.bg})`;
        bg.style.backgroundSize = 'cover';
        bg.style.backgroundPosition = 'center';
        bg.classList.add('has-image');
      }
    } else {
      bg.style.background = scene.bgColor || '#0a0a0f';
      bg.style.backgroundImage = 'none';
      bg.classList.remove('has-image');
    }

    // Apply filter
    if (scene.bgFilter) {
      bg.style.filter = scene.bgFilter;
    } else {
      bg.style.filter = 'none';
    }
  }

  /* ── Characters ────────────────────────────────────────────── */
  const activeCharacters = {}; // id → element

  function applySceneCharacters(scene) {
    if (!scene.characters) return;

    // Remove characters not in this scene
    Object.keys(activeCharacters).forEach(id => {
      if (!scene.characters.find(c => c.id === id)) {
        removeCharacter(id);
      }
    });

    // Add/update characters
    scene.characters.forEach(charDef => {
      if (activeCharacters[charDef.id]) {
        updateCharacterPosition(charDef);
      } else {
        addCharacter(charDef);
      }
    });
  }

  function addCharacter(charDef) {
    const el = document.createElement('div');
    el.className = `character-sprite pos-${charDef.position || 'center'}`;
    el.id = `char-${charDef.id}`;
    el.dataset.charId = charDef.id;

    // Load SVG
    const img = document.createElement('img');
    img.src = charDef.sprite || `assets/characters/${charDef.id}.svg`;
    img.alt = charDef.name || charDef.id;
    img.style.width = '100%';
    img.style.height = 'auto';
    el.appendChild(img);

    // Enter animation
    const enterAnim = charDef.enter || (charDef.position === 'left' ? 'anim-enter-left' : charDef.position === 'right' ? 'anim-enter-right' : 'anim-enter-center');
    el.classList.add(enterAnim);

    dom.charactersLayer.appendChild(el);
    activeCharacters[charDef.id] = el;

    // After enter, switch to idle
    setTimeout(() => {
      el.classList.remove(enterAnim);
      const idleAnim = charDef.position === 'center' ? 'anim-idle-center' : 'anim-idle';
      el.classList.add(idleAnim);
    }, 600);
  }

  function removeCharacter(id) {
    const el = activeCharacters[id];
    if (!el) return;

    el.classList.add('anim-exit-right');
    setTimeout(() => {
      el.remove();
      delete activeCharacters[id];
    }, 400);
  }

  function updateCharacterPosition(charDef) {
    const el = activeCharacters[charDef.id];
    if (!el) return;
    el.className = `character-sprite pos-${charDef.position || 'center'}`;
    if (charDef.animation) el.classList.add(charDef.animation);
  }

  function updateCharacter(step) {
    const el = activeCharacters[step.id];
    if (!el) return;
    if (step.animation) {
      el.classList.add(step.animation);
      if (step.animationOnce) {
        setTimeout(() => el.classList.remove(step.animation), step.duration || 1000);
      }
    }
    if (step.remove) removeCharacter(step.id);
  }

  function highlightCharacter(speakerName) {
    Object.values(activeCharacters).forEach(el => {
      const charId = el.dataset.charId;
      const charDef = storyData && storyData.characterMap && storyData.characterMap[charId];
      const name = charDef ? charDef.name : charId;

      if (speakerName && name === speakerName) {
        el.classList.remove('inactive');
        el.classList.add('active');
      } else if (speakerName) {
        el.classList.remove('active');
        el.classList.add('inactive');
      } else {
        el.classList.remove('active', 'inactive');
      }
    });
  }

  /* ── Scene Animations ──────────────────────────────────────── */
  function triggerSceneAnimation(scene) {
    if (!scene.animation) return;
    triggerAnimation({ name: scene.animation, target: scene.animTarget });
  }

  function triggerAnimation(step) {
    if (window.AnimationController) {
      AnimationController.trigger(step.name, step.target, step.options);
    }
  }

  /* ── Progress ──────────────────────────────────────────────── */
  function updateProgress() {
    const total = scenes.length;
    const pct   = total > 1 ? (state.sceneIndex / (total - 1)) * 100 : 0;
    if (dom.progressBar) dom.progressBar.style.width = pct + '%';
  }

  function saveProgress() {
    if (!state.storyId) return;
    const data = {
      sceneIndex: state.sceneIndex,
      stepIndex:  state.stepIndex,
      choices:    state.choices,
      flags:      state.flags,
      timestamp:  Date.now(),
    };
    try {
      localStorage.setItem(`kahf_progress_${state.storyId}`, JSON.stringify(data));
    } catch(e) {}
  }

  function loadProgress(storyId) {
    try {
      const raw = localStorage.getItem(`kahf_progress_${storyId}`);
      return raw ? JSON.parse(raw) : null;
    } catch(e) { return null; }
  }

  function clearProgress(storyId) {
    try {
      localStorage.removeItem(`kahf_progress_${storyId || state.storyId}`);
    } catch(e) {}
  }

  /* ── Advance Indicator ─────────────────────────────────────── */
  function showAdvanceIndicator() {
    if (dom.advanceIndicator) dom.advanceIndicator.classList.add('visible');
  }

  function hideAdvanceIndicator() {
    if (dom.advanceIndicator) dom.advanceIndicator.classList.remove('visible');
  }

  /* ── Pause ─────────────────────────────────────────────────── */
  function togglePause() {
    state.paused = !state.paused;
    if (dom.pauseMenu) dom.pauseMenu.classList.toggle('active', state.paused);
    if (window.AudioManager) {
      state.paused ? AudioManager.pause() : AudioManager.resume();
    }
  }

  function resume() {
    state.paused = false;
    if (dom.pauseMenu) dom.pauseMenu.classList.remove('active');
    if (window.AudioManager) AudioManager.resume();
  }

  /* ── Story End ─────────────────────────────────────────────── */
  function handleStoryEnd() {
    clearProgress();
    if (onCompleteCallback) onCompleteCallback(state);
    else {
      // Default: return to index
      setTimeout(() => { window.location.href = 'index.html'; }, 1000);
    }
  }

  /* ── Toast ─────────────────────────────────────────────────── */
  function showToast(msg, duration = 2500) {
    if (!dom.toast) return;
    dom.toast.textContent = msg;
    dom.toast.classList.add('show');
    setTimeout(() => dom.toast.classList.remove('show'), duration);
  }

  /* ── Event Binding ─────────────────────────────────────────── */
  function bindEvents() {
    // Tap/click to advance
    document.addEventListener('click', handleAdvanceInput);
    document.addEventListener('touchend', handleAdvanceInput, { passive: true });

    // Keyboard
    document.addEventListener('keydown', e => {
      if (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowRight') {
        handleAdvanceInput(e);
      }
      if (e.key === 'Escape') togglePause();
    });

    // Swipe to advance
    let touchStartX = 0;
    document.addEventListener('touchstart', e => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    document.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (dx < -50) handleAdvanceInput(e); // swipe left = advance
    }, { passive: true });

    // Pause button
    const pauseBtn = document.getElementById('btn-pause');
    if (pauseBtn) pauseBtn.addEventListener('click', e => { e.stopPropagation(); togglePause(); });

    // Resume button
    const resumeBtn = document.getElementById('btn-resume');
    if (resumeBtn) resumeBtn.addEventListener('click', resume);

    // Restart button
    const restartBtn = document.getElementById('btn-restart');
    if (restartBtn) restartBtn.addEventListener('click', () => {
      clearProgress();
      state.sceneIndex = 0;
      state.stepIndex  = 0;
      resume();
      goToScene(0);
    });

    // Home button
    const homeBtn = document.getElementById('btn-home');
    if (homeBtn) homeBtn.addEventListener('click', () => {
      window.location.href = 'index.html';
    });

    // Audio toggle
    const audioBtn = document.getElementById('btn-audio');
    if (audioBtn) audioBtn.addEventListener('click', e => {
      e.stopPropagation();
      if (window.AudioManager) {
        const muted = AudioManager.toggleMute();
        audioBtn.textContent = muted ? '🔇' : '🔊';
        showToast(muted ? 'Audio muted' : 'Audio on');
      }
    });
  }

  function handleAdvanceInput(e) {
    // Don't advance if clicking on UI elements
    if (e.target && e.target.closest && (
      e.target.closest('#pause-menu') ||
      e.target.closest('#verse-display') ||
      e.target.closest('#choices-layer') ||
      e.target.closest('#hud') ||
      e.target.closest('.hud-btn') ||
      e.target.closest('button')
    )) return;

    if (state.paused || state.verseOpen || state.choicesOpen) return;
    if (!state.started) return;

    nextStep();
  }

  /* ── Public Interface ──────────────────────────────────────── */
  function restart() {
    clearProgress(state.storyId);
    state.sceneIndex = 0;
    state.stepIndex  = 0;
    state.choices    = {};
    state.flags      = {};
    state.paused     = false;
    state.verseOpen  = false;
    state.choicesOpen = false;
    if (window.AudioManager) AudioManager.stopVerse();
    goToScene(0, 0);
  }

  return {
    init,
    loadStory,
    start,
    restart,
    onComplete,
    nextStep,
    goToScene,
    transitionToScene,
    togglePause,
    resume,
    showToast,
    clearProgress,
    getState: () => ({ ...state }),
  };

})();
