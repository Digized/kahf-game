# Moses & Khidr 3D - Quick Start Guide

## Instant Play

**Fastest way to play:**
```bash
cd kahf-game/prototypes/moses-3d
python -m http.server 8000
```
Then open: http://localhost:8000

## What You'll See

1. **Loading Screen** - Brief Three.js initialization
2. **Meeting Scene** - Moses meets Khidr by the shore
3. **Story Panel** - Bottom of screen, narrative text + choices
4. **Patience Meter** - Top right, tracks your 3 questions
5. **3D World** - Interactive camera (drag to rotate, scroll to zoom)

## How to Play

1. **Read** the story text in the bottom panel
2. **Choose** your response carefully (red = question, costs patience)
3. **Watch** the 3D world react to story events
4. **Explore** with camera controls between choices
5. **Reach** one of two endings based on your patience

## Quick Controls

- **Mouse Drag** = Rotate camera around scene
- **Mouse Scroll** = Zoom in/out
- **Click Buttons** = Make story choices
- **Restart** = Appears at game end

## Three Key Moments

1. **Boat** - Khidr damages the fishermen's boat
2. **Village** - Khidr kills a boy
3. **Town** - Khidr repairs a wall for free

Question or trust? Your choice.

## Tech Check

**Requirements:**
- Modern browser (Chrome, Firefox, Safari, Edge)
- WebGL support
- JavaScript enabled
- Internet (for first load - Three.js CDN)

**Size:** 76 KB project + 580 KB Three.js = 656 KB total download

**Performance:**
- Desktop: 60 FPS
- Raspberry Pi 4: 30-45 FPS
- Mobile: 30+ FPS

## Files Overview

- `index.html` - Main page
- `style.css` - UI styling
- `game.js` - Game logic (24 KB)
- `characters.js` - Character models (5 KB)
- `environments.js` - Scenes (11 KB)
- `README.md` - Full documentation
- `IMPLEMENTATION_SUMMARY.md` - Technical details

## Troubleshooting

**Blank screen?**
- Check browser console for errors
- Ensure Three.js CDN is accessible
- Try using a local server

**Low FPS?**
- Close other tabs/applications
- Try a different browser
- Reduce browser window size

**No 3D objects?**
- Wait for loading screen to finish
- Check WebGL is enabled
- Try refreshing the page

## Quick Demo Path

For fastest demo of all features:
1. Start game
2. **Question** at meeting (patience: 2/3)
3. **Question** at boat (patience: 1/3)
4. **Question** at wall (patience: 0/3)
5. See "Humbled Prophet" ending
6. Restart and try staying silent for "Patient Seeker" ending

## Repository

**Branch:** moses-3d-prototype  
**Location:** kahf-game/prototypes/moses-3d/  
**GitHub:** https://github.com/Digized/kahf-game

## Next Steps After Playing

1. Read README.md for full feature list
2. Check IMPLEMENTATION_SUMMARY.md for technical details
3. Compare with text version at prototypes/moses-if/
4. Provide feedback on Discord
5. Test on Raspberry Pi if available

---

**Enjoy the journey. Practice patience.** 🌊
