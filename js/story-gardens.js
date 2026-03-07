/* ============================================================
   SURAH KAHF VISUAL NOVEL — story-gardens.js
   Story 3: The Two Gardens (Sahib al-Jannatayn)
   Lesson: Arrogance is a trap. Wealth and status are temporary.
   ============================================================ */

'use strict';

const StoryGardens = {
  id:    'gardens',
  title: 'The Two Gardens',
  titleArabic: 'صاحب الجنتين',
  lesson: 'Wealth and status are temporary. The man who forgot Allah lost everything he thought was his.',

  characterMap: {
    'rich':     { name: 'The Rich Man' },
    'poor':     { name: 'His Companion' },
    'narrator': { name: 'Narrator' },
  },

  preloadAyahs: [32, 33, 34, 35, 36, 42, 43, 44],

  scenes: [

    /* ── Scene 0: Opening ─────────────────────────────────── */
    {
      id: 'opening',
      bg: 'linear-gradient(160deg, #0a1a0a 0%, #0d2010 50%, #0a1a0a 100%)',
      ambient: null,
      characters: [],
      steps: [
        {
          type: 'narration',
          text: 'Allah gives us this parable in Surah Al-Kahf — not as a fairy tale, but as a mirror. Look into it carefully.',
        },
        {
          type: 'narration',
          text: 'Two men. One was given everything the world could offer. The other had almost nothing. The difference between them was not their wealth — it was what lived in their hearts.',
        },
      ],
    },

    /* ── Scene 1: The Two Men ─────────────────────────────── */
    {
      id: 'two-men',
      bg: 'linear-gradient(160deg, #0d2010 0%, #1a3a1a 50%, #0d2010 100%)',
      ambient: null,
      characters: [
        { id: 'rich', position: 'right', sprite: 'assets/characters/rich-man.svg', name: 'The Rich Man' },
        { id: 'poor', position: 'left',  sprite: 'assets/characters/poor-man.svg', name: 'His Companion' },
      ],
      steps: [
        {
          type: 'narration',
          text: 'Allah sets the scene:',
        },
        {
          type: 'verse',
          ref: 'Surah Al-Kahf 18:32',
          arabic: 'وَاضْرِبْ لَهُم مَّثَلًا رَّجُلَيْنِ جَعَلْنَا لِأَحَدِهِمَا جَنَّتَيْنِ مِنْ أَعْنَابٍ وَحَفَفْنَاهُمَا بِنَخْلٍ وَجَعَلْنَا بَيْنَهُمَا زَرْعًا',
          transliteration: 'Wa-ḍrib lahum mathalan rajulayni jaʿalnā li-aḥadihimā jannatayn min aʿnābin wa-ḥafafnāhumā bi-nakhl wa-jaʿalnā baynahumā zarʿā.',
          translation: 'And present to them an example of two men: We granted to one of them two gardens of grapevines, and We bordered them with palm trees and placed between them [fields of] crops.',
          audio: 32,
        },
        {
          type: 'narration',
          text: 'Two lush gardens, full of grapes and palms. A river running through them. Every fruit in abundance. This was the rich man\'s world.',
        },
        {
          type: 'dialogue',
          speaker: 'The Rich Man',
          text: 'Look at what I have built. Two gardens, a river, crops that never fail. I am the most successful man in this city.',
        },
        {
          type: 'dialogue',
          speaker: 'His Companion',
          text: 'Allah has blessed you greatly. Do not forget to be grateful.',
        },
        {
          type: 'dialogue',
          speaker: 'The Rich Man',
          text: 'Grateful? I earned this. My hard work, my planning, my intelligence. This is mine.',
        },
      ],
    },

    /* ── Scene 2: The Boast ───────────────────────────────── */
    {
      id: 'boast',
      bg: 'linear-gradient(160deg, #0d2010 0%, #1a3a1a 50%, #0d2010 100%)',
      ambient: null,
      characters: [
        { id: 'rich', position: 'right', sprite: 'assets/characters/rich-man.svg', name: 'The Rich Man' },
        { id: 'poor', position: 'left',  sprite: 'assets/characters/poor-man.svg', name: 'His Companion' },
      ],
      steps: [
        {
          type: 'narration',
          text: 'The rich man took his companion into his garden to show it off. And then he said something that should have never been said:',
        },
        {
          type: 'verse',
          ref: 'Surah Al-Kahf 18:34–36',
          arabic: 'وَكَانَ لَهُ ثَمَرٌ فَقَالَ لِصَاحِبِهِ وَهُوَ يُحَاوِرُهُ أَنَا أَكْثَرُ مِنكَ مَالًا وَأَعَزُّ نَفَرًا',
          transliteration: 'Wa-kāna lahū thamarun fa-qāla li-ṣāḥibihi wa-huwa yuḥāwiruhu: anā aktharu minka mālan wa-aʿazzu nafarā.',
          translation: 'And he had fruit, so he said to his companion while he was conversing with him: "I am greater than you in wealth and mightier in [numbers of] men."',
          audio: 34,
        },
        {
          type: 'dialogue',
          speaker: 'The Rich Man',
          text: 'I am more than you in wealth and stronger in men. Look at this garden — do you think this will ever end?',
        },
        {
          type: 'verse',
          ref: 'Surah Al-Kahf 18:35–36',
          arabic: 'وَدَخَلَ جَنَّتَهُ وَهُوَ ظَالِمٌ لِّنَفْسِهِ قَالَ مَا أَظُنُّ أَن تَبِيدَ هَٰذِهِ أَبَدًا ۝ وَمَا أَظُنُّ السَّاعَةَ قَائِمَةً',
          transliteration: 'Wa-dakhala jannatahu wa-huwa ẓālimun li-nafsihi. Qāla: mā aẓunnu an tabīda hādhihi abadā. Wa-mā aẓunnu s-sāʿata qāʾimah.',
          translation: 'And he entered his garden while he was unjust to himself. He said: "I do not think that this will perish — ever. And I do not think the Hour will occur."',
          audio: 35,
        },
        {
          type: 'narration',
          text: 'Three sins in one breath: arrogance over his wealth, denial of the Day of Judgment, and ingratitude to Allah. He had wronged his own soul.',
        },
      ],
    },

    /* ── Scene 3: The Warning ─────────────────────────────── */
    {
      id: 'warning',
      bg: 'linear-gradient(160deg, #0d2010 0%, #1a3a1a 50%, #0d2010 100%)',
      ambient: null,
      characters: [
        { id: 'rich', position: 'right', sprite: 'assets/characters/rich-man.svg', name: 'The Rich Man' },
        { id: 'poor', position: 'left',  sprite: 'assets/characters/poor-man.svg', name: 'His Companion' },
      ],
      steps: [
        {
          type: 'dialogue',
          speaker: 'His Companion',
          text: 'Do you disbelieve in the One who created you from dust, then from a drop of fluid, then shaped you into a man?',
        },
        {
          type: 'dialogue',
          speaker: 'His Companion',
          text: 'But as for me — He is Allah, my Lord. And I will not associate anyone with my Lord.',
        },
        {
          type: 'dialogue',
          speaker: 'His Companion',
          text: 'When you entered your garden, why did you not say: "Mā shāʾa Allāh — what Allah wills. There is no power except with Allah." If you see me as less than you in wealth and children —',
        },
        {
          type: 'dialogue',
          speaker: 'His Companion',
          text: 'Perhaps my Lord will give me something better than your garden. And perhaps He will send upon yours a calamity from the sky, and it will become barren dust.',
        },
        {
          type: 'narration',
          text: 'The poor man\'s words were not envy. They were a warning — from a heart that remembered Allah.',
        },
        {
          type: 'narration',
          text: 'The rich man laughed it off. He had heard the warning. He chose to ignore it.',
        },
      ],
    },

    /* ── Scene 4: The Destruction ─────────────────────────── */
    {
      id: 'destruction',
      bg: 'linear-gradient(160deg, #1a0a00 0%, #2a1000 50%, #1a0500 100%)',
      ambient: null,
      animation: 'garden-wither',
      characters: [],
      steps: [
        {
          type: 'narration',
          text: 'Then it came.',
        },
        {
          type: 'animation',
          name: 'garden-wither',
          duration: 3000,
        },
        {
          type: 'verse',
          ref: 'Surah Al-Kahf 18:42',
          arabic: 'وَأُحِيطَ بِثَمَرِهِ فَأَصْبَحَ يُقَلِّبُ كَفَّيْهِ عَلَىٰ مَا أَنفَقَ فِيهَا وَهِيَ خَاوِيَةٌ عَلَىٰ عُرُوشِهَا',
          transliteration: 'Wa-uḥīṭa bi-thamarihī fa-aṣbaḥa yuqallibu kaffayhi ʿalā mā anfaqa fīhā wa-hiya khāwiyatun ʿalā ʿurūshihā.',
          translation: 'And his fruits were encompassed [by ruin], and he began to turn his hands about [in dismay] over what he had spent on it, while it had collapsed upon its trellises.',
          audio: 42,
        },
        {
          type: 'dialogue',
          speaker: 'The Rich Man',
          text: '...I wish I had not associated anyone with my Lord.',
        },
        {
          type: 'narration',
          text: 'Too late. The regret came after the loss. It always does, when we wait too long.',
        },
      ],
    },

    /* ── Scene 5: The Lesson ──────────────────────────────── */
    {
      id: 'lesson',
      bg: 'linear-gradient(to bottom, #0a0a0f 0%, #12121a 100%)',
      characters: [
        { id: 'narrator', position: 'center', sprite: 'assets/characters/elder.svg', name: 'Narrator' },
      ],
      steps: [
        {
          type: 'verse',
          ref: 'Surah Al-Kahf 18:44',
          arabic: 'هُنَالِكَ الْوَلَايَةُ لِلَّهِ الْحَقِّ ۚ هُوَ خَيْرٌ ثَوَابًا وَخَيْرٌ عُقْبًا',
          transliteration: 'Hunālika l-walāyatu lillāhi l-ḥaqq. Huwa khayrun thawāban wa-khayrun ʿuqbā.',
          translation: 'There, authority is [completely] for Allah, the Truth. He is best in reward and best in outcome.',
          audio: 44,
        },
        {
          type: 'dialogue',
          speaker: 'Narrator',
          text: 'The rich man\'s mistake was not that he had wealth. It was that he forgot where it came from.',
        },
        {
          type: 'dialogue',
          speaker: 'Narrator',
          text: 'He said "I" when he should have said "Allah." He said "mine" when he should have said "a trust." He said "forever" when everything in this world has an expiry date.',
        },
        {
          type: 'dialogue',
          speaker: 'Narrator',
          text: 'The poor man had nothing — and yet he had everything. Because he knew who he was in relation to Allah.',
        },
        {
          type: 'dialogue',
          speaker: 'Narrator',
          text: 'The next time you achieve something — a promotion, a car, a following, a grade — say it: Mā shāʾa Allāh. What Allah wills. Not as a formality. As a reminder of who actually gave it to you.',
        },
        {
          type: 'narration',
          text: '— مَا شَاءَ اللَّهُ لَا قُوَّةَ إِلَّا بِاللَّهِ —',
        },
        {
          type: 'narration',
          text: '"What Allah wills. There is no power except with Allah." — 18:39',
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
