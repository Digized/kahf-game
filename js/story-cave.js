/* ============================================================
   SURAH KAHF VISUAL NOVEL — story-cave.js
   Story 1: People of the Cave (Ashab al-Kahf)
   Lesson: Faith over conformity
   ============================================================ */

'use strict';

const StoryCave = {
  id:    'cave',
  title: 'People of the Cave',
  titleArabic: 'أصحاب الكهف',
  lesson: 'When the world pressures you to compromise your beliefs, trust Allah.',

  // Character map for speaker highlighting
  characterMap: {
    'youth1':   { name: 'Youth' },
    'youth2':   { name: 'Companion' },
    'narrator': { name: 'Narrator' },
    'elder':    { name: 'Elder' },
    'townsman': { name: 'Townsman' },
  },

  // Preload these ayahs
  preloadAyahs: [10, 13, 14, 16, 19],

  scenes: [

    /* ── Scene 0: Opening ─────────────────────────────────── */
    {
      id: 'opening',
      bg: 'linear-gradient(to bottom, #0d0d1a 0%, #1a1020 40%, #2a1a10 100%)',
      ambient: 'city',
      characters: [],
      steps: [
        {
          type: 'narration',
          text: 'Long ago, in a city ruled by a tyrant king, the people had turned away from the truth. Idols filled every corner. To worship the One God was to invite persecution.',
        },
        {
          type: 'narration',
          text: 'Yet among the people, there were young men — few in number, but firm in faith. They saw the falsehood around them and could not remain silent.',
        },
        {
          type: 'wait',
          duration: 800,
        },
      ],
    },

    /* ── Scene 1: The City ────────────────────────────────── */
    {
      id: 'city',
      bg: 'assets/backgrounds/youths-wisdom.jpg',
      ambient: 'city',
      characters: [
        { id: 'youth1', position: 'left',  sprite: 'assets/characters/youth.svg',  name: 'Youth' },
        { id: 'youth2', position: 'right', sprite: 'assets/characters/elder.svg',  name: 'Companion' },
      ],
      steps: [
        {
          type: 'dialogue',
          speaker: 'Youth',
          text: 'Look at them — bowing to stones carved by human hands. How can they not see? These idols cannot hear, cannot help, cannot harm.',
        },
        {
          type: 'dialogue',
          speaker: 'Companion',
          text: 'Keep your voice down. The king\'s men are everywhere. If they hear you speak against the idols...',
        },
        {
          type: 'dialogue',
          speaker: 'Youth',
          text: 'I know the risk. But how long can we stay silent? Our Lord is Allah — the One who created the heavens and the earth. That is the truth.',
        },
        {
          type: 'dialogue',
          speaker: 'Companion',
          text: 'You\'re right. And I would rather face the king\'s anger than stand before Allah having hidden what I believe.',
        },
        {
          type: 'narration',
          text: 'Allah tells us of these young men in Surah Al-Kahf:',
        },
      ],
    },

    /* ── Scene 2: Verse 18:13 ─────────────────────────────── */
    {
      id: 'verse-13',
      bg: 'assets/backgrounds/choice-execution.jpg',
      characters: [],
      steps: [
        {
          type: 'verse',
          ref: 'Surah Al-Kahf 18:13',
          arabic: 'نَّحْنُ نَقُصُّ عَلَيْكَ نَبَأَهُم بِالْحَقِّ ۚ إِنَّهُمْ فِتْيَةٌ آمَنُوا بِرَبِّهِمْ وَزِدْنَاهُمْ هُدًى',
          transliteration: 'Naḥnu naquṣṣu ʿalayka nabaʾahum bil-ḥaqq. Innahum fityatun āmanū bi-rabbihim wa-zidnāhum hudā.',
          translation: 'We relate to you their story in truth. Indeed, they were youths who believed in their Lord, and We increased them in guidance.',
          audio: 13,
        },
      ],
    },

    /* ── Scene 3: The Decision ────────────────────────────── */
    {
      id: 'decision',
      bg: 'assets/backgrounds/patience-faith.jpg',
      ambient: 'night',
      characters: [
        { id: 'youth1', position: 'left',  sprite: 'assets/characters/youth.svg',  name: 'Youth' },
        { id: 'youth2', position: 'right', sprite: 'assets/characters/elder.svg',  name: 'Companion' },
      ],
      steps: [
        {
          type: 'narration',
          text: 'The young men gathered in secret. The king had issued a decree: all must worship the idols at the festival, or face punishment.',
        },
        {
          type: 'dialogue',
          speaker: 'Youth',
          text: 'We cannot bow to those idols. Not even to save ourselves. Our Lord is Allah alone.',
        },
        {
          type: 'dialogue',
          speaker: 'Companion',
          text: 'Then we must leave. If we stay, they will force us or kill us. But if we flee to the cave in the mountains, perhaps Allah will provide a way.',
        },
        {
          type: 'dialogue',
          speaker: 'Youth',
          text: 'Yes. And when you withdraw from them and what they worship besides Allah, take refuge in the cave. Your Lord will spread out His mercy for you.',
        },
        {
          type: 'narration',
          text: 'This was their resolve — not cowardice, but wisdom. To preserve their faith, they chose to leave everything behind.',
        },
      ],
    },

    /* ── Scene 4: Verse 18:14 ─────────────────────────────── */
    {
      id: 'verse-14',
      bg: 'linear-gradient(to bottom, #0d0d1a 0%, #1a1020 60%, #0a0a0f 100%)',
      characters: [],
      steps: [
        {
          type: 'verse',
          ref: 'Surah Al-Kahf 18:14',
          arabic: 'وَرَبَطْنَا عَلَىٰ قُلُوبِهِمْ إِذْ قَامُوا فَقَالُوا رَبُّنَا رَبُّ السَّمَاوَاتِ وَالْأَرْضِ لَن نَّدْعُوَ مِن دُونِهِ إِلَٰهًا',
          transliteration: 'Wa-rabaṭnā ʿalā qulūbihim idh qāmū fa-qālū rabbunā rabbu s-samāwāti wa-l-arḍ, lan nadʿuwa min dūnihi ilāhā.',
          translation: 'And We made firm their hearts when they stood up and said: "Our Lord is the Lord of the heavens and the earth. Never will we invoke besides Him any deity."',
          audio: 14,
        },
      ],
    },

    /* ── Scene 5: The Flight ──────────────────────────────── */
    {
      id: 'flight',
      bg: 'assets/backgrounds/resolve-flee.jpg',
      ambient: 'night',
      animation: 'dust',
      characters: [
        { id: 'youth1', position: 'left',  sprite: 'assets/characters/youth.svg',  name: 'Youth', enter: 'anim-walk-in' },
        { id: 'youth2', position: 'right', sprite: 'assets/characters/elder.svg',  name: 'Companion', enter: 'anim-walk-in' },
      ],
      steps: [
        {
          type: 'narration',
          text: 'Under the cover of night, the young men fled the city. They climbed the rocky hills, their hearts pounding — not with fear, but with the certainty of faith.',
        },
        {
          type: 'dialogue',
          speaker: 'Youth',
          text: 'There — the cave. Just as we hoped.',
        },
        {
          type: 'dialogue',
          speaker: 'Companion',
          text: 'May Allah accept our sacrifice. We leave behind our homes, our families, our comfort — for His sake alone.',
        },
        {
          type: 'narration',
          text: 'They entered the cave. And then they made the most important thing a believer can do in a moment of helplessness — they turned to Allah.',
        },
      ],
    },

    /* ── Scene 6: The Prayer (18:10) ─────────────────────── */
    {
      id: 'prayer',
      bg: 'assets/backgrounds/cave-refuge.jpg',
      ambient: 'cave',
      characters: [
        { id: 'youth1', position: 'left',  sprite: 'assets/characters/youth.svg',  name: 'Youth' },
        { id: 'youth2', position: 'right', sprite: 'assets/characters/elder.svg',  name: 'Companion' },
      ],
      steps: [
        {
          type: 'narration',
          text: 'Inside the cave, in the darkness, they raised their hands and called upon their Lord:',
        },
        {
          type: 'verse',
          ref: 'Surah Al-Kahf 18:10 — Their Supplication',
          arabic: 'رَبَّنَا آتِنَا مِن لَّدُنكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا',
          transliteration: 'Rabbanā ātinā min ladunka raḥmatan wa-hayyi\' lanā min amrinā rashadā.',
          translation: '"Our Lord, grant us from Yourself mercy and prepare for us from our affair right guidance."',
          audio: 10,
        },
        {
          type: 'narration',
          text: 'This is the dua of the cave — a prayer of complete reliance on Allah. They had nothing left but Him. And that was enough.',
        },
      ],
    },

    /* ── Scene 7: The Sleep ───────────────────────────────── */
    {
      id: 'sleep',
      bg: '#000000',
      animation: 'cave-close',
      characters: [],
      steps: [
        {
          type: 'narration',
          text: 'Allah answered their prayer in a way they could never have imagined.',
        },
        {
          type: 'wait',
          duration: 1000,
        },
        {
          type: 'narration',
          text: 'He caused them to sleep.',
        },
        {
          type: 'wait',
          duration: 2000,
        },
        {
          type: 'narration',
          text: 'Not for a night. Not for a week.',
        },
        {
          type: 'wait',
          duration: 1500,
        },
        {
          type: 'narration',
          text: 'For three hundred and nine years.',
        },
        {
          type: 'wait',
          duration: 2000,
        },
        {
          type: 'narration',
          text: 'While they slept, Allah turned them from side to side, and their dog stretched his paws at the entrance. Anyone who saw them would have been filled with awe and fled.',
        },
      ],
    },

    /* ── Scene 8: The Awakening ───────────────────────────── */
    {
      id: 'awakening',
      bg: 'assets/backgrounds/journey-dog.jpg',
      ambient: 'cave',
      characters: [
        { id: 'youth1', position: 'left',  sprite: 'assets/characters/youth.svg',  name: 'Youth' },
        { id: 'youth2', position: 'right', sprite: 'assets/characters/elder.svg',  name: 'Companion' },
      ],
      steps: [
        {
          type: 'narration',
          text: 'Then Allah woke them. They looked at each other, confused.',
        },
        {
          type: 'dialogue',
          speaker: 'Youth',
          text: 'How long have we been here?',
        },
        {
          type: 'dialogue',
          speaker: 'Companion',
          text: 'A day? Part of a day? Allah knows best how long we have remained.',
        },
        {
          type: 'narration',
          text: 'Allah preserved this moment in the Quran:',
        },
        {
          type: 'verse',
          ref: 'Surah Al-Kahf 18:19',
          arabic: 'وَكَذَٰلِكَ بَعَثْنَاهُمْ لِيَتَسَاءَلُوا بَيْنَهُمْ ۚ قَالَ قَائِلٌ مِّنْهُمْ كَمْ لَبِثْتُمْ ۖ قَالُوا لَبِثْنَا يَوْمًا أَوْ بَعْضَ يَوْمٍ',
          transliteration: 'Wa-kadhālika baʿathnāhum li-yatasāʾalū baynahum. Qāla qāʾilun minhum: kam labithtum? Qālū: labithnā yawman aw baʿḍa yawm.',
          translation: 'And similarly, We awakened them that they might question one another. Said a speaker among them: "How long have you remained here?" They said: "We have remained a day or part of a day."',
          audio: 19,
        },
      ],
    },

    /* ── Scene 9: The Coin ────────────────────────────────── */
    {
      id: 'coin',
      bg: 'linear-gradient(160deg, #1a2a1a 0%, #2a3a2a 50%, #1a2a1a 100%)',
      ambient: 'city',
      characters: [
        { id: 'youth1', position: 'center', sprite: 'assets/characters/youth.svg', name: 'Youth' },
        { id: 'townsman', position: 'right', sprite: 'assets/characters/elder.svg', name: 'Townsman' },
      ],
      steps: [
        {
          type: 'dialogue',
          speaker: 'Youth',
          text: 'I\'ll go to the city and buy food. I have this old coin — it should be enough.',
        },
        {
          type: 'narration',
          text: 'He walked into the city — and stopped. Everything was different. The buildings, the people, the language. He approached a merchant with his coin.',
        },
        {
          type: 'dialogue',
          speaker: 'Townsman',
          text: 'Where did you get this coin? This is ancient — from the time of the old king, three centuries ago! Who are you?',
        },
        {
          type: 'dialogue',
          speaker: 'Youth',
          text: 'Three centuries? That\'s... impossible. I was just here yesterday...',
        },
        {
          type: 'narration',
          text: 'The news spread quickly. The people of the city — who had long since become believers — came to see the miracle. The young men were a sign from Allah.',
        },
        {
          type: 'narration',
          text: 'After the truth was revealed, Allah took their souls. They had fulfilled their purpose — a living proof that Allah\'s promise is real, and that the Hour will come.',
        },
      ],
    },

    /* ── Scene 10: The Lesson ─────────────────────────────── */
    {
      id: 'lesson',
      bg: 'linear-gradient(to bottom, #0a0a0f 0%, #12121a 100%)',
      characters: [
        { id: 'narrator', position: 'center', sprite: 'assets/characters/elder.svg', name: 'Narrator' },
      ],
      steps: [
        {
          type: 'dialogue',
          speaker: 'Narrator',
          text: 'The People of the Cave were not warriors. They had no army, no wealth, no political power. They were young people who simply refused to compromise their faith.',
        },
        {
          type: 'dialogue',
          speaker: 'Narrator',
          text: 'And Allah protected them in a way they never could have planned. He put them to sleep and woke them up in a world where their faith was no longer a crime.',
        },
        {
          type: 'dialogue',
          speaker: 'Narrator',
          text: 'The lesson for us today: When the world pressures you to compromise — in your workplace, your school, your social circle — remember the cave.',
        },
        {
          type: 'dialogue',
          speaker: 'Narrator',
          text: 'Sometimes the most powerful thing you can do is hold firm, make dua, and trust that Allah has a plan you cannot yet see.',
        },
        {
          type: 'narration',
          text: '— رَبَّنَا آتِنَا مِن لَّدُنكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا —',
        },
        {
          type: 'narration',
          text: '"Our Lord, grant us from Yourself mercy and prepare for us from our affair right guidance." — 18:10',
        },
        {
          type: 'wait',
          duration: 2000,
        },
        {
          type: 'choice',
          id: 'end-choice',
          prompt: 'What would you like to do?',
          options: [
            { text: '🏠 Return to Story Select', goto: 999 },
            { text: '📖 Read the full story again', goto: 0 },
          ],
        },
      ],
    },

    /* ── Scene 999: End ───────────────────────────────────── */
    {
      id: 'end',
      bg: '#0a0a0f',
      characters: [],
      steps: [
        { type: 'wait', duration: 500 },
      ],
    },

  ],
};
