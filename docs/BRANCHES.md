# EXPERIMENTAL BRANCHES

Different approaches to try. Each branch explores a distinct direction.

---

## Branch 1: Moses-First (Text Interactive Fiction)

**Goal:** Prove the concept with one polished story

**Story:** Moses & Khidr  
**Format:** Web-based interactive fiction  
**Tooling:** Custom HTML/JS (no dependencies)  
**Scope:** 30-60 minute experience  

**Features:**
- Patience mechanic (limited questions)
- Three acts (boat, boy, wall)
- Multiple endings based on choices
- Replay with revealed knowledge
- Clean, minimal UI

**Success criteria:**
- Playable start to finish
- Emotionally impactful
- Teaches through experience
- Ready to share for feedback

**Branch name:** `moses-if-prototype`

---

## Branch 2: All-Four-Text (Anthology)

**Goal:** Complete anthology in consistent text format

**Story:** All four, text-based  
**Format:** Single web app, story selection  
**Tooling:** Shared JS framework  
**Scope:** 4-6 hours total  

**Features:**
- Unified UI/navigation
- Consistent writing style
- Unique mechanic per story
- Save/load across stories
- Thematic connections visible

**Success criteria:**
- All four stories playable
- Each feels distinct
- Cohesive overall experience
- Low resource footprint (Pi-friendly)

**Branch name:** `anthology-web-app`

---

## Branch 3: Visual-Cave (Pixel Art Adventure)

**Goal:** Explore visual storytelling with Cave story

**Story:** Cave Sleepers  
**Format:** 2D point-and-click adventure  
**Tooling:** Godot (if viable on Pi) or Phaser (web)  
**Scope:** 1-2 hour experience  

**Features:**
- Pixel art visuals (city, cave)
- Point-and-click navigation
- Dialogue system
- Stealth/evasion sequences
- Time jump (past → future)

**Success criteria:**
- Visual polish (limited palette)
- Smooth gameplay on Pi
- Emotional storytelling through art
- Proves viability of visual approach

**Branch name:** `cave-pixel-adventure`

---

## Branch 4: Gardens-Sim (Resource Management)

**Goal:** Test simulation/management mechanics with Gardens story

**Story:** Two Gardens  
**Format:** Top-down resource sim  
**Tooling:** Web-based (Canvas API) or Python/Pygame  
**Scope:** 45-90 minutes  

**Features:**
- Garden expansion mechanics
- Wealth/pride meters
- Dialogue with humble friend
- Slow corruption through choices
- Sudden catastrophic loss

**Success criteria:**
- Engaging resource management
- Moral weight to choices
- Emotional impact of loss
- Mechanics teach the lesson

**Branch name:** `gardens-management-sim`

---

## Branch 5: Dhul-Qarnayn-Strategy

**Goal:** Explore strategy/governance with Dhul-Qarnayn

**Story:** Dhul-Qarnayn  
**Format:** Strategy/narrative hybrid  
**Tooling:** Web-based or lightweight engine  
**Scope:** 2-3 hours  

**Features:**
- World map navigation
- Judgment scenarios (Papers Please-style)
- Resource management
- Justice meter
- Wall construction finale

**Success criteria:**
- Strategic depth
- Moral complexity
- Just vs tyrannical paths feel different
- Finale is satisfying payoff

**Branch name:** `dhul-qarnayn-strategy`

---

## Branch 6: Walking-Sim-All (Contemplative Experience)

**Goal:** Minimal mechanics, maximum reflection

**Story:** All four (environmental)  
**Format:** 3D or 2D walking simulator  
**Tooling:** Godot or web-based  
**Scope:** 2-3 hours  

**Features:**
- Navigable sacred space
- Each story is environment to explore
- Minimal UI, no fail states
- Audio/text narration
- Contemplative pacing

**Success criteria:**
- Meditative atmosphere
- Stories told through space
- Accessible to all
- Emotionally resonant

**Branch name:** `walking-sim-contemplative`

---

## Priority Order (Recommended)

1. **Moses-First** — Fastest to prove concept
2. **All-Four-Text** — Natural extension if Moses works
3. **Visual-Cave** — Test visual approach
4. **Gardens-Sim** — Different mechanics
5. **Dhul-Qarnayn-Strategy** — Most complex
6. **Walking-Sim-All** — Alternative direction

---

## Work Process

1. Create git branch for experiment
2. Set up minimal tooling
3. Build core mechanic first
4. Add narrative content
5. Playtest internally
6. Commit or abandon
7. Document learnings

**Rule:** Fail fast. If a branch isn't working, kill it and try another.

---

## Current Status

- **Active:** None yet
- **Next:** Create `moses-if-prototype` branch and start building
