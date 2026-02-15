// Game Engine
class GameEngine {
    constructor(data) {
        this.data = data;
        this.textDisplay = document.getElementById('text-display');
        this.choicesContainer = document.getElementById('choices');
        this.patienceFill = document.getElementById('patience-fill');
        this.restartBtn = document.getElementById('restart-btn');
        
        this.init();
    }
    
    init() {
        this.restartBtn.addEventListener('click', () => this.restart());
        this.loadScene(this.data.currentScene);
    }
    
    loadScene(sceneId) {
        const scene = this.data.scenes[sceneId];
        if (!scene) {
            console.error(`Scene ${sceneId} not found`);
            return;
        }
        
        this.data.currentScene = sceneId;
        
        // Clear and update text
        this.textDisplay.innerHTML = '';
        const paragraphs = scene.text.trim().split('\n\n');
        paragraphs.forEach((para, index) => {
            const p = document.createElement('p');
            p.textContent = para.trim();
            p.classList.add('fade-in');
            p.style.animationDelay = `${index * 0.1}s`;
            this.textDisplay.appendChild(p);
        });
        
        // Clear and update choices
        this.choicesContainer.innerHTML = '';
        
        if (scene.choices.length === 0) {
            // Game over
            this.restartBtn.style.display = 'block';
        } else {
            this.restartBtn.style.display = 'none';
            scene.choices.forEach((choice, index) => {
                const btn = document.createElement('button');
                btn.textContent = choice.text;
                btn.classList.add('choice-btn', 'fade-in');
                btn.style.animationDelay = `${(paragraphs.length * 0.1) + (index * 0.1)}s`;
                
                if (choice.isQuestion) {
                    btn.classList.add('question');
                }
                
                btn.addEventListener('click', () => this.makeChoice(choice));
                this.choicesContainer.appendChild(btn);
            });
        }
        
        // Scroll to top
        window.scrollTo(0, 0);
    }
    
    makeChoice(choice) {
        // Record choice
        this.data.choices.push({
            scene: this.data.currentScene,
            choice: choice.text
        });
        
        // Handle question mechanic
        if (choice.isQuestion) {
            this.data.questionsAsked++;
            this.data.patience--;
            this.updatePatienceDisplay();
        }
        
        // Load next scene
        if (choice.next) {
            this.loadScene(choice.next);
        }
    }
    
    updatePatienceDisplay() {
        const percentage = (this.data.patience / this.data.maxPatience) * 100;
        this.patienceFill.style.width = `${percentage}%`;
        
        // Update color based on patience level
        this.patienceFill.classList.remove('medium', 'low');
        if (this.data.patience === 2) {
            this.patienceFill.classList.add('medium');
        } else if (this.data.patience <= 1) {
            this.patienceFill.classList.add('low');
        }
    }
    
    restart() {
        this.data.currentScene = 'start';
        this.data.patience = this.data.maxPatience;
        this.data.questionsAsked = 0;
        this.data.choices = [];
        this.updatePatienceDisplay();
        this.loadScene('start');
    }
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    const game = new GameEngine(gameData);
});
