# Cave Sleepers - Text Prototype (Branch A)

## Design Doc

**Genre:** Interactive fiction / choice-driven narrative  
**Perspective:** Second person ("You are...")  
**Structure:** Linear with branching moments  
**Goal:** Capture tension, faith, and wonder

## Prototype Outline

### Act 1: The City
- Establish setting (polytheistic empire)
- Introduce companions
- First choice: speak truth or stay silent
- Consequences: attention from authorities

### Act 2: The Decision
- Meeting in secret
- Plan escape vs stand ground
- Choose who leads, who follows
- Gather supplies or leave now

### Act 3: The Flight
- Navigate city at night
- Avoid patrols
- Reach the cave
- Dog follows (scripted moment)

### Act 4: The Cave
- Explore interior
- Prayer/reflection moment
- Decision to sleep/wait
- Fade to black

### Act 5: The Awakening
- Wake thinking it's been hours
- Send someone to buy food
- Discover old coins don't work
- Realization: centuries have passed
- Exploration of new world

### Act 6: Purpose
- Why were we preserved?
- What is our role now?
- Open-ended reflection

## Sample Passages

### Opening
```
The marble gods stare down at you with blank eyes. 
Tomorrow, the Emperor arrives. Everyone must bow.

Your hand trembles. Not from fear—from conviction.

You will not bow.

> Continue
```

### Critical Choice
```
Malik grabs your shoulder. "We leave tonight. 
The cave beyond the city—no one goes there."

Yusra shakes her head. "Running proves their point. 
We should stand in the square and declare our faith."

The others look to you.

> [1] Agree with Malik—flee to safety
> [2] Agree with Yusra—stand and witness
> [3] Suggest a third option
```

### Time Jump
```
You wake.

Something feels wrong. The light is different. 
Your body aches with a deep, hollow exhaustion.

"How long did we sleep?" Malik asks.

You step toward the cave entrance. The sun is rising—
but the city beyond...

It's not your city.

> Continue
```

## Implementation Notes

- Use simple markdown/text format initially
- Timed choices create tension (optional)
- Track: faith level, group cohesion, supplies
- Multiple endings based on choices?

## Next: Build Prototype

Convert this outline into a playable text experience.
Tools: Twine, Ink, or custom JS/HTML.
