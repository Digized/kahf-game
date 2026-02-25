// Scene Data for The Two Gardens
// Quran reference: Surah Al-Kahf 18:32-44

const SCENES = {
    start: {
        environment: 'gardens_lush',
        cameraPosition: { x: 0, y: 1.7, z: 0 },
        verse: {
            ref: 'Surah Al-Kahf 18:32',
            text: 'And present to them an example of two men...'
        },
        text: `
            <p>You are blessed with two magnificent gardens.</p>
            <p>Vineyards heavy with fruit. Date palms casting shade. Crystal streams flowing between.</p>
            <p>Everything you plant flourishes. Everything you touch prospers.</p>
            <p>Your friend stands beside you, watching with admiration.</p>
            <p>"How did you achieve all this?" he asks.</p>
        `,
        choices: [
            {
                text: '"By Allah\'s grace. All belongs to Him."',
                type: 'grateful',
                next: 'gratitude_path'
            },
            {
                text: '"Through my own effort and skill."',
                type: 'prideful',
                next: 'pride_path'
            }
        ]
    },
    
    gratitude_path: {
        environment: 'gardens_lush',
        verse: {
            ref: 'Wisdom',
            text: 'Say: "Ma sha Allah" (As Allah wills)'
        },
        text: `
            <p>"This is from Allah alone," you say quietly. "I worked, but He gave the increase."</p>
            <p>Your friend nods thoughtfully.</p>
            <p>The gardens seem to glow brighter. A gentle breeze carries the scent of blossoms.</p>
            <p>You feel peace in your heart, knowing the true source of all blessings.</p>
        `,
        choices: [
            {
                text: 'Share the harvest with those in need',
                next: 'charity_ending'
            },
            {
                text: 'Simply maintain gratitude',
                next: 'gratitude_ending'
            }
        ]
    },
    
    pride_path: {
        environment: 'gardens_lush',
        cameraPosition: { x: 0, y: 1.7, z: 0 },
        verse: {
            ref: 'Surah Al-Kahf 18:35-36',
            text: 'I do not think this will perish... nor do I think the Hour will occur.'
        },
        text: `
            <p>"I built this with my own hands," you say proudly. "My knowledge, my planning."</p>
            <p>You walk through the gardens, chest swelling with satisfaction.</p>
            <p>"These gardens will last forever. I've secured my legacy."</p>
            <p>Your friend looks concerned but says nothing.</p>
            <p>Dark clouds gather on the horizon.</p>
        `,
        choices: [
            {
                text: 'Continue boasting',
                next: 'destruction_warning'
            },
            {
                text: 'Reconsider your words',
                next: 'repentance_moment'
            }
        ]
    },
    
    destruction_warning: {
        environment: 'gardens_dying',
        verse: {
            ref: 'Surah Al-Kahf 18:40-41',
            text: 'Perhaps my Lord will give me better than your garden...'
        },
        text: `
            <p>Thunder rolls across the sky.</p>
            <p>"Nothing can touch my gardens," you insist. "I've protected them against every threat."</p>
            <p>Your friend speaks softly: "Perhaps you should remember who truly provides."</p>
            <p>"I don't need to remember anyone," you snap. "This is mine."</p>
            <p>The first drops of rain begin to fall. Heavy. Unrelenting.</p>
        `,
        choices: [
            {
                text: 'Rush to protect the gardens',
                next: 'destruction_ending'
            },
            {
                text: 'Finally acknowledge your mistake',
                next: 'late_repentance_ending'
            }
        ]
    },
    
    repentance_moment: {
        environment: 'gardens_lush',
        verse: {
            ref: 'Reminder',
            text: 'Turn back before it is too late'
        },
        text: `
            <p>You pause mid-sentence.</p>
            <p>Something in your friend's eyes makes you reconsider.</p>
            <p>"Wait... I spoke in haste," you admit. "These gardens... they are not truly mine, are they?"</p>
            <p>"All is from Allah," your friend says gently.</p>
            <p>You look around at the beauty surrounding you with new eyes.</p>
        `,
        choices: [
            {
                text: 'Sincerely repent and change',
                next: 'redemption_ending'
            }
        ]
    },
    
    charity_ending: {
        environment: 'gardens_flourishing',
        verse: {
            ref: 'Lesson',
            text: 'Give from what Allah has provided you'
        },
        text: `
            <p>You open your gates to the poor and needy.</p>
            <p>Baskets of dates, grapes, and grain flow out to the community.</p>
            <p>With every gift you give, your gardens seem to yield even more.</p>
            <p style="text-align: center; font-style: italic; color: #4caf50;">"The hand that gives is always above the hand that receives."</p>
            <p>Your wealth increases not in spite of generosity, but because of it.</p>
            <p>This is the secret of barakah - divine blessing.</p>
        `,
        choices: []
    },
    
    gratitude_ending: {
        environment: 'gardens_flourishing',
        verse: {
            ref: 'Wisdom',
            text: 'If you are grateful, I will surely increase you'
        },
        text: `
            <p>You tend your gardens with humility.</p>
            <p>Each morning, you thank Allah for another day of provision.</p>
            <p>The gardens remain healthy, protected by your gratitude.</p>
            <p style="text-align: center; font-style: italic; color: #8bc34a;">When the heart is grateful, blessings multiply.</p>
            <p>Years pass. Your gardens continue to flourish.</p>
            <p>More importantly, your soul flourishes too.</p>
        `,
        choices: []
    },
    
    destruction_ending: {
        environment: 'gardens_destroyed',
        verse: {
            ref: 'Surah Al-Kahf 18:42',
            text: 'And his fruits were encompassed...'
        },
        text: `
            <div class="arabic">وَأُحِيطَ بِثَمَرِهِۦ فَأَصْبَحَ يُقَلِّبُ كَفَّيْهِ</div>
            <div class="translation">"And his fruits were encompassed [by ruin], so he began to turn his hands about [in dismay]..."</div>
            <div class="citation">— Surah Al-Kahf 18:42</div>
            
            <p>You watch helplessly as torrential rains flood your gardens.</p>
            <p>Vines torn from the ground. Palm trees toppled. Streams turned to raging torrents.</p>
            <p>In one night, everything is destroyed.</p>
            <p>"If only... if only I had said, 'Ma sha Allah.'"</p>
            <p>But it is too late.</p>
            
            <p style="text-align: center; font-style: italic; color: #f44336; margin-top: 30px;">
            Pride comes before destruction. Arrogance invites calamity.
            </p>
        `,
        choices: []
    },
    
    late_repentance_ending: {
        environment: 'gardens_dying',
        verse: {
            ref: 'Surah Al-Kahf 18:42',
            text: 'Would that I had not associated with my Lord anyone'
        },
        text: `
            <p>As the rain begins to destroy your gardens, you finally understand.</p>
            <p>"Forgive me," you whisper. "I was arrogant. I forgot You."</p>
            <p>The destruction continues, but something shifts within you.</p>
            <p>Your friend places a hand on your shoulder.</p>
            <p>"You have lost your gardens," he says, "but perhaps you have gained something more valuable."</p>
            
            <p style="text-align: center; font-style: italic; color: #ff9800;">
            Sometimes we must lose what we treasure to remember what truly matters.
            </p>
        `,
        choices: []
    },
    
    redemption_ending: {
        environment: 'gardens_lush',
        verse: {
            ref: 'Hope',
            text: 'Indeed, Allah is Forgiving and Merciful'
        },
        text: `
            <p>You catch your pride before it consumes you.</p>
            <p>"Ma sha Allah," you say sincerely. "All belongs to Allah."</p>
            <p>The dark clouds begin to part. The storm that threatened never comes.</p>
            <p>Your friend smiles. "Now you understand."</p>
            <p>The gardens remain, but more importantly, your heart has been saved from ruin.</p>
            
            <p style="text-align: center; font-style: italic; color: #8bc34a;">
            The greatest wealth is humility. The best protection is gratitude.
            </p>
        `,
        choices: []
    }
};
