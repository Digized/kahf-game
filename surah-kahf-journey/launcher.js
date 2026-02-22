// Surah Al-Kahf Journey - Main Launcher
// Manages screen transitions, progress tracking, and navigation

class SurahKahfLauncher {
    constructor() {
        this.currentScreen = 'title-screen';
        this.progress = this.loadProgress();
        this.init();
    }
    
    init() {
        this.setupBackground();
        this.setupEventListeners();
        this.updateProgressBars();
    }
    
    // Subtle animated background (stars/geometric patterns)
    setupBackground() {
        const canvas = document.getElementById('bg-canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Create geometric Islamic pattern particles
        const particles = [];
        for (let i = 0; i < 50; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: (Math.random() - 0.5) * 0.3,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
        
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(p => {
                // Draw star/dot
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(212, 175, 55, ${p.opacity})`;
                ctx.fill();
                
                // Move particle
                p.x += p.speedX;
                p.y += p.speedY;
                
                // Wrap around edges
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;
            });
            
            requestAnimationFrame(animate);
        };
        
        animate();
        
        // Resize handler
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }
    
    setupEventListeners() {
        // Begin Journey button
        const beginBtn = document.getElementById('begin-journey');
        if (beginBtn) {
            beginBtn.addEventListener('click', () => {
                this.transitionToScreen('introduction-screen');
            });
        }
        
        // View Disclaimer button
        const disclaimerBtn = document.getElementById('view-disclaimer');
        if (disclaimerBtn) {
            disclaimerBtn.addEventListener('click', () => {
                window.location.href = 'disclaimer.html';
            });
        }
        
        // Continue buttons (generic)
        document.querySelectorAll('.continue-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const nextScreen = e.target.dataset.next;
                if (nextScreen) {
                    this.transitionToScreen(nextScreen + '-screen');
                }
            });
        });
        
        // Chapter selection buttons
        document.querySelectorAll('.chapter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const chapter = e.target.dataset.chapter;
                this.startChapter(chapter);
            });
        });
        
        // Chapter cards (entire card clickable)
        document.querySelectorAll('.chapter-card').forEach(card => {
            card.addEventListener('click', (e) => {
                // Don't trigger if button was clicked
                if (e.target.classList.contains('chapter-btn')) return;
                
                const chapter = card.dataset.chapter;
                const btn = card.querySelector('.chapter-btn');
                if (btn) btn.click();
            });
        });
    }
    
    transitionToScreen(screenId) {
        // Fade out current screen
        const currentScreen = document.querySelector('.screen.active');
        if (currentScreen) {
            currentScreen.classList.remove('active');
        }
        
        // Fade in new screen
        setTimeout(() => {
            const newScreen = document.getElementById(screenId);
            if (newScreen) {
                newScreen.classList.add('active');
                this.currentScreen = screenId;
                
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }, 300);
    }
    
    startChapter(chapterNum) {
        // Save that user started this chapter
        this.progress[`chapter${chapterNum}`] = {
            started: true,
            completed: false,
            timestamp: Date.now()
        };
        this.saveProgress();
        
        // Navigate to chapter
        const chapterPaths = {
            '1': 'chapter-1-cave/index.html',
            '2': 'chapter-2-gardens/index.html',
            '3': 'chapter-3-moses/index.html',
            '4': 'chapter-4-dhulqarnayn/index.html'
        };
        
        window.location.href = chapterPaths[chapterNum];
    }
    
    // Progress tracking
    loadProgress() {
        const saved = localStorage.getItem('surahKahfProgress');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error('Error loading progress:', e);
            }
        }
        
        return {
            chapter1: { started: false, completed: false },
            chapter2: { started: false, completed: false },
            chapter3: { started: false, completed: false },
            chapter4: { started: false, completed: false }
        };
    }
    
    saveProgress() {
        localStorage.setItem('surahKahfProgress', JSON.stringify(this.progress));
        this.updateProgressBars();
    }
    
    updateProgressBars() {
        for (let i = 1; i <= 4; i++) {
            const bar = document.getElementById(`progress-${i}`);
            const chapter = this.progress[`chapter${i}`];
            
            if (bar) {
                if (chapter && chapter.completed) {
                    bar.style.width = '100%';
                } else if (chapter && chapter.started) {
                    bar.style.width = '50%';
                } else {
                    bar.style.width = '0%';
                }
            }
        }
    }
    
    // Called by chapter pages when completed
    static markChapterComplete(chapterNum) {
        const launcher = new SurahKahfLauncher();
        launcher.progress[`chapter${chapterNum}`].completed = true;
        launcher.saveProgress();
    }
    
    // Check if all chapters complete
    isJourneyComplete() {
        return Object.values(this.progress).every(ch => ch.completed);
    }
}

// Initialize launcher when page loads
window.addEventListener('DOMContentLoaded', () => {
    window.launcher = new SurahKahfLauncher();
});

// Expose for chapter pages to use
window.SurahKahfLauncher = SurahKahfLauncher;
