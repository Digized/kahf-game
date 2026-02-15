# Cave Sleepers VN - Playtest Guide

## Quick Start

1. Open `index.html` in a web browser
2. No server required (but works fine with one)
3. Game auto-starts after page load

## What to Test

### Core Mechanics
- [ ] Faith meter visible and updates with choices
- [ ] Time pressure activates during persecution
- [ ] Timeout leads to alternate ending
- [ ] Character silhouettes appear/disappear correctly
- [ ] Scene backgrounds transition smoothly

### Narrative Flow
- [ ] All dialogue displays properly
- [ ] Choices appear when expected
- [ ] Continue button shows when appropriate
- [ ] Story branches work correctly
- [ ] All 5 endings reachable

### Performance
- [ ] Smooth on Raspberry Pi (target device)
- [ ] No lag during transitions
- [ ] Responsive on mobile
- [ ] Memory usage stays low

### Emotional Impact
- [ ] Tension builds during Act 1
- [ ] Peace/mystery in Act 2
- [ ] Wonder/revelation in Act 3
- [ ] Endings feel meaningful

## Test Paths

### Path 1: High Faith Ending (The Witness)
1. Choose "remain strong in our faith"
2. Pause to pray before fleeing
3. Trust in God in the cave
4. Share your story at the end

### Path 2: Martyrdom
1. Choose faith options
2. Delay during time pressure
3. Let timer run out
4. Refuse to submit to guards

### Path 3: Compromise/Survival
1. Choose "convince them" early
2. Let timer run out during escape
3. Submit to save your life

### Path 4: Mystery Ending
1. Mix of faith choices
2. Successfully escape
3. Return to cave at end

### Path 5: Renewal
1. Practical choices (flee, warn others)
2. Survive persecution
3. Build new life at end

## Known Issues

None currently - this is the initial release.

## Feedback Requested

1. Does the faith meter feel meaningful?
2. Is time pressure too harsh or too lenient?
3. Do the CSS backgrounds create sufficient atmosphere?
4. Is the time skip (309 years) communicated clearly?
5. Which ending feels most satisfying?

## Technical Notes

- Total size: ~37KB (all files)
- Load time: <100ms on Pi
- No network requests after initial load
- Works offline
- No console errors in normal play

---

Test Date: 2026-02-15  
Version: 1.0  
Platform: Raspberry Pi 4, Chromium
