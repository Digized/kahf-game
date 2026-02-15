// Visual Novel Engine for Cave Sleepers

class VNEngine {
    constructor() {
        this.currentScene = null;
        this.faith = 100; // 0-100
        this.timeRemaining = 100; // Used during timed sequences
        this.flags = {}; // Story flags
        this.history = []; // Scene history
        
        // DOM elements
        this.bgLayer = document.getElementById('bg-layer');
        this.overlayLayer = document.getElementById('overlay-layer');
        this.charactersContainer = document.getElementById('characters-container');
        this.speakerName = document.getElementById('speaker-name');
        this.dialogueText = document.getElementById('dialogue-text');
        this.choicesContainer = document.getElementById('choices-container');
        this.continueBtn = document.getElementById('continue-btn');
        this.faithFill = document.getElementById('faith-fill');
        this.timeContainer = document.getElementById('time-container');
        this.timeFill = document.getElementById('time-fill');
        
        // Timers
        this.timePressureInterval = null;
        
        // Setup
        this.continueBtn.addEventListener('click', () => this.advance());
    }
    
    start(initialScene) {
        this.loadScene(initialScene);
    }
    
    loadScene(sceneId) {
        const scene = window.STORY_DATA[sceneId];
        if (!scene) {
            console.error(`Scene ${sceneId} not found`);
            return;
        }
        
        this.currentScene = scene;
        this.history.push(sceneId);
        
        // Apply scene settings
        this.setBackground(scene.background);
        this.setOverlay(scene.overlay);
        this.showCharacters(scene.characters || []);
        
        // Start time pressure if specified
        if (scene.timePressure) {
            this.startTimePressure(scene.timePressureSpeed || 1);
        } else {
            this.stopTimePressure();
        }
        
        // Display dialogue
        this.showDialogue(scene);
    }
    
    setBackground(bgClass) {
        this.bgLayer.className = `scene-bg ${bgClass}`;
    }
    
    setOverlay(overlayClass) {
        this.overlayLayer.className = overlayClass || '';
    }
    
    showCharacters(characters) {
        this.charactersContainer.innerHTML = '';
        characters.forEach(char => {
            const charDiv = document.createElement('div');
            charDiv.className = `character ${char.type} active`;
            if (char.speaking) {
                charDiv.classList.add('speaking');
            }
            this.charactersContainer.appendChild(charDiv);
        });
    }
    
    showDialogue(scene) {
        this.speakerName.textContent = scene.speaker || '';
        this.dialogueText.textContent = scene.text || '';
        
        // Clear previous choices
        this.choicesContainer.innerHTML = '';
        this.continueBtn.classList.add('hidden');
        
        // Show choices or continue button
        if (scene.choices && scene.choices.length > 0) {
            scene.choices.forEach(choice => {
                // Check if choice is available
                if (choice.condition && !this.checkCondition(choice.condition)) {
                    return;
                }
                
                const btn = document.createElement('button');
                btn.className = 'choice-btn';
                btn.textContent = choice.text;
                btn.addEventListener('click', () => this.makeChoice(choice));
                this.choicesContainer.appendChild(btn);
            });
        } else {
            this.continueBtn.classList.remove('hidden');
        }
    }
    
    makeChoice(choice) {
        // Apply effects
        if (choice.faithChange) {
            this.modifyFaith(choice.faithChange);
        }
        
        if (choice.setFlag) {
            this.flags[choice.setFlag] = true;
        }
        
        // Load next scene
        if (choice.next) {
            this.loadScene(choice.next);
        }
    }
    
    advance() {
        if (this.currentScene.next) {
            this.loadScene(this.currentScene.next);
        }
    }
    
    modifyFaith(amount) {
        this.faith = Math.max(0, Math.min(100, this.faith + amount));
        this.faithFill.style.width = `${this.faith}%`;
        
        // Visual feedback
        if (amount > 0) {
            this.faithFill.style.filter = 'brightness(1.5)';
            setTimeout(() => {
                this.faithFill.style.filter = 'brightness(1)';
            }, 300);
        }
    }
    
    startTimePressure(speed = 1) {
        this.timeContainer.classList.remove('hidden');
        this.timeRemaining = 100;
        this.timeFill.style.width = '100%';
        
        if (this.timePressureInterval) {
            clearInterval(this.timePressureInterval);
        }
        
        this.timePressureInterval = setInterval(() => {
            this.timeRemaining -= speed;
            this.timeFill.style.width = `${this.timeRemaining}%`;
            
            if (this.timeRemaining <= 0) {
                this.stopTimePressure();
                this.handleTimeout();
            }
        }, 100);
    }
    
    stopTimePressure() {
        if (this.timePressureInterval) {
            clearInterval(this.timePressureInterval);
            this.timePressureInterval = null;
        }
        this.timeContainer.classList.add('hidden');
    }
    
    handleTimeout() {
        // Load timeout scene if exists
        if (this.currentScene.onTimeout) {
            this.loadScene(this.currentScene.onTimeout);
        }
    }
    
    checkCondition(condition) {
        if (condition.flag) {
            return this.flags[condition.flag];
        }
        if (condition.faithMin !== undefined) {
            return this.faith >= condition.faithMin;
        }
        if (condition.faithMax !== undefined) {
            return this.faith <= condition.faithMax;
        }
        return true;
    }
    
    getFaith() {
        return this.faith;
    }
    
    getFlag(flag) {
        return this.flags[flag] || false;
    }
}

// Initialize engine when DOM is ready
let gameEngine;
window.addEventListener('DOMContentLoaded', () => {
    gameEngine = new VNEngine();
    // Story will call gameEngine.start() when loaded
});
