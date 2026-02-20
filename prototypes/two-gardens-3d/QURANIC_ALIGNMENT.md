# Quranic Alignment - The Two Gardens
## Verse-by-Scene Mapping (Quran 18:32-44)

This document maps each scene in the prototype to its source verses from Surah Al-Kahf.

---

## Scene 1: Introduction
**Verse**: 18:32

> *"And present to them an example of two men: We granted to one of them two gardens of grapevines, and We bordered them with palm trees and placed between them [fields of] crops."*

**Implementation**:
- Opening narration uses exact verse text
- 3D environment shows:
  - Two gardens (merged into one explorable space)
  - Grape vines (arched structures)
  - Palm trees
  - Crop fields (grass patches)
- Two characters introduced: wealthy man and humble companion

---

## Scene 2: Garden Description
**Verses**: 18:32-33

> *"Each of the two gardens produced its fruit and did not fall short thereof in anything. And We caused to gush forth within them a river."*

**Implementation**:
- Narration quotes verse directly
- Garden tour animation showcases:
  - Abundant fruit on bushes (golden spheres)
  - Flowing river (blue animated geometry)
  - Lush vegetation (green materials, full-scale models)
- No elements "fall short" - gardens are visually complete

---

## Scene 3: Arrogant Boast
**Verses**: 18:34-36

> *"And he had fruit, so he said to his companion while he was conversing with him, 'I am greater than you in wealth and mightier in [numbers of] men.' And he entered his garden while he was unjust to himself. He said, 'I do not think that this will perish - ever. And I do not think the Hour will occur. And even if I should be brought back to my Lord, I will surely find better than this as a return.'"*

**Implementation**:
- Wealthy man performs boasting animation
- Direct quotes used in dialogue:
  - "I am greater than you in wealth and mightier in numbers of men."
  - "I do not think that the Hour will ever come."
  - "But even if I should be brought back to my Lord, I will surely find better than this as a return."
- Camera focuses on wealthy character
- Player experiences the arrogance through first-person perspective

---

## Scene 4: First Choice Point
**Reflection on verses 18:34-36**

**Implementation**:
- Player given agency: acknowledge Allah or take credit
- Gratitude meter responds:
  - Boasting choice (-20 points) → arrogance
  - Acknowledgment (+20 points) → gratitude
- Explores the inner thoughts behind the wealthy man's actions

---

## Scene 5: Companion's Warning (Part 1)
**Verses**: 18:37-38

> *"His companion said to him while he was conversing with him, 'Do you disbelieve in He who created you from dust and then from a [mere] sperm-drop and then proportioned you [as] a man? But as for me, He is Allah, my Lord, and I do not associate with my Lord anyone.'"*

**Implementation**:
- Humble companion performs warning gesture
- Direct quotes in dialogue:
  - "Do you disbelieve in He who created you from dust and then from a drop and then proportioned you as a man?"
  - "But as for me, He is Allah, my Lord, and I do not associate with my Lord anyone."
- Camera shifts to companion
- Calm, measured delivery emphasizes gentleness of the warning

---

## Scene 6: Ma sha Allah
**Verse**: 18:39

> *"And why did you not say, when you entered your garden, 'What Allah willed [has occurred]; there is no power except in Allah'? Although you see me less than you in wealth and children..."*

**Implementation**:
- **Central teaching moment** of the entire parable
- Direct quote: "Why did you not say, when you entered your garden: 'Ma sha Allah, la quwwata illa billah'?"
- Arabic phrase preserved with English translation
- Visual: Both characters visible, emphasizing the contrast

---

## Scene 7: Second Choice Point
**Reflection on verse 18:39**

**Implementation**:
- Player chooses response to "Ma sha Allah" reminder
- Dismiss (-25 points) or Consider/Accept (+30 points)
- Tests whether the central teaching is internalized
- Saying "Ma sha Allah" grants significant gratitude increase

---

## Scene 8: Companion's Wisdom
**Verses**: 18:40-41

> *"...It may be that my Lord will give me [something] better than your garden and will send upon it a calamity from the sky, and it will become a smooth, dusty ground, or its water will become sunken [into the earth], so you would never be able to seek it."*

**Implementation**:
- Companion's prophecy quoted directly
- Foreshadows the destruction to come
- Describes two forms of calamity:
  1. "Calamity from the sky" → withering
  2. "Water sunken into earth" → dry riverbed
- Both are implemented in the destruction animation

---

## Scene 9: Third Choice Point
**Reflection before destruction**

**Implementation**:
- Final opportunity to acknowledge Allah
- Player chooses: refuse (-30) or reflect/say "La quwwata illa billah" (+40)
- Sets the emotional tone for witnessing destruction
- Highest gratitude change available - last chance

---

## Scene 10: The Destruction
**Verse**: 18:42

> *"And his fruits were encompassed [by ruin], and he began to turn his hands about [in dismay] over what he had spent on it, while it had collapsed upon its trellises..."*

**Implementation**:
- **Dramatic transformation sequence**:
  - Gardens wither (green → brown materials)
  - River dries up (blue → brown, water gone)
  - Trees collapse/tilt
  - Walls crumble
  - Falling ash particles
  - 3-second animation captures "overnight" destruction
