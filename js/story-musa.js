/* ============================================================
   SURAH KAHF VISUAL NOVEL — story-musa.js
   Story 2: Musa & Khidr
   Lesson: Humility in knowledge. Allah's decree has wisdom beyond human sight.
   ============================================================ */

'use strict';

const StoryMusa = {
  id:    'musa',
  title: 'Musa & Khidr',
  titleArabic: 'موسى والخضر',
  lesson: 'Khidr acted on Allah\'s direct will — not his own wisdom. When something painful happens, it may be Allah\'s mercy in a form you cannot yet see.',

  characterMap: {
    'musa':     { name: 'Musa (AS)' },
    'khidr':    { name: 'Khidr' },
    'narrator': { name: 'Narrator' },
    'servant':  { name: 'Servant' },
    'captain':  { name: 'Captain' },
  },

  preloadAyahs: [65, 66, 67, 68, 69, 70, 71, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82],

  scenes: [

    /* ── Scene 0: Opening ─────────────────────────────────── */
    {
      id: 'opening',
      bg: 'linear-gradient(to bottom, #0a1a2a 0%, #0d2035 50%, #0a1520 100%)',
      ambient: 'desert',
      characters: [],
      steps: [
        {
          type: 'narration',
          text: 'Musa (peace be upon him) was one of the greatest prophets — a man who spoke directly with Allah, who parted the sea, who led his people from slavery to freedom.',
        },
        {
          type: 'narration',
          text: 'Yet one day, he was asked: "Is there anyone on earth more knowledgeable than you?" And Musa said: "No."',
        },
        {
          type: 'narration',
          text: 'Allah revealed to him: "Yes. There is a servant of Ours at the meeting of the two seas who has been given knowledge you have not been given."',
        },
        {
          type: 'narration',
          text: 'Musa immediately said: "I will not stop until I reach him, even if it takes me years." This is the story of what happened when he did.',
        },
      ],
    },

    /* ── Scene 1: The Journey ─────────────────────────────── */
    {
      id: 'journey',
      bg: 'linear-gradient(160deg, #0a1520 0%, #1a2a3a 50%, #0d1a28 100%)',
      ambient: 'water',
      characters: [
        { id: 'musa',    position: 'left',  sprite: 'assets/characters/musa.svg',   name: 'Musa (AS)' },
        { id: 'servant', position: 'right', sprite: 'assets/characters/youth.svg',  name: 'Servant' },
      ],
      steps: [
        {
          type: 'narration',
          text: 'Musa traveled with his young servant, carrying a fish as a sign — they were told they would find the man where the fish disappeared.',
        },
        {
          type: 'dialogue',
          speaker: 'Servant',
          text: 'O Musa — I forgot to tell you. When we rested at the rock by the sea, the fish... it came alive and slipped into the water. I forgot to mention it.',
        },
        {
          type: 'dialogue',
          speaker: 'Musa (AS)',
          text: 'That is what we were looking for! Let us return to that place.',
        },
        {
          type: 'narration',
          text: 'They retraced their steps. And there, at the meeting of the two seas, they found him.',
        },
      ],
    },

    /* ── Scene 2: Finding Khidr (18:65) ──────────────────── */
    {
      id: 'finding-khidr',
      bg: 'linear-gradient(to bottom, #0a1a2a 0%, #0d2035 60%, #0a1520 100%)',
      ambient: 'water',
      characters: [
        { id: 'musa',  position: 'left',  sprite: 'assets/characters/musa.svg',  name: 'Musa (AS)' },
        { id: 'khidr', position: 'right', sprite: 'assets/characters/khidr.svg', name: 'Khidr' },
      ],
      steps: [
        {
          type: 'narration',
          text: 'Allah describes what they found:',
        },
        {
          type: 'verse',
          ref: 'Surah Al-Kahf 18:65',
          arabic: 'فَوَجَدَا عَبْدًا مِّنْ عِبَادِنَا آتَيْنَاهُ رَحْمَةً مِّنْ عِندِنَا وَعَلَّمْنَاهُ مِن لَّدُنَّا عِلْمًا',
          transliteration: 'Fa-wajadā ʿabdan min ʿibādinā ātaynāhu raḥmatan min ʿindinā wa-ʿallamnāhu min ladunnā ʿilmā.',
          translation: 'And they found a servant from among Our servants to whom We had given mercy from Us and had taught him from Us a [certain] knowledge.',
          audio: 65,
        },
        {
          type: 'dialogue',
          speaker: 'Musa (AS)',
          text: 'May I follow you so that you may teach me from what you have been taught of right conduct?',
        },
        {
          type: 'dialogue',
          speaker: 'Khidr',
          text: 'Indeed, with me you will never be able to have patience. And how can you have patience for what you do not encompass in knowledge?',
        },
        {
          type: 'dialogue',
          speaker: 'Musa (AS)',
          text: 'You will find me, if Allah wills, patient. And I will not disobey you in any matter.',
        },
      ],
    },

    /* ── Scene 3: The Condition (18:66-70) ───────────────── */
    {
      id: 'condition',
      bg: 'linear-gradient(to bottom, #0a1a2a 0%, #0d2035 60%, #0a1520 100%)',
      ambient: 'water',
      characters: [
        { id: 'musa',  position: 'left',  sprite: 'assets/characters/musa.svg',  name: 'Musa (AS)' },
        { id: 'khidr', position: 'right', sprite: 'assets/characters/khidr.svg', name: 'Khidr' },
      ],
      steps: [
        {
          type: 'verse',
          ref: 'Surah Al-Kahf 18:70',
          arabic: 'قَالَ فَإِنِ اتَّبَعْتَنِي فَلَا تَسْأَلْنِي عَن شَيْءٍ حَتَّىٰ أُحْدِثَ لَكَ مِنْهُ ذِكْرًا',
          transliteration: 'Qāla fa-in ittabaʿtanī fa-lā tasʾalnī ʿan shayʾin ḥattā uḥditha laka minhu dhikrā.',
          translation: 'He said: "Then if you follow me, do not ask me about anything until I make to you about it mention."',
          audio: 70,
        },
        {
          type: 'dialogue',
          speaker: 'Khidr',
          text: 'This is my condition. You will see things that seem wrong, even terrible. You must not question me until I explain. Can you accept this?',
        },
        {
          type: 'dialogue',
          speaker: 'Musa (AS)',
          text: 'I accept. I will be patient.',
        },
        {
          type: 'narration',
          text: 'And so they set off together. Three tests awaited — each one more difficult than the last.',
        },
      ],
    },

    /* ── Scene 4: The Boat (CENTERPIECE ANIMATION) ────────── */
    {
      id: 'boat',
      bg: 'linear-gradient(to bottom, #0a1a2e 0%, #0d2040 40%, #0a1830 100%)',
      ambient: 'water',
      animation: 'boat-damage',
      characters: [
        { id: 'musa',  position: 'left',  sprite: 'assets/characters/musa.svg',  name: 'Musa (AS)' },
        { id: 'khidr', position: 'right', sprite: 'assets/characters/khidr.svg', name: 'Khidr' },
      ],
      steps: [
        {
          type: 'narration',
          text: 'They came to a river and boarded a boat with some poor fishermen. The fishermen recognized Khidr and offered them passage for free.',
        },
        {
          type: 'narration',
          text: 'Then — without warning — Khidr took a plank from the boat and broke it.',
        },
        {
          type: 'animation',
          name: 'boat-damage',
          duration: 3000,
        },
        {
          type: 'animation',
          name: 'screen-shake',
          duration: 700,
        },
        {
          type: 'dialogue',
          speaker: 'Musa (AS)',
          text: 'Have you broken it to drown its people? You have done a terrible thing!',
        },
        {
          type: 'dialogue',
          speaker: 'Khidr',
          text: 'Did I not say that with me you would never be able to have patience?',
        },
        {
          type: 'dialogue',
          speaker: 'Musa (AS)',
          text: 'Do not blame me for what I forgot, and do not cover me in my matter with difficulty.',
        },
        {
          type: 'narration',
          text: 'Musa had forgotten his promise. He had questioned. But Khidr gave him another chance.',
        },
        {
          type: 'verse',
          ref: 'Surah Al-Kahf 18:71-73',
          arabic: 'فَانطَلَقَا حَتَّىٰ إِذَا رَكِبَا فِي السَّفِينَةِ خَرَقَهَا ۖ قَالَ أَخَرَقْتَهَا لِتُغْرِقَ أَهْلَهَا لَقَدْ جِئْتَ شَيْئًا إِمْرًا',
          transliteration: 'Fa-nṭalaqā ḥattā idhā rakibā fī s-safīnati kharaqahā. Qāla: a-kharaqtahā li-tughriqā ahlahā? Laqad jiʾta shayʾan imrā.',
          translation: 'So they set out, until when they had embarked on the ship, he made a hole in it. [Musa] said: "Have you made a hole in it to drown its people? You have certainly done a grave thing."',
          audio: 71,
        },
      ],
    },

    /* ── Scene 5: The Boy ─────────────────────────────────── */
    {
      id: 'boy',
      bg: 'linear-gradient(160deg, #1a1020 0%, #2a1a10 50%, #1a0d05 100%)',
      ambient: 'desert',
      characters: [
        { id: 'musa',  position: 'left',  sprite: 'assets/characters/musa.svg',  name: 'Musa (AS)' },
        { id: 'khidr', position: 'right', sprite: 'assets/characters/khidr.svg', name: 'Khidr' },
      ],
      steps: [
        {
          type: 'narration',
          text: 'They continued their journey. They came upon a young boy playing. Khidr took the life of the boy.',
        },
        {
          type: 'animation',
          name: 'flash-red',
          duration: 700,
        },
        {
          type: 'narration',
          text: '(The Quran does not describe the manner — only the act and its divine wisdom. We follow the same restraint.)',
        },
        {
          type: 'dialogue',
          speaker: 'Musa (AS)',
          text: 'Have you killed a pure soul for other than having killed a soul? You have done a deplorable thing!',
        },
        {
          type: 'dialogue',
          speaker: 'Khidr',
          text: 'Did I not tell you that with me you would never be able to have patience?',
        },
        {
          type: 'dialogue',
          speaker: 'Musa (AS)',
          text: 'If I ask you about anything after this, then do not keep me as a companion. You have obtained from me an excuse.',
        },
        {
          type: 'verse',
          ref: 'Surah Al-Kahf 18:74-75',
          arabic: 'فَانطَلَقَا حَتَّىٰ إِذَا لَقِيَا غُلَامًا فَقَتَلَهُ قَالَ أَقَتَلْتَ نَفْسًا زَكِيَّةً بِغَيْرِ نَفْسٍ لَّقَدْ جِئْتَ شَيْئًا نُّكْرًا',
          transliteration: 'Fa-nṭalaqā ḥattā idhā laqiyā ghulāman fa-qatalahu. Qāla: a-qatalta nafsan zakiyyatan bi-ghayri nafsin? Laqad jiʾta shayʾan nukrā.',
          translation: 'So they set out, until when they met a boy, he killed him. [Musa] said: "Have you killed a pure soul for other than [having killed] a soul? You have certainly done a deplorable thing."',
          audio: 74,
        },
      ],
    },

    /* ── Scene 6: The Wall ────────────────────────────────── */
    {
      id: 'wall',
      bg: 'linear-gradient(to bottom, #1a1a0a 0%, #2a2a10 50%, #1a1a0a 100%)',
      ambient: 'city',
      animation: 'wall-rise',
      characters: [
        { id: 'musa',  position: 'left',  sprite: 'assets/characters/musa.svg',  name: 'Musa (AS)' },
        { id: 'khidr', position: 'right', sprite: 'assets/characters/khidr.svg', name: 'Khidr' },
      ],
      steps: [
        {
          type: 'narration',
          text: 'They came to a town and asked the people for food. The people refused to host them — they were hostile and unwelcoming.',
        },
        {
          type: 'narration',
          text: 'Then Khidr found a wall that was about to collapse. He repaired it — for free — for the very people who had refused them hospitality.',
        },
        {
          type: 'animation',
          name: 'wall-rise',
          duration: 4000,
        },
        {
          type: 'dialogue',
          speaker: 'Musa (AS)',
          text: 'If you wished, you could have taken for it a payment.',
        },
        {
          type: 'dialogue',
          speaker: 'Khidr',
          text: 'This is the parting between me and you. Now I will tell you the interpretation of that about which you could not have patience.',
        },
      ],
    },

    /* ── Scene 7: The Explanation (18:79-82) ─────────────── */
    {
      id: 'explanation',
      bg: 'linear-gradient(to bottom, #0a1a2a 0%, #0d2035 60%, #0a1520 100%)',
      ambient: 'water',
      characters: [
        { id: 'musa',  position: 'left',  sprite: 'assets/characters/musa.svg',  name: 'Musa (AS)' },
        { id: 'khidr', position: 'right', sprite: 'assets/characters/khidr.svg', name: 'Khidr' },
      ],
      steps: [
        {
          type: 'dialogue',
          speaker: 'Khidr',
          text: 'The boat — it belonged to poor people who worked at sea. I intended to damage it because there was a king ahead who was seizing every [good] boat by force.',
        },
        {
          type: 'dialogue',
          speaker: 'Khidr',
          text: 'A damaged boat would be passed over. I saved their livelihood.',
        },
        {
          type: 'dialogue',
          speaker: 'Khidr',
          text: 'The boy — his parents were believers. We feared he would overburden them with transgression and disbelief. So Allah intended to give them in exchange one better in purity and nearer to mercy.',
        },
        {
          type: 'dialogue',
          speaker: 'Khidr',
          text: 'The wall — beneath it was a treasure belonging to two orphan boys in the city. Their father was a righteous man. Your Lord intended that they reach maturity and extract their treasure as a mercy from your Lord.',
        },
        {
          type: 'verse',
          ref: 'Surah Al-Kahf 18:82',
          arabic: 'وَمَا فَعَلْتُهُ عَنْ أَمْرِي ۚ ذَٰلِكَ تَأْوِيلُ مَا لَمْ تَسْطِع عَّلَيْهِ صَبْرًا',
          transliteration: 'Wa-mā faʿaltuhu ʿan amrī. Dhālika taʾwīlu mā lam tasṭiʿ ʿalayhi ṣabrā.',
          translation: '"And I did not do it of my own accord. That is the interpretation of that about which you could not have patience."',
          audio: 82,
        },
      ],
    },

    /* ── Scene 8: The Lesson ──────────────────────────────── */
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
          text: 'Three acts. Each one looked like a disaster from the outside. Each one was actually a mercy.',
        },
        {
          type: 'dialogue',
          speaker: 'Narrator',
          text: 'The boat that was damaged — saved the family\'s livelihood. The boy who died — saved his parents from a lifetime of grief and corruption. The wall that was repaired — protected orphans\' inheritance for years.',
        },
        {
          type: 'dialogue',
          speaker: 'Narrator',
          text: 'When something painful happens in your life — a job you lost, a relationship that ended, a plan that fell apart — you are Musa on the boat.',
        },
        {
          type: 'dialogue',
          speaker: 'Narrator',
          text: 'You see the plank breaking. You don\'t see the tyrant king waiting downstream.',
        },
        {
          type: 'dialogue',
          speaker: 'Narrator',
          text: 'Allah sees both. And He is Al-Khabeer — the All-Aware. Khidr did not act on his own wisdom or intuition — he acted on direct revelation from Allah. Every one of those acts was Allah\'s will.',
        },
        {
          type: 'dialogue',
          speaker: 'Narrator',
          text: 'This is the lesson: it is not "trust the universe" or "things happen for a reason." It is — Allah\'s decree is always operating, always merciful, even when you cannot see it.',
        },
        {
          type: 'narration',
          text: '— وَمَا فَعَلْتُهُ عَنْ أَمْرِي —',
        },
        {
          type: 'narration',
          text: '"And I did not do it of my own accord." — 18:82',
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
