# Islamic Compliance Documentation

## Purpose
This document verifies the Islamic compliance measures taken in "Surah Al-Kahf: Interactive Journey"

---

## ⚠️ CRITICAL REQUIREMENT: SCHOLARLY REVIEW NEEDED

**This project MUST be reviewed by qualified Islamic scholars before public deployment.**

Contact scholars specializing in:
- Quranic tafsir (exegesis)
- Islamic jurisprudence (fiqh)
- Dawah/Islamic education

---

## 1. Imagery Restrictions

### Prohibition of Prophet Depictions

**Quranic Basis:**
- While the Quran does not explicitly forbid imagery, the majority scholarly opinion prohibits depicting prophets to prevent idolatry.

**Implementation:**

#### Chapter 3: Musa & Al-Khidr (MOST CRITICAL)
- ✅ **Prophet Musa (Moses) AS is NEVER shown**
- ✅ **Implemented as first-person perspective** - The camera IS the prophet's eyes
- ✅ No third-person view of the prophet
- ✅ No character model for Prophet Musa AS
- ✅ Player experiences the story AS Musa, but never sees him

**Code Implementation:**
```javascript
// Camera represents Musa's perspective
this.camera.position.set(0, 1.7, 0); // Eye height
// First-person controls only - no third-person view
```

#### Al-Khidr (Respected Figure)
- ✅ Shown as **abstract silhouette only**
- ✅ Semi-transparent, no facial features
- ✅ Low-poly geometric shapes
- ✅ Opacity: 0.7 (translucent)
- ✅ No detailed human features

**Code Implementation:**
```javascript
// Abstract, semi-transparent form
const bodyMaterial = new THREE.MeshBasicMaterial({
    color: 0x2a4520,
    transparent: true,
    opacity: 0.7
});
// No face - just silhouette
```

#### Chapter 1: Cave Sleepers
- ✅ First-person perspective (you ARE one of the youths)
- ✅ Other believers shown as abstract silhouettes
- ✅ No detailed human forms

#### Chapter 2: Two Gardens
- ✅ Observer perspective (witnessing parable)
- ✅ Wealthy man & companion: abstract figures only
- ✅ No faces, minimal detail

#### Chapter 4: Dhul-Qarnayn
- ✅ First-person perspective (you ARE the ruler)
- ✅ Abstract representations of people helped

---

## 2. Quranic Accuracy

### Source Verification

**Primary Source:**
- Quran.com (verified against Arabic Uthmanic script)
- Translation: Saheeh International (widely accepted)

**Every Quranic verse cited includes:**
1. ✅ Arabic text (Uthmanic script)
2. ✅ English translation (Saheeh International)
3. ✅ Verse citation (Surah Al-Kahf 18:X)

**Example from Chapter 3:**
```html
<div class="arabic">قَالَ إِنَّكَ لَن تَسْتَطِيعَ مَعِىَ صَبْرًۭا</div>
<div class="translation">"Indeed, with me you will never be able to have patience."</div>
<div class="citation">— Surah Al-Kahf 18:67</div>
```

### Interpretive Discipline

**Rule:** If the Quran is silent on a detail, we note it as scholarly interpretation.

**Tafsir Notes Included:**
- When expanding narrative beyond Quranic text
- Marked as "Tafsir Note" or "Reflection"
- Based on established scholars (Ibn Kathir, Maariful Quran)

**Example:**
```
verse: {
    ref: 'Tafsir Note',
    text: 'Patience is restraining yourself even when your heart cries out.'
}
```

---

## 3. Audio Compliance

### Quran Recitation

**Requirements:**
- ✅ Must be from verified Qari (reciter)
- ✅ Proper tajweed (recitation rules)
- ✅ Royalty-free Islamic audio sources

**Recommended Qaris:**
- Mishary Rashid Alafasy
- Abdul Basit Abdul Samad
- Saad Al-Ghamdi

**Current Status:**
- ⚠️ Audio placeholders in code
- ⚠️ Actual files MUST be sourced before deployment
- ⚠️ All sources MUST be credited

