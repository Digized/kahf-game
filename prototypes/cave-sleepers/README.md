# Cave Sleepers - Prototype

## Overview

**Cave Sleepers** is a visual novel-style interactive narrative exploring the Quranic story of Ashab al-Kahf (The People of the Cave / Seven Sleepers of Ephesus).

**Genre:** Visual novel with tension mechanics  
**Platform:** Web (HTML/CSS/JavaScript)  
**Playtime:** 30-45 minutes  
**Prototype Version:** 1.0

## Story

Young believers in 3rd century Ephesus face persecution for refusing to worship the imperial gods. They flee to a cave for refuge, where God causes them to sleep for 300+ years. Upon waking, they discover a world transformed—persecution ended, faith triumphant.

## Core Themes

- **Faith under pressure** — choosing conviction despite mortal danger
- **Time displacement** — waking to an utterly changed world
- **Divine protection** — trust in the unseen
- **Wonder** — experiencing the miraculous
- **Purpose** — understanding why you were preserved

## Unique Mechanics

### 1. Resolve/Faith Meter
- Starts at 100%
- Affected by player choices
- Not a "win/lose" condition, but reflects emotional/spiritual state
- Visual feedback (color changes, glow effects)

### 2. Timed Decisions
- Certain critical moments have countdown timers
- Creates tension and urgency
- Forces instinctive rather than calculated choices
- Auto-selects first option if time expires

### 3. Atmospheric Shifts
- Visual background changes between time periods:
  - **Ancient** (persecution era) - dark, oppressive
  - **Cave** (sanctuary) - peaceful, sheltered
  - **Future** (post-persecution) - lighter, changed
- Smooth CSS transitions enhance immersion

### 4. ASCII Art Scenes
- Each scene has visual representation
- Creates atmosphere without heavy graphics
- Works well on low-resource devices (Pi constraint)
- Nostalgic, stylized aesthetic

## Differentiation from Moses Prototype

The Moses prototype is pure text-based interactive fiction. Cave Sleepers differs by:

1. **Visual presentation** - ASCII art scenes, atmospheric overlays
2. **Pressure mechanics** - faith meter + timed choices
3. **Genre feel** - visual novel vs. classic IF
4. **Pacing** - More cinematic, less text-heavy
5. **Emotional focus** - Tension → Relief → Wonder (vs. patience/learning in Moses)

## Technical Implementation

### Files
- `index.html` - Structure and DOM elements
- `style.css` - Visual styling, animations, responsive design
- `scenes.js` - Story content, branching narrative
- `engine.js` - Game logic, state management, rendering

### Key Features
- **No external dependencies** - Pure vanilla JS
- **Responsive** - Works on mobile and desktop
- **Lightweight** - ~50KB total, suitable for Pi
- **Accessible** - Semantic HTML, keyboard navigation

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6 JavaScript
- CSS Grid and Flexbox
- Tested on low-resource devices

## Running the Prototype

### Local
1. Open `index.html` in any modern web browser
2. No server required (can run from file://)

### Web Server (optional)
```bash
# Simple Python server
python3 -m http.server 8000

# Then visit http://localhost:8000
```

## Story Structure

### Acts

**Act 1: Persecution** (Scenes: start → secret_meeting)
- Establish danger and conviction
- Choose between caution and boldness

**Act 2: Flight** (Scenes: escape variants)
- Tension and time pressure
- Navigate hostile environment
- Timed decisions under stress

**Act 3: Sanctuary** (Scenes: cave entrance → sleep)
- Peace after danger
- Faith solidified
- Surrender to divine protection

**Act 4: Awakening** (Scenes: awakening → discovery)
- Disorientation and wonder
- Gradual realization of time passed
- Mystery and exploration

**Act 5: Resolution** (Scenes: market → reunion → endings)
- Truth revealed
- Purpose understood
- Two ending variants

### Branching Points

Major branches:
1. Public declaration vs. secret meeting
2. Warning mission (risky) vs. immediate flight
3. Volunteer vs. draw lots
4. Flee market vs. stay calm
5. Witness ending vs. reflection ending

Total scenes: 23
Unique paths: ~8-10 depending on choices

## Design Philosophy

### Tension Mechanics
- Timed choices simulate real pressure
- Faith meter provides emotional feedback
- Not punitive—all paths reach meaningful endings

### Accessibility
- No "wrong" choices that lock out content
- Multiple paths to key story beats
- Different endings reflect player approach, not success/failure

### Respect for Source Material
- Based on Surah Al-Kahf (Quran 18:9-26)
- Honors the spiritual themes
- Historical setting (Decius persecution, ~250 CE)
- Names drawn from Islamic and Christian traditions

## Playtime & Replayability

**First Playthrough:** 30-45 minutes  
**Replay Value:** Moderate
- Two distinct endings
- Different paths to discovery
- Timed choices create varied experiences

## Future Expansion Ideas

If developing beyond prototype:

1. **Sound design** - Ambient audio, tension music
2. **More detailed art** - Pixel art scenes instead of ASCII
3. **Additional branches** - More choice variety
4. **Character development** - Deeper companion interactions
5. **Historical details** - More period-specific content
6. **Multiple perspectives** - Play as different companions
7. **Save system** - Bookmark progress
8. **Achievements** - Discover all paths

## Technical Notes

### Pi Constraints Addressed
- **Lightweight:** No heavy frameworks or libraries
- **Low resource:** Minimal CPU/memory usage
- **Fast load:** Small file sizes
- **No server required:** Static files only

### Performance
- Smooth on Raspberry Pi 4
- No lag or frame drops
- Instant scene transitions
- Efficient timer implementation

## Credits

**Story Source:** Surah Al-Kahf (Quran 18:9-26)  
**Historical Context:** Seven Sleepers of Ephesus legend  
**Developed for:** Kahf Game Project  
**Prototype Build:** February 2026

## License

Part of the Kahf Game Project. See main repository for licensing.

---

## Development Log

### Prototype Goals Achieved
✅ Different genre than Moses text-based IF  
✅ Web-based (Pi-compatible)  
✅ Captures themes: faith under pressure, time displacement, wonder  
✅ Unique mechanics: faith meter + timed choices  
✅ 30-60 minute playtime  
✅ Playable prototype with documentation  
✅ Atmospheric visual presentation  

### What Works Well
- Timed choices create genuine tension
- Faith meter provides subtle feedback
- ASCII art establishes atmosphere efficiently
- Branching feels meaningful
- Emotional arc (fear → peace → wonder) lands strongly

### Areas for Improvement
- Could use more visual variety
- Sound would enhance immersion significantly
- More replayability could be built in
- Character personalities could be more distinct
- Some historical details could be richer

### Lessons Learned
- Visual novel format suits this story well
- Pressure mechanics enhance engagement
- Simple visuals can be very effective
- Faith meter adds layer without complexity
- Time displacement is powerful narrative device

---

**Next Steps:** Playtest, gather feedback, iterate. Consider which elements to bring forward to full game development.
