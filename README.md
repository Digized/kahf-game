# Surah Al-Kahf Interactive Game

Web-based narrative game exploring the four stories from Surah Al-Kahf through decision trees.

## Quick Start

1. Open `game.html` in any browser
2. Currently implements **Chapter 1: Cave Sleepers** as proof of concept

## Decision Tree Structure

### Cave Sleepers (Implemented)
```
START
├─ Speak out publicly
│  ├─ Endure torture → LESSON: Courage in Faith
│  └─ Escape attempt → LESSON: Wisdom in Action
├─ Seek refuge (canonical path)
│  ├─ Trust God → LESSON: Trust in God's Plan ✓
│  └─ Stay alert → LESSON: Divine Protection
└─ Pretend compliance
   ├─ Seek forgiveness → LESSON: Sincere Repentance
   └─ Continue deception → WARNING: Cost of Hypocrisy
```

### Future Chapters (Structure Only)

**Chapter 2: Two Gardens**
- Theme: Gratitude vs Arrogance
- Key decision: How to respond to blessings
- Endings explore pride, humility, loss, redemption

**Chapter 3: Moses & Al-Khidr**
- Theme: Patience & Divine Wisdom
- Key decision: Trust vs questioning authority
- Endings explore patience, hasty judgment, submission

**Chapter 4: Dhul-Qarnayn**
- Theme: Justice & Power
- Key decision: Use of authority
- Endings explore tyranny, justice, protection of the weak

## Technical Stack

- **Pure HTML/CSS/JS** (no dependencies)
- Modular story data structure (`story-data.js`)
- Simple game engine (`game.js`)
- Responsive design

## Art Style

- **Silhouettes** for characters (hooded figures)
- **Islamic geometric patterns** as background textures
- **No facial features** (respectful representation)
- Color palette: Deep blues/purples with gold accents (#b7945c)

## File Structure

```
kahf-game/
├── game.html          # Main game interface
├── game.js            # Game engine
├── story-data.js      # Story nodes & decision trees
└── README.md          # This file
```

## Extending the Game

### Adding a New Chapter

1. Add story data to `story-data.js`:
```javascript
storyData.twoGardens = {
    start: {
        id: 'start',
        text: 'Your story text here...',
        choices: [
            { text: 'Choice 1', next: 'node_id' },
            { text: 'Choice 2', next: 'other_node' }
        ]
    },
    // More nodes...
};
```

2. Update chapter selector in `game.html` (future feature)

### Node Structure

Each node must have:
- `id`: Unique identifier
- `text`: Narrative content
- `choices`: Array of choice objects (unless it's an ending)
- `lesson` (optional): Displayed at ending nodes

## Design Principles

1. **Respectful**: No anthropomorphic depictions
2. **Educational**: Each path teaches something from the Surah
3. **Branching**: Multiple paths, not linear
4. **Replayable**: Encourage exploring different choices

## Next Steps

- [ ] Add chapter selection menu
- [ ] Implement remaining 3 chapters
- [ ] Add sound effects (optional, ambient)
- [ ] Save/load progress (localStorage)
- [ ] Mobile optimization
- [ ] Accessibility improvements (keyboard nav, screen readers)

## Islamic Design Resources

- Geometric patterns: [Islamic Patterns](http://www.islamicpattern.com/)
- Color palettes: Traditional Islamic art (golds, deep blues, greens)
- Typography: Consider Arabic-style web fonts for titles

---

**Built with respect for the sacred text. May this be a means of reflection and understanding.**
