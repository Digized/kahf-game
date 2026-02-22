// Audio Manager for Surah Al-Kahf Journey
// Handles Quran recitation and ambient sounds (halal compliance)

class AudioManager {
    constructor() {
        this.recitationEnabled = false;
        this.ambienceEnabled = true;
        this.currentRecitation = null;
        this.currentAmbience = null;
        this.audioContext = null;
        
        this.init();
    }
    
    init() {
        this.setupControls();
        this.loadSettings();
    }
    
    setupControls() {
        const recitationBtn = document.getElementById('toggle-recitation');
        const ambienceBtn = document.getElementById('toggle-ambience');
        
        if (recitationBtn) {
            recitationBtn.addEventListener('click', () => {
                this.toggleRecitation();
            });
        }
        
        if (ambienceBtn) {
            ambienceBtn.addEventListener('click', () => {
                this.toggleAmbience();
            });
        }
        
        this.updateButtonStates();
    }
    
    toggleRecitation() {
        this.recitationEnabled = !this.recitationEnabled;
        this.saveSettings();
        this.updateButtonStates();
        
        if (this.recitationEnabled && this.currentRecitation) {
            this.currentRecitation.play();
        } else if (!this.recitationEnabled && this.currentRecitation) {
            this.currentRecitation.pause();
        }
    }
    
    toggleAmbience() {
        this.ambienceEnabled = !this.ambienceEnabled;
        this.saveSettings();
        this.updateButtonStates();
        
        if (this.ambienceEnabled && this.currentAmbience) {
            this.currentAmbience.play();
        } else if (!this.ambienceEnabled && this.currentAmbience) {
            this.currentAmbience.pause();
        }
    }
    
    updateButtonStates() {
        const recitationBtn = document.getElementById('toggle-recitation');
        const ambienceBtn = document.getElementById('toggle-ambience');
        
        if (recitationBtn) {
            if (this.recitationEnabled) {
                recitationBtn.classList.add('active');
                recitationBtn.querySelector('.icon').textContent = '🔊';
            } else {
                recitationBtn.classList.remove('active');
                recitationBtn.querySelector('.icon').textContent = '🔇';
            }
        }
        
        if (ambienceBtn) {
            if (this.ambienceEnabled) {
                ambienceBtn.classList.add('active');
                ambienceBtn.querySelector('.icon').textContent = '🎵';
            } else {
                ambienceBtn.classList.remove('active');
                ambienceBtn.querySelector('.icon').textContent = '🔕';
            }
        }
    }
    
    // Play Quran recitation for specific verses
    // NOTE: Actual audio files need to be sourced from verified Qari
    // Placeholder paths - MUST BE REPLACED with actual files
    playRecitation(verseRange) {
        if (!this.recitationEnabled) return;
        
        // Stop current recitation
        if (this.currentRecitation) {
            this.currentRecitation.pause();
            this.currentRecitation.currentTime = 0;
        }
        
        // Construct path (PLACEHOLDER - needs real files)
        const audioPath = `shared/quran-recitation/surah-18-${verseRange}.mp3`;
        
        this.currentRecitation = new Audio(audioPath);
        this.currentRecitation.volume = 0.6;
        
        this.currentRecitation.play().catch(err => {
            console.warn('Recitation not available:', audioPath);
            // Silently fail - audio is enhancement, not critical
        });
    }
    
    // Play ambient sounds (nature sounds only - halal)
    playAmbience(soundType, loop = true) {
        if (!this.ambienceEnabled) return;
        
        // Stop current ambience
        if (this.currentAmbience) {
            this.currentAmbience.pause();
            this.currentAmbience.currentTime = 0;
        }
        
        const ambiencePaths = {
            'cave': 'shared/audio/cave-drips.mp3',
            'wind': 'shared/audio/wind-gentle.mp3',
            'ocean': 'shared/audio/ocean-waves.mp3',
            'garden': 'shared/audio/garden-birds.mp3',
            'river': 'shared/audio/river-flow.mp3',
            'desert': 'shared/audio/desert-wind.mp3',
            'rain': 'shared/audio/rain-gentle.mp3'
        };
        
        const audioPath = ambiencePaths[soundType];
        if (!audioPath) {
            console.warn('Unknown ambience type:', soundType);
            return;
        }
        
        this.currentAmbience = new Audio(audioPath);
        this.currentAmbience.loop = loop;
        this.currentAmbience.volume = 0.3;
        
        this.currentAmbience.play().catch(err => {
            console.warn('Ambience not available:', audioPath);
            // Silently fail - audio is enhancement
        });
    }
    
    stopAmbience() {
        if (this.currentAmbience) {
            this.currentAmbience.pause();
            this.currentAmbience.currentTime = 0;
            this.currentAmbience = null;
        }
    }
    
    stopRecitation() {
        if (this.currentRecitation) {
            this.currentRecitation.pause();
            this.currentRecitation.currentTime = 0;
            this.currentRecitation = null;
        }
    }
    
    // Fade out audio smoothly
    fadeOut(audio, duration = 1000) {
        if (!audio) return;
        
        const startVolume = audio.volume;
        const steps = 20;
        const stepDuration = duration / steps;
        const volumeStep = startVolume / steps;
        
        let currentStep = 0;
        
        const interval = setInterval(() => {
            currentStep++;
            audio.volume = Math.max(0, startVolume - (volumeStep * currentStep));
            
            if (currentStep >= steps) {
                clearInterval(interval);
                audio.pause();
                audio.currentTime = 0;
            }
        }, stepDuration);
    }
    
    // Settings persistence
    saveSettings() {
        localStorage.setItem('audioSettings', JSON.stringify({
            recitationEnabled: this.recitationEnabled,
            ambienceEnabled: this.ambienceEnabled
        }));
    }
    
    loadSettings() {
        const saved = localStorage.getItem('audioSettings');
        if (saved) {
            try {
                const settings = JSON.parse(saved);
                this.recitationEnabled = settings.recitationEnabled || false;
                this.ambienceEnabled = settings.ambienceEnabled !== false; // Default true
            } catch (e) {
                console.error('Error loading audio settings:', e);
            }
        }
        
        this.updateButtonStates();
    }
}

// Initialize audio manager
window.addEventListener('DOMContentLoaded', () => {
    window.audioManager = new AudioManager();
});

// Export for use in chapter pages
window.AudioManager = AudioManager;
