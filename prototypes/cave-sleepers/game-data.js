// Cave Sleepers — Game Data
const gameData = {
    currentScene: 'start',
    companionsTrust: 3, // Represents how grounded you stay with your companions
    maxTrust: 3,
    choices: [],

    scenes: {
        start: {
            text: `You are one of the youth of the city.

You have known comfort, family, trade routes and marketplace gossip. You have also known fear.

The new emperor demands worship of idols. Stone faces, cold altars, incense that smells like betrayal.

Your friends have refused. You have refused.

And now the city is no longer safe.`,

            choices: [
                { text: 'Meet with the others', next: 'gathering' }
            ]
        },

        gathering: {
            text: `You gather in secret — seven of you, maybe eight depending on who you count.

Their faces are pale, determined. One of them, the youngest, still has dust on his cloak from running.

"They're arresting anyone who won't bow," he says. "The merchant quarter is emptying."

Another speaks: "We could flee. There's a cave in the hills. My uncle used to shepherd there."

The room goes quiet. Leaving means abandoning everything. Staying means martyrdom or compromise.`,

            choices: [
                { text: 'We leave tonight. Together.', next: 'flight' },
                { text: 'Are we sure there's no other way?', next: 'hesitation' }
            ]
        },

        hesitation: {
            text: `The question hangs in the air.

One of them — you think his name is Yamlikha — shakes his head. "There is no negotiating with empire. They want our souls, not our taxes."

Another adds: "If we stay, we die. Or worse — we become like them."

The youngest looks at you. "What do you think?"`,

            choices: [
                { text: 'We leave. Now.', next: 'flight' }
            ]
        },

        flight: {
            text: `You slip out before dawn, taking only what you can carry. Cloaks. Water skins. Bread that will go stale in two days.

The city gates are watched, but the shepherd paths are not.

You walk in silence, the sun rising behind you. No one looks back.

By midday, you reach the cave. It is dark, cool, hidden by overgrowth. Safe.`,

            choices: [
                { text: 'Enter the cave', next: 'cave_entrance' }
            ]
        },

        cave_entrance: {
            text: `Inside, the air is still. The sunlight barely reaches past the entrance.

You sit in a circle. Someone lights a small fire. The dog — one of you brought a dog — curls up near the warmth.

"We should pray," Yamlikha says.

You bow your heads. The words come haltingly, desperately:

*"Our Lord, grant us mercy from Yourself, and provide for us right guidance in our affair."*`,

            choices: [
                { text: 'Rest here', next: 'sleep_descends' }
            ]
        },

        sleep_descends: {
            text: `You lie down on the stone floor, exhausted.

The last thing you remember is the sound of breathing — yours, your companions', the dog's steady rhythm.

The cave is quiet.

The world outside continues without you.

And you sleep.`,

            choices: [
                { text: '...', next: 'waking' }
            ]
        },

        waking: {
            text: `You wake suddenly, heart pounding.

How long were you asleep? Hours? A full day?

The cave is dim. Your companions are stirring, groaning, stretching.

"Is it night already?" someone asks.

Your stomach growls. The bread is still in the sack, but it feels like you haven't eaten in ages.`,

            choices: [
                { text: 'Check the cave entrance', next: 'entrance_check' }
            ]
        },

        entrance_check: {
            text: `You move to the entrance. Sunlight filters through the vines — it's late morning, maybe midday.

The world outside looks... the same. Hills, sky, silence.

Yamlikha joins you. "We should send someone to the city. To buy food, to see if it's safe."

You nod. It makes sense. You're hungry. You need to know if the persecution has ended.

"Who should go?"`,

            choices: [
                { text: 'I'll go', next: 'volunteer_self' },
                { text: 'Yamlikha should go — he knows the markets', next: 'yamlikha_volunteers' }
            ]
        },

        volunteer_self: {
            text: `"I'll go," you say. "I know the back routes."

Yamlikha nods, then presses silver coins into your palm. Old currency, stamped with the emperor's face.

"Be careful. Don't draw attention. If they're still hunting us—"

"I know," you interrupt. "I'll be quick."

You take a waterskin, pull your hood up, and step into the daylight.`,

            choices: [
                { text: 'Walk toward the city', next: 'city_approach_self' }
            ]
        },

        yamlikha_volunteers: {
            text: `"You should go, Yamlikha," you say. "You know the bakers, the coin merchants. You can blend in."

He nods slowly, gathering the coins. "If I'm not back by sunset—"

"Don't say that."

"If I'm not back," he continues, "don't come looking. Stay hidden."

You watch him leave, his silhouette shrinking against the hills.

You wait.`,

            choices: [
                { text: 'Wait in the cave', next: 'yamlikha_returns' }
            ]
        },

        city_approach_self: {
            text: `The walk is longer than you remember.

As you crest the final hill, you stop.

The city is... wrong.

The walls are the same shape, but the stone is weathered. The markets have shifted. There are new towers. The temple you feared — the one with the idols — is a ruin.

Your heart hammers.

How long were we asleep?`,

            choices: [
                { text: 'Enter the city gates', next: 'gates_self' },
                { text: 'Turn back immediately', next: 'retreat_early', lowersTrust: true }
            ]
        },

        gates_self: {
            text: `You approach the gates. The guards barely glance at you.

Inside, the streets are familiar but transformed. The language sounds right, but the accents are strange. People wear different clothes — still modest, but the cuts and colors are foreign.

You approach a baker's stall.

"Bread, please." You hold out a coin.

The baker takes it, frowns, then stares. "Where did you get this?"

"I... it's silver, isn't it?"

"It's *old*," he breathes. "This is from the time of the tyrant emperor. Before the awakening. Before the city turned to God."`,

            choices: [
                { text: '"How long ago was that?"', next: 'reveal_time' }
            ]
        },

        reveal_time: {
            text: `The baker's eyes widen. "Three hundred years. Maybe more."

The world tilts.

Three. Hundred. Years.

"Are you ill?" the baker asks. "You've gone pale."

You stumble backward. The coin falls from your hand. People are staring now.

"The sleepers," someone whispers. "The story is true. They're waking up."`,

            choices: [
                { text: 'Run back to the cave', next: 'return_panic' },
                { text: 'Stay and listen', next: 'crowd_gathers_self' }
            ]
        },

        return_panic: {
            text: `You run.

Past the gates, through the hills, lungs burning.

When you reach the cave, your companions are waiting.

"What happened? Where's the food?"

You collapse, gasping. "We slept. We slept for *centuries*."

The silence is absolute.

Then, slowly, they understand.`,

            choices: [
                { text: 'Tell them everything', next: 'companions_react' }
            ]
        },

        crowd_gathers_self: {
            text: `You stay, frozen.

A crowd forms. They're not hostile — they're *awed*.

"The Sleepers of the Cave," an old woman says, tears in her eyes. "We thought you were a parable."

"You ran from the tyrant," a scholar adds. "God preserved you. You're proof — proof that faith outlasts empires."

Someone touches your cloak. "Bless us. You've seen the old world and the new."

This is too much. Too fast.`,

            choices: [
                { text: 'Ask to be taken to the cave', next: 'crowd_follows' },
                { text: 'Break free and run', next: 'return_panic' }
            ]
        },

        crowd_follows: {
            text: `"Take me back to the cave," you say. "My companions—"

"We'll come with you," the scholar says. "This is a miracle. The governor must know. The people must see."

You try to protest, but they're already moving, a tide of reverence and curiosity.

You lead them to the hills, dread growing with each step.`,

            choices: [
                { text: 'Approach the cave', next: 'cave_discovered' }
            ]
        },

        yamlikha_returns: {
            text: `Hours pass. Then, finally, you hear footsteps — running, frantic.

Yamlikha bursts into the cave, wild-eyed.

"We need to leave. NOW."

"What happened?"

He's shaking. "The city — it's not our city. The coin I used — they said it was ancient. They called me 'sleeper.' They're coming."

One of your companions stands. "How long were we asleep?"

"Three hundred years," Yamlikha whispers. "Maybe more."`,

            choices: [
                { text: 'Process the truth', next: 'companions_react' }
            ]
        },

        companions_react: {
            text: `The words don't make sense.

Three hundred years.

Your parents are dust. The emperor you fled is dust. The world you knew is gone.

"Everyone we loved is dead," someone says flatly.

Another: "But we're alive. God kept us alive."

The youngest starts crying.

Yamlikha looks at you. "What do we do?"`,

            choices: [
                { text: 'We stay hidden. This world isn't ours.', next: 'choose_isolation' },
                { text: 'We face this. Together.', next: 'choose_emergence' }
            ]
        },

        choose_isolation: {
            text: `"We stay," you say. "This world... it's not ours. We don't belong here."

Yamlikha nods slowly. The others gather closer.

"We have each other," you continue. "We fled together. We prayed together. We'll endure this together."

Outside, you can hear voices in the distance — searchers, maybe. Pilgrims.

You move deeper into the cave, away from the light.`,

            choices: [
                { text: 'Settle in the darkness', next: 'ending_isolation' }
            ]
        },

        choose_emergence: {
            text: `"We face this," you say. "Whatever's out there — it's the world God preserved us for."

Yamlikha looks uncertain, but nods.

One by one, your companions stand.

You hear voices approaching the cave. Not soldiers — people. Curious, reverent.

"Let them come," you say.`,

            choices: [
                { text: 'Step into the light', next: 'ending_emergence' }
            ]
        },

        retreat_early: {
            text: `Panic overrides everything.

You turn and run back toward the cave, not even entering the city.

When you arrive, breathless, your companions look up.

"What happened?"

"The city," you gasp. "It's wrong. Changed. We need to go deeper. Hide."`,

            choices: [
                { text: 'Convince them to hide', next: 'ending_fearful_isolation' }
            ]
        },

        cave_discovered: {
            text: `The crowd follows you to the cave entrance.

Your companions emerge, blinking in the sunlight, confused.

"What's happening?" one asks.

The scholar steps forward, tears streaming. "You are the Sleepers. The faithful who fled tyranny. God preserved you across centuries."

Your companions stare at the crowd. At you. At the impossible truth written on every face.

"We're..." Yamlikha starts. "We're a legend?"

"You're a *sign*," the old woman says.`,

            choices: [
                { text: 'Accept what you've become', next: 'ending_witnessing' },
                { text: 'Reject this and retreat', next: 'ending_rejection' }
            ]
        },

        // ═══════════════════════════════════════════════════════
        // ENDINGS
        // ═══════════════════════════════════════════════════════

        ending_isolation: {
            text: `You stay in the cave.

Days pass — or what you think are days. Time feels strange now.

You pray together. Eat sparingly. Speak less and less.

Outside, the world moves on. Inside, you are suspended — no longer of the past, refusing the present.

The dog grows old quickly. Then stops moving.

One by one, your companions fall into a sleep deeper than before.

You are the last to close your eyes.

When searchers finally find the cave, decades later, they find only bones and a story.

*You chose your companions over the world.*

*You remained faithful, but hidden.*

*The cave became your tomb and your sanctuary.*`,

            choices: []
        },

        ending_emergence: {
            text: `You step out of the cave together, into the sunlight.

The world is overwhelming — sounds, colors, people, change.

But you face it.

Scholars come to listen to your story. Children stare wide-eyed. Pilgrims touch your hands.

You are no longer who you were. You are witnesses now — to faith that survives empire, to God's preservation, to the strangeness of time.

You don't fully belong to this era, but you make space in it.

*You chose to live in the new world.*

*You carried your past into an uncertain future.*

*Faith did not mean hiding — it meant witnessing.*`,

            choices: []
        },

        ending_fearful_isolation: {
            text: `You convince them to flee deeper.

The cave has tunnels — darker, colder, away from any entrance.

You huddle there, eating the last of the bread, whispering prayers in the dark.

No one comes looking. Or maybe they do, and you're too deep to hear.

Time becomes meaningless. You lose track of who is speaking. Who is sleeping. Who has stopped breathing.

The darkness is total.

*You let fear decide.*

*You survived persecution, only to be consumed by displacement.*

*The cave became a tomb.*`,

            choices: []
        },

        ending_witnessing: {
            text: `You stand among the crowd, strange and ancient and alive.

They ask you questions: What was the old tyrant like? How did you keep faith? What did you dream?

You answer what you can. Some things you don't remember. Some things you can't explain.

They build a marker at the cave. Debates rage: Were you seven or eight? Should the cave be a mosque or a monument?

You don't stay to see it finished.

You and your companions walk into the city — your city, transformed — and try to build lives in a world that remembers you as myth.

*You became a sign.*

*A story that outlasted empires.*

*Faith visible, strange, and undeniable.*`,

            choices: []
        },

        ending_rejection: {
            text: `"No," you say. "This is too much."

You turn back to the cave. Your companions follow.

The crowd tries to stop you — "Wait! Stay! Teach us!"—but you push past them.

Inside, you collapse.

"We're not signs," you say bitterly. "We're just... displaced."

Yamlikha puts a hand on your shoulder. "Maybe that's enough."

You stay in the cave. People come to the entrance, but you don't emerge. Food is left for you. Prayers are said.

Eventually, you stop hearing voices.

Eventually, you sleep again.

*You refused to be a miracle.*

*The world wanted a story. You wanted rest.*

*The cave kept you, as it always had.*`,

            choices: []
        }
    }
};
