// Cave Sleepers - Story Data

const STORY_DATA = {
    // ACT 1: PERSECUTION
    start: {
        background: 'city-day',
        speaker: 'Narrator',
        text: 'The city of your birth has become a place of fear. The Emperor demands worship of the old gods—statues of stone and gold that neither see nor hear. But you and your companions have found something greater: belief in the One True God.',
        next: 'intro_2'
    },
    
    intro_2: {
        background: 'city-day',
        speaker: 'Narrator',
        text: 'Today, you meet in secret at the old marketplace, but whispers grow louder. The authorities are searching for those who refuse the imperial decree.',
        next: 'meet_friends'
    },
    
    meet_friends: {
        background: 'city-day',
        characters: [
            { type: 'char-protagonist' },
            { type: 'char-friend' },
            { type: 'char-friend' }
        ],
        speaker: 'Makhus',
        text: 'They arrested three more believers last night. The town square... they made an example of them.',
        next: 'friend_2'
    },
    
    friend_2: {
        background: 'city-day',
        characters: [
            { type: 'char-protagonist' },
            { type: 'char-friend', speaking: true },
            { type: 'char-friend' }
        ],
        speaker: 'Yamlikha',
        text: 'We cannot continue like this. Soon they will come for all of us.',
        choices: [
            {
                text: 'We must remain strong in our faith, whatever comes.',
                faithChange: 10,
                next: 'choice_faith'
            },
            {
                text: 'Perhaps we should flee the city while we still can.',
                faithChange: -5,
                next: 'choice_flee'
            },
            {
                text: 'Maybe we can convince them we mean no harm...',
                faithChange: -10,
                next: 'choice_compromise'
            }
        ]
    },
    
    choice_faith: {
        background: 'city-day',
        overlay: 'overlay-dark',
        characters: [
            { type: 'char-protagonist', speaking: true },
            { type: 'char-friend' },
            { type: 'char-friend' }
        ],
        speaker: 'You',
        text: 'God has guided us to the truth. If we deny it now, what does that say about our belief?',
        next: 'elder_arrives'
    },
    
    choice_flee: {
        background: 'city-day',
        overlay: 'overlay-dark',
        characters: [
            { type: 'char-protagonist', speaking: true },
            { type: 'char-friend' },
            { type: 'char-friend' }
        ],
        speaker: 'You',
        text: 'There is no shame in preserving our lives. We can practice our faith elsewhere, away from persecution.',
        next: 'elder_arrives'
    },
    
    choice_compromise: {
        background: 'city-day',
        overlay: 'overlay-dark',
        characters: [
            { type: 'char-protagonist', speaking: true },
            { type: 'char-friend' },
            { type: 'char-friend' }
        ],
        speaker: 'You',
        text: 'Perhaps if we explain that we pose no threat to the empire...',
        next: 'makhus_responds_compromise'
    },
    
    makhus_responds_compromise: {
        background: 'city-day',
        overlay: 'overlay-dark',
        characters: [
            { type: 'char-protagonist' },
            { type: 'char-friend', speaking: true },
            { type: 'char-friend' }
        ],
        speaker: 'Makhus',
        text: 'They do not care about reason. They care about control. Any who refuse their gods are enemies.',
        next: 'elder_arrives'
    },
    
    elder_arrives: {
        background: 'city-day',
        overlay: 'overlay-dark',
        characters: [
            { type: 'char-protagonist' },
            { type: 'char-friend' },
            { type: 'char-friend' },
            { type: 'char-elder' }
        ],
        speaker: 'Narrator',
        text: 'An elder believer approaches, breathless and urgent.',
        next: 'elder_warning'
    },
    
    elder_warning: {
        background: 'city-day',
        overlay: 'overlay-danger',
        characters: [
            { type: 'char-protagonist' },
            { type: 'char-friend' },
            { type: 'char-friend' },
            { type: 'char-elder', speaking: true }
        ],
        speaker: 'Elder',
        text: 'The guards are coming! Someone betrayed your meeting place. You have minutes, perhaps less. There is a cave in the hills—go now!',
        timePressure: true,
        timePressureSpeed: 0.8,
        choices: [
            {
                text: 'Run immediately toward the cave.',
                faithChange: 0,
                next: 'run_to_cave'
            },
            {
                text: 'Pause to pray for guidance and protection.',
                faithChange: 15,
                next: 'pray_before_flee'
            },
            {
                text: 'Try to warn other believers first.',
                faithChange: 5,
                next: 'warn_others'
            }
        ],
        onTimeout: 'caught_by_guards'
    },
    
    run_to_cave: {
        background: 'city-night',
        overlay: 'overlay-dark',
        speaker: 'Narrator',
        text: 'You run through winding streets, hearts pounding. Behind you, shouts echo off stone walls. The city that raised you now hunts you.',
        timePressure: true,
        timePressureSpeed: 1.2,
        next: 'approach_cave'
    },
    
    pray_before_flee: {
        background: 'city-night',
        overlay: 'overlay-dark',
        characters: [
            { type: 'char-protagonist' },
            { type: 'char-friend' },
            { type: 'char-friend' }
        ],
        speaker: 'Narrator',
        text: 'You close your eyes for a brief moment, trusting in God\'s protection. A sense of calm washes over you, even as danger approaches. Then you run.',
        timePressure: true,
        timePressureSpeed: 1.0,
        next: 'approach_cave'
    },
    
    warn_others: {
        background: 'city-night',
        overlay: 'overlay-danger',
        speaker: 'Narrator',
        text: 'You divert to warn a family of believers nearby. They flee into the darkness. Your mercy may have saved them, but it costs you precious time.',
        timePressure: true,
        timePressureSpeed: 1.5,
        setFlag: 'warned_others',
        next: 'approach_cave'
    },
    
    approach_cave: {
        background: 'cave-entrance',
        overlay: 'overlay-dark',
        speaker: 'Narrator',
        text: 'The cave looms before you—a dark mouth in the hillside. Behind, torchlight flickers in the distance.',
        timePressure: true,
        timePressureSpeed: 1.0,
        next: 'enter_cave'
    },
    
    caught_by_guards: {
        background: 'city-night',
        overlay: 'overlay-danger',
        speaker: 'Narrator',
        text: 'Hesitation proves fatal. Guards surround you before you can escape. They offer one final choice: bow to the Emperor\'s gods, or face execution.',
        choices: [
            {
                text: 'Refuse. Your faith is worth more than your life.',
                next: 'martyrdom_ending'
            },
            {
                text: 'Submit to save your life, heart heavy with regret.',
                next: 'compromise_ending'
            }
        ]
    },
    
    martyrdom_ending: {
        background: 'city-night',
        overlay: 'overlay-danger',
        speaker: 'Narrator',
        text: 'You stand firm, even as the guards close in. Your final thoughts are of peace, knowing you did not betray the truth. [ENDING: Martyrdom]',
        choices: []
    },
    
    compromise_ending: {
        background: 'city-day',
        speaker: 'Narrator',
        text: 'You live, but the weight of your choice follows you. Some things, once surrendered, cannot be reclaimed. [ENDING: Compromise]',
        choices: []
    },
    
    // ACT 2: THE CAVE
    enter_cave: {
        background: 'cave-interior',
        characters: [
            { type: 'char-protagonist' },
            { type: 'char-friend' },
            { type: 'char-friend' }
        ],
        speaker: 'Narrator',
        text: 'You stumble into darkness, chest heaving. The cave is cool and silent. Outside, you hear voices—guards searching.',
        next: 'hide_in_cave'
    },
    
    hide_in_cave: {
        background: 'cave-interior',
        characters: [
            { type: 'char-protagonist' },
            { type: 'char-friend' },
            { type: 'char-friend' }
        ],
        speaker: 'Yamlikha',
        text: 'They will find us. It is only a matter of time.',
        choices: [
            {
                text: 'We must trust in God\'s protection.',
                faithChange: 10,
                next: 'trust_god'
            },
            {
                text: 'We should prepare to defend ourselves.',
                faithChange: -5,
                next: 'prepare_defense'
            },
            {
                text: 'Let us pray together for deliverance.',
                faithChange: 15,
                next: 'group_prayer'
            }
        ]
    },
    
    trust_god: {
        background: 'cave-interior',
        characters: [
            { type: 'char-protagonist', speaking: true },
            { type: 'char-friend' },
            { type: 'char-friend' }
        ],
        speaker: 'You',
        text: 'If this is where our journey ends, so be it. But I believe God led us here for a reason.',
        next: 'divine_intervention'
    },
    
    prepare_defense: {
        background: 'cave-interior',
        characters: [
            { type: 'char-protagonist' },
            { type: 'char-friend', speaking: true },
            { type: 'char-friend' }
        ],
        speaker: 'Makhus',
        text: 'There are rocks, narrow passages. We can make this costly for them.',
        next: 'divine_intervention'
    },
    
    group_prayer: {
        background: 'cave-interior',
        characters: [
            { type: 'char-protagonist' },
            { type: 'char-friend' },
            { type: 'char-friend' }
        ],
        speaker: 'Narrator',
        text: 'You kneel together in the darkness, hands joined. The words flow from your hearts, seeking refuge in the One who sees all. A strange peace descends upon you.',
        next: 'divine_intervention'
    },
    
    divine_intervention: {
        background: 'cave-interior',
        speaker: 'Narrator',
        text: 'Outside, a dog begins to bark near the cave entrance. You hear the guards approaching... then passing by. Their voices fade. Something miraculous has occurred.',
        next: 'safe_for_now'
    },
    
    safe_for_now: {
        background: 'cave-interior',
        characters: [
            { type: 'char-protagonist' },
            { type: 'char-friend' },
            { type: 'char-friend' }
        ],
        speaker: 'Yamlikha',
        text: 'They\'re gone. I don\'t understand... they walked right past us.',
        next: 'growing_tired'
    },
    
    growing_tired: {
        background: 'cave-interior',
        characters: [
            { type: 'char-protagonist' },
            { type: 'char-friend' },
            { type: 'char-friend' }
        ],
        speaker: 'Narrator',
        text: 'Exhaustion overtakes you. The terror of the chase, the relief of safety—it all crashes down at once. Your eyes grow heavy.',
        next: 'falling_asleep'
    },
    
    falling_asleep: {
        background: 'cave-interior',
        characters: [
            { type: 'char-protagonist' },
            { type: 'char-friend' },
            { type: 'char-friend' }
        ],
        speaker: 'Makhus',
        text: 'Perhaps we should rest, just for a moment. We can leave at nightfall...',
        next: 'sleep_descends'
    },
    
    sleep_descends: {
        background: 'cave-interior',
        speaker: 'Narrator',
        text: 'Your eyes close. In the embrace of the cave, protected by the Unseen Hand, you drift into a sleep deeper than any you have known.',
        next: 'time_passage'
    },
    
    time_passage: {
        background: 'cave-interior',
        speaker: 'Narrator',
        text: 'Days become years. Years become decades. Decades become centuries. The world outside transforms. Empires rise and fall. But in the cave, you sleep, untouched by time.',
        next: 'three_hundred_years'
    },
    
    three_hundred_years: {
        background: 'cave-interior',
        speaker: 'Narrator',
        text: '309 years pass like a single night.',
        next: 'awakening'
    },
    
    // ACT 3: AWAKENING
    awakening: {
        background: 'cave-interior',
        characters: [
            { type: 'char-protagonist' },
            { type: 'char-friend' },
            { type: 'char-friend' }
        ],
        speaker: 'Narrator',
        text: 'Your eyes open. Light filters through the cave entrance. You feel... rested. As if you slept a single night.',
        next: 'confusion'
    },
    
    confusion: {
        background: 'cave-interior',
        characters: [
            { type: 'char-protagonist', speaking: true },
            { type: 'char-friend' },
            { type: 'char-friend' }
        ],
        speaker: 'You',
        text: 'The guards... are they still out there?',
        next: 'friend_wakes'
    },
    
    friend_wakes: {
        background: 'cave-interior',
        characters: [
            { type: 'char-protagonist' },
            { type: 'char-friend', speaking: true },
            { type: 'char-friend' }
        ],
        speaker: 'Yamlikha',
        text: 'How long did we sleep? A few hours? We should check if it\'s safe to leave.',
        next: 'hunger'
    },
    
    hunger: {
        background: 'cave-interior',
        characters: [
            { type: 'char-protagonist' },
            { type: 'char-friend' },
            { type: 'char-friend', speaking: true }
        ],
        speaker: 'Makhus',
        text: 'I\'m hungry. We should send someone to buy food from the city.',
        choices: [
            {
                text: 'I\'ll go. I can blend in easily enough.',
                next: 'volunteer_to_go'
            },
            {
                text: 'Let Yamlikha go. He\'s the most careful of us.',
                next: 'send_yamlikha'
            },
            {
                text: 'We should all go together. Safety in numbers.',
                next: 'all_together'
            }
        ]
    },
    
    volunteer_to_go: {
        background: 'cave-interior',
        characters: [
            { type: 'char-protagonist', speaking: true },
            { type: 'char-friend' },
            { type: 'char-friend' }
        ],
        speaker: 'You',
        text: 'I\'ll take some coins and return quickly. Wait here.',
        next: 'exit_cave'
    },
    
    send_yamlikha: {
        background: 'cave-interior',
        characters: [
            { type: 'char-protagonist' },
            { type: 'char-friend', speaking: true },
            { type: 'char-friend' }
        ],
        speaker: 'Yamlikha',
        text: 'Very well. I\'ll be cautious and return before midday.',
        next: 'exit_cave'
    },
    
    all_together: {
        background: 'cave-interior',
        characters: [
            { type: 'char-protagonist' },
            { type: 'char-friend' },
            { type: 'char-friend' }
        ],
        speaker: 'Narrator',
        text: 'You decide to venture out together, supporting each other as always.',
        next: 'exit_cave'
    },
    
    exit_cave: {
        background: 'cave-entrance',
        speaker: 'Narrator',
        text: 'You step into daylight. The sun is warm, the sky clear. Everything seems... peaceful.',
        next: 'approach_city_future'
    },
    
    approach_city_future: {
        background: 'city-future',
        speaker: 'Narrator',
        text: 'As you descend the hill toward the city, something feels wrong. The buildings look different. The roads are paved in a way you don\'t recognize.',
        next: 'strange_city'
    },
    
    strange_city: {
        background: 'city-future',
        characters: [
            { type: 'char-protagonist', speaking: true }
        ],
        speaker: 'You',
        text: 'This can\'t be right. Did we come to the wrong city?',
        next: 'market_scene'
    },
    
    market_scene: {
        background: 'city-future',
        speaker: 'Narrator',
        text: 'You enter the marketplace. People wear strange clothes. They speak your language, but the accent is different. You approach a bread seller with an old coin.',
        next: 'coin_reaction'
    },
    
    coin_reaction: {
        background: 'city-future',
        characters: [
            { type: 'char-protagonist' }
        ],
        speaker: 'Merchant',
        text: 'Where did you get this? This coin... it\'s ancient! From the time of the old empire, three hundred years ago!',
        next: 'realization'
    },
    
    realization: {
        background: 'city-future',
        characters: [
            { type: 'char-protagonist', speaking: true }
        ],
        speaker: 'You',
        text: 'Three hundred... years? No. No, that\'s impossible. We only slept one night!',
        next: 'merchant_explains'
    },
    
    merchant_explains: {
        background: 'city-future',
        speaker: 'Merchant',
        text: 'Are you ill, friend? That empire fell long ago. The Emperor who persecuted believers is dust. His gods, forgotten. This is a new age.',
        next: 'truth_sinks_in'
    },
    
    truth_sinks_in: {
        background: 'city-future',
        characters: [
            { type: 'char-protagonist' }
        ],
        speaker: 'Narrator',
        text: 'The truth crashes over you like a wave. The guards you fled—long dead. The persecution—a distant memory. God preserved you through time itself.',
        next: 'final_choice'
    },
    
    final_choice: {
        background: 'city-future',
        characters: [
            { type: 'char-protagonist' }
        ],
        speaker: 'Narrator',
        text: 'You stand at a crossroads. Everyone you knew is gone. But you remain, a living testament to faith and divine mercy. What will you do with this second life?',
        choices: [
            {
                text: 'Share your story. The world must know of God\'s power.',
                next: 'ending_witness'
            },
            {
                text: 'Return to the cave. Perhaps there is more to understand.',
                next: 'ending_mystery'
            },
            {
                text: 'Begin anew. Build a life in this strange new world.',
                next: 'ending_renewal'
            }
        ]
    },
    
    ending_witness: {
        background: 'city-future',
        speaker: 'Narrator',
        text: 'You become a witness to the impossible. Your story spreads—a tale of faith, persecution, and miraculous preservation. You spend your remaining days reminding people that God\'s plans span centuries, and His mercy has no limits. [ENDING: The Witness]',
        choices: []
    },
    
    ending_mystery: {
        background: 'cave-interior',
        speaker: 'Narrator',
        text: 'You return to the cave, seeking answers in its silence. Some mysteries are not meant to be solved, only lived. You realize that faith itself is a kind of mystery—trusting without fully understanding. [ENDING: The Mystery]',
        choices: []
    },
    
    ending_renewal: {
        background: 'city-future',
        speaker: 'Narrator',
        text: 'You embrace this new world. The persecution you fled is gone. In its place, you find freedom to practice your faith openly. You build a new life, never forgetting the old, forever grateful for the divine hand that bridged the centuries. [ENDING: Renewal]',
        choices: []
    }
};

// Start the game
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        gameEngine.start('start');
    }, 500);
});

// Export for engine
window.STORY_DATA = STORY_DATA;
