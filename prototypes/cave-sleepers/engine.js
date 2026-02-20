// Cave Sleepers — Game Engine
class GameEngine {
    constructor(data) {
        this.data = data;
        this.textDisplay = document.getElementById('text-display');
        this.choicesContainer = document.getElementById('choices');
        this.trustOrbs = [
            document.getElementById('trust-orb-1'),
            document.getElementById('trust-orb-2'),
            document.getElementById('trust-orb-3')
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
            p.style.animationDelay = `${index * 0.1}s`;
            this.textDisplay.appendChild(p);
        });

        // Clear and update choices
        this.choicesContainer.innerHTML = '';

        if (scene.choices.length === 0) {
            // It's an ending
            this.restartBtn.style.display = 'block';
        } else {
            this.restartBtn.style.display = 'none';
            scene.choices.forEach((choice, index) => {
                const btn = document.createElement('button');
                btn.textContent = choice.text;
                btn.classList.add('choice-btn', 'fade-in');
                btn.style.animationDelay = `${(paragraphs.length * 0.1) + (index * 0.12)}s`;

                if (choice.lowersTrust) {
                    btn.classList.add('fearful');
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

        if (choice.lowersTrust) {
            this.data.companionsTrust--;
            this.updateTrustDisplay();
        }

        if (choice.next) {
            this.loadScene(choice.next);
        }
    }

    updateTrustDisplay() {
        const lost = this.data.maxTrust - this.data.companionsTrust;
        this.trustOrbs.forEach((orb, index) => {
            if (index < lost) {
                orb.classList.add('faded');
            } else {
                orb.classList.remove('faded');
            }
        });
    }

    restart() {
        this.data.currentScene = 'start';
        this.data.companionsTrust = this.data.maxTrust;
        this.data.choices = [];
        this.updateTrustDisplay();
        this.loadScene('start');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const game = new GameEngine(gameData);
});
