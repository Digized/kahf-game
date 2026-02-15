// Cave Sleepers - Scene Data
// Story of the People of the Cave (Ashab al-Kahf)

const SCENES = {
    start: {
        location: "The City Square",
        year: 250,
        atmosphere: "ancient",
        visual: `
    ╔═══════════════════════════════════╗
    ║  ⛏    CITY OF EPHESUS    ⛏     ║
    ║                                   ║
    ║      🏛️   🏛️   🏛️   🏛️         ║
    ║                                   ║
    ║         🧍 🧍 🧍 🧍              ║
    ╚═══════════════════════════════════╝
`,
        text: `The marble gods loom over the city square, their blank eyes watching. Tomorrow, Emperor Decius arrives. Every citizen must gather here to offer incense to the imperial gods.

You stand with your companions—Maksymilian, Jamblichos, Martin, Dionysius, Antoninus, Constantine. Seven young believers in the One God, in a world that demands worship of many.

Your hands tremble. Not from fear. From conviction.

You will not bow.`,
        choices: [
            {
                text: "Meet with the others tonight in secret",
                next: "secret_meeting",
                faithChange: 0
            },
            {
                text: "Speak out now, in the square, and declare your faith",
                next: "public_declaration",
                faithChange: 10,
                consequences: "Bold but dangerous"
            }
        ]
    },

    public_declaration: {
        location: "The City Square",
        year: 250,
        atmosphere: "ancient",
        visual: `
    ╔═══════════════════════════════════╗
    ║          ⚠️  DANGER  ⚠️           ║
    ║                                   ║
    ║      🏛️   🏛️   🏛️   🏛️         ║
    ║                                   ║
    ║    🧍    ⚔️👮⚔️    🧍           ║
    ╚═══════════════════════════════════╝
`,
        text: `You step forward, your voice cutting through the marketplace noise.

"Hear me, people of Ephesus! There is no god but the One God, Creator of all things!"

The crowd freezes. Whispers ripple outward. You see guards turning their heads, hands moving to swords.

Maksymilian grabs your arm. "What have you done? They'll kill us all!"

The guards are approaching. You have seconds.`,
        timed: true,
        timeLimit: 8,
        choices: [
            {
                text: "Run! Lead them away from the city!",
                next: "desperate_flight",
                faithChange: -5
            },
            {
                text: "Stand firm and face them with dignity",
                next: "martyrdom_path",
                faithChange: 15
            }
        ]
    },

    martyrdom_path: {
        location: "The City Square",
        year: 250,
        atmosphere: "ancient",
        visual: `
    ╔═══════════════════════════════════╗
    ║         ✨ CONVICTION ✨          ║
    ║                                   ║
    ║           🧍 🧍 🧍               ║
    ║              ⚔️                   ║
    ║          👮 👮 👮                ║
    ╚═══════════════════════════════════╝
`,
        text: `You stand tall as the guards surround you. Your companions step beside you, forming a line.

"We will not recant," you say calmly. "Do what you must."

The captain of the guard studies your faces. Young. Resolute. Unafraid.

Then, something unexpected. He lowers his sword.

"You're just children," he says quietly. "The emperor isn't here yet. Go. Flee the city. I can give you until dawn."

He glances at his men. They nod, slowly.

"Go," he repeats. "Before I change my mind."`,
        choices: [
            {
                text: "Accept this mercy. Leave the city tonight.",
                next: "secret_meeting",
                faithChange: 5
            }
        ]
    },

    desperate_flight: {
        location: "City Streets",
        year: 250,
        atmosphere: "ancient",
        visual: `
    ╔═══════════════════════════════════╗
    ║      🏚️        🏚️       🏚️      ║
    ║                                   ║
    ║    🧍💨  🧍💨  🧍💨            ║
    ║                                   ║
    ║           ⚔️👮 👮⚔️              ║
    ╚═══════════════════════════════════╝
`,
        text: `You run. Your companions scatter through the narrow streets, guards shouting behind you.

The city is a maze, but you know it well. You lead them through markets, between buildings, across rooftops.

An hour later, you regroup in an abandoned warehouse near the eastern wall. Everyone made it. Breathing hard, but safe.

For now.

"They'll be watching every gate," Jamblichos says. "We can't stay here."

Constantine points east. "The hills beyond the city. There are caves. No one goes there—they think they're cursed."

"Then that's where we go," you decide.`,
        choices: [
            {
                text: "Wait until nightfall, then escape",
                next: "night_escape",
                faithChange: 0
            }
        ]
    },

    secret_meeting: {
        location: "Abandoned Warehouse",
        year: 250,
        atmosphere: "ancient",
        visual: `
    ╔═══════════════════════════════════╗
    ║          🌙 NIGHT 🌙             ║
    ║                                   ║
    ║       🧍  🧍  🧍  🧍            ║
    ║         🧍  🕯️  🧍              ║
    ║                                   ║
    ╚═══════════════════════════════════╝
`,
        text: `You meet in secret after dark. Seven friends, bound by faith, facing impossible odds.

"The decree comes tomorrow," Maksymilian says. "Bow to the gods or die."

"We don't bow," Martin states. Simple. Final.

"Then we leave," Antoninus suggests. "Beyond the city, in the hills. There are caves. We can hide until the persecution passes."

Dionysius shakes his head. "And if it doesn't pass? We hide forever?"

You close your eyes. A prayer forms in your heart. <em>Guide us. Protect us. We trust in You.</em>

The decision rests with you.`,
        choices: [
            {
                text: "We flee to the cave. Trust in God's protection.",
                next: "gather_supplies",
                faithChange: 5
            },
            {
                text: "We should try to warn others in the city first",
                next: "warning_mission",
                faithChange: 3,
                risk: true
            }
        ]
    },

    warning_mission: {
        location: "City Streets",
        year: 250,
        atmosphere: "ancient",
        visual: `
    ╔═══════════════════════════════════╗
    ║          ⏰ DANGER ⏰            ║
    ║       🏚️        🏚️       🏚️     ║
    ║                                   ║
    ║         🧍  🚪  🧍              ║
    ║                                   ║
    ╚═══════════════════════════════════╝
`,
        text: `You split up, moving through the dark streets to warn other believers.

At each door, the same whispered conversation. The same choice offered. Most choose to hide, to blend in, to survive.

A few—a very few—say they will come with you.

But time is running out. You've been at this for hours. Dawn is approaching, and you still need to gather supplies and reach the cave.`,
        timed: true,
        timeLimit: 7,
        choices: [
            {
                text: "We've done what we can. Time to go.",
                next: "gather_supplies",
                faithChange: 2
            },
            {
                text: "One more house. Just one more.",
                next: "risky_warning",
                faithChange: 5,
                risk: true
            }
        ]
    },

    risky_warning: {
        location: "A Believer's Home",
        year: 250,
        atmosphere: "ancient",
        visual: `
    ╔═══════════════════════════════════╗
    ║           🏚️ HOME 🏚️            ║
    ║                                   ║
    ║        🧍  🧍  👴              ║
    ║                                   ║
    ║         "Be swift..."             ║
    ╚═══════════════════════════════════╝
`,
        text: `The old man—a elder of the believers—listens to your plan. His eyes are sad but understanding.

"I am too old to run to caves," he says. "But you... you carry something forward. Hope. Faith."

He presses a small pouch into your hands. Coins. Enough to buy food.

"Go with God," he whispers. "And perhaps... perhaps this darkness will pass."

You embrace him, knowing you may never see him again.

Outside, the sky is beginning to lighten. You must run.`,
        choices: [
            {
                text: "Race to the rendezvous point",
                next: "gather_supplies",
                faithChange: 3
            }
        ]
    },

    gather_supplies: {
        location: "Eastern Market",
        year: 250,
        atmosphere: "ancient",
        visual: `
    ╔═══════════════════════════════════╗
    ║       🌅 DAWN APPROACHING 🌅      ║
    ║                                   ║
    ║      🛒  🧍  🧍  🥖            ║
    ║                                   ║
    ║           ⏰ HURRY! ⏰            ║
    ╚═══════════════════════════════════╝
`,
        text: `The market is just opening. You pool your money—enough for some bread, dried meat, water.

"How long will we need to hide?" Constantine asks.

"Days," you hope. "Maybe weeks."

The vendor wraps the food. As you turn to leave, you notice guards entering the square at the far end.

They haven't seen you yet. But they will.`,
        timed: true,
        timeLimit: 6,
        choices: [
            {
                text: "Walk calmly. Don't attract attention.",
                next: "night_escape",
                faithChange: 0
            },
            {
                text: "Run now! To the eastern gate!",
                next: "close_call",
                faithChange: -3
            }
        ]
    },

    close_call: {
        location: "City Gate",
        year: 250,
        atmosphere: "ancient",
        visual: `
    ╔═══════════════════════════════════╗
    ║           ⚠️ ALERT ⚠️            ║
    ║                                   ║
    ║  🧍🧍  💨        ⚔️👮           ║
    ║        🚪                         ║
    ║      "STOP THEM!"                 ║
    ╚═══════════════════════════════════╝
`,
        text: `You run. The shout goes up behind you: "STOP THEM!"

The eastern gate looms ahead. The guard there sees you coming, sees the soldiers chasing. His hand goes to his spear.

Then—he steps aside.

You don't understand why. You don't stop to ask. You and your companions pour through the gate and into the hills beyond.

Behind you, the city wakes. Ahead, rocky slopes and salvation.

<em>Thank you,</em> you pray silently. <em>Thank you for this mercy.</em>`,
        choices: [
            {
                text: "Continue toward the cave",
                next: "night_escape",
                faithChange: 5
            }
        ]
    },

    night_escape: {
        location: "Rocky Hills",
        year: 250,
        atmosphere: "ancient",
        visual: `
    ╔═══════════════════════════════════╗
    ║      🗻 MOUNT PION 🗻            ║
    ║         ⛰️    ⛰️                 ║
    ║                                   ║
    ║          🧍🧍🧍                  ║
    ║        🐕                         ║
    ╚═══════════════════════════════════╝
`,
        text: `You climb for hours. The city falls away below, becoming a collection of white buildings in the distance.

The hills are barren, unwelcoming. Perfect.

Halfway up the slope, a dog appears. Thin, wild-looking, but calm. It falls into step beside Constantine.

"Looks like we have an eighth companion," Constantine says, scratching the dog's ears.

Ahead, you see it: a dark opening in the rock face. The cave.`,
        choices: [
            {
                text: "Enter the cave",
                next: "cave_entrance",
                faithChange: 0
            }
        ]
    },

    cave_entrance: {
        location: "The Cave",
        year: 250,
        atmosphere: "cave",
        visual: `
    ╔═══════════════════════════════════╗
    ║        🌑 THE CAVE 🌑            ║
    ║                                   ║
    ║    ⛰️                           ⛰️ ║
    ║      ⬛⬛⬛⬛⬛                  ║
    ║       🧍🧍🐕🧍                  ║
    ╚═══════════════════════════════════╝
`,
        text: `The cave is larger than you expected. Deep. Cool. Silent.

You venture inside, letting your eyes adjust to the darkness. The ceiling arches high above. The floor is sandy, dry. At the back, the passage narrows, leading deeper into the mountain.

"We'll be safe here," Maksymilian says. His voice echoes slightly.

You set down your packs. Distribute the food. Light a small fire near the entrance.

The dog curls up by the opening, as if standing guard.

For the first time in days, you feel... peace.`,
        choices: [
            {
                text: "Offer a prayer of thanks",
                next: "prayer_scene",
                faithChange: 5
            },
            {
                text: "Rest. You're exhausted.",
                next: "rest_decision",
                faithChange: 0
            }
        ]
    },

    prayer_scene: {
        location: "The Cave",
        year: 250,
        atmosphere: "cave",
        visual: `
    ╔═══════════════════════════════════╗
    ║           ✨ PRAYER ✨           ║
    ║                                   ║
    ║      🧍 🧍 🧍 🧍               ║
    ║        🧍 🧍 🧍                 ║
    ║           🐕                      ║
    ╚═══════════════════════════════════╝
`,
        text: `You gather in a circle. Seven souls, bound by something stronger than fear.

The words come naturally:

<em>"Our Lord, grant us mercy from Yourself and provide for us right guidance in our affair."</em>

The cave seems to absorb the prayer, holding it in the stone. You feel... seen. Protected.

"How long do we wait here?" Dionysius asks quietly.

"As long as it takes," you answer. "Days. Weeks. Whatever God wills."

The exhaustion hits you then. You've been running on fear and faith. Now, safe, your body demands rest.`,
        choices: [
            {
                text: "Sleep. Trust in God's protection.",
                next: "the_sleep",
                faithChange: 5
            }
        ]
    },

    rest_decision: {
        location: "The Cave",
        year: 250,
        atmosphere: "cave",
        visual: `
    ╔═══════════════════════════════════╗
    ║         😴 EXHAUSTION 😴          ║
    ║                                   ║
    ║        🧍  🧍  🧍                ║
    ║          💤  💤                   ║
    ║         🐕                        ║
    ╚═══════════════════════════════════╝
`,
        text: `The adrenaline drains away. You're safe. You're together. You're alive.

One by one, your companions find spots to rest. The sandy floor isn't comfortable, but it doesn't matter.

"Someone should keep watch," Martin suggests, yawning.

"I'll take first watch," you volunteer.

But even as you say it, your eyelids grow heavy. The dog at the entrance seems alert enough. And your body is so, so tired...

<em>Just for a moment,</em> you think. <em>Just rest for a moment...</em>`,
        choices: [
            {
                text: "Close your eyes...",
                next: "the_sleep",
                faithChange: 0
            }
        ]
    },

    the_sleep: {
        location: "The Cave",
        year: 250,
        atmosphere: "cave",
        visual: `
    ╔═══════════════════════════════════╗
    ║          💫 SLEEP 💫             ║
    ║                                   ║
    ║       😴 😴 😴 😴               ║
    ║         😴 😴 😴                 ║
    ║           🐕💤                    ║
    ╚═══════════════════════════════════╝
`,
        text: `You close your eyes.

The darkness is warm. Welcoming. You feel the presence of your companions, breathing slowly, peacefully.

<em>We are in Your hands,</em> you think, and sleep takes you.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The sleep is deep. Profound. Without dreams.

Without time.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

When you wake...`,
        choices: [
            {
                text: "Open your eyes",
                next: "awakening",
                faithChange: 0
            }
        ]
    },

    awakening: {
        location: "The Cave",
        year: 559,
        atmosphere: "cave",
        visual: `
    ╔═══════════════════════════════════╗
    ║        ⚡ AWAKENING ⚡           ║
    ║                                   ║
    ║       🧍 😲 😲 😲               ║
    ║         😲 😲 😲                 ║
    ║           🐕❓                    ║
    ╚═══════════════════════════════════╝
`,
        text: `Your eyes open.

Something is wrong. Your body feels... strange. Heavy and light at once. Your joints ache with a deep, hollow exhaustion.

Around you, your companions are stirring, making sounds of confusion.

"How long did we sleep?" Maksymilian croaks. His voice sounds rough, unused.

You push yourself up. The cave looks the same, but... different. Older? The entrance seems weathered. And the light coming through is wrong somehow.

"Hours, maybe," Jamblichos says. But he doesn't sound convinced.

You're hungry. Desperately hungry.`,
        choices: [
            {
                text: "Check the supplies",
                next: "check_supplies",
                faithChange: 0
            },
            {
                text: "Go to the cave entrance and look outside",
                next: "first_look",
                faithChange: 0
            }
        ]
    },

    check_supplies: {
        location: "The Cave",
        year: 559,
        atmosphere: "cave",
        visual: `
    ╔═══════════════════════════════════╗
    ║          🎒 SUPPLIES 🎒          ║
    ║                                   ║
    ║          🧍  📦  🧍              ║
    ║                                   ║
    ║         "This is odd..."          ║
    ╚═══════════════════════════════════╝
`,
        text: `You check the packs. The food you brought is... gone. Not eaten. Just... aged into dust.

The leather bags are brittle, cracked. The metal buckles are tarnished, almost rusted through.

"That's impossible," Constantine says, holding up what was once a water skin. It crumbles in his hands.

"How long were we asleep?" Dionysius whispers.

No one answers. Because no one knows.

But it's more than hours. More than days.

<em>Much</em> more.`,
        choices: [
            {
                text: "Go to the entrance and look outside",
                next: "first_look",
                faithChange: -5
            }
        ]
    },

    first_look: {
        location: "Cave Entrance",
        year: 559,
        atmosphere: "cave",
        visual: `
    ╔═══════════════════════════════════╗
    ║       🌄 THE WORLD 🌄            ║
    ║                                   ║
    ║  🧍😮  ⛰️          🏛️?         ║
    ║              🏛️?     🏛️?        ║
    ║         Everything is different   ║
    ╚═══════════════════════════════════╝
`,
        text: `You step to the cave entrance. The dog follows, whining softly.

The view takes your breath away.

The city is still there. But it's... <em>different.</em> The buildings have changed. There are new structures you don't recognize. The great temple of Artemis—you can't see it. Where is it?

And on the hilltop across the valley, a building with a strange symbol. A cross?

"What happened?" Martin breathes beside you.

"We need to know," you say. "Someone has to go down there. Carefully."`,
        choices: [
            {
                text: "I'll go. The rest of you stay hidden.",
                next: "volunteer_mission",
                faithChange: 5
            },
            {
                text: "We'll draw lots. Whoever God chooses goes.",
                next: "draw_lots",
                faithChange: 3
            }
        ]
    },

    volunteer_mission: {
        location: "Cave Entrance",
        year: 559,
        atmosphere: "cave",
        visual: `
    ╔═══════════════════════════════════╗
    ║        👋 FAREWELL 👋            ║
    ║                                   ║
    ║     🧍  🧍→  🧍  🧍            ║
    ║                                   ║
    ║       "Be careful..."             ║
    ╚═══════════════════════════════════╝
`,
        text: `"I'll go," you say firmly. "If it's dangerous, better only one of us is at risk."

Your companions protest, but you're decided. You dig into your pocket, finding the coins the old believer gave you. Ancient coins, but surely still good?

You'll go to the market. Buy food. Listen. Learn what's happened.

"If I'm not back by sunset," you tell them, "assume the worst. Flee deeper into the mountains."

Martin grips your shoulder. "God protect you."

You nod, and begin the descent into a world you no longer recognize.`,
        choices: [
            {
                text: "Walk carefully toward the city",
                next: "approach_city",
                faithChange: 0
            }
        ]
    },

    draw_lots: {
        location: "The Cave",
        year: 559,
        atmosphere: "cave",
        visual: `
    ╔═══════════════════════════════════╗
    ║          🎲 LOTS 🎲             ║
    ║                                   ║
    ║        🧍🧍🧍🧍                  ║
    ║          "It's me."               ║
    ║                                   ║
    ╚═══════════════════════════════════╝
`,
        text: `You find seven small stones. Mark one with charcoal. Place them in a bag.

One by one, you draw.

Maksymilian. Not him.
Jamblichos. Not him.
Martin. Not him.

You reach in. Pull out a stone.

The marked one.

"It's me," you say quietly.

The others nod. This is how it should be. Not chance. Providence.

You pocket the old coins and prepare to descend.`,
        choices: [
            {
                text: "Begin the journey to the city",
                next: "approach_city",
                faithChange: 3
            }
        ]
    },

    approach_city: {
        location: "Road to Ephesus",
        year: 559,
        atmosphere: "future",
        visual: `
    ╔═══════════════════════════════════╗
    ║      🚶 APPROACHING CITY 🚶      ║
    ║                                   ║
    ║   🗻  ⛰️           🏛️✝️         ║
    ║              🏛️✝️    🏛️✝️       ║
    ║         "Everything changed..."   ║
    ╚═══════════════════════════════════╝
`,
        text: `The road is familiar yet strange. The same stones, but worn differently. The same path, but the markers are gone.

As you get closer, you see people. They're dressed... oddly. Clothes you don't recognize. And they move with such ease. No fear. No looking over shoulders.

You pull your cloak tighter, hoping you don't stand out.

At the city gate—a different gate than you remember—you see that symbol again. A cross. Everywhere.

<em>What does it mean?</em>

You enter the city.`,
        choices: [
            {
                text: "Head to the market district",
                next: "market_scene",
                faithChange: 0
            }
        ]
    },

    market_scene: {
        location: "Ephesus Market",
        year: 559,
        atmosphere: "future",
        visual: `
    ╔═══════════════════════════════════╗
    ║        🏪 MARKET 🏪             ║
    ║                                   ║
    ║    🧍‍♂️  🥖  🧍‍♀️    🥬  🧍       ║
    ║                                   ║
    ║         "That's odd..."           ║
    ╚═══════════════════════════════════╝
`,
        text: `The market bustles with life. You approach a baker, his stall laden with bread.

"Two loaves, please," you say, pulling out your coins.

The baker takes one, examines it, and his eyes go wide.

"Where did you get this?" he asks, his voice strange.

"I... it's my money," you stammer.

He turns the coin over. "This is... this is from the time of Decius. Three hundred years ago!"

Your heart stops.

Three. Hundred. Years.

The baker's voice rises. "EVERYONE! LOOK AT THIS COIN!"

People gather, murmuring, pointing.`,
        timed: true,
        timeLimit: 6,
        choices: [
            {
                text: "Run! Back to the cave!",
                next: "flee_market",
                faithChange: -5
            },
            {
                text: "Stay calm. Answer their questions.",
                next: "reveal_truth",
                faithChange: 5
            }
        ]
    },

    flee_market: {
        location: "Market Streets",
        year: 559,
        atmosphere: "future",
        visual: `
    ╔═══════════════════════════════════╗
    ║          💨 PANIC 💨             ║
    ║                                   ║
    ║   🧍💨         🏛️                ║
    ║              🧍‍♂️ 🧍‍♀️             ║
    ║        "WAIT! COME BACK!"         ║
    ╚═══════════════════════════════════╝
`,
        text: `You run, heart pounding, pushing through the crowd.

But they're not chasing you with weapons. They're following with... curiosity? Concern?

"Please!" someone calls. "We mean no harm!"

You don't stop until you're out of the market, gasping for breath in a side street.

Behind you, the crowd hesitates, giving you space.

An old priest steps forward slowly, hands raised peacefully.

"Child," he says gently. "Child, where have you been?"`,
        choices: [
            {
                text: "Tell him everything",
                next: "reveal_truth",
                faithChange: 3
            }
        ]
    },

    reveal_truth: {
        location: "Ephesus Market",
        year: 559,
        atmosphere: "future",
        visual: `
    ╔═══════════════════════════════════╗
    ║        😲 REVELATION 😲          ║
    ║                                   ║
    ║       🧓  ✝️  🧍                 ║
    ║     🧍‍♂️  🧍‍♀️  🧍‍♂️  🧍‍♀️           ║
    ║         "Impossible..."           ║
    ╚═══════════════════════════════════╝
`,
        text: `The words pour out. The persecution. The flight. The cave. The sleep.

"We thought it was one night," you say, voice shaking. "But you say... three hundred years?"

The priest's eyes fill with tears. The crowd is silent, stunned.

"The persecution of Decius," the old man whispers. "It ended long ago. The Emperor himself... Constantine... made Christianity the faith of the empire."

Your mind reels. Christianity? The followers of Jesus? That's what the crosses mean?

"You don't worship the old gods anymore?" you ask.

"No, child. We worship the One God. As you do."

The revelation crashes over you like a wave.

<em>We're safe. The world changed. We can worship freely.</em>`,
        choices: [
            {
                text: "Ask to see their place of worship",
                next: "basilica_visit",
                faithChange: 5
            },
            {
                text: "Request they send for your companions",
                next: "reunion",
                faithChange: 3
            }
        ]
    },

    basilica_visit: {
        location: "The Basilica",
        year: 559,
        atmosphere: "future",
        visual: `
    ╔═══════════════════════════════════╗
    ║         ⛪ BASILICA ⛪           ║
    ║                                   ║
    ║      ✨✝️✨                      ║
    ║        🧍  🧓                    ║
    ║      "This is beautiful..."       ║
    ╚═══════════════════════════════════╝
`,
        text: `They lead you to a great building—a basilica, they call it. Where the temple of Artemis once stood.

Inside, it's unlike anything you've known. Light streams through high windows. People kneel in prayer, unafraid, un-hidden.

"Three hundred years ago, your faith cost you everything," the priest says softly. "You fled to save your lives. But God... God preserved you. To see this day. To see the triumph of faith."

You kneel, overwhelmed. Tears streaming.

<em>You preserved us. For this. To witness this.</em>

"Your companions," the priest asks gently. "They're still in the cave?"

You nod.

"Bring them down. Let them see. Let them know: the persecution is over."`,
        choices: [
            {
                text: "Return to the cave with the good news",
                next: "reunion",
                faithChange: 10
            }
        ]
    },

    reunion: {
        location: "The Cave",
        year: 559,
        atmosphere: "cave",
        visual: `
    ╔═══════════════════════════════════╗
    ║         🎉 REUNION 🎉            ║
    ║                                   ║
    ║    🧍 😊 😊 😊 😊              ║
    ║      😊 😊 🧓✝️                 ║
    ║           🐕                      ║
    ╚═══════════════════════════════════╝
`,
        text: `You climb back to the cave, accompanied by the priest and several gentle townsfolk.

Your companions see you coming and rush out, relief and confusion on their faces.

"It's safe!" you call. "Come down! You have to see!"

You tell them everything. Three hundred years. The changed world. The end of persecution. The triumph of faith in One God.

At first, they can't believe it. But the priest confirms it. The people confirm it.

Slowly, the wonder dawns.

Maksymilian laughs—a sound of pure, incredulous joy.
Martin weeps.
Constantine embraces the priest, this stranger who shares their faith.

"Why?" Jamblichos asks the question that burns in all of you. "Why were we preserved? What is our purpose?"`,
        choices: [
            {
                text: "Listen to the priest's answer",
                next: "purpose_revealed",
                faithChange: 0
            }
        ]
    },

    purpose_revealed: {
        location: "The Cave",
        year: 559,
        atmosphere: "cave",
        visual: `
    ╔═══════════════════════════════════╗
    ║        ✨ PURPOSE ✨             ║
    ║                                   ║
    ║      🧍 🧍 🧍 🧍               ║
    ║        🧍 🧓✝️ 🧍               ║
    ║                                   ║
    ╚═══════════════════════════════════╝
`,
        text: `The old priest looks at each of you with profound reverence.

"Some among us doubted," he says. "They asked: does God truly have power over death? Over time? Can the faithful truly be resurrected?"

He gestures to you all.

"You are living proof. You are a sign. God preserved you through centuries—not in death, but in sleep. You fled in fear, and woke to victory. You are testimony to God's power. To His perfect timing."

The weight of it settles over you.

You weren't abandoned in that cave. You were <em>kept.</em> Preserved. For witness.

"What happens now?" you ask quietly.

"That," the priest says with a gentle smile, "is between you and God."`,
        choices: [
            {
                text: "We'll tell our story. Bear witness.",
                next: "ending_witness",
                faithChange: 10
            },
            {
                text: "We need time to understand this gift we've been given.",
                next: "ending_reflection",
                faithChange: 5
            }
        ]
    },

    ending_witness: {
        location: "Ephesus",
        year: 559,
        atmosphere: "future",
        visual: `
    ╔═══════════════════════════════════╗
    ║      ✨ WITNESSES ✨             ║
    ║                                   ║
    ║    🧍🧍🧍 → 🧍‍♂️🧍‍♀️🧍‍♂️           ║
    ║                                   ║
    ║      "Listen to our story..."     ║
    ╚═══════════════════════════════════╝
`,
        text: `The seven of you descend into the new Ephesus together. The dog trots beside you, tail wagging.

People gather to hear your story. You tell it simply, truthfully. The persecution. The flight. The sleep. The awakening.

You become living proof of faith's power. Of God's providence. Of patience rewarded beyond imagining.

The tale spreads. Throughout the empire, people speak of the Seven Sleepers of Ephesus. The young believers who fled in fear and woke to triumph.

Your names become legend: Constantine, Jamblichos, Maximilian, Martin, Dionysius, Antoninus, and you.

<strong>You chose faith under pressure.</strong>
<strong>You trusted in the unseen.</strong>
<strong>You witnessed the impossible.</strong>

And your story—like you—endures.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<em>THE END</em>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
        choices: []
    },

    ending_reflection: {
        location: "The Cave",
        year: 559,
        atmosphere: "cave",
        visual: `
    ╔═══════════════════════════════════╗
    ║      🌙 REFLECTION 🌙            ║
    ║                                   ║
    ║        🧍 🧍 🧍                  ║
    ║          🧍 🧍                    ║
    ║           ✨                      ║
    ╚═══════════════════════════════════╝
`,
        text: `You return to the cave one last time. All seven of you, sitting in the place where you slept for three centuries.

The world outside has changed beyond recognition. But in here, in this sanctuary, something timeless remains.

"We were seven frightened children," Maksymilian says softly. "We woke as witnesses to miracles."

"What do we do with this gift?" Antoninus wonders.

You sit in silence for a long time. Praying. Reflecting. Marveling.

The answers will come. But for now, it's enough to sit here together. Seven souls bound by faith, preserved by mercy, witnesses to the impossible.

<strong>You chose faith under pressure.</strong>
<strong>You trusted when trust was all you had.</strong>
<strong>You woke to wonder.</strong>

The rest of your story is yet to be written.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<em>THE END</em>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
        choices: []
    }
};
