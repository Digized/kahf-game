/* ============================================================
   SURAH KAHF VISUAL NOVEL — audio.js
   Audio manager: Quran recitation + ambient audio
   ============================================================ */

'use strict';

const AudioManager = (() => {

  /* ── Config ────────────────────────────────────────────────── */
  const QURAN_CDN = 'https://everyayah.com/data/Alafasy_128kbps/';
  const SURAH_NUM = '018'; // Surah Al-Kahf

  /* ── State ─────────────────────────────────────────────────── */
  let muted        = false;
  let verseAudio   = null;
  let ambientAudio = null;
  let ambientVolume = 0.25;
  let verseVolume   = 0.9;
  let preloadCache  = {}; // ayah → Audio element

  /* ── Quran Recitation ──────────────────────────────────────── */

  /**
   * Build URL for a specific ayah
   * @param {number} ayah - ayah number (1-based)
   * @returns {string} URL
   */
  function ayahUrl(ayah) {
    const ayahStr = String(ayah).padStart(3, '0');
    return `${QURAN_CDN}${SURAH_NUM}${ayahStr}.mp3`;
  }

  /**
   * Preload an ayah into cache
   * @param {number} ayah
   */
  function preloadAyah(ayah) {
    if (preloadCache[ayah]) return;
    const audio = new Audio();
    audio.preload = 'auto';
    audio.src = ayahUrl(ayah);
    preloadCache[ayah] = audio;
  }

  /**
   * Play a Quran verse by ayah number
   * @param {number|string} ayah - ayah number or full URL
   */
  function playVerse(ayah) {
    stopVerse();

    if (muted) return;

    let src;
    if (typeof ayah === 'number') {
      src = ayahUrl(ayah);
      // Preload next ayah
      preloadAyah(ayah + 1);
    } else {
      src = ayah; // treat as URL
    }

    verseAudio = preloadCache[ayah] || new Audio(src);
    verseAudio.volume = verseVolume;
    verseAudio.currentTime = 0;

    verseAudio.play().catch(err => {
      console.warn('[AudioManager] Verse play failed:', err.message);
    });

    // Update audio button state
    verseAudio.addEventListener('ended', () => {
      const btn = document.querySelector('.verse-audio-btn');
      if (btn) btn.classList.remove('playing');
    });
  }

  function stopVerse() {
    if (verseAudio) {
      verseAudio.pause();
      verseAudio.currentTime = 0;
      verseAudio = null;
    }
  }

  function pauseVerse() {
    if (verseAudio) verseAudio.pause();
  }

  function resumeVerse() {
    if (verseAudio && !muted) verseAudio.play().catch(() => {});
  }

  /* ── Ambient Audio ─────────────────────────────────────────── */

  /**
   * Play ambient track
   * @param {string} src - URL or named preset
   */
  function playAmbient(src) {
    if (!src) return;

    // If same track already playing, don't restart
    if (ambientAudio && ambientAudio.dataset && ambientAudio.dataset.src === src) return;

    stopAmbient();

    const url = resolveAmbientUrl(src);
    if (!url) return;

    ambientAudio = new Audio(url);
    ambientAudio.dataset = ambientAudio.dataset || {};
    ambientAudio.loop   = true;
    ambientAudio.volume = muted ? 0 : ambientVolume;

    ambientAudio.play().catch(err => {
      console.warn('[AudioManager] Ambient play failed:', err.message);
    });
  }

  function stopAmbient() {
    if (ambientAudio) {
      ambientAudio.pause();
      ambientAudio = null;
    }
  }

  function resolveAmbientUrl(src) {
    // Named presets — using royalty-free sources
    const presets = {
      // These are placeholder URLs — ambient is nice-to-have
      // In production, host your own ambient tracks
      'cave':    null, // cave wind ambience
      'desert':  null, // desert wind
      'water':   null, // river/ocean
      'city':    null, // ancient city
      'night':   null, // night crickets
    };

    if (presets.hasOwnProperty(src)) return presets[src];
    if (src.startsWith('http') || src.startsWith('/') || src.startsWith('./')) return src;
    return null;
  }

  /* ── SFX ───────────────────────────────────────────────────── */
  function playSfx(src) {
    if (muted || !src) return;
    const sfx = new Audio(src);
    sfx.volume = 0.7;
    sfx.play().catch(() => {});
  }

  /* ── Controls ──────────────────────────────────────────────── */
  function toggleMute() {
    muted = !muted;
    if (ambientAudio) ambientAudio.volume = muted ? 0 : ambientVolume;
    if (verseAudio)   verseAudio.volume   = muted ? 0 : verseVolume;
    return muted;
  }

  function setMuted(val) {
    muted = val;
    if (ambientAudio) ambientAudio.volume = muted ? 0 : ambientVolume;
    if (verseAudio)   verseAudio.volume   = muted ? 0 : verseVolume;
  }

  function pause() {
    pauseVerse();
    if (ambientAudio) ambientAudio.pause();
  }

  function resume() {
    resumeVerse();
    if (ambientAudio && !muted) ambientAudio.play().catch(() => {});
  }

  function setAmbientVolume(vol) {
    ambientVolume = Math.max(0, Math.min(1, vol));
    if (ambientAudio) ambientAudio.volume = muted ? 0 : ambientVolume;
  }

  /* ── Preload helpers ───────────────────────────────────────── */
  function preloadStoryVerses(ayahs) {
    ayahs.forEach(a => preloadAyah(a));
  }

  /* ── Public ────────────────────────────────────────────────── */
  return {
    playVerse,
    stopVerse,
    pauseVerse,
    resumeVerse,
    playAmbient,
    stopAmbient,
    playSfx,
    toggleMute,
    setMuted,
    pause,
    resume,
    setAmbientVolume,
    preloadStoryVerses,
    preloadAyah,
    ayahUrl,
    isMuted: () => muted,
  };

})();
