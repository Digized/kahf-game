// Dhul-Qarnayn — Interactive Fiction
// Theme: Justice & Power
// Mechanic: Justice (0–10) + Trust (0–10) stats shape the story and ending
// Three acts: West → East → North (Wall)

const gameData = {
    currentScene: 'start',
    justice: 5,
    trust: 5,
    maxStat: 10,
    choices: [],

    scenes: {

        // ─── PROLOGUE ───────────────────────────────────────────────────────────

        start: {
            act: 'Prologue',
            text: `You are Dhul-Qarnayn — the one of two ages, the one of two horns.

God has established you in the land and given you the means to all things.

Armies answer your call. Nations know your name. The earth stretches before you in every direction.

But power is not the same as wisdom. Strength is not the same as justice.

You stand at the crossroads of your reign. Three journeys await — to the West, to the East, and to the North. At each, you will face a test.

What kind of ruler will you be?`,
            choices: [
                { text: 'Begin the journey West, toward the setting sun.', next: 'west_arrival' }
            ]
        },

        // ─── ACT I: THE WEST ────────────────────────────────────────────────────

        west_arrival: {
            act: 'Act I — The Western Realm',
            text: `You travel until you reach the westernmost limit of your journey — the place where the sun appears to set in a dark, muddy spring.

The land here is harsh. The people are divided: some are righteous and humble, others are cruel and exploitative.

Your advisors bring you two men — a wealthy merchant who has been hoarding grain during a famine, letting the poor starve, and a poor farmer who stole bread to feed his children.

Both await your judgment.

Your general leans close: "Make an example of the thief, my lord. It will establish your authority."`,
            choices: [
                {
                    text: 'Punish the merchant for hoarding. Redistribute the grain. Pardon the farmer.',
                    next: 'west_just',
                    statChange: { justice: +2, trust: +2 },
                    type: 'justice'
                },
                {
                    text: 'Punish the farmer for theft. Warn the merchant. Maintain order.',
                    next: 'west_unjust',
                    statChange: { justice: -2, trust: -1 },
                    type: 'tyranny'
                },
                {
                    text: 'Punish both — the merchant for hoarding, the farmer for theft. Redistribute the grain.',
                    next: 'west_balanced',
                    statChange: { justice: +1, trust: +1 }
                }
            ]
        },

        west_just: {
            act: 'Act I — The Western Realm',
            text: `You order the merchant's grain stores opened and distributed to the hungry. The merchant is fined heavily and publicly rebuked.

The farmer is pardoned. His family weeps with relief.

The people of the western land watch in silence — then, slowly, they begin to murmur approval. A ruler who sees the truth beneath the surface. A ruler who does not mistake wealth for righteousness.

Your general is uneasy. "The merchants will not like this, my lord."

"The merchants serve the people," you reply. "Not the other way around."

Word spreads quickly. The people of the West begin to trust you.`,
            choices: [
                { text: 'Continue East.', next: 'east_arrival' }
            ]
        },

        west_unjust: {
            act: 'Act I — The Western Realm',
            text: `The farmer is flogged in the square. His children watch from the crowd, silent and hollow-eyed.

The merchant bows deeply and thanks you. He will remember this favor.

Your general nods with satisfaction. "Authority established, my lord."

But as you ride away, you see the faces of the people — not fear exactly, but something colder. Resignation. The look of those who have learned that power protects the powerful.

A seed of unease takes root in your chest.

Is this the kind of ruler you wish to be?`,
            choices: [
                { text: 'Continue East. Push the doubt aside.', next: 'east_arrival' },
                {
                    text: 'Turn back. Pardon the farmer and reopen the grain stores.',
                    next: 'west_redemption',
                    statChange: { justice: +2, trust: +1 }
                }
            ]
        },

        west_redemption: {
            act: 'Act I — The Western Realm',
            text: `You turn your horse around.

Your general stares. "My lord?"

"I made the wrong judgment," you say simply.

You ride back to the square. The farmer is still being held. You pardon him publicly, order the merchant's stores opened, and return the fine to the people.

It costs you pride. It costs you the merchant's goodwill.

But as you ride away the second time, the faces of the people are different. Something has shifted — not just in them, but in you.

A ruler who can admit error is rarer than a ruler who never errs.`,
            choices: [
                { text: 'Continue East.', next: 'east_arrival' }
            ]
        },

        west_balanced: {
            act: 'Act I — The Western Realm',
            text: `You punish both men — the merchant for his cruelty, the farmer for his theft — but you temper justice with mercy. The merchant's grain is redistributed. The farmer's punishment is light, his family provided for.

Neither side is fully satisfied. But both sides are heard.

The people of the West watch you carefully. You are not a ruler who plays favorites. You are not a ruler who ignores the law.

You are something rarer: a ruler who tries to be fair.`,
            choices: [
                { text: 'Continue East.', next: 'east_arrival' }
            ]
        },

        // ─── ACT II: THE EAST ───────────────────────────────────────────────────

        east_arrival: {
            act: 'Act II — The Eastern Realm',
            text: `You travel until you reach the easternmost limit — the place where the sun rises over a people who have no shelter from its heat.

They live in the open, exposed. No walls, no shade, no protection. They are not primitive — they are simply unshielded, by circumstance or by choice.

Your engineers survey the land. "We could build them shelters, my lord. It would take resources and time."

Your treasurer shakes his head. "We have campaigns ahead. The resources are needed elsewhere."

A village elder approaches and bows. "Great ruler, we ask for nothing but your blessing. We have lived this way for generations. We are content."

But you can see the children, skin cracked from the sun. The elderly, struggling.`,
            choices: [
                {
                    text: 'Allocate resources. Build shelters for the people — they need protection whether they ask or not.',
                    next: 'east_help',
                    statChange: { justice: +1, trust: +2 },
                    type: 'justice'
                },
                {
                    text: 'Respect their words. They said they are content. Move on.',
                    next: 'east_leave',
                    statChange: { justice: 0, trust: -1 }
                },
                {
                    text: 'Offer resources but let them decide — build only if they want it.',
                    next: 'east_offer',
                    statChange: { justice: +2, trust: +2 }
                }
            ]
        },

        east_help: {
            act: 'Act II — The Eastern Realm',
            text: `You order shelters built. Your engineers work alongside the people of the East, who — once they see the work beginning — join in with surprising energy.

The elder watches, arms folded, then slowly nods.

"We said we were content," he admits. "But perhaps we had forgotten what comfort felt like."

The shelters rise. Simple, strong, suited to the land.

As you prepare to leave, the elder presses a small carved stone into your hand. "For the road ahead," he says. "You will need it."

You do not know what lies ahead. But you feel the weight of the stone — and the trust it carries.`,
            choices: [
                { text: 'Continue North.', next: 'north_arrival' }
            ]
        },

        east_leave: {
            act: 'Act II — The Eastern Realm',
            text: `You respect the elder's words and move on.

Your treasurer is pleased. Your engineers are relieved.

But as you ride away, you glance back once. A child is sitting in the full glare of the sun, squinting, too tired to move to shade that doesn't exist.

You face forward again.

You told yourself it was respect for their autonomy. But a quieter voice asks: was it really? Or was it easier to leave?

The question rides with you North.`,
            choices: [
                { text: 'Continue North.', next: 'north_arrival' }
            ]
        },

        east_offer: {
            act: 'Act II — The Eastern Realm',
            text: `"We will not impose," you tell the elder. "But we offer. If you want shelters built, we will build them. If you prefer to live as you have, we will leave you in peace."

The elder is quiet for a long moment.

Then he turns to his people and speaks in their tongue. A murmur ripples through the crowd. Children tug at their parents' hands.

"We accept," the elder says finally. "Not because we are weak. But because we are wise enough to accept help when it is offered with respect."

The shelters are built. The people help. The work is shared.

This is what power looks like when it serves rather than dominates.`,
            choices: [
                { text: 'Continue North.', next: 'north_arrival' }
            ]
        },

        // ─── ACT III: THE NORTH — THE WALL ──────────────────────────────────────

        north_arrival: {
            act: 'Act III — The Northern Pass',
            text: `You travel North until you reach a narrow pass between two great mountains.

Here, a people live in terror.

They speak a language your translators struggle with, but their fear needs no translation. They point beyond the mountains — to the north — and their faces go pale.

Through careful questioning, you learn: beyond the pass live Gog and Magog. They pour through the mountains in waves, destroying crops, burning homes, taking what they wish. The people here have no army, no walls, no defense.

A spokesperson steps forward, trembling but determined.

"Great ruler — we have heard of your power. We will pay you tribute. Whatever you ask. Only help us."`,
            choices: [
                { text: 'Hear their full request before deciding.', next: 'north_listen' }
            ]
        },

        north_listen: {
            act: 'Act III — The Northern Pass',
            text: `The spokesperson explains: they want a barrier built between the two mountains — a wall that Gog and Magog cannot breach.

They offer gold. Silver. Livestock. Labor. Anything.

Your advisors are already calculating. This tribute could fund three campaigns.

You look at the people around you. Farmers. Elders. Children clinging to their mothers. They have nothing left to give — and they are offering everything.

What do you do?`,
            choices: [
                {
                    text: 'Refuse the tribute. "What God has given me is better than your payment. But I will help you — and you will work alongside us."',
                    next: 'wall_refuse_tribute',
                    statChange: { justice: +2, trust: +3 },
                    type: 'justice'
                },
                {
                    text: 'Accept the tribute. You have armies to maintain. Then build the wall.',
                    next: 'wall_accept_tribute',
                    statChange: { justice: -1, trust: -2 },
                    type: 'tyranny'
                },
                {
                    text: 'Accept only enough to cover the cost of materials. Refuse personal profit.',
                    next: 'wall_partial_tribute',
                    statChange: { justice: +1, trust: +1 }
                }
            ]
        },

        wall_refuse_tribute: {
            act: 'Act III — The Northern Pass',
            text: `The spokesperson stares at you, uncomprehending.

"You... refuse payment?"

"What God has given me is better than your gold," you say. "But I need your hands. Bring me iron — every piece you can find. Bring me copper. And bring me your people, ready to work."

A silence. Then — something breaks open in the crowd. People begin to move. Not because they are commanded. Because they are seen.

They bring iron. They bring copper. They bring their sons and daughters and grandparents.

And you work alongside them.`,
            choices: [
                { text: 'Begin the construction.', next: 'wall_construction' }
            ]
        },

        wall_accept_tribute: {
            act: 'Act III — The Northern Pass',
            text: `You accept the tribute. It is substantial — more than you expected from people who seemed so poor.

They give it without complaint. They have no choice.

Your treasurer is pleased. Your advisors are pleased.

But as the gold is loaded onto carts, you notice the spokesperson watching. Not with anger. With a kind of quiet grief — the look of someone who has learned, again, that the powerful take.

You push the feeling aside. You will still build the wall. You are not a tyrant.

But the line between ruler and extortionist is thinner than you thought.`,
            choices: [
                { text: 'Begin the construction.', next: 'wall_construction' }
            ]
        },

        wall_partial_tribute: {
            act: 'Act III — The Northern Pass',
            text: `"I will take only what covers the cost of materials," you say. "Not a coin more."

The spokesperson blinks. Recalculates. Nods slowly.

"And I need your labor," you add. "This wall will be built by your hands as much as mine. When it is done, it will be yours — not mine."

The spokesperson translates. The crowd murmurs.

Then, one by one, they begin to step forward.

Not as subjects. As partners.`,
            choices: [
                { text: 'Begin the construction.', next: 'wall_construction' }
            ]
        },

        wall_construction: {
            act: 'Act III — The Northern Pass',
            text: `The work is immense.

You direct your engineers to fill the space between the two mountains with iron — great blocks of it, layer upon layer, until the iron reaches the height of the peaks.

Then you order fires lit. Bellows pump. The iron glows red, then white.

"Bring the molten copper!" you call.

It pours over the iron in rivers of liquid metal, sealing every gap, fusing the wall into a single unbreakable mass.

The people of the pass work beside your soldiers. They carry iron. They work the bellows. They pour water. They do not rest.

Neither do you.`,
            choices: [
                { text: 'The wall is complete. Stand before it.', next: 'wall_complete' }
            ]
        },

        wall_complete: {
            act: 'Act III — The Northern Pass',
            text: `The wall stands.

Iron and copper, fused between two mountains. Gog and Magog beat against it from the other side — you can hear them, a distant thunder — but they cannot pass.

The people of the pass stand behind you, staring up at what they built together.

The spokesperson approaches. There are no words in any language adequate for this moment. They simply bow — not the bow of a subject to a ruler, but the bow of one human being to another who showed up when it mattered.

You turn to face the wall.

And then you say the words that matter most.`,
            choices: [
                { text: 'Speak.', next: 'wall_speech' }
            ]
        },

        wall_speech: {
            act: 'Act III — The Northern Pass',
            text: `"This is a mercy from my Lord," you say.

Not: I built this.
Not: Remember my name.
Not: You owe me.

"This is a mercy from my Lord. But when the promise of my Lord comes to pass, He will level it to dust. The promise of my Lord is ever true."

The wall will not last forever. No earthly thing does.

Gog and Magog will one day break through — not because the wall was weak, but because that is the nature of time and the will of God.

You built it anyway. Because the people needed it now. Because justice does not wait for permanence.

You turn from the wall and begin the journey home.`,
            choices: [
                { text: 'Reflect on the journey.', next: 'ending_check' }
            ]
        },

        // ─── ENDINGS ────────────────────────────────────────────────────────────

        ending_check: {
            act: 'Epilogue',
            text: ``,
            choices: [],
            isEndingGate: true
        },

        ending_just: {
            act: 'Epilogue — The Just Ruler',
            text: `You return home changed.

Power, you have learned, is not the ability to take. It is the ability to give — protection, fairness, dignity — to those who cannot protect themselves.

You judged the wrongdoer. You showed kindness to the righteous. You refused tribute when tribute would have been exploitation. You worked alongside the people you served.

The wall stands. The people of the pass are safe — for now, for this age.

And you have learned the hardest lesson of leadership:

The measure of a ruler is not what they build. It is who they become in the building.

---

✦ Ending: The Just Ruler ✦

You ruled with justice and humility. The earth was given to you, and you used it well.

"We established him in the land, and gave him the means to all things." — Surah Al-Kahf, 18:84`,
            choices: []
        },

        ending_mixed: {
            act: 'Epilogue — The Striving Ruler',
            text: `You return home with the weight of your choices.

You were not always just. You were not always wrong. You tried — and trying, you learned, is not the same as succeeding.

The wall stands. The people of the pass are safe.

But you carry the memory of the farmer's children watching their father be punished. The elder's quiet grief when the tribute was taken. The moments where power slipped from service into self-interest.

A ruler who sees their own failures clearly is not a failed ruler.

They are a ruler who might yet become something better.

---

✦ Ending: The Striving Ruler ✦

You made mistakes. You also made amends. The journey continues.

"And he followed a road." — Surah Al-Kahf, 18:85`,
            choices: []
        },

        ending_unjust: {
            act: 'Epilogue — The Cautionary Ruler',
            text: `You return home with the wall built and the tribute collected.

By any measure, the mission was a success. The people of the pass are protected. Your treasury is fuller. Your generals are satisfied.

But something is missing.

In the quiet of the journey home, you find yourself thinking of faces. The farmer's children. The elder's grief. The spokesperson's hollow bow.

Power without justice is just force with a better name.

The wall will stand for a time. But what you built inside yourself — or failed to build — will outlast it.

There is still time to change. The road is long.

---

✦ Ending: The Cautionary Ruler ✦

You had the means to all things. The question is what you chose to do with them.

"Either punish or show them kindness." — Surah Al-Kahf, 18:86`,
            choices: []
        }
    }
};
