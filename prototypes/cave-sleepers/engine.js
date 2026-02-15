// Cave Sleepers - Game Engine

class GameEngine {
    constructor() {
        this.currentScene = 'start';
        this.faith = 100; // 0-100, represents resolve/faith meter
        this.history = [];
        this.timerInterval = null;
        this.timeRemaining = 0;
        
        // DOM elements
        this.sceneVisual = document.getElementById('scene-visual');
        this.locationName = document.getElementById('location-name');
        this.textDisplay = document.getElementById('text-display');
        this.choicesContainer = document.getElementById('choices');
        this.faithFill = document.getElementById('faith-fill');
        this.atmosphere = document.getElementById('atmosphere');
        this.yearDisplay = document.getElementById('year-display');
        this.timerContainer = document.getElementById('timer-container');
        this.timerFill = document.getElementById('timer-fill');
        this.timerText = document.getElementById('timer-text');
        this.restartBtn = document.getElementById('restart-btn');
        this.credits = document.getElementById('credits');
        
        this.init();
    }
    
    init() {
        this.restartBtn.addEventListener('click', () => this.restart());
        this.renderScene(this.currentScene);
        this.updateFaithMeter();
        this.showCredits();
    }
    
    renderScene(sceneId) {
        const scene = SCENES[sceneId];
        if (!scene) {
            console.error('Scene not found:', sceneId);
            return;
        }
        
        this.currentScene = sceneId;
        this.history.push(sceneId);
        
        // Clear any running timers
        this.clearTimer();
        
        // Update atmosphere
        this.atmosphere.className = scene.atmosphere || 'ancient';
        
        // Update year display
        if (scene.year) {
            this.yearDisplay.textContent = `${scene.year} CE`;
        }
        
        // Update scene visual (ASCII art)
        this.sceneVisual.innerHTML = scene.visual || '';
        
        // Update location
        this.locationName.textContent = scene.location || '';
        
        // Update text with fade-in
        this.textDisplay.innerHTML = this.formatText(scene.text);
        this.textDisplay.classList.remove('fade-in');
        void this.textDisplay.offsetWidth; // Force reflow
        this.textDisplay.classList.add('fade-in');
        
        // Render choices
        this.renderChoices(scene);
        
        // Start timer if this is a timed scene
        if (scene.timed && scene.choices.length > 0) {
            this.startTimer(scene.timeLimit || 10, scene.choices[0].next);
        }
        
        // Check for game end
        if (scene.choices.length === 0) {
            this.endGame();
        }
    }
    
    formatText(text) {
        // Convert markdown-like formatting
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/_(.*?)_/g, '<em>$1</em>')
            .split('\n\n')
            .map(para => `<p>${para.trim()}</p>`)
            .join('');
    }
    
    renderChoices(scene) {
        this.choicesContainer.innerHTML = '';
        
        scene.choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.className = 'choice-btn';
            if (scene.timed) {
                button.classList.add('timed');
            }
            button.textContent = choice.text;
            
            button.addEventListener('click', () => {
                this.makeChoice(choice);
            });
            
            this.choicesContainer.appendChild(button);
        });
    }
    
    makeChoice(choice) {
        // Update faith meter
        if (choice.faithChange) {
            this.modifyFaith(choice.faithChange);
        }
        
        // Clear timer
        this.clearTimer();
        
        // Move to next scene
        this.renderScene(choice.next);
    }
    
    modifyFaith(amount) {
        this.faith = Math.max(0, Math.min(100, this.faith + amount));
        this.updateFaithMeter();
        
        // Visual feedback
        if (amount > 0) {
            this.faithFill.style.boxShadow = '0 0 20px rgba(212,175,55,0.8)';
            setTimeout(() => {
                this.faithFill.style.boxShadow = '0 0 10px rgba(212,175,55,0.5)';
            }, 500);
        } else if (amount < 0) {
            this.faithFill.style.boxShadow = '0 0 20px rgba(200,100,100,0.6)';
            setTimeout(() => {
                this.faithFill.style.boxShadow = '0 0 10px rgba(212,175,55,0.5)';
            }, 500);
        }
    }
    
    updateFaithMeter() {
        this.faithFill.style.width = `${this.faith}%`;
        
        // Change color based on faith level
        if (this.faith > 70) {
            this.faithFill.style.background = 'linear-gradient(90deg, #d4af37 0%, #f4e4b4 50%, #d4af37 100%)';
        } else if (this.faith > 40) {
            this.faithFill.style.background = 'linear-gradient(90deg, #b4af37 0%, #d4c4b4 50%, #b4af37 100%)';
        } else {
            this.faithFill.style.background = 'linear-gradient(90deg, #947f37 0%, #b4a494 50%, #947f37 100%)';
        }
    }
    
    startTimer(seconds, defaultNext) {
        this.timeRemaining = seconds;
        this.timerContainer.style.display = 'block';
        this.updateTimerDisplay();
        
        this.timerInterval = setInterval(() => {
            this.timeRemaining -= 0.1;
            
            if (this.timeRemaining <= 0) {
                // Time's up - choose first option automatically
                this.clearTimer();
                const scene = SCENES[this.currentScene];
                if (scene && scene.choices.length > 0) {
                    this.makeChoice(scene.choices[0]);
                }
            } else {
                this.updateTimerDisplay();
            }
        }, 100);
    }
    
    updateTimerDisplay() {
        const percentage = (this.timeRemaining / (SCENES[this.currentScene].timeLimit || 10)) * 100;
        this.timerFill.style.width = `${percentage}%`;
        
        if (this.timeRemaining > 3) {
            this.timerText.textContent = 'Choose quickly...';
        } else if (this.timeRemaining > 1) {
            this.timerText.textContent = 'Time running out!';
            this.timerText.classList.add('pulse');
        } else {
            this.timerText.textContent = 'NOW!';
        }
    }
    
    clearTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        this.timerContainer.style.display = 'none';
        this.timerText.classList.remove('pulse');
    }
    
    endGame() {
        this.restartBtn.style.display = 'block';
        
        // Show final faith score context
        let faithMessage = '';
        if (this.faith > 80) {
            faithMessage = 'Your faith remained unshaken throughout your journey.';
        } else if (this.faith > 50) {
            faithMessage = 'You held onto your faith despite doubts and fears.';
        } else {
            faithMessage = 'Your faith was tested, but you endured.';
        }
        
        const finalMessage = document.createElement('p');
        finalMessage.innerHTML = `<em>${faithMessage}</em>`;
        finalMessage.style.marginTop = '20px';
        finalMessage.style.textAlign = 'center';
        finalMessage.style.color = '#a89968';
        this.textDisplay.appendChild(finalMessage);
    }
    
    showCredits() {
        this.credits.innerHTML = `
            <em>A prototype exploring faith under pressure and time displacement</em><br>
            <em>Based on the Quranic story of Ashab al-Kahf (The People of the Cave)</em>
        `;
    }
    
    restart() {
        this.currentScene = 'start';
        this.faith = 100;
        this.history = [];
        this.clearTimer();
        this.restartBtn.style.display = 'none';
        this.renderScene('start');
        this.updateFaithMeter();
    }
}

// Initialize game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.game = new GameEngine();
});
