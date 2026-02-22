// Scene Data for People of the Cave
// Verified against Quran.com - Surah Al-Kahf 18:9-26
// Translation: Saheeh International

const SCENES = {
    start: {
        environment: 'city',
        cameraPosition: { x: 0, y: 1.7, z: 0 },
        text: `
            <p>You are one of the <strong>believing youths</strong> in a city ruled by a tyrant king.</p>
            <div class="arabic">أَمْ حَسِبْتَ أَنَّ أَصْحَـٰبَ ٱلْكَهْفِ وَٱلرَّقِيمِ كَانُوا۟ مِنْ ءَايَـٰتِنَا عَجَبًا</div>
            <div class="translation">Or have you thought that the companions of the cave and the inscription were, among Our signs, a wonder?</div>
            <div class="citation">— Surah Al-Kahf 18:9</div>
            <p>The king demands worship of false idols. He persecutes those who refuse.</p>
            <p>You and your companions believe in One God alone. But to speak this truth openly means death.</p>
            <p>What will you choose?</p>
        `,
        choices: [
            {
                text: 'Stand firm in faith, despite the danger',
                next: 'persecution'
            },
            {
                text: 'Hide your faith to survive',
                next: 'compromise'
            }
        ]
    },
    
    persecution: {
        environment: 'city',
        text: `
            <p>You and your companions refuse to bow to idols.</p>
            <p>The guards notice. Whispers spread. The king's soldiers are coming.</p>
            <div class="arabic">إِذْ قَامُوا۟ فَقَالُوا۟ رَبُّنَا رَبُّ ٱلسَّمَـٰوَٰتِ وَٱلْأَرْضِ</div>
            <div class="translation">When they stood up and said, "Our Lord is the Lord of the heavens and the earth."</div>
            <div class="citation">— Surah Al-Kahf 18:14</div>
            <p>"We will not invoke besides Him any deity," you declare to your companions. "To do so would be an outrageous lie."</p>
            <p>The decision is made. You must flee.</p>
        `,
        choices: [
            {
                text: 'Escape to the cave in the mountains',
                next: 'cave_entry'
            }
        ]
    },
    
    compromise: {
        environment: 'city',
        text: `
            <p>You stay silent. Bow your head when the idols pass.</p>
            <p>You survive another day. But your heart is heavy.</p>
            <p>That night, you see your companions gathering in secret. They plan to flee—to hold fast to faith rather than compromise.</p>
            <p>You feel shame. Faith requires courage, not comfort.</p>
            <p>You run to join them before they leave.</p>
        `,
        choices: [
            {
                text: 'Join your companions in their flight',
                next: 'cave_entry'
            }
        ]
    },
    
    cave_entry: {
        environment: 'cave_entrance',
        text: `
            <p>You flee the city under cover of darkness. The mountains loom ahead.</p>
            <p>A dog follows you—loyal, gentle. You do not chase it away.</p>
            <div class="arabic">إِذْ أَوَى ٱلْفِتْيَةُ إِلَى ٱلْكَهْفِ فَقَالُوا۟ رَبَّنَآ ءَاتِنَا مِن لَّدُنكَ رَحْمَةًۭ وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًۭا</div>
            <div class="translation">When the youths retreated to the cave and said, "Our Lord, grant us from Yourself mercy and prepare for us from our affair right guidance."</div>
            <div class="citation">— Surah Al-Kahf 18:10</div>
            <p>You enter a cave—dark, sheltered, hidden from the world.</p>
            <p>"Our Lord," you pray together, "grant us mercy. Guide us."</p>
            <p>Exhausted, you lie down to rest.</p>
        `,
        choices: [
            {
                text: 'Sleep, trusting in Allah's protection',
                next: 'divine_sleep'
            }
        ]
    },
    
    divine_sleep: {
        environment: 'cave_dark',
        text: `
            <div class="arabic">فَضَرَبْنَا عَلَىٰٓ ءَاذَانِهِمْ فِى ٱلْكَهْفِ سِنِينَ عَدَدًۭا</div>
            <div class="translation">So We cast [a cover of sleep] over their ears within the cave for a number of years.</div>
            <div class="citation">— Surah Al-Kahf 18:11</div>
            <p><em>You close your eyes...</em></p>
            <p><em>...and sleep.</em></p>
            <p><em>A deep sleep. A protected sleep.</em></p>
            <p><em>Years pass like moments.</em></p>
            <p><em>Decades. Centuries.</em></p>
            <p><em>The sun rises and sets, rises and sets, outside the cave entrance.</em></p>
            <p><em>But you do not age. You do not hunger. You do not wake.</em></p>
            <p><em>Allah turns you gently from side to side, preserving your bodies.</em></p>
        `,
        choices: [
            {
                text: 'Continue...',
                next: 'awakening'
            }
        ]
    },
    
    awakening: {
        environment: 'cave_light',
        text: `
            <div class="arabic">ثُمَّ بَعَثْنَـٰهُمْ لِنَعْلَمَ أَىُّ ٱلْحِزْبَيْنِ أَحْصَىٰ لِمَا لَبِثُوٓا۟ أَمَدًۭا</div>
            <div class="translation">Then We awakened them that We might show which of the two factions was most precise in calculating what [extent] they had remained in time.</div>
            <div class="citation">— Surah Al-Kahf 18:12</div>
            <p>You wake.</p>
            <p>Your companions stir. The dog stretches.</p>
            <p>"How long did we sleep?" one asks.</p>
            <p>"A day," you say. "Or part of a day."</p>
            <p>You feel rested, but strange. The light outside seems different somehow.</p>
            <p>"We should send someone to the city for food," a companion suggests. "Carefully. In secret."</p>
        `,
        choices: [
            {
                text: 'Volunteer to go to the city',
                next: 'city_scout'
            },
            {
                text: 'Stay and let another go',
                next: 'city_scout'
            }
        ]
    },
    
    city_scout: {
        environment: 'cave_light',
        text: `
            <p>One of you takes silver coins and heads toward the city, moving carefully.</p>
            <div class="arabic">وَلْيَتَلَطَّفْ وَلَا يُشْعِرَنَّ بِكُمْ أَحَدًا</div>
            <div class="translation">And let him be cautious and not make aware of you anyone.</div>
            <div class="citation">— Surah Al-Kahf 18:19</div>
            <p>But when he reaches the market, something is wrong.</p>
            <p>The buildings are different. The people's clothing has changed. The dialect is unfamiliar.</p>
            <p>He tries to buy bread with his coins. The merchant stares.</p>
            <p>"Where did you get this?" the merchant demands. "This currency hasn't been used in... <em>centuries</em>."</p>
        `,
        choices: [
            {
                text: 'Continue',
                next: 'revelation_time'
            }
        ]
    },
    
    revelation_time: {
        environment: 'cave_light',
        text: `
            <p>A crowd gathers. Your companion flees back to the cave in confusion.</p>
            <p>"The tyrant king is dead," he gasps. "Long dead. The city follows a new faith now. They worship One God!"</p>
            <p>You look at each other in wonder.</p>
            <div class="arabic">قَالُوا۟ لَبِثْنَا يَوْمًا أَوْ بَعْضَ يَوْمٍۢ ۚ قَالُوا۟ رَبُّكُمْ أَعْلَمُ بِمَا لَبِثْتُمْ</div>
            <div class="translation">They said, "We have remained one day or part of a day." They said, "Your Lord is most knowing of how long you remained."</div>
            <div class="citation">— Surah Al-Kahf 18:19</div>
            <p>"How long were we truly asleep?"</p>
            <p>The people of the city find you. They are gentle, awed.</p>
            <p>"You are the ones from the old stories!" they say. "You have been asleep for three hundred years!"</p>
        `,
        choices: [
            {
                text: 'Reflect on Allah's protection',
                next: 'ending'
            }
        ]
    },
    
    ending: {
        environment: 'cave_light',
        text: `
            <div class="arabic">وَكَذَٰلِكَ أَعْثَرْنَا عَلَيْهِمْ لِيَعْلَمُوٓا۟ أَنَّ وَعْدَ ٱللَّهِ حَقٌّۭ</div>
            <div class="translation">And similarly, We caused them to be found that they [who found them] would know that the promise of Allah is truth.</div>
            <div class="citation">— Surah Al-Kahf 18:21</div>
            <p>You stood firm in faith when it cost everything.</p>
            <p>You fled persecution, trusting only in Allah.</p>
            <p>And Allah protected you—through centuries—bringing you to a time when faith could be practiced freely.</p>
            <p><strong>Lesson:</strong> When you sacrifice comfort for truth, Allah does not abandon you. His protection transcends time itself.</p>
            <p style="text-align: center; margin-top: 25px; color: #d4af37; font-style: italic;">"So they remained in their cave for three hundred years and exceeded by nine." (18:25)</p>
            <p style="text-align: center; margin-top: 15px; color: #b8b8b8;">Allah knows best how long they remained.</p>
        `,
        choices: []
    }
};
