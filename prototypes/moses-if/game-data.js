// Game data — Moses & Khidr, Surah Al-Kahf
const gameData = {
    currentScene: 'start',

    // Player's three binary decisions: 'silent' | 'asked' | null
    decisions: { boat: null, boy: null, wall: null },

    // Moses's actual choices from the Quran — all three times, he asked.
    mosesPath: { boat: 'asked', boy: 'asked', wall: 'asked' },

    scenes: {

        start: {
            text: `You are Moses.

You have spoken to God through fire in a desert. You have parted a sea with a staff. Your people call you prophet, and they are right.

But God has told you of another—a servant given a knowledge that bypasses revelation. A knowledge that lives in the marrow of things as they truly are, not as they appear. His name is Khidr.

You have set out to find him.

The question is what it will cost you.`,
            choices: [
                { text: 'Find Khidr', next: 'meeting' }
            ]
        },

        meeting: {
            text: `He is sitting by the water when you arrive. Not praying. Not teaching. Just watching the surface.

You tell him you want to travel with him—to learn from him.

He turns. His eyes are quiet in a way that is not entirely comfortable.

"Moses," he says. "You will not be able to bear what you see with me."

You have stood before Pharaoh. You have led a people through forty years of desert. "I will be patient," you say. "If God wills it."

"Then come," he says. "But make me a promise: do not ask me about anything. Not until I choose to tell you myself."

You give him your word.`,
            choices: [
                { text: 'I give you my word.', next: 'journey_start' }
            ]
        },

        journey_start: {
            text: `You walk together along the coast as the light changes over the water.

He is not a man who fills silence. You find yourself doing the same, falling into a quiet you hadn't known you were capable of.

At the harbor, a group of fishermen are preparing their boat for the morning. They take one look at Khidr—something in how he holds himself—and offer you both passage without asking anything in return.

You board. The water carries you out.

Then Khidr stands up.`,
            choices: [
                { text: 'Continue', next: 'boat_damage' }
            ]
        },

        boat_damage: {
            text: `He grabs a plank and pulls.

The wood splits with a sound like a bone breaking. Water pushes up through the gap, cold and immediate. The fishermen scramble, throwing their hands over the hole, shouting to one another, pressing rags into the breach.

Their hands are shaking.

These are not wealthy men. You can see it in everything—the way their gear is mended and mended again, the way the youngest one's eyes go wide with the terror of someone watching the only thing they own come apart beneath them.

Khidr sits back down. Calm.

The boat does not sink. But it is damaged. They gave you passage freely, and their boat is damaged.

You gave your word.`,
            choices: [
                { text: 'Stay silent. You gave your word.', next: 'boat_silence', decision: { key: 'boat', value: 'silent' } },
                { text: '"These men showed us kindness. Why did you do this?"', next: 'boat_question', decision: { key: 'boat', value: 'asked' } }
            ]
        },

        boat_silence: {
            text: `You close your mouth.

The fishermen patch the hole with rags and prayer and the particular desperation of people who have no margin for this. The boat limps to shore. They help you off.

Khidr says nothing. He simply walks.

You follow.`,
            choices: [
                { text: 'Continue', next: 'village_arrival' }
            ]
        },

        boat_question: {
            text: `Khidr does not raise his voice.

"Did I not tell you that you would not be able to bear it?"

You look at the fishermen wringing water from their clothes. The youngest is sitting very still, staring at the damaged hull.

"You promised, Moses," Khidr says. "But I will continue with you. For now."

You step onto land.

You follow him.`,
            choices: [
                { text: 'Continue', next: 'village_arrival' }
            ]
        },

        village_arrival: {
            text: `You travel inland as the afternoon heat settles into the stones.

A village. Children running between houses. The smell of bread. Someone calling out a name.

A boy comes sprinting around a corner—maybe eight years old, nine at most. He has just won something: a race, a game, some private victory that has lit him entirely from the inside. He is laughing the way children laugh when they've forgotten everything except this moment.

He runs past Khidr.

Khidr's hand moves.`,
            choices: [
                { text: 'Continue', next: 'boy_death' }
            ]
        },

        boy_death: {
            text: `The child is on the ground.

The laughter stops the way a candle stops—all at once, and then only the shape of where it was.

You stand there. The world keeps moving around you without acknowledgment: wind in the palms, a goat complaining somewhere, the mundane afternoon continuing in every direction.

Somewhere close, this child's mother is going about her day. She doesn't know yet. She will.

The boy does not rise.

You gave your word.`,
            choices: [
                { text: 'Stay silent. God forgive you for staying silent.', next: 'boy_silence', decision: { key: 'boy', value: 'silent' } },
                { text: '"You killed an innocent child."', next: 'boy_question', decision: { key: 'boy', value: 'asked' } }
            ]
        },

        boy_silence: {
            text: `You walk.

You don't understand how your legs are doing it, but you walk.

He was laughing. That's the thing you can't stop returning to. He was laughing, and then the laugh was just—gone. The gap between those two moments is where something in you used to live.

You walk.`,
            choices: [
                { text: 'Continue', next: 'town_arrival' }
            ]
        },

        boy_question: {
            text: `"You killed an innocent child."

Your voice is steadier than you expected.

Khidr stops walking. He looks at you.

"Did I not tell you that you would not be able to bear it?"

You say nothing.

"If you ask me once more," he says quietly, "we part ways. That is the condition."

He turns and walks. You stand there a moment longer, looking at the place in the dust where the boy fell.

Then you follow.`,
            choices: [
                { text: 'Continue', next: 'town_arrival' }
            ]
        },

        town_arrival: {
            text: `The town is prosperous. Large houses, clean lanes, men in fine clothes who look past you as though you are not there.

You ask for food. You ask for somewhere to rest.

Door after door. Eyes that slide away. The specific coldness of people who have enough and have decided that is the natural order of things—that their fullness and your emptiness are simply the world, correctly arranged.

By evening you are sitting in an alley, hunger making your thoughts slow and heavy. Your feet ache. You are very tired.

Khidr rises.`,
            choices: [
                { text: 'Continue', next: 'wall_repair' }
            ]
        },

        wall_repair: {
            text: `At the edge of town, an old wall is coming apart—stones drifting from one another over years, the mortar long gone to dust and nothing.

Khidr begins to rebuild it.

You watch him. Your stomach has moved past complaint into a dull, settled emptiness. These people looked through you like you were air. They gave you nothing—not bread, not water, not even the acknowledgment of your standing at their door.

And Khidr is rebuilding their wall.

Carefully. Stone by stone. Like each one matters.

He is not asking for payment. He is not asking for anything.

You gave your word.`,
            choices: [
                { text: 'Stay silent. Let him work.', next: 'wall_silence', decision: { key: 'wall', value: 'silent' } },
                { text: '"At least you could have asked them to pay you."', next: 'wall_question', decision: { key: 'wall', value: 'asked' } }
            ]
        },

        wall_silence: {
            text: `The stars come out.

Khidr finishes. He steps back and looks at what he's built. Then he looks at you.

"This is where we part, Moses." His voice is not unkind. "But before I go—I will tell you what I could not tell you before."`,
            choices: [
                { text: 'Listen.', next: 'revelation_boat' }
            ]
        },

        wall_question: {
            text: `Khidr sets down the stone he is holding.

He doesn't look angry. He just looks at you.

"This is the third time."

The words sit between you in the dark.

"I will tell you now what I could not tell you before. And then we part."`,
            choices: [
                { text: 'Listen.', next: 'revelation_boat' }
            ]
        },

        revelation_boat: {
            text: `"The boat.

The fishermen who gave us passage—there is a king who moves along that coast, seizing every vessel that is whole. Every one. For his fleet.

The damage made the boat unfit for seizure. They will repair it. They will keep it."

The harbor. The shaking hands. The youngest one sitting very still, staring at the hull.

Mercy, dressed in the face of cruelty.`,
            choices: [
                { text: 'Continue', next: 'revelation_boy' }
            ]
        },

        revelation_boy: {
            text: `"The boy."

You wait.

"He would have grown. And as he grew, he would have driven his parents—both of them people of faith, people of goodness—to disbelief. His nature was not something that was going to change. The love they had for him would have pulled them away from God, and they would have followed him into it.

God will give them another child."

The laughing. The silence.

You don't speak.`,
            choices: [
                { text: 'Continue', next: 'revelation_wall' }
            ]
        },

        revelation_wall: {
            text: `"The wall conceals a treasure. It belongs to two boys in that town—orphans. Their father was a righteous man.

If the wall had crumbled before they came of age, the townspeople would have found what was hidden beneath it. You saw what those people are.

The wall had to stand. It has to stand until those boys are old enough to claim what is theirs.

They will find it when they are ready."

He is quiet for a moment.

"None of this was my own decision, Moses. Every act was commanded. I did not act from myself."

He turns to leave.`,
            choices: [
                { text: 'Continue', next: 'ending' }
            ]
        },

        ending: {
            text: `He goes.

You stand in the dark with the repaired wall at your back and the stars overhead.

The boat. The boy. The wall.

He told you at the beginning. He said: you will not be able to bear it. And you said: I will be patient, if God wills it.

You meant it when you said it.`,
            choices: []
        }
    }
};