**Implementation:**
```javascript
// Placeholder - MUST BE REPLACED
playRecitation(verseRange) {
    const audioPath = `shared/quran-recitation/surah-18-${verseRange}.mp3`;
    // Source from verified Qari required
}
```

### Ambient Sounds

**Permissible:**
- ✅ Nature sounds (wind, water, birds, rain)
- ✅ Environmental sounds (footsteps, boat creaking)

**Avoided:**
- ❌ Musical instruments (controversial in Islam)
- ❌ Any sounds resembling music

**Current Implementation:**
```javascript
const ambiencePaths = {
    'cave': 'shared/audio/cave-drips.mp3',
    'wind': 'shared/audio/wind-gentle.mp3',
    'ocean': 'shared/audio/ocean-waves.mp3',
    'garden': 'shared/audio/garden-birds.mp3'
    // All nature sounds only
};
```

**Note:** If background music is desired, it must be:
- Vocals-only nasheed (Islamic vocals)
- OFF by default
- With clear toggle option
- Labeled as "optional enhancement"

---

## 4. Educational Framing

### Disclaimer System

**Opening Disclaimer (disclaimer.html):**
- ✅ Clear statement: "Educational tool only"
- ✅ Encourages reading actual Quran
- ✅ Lists compliance measures
- ✅ Acknowledges possibility of error
- ✅ Links to Quran.com for verification

**Key Text:**
> "May Allah forgive any errors in this representation and accept this humble effort to spread knowledge of His Book."

### Tone & Language

**Throughout the experience:**
- ✅ Respectful language when mentioning prophets (AS = Alayhi Salaam)
- ✅ No trivializing sacred stories
- ✅ No game-ification (no points, achievements, scores)
- ✅ "Wisdom tracker" instead of "score"
- ✅ Reflective, contemplative pacing

**Avoided:**
- ❌ Casual language about prophets
- ❌ Sensationalism
- ❌ Creative liberties that contradict Quran
- ❌ Speculative theology

---

## 5. Areas Requiring Scholarly Verification

### Before Public Deployment, Verify:

1. **Quranic Citations**
   - [ ] All Arabic text matches Uthmanic script
   - [ ] Translations are accurate
   - [ ] Verse numbers correct (18:1-110)

2. **Tafsir Accuracy**
   - [ ] Interpretations align with mainstream scholarship
   - [ ] No contradictions with established tafsir
   - [ ] Sources properly cited

3. **Imagery Compliance**
   - [ ] First-person implementation acceptable for Moses story
   - [ ] Abstract silhouettes acceptable for other figures
   - [ ] No unintended haram depictions

4. **Tone & Adab (Etiquette)**
   - [ ] Respectful throughout
   - [ ] No language that diminishes prophets
   - [ ] Educational intent clear

5. **Audio Sources**
   - [ ] Quran recitation from verified source
   - [ ] Proper permissions obtained
   - [ ] Credits given

---

## 6. Developer's Attestation

**To the best of my knowledge and ability:**

1. No prophet has been depicted in visual form
2. All Quranic text has been verified against Quran.com
3. Interpretations are based on established tafsir sources
4. Respectful tone maintained throughout
5. Educational intent prioritized over entertainment
6. Disclaimers clearly state this is not a replacement for Quran

**Acknowledgment of Limitation:**

I am a developer, not a scholar. This work represents a sincere effort to create an Islamic-compliant educational tool, but it REQUIRES verification by qualified Islamic scholars before public use.

**May Allah forgive any errors and accept this humble effort.**

---

## 7. Contact for Scholarly Review

If you are an Islamic scholar willing to review this project, please contact:

- Check QURANIC_SOURCES.md for verse verification
- Check SCHOLARLY_REFERENCES.md for tafsir sources
- Review all code in chapter-3-moses/ for imagery compliance
- Provide feedback via project maintainer

**Jazakum Allahu Khairan** (May Allah reward you with goodness)

---

**Last Updated:** 2025-02-20  
**Version:** 1.0  
**Status:** Awaiting Scholarly Review
