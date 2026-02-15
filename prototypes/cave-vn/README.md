# Cave Sleepers - Visual Novel Prototype

**Genre:** Visual Novel / Interactive Narrative  
**Platform:** Web Browser (HTML5/CSS3/JavaScript)  
**Play Time:** 30-45 minutes  
**Story:** People of the Cave (Ashab al-Kahf)

## Overview

A visual novel adaptation of the Cave Sleepers story, featuring faith-based decision making, time pressure mechanics, and a three-act narrative structure. This prototype explores different gameplay mechanics from the Moses text-IF prototype.

## Unique Mechanics

### 1. Faith Meter
- Tracks your spiritual conviction (0-100)
- Influenced by choices throughout the game
- Affects available options and narrative outcomes
- Visual feedback with glowing effects

### 2. Time Pressure System
- Activated during the persecution/flight sequence
- Creates tension without combat
- Forces quick decisions under stress
- Timeout leads to alternative story paths (martyrdom/compromise)

### 3. Character Presence
- CSS-based character silhouettes
- Dynamic speaking indicators
- Multiple characters on screen
- Visual storytelling through positioning

### 4. Atmospheric Backgrounds
- Pure CSS gradient backgrounds (no images!)
- Smooth scene transitions
- Day/night and location shifts
- Overlay effects for mood

## Story Structure

### Act 1: Persecution (15 min)
- Introduction to characters and conflict
- Rising tension as guards close in
- Faith choices under pressure
- Time-limited escape sequence

### Act 2: The Cave (10 min)
- Seeking refuge
- Divine protection
- The miraculous sleep begins
- 309 years pass in silence

### Act 3: Awakening (15 min)
- Confusion and realization
- Discovering the time displacement
- Exploring the transformed world
- Final choice: How to use this second life?

## Multiple Endings

1. **Martyrdom** - Stand firm, face death with faith
2. **Compromise** - Survive through submission (heavy consequences)
3. **The Witness** - Share your miraculous story
4. **The Mystery** - Return to the cave seeking deeper understanding
5. **Renewal** - Build a new life in the transformed world

## Technical Features

- **Zero external dependencies** - Pure vanilla JavaScript
- **No image assets** - All visuals generated with CSS
- **Responsive design** - Works on desktop and mobile
- **Lightweight** - ~35KB total, perfect for Raspberry Pi
- **Modular architecture** - Engine separate from story data
- **Memory efficient** - Minimal DOM manipulation

## How to Play

1. Open `index.html` in any modern web browser
2. Read dialogue and make choices
3. Watch your faith meter and act accordingly
4. During timed sequences, decide quickly!
5. Explore different paths and endings

## Files

- `index.html` - Main game structure
- `style.css` - Visual novel styling and animations
- `engine.js` - Game engine (faith system, time pressure, scene loading)
- `story.js` - Complete narrative content and branching paths
- `README.md` - This file

## Themes Explored

✓ **Faith under pressure** - Choices matter when stakes are high  
✓ **Divine protection** - Trust in unseen help  
✓ **Time displacement** - Waking to a changed world  
✓ **Community** - Strength through shared belief  
✓ **Wonder** - The miraculous woven into narrative  

## Differences from Moses Prototype

| Feature | Moses (Text IF) | Cave (Visual Novel) |
|---------|----------------|---------------------|
| **Genre** | Parser-based interactive fiction | Visual novel |
| **Input** | Text commands | Click choices |
| **Visuals** | Text-only | CSS backgrounds + characters |
| **Mechanics** | Inventory, examination | Faith meter, time pressure |
| **Pace** | Player-controlled | Guided narrative |
| **Replay** | Exploration-focused | Multiple endings |

## Design Philosophy

This prototype prioritizes:
- **Atmosphere over graphics** - Mood through color and timing
- **Meaningful choices** - Faith system tracks consistency
- **Emotional journey** - Fear → Peace → Wonder
- **Accessibility** - Simple controls, clear feedback
- **Performance** - Runs smoothly on low-power devices

## Future Enhancements

Potential additions for full version:
- Background audio/sound effects
- More granular faith consequences
- Additional character perspectives
- Save/load system
- Achievement tracking
- Arabic language option
- Enhanced mobile gestures

## Testing Notes

Tested on:
- ✓ Chromium (Raspberry Pi)
- ✓ Firefox
- ✓ Chrome
- ✓ Mobile browsers (responsive design)

Performance: Smooth 60fps on Raspberry Pi 4.

## Credits

Story based on Surah Al-Kahf (The Cave), Quran 18:9-26.

Developed as part of the Kahf Game Project prototype exploration.

---

**Play Time:** ~35 minutes average  
**Replayability:** High (multiple paths and endings)  
**Accessibility:** Keyboard and mouse/touch support
