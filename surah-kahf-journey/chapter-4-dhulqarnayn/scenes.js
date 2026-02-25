// Scene Data for Dhul-Qarnayn
// Quran reference: Surah Al-Kahf 18:83-98

const SCENES = {
    start: {
        environment: 'throne_room',
        cameraPosition: { x: 0, y: 1.7, z: 0 },
        verse: {
            ref: 'Surah Al-Kahf 18:84',
            text: 'We established him upon the earth, and We gave him to everything a way.'
        },
        text: `
            <p>You are <strong>Dhul-Qarnayn</strong>, a just and powerful ruler.</p>
            <p>Allah has granted you means to reach the far corners of the earth.</p>
            <p>Your kingdom prospers. Your armies are strong. Your wisdom is renowned.</p>
            <p>But power without purpose is vanity.</p>
            <p>The question is: how will you use what you have been given?</p>
        `,
        choices: [
            {
                text: 'Journey to serve Allah and help the oppressed',
                next: 'journey_west'
            },
            {
                text: 'Expand my empire for glory',
                next: 'conquest_path'
            }
        ]
    },
    
    journey_west: {
        environment: 'sunset_shore',
        verse: {
            ref: 'Surah Al-Kahf 18:86',
            text: 'Until, when he reached the setting of the sun...'
        },
        text: `
            <p>You journey westward until you reach a place where the sun seems to set into a dark, murky spring.</p>
            <p>Near it, you find a people who have known only oppression.</p>
            <p>"O Dhul-Qarnayn!" they call out. "Rule us justly, for we have suffered under tyrants."</p>
            <div class="arabic">قُلْنَا يَـٰذَا ٱلْقَرْنَيْنِ إِمَّآ أَن تُعَذِّبَ وَإِمَّآ أَن تَتَّخِذَ فِيهِمْ حُسْنًۭا</div>
            <div class="translation">"We said, 'O Dhul-Qarnayn, either you punish [them] or else adopt among them [a way of] goodness.'"</div>
            <div class="citation">— Surah Al-Kahf 18:86</div>
        `,
        choices: [
            {
                text: '"Whoever wrongs will be punished. Whoever believes will have goodness."',
                next: 'justice_west'
            },
            {
                text: 'Establish harsh rule to maintain control',
                next: 'tyranny_west'
            }
        ]
    },
    
    conquest_path: {
        environment: 'battlefield',
        verse: {
            ref: 'Warning',
            text: 'Power sought for its own sake corrupts'
        },
        text: `
            <p>You march your armies not to bring justice, but to expand your dominion.</p>
            <p>Villages burn. Peoples submit not out of respect, but fear.</p>
            <p>Your empire grows, but at what cost?</p>
            <p>An advisor approaches: "Great king, the people speak of you as a conqueror, not a liberator."</p>
        `,
        choices: [
            {
                text: 'Reflect and change course',
                next: 'redemption_ruler'
            },
            {
                text: 'Power is its own reward',
                next: 'tyrant_ending'
            }
        ]
    },
    
    justice_west: {
        environment: 'western_city',
        verse: {
            ref: 'Wisdom',
            text: 'Justice establishes kingdoms'
        },
        text: `
            <p>You establish just laws. Wrongdoers face consequences. The righteous are protected.</p>
            <p>The people flourish under your governance.</p>
            <p>"You have freed us from oppression," they say with gratitude.</p>
            <p>But your journey is not yet complete.</p>
        `,
        choices: [
            {
                text: 'Continue eastward',
                next: 'journey_east'
            }
        ]
    },
    
    tyranny_west: {
        environment: 'western_city',
        verse: {
            ref: 'Warning',
            text: 'Those who oppress will face reckoning'
        },
        text: `
            <p>You rule with an iron fist. Dissent is crushed.</p>
            <p>The people obey, but they do not love you.</p>
            <p>Fear is not the same as respect.</p>
            <p>Your empire is built on sand.</p>
        `,
        choices: [
            {
                text: 'Realize the error and seek to fix it',
                next: 'late_justice'
            },
            {
                text: 'Continue this path',
                next: 'tyrant_ending'
            }
        ]
    },
    
    journey_east: {
        environment: 'sunrise_plain',
        verse: {
            ref: 'Surah Al-Kahf 18:90',
            text: 'Until, when he came to the rising of the sun...'
        },
        text: `
            <p>You travel eastward until you reach a place where the sun rises upon a people who have no shelter from it.</p>
            <p>They are vulnerable, exposed, living simply.</p>
            <p>They have little, but they are peaceful.</p>
            <p>You could exploit them easily. Or you could protect them.</p>
        `,
        choices: [
            {
                text: 'Leave them in peace and offer protection',
                next: 'mercy_east'
            },
            {
                text: 'Extract tribute for my efforts',
                next: 'exploitation_ending'
            }
        ]
    },
    
    mercy_east: {
        environment: 'sunrise_plain',
        verse: {
            ref: 'Wisdom',
            text: 'True power is shown in restraint'
        },
        text: `
            <p>You do not burden them. You leave them in peace.</p>
            <p>"May Allah bless you, O just ruler," they say.</p>
            <p>Your reputation spreads not as a conqueror, but as a protector of the weak.</p>
            <p>You continue your journey northward.</p>
        `,
        choices: [
            {
                text: 'Proceed to the lands between mountains',
                next: 'mountain_people'
            }
        ]
    },
    
    mountain_people: {
        environment: 'mountain_pass',
        verse: {
            ref: 'Surah Al-Kahf 18:94',
            text: 'They said, "O Dhul-Qarnayn, indeed Gog and Magog are corrupters in the land..."'
        },
        text: `
            <p>Between two mountains, you find a people besieged by the forces of Gog and Magog.</p>
            <p>Raiding. Destroying. Taking without mercy.</p>
            <p>"O Dhul-Qarnayn," they plead, "build us a barrier! We will pay you whatever you ask!"</p>
            <div class="arabic">قَالُوا۟ يَـٰذَا ٱلْقَرْنَيْنِ إِنَّ يَأْجُوجَ وَمَأْجُوجَ مُفْسِدُونَ فِى ٱلْأَرْضِ</div>
            <div class="translation">"They said, 'O Dhul-Qarnayn, indeed Gog and Magog are corrupters in the land.'"</div>
            <div class="citation">— Surah Al-Kahf 18:94</div>
        `,
        choices: [
            {
                text: '"Give me aid with strength; I will make a barrier."',
                next: 'build_wall'
            },
            {
                text: 'Demand excessive payment first',
                next: 'mercenary_ending'
            }
        ]
    },
    
    build_wall: {
        environment: 'construction_site',
        verse: {
            ref: 'Surah Al-Kahf 18:95-96',
            text: '"Bring me sheets of iron..." "Bring me molten copper..."'
        },
        text: `
            <p>You command your workers to bring iron and copper.</p>
            <p>Between the two mountains, a massive barrier rises.</p>
            <p>Layer upon layer. Iron fused with molten copper.</p>
            <p>Gog and Magog cannot scale it. Cannot tunnel through it.</p>
            <p>The people are saved.</p>
        `,
        choices: [
            {
                text: '"This is a mercy from my Lord."',
                next: 'humble_ending'
            },
            {
                text: '"Behold my great achievement!"',
                next: 'prideful_ending'
            }
        ]
    },
    
    humble_ending: {
        environment: 'completed_wall',
        verse: {
            ref: 'Surah Al-Kahf 18:98',
            text: '"This is a mercy from my Lord..."'
        },
        text: `
            <div class="arabic">قَالَ هَـٰذَا رَحْمَةٌۭ مِّن رَّبِّى</div>
            <div class="translation">"He said, 'This is a mercy from my Lord.'"</div>
            <div class="citation">— Surah Al-Kahf 18:98</div>
            
            <p>You stand before the great wall and acknowledge the truth:</p>
            <p>"This is a mercy from my Lord. When His promise comes to pass, He will level it. And His promise is ever true."</p>
            <p>The people celebrate you, but you deflect the praise.</p>
            <p>You were given power not for your own glory, but to serve.</p>
            
            <p style="text-align: center; font-style: italic; color: #4caf50; margin-top: 30px;">
            True leadership is service. True power is humility before the Divine.
            </p>
        `,
        choices: []
    },
    
    prideful_ending: {
        environment: 'completed_wall',
        verse: {
            ref: 'Warning',
            text: 'Pride turns blessings into curses'
        },
        text: `
            <p>"Look upon my work!" you proclaim. "No one could have done this but me!"</p>
            <p>The people cheer, but your heart swells with arrogance.</p>
            <p>You forget that it was Allah who gave you the means.</p>
            <p>The wall stands, but your legacy is tarnished.</p>
            
            <p style="text-align: center; font-style: italic; color: #ff9800;">
            You achieved greatness, but failed to remain humble. The work was blessed; the pride was not.
            </p>
        `,
        choices: []
    },
    
    tyrant_ending: {
        environment: 'ruined_kingdom',
        verse: {
            ref: 'Warning',
            text: 'Tyrants build nothing lasting'
        },
        text: `
            <p>Your empire expands through fear and force.</p>
            <p>But empires built on oppression crumble from within.</p>
            <p>Rebellions rise. Allies betray. The people await your fall.</p>
            <p>In the end, you are remembered not as Dhul-Qarnayn the Just, but as a conqueror who wasted divine gifts.</p>
            
            <p style="text-align: center; font-style: italic; color: #f44336;">
            Power without justice is tyranny. And tyranny always falls.
            </p>
        `,
        choices: []
    },
    
    redemption_ruler: {
        environment: 'throne_room',
        verse: {
            ref: 'Hope',
            text: 'Repentance and reform are always possible'
        },
        text: `
            <p>You pause your conquests and reflect.</p>
            <p>"I have been seeking glory for myself, not serving those under my care."</p>
            <p>You command your armies to rebuild what they destroyed.</p>
            <p>You establish just governance.</p>
            <p>It is not too late to become the ruler you were meant to be.</p>
            
            <p style="text-align: center; font-style: italic; color: #8bc34a;">
            A wise ruler corrects their course before it is too late.
            </p>
        `,
        choices: []
    },
    
    mercenary_ending: {
        environment: 'mountain_pass',
        verse: {
            ref: 'Warning',
            text: 'Exploiting the desperate is a grave sin'
        },
        text: `
            <p>"I will build your wall," you say, "but first, give me your wealth."</p>
            <p>The people are desperate. They agree.</p>
            <p>You build the wall, but your heart is tainted by greed.</p>
            <p>You protected the weak, but only after extracting a price.</p>
            
            <p style="text-align: center; font-style: italic; color: #ff6b6b;">
            Justice delayed by greed is not true justice.
            </p>
        `,
        choices: []
    },
    
    exploitation_ending: {
        environment: 'sunrise_plain',
        verse: {
            ref: 'Warning',
            text: 'Exploiting the vulnerable brings ruin'
        },
        text: `
            <p>You demand tribute from these vulnerable people.</p>
            <p>They have little, but you take what they have.</p>
            <p>Your greed turns a journey of justice into one of exploitation.</p>
            <p>You are no better than the tyrants you once opposed.</p>
            
            <p style="text-align: center; font-style: italic; color: #f44336;">
            Power that exploits the weak is the worst kind of tyranny.
            </p>
        `,
        choices: []
    },
    
    late_justice: {
        environment: 'western_city',
        verse: {
            ref: 'Reflection',
            text: 'Better late than never'
        },
        text: `
            <p>You see the fear in your people's eyes and realize what you have become.</p>
            <p>"I have ruled with cruelty," you admit. "Let me change."</p>
            <p>You release those unjustly imprisoned. You establish fair laws.</p>
            <p>The people are wary, but willing to give you a chance.</p>
            
            <p style="text-align: center; font-style: italic; color: #ff9800;">
            Changing course is difficult, but necessary. May your future be better than your past.
            </p>
        `,
        choices: []
    }
};
