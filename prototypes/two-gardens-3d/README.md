# الجنتان - The Two Gardens

A 3D interactive narrative experience based on the parable of The Two Gardens from Surah Al-Kahf (Quran 18:32-44).

## Overview

**The Two Gardens** is a contemplative 3D narrative that brings to life the Quranic parable of two men—one wealthy and arrogant, the other humble and grateful. Players witness the consequences of pride versus gratitude through an immersive 3D environment that transforms from flourishing gardens to devastation.

## Story

From **Quran 18:32-44**, the parable tells of:
- A wealthy man blessed with two magnificent gardens
- His arrogant boasting and denial of Allah's power
- A humble companion who warns him with "Ma sha Allah" (As God wills)
- The overnight destruction of the gardens
- The wealthy man's deep regret: "Would that I had not associated anyone with my Lord"

## Features

### Narrative
- **9 Complete Story Beats** - All verses from 18:32-44 represented
- **Branching Choices** - Your responses shape the gratitude meter
- **4 Different Endings** - Based on your level of humility vs arrogance
- **Direct Quranic Quotes** - Authentic dialogue from the verses

### Gameplay
- **Gratitude Meter** - Visual tracker of your spiritual state
  - Red (Arrogant) → Amber (Uncertain) → Green (Grateful)
  - Affects which ending you receive
- **Interactive Choices** - Key decision points throughout the narrative
- **3D Exploration** - Look around the gardens with mouse/touch controls

### Technical
- **Pi-Compatible** - Optimized low-poly assets
- **Mobile Support** - Touch controls for phones/tablets
- **Garden Transformation** - Dramatic flourishing→destroyed animation
- **Smooth Animations** - Camera movements, character poses, environment changes

## Controls

- **Mouse**: Click and drag to look around
- **Touch**: Swipe to look around (mobile)
- **Choices**: Click dialogue options to progress

## Architecture

```
index.html          - Main entry point, UI structure
style.css           - Styling (warm amber palette, responsive)
game.js             - Game controller, scenes, narrative flow
characters.js       - Wealthy man & humble companion models
environments.js     - Gardens (flourishing/destroyed), meeting place
animations.js       - Camera, character, and environment animations
```

## How to Run

### Local Development
1. Open `index.html` in a modern web browser
2. OR use a local server:
   ```bash
   python3 -m http.server 8000
   # Visit http://localhost:8000
   ```

### GitHub Pages
Push to GitHub and enable Pages in repository settings.

## Design Philosophy

### Not Preachy
The story speaks for itself—no heavy-handed moralizing. Players experience the consequences through the narrative.

### Emotionally Resonant
The destruction sequence is designed to be visceral. You should *feel* the loss.

### Visually Striking
- Flourishing gardens: Lush greens, flowing water, abundant fruit
- Destroyed gardens: Cracked earth, withered trees, dry riverbeds
- Smooth transitions emphasize the transformation

### Reflective
Pause moments allow contemplation of the Quranic wisdom.

## Performance

**Optimized for Raspberry Pi:**
- Low-poly vegetation (trees, vines, bushes)
- Efficient state switching (transform geometry rather than duplicate)
- Minimal draw calls
- Smooth 30+ FPS on Pi 4

## Quranic Alignment

See `QURANIC_ALIGNMENT.md` for detailed verse-by-verse mapping.

All dialogue is derived directly from Quran 18:32-44. The narrative structure follows the verses sequentially while allowing player choice to explore "what if" scenarios.

## Endings

1. **Path of Gratitude** (High gratitude) - Humble throughout, spiritual preservation
2. **Late Awakening** (Medium-high) - Realized truth after destruction
3. **Weight of Arrogance** (Medium-low) - Pride blinded until too late
4. **Deep Regret** (Low gratitude) - Refused all warnings, total loss

Each ending includes a relevant Quranic quote and reflection.

## Credits

**Source Material**: Quran 18:32-44 (Surah Al-Kahf)

**Engine**: Three.js (r128)

**Inspired by**: Moses 3D and Cave Sleepers 3D prototypes

## License

This is a spiritual education project. Free to use for non-commercial Islamic education purposes.

---

*"Ma sha Allah, la quwwata illa billah"*  
*As God wills, there is no power except with Allah* (Quran 18:39)
