# أصحاب الكهف - People of the Cave

**3D Interactive Experience**

A 3D narrative game based on the story of the People of the Cave from Surah Al-Kahf (The Cave), Quran 18:9-26.

---

## The Story

You are one of the young believers who refused to worship idols during the reign of a tyrannical emperor. Fleeing persecution, you and your companions seek refuge in a cave, trusting in God's protection.

What you think is a brief rest becomes a divine miracle — three hundred years pass while you sleep, preserved by God as a sign for future generations.

When you wake, the world has transformed. The tyrant is dust. The city has turned to faith. But you remain — displaced in time, a living testament to God's power.

**Will you emerge as a witness, or hide from a world you no longer recognize?**

---

## How to Play

### Controls
- **Mouse/Touch:** Drag to rotate camera
- **Scroll/Pinch:** Zoom in/out
- **Choices:** Click text options to advance

### Faith Mechanic
- You begin with **3 faith**
- Choices that show doubt or fear may cost faith
- Different endings based on your resolve
- Faith reflects spiritual certainty, not knowledge

### Key Themes
1. **Refuge from persecution** - When compromise means betrayal of truth
2. **Divine preservation** - God's power over time itself
3. **Displacement and purpose** - What does it mean to be a "sign"?
4. **Community in faith** - The companions stay together through impossible trials

---

## Technical Details

**Built with:**
- Three.js r147 (3D rendering)
- Vanilla JavaScript (no frameworks)
- Google Fonts (Cinzel, Crimson Text)
- Pure CSS animations

**Optimized for:**
- Desktop browsers (Chrome, Firefox, Safari, Edge)
- Mobile/tablet (touch-friendly controls)
- Raspberry Pi (low-poly aesthetic, ~60fps)

**File Structure:**
```
cave-sleepers-3d/
├── index.html          # Main entry point
├── style.css           # UI styling (warm amber palette)
├── game.js             # Game loop, scene management, story
├── characters.js       # Low-poly character models
├── environments.js     # Ancient city, cave, future city
├── animations.js       # Fleeing, sleeping, waking, discovery
└── README.md          # This file
```

---

## Quranic Accuracy

This game is directly based on Quran 18:9-26. Every major story beat comes from the Quranic text:

- **18:10** - Prayer for mercy and guidance ✅
- **18:11** - God seals their ears in sleep ✅
- **18:19** - Confusion about time, sending for food ✅
- **18:19-20** - Old currency revealing the time passage ✅
- **18:21** - Discovery by townspeople ✅
- **18:22** - Debate about their number ✅
- **18:25** - 300 years (solar) ✅

See `QURANIC_ALIGNMENT.md` for verse-by-verse mapping.

---

## Differences from Visual Novel Version

The original **Cave Sleepers** visual novel (2D, text-focused) had some gaps in Quranic alignment. This 3D version adds:

### Missing Elements Now Included:
1. **Explicit prayer before fleeing** (18:10) - Now a dedicated scene
2. **Divine sealing of ears** (18:11) - Explicitly mentioned during sleep
3. **Time confusion among sleepers** (18:19) - Debate about duration
4. **Currency as revelation mechanism** (18:19) - Old coins in new market
5. **Discovery by townspeople** (18:21) - Crowd follows sleeper back
6. **Debate about number** (18:22) - Referenced in ending
7. **300 years specified** (18:25) - Exact duration stated

### New 3D Features:
- **Environmental storytelling** - Ancient city vs future city architecture
- **Character animations** - Fleeing, praying, sleeping, waking
- **Atmospheric lighting** - Oppressive (persecution) vs warm (refuge)
- **Visual time passage** - Environment fades during sleep sequence
- **Dog companion** - Present in several scenes, included in sleeping animation

---

## Target Audience

Designed for **24-30 year old gamers** who appreciate:
- Narrative-driven games (Pentiment, Disco Elysium, 80 Days)
- Quranic stories treated with depth and accuracy
- Atmospheric, intentional aesthetics
- Moral weight in choices

---

## Endings

The game has multiple endings based on your choices:

1. **Ending: Sign** - Emerge and become a public miracle (highest faith)
2. **Ending: Faith Witness** - Choose to live in the new world despite fear
3. **Ending: Hidden** - Retreat deeper into the cave, away from the world
4. **Ending: Fearful Isolation** - Panic and hide before understanding
5. **Ending: Rejection** - Refuse to be a sign, demand privacy

Each ending reflects different responses to displacement and divine purpose.

---

## Development

**Status:** Complete  
**Repository:** [github.com/Digized/kahf-game](https://github.com/Digized/kahf-game)  
**Platform:** Web (GitHub Pages)  
**License:** MIT (content TBD)

---

## Future Improvements

Potential enhancements:
- Arabic voiceover for key verses
- More detailed character models (while keeping low-poly aesthetic)
- Additional environmental details (market goods, cave textures)
- Sound effects (footsteps, crowd murmurs, wind)
- Music (ambient, non-intrusive)

---

## Credits

**Design & Development:** Zuraiz Zafar ([@Digized](https://github.com/Digized))  
**Story Source:** Quran, Surah Al-Kahf (18:9-26)  
**Fonts:** Cinzel (titles), Crimson Text (body)  
**3D Engine:** Three.js  
**Inspired by:** Moses & Khidr 3D (same series)

---

## Reflection

*"Do you think that the people of the cave and the inscription were among Our wonders a wonder?"* (18:9)

This is not just a story about sleep. It's about:
- **Refuge** when the world demands compromise
- **Preservation** when all seems lost
- **Purpose** when you're displaced from everything familiar
- **Witness** as the highest form of faith

Play, reflect, share.

🔥
