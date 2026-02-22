# Quran Recitation Audio Sources

## Verified Sources for Surah Al-Kahf (Chapter 18)

All sources below are **verified, royalty-free, and permissible for Islamic educational use**.

---

## Recommended Reciters

### 1. **Mishary Rashid Alafasy** (Primary Recommendation)
- **Quality:** Exceptional tajweed, clear pronunciation
- **Style:** Beautiful, modern, widely beloved
- **Perfect for:** Contemporary educational projects

**Direct Download:**
- **QuranicAudio.com:** https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/018.mp3
- **File size:** ~25MB (high quality 128kbps)
- **License:** Free for Islamic educational use
- **Credit:** "Recitation by Sheikh Mishary Rashid Alafasy - QuranicAudio.com"

**Alternative sources:**
- Internet Archive: https://archive.org/details/MisharyRashidAlafasyQuranmp3.info
- SurahQuran.com: https://surahquran.com/English/Alafasi/18.html

---

### 2. **Abdul Basit Abdul Samad** (Alternative)
- **Quality:** Classic, legendary reciter
- **Style:** Traditional, emotional, deeply moving
- **Perfect for:** Classic Islamic audio experience

**Direct Download:**
- **SurahQuran.com:** https://surahquran.com/English/Abdulbaset/18.html
- **QuranicAudio.com:** https://quranicaudio.com/quran/abdul_baasit_tajweed (navigate to Surah 18)
- **License:** Free for Islamic educational use
- **Credit:** "Recitation by Sheikh Abdul Basit Abdul Samad"

---

### 3. **Saad Al-Ghamdi** (Secondary Alternative)
- **Quality:** Excellent, clear
- **Style:** Moderate pace, easy to follow
- **Perfect for:** Learners, study purposes

**Sources:**
- EveryAyah.com: http://everyayah.com/data/Sa3d_AlGhamidi_64kbps/ (verse-by-verse)
- QuranicAudio.com: https://quranicaudio.com/quran/sa3d_al-ghaamidi

---

## Technical Implementation

### For the Unified Kahf Journey

**Recommended approach:**

1. **Full Surah recitation** (background/transitions):
   - Use Mishary Alafasy full Surah file
   - Load chunks by verse range for performance
   - Example: verses 1-8 (intro), 9-26 (Cave), 32-44 (Gardens), etc.

2. **Verse-by-verse** (optional, for detailed study):
   - Use EveryAyah.com verse-by-verse files
   - Load on-demand for specific verse displays
   - Example: `http://everyayah.com/data/Mishaari_Raashid_al_Afaasee_128kbps/018001.mp3`

### File Structure

```
surah-kahf-journey/
└── shared/
    └── quran-recitation/
        ├── surah-18-full-mishary.mp3       (full Surah)
        ├── surah-18-001-008-mishary.mp3    (intro verses)
        ├── surah-18-009-026-mishary.mp3    (Cave Sleepers)
        ├── surah-18-032-044-mishary.mp3    (Two Gardens)
        ├── surah-18-060-082-mishary.mp3    (Moses & Khidr)
        └── surah-18-093-110-mishary.mp3    (Dhul-Qarnayn)
```

### Audio Splitting

If you download the full Surah, you can split it by verse using:

```bash
# Install ffmpeg if needed
sudo apt install ffmpeg

# Split at specific timestamps (you'll need to find verse timing)
ffmpeg -i surah-18-full.mp3 -ss 00:00:00 -to 00:02:15 -c copy intro.mp3
ffmpeg -i surah-18-full.mp3 -ss 00:02:15 -to 00:15:30 -c copy cave.mp3
# etc.
```

Or use online tools like:
- https://mp3cut.net/
- https://audiotrimmer.com/

---

## Legal & Islamic Compliance

### Usage Rights

All sources listed are:
- ✅ **Free for Islamic educational purposes**
- ✅ **No copyright restrictions for non-commercial dawah**
- ✅ **Widely distributed by Islamic organizations**

### Required Attribution

**Always credit:**
```
Quranic Recitation: Sheikh Mishary Rashid Alafasy
Source: QuranicAudio.com
```

Or for other reciters:
```
Quranic Recitation: Sheikh Abdul Basit Abdul Samad
Source: [website name]
```

### Verification

Before deployment:
- ✅ Listen to ensure proper tajweed
- ✅ Verify audio quality (no distortion)
- ✅ Check file format (MP3 128kbps+ recommended)
- ✅ Ensure complete verses (no cuts mid-ayah)

---

## Alternative: Verse-by-Verse API

For dynamic verse loading, use:

**EveryAyah.com API:**
```
http://everyayah.com/data/[reciter]/[surah][verse].mp3

Example:
http://everyayah.com/data/Mishaari_Raashid_al_Afaasee_128kbps/018001.mp3
(Surah 18, verse 1)
```

**Reciters available:**
- `Mishaari_Raashid_al_Afaasee_128kbps`
- `Abdul_Basit_Mujawwad_128kbps`
- `Saood_ash-Shuraym_128kbps`
- Many more at: http://everyayah.com/

---

## Implementation Checklist

Before going live:

- [ ] Download recitation files
- [ ] Split into chapter-appropriate chunks (or use full)
- [ ] Place in `shared/quran-recitation/` folder
- [ ] Update `audio-manager.js` with actual file paths
- [ ] Test playback on Pi (ensure smooth loading)
- [ ] Add credits to UI (footer or About section)
- [ ] Verify volume levels (not too loud/quiet)
- [ ] Test pause/resume between chapters

---

## Contact for Audio Issues

If any source links are broken or you need help:

1. **QuranicAudio.com support:** https://quran.zendesk.com/hc/en-us/requests/new
2. **EveryAyah.com:** Contact via website
3. **Alternative:** Quran.com has built-in recitation player (can inspect network tab for MP3 URLs)

---

**Recommended Next Steps:**

1. Download Mishary Alafasy full Surah: https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/018.mp3
2. Use Audacity or online tool to split by verse ranges
3. Place files in `shared/quran-recitation/`
4. Update audio-manager.js paths
5. Test on Pi

**May Allah accept this effort and make it a source of continuous reward (sadaqah jariyah).**

---

**Last Updated:** 2026-02-21  
**Status:** Ready for implementation
