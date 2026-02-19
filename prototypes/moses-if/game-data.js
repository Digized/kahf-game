// Game data structure
const gameData = {
    currentScene: 'start',
    patience: 3,
    maxPatience: 3,
    questionsAsked: 0,
    choices: [],

    scenes: {
        start: {
            text: `You are Moses, the prophet and leader of your people.

You have come far — through years of wandering, revelation, and divine encounter. Few in all the world have spoken to God as you have.

And then the word reaches you: there exists a man, somewhere along the confluence of two seas, who carries knowledge you do not possess.

The thought sits with you longer than you expect.`,

            choices: [
                { text: 'Seek out Khidr', next: 'meeting' }
            ]
        },

        meeting: {
            text: `You find Khidr by the shore, a cloaked figure gazing at the horizon.

"I have come to learn from you," you say.

Khidr turns. His eyes are ancient, unhurried. "You will not have patience with me, Moses."

"You will find me patient, if God wills it," you reply.

"Then come," he says. "But do not question what I do. When the time is right, I will explain. Can you accept this?"`,

            choices: [
                { text: 'I accept. I will be patient.', next: 'journey_start' },
                { text: 'How can I learn without asking questions?', next: 'meeting_question', isQuestion: true }
            ]
        },

        meeting_question: {
            text: `Khidr's expression softens, slightly.

"Learning is not always through questioning," he says. "Sometimes it is through witnessing. Through patience. Through trusting that understanding will come."

"Will you journey with me in silence, or will you stay behind?"`,

            choices: [
                { text: 'I will try. Let us begin.', next: 'journey_start' }
            ]
        },

        journey_start: {
            text: `You journey together in silence, walking along the coast. The sun glitters off the water.

After some time, you reach a small harbor where a boat is moored. Poor fishermen are preparing it for the day's work.

Khidr approaches. "May we have passage?"

The fishermen, recognizing his bearing, offer it freely. "No payment necessary, honored one."

You board. The boat pushes off from shore.`,

            choices: [
                { text: 'Walk on', next: 'boat_damage' }
            ]
        },

        boat_damage: {
            text: `The journey is peaceful at first. Then, without warning, Khidr stands and begins tearing at the planks of the boat.

Wood splinters. Water seeps in.

The fishermen cry out, rushing to plug the hole. The boat is damaged but still floats.

You stare at Khidr. These men gave passage freely. They are poor. This boat is their livelihood.

Why would he do this?`,

            choices: [
                { text: 'Say nothing. I promised patience.', next: 'boat_silence' },
                { text: 'Why did you damage their boat? They showed us kindness!', next: 'boat_question', isQuestion: true }
            ]
        },

        boat_silence: {
            text: `You bite your tongue, though every part of you wants to speak.

Khidr meets your eyes. He sees your struggle, your restraint.

"Well done," he says quietly.

The boat limps to shore. The fishermen see you off without anger.

You and Khidr disembark and continue walking.`,

            choices: [
                { text: 'Walk on', next: 'village_arrival' }
            ]
        },

        boat_question: {
            text: `Khidr looks at you steadily.

"Did I not say you would lack patience with me?"

"These are poor men," you protest. "They offered kindness, and you repay them with destruction?"

"You have broken your promise," Khidr says. "But I will continue, for now."

The boat reaches shore. You disembark in troubled silence.`,

            choices: [
                { text: 'Walk on', next: 'village_arrival' }
            ]
        },

        village_arrival: {
            text: `You travel inland and reach a small village as evening falls.

Children play in the streets. Their laughter echoes between the clay houses.

Khidr watches them with an unreadable expression.

One boy, perhaps twelve years old, runs past chasing a ball. His face is bright with joy.

Khidr steps forward.`,

            choices: [
                { text: 'Watch', next: 'boy_death' }
            ]
        },

        boy_death: {
            text: `What happens next is almost too quick to process.

Khidr strikes the boy. The child falls.

He does not rise.

You stand frozen. The laughter, the running, the joy — gone in an instant.

Khidr has killed a child.

Horror floods through you.`,

            choices: [
                { text: 'Keep silent, though it tears at you', next: 'boy_silence' },
                { text: 'Have you killed an innocent soul?!', next: 'boy_question', isQuestion: true }
            ]
        },

        boy_silence: {
            text: `You cannot speak. Your throat is tight with grief and shock.

Khidr begins walking away from the village. You follow, numb.

The boy's laughter still echoes in your memory.

How can this be right? How can this be wisdom?

But you said you would trust. You said you would be patient.

You walk on in anguished silence.`,

            choices: [
                { text: 'Press forward', next: 'town_arrival' }
            ]
        },

        boy_question: {
            text: `"Have you killed an innocent soul?!" you cry out. "A child who had done nothing wrong?!"

Khidr stops walking.

"Did I not tell you that you would not have patience with me?"

"Patience?" Your voice breaks. "You have killed a child."

"You have questioned me twice now, Moses," Khidr says. "If you question me once more, we must part ways."

The weight of those words hangs between you.`,

            choices: [
                { text: 'Walk on in silence', next: 'town_arrival' }
            ]
        },

        town_arrival: {
            text: `Days pass. You reach a wealthy town as evening falls.

The houses are large and well-kept. Well-dressed merchants hurry past without acknowledgment.

You and Khidr ask for food and shelter. Door after door closes.

"We have no room for wanderers."
"Try elsewhere."
"Don't loiter here."

The town is prosperous. Its people are not.

You sit hungry in an alley as the stars come out.`,

            choices: [
                { text: 'Wait', next: 'wall_repair' }
            ]
        },

        wall_repair: {
            text: `Khidr rises and walks to the edge of town where an old wall stands, crumbling and neglected.

Without a word, he begins repairing it. Stone by stone, careful and unhurried.

You watch. Exhausted. Hungry.

These people refused you shelter. Refused you food. Showed no kindness.

Yet Khidr labors for them, asking nothing in return.`,

            choices: [
                { text: 'Stay silent. This is the last test.', next: 'wall_silence' },
                { text: 'Why repair their wall? They gave us nothing!', next: 'wall_question', isQuestion: true }
            ]
        },

        wall_silence: {
            text: `You hold your tongue. Your stomach growls. Your feet ache.

But you stay silent.

Khidr completes the wall and steps back to examine his work.

He turns to you — and there is something like sadness in his eyes.

"You have done well to remain patient, Moses. But I see the questions burning within you."

"Come. It is time for us to part. But first, I will explain."`,

            choices: [
                { text: 'Listen', next: 'revelation_patient' }
            ]
        },

        wall_question: {
            text: `"Why repair their wall?" you demand. "They refused us food and shelter. If you must work, at least ask payment!"

Khidr sets down the stone he was holding.

"This is the third time you have questioned me, Moses."

"We must part ways now. But before we do — I will tell you what you could not bear to witness in patience."`,

            choices: [
                { text: 'Listen', next: 'revelation_impatient' }
            ]
        },

        revelation_patient: {
            text: `Khidr speaks.

"The boat belonged to poor fishermen. But a tyrannical king patrols these waters, seizing every vessel that is whole and sound."

Something begins to shift inside you.

"By damaging it, I made it unfit for seizure. The fishermen will repair it. They will keep their livelihood."`,

            choices: [
                { text: 'Go on', next: 'revelation_patient_2' }
            ]
        },

        revelation_patient_2: {
            text: `"The boy," Khidr continues. His voice is gentle.

You brace yourself.

"He was destined to become a man of great cruelty. He would have driven his righteous parents — through grief and sin — away from their faith."

Your eyes sting.

"God will give them a better child. One who will be their comfort."`,

            choices: [
                { text: 'Go on', next: 'revelation_patient_3' }
            ]
        },

        revelation_patient_3: {
            text: `"And the wall," Khidr says, turning to look at the structure behind him.

"It conceals a treasure belonging to two orphan boys in this town. Their father was a righteous man."

"When they come of age, they will find it and be provided for. If the wall had crumbled, the townspeople would have seized it."

He places a hand on your shoulder.

"These were not my decisions, Moses. This is the knowledge of God — beyond the reach of what any eye can see."

"You remained patient longer than most could. Yet even you, with all your wisdom, could not bear witness without needing to understand."

He is not unkind when he says it. Just honest.`,

            choices: [
                { text: 'Sit with this', next: 'ending_patient' }
            ]
        },

        revelation_impatient: {
            text: `Khidr speaks.

"The boat belonged to poor fishermen. But a tyrannical king patrols these waters, seizing every vessel that is whole and sound."

Shame begins to settle over you.

"By damaging it, I made it unfit for seizure. The fishermen will repair it. They will keep their livelihood."`,

            choices: [
                { text: 'Go on', next: 'revelation_impatient_2' }
            ]
        },

        revelation_impatient_2: {
            text: `"The boy was destined to become a man of great cruelty. He would have driven his righteous parents — through grief and sin — away from their faith."

You cannot meet Khidr's eyes.

"God will give them a better child. One who will be their comfort."`,

            choices: [
                { text: 'Go on', next: 'revelation_impatient_3' }
            ]
        },

        revelation_impatient_3: {
            text: `"And the wall conceals a treasure belonging to two orphan boys in this town. Their father was a righteous man."

"When they come of age, they will find it and be provided for. If the wall had crumbled, the townspeople would have seized it."

Khidr's voice becomes firm — but not unkind.

"These were not my decisions, Moses. This is the knowledge of God."

"You are a great prophet. Wise and strong. But even you could not stand still and let the divine will unfold without demanding an account."

He begins to walk away.

"Patience is harder than knowledge, Moses. Remember this."`,

            choices: [
                { text: 'Let it settle', next: 'ending_impatient' }
            ]
        },

        ending_patient: {
            text: `You stand in the fading light, overwhelmed.

Every act of seeming cruelty — mercy in disguise.
Every inexplicable deed — wisdom beyond what eyes can reach.

You maintained patience longer than most. Yet even you stumbled at the edge of human understanding.

Khidr's words stay with you:

*"This is the knowledge of God — beyond the reach of what any eye can see."*

You are Moses, prophet and leader. But in this moment, you are simply a student, humbled before something too large for certainty.

Perhaps that, too, is part of the lesson.`,

            choices: []
        },

        ending_impatient: {
            text: `You stand alone as Khidr disappears into the distance.

The truth settles like dust after a storm.

Every act of seeming cruelty — mercy in disguise.
Every inexplicable deed — wisdom beyond what any eyes could reach.

You are Moses, beloved of God, leader of your people. And you could not stand still.

Patience — real patience — turns out to be harder than any knowledge you have gained.

Humility cuts deeper than any other lesson.

You will carry this for the rest of your days.`,

            choices: []
        }
    }
};
