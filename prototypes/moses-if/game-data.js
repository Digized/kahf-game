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
            
            You have traveled far, seeking knowledge and understanding. Your reputation as a wise teacher has spread across the lands.
            
            One day, a message comes: there is one who knows what you do not. A mysterious figure named Khidr, possessed of divine knowledge.
            
            Pride stirs within you. Who could know more than you, chosen by God?
            
            Yet curiosity—and perhaps humility—compels you to seek him out.`,
            
            choices: [
                { text: 'Seek out Khidr', next: 'meeting' }
            ]
        },
        
        meeting: {
            text: `You find Khidr by the shore, a cloaked figure gazing at the horizon.
            
            "I have come to learn from you," you say.
            
            Khidr turns, his eyes ancient and knowing. "You will not have patience with me, Moses."
            
            "You will find me patient, if God wills it," you reply.
            
            "Then come," Khidr says. "But do not question what I do. When the time is right, I will explain. Can you accept this?"`,
            
            choices: [
                { text: 'I accept. I will be patient.', next: 'journey_start' },
                { text: 'How can I learn without asking questions?', next: 'meeting_question', isQuestion: true }
            ]
        },
        
        meeting_question: {
            text: `Khidr's expression softens slightly.
            
            "Learning is not always through questioning," he says. "Sometimes it is through witnessing, through patience, through trusting that understanding will come."
            
            "Will you journey with me in silence, or will you stay behind?"`,
            
            choices: [
                { text: 'I will try to be patient. Let us begin.', next: 'journey_start' }
            ]
        },
        
        journey_start: {
            text: `You journey together in silence, walking along the coast. The sun reflects off the water.
            
            After some time, you reach a small harbor where a boat is moored. Poor fishermen are preparing it for the day's work.
            
            Khidr approaches the boat. "May we have passage?" he asks.
            
            The fishermen, recognizing his bearing, offer the boat freely. "No payment necessary, honored one."
            
            You board together. The boat pushes off from shore.`,
            
            choices: [
                { text: 'Continue', next: 'boat_damage' }
            ]
        },
        
        boat_damage: {
            text: `The journey is peaceful at first. Then, without warning, Khidr stands and begins tearing at the planks of the boat.
            
            Wood splinters. Water seeps in.
            
            The fishermen cry out in alarm, rushing to plug the hole. The boat is damaged, but still floats.
            
            You stare at Khidr in shock. These men gave passage freely. They are poor. This boat is their livelihood.
            
            Why would he do this?`,
            
            choices: [
                { text: 'Say nothing. I promised patience.', next: 'boat_silence' },
                { text: 'Why did you damage their boat? They showed us kindness!', next: 'boat_question', isQuestion: true }
            ]
        },
        
        boat_silence: {
            text: `You bite your tongue, though every fiber wants to speak.
            
            Khidr meets your eyes. He sees your struggle, your restraint.
            
            "Well done," he says quietly.
            
            The boat limps to shore. The fishermen thank you for the company, somehow not angry despite the damage.
            
            You and Khidr disembark and continue your journey.`,
            
            choices: [
                { text: 'Continue', next: 'village_arrival' }
            ]
        },
        
        boat_question: {
            text: `Khidr looks at you steadily.
            
            "Did I not say you would lack patience with me?"
            
            "These are poor men!" you protest. "They offered kindness, and you repay them with destruction?"
            
            "You have broken your promise," Khidr says. "But I will continue, for now."
            
            The boat reaches shore. You disembark in troubled silence.`,
            
            choices: [
                { text: 'Continue', next: 'village_arrival' }
            ]
        },
        
        village_arrival: {
            text: `You travel inland and reach a small village as evening falls.
            
            Children play in the streets. Their laughter echoes between clay houses.
            
            Khidr watches them with an unreadable expression.
            
            One boy, perhaps twelve years old, runs past chasing a ball. His face is bright with joy.
            
            Khidr steps forward.`,
            
            choices: [
                { text: 'Continue', next: 'boy_death' }
            ]
        },
        
        boy_death: {
            text: `What happens next is almost too quick to process.
            
            Khidr strikes the boy. The child falls.
            
            He does not rise.
            
            You stand frozen. The innocent laughter, the joyful playing—gone in an instant.
            
            Khidr has killed a child.
            
            Horror floods through you.`,
            
            choices: [
                { text: 'Keep silent, though it tears at your heart', next: 'boy_silence' },
                { text: 'Have you killed an innocent soul?!', next: 'boy_question', isQuestion: true }
            ]
        },
        
        boy_silence: {
            text: `You cannot speak. Your throat is tight with grief and shock.
            
            Khidr begins walking away from the village. You follow, numb.
            
            The boy's laughter still echoes in your memory.
            
            How can this be right? How can this be divine wisdom?
            
            But you said you would trust. You said you would be patient.
            
            You walk on in anguished silence.`,
            
            choices: [
                { text: 'Continue', next: 'town_arrival' }
            ]
        },
        
        boy_question: {
            text: `"Have you killed an innocent soul?!" you cry out. "A child who had done no wrong?!"
            
            Khidr stops walking.
            
            "Did I not tell you that you would not have patience with me?"
            
            "Patience?" Your voice breaks. "You have killed a child!"
            
            "You have questioned me twice now, Moses," Khidr says. "If you question me once more, we must part ways."
            
            The weight of his words hangs between you.`,
            
            choices: [
                { text: 'Continue in silence', next: 'town_arrival' }
            ]
        },
        
        town_arrival: {
            text: `Days pass in heavy silence. You reach a wealthy town.
            
            The houses are large, well-maintained. Well-dressed merchants hurry past without acknowledgment.
            
            You and Khidr ask for food and shelter. Door after door closes.
            
            "We have no room for wanderers."
            "Try elsewhere."
            "Don't loiter here."
            
            The town is prosperous, but its people are stingy and inhospitable.
            
            Finally, you sit hungry in an alley as evening falls.`,
            
            choices: [
                { text: 'Continue', next: 'wall_repair' }
            ]
        },
        
        wall_repair: {
            text: `Khidr rises and walks to the edge of town where an old wall stands, crumbling and neglected.
            
            Without a word, he begins repairing it. Stone by stone, he rebuilds the structure with care and precision.
            
            You watch, exhausted and hungry.
            
            These people refused you hospitality. They showed no kindness.
            
            Yet Khidr labors for their benefit, asking nothing in return.
            
            Why help those who would not help you?`,
            
            choices: [
                { text: 'Stay silent. This is the last test.', next: 'wall_silence' },
                { text: 'Why repair their wall? They gave us nothing!', next: 'wall_question', isQuestion: true }
            ]
        },
        
        wall_silence: {
            text: `You bite back your words. Your stomach growls. Your feet ache.
            
            But you remain silent.
            
            Khidr completes the wall and stands back, examining his work.
            
            He turns to you with something like sadness in his eyes.
            
            "You have done well to remain patient, Moses. But I see the questions burning within you."
            
            "Come. It is time for us to part. But first, I will explain."`,
            
            choices: [
                { text: 'Listen to the explanation', next: 'revelation_patient' }
            ]
        },
        
        wall_question: {
            text: `"Why repair their wall?" you demand. "They refused us food and shelter! If you must work, at least ask payment!"
            
            Khidr sets down the stone he was holding.
            
            "This is the third time you have questioned me, Moses."
            
            "We must part ways now. But before we do, I will tell you the meaning of what you could not bear to witness in patience."`,
            
            choices: [
                { text: 'Listen to the explanation', next: 'revelation_impatient' }
            ]
        },
        
        revelation_patient: {
            text: `Khidr speaks:
            
            "The boat belonged to poor fishermen. But a tyrannical king patrols these waters, seizing every perfect vessel for his navy. By damaging the boat, I made it unfit for seizure. The fishermen will repair it and keep their livelihood."
            
            You feel understanding begin to dawn.
            
            "The boy," Khidr continues, his voice gentle, "was destined to grow into a man of great evil. He would have driven his righteous parents to unbelief through his cruelty. God will grant them a better child, one who will be their comfort."
            
            Tears well in your eyes.
            
            "And the wall conceals a treasure belonging to two orphan boys in this town. Their father was righteous. When they come of age, they will discover it and be provided for. If the wall had fallen, the townspeople would have found and seized the treasure."
            
            Khidr places a hand on your shoulder.
            
            "These were not my decisions, Moses. This is the knowledge of God, beyond human understanding. You remained patient longer than most. But even you, with all your wisdom, could not bear to witness divine will without explanation."`,
            
            choices: [
                { text: 'Reflect on the lesson', next: 'ending_patient' }
            ]
        },
        
        revelation_impatient: {
            text: `Khidr speaks:
            
            "The boat belonged to poor fishermen. But a tyrannical king patrols these waters, seizing every perfect vessel for his navy. By damaging the boat, I made it unfit for seizure. The fishermen will repair it and keep their livelihood."
            
            Shame washes over you.
            
            "The boy was destined to grow into a man of great evil. He would have driven his righteous parents to unbelief through his cruelty. God will grant them a better child, one who will be their comfort."
            
            You cannot meet Khidr's eyes.
            
            "And the wall conceals a treasure belonging to two orphan boys in this town. Their father was righteous. When they come of age, they will discover it and be provided for. If the wall had fallen, the townspeople would have found and seized the treasure."
            
            "These were not my decisions, Moses. This is the knowledge of God. You are a great prophet, wise and strong. But even you could not witness the divine will without demanding explanation."
            
            He begins to walk away.
            
            "Patience is harder than knowledge, Moses. Remember this."`,
            
            choices: [
                { text: 'Accept the lesson', next: 'ending_impatient' }
            ]
        },
        
        ending_patient: {
            text: `You stand in the fading light, overwhelmed.
            
            Every act of seeming cruelty was mercy in disguise.
            Every inexplicable deed was divine wisdom beyond human sight.
            
            You maintained patience longer than most could. Yet even you stumbled at the limits of human understanding.
            
            Khidr's words echo in your mind:
            
            *"This is the knowledge of God, beyond human understanding."*
            
            You are Moses, prophet and leader. But in this moment, you are simply a student, humbled before mysteries you cannot fully grasp.
            
            And perhaps that is the greatest wisdom of all.
            
            ---
            
            **Ending: The Patient Seeker**
            
            You questioned Khidr only ${gameData.questionsAsked} time(s). Your patience, though tested, held strong enough to learn the deepest lessons.`,
            
            choices: []
        },
        
        ending_impatient: {
            text: `You stand alone as Khidr disappears into the distance.
            
            The truth settles over you like a heavy cloak:
            
            Every act of seeming cruelty was mercy in disguise.
            Every inexplicable deed was divine wisdom beyond human sight.
            
            You are Moses, prophet and leader, beloved of God. Yet you could not witness these acts without demanding explanation. Your wisdom, great as it is, has limits.
            
            Patience—true patience—is harder than knowledge.
            
            Humility cuts deeper than any other lesson.
            
            You will carry this teaching for the rest of your days.
            
            ---
            
            **Ending: The Humbled Prophet**
            
            You questioned Khidr ${gameData.questionsAsked} times, breaking your promise of patience. Yet in this failure, you learned the deepest truth: human wisdom, no matter how great, cannot comprehend divine will without humility.`,
            
            choices: []
        }
    }
};