- "Encompassed by ruin" - entire environment transforms
- Visual match to companion's warning (18:40-41)

---

## Scene 11: Regret
**Verse**: 18:42 (continued)

> *"...and he said, 'Oh, I wish I had not associated with my Lord anyone.'"*

**Implementation**:
- Wealthy man hunched, arms down (regret pose animation)
- Direct quote: "Oh, I wish I had not associated with my Lord anyone!"
- Camera close-up on character to emphasize emotional state
- Contrast to earlier boasting pose

---

## Scene 12: No Help
**Verses**: 18:43-44

> *"And there was not for him a company to aid him other than Allah, nor could he defend himself. There the authority is [completely] for Allah, the Truth. He is best in reward and best in consequence."*

**Implementation**:
- Final narration quotes verses directly
- Establishes the core lesson: Allah alone has authority
- No helpers, no defense - all power belongs to Allah
- Transitions to endings based on gratitude meter

---

## Endings: Reflection on the Full Parable

### Ending 1: Path of Gratitude (High Gratitude ≥50)
**Basis**: Counter-factual "what if" scenario

If the wealthy man had said "Ma sha Allah" and remained grateful, the spiritual lesson would be internalized even if the gardens fell. This ending explores gratitude as protection of the *heart*, not necessarily material wealth.

**Quote Used**: Verse 18:39 - "Ma sha Allah, la quwwata illa billah"

---

### Ending 2: Late Awakening (Medium-High Gratitude 0-49)
**Basis**: Verse 18:42 - regret after destruction

The wealthy man's realization comes too late to save the gardens, but the regret is sincere. Islamic tradition teaches that sincere repentance is always accepted.

**Quote Used**: Verse 18:42 - "Would that I had not associated anyone with my Lord"

---

### Ending 3: Weight of Arrogance (Medium-Low Gratitude -50 to -1)
**Basis**: Verses 18:42-44 - destruction and loss

Pride prevented acknowledgment until devastation was complete. The ending emphasizes the consequences while leaving the door of repentance open (Islamic principle: repentance is always possible).

**Quote Used**: Verse 18:44 - "There the authority is entirely for Allah, the Truth"

---

### Ending 4: Deep Regret (Low Gratitude ≤-51)
**Basis**: Full weight of verses 18:42-44

Complete refusal of all warnings, total loss, deepest regret. This is the "canonical" path closest to the Quranic narrative where the wealthy man ignores everything until it's too late.

**Quote Used**: Verse 18:43 - "And there was for him no company to aid him other than Allah, nor could he defend himself"

---

## Key Quranic Concepts Implemented

1. **Tawhid (Oneness of Allah)** - 18:38
   - Companion refuses to associate partners with Allah
   - Wealthy man's shirk (association) leads to downfall

2. **Ma sha Allah** - 18:39
   - Central teaching: acknowledge Allah's will in blessings
   - Mechanically rewarded in gratitude meter
   - Arabic preserved for authenticity

3. **Dunya (worldly life) as test** - 18:32-36
   - Wealth can lead to arrogance
   - Gardens are a test, not ultimate security

4. **Consequences of pride** - 18:42-44
   - Arrogance → destruction → regret
   - No power can help except Allah

5. **Tawakkul (reliance on Allah)** - 18:39-41
   - Humble companion's trust despite lesser wealth
   - "There is no power except with Allah"

---

## Dialogue Authenticity

**All character dialogue is**:
- Direct quotes from Quran 18:32-44, OR
- Paraphrased closely from the verses, OR
- Player choice text that reflects Quranic concepts

**No fabricated additions** to the core narrative.

**Player choices** allow exploration of "what if" scenarios while remaining grounded in the verse themes.

---

## Visual Symbolism → Verse Mapping

| Visual Element | Verse | Purpose |
|---------------|-------|---------|
| Grape vines | 18:32 | Explicitly mentioned |
| Palm trees | 18:32 | Explicitly mentioned |
| River (flowing) | 18:33 | "We caused to gush forth" |
| River (dry) | 18:41 | "Water sunken into earth" |
| Withered gardens | 18:42 | "Encompassed by ruin" |
| Collapsed trellises | 18:42 | "Collapsed upon its trellises" |
| Wealthy man's jewelry | 18:34 | "Greater in wealth" |
| Humble robes | 18:39 | "Less than you in wealth" |
| Boasting pose | 18:34-36 | Arrogant speech |
| Regret pose | 18:42 | "Turn his hands in dismay" |
| Warning gesture | 18:37-38 | Companion's counsel |

---

## Educational Alignment

This prototype is designed as a **Quranic reflection tool**:

- Players *experience* the parable, not just read it
- Choices encourage contemplation of "what would I do?"
- Gratitude meter makes abstract spiritual concepts tangible
- Multiple endings show consequences of choices
- Direct quotes anchor experience in revelation

**Target audience**: Muslims seeking deeper engagement with Quran, youth education, Islamic study circles.

**Not intended**: As replacement for reading/studying the actual verses. Always return to the Quran itself.

---

*"This is from the news of the unseen which We reveal to you..."* (Quran 18:13)

The parable of The Two Gardens is Allah's teaching to us. This prototype is merely a humble attempt to reflect on that teaching through interactive media.
