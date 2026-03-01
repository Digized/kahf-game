// Dhul-Qarnayn Game Engine
// Tracks justice + trust stats, routes to appropriate ending

class GameEngine {
    constructor(data) {
        this.data = data;
        this.textDisplay = document.getElementById('text-display');
        this.choicesContainer = document.getElementById('choices');
        this.justiceFill = document.getElementById('justice-fill');
        this.trustFill = document.getElementById('trust-fill');
        this.justiceValue = document.getElementById('justice-value');
        this.trustValue = document.getElementById('trust-value');
        this.actDisplay = document.getElementById('act-display');
        this.restartBtn = document.getElementById('restart-btn');

        this.init();
    }

    init() {
        this.restartBtn.addEventListener('click', () => this.restart());
        this.updateStats();
        this.loadScene(this.data.currentScene);
    }

    loadScene(sceneId) {
        // Handle ending gate — route based on stats
        if (sceneId === 'ending_check') {
            sceneId = this.resolveEnding();
        }

        const scene = this.data.scenes[sceneId];
        if (!scene) {
            console.error(`Scene "${sceneId}" not found`);
            return;
        }

        this.data.currentScene = sceneId;

        // Update act label
        if (scene.act) {
            this.actDisplay.textContent = scene.act;
        }

        // Render text
        this.textDisplay.innerHTML = '';
        const paragraphs = scene.text.trim().split('\n\n');
        paragraphs.forEach((para, index) => {
            const trimmed = para.trim();
            if (!trimmed) return;

            const p = document.createElement('p');
            p.classList.add('fade-in');
            p.style.animationDelay = `${index * 0.08}s`;

            // Detect Quranic quote (starts with ")
            if (trimmed.startsWith('"') && trimmed.includes('— Surah')) {
                const box = document.createElement('div');
                box.classList.add('lesson-box', 'fade-in');
                box.style.animationDelay = `${index * 0.08}s`;
                box.innerHTML = trimmed;
                this.textDisplay.appendChild(box);
                return;
            }

            p.textContent = trimmed;
            this.textDisplay.appendChild(p);
        });

        // Render choices
        this.choicesContainer.innerHTML = '';

        if (!scene.choices || scene.choices.length === 0) {
            this.restartBtn.style.display = 'block';
        } else {
            this.restartBtn.style.display = 'none';
            scene.choices.forEach((choice, index) => {
                const btn = document.createElement('button');
                btn.textContent = choice.text;
                btn.classList.add('choice-btn', 'fade-in');
                btn.style.animationDelay = `${(paragraphs.length * 0.08) + (index * 0.1)}s`;

                if (choice.type === 'tyranny') btn.classList.add('tyranny');
                if (choice.type === 'justice') btn.classList.add('justice');

                btn.addEventListener('click', () => this.makeChoice(choice));
                this.choicesContainer.appendChild(btn);
            });
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    makeChoice(choice) {
        this.data.choices.push({
            scene: this.data.currentScene,
            choice: choice.text
        });

        // Apply stat changes
        if (choice.statChange) {
            const { justice = 0, trust = 0 } = choice.statChange;
            this.data.justice = Math.max(0, Math.min(this.data.maxStat, this.data.justice + justice));
            this.data.trust = Math.max(0, Math.min(this.data.maxStat, this.data.trust + trust));
            this.updateStats();
        }

        if (choice.next) {
            this.loadScene(choice.next);
        }
    }

    updateStats() {
        const jPct = (this.data.justice / this.data.maxStat) * 100;
        const tPct = (this.data.trust / this.data.maxStat) * 100;

        this.justiceFill.style.width = `${jPct}%`;
        this.trustFill.style.width = `${tPct}%`;
        this.justiceValue.textContent = this.data.justice;
        this.trustValue.textContent = this.data.trust;

        this.justiceFill.classList.toggle('low', this.data.justice <= 3);
        this.trustFill.classList.toggle('low', this.data.trust <= 3);
    }

    resolveEnding() {
        const { justice, trust } = this.data;
        const total = justice + trust;

        if (total >= 14) return 'ending_just';
        if (total >= 8) return 'ending_mixed';
        return 'ending_unjust';
    }

    restart() {
        this.data.currentScene = 'start';
        this.data.justice = 5;
        this.data.trust = 5;
        this.data.choices = [];
        this.updateStats();
        this.restartBtn.style.display = 'none';
        this.loadScene('start');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new GameEngine(gameData);
});
