/* ============================================================
   SURAH KAHF VISUAL NOVEL — story-dhul.js
   Story 4: Dhul-Qarnayn
   Lesson: Power is a trust, not an identity.
   ============================================================ */

'use strict';

const StoryDhul = {
  id:    'dhul',
  title: 'Dhul-Qarnayn',
  titleArabic: 'ذو القرنين',
  lesson: 'Power used with justice and humility is a gift, not an identity. Dhul-Qarnayn reached the ends of the earth — and never forgot who gave him that power.',

  characterMap: {
    'dhul':     { name: 'Dhul-Qarnayn' },
    'people':   { name: 'The People' },
    'narrator': { name: 'Narrator' },
  },

  preloadAyahs: [83, 84, 85, 86, 87, 88, 94, 95, 96, 97, 98],

  scenes: [

    /* ── Scene 0: Opening ─────────────────────────────────── */
    {
      id: 'opening',
      bg: 'linear-gradient(to bottom, #0a0005 0%, #1a0010 50%, #0a0005 100%)',
      ambient: null,
      characters: [],
      steps: [
        {
          type: 'narration',
          text: 'The people came to the Prophet ﷺ with a question — a test, sent by those who wanted to challenge him. "Ask him about a man who traveled the earth."',
        },
        {
          type: 'narration',
          text: 'Allah revealed the answer. His name was Dhul-Qarnayn — "The One with Two Horns." A king given power unlike any other.',
        },
        {
          type: 'verse',
          ref: 'Surah Al-Kahf 18:84',
          arabic: 'إِنَّا مَكَّنَّا لَهُ فِي الْأَرْضِ وَآتَيْنَاهُ مِن كُلِّ شَيْءٍ سَبَبًا',
          transliteration: 'Innā makkannā lahū fī l-arḍi wa-ātaynāhu min kulli shayʾin sababā.',
          translation: 'Indeed, We established him upon the earth, and We gave him to everything a way [i.e., means].',
          audio: 84,
        },
        {
          type: 'narration',
          text: 'Allah gave him the means to reach anywhere on earth. And he used it — traveling to the west, to the east, and finally to a valley between two mountains.',
        },
      ],
    },

    /* ── Scene 1: The West ────────────────────────────────── */
    {
      id: 'west',
      bg: 'linear-gradient(160deg, #1a0a00 0%, #2a1500 50%, #1a0800 100%)',
      ambient: null,
      characters: [
        { id: 'dhul', position: 'center', sprite: 'assets/characters/dhul-qarnayn.svg', name: 'Dhul-Qarnayn' },
      ],
      steps: [
        {
          type: 'narration',
          text: 'He traveled until he reached the setting of the sun — a place where it seemed to set in a dark, murky spring. There he found a people.',
        },
        {
          type: 'verse',
          ref: 'Surah Al-Kahf 18:86–87',
          arabic: 'حَتَّىٰ إِذَا بَلَغَ مَغْرِبَ الشَّمْسِ وَجَدَهَا تَغْرُبُ فِي عَيْنٍ حَمِئَةٍ وَوَجَدَ عِندَهَا قَوْمًا ۗ قُلْنَا يَا ذَا الْقَرْنَيْنِ إِمَّا أَن تُعَذِّبَ وَإِمَّا أَن تَتَّخِذَ فِيهِمْ حُسْنًا',
          transliteration: 'Ḥattā idhā balagha maghrib ash-shamsi wajadahā taghrubu fī ʿaynin ḥamiʾatin wa-wajada ʿindahā qawmā. Qulnā: yā Dhā l-Qarnayn immā an tuʿadhdhiba wa-immā an tattakhidha fīhim ḥusnā.',
          translation: 'Until, when he reached the setting of the sun, he found it [as if] setting in a spring of dark mud, and he found near it a people. We said: "O Dhul-Qarnayn, either you punish [them] or else adopt among them [a way of] goodness."',
          audio: 86,
        },
        {
          type: 'narration',
          text: 'Allah gave him a choice: punish or show goodness. A lesser king would have chosen power. Dhul-Qarnayn chose justice.',
        },
        {
          type: 'dialogue',
          speaker: 'Dhul-Qarnayn',
          text: 'As for one who wrongs — we will punish him. Then he will be returned to his Lord, and He will punish him with a terrible punishment. But as for one who believes and does righteousness — he will have a good reward.',
        },
        {
          type: 'narration',
          text: 'He did not rule by ego. He ruled by principle. The power was Allah\'s — he was only the instrument.',
        },
      ],
    },

    /* ── Scene 2: The East ────────────────────────────────── */
    {
      id: 'east',
      bg: 'linear-gradient(160deg, #0a0a1a 0%, #1a1a3a 50%, #0a0a1a 100%)',
      ambient: null,
      characters: [
        { id: 'dhul', position: 'center', sprite: 'assets/characters/dhul-qarnayn.svg', name: 'Dhul-Qarnayn' },
      ],
      steps: [
        {
          type: 'narration',
          text: 'Then he traveled to the east — to where the sun rises. He found a people who had no shelter from it.',
        },
        {
          type: 'narration',
          text: 'He did not conquer them. He did not exploit them. He passed through, and Allah\'s knowledge encompassed all that he did.',
        },
        {
          type: 'narration',
          text: 'This is the mark of a just ruler: he sees the vulnerable and does not take advantage. He moves on, leaving things better than he found them.',
        },
      ],
    },

    /* ── Scene 3: Yajuj & Majuj ───────────────────────────── */
    {
      id: 'yajuj-majuj',
      bg: 'linear-gradient(to bottom, #0a0a14 0%, #141428 50%, #0a0a14 100%)',
      ambient: null,
      animation: 'wall-rise',
      characters: [
        { id: 'dhul',   position: 'right', sprite: 'assets/characters/dhul-qarnayn.svg', name: 'Dhul-Qarnayn' },
        { id: 'people', position: 'left',  sprite: 'assets/characters/poor-man.svg',     name: 'The People' },
      ],
      steps: [
        {
          type: 'narration',
          text: 'Then he traveled between two mountains. There he found a people who could barely understand his language. They were desperate.',
        },
        {
          type: 'verse',
          ref: 'Surah Al-Kahf 18:94',
          arabic: 'قَالُوا يَا ذَا الْقَرْنَيْنِ إِنَّ يَأْجُوجَ وَمَأْجُوجَ مُفْسِدُونَ فِي الْأَرْضِ فَهَلْ نَجْعَلُ لَكَ خَرْجًا عَلَىٰ أَن تَجْعَلَ بَيْنَنَا وَبَيْنَهُمْ سَدًّا',
          transliteration: 'Qālū: yā Dhā l-Qarnayn inna Yājūja wa-Mājūja mufsidūna fī l-arḍi fa-hal najʿalu laka kharjan ʿalā an tajʿala baynanā wa-baynahum saddā.',
          translation: 'They said: "O Dhul-Qarnayn, indeed Gog and Magog are [great] corrupters in the land. So may we assign for you an expenditure that you might make between us and them a barrier?"',
          audio: 94,
        },
        {
          type: 'dialogue',
          speaker: 'Dhul-Qarnayn',
          text: 'What my Lord has established me in is better [than what you offer]. But assist me with strength; I will make between you and them a dam.',
        },
        {
          type: 'narration',
          text: 'He refused their money. He had enough. He asked only for their labor — their participation in their own protection.',
        },
        {
          type: 'animation',
          name: 'wall-rise',
          duration: 3500,
        },
        {
          type: 'verse',
          ref: 'Surah Al-Kahf 18:96–98',
          arabic: 'فَمَا اسْطَاعُوا أَن يَظْهَرُوهُ وَمَا اسْتَطَاعُوا لَهُ نَقْبًا ۝ قَالَ هَٰذَا رَحْمَةٌ مِّن رَّبِّي',
          transliteration: 'Fa-mā isṭāʿū an yaẓharūhu wa-mā istaṭāʿū lahū naqbā. Qāla: hādhā raḥmatun min rabbī.',
          translation: 'So they [i.e., Gog and Magog] were unable to pass over it, and they were unable [to make] in it any penetration. [Dhul-Qarnayn] said: "This is a mercy from my Lord."',
          audio: 96,
        },
        {
          type: 'narration',
          text: 'He built one of the greatest structures in history — and his first words were: "This is a mercy from my Lord." Not "I built this." Not "look what I did."',
        },
      ],
    },

    /* ── Scene 4: The Lesson ──────────────────────────────── */
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
          text: 'Dhul-Qarnayn had everything: power, resources, armies, the ability to reach the ends of the earth. And yet — he never made it about himself.',
        },
        {
          type: 'dialogue',
          speaker: 'Narrator',
          text: 'When offered money, he said: "What Allah gave me is better." When he finished the wall, he said: "This is a mercy from my Lord." He knew the difference between being given power and owning it.',
        },
        {
          type: 'dialogue',
          speaker: 'Narrator',
          text: 'This is the trap of power: you start to believe you are the source of it. That your position, your influence, your success — is you. It is not. It is a trust.',
        },
        {
          type: 'dialogue',
          speaker: 'Narrator',
          text: 'Whether you lead a company, a team, a family, or just your own life — the question is the same: are you using what you\'ve been given for justice and goodness? Or for your own ego?',
        },
        {
          type: 'narration',
          text: '— هَٰذَا رَحْمَةٌ مِّن رَّبِّي —',
        },
        {
          type: 'narration',
          text: '"This is a mercy from my Lord." — 18:98',
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
