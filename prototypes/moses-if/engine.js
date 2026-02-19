// Game Engine
class GameEngine {
    constructor(data) {
        this.data = data;
        this.textDisplay = document.getElementById('text-display');
        this.choicesContainer = document.getElementById('choices');
        this.orbs = [
            document.getElementById('orb-1'),
            document.getElementById('orb-2'),
            document.getElementById('orb-3')
        ];
        this.restartBtn = document.getElementById('restart-btn');

        this.setupTitleScreen();
        this.init();
    }

    setupTitleScreen() {
        const titleScreen = document.getElementById('title-screen');
        const beginBtn = document.getElementById('begin-btn');

        if (beginBtn && titleScreen) {
            beginBtn.addEventListener('click', () => {
                titleScreen.classList.add('fade-out');
                setTimeout(() => {
                    titleScreen.style.display = 'none';
                }, 800);
            });
        }
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
            // Support *italics*
            p.innerHTML = para.trim().replace(/\*(.*?)\*/g, '<em>$1</em>');
            p.classList.add('fade-in');
            p.style.animationDelay = `${index * 0.08}s`;
            this.textDisplay.appendChild(p);
        });

        // Clear and update choices
        this.choicesContainer.innerHTML = '';

        if (scene.choices.length === 0) {
            this.restartBtn.style.display = 'block';
        } else {
            this.restartBtn.style.display = 'none';
            scene.choices.forEach((choice, index) => {
                const btn = document.createElement('button');
                btn.textContent = choice.text;
                btn.classList.add('choice-btn', 'fade-in');
                btn.style.animationDelay = `${(paragraphs.length * 0.08) + (index * 0.1)}s`;

                if (choice.isQuestion) {
                    btn.classList.add('question');
                }

                btn.addEventListener('click', () => this.makeChoice(choice));
                this.choicesContainer.appendChild(btn);
            });
        }

        window.scrollTo(0, 0);
    }

    makeChoice(choice) {
        this.data.choices.push({
            scene: this.data.currentScene,
            choice: choice.text
        });

        if (choice.isQuestion) {
            this.data.questionsAsked++;
            this.data.patience--;
            this.updatePatienceDisplay();
        }

        if (choice.next) {
            this.loadScene(choice.next);
        }
    }

    updatePatienceDisplay() {
        const spent = this.data.maxPatience - this.data.patience;
        this.orbs.forEach((orb, index) => {
            if (index < spent) {
                orb.classList.add('spent');
            } else {
                orb.classList.remove('spent');
            }
        });
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

document.addEventListener('DOMContentLoaded', () => {
    const game = new GameEngine(gameData);
});
