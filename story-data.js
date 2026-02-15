// Story structure for Surah Al-Kahf game
// Each node has: id, text, choices (with next node), and optional lesson

const storyData = {
    caveSleepers: {
        start: {
            id: 'start',
            text: 'You live in a city ruled by a tyrant king who demands all citizens worship him as a god. You and your companions believe in the One True God. The king\'s guards are searching for those who refuse to bow.',
            choices: [
                { text: 'Speak out publicly against the tyrant', next: 'speak_out' },
                { text: 'Seek refuge and remain steadfast in faith', next: 'seek_refuge' },
                { text: 'Pretend to comply while hiding your beliefs', next: 'pretend' }
            ]
        },
        
        speak_out: {
            id: 'speak_out',
            text: 'You boldly proclaim your faith in the town square. The people are moved, but the guards seize you immediately. You face torture and persecution.',
            choices: [
                { text: 'Endure with patience and maintain your faith', next: 'endure_torture' },
                { text: 'Try to escape and regroup with believers', next: 'escape_attempt' }
            ]
        },

        endure_torture: {
            id: 'endure_torture',
            text: 'Your steadfastness inspires others, but you are imprisoned. In your cell, you find peace in prayer and trust in God\'s plan.',
            lesson: {
                title: 'Lesson: Courage in Faith',
                text: 'Standing firm in truth requires great courage, but God is with those who are patient. Sometimes the greatest victories are not visible in this world.'
            }
        },

        escape_attempt: {
            id: 'escape_attempt',
            text: 'You attempt to flee but are caught. Your impulsive action endangered not only yourself but also your companions.',
            lesson: {
                title: 'Reflection: Wisdom in Action',
                text: 'Bravery must be tempered with wisdom. Rash decisions can have unintended consequences. Faith requires both courage and thoughtfulness.'
            }
        },

        seek_refuge: {
            id: 'seek_refuge',
            text: 'You and your companions quietly leave the city under the cover of night. You find a cave in the mountains where you can worship freely. You trust in God\'s protection.',
            choices: [
                { text: 'Rest in the cave and trust in God\'s plan', next: 'trust_god' },
                { text: 'Stay alert and keep watch constantly', next: 'stay_alert' }
            ]
        },

        trust_god: {
            id: 'trust_god',
            text: 'You place your complete trust in Allah and fall into a deep sleep. When you awaken, everything has changed. Centuries have passed, the tyrant is long gone, and people now worship One God freely. Your story becomes a sign for all generations.',
            lesson: {
                title: 'Lesson: Trust in God\'s Plan',
                text: 'The youth of the cave trusted completely in Allah\'s protection. Their faith was rewarded beyond imagination. True believers submit to God\'s will and timing, knowing His plan is perfect even when we cannot see it.'
            }
        },

        stay_alert: {
            id: 'stay_alert',
            text: 'Despite your vigilance, exhaustion overtakes you. You realize that ultimate protection comes from God, not your own watchfulness. You surrender your worries to Him and find peace.',
            lesson: {
                title: 'Lesson: Divine Protection',
                text: 'We must take reasonable precautions, but recognize that true safety comes from God alone. Constant anxiety shows lack of trust in the Divine.'
            }
        },

        pretend: {
            id: 'pretend',
            text: 'You bow before the tyrant outwardly while believing differently in your heart. This brings temporary safety, but your soul feels burdened. Your companions are confused by your actions.',
            choices: [
                { text: 'Confess your duplicity and seek forgiveness', next: 'seek_forgiveness' },
                { text: 'Continue the deception', next: 'continue_deception' }
            ]
        },

        seek_forgiveness: {
            id: 'seek_forgiveness',
            text: 'You realize hypocrisy weakens faith. You rejoin your companions in sincerity and flee to the cave together, seeking God\'s mercy for your weakness.',
            lesson: {
                title: 'Lesson: Sincere Repentance',
                text: 'God loves those who turn back to Him. Admitting our mistakes and returning to truth is always better than persisting in deception.'
            }
        },

        continue_deception: {
            id: 'continue_deception',
            text: 'Living a double life erodes your faith gradually. You gain temporary worldly comfort but lose inner peace and connection with your companions.',
            lesson: {
                title: 'Warning: The Cost of Hypocrisy',
                text: 'Faith in the heart must align with actions. Hypocrisy may provide temporary safety but leads to spiritual loss. Integrity is essential to true faith.'
            }
        }
    }
};

// Planned chapters (structure for future development)
const chapters = [
    { id: 'caveSleepers', title: 'Chapter 1: The Cave Sleepers', theme: 'Faith & Trust' },
    { id: 'twoGardens', title: 'Chapter 2: The Two Gardens', theme: 'Gratitude vs Arrogance' },
    { id: 'mosesKhidr', title: 'Chapter 3: Moses & Al-Khidr', theme: 'Patience & Divine Wisdom' },
    { id: 'dhulQarnayn', title: 'Chapter 4: Dhul-Qarnayn', theme: 'Justice & Power' }
];