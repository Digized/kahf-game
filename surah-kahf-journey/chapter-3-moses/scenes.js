// Scene Data for Musa & Al-Khidr
// All Quranic verses verified against Quran.com (Saheeh International translation)
// Source: Surah Al-Kahf 18:60-82

const SCENES = {
    start: {
        environment: 'shore',
        cameraPosition: { x: 0, y: 1.7, z: 0 },
        cameraRotation: { y: 0, x: 0 },
        verse: {
            ref: 'Surah Al-Kahf 18:60',
            text: '"I will not cease [traveling] until I reach the junction of the two seas..."'
        },
        text: `
            <p>You are <strong>Musa</strong> (Moses), peace be upon you.</p>
            <p>You have spoken with Allah. You have led your people through trials. Few in all creation have been granted what you have been granted.</p>
            <p>Yet the word reaches you: there exists one who carries knowledge you do not possess.</p>
            <p>You stand at the shore where two seas meet, seeking the servant of Allah known as <strong>Al-Khidr</strong>.</p>
        `,
        choices: [
            {
                text: 'Search for Al-Khidr',
                next: 'meeting'
            }
        ]
    },
    
    meeting: {
        environment: 'shore',
        cameraPosition: { x: 0, y: 1.7, z: 0 },
        verse: {
            ref: 'Surah Al-Kahf 18:66',
            text: '"May I follow you on [the condition] that you teach me from what you have been taught of sound judgement?"'
        },
        text: `
            <p>A cloaked figure stands before you. His presence is ancient, unhurried. This is Al-Khidr.</p>
            <p>"I have come to learn from you," you say.</p>
            <p>Al-Khidr's voice is calm but firm:</p>
            <div class="arabic">قَالَ إِنَّكَ لَن تَسْتَطِيعَ مَعِىَ صَبْرًۭا</div>
            <div class="translation">"Indeed, with me you will never be able to have patience."</div>
            <div class="citation">— Surah Al-Kahf 18:67</div>
            <p>"You will find me patient, if Allah wills it," you reply.</p>
            <p>"Then if you follow me, do not ask me about anything until I make mention of it to you."</p>
        `,
        choices: [
            {
                text: 'I accept. I will be patient.',
                next: 'journey_start'
            }
        ]
    },
    
    journey_start: {
        environment: 'boat',
        cameraPosition: { x: 0, y: 1.2, z: 0 },
        verse: {
            ref: 'Surah Al-Kahf 18:71',
            text: 'So they set out, until they came to the people of a boat...'
        },
        text: `
            <p>You journey together in silence. The sun reflects off the water.</p>
            <p>You reach a harbor where poor fishermen are preparing their boat. Al-Khidr asks for passage.</p>
            <p>The fishermen, recognizing his bearing, offer it freely. "No payment necessary, honored one."</p>
            <p>You board the boat. It pushes off from shore, rocking gently on the waves.</p>
        `,
        choices: [
            {
                text: 'Continue',
                next: 'boat_damage'
            }
        ]
    },
    
    boat_damage: {
        environment: 'boat',
        cameraPosition: { x: 0, y: 1.2, z: 0 },
        verse: {
            ref: 'Surah Al-Kahf 18:71',
            text: '...he tore it open.'
        },
        text: `
            <p>The journey is peaceful at first. Then, without warning, Al-Khidr begins tearing at the planks.</p>
            <p><em>Wood splinters. Water seeps in.</em></p>
            <p>The fishermen cry out, rushing to plug the hole. The boat is damaged but still floats.</p>
            <p>These men showed you kindness. They are poor. This boat is their livelihood.</p>
            <p>Why would he do this?</p>
        `,
        choices: [
            {
                text: 'Say nothing. You promised patience.',
                next: 'boat_silence'
            },
            {
                text: '"Have you torn it open to drown its people? You have done a grave thing!"',
                type: 'question',
                next: 'boat_question'
            }
        ]
    },
    
    boat_silence: {
        environment: 'boat',
        verse: {
            ref: 'Tafsir Note',
            text: 'Patience is restraining yourself even when your heart cries out.'
        },
        text: `
            <p>You bite your tongue. Every part of you wants to speak, but you remain silent.</p>
            <p>Al-Khidr glances at you. He sees your struggle, your restraint.</p>
            <p>The boat limps to shore. The fishermen see you off without anger—confused, but not hostile.</p>
            <p>You disembark and continue walking.</p>
        `,
        choices: [
            {
                text: 'Walk on',
                next: 'village_arrival'
            }
        ]
    },
    
    boat_question: {
        environment: 'boat',
        verse: {
            ref: 'Surah Al-Kahf 18:72',
            text: '"Did I not say that with me you would never be able to have patience?"'
        },
        text: `
            <p>"Have you torn it to drown its people?" you demand. "You have done a grave thing!"</p>
            <p>Al-Khidr looks at you steadily:</p>
            <div class="arabic">قَالَ أَلَمْ أَقُلْ إِنَّكَ لَن تَسْتَطِيعَ مَعِىَ صَبْرًۭا</div>
            <div class="translation">"Did I not say that with me you would never be able to have patience?"</div>
            <div class="citation">— Surah Al-Kahf 18:72</div>
            <p>"Do not blame me for what I forgot," you say, chastened.</p>
            <p>The boat reaches shore. You walk on in troubled silence.</p>
        `,
        choices: [
            {
                text: 'Continue',
                next: 'village_arrival'
            }
        ]
    },
    
    village_arrival: {
        environment: 'village',
        cameraPosition: { x: 0, y: 1.7, z: 0 },
        verse: {
            ref: 'Surah Al-Kahf 18:74',
            text: 'So they set out, until they met a boy, and he killed him.'
        },
        text: `
            <p>You travel inland. As evening falls, you reach a small village.</p>
            <p>Children play in the streets. Their laughter echoes between clay houses.</p>
            <p>A young boy runs past, chasing a ball. His face is bright with joy.</p>
            <p>Al-Khidr steps forward.</p>
            <p><em>What happens next is almost too quick to process.</em></p>
            <p>The boy falls. He does not rise.</p>
            <p>Al-Khidr has killed a child.</p>
        `,
        choices: [
            {
                text: 'Keep silent, though it tears at you',
                next: 'boy_silence'
            },
            {
                text: '"Have you killed a pure soul for other than [having killed] a soul? You have done a deplorable thing!"',
                type: 'question',
                next: 'boy_question'
            }
        ]
    },
    
    boy_silence: {
        environment: 'village',
        verse: {
            ref: 'Tafsir Note',
            text: 'True patience is holding your tongue when your heart is breaking.'
        },
        text: `
            <p>You cannot speak. Your throat is tight with grief and shock.</p>
            <p>Al-Khidr begins walking away from the village. You follow, numb.</p>
            <p>The boy's laughter still echoes in your memory.</p>
            <p><em>How can this be right? How can this be wisdom?</em></p>
            <p>But you said you would trust. You said you would be patient.</p>
        `,
        choices: [
            {
                text: 'Press forward',
                next: 'town_arrival'
            }
        ]
    },
    
    boy_question: {
        environment: 'village',
        verse: {
            ref: 'Surah Al-Kahf 18:75',
            text: '"Did I not tell you that with me you would never be able to have patience?"'
        },
        text: `
            <p>"Have you killed a pure soul?!" you cry out. "One who had killed no one? You have done a deplorable thing!"</p>
            <p>Al-Khidr stops:</p>
            <div class="arabic">قَالَ أَلَمْ أَقُل لَّكَ إِنَّكَ لَن تَسْتَطِيعَ مَعِىَ صَبْرًۭا</div>
            <div class="translation">"Did I not tell you that with me you would never be able to have patience?"</div>
            <div class="citation">— Surah Al-Kahf 18:75</div>
            <p>"If I ask you about anything after this, do not keep me as a companion," you say. "You have obtained from me an excuse."</p>
        `,
        choices: [
            {
                text: 'Walk on in silence',
                next: 'town_arrival'
            }
        ]
    },
    
    town_arrival: {
        environment: 'town',
        cameraPosition: { x: 0, y: 1.7, z: 0 },
        verse: {
            ref: 'Surah Al-Kahf 18:77',
            text: 'So they set out, until they came to the people of a town...'
        },
        text: `
            <p>Days pass. You reach a prosperous town as evening falls.</p>
            <p>The houses are large and well-kept. Well-dressed merchants hurry past.</p>
            <p>You and Al-Khidr ask for food and shelter. Door after door closes.</p>
            <p>"We have no room for wanderers."</p>
            <p>"Try elsewhere."</p>
            <p>The town is wealthy. Its people are not generous.</p>
        `,
        choices: [
            {
                text: 'Wait',
                next: 'wall_repair'
            }
        ]
    },
    
    wall_repair: {
        environment: 'town',
        verse: {
            ref: 'Surah Al-Kahf 18:77',
            text: '...they found therein a wall about to collapse, so he restored it.'
        },
        text: `
            <p>Al-Khidr walks to the edge of town where an old wall stands, crumbling and neglected.</p>
            <p>Without a word, he begins repairing it. Stone by stone, careful and unhurried.</p>
            <p>You are exhausted. Hungry. These people refused you shelter. Refused you food.</p>
            <p>Yet Al-Khidr labors for them, asking nothing in return.</p>
        `,
        choices: [
            {
                text: 'Stay silent. This is the last test.',
                next: 'wall_silence'
            },
            {
                text: '"If you wished, you could have taken payment for it."',
                type: 'question',
                next: 'wall_question'
            }
        ]
    },
    
    wall_silence: {
        environment: 'town',
        verse: {
            ref: 'Tafsir Note',
            text: 'The most profound wisdom often makes no sense to human eyes.'
        },
        text: `
            <p>You hold your tongue. Your stomach growls. Your feet ache.</p>
            <p>But you stay silent.</p>
            <p>Al-Khidr completes the wall and steps back.</p>
            <p>He turns to you, and there is something like respect in his eyes.</p>
            <p>"You have been patient longer than most could bear, Musa. But I see the questions burning within you."</p>
            <p>"Come. It is time for us to part—but first, I will explain."</p>
        `,
        choices: [
            {
                text: 'Listen',
                next: 'revelation_patient'
            }
        ]
    },
    
    wall_question: {
        environment: 'town',
        verse: {
            ref: 'Surah Al-Kahf 18:78',
            text: '"This is parting between me and you."'
        },
        text: `
            <p>"If you wished," you say, "you could have taken payment for it. We are hungry, yet they refused us."</p>
            <p>Al-Khidr sets down the stone:</p>
            <div class="arabic">قَالَ هَـٰذَا فِرَاقُ بَيْنِى وَبَيْنِكَ</div>
            <div class="translation">"This is parting between me and you."</div>
            <div class="citation">— Surah Al-Kahf 18:78</div>
            <p>"Before we part," he says, "I will tell you the interpretation of that about which you could not have patience."</p>
        `,
        choices: [
            {
                text: 'Listen',
                next: 'revelation'
            }
        ]
    },
    
    revelation_patient: {
        environment: 'town',
        verse: {
            ref: 'Surah Al-Kahf 18:79-82',
            text: 'The explanation of three divine wisdoms...'
        },
        text: `
            <div class="arabic">أَمَّا ٱلسَّفِينَةُ فَكَانَتْ لِمَسَـٰكِينَ يَعْمَلُونَ فِى ٱلْبَحْرِ فَأَرَدتُّ أَنْ أَعِيبَهَا وَكَانَ وَرَآءَهُم مَّلِكٌۭ يَأْخُذُ كُلَّ سَفِينَةٍ غَصْبًۭا</div>
            <div class="translation">"As for the ship, it belonged to poor people working at sea. So I intended to cause defect in it as there was after them a king who seized every [good] ship by force."</div>
            <div class="citation">— 18:79</div>
            
            <p>Al-Khidr continues:</p>
            
            <div class="arabic">وَأَمَّا ٱلْغُلَـٰمُ فَكَانَ أَبَوَاهُ مُؤْمِنَيْنِ فَخَشِينَآ أَن يُرْهِقَهُمَا طُغْيَـٰنًۭا وَكُفْرًۭا فَأَرَدْنَآ أَن يُبْدِلَهُمَا رَبُّهُمَا خَيْرًۭا مِّنْهُ زَكَوٰةًۭ وَأَقْرَبَ رُحْمًۭا</div>
            <div class="translation">"And as for the boy, his parents were believers, and we feared that he would overburden them by transgression and disbelief. So we intended that their Lord should substitute for them one better than him in purity and nearer to mercy."</div>
            <div class="citation">— 18:80-81</div>
            
            <div class="arabic">وَأَمَّا ٱلْجِدَارُ فَكَانَ لِغُلَـٰمَيْنِ يَتِيمَيْنِ فِى ٱلْمَدِينَةِ وَكَانَ تَحْتَهُۥ كَنزٌۭ لَّهُمَا وَكَانَ أَبُوهُمَا صَـٰلِحًۭا</div>
            <div class="translation">"And as for the wall, it belonged to two orphan boys in the city, and there was beneath it a treasure for them, and their father had been righteous."</div>
            <div class="citation">— 18:82</div>
            
            <p>"These were not my decisions, Musa. This is the knowledge of God—beyond what any eye can see."</p>
            <p>He places a hand on your shoulder. "You remained patient longer than most. Yet even you, with all your wisdom, could not bear witness without needing to understand."</p>
        `,
        choices: [
            {
                text: 'Reflect on this',
                next: 'ending_patient'
            }
        ]
    },
    
    revelation: {
        environment: 'town',
        verse: {
            ref: 'Surah Al-Kahf 18:79-82',
            text: 'The explanation of three divine wisdoms...'
        },
        text: `
            <div class="arabic">أَمَّا ٱلسَّفِينَةُ فَكَانَتْ لِمَسَـٰكِينَ يَعْمَلُونَ فِى ٱلْبَحْرِ فَأَرَدتُّ أَنْ أَعِيبَهَا وَكَانَ وَرَآءَهُم مَّلِكٌۭ يَأْخُذُ كُلَّ سَفِينَةٍ غَصْبًۭا</div>
            <div class="translation">"As for the ship, it belonged to poor people working at sea. So I intended to cause defect in it as there was after them a king who seized every [good] ship by force."</div>
            <div class="citation">— 18:79</div>
            
            <div class="arabic">وَأَمَّا ٱلْغُلَـٰمُ فَكَانَ أَبَوَاهُ مُؤْمِنَيْنِ فَخَشِينَآ أَن يُرْهِقَهُمَا طُغْيَـٰنًۭا وَكُفْرًۭا</div>
            <div class="translation">"And as for the boy, his parents were believers, and we feared that he would overburden them by transgression and disbelief."</div>
            <div class="citation">— 18:80</div>
            
            <div class="arabic">وَأَمَّا ٱلْجِدَارُ فَكَانَ لِغُلَـٰمَيْنِ يَتِيمَيْنِ فِى ٱلْمَدِينَةِ وَكَانَ تَحْتَهُۥ كَنزٌۭ لَّهُمَا</div>
            <div class="translation">"And as for the wall, it belonged to two orphan boys in the city, and there was beneath it a treasure for them."</div>
            <div class="citation">— 18:82</div>
            
            <p>Al-Khidr's voice becomes firm: "These were not my decisions. This is the knowledge of God."</p>
            <p>"You are a great prophet, Musa. Wise and strong. But even you could not stand still and let divine will unfold without demanding an account."</p>
            <p>He begins to walk away. "Patience is harder than knowledge. Remember this."</p>
        `,
        choices: [
            {
                text: 'Let it settle',
                next: 'ending'
            }
        ]
    },
    
    ending_patient: {
        environment: 'town',
        verse: {
            ref: 'Reflection',
            text: '"That is the interpretation of that about which you could not have patience." (18:82)'
        },
        text: `
            <p>You stand in the fading light, overwhelmed.</p>
            <p>Every act of seeming cruelty—<em>mercy in disguise</em>.</p>
            <p>Every inexplicable deed—<em>wisdom beyond what eyes can reach</em>.</p>
            <p>You maintained patience longer than most. Yet even you stumbled at the edge of human understanding.</p>
            <p>Al-Khidr's words stay with you:</p>
            <p style="text-align: center; font-style: italic; color: #d4af37;">"This is the knowledge of God—beyond the reach of what any eye can see."</p>
            <p>You are Musa, prophet and leader. But in this moment, you are simply a student, humbled before something too large for certainty.</p>
            <p>Perhaps that, too, is part of the lesson.</p>
        `,
        choices: []
    },
    
    ending: {
        environment: 'town',
        verse: {
            ref: 'Reflection',
            text: '"You could not have patience." (18:72, 75, 78)'
        },
        text: `
            <p>You stand alone as Al-Khidr disappears into the distance.</p>
            <p>The truth settles like dust after a storm.</p>
            <p>Every act of seeming cruelty—<em>mercy in disguise</em>.</p>
            <p>Every inexplicable deed—<em>wisdom beyond what any eyes could reach</em>.</p>
            <p>You are Musa, beloved of God, leader of your people.</p>
            <p>And you could not stand still.</p>
            <p style="text-align: center; font-style: italic; color: #ff8888;">Patience—real patience—is harder than any knowledge you have gained.</p>
            <p>Humility cuts deeper than any other lesson.</p>
            <p>You will carry this for the rest of your days.</p>
        `,
        choices: []
    }
};
