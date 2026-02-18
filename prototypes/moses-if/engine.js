// Game Engine — Moses & Khidr
class GameEngine {
    constructor(data) {
        this.data = data;
        this.textDisplay = document.getElementById('text-display');
        this.choicesContainer = document.getElementById('choices');
        this.journeyMirror = document.getElementById('journey-mirror');
        this.restartBtn = document.getElementById('restart-btn');

        this.init();
    }

    init() {
        this.restartBtn.addEventListener('click', () => this.restart());
        this.journeyMirror.style.display = 'none';
        this.loadScene(this.data.currentScene);
    }

    loadScene(sceneId) {
        const scene = this.data.scenes[sceneId];
        if (!scene) {
            console.error(`Scene not found: ${sceneId}`);
            return;
        }

        this.data.currentScene = sceneId;

        // Render text
        this.textDisplay.innerHTML = '';
        const paragraphs = scene.text.trim().split('\n\n');
        paragraphs.forEach((para, index) => {
            const p = document.createElement('p');
            p.textContent = para.trim();
            p.classList.add('fade-in');
            p.style.animationDelay = `${index * 0.12}s`;
            this.textDisplay.appendChild(p);
        });

        // Render choices
        this.choicesContainer.innerHTML = '';

        if (scene.choices.length === 0) {
            // Ending reached
            this.restartBtn.style.display = 'block';
            this.showMirror(paragraphs.length);
        } else {
            this.restartBtn.style.display = 'none';
            this.journeyMirror.style.display = 'none';
            scene.choices.forEach((choice, index) => {
                const btn = document.createElement('button');
                btn.textContent = choice.text;
                btn.classList.add('choice-btn', 'fade-in');
                btn.style.animationDelay = `${(paragraphs.length * 0.12) + (index * 0.15)}s`;
                btn.addEventListener('click', () => this.makeChoice(choice));
                this.choicesContainer.appendChild(btn);
            });
        }

        window.scrollTo(0, 0);
    }

    makeChoice(choice) {
        // Record the binary decision if this choice carries one
        if (choice.decision) {
            this.data.decisions[choice.decision.key] = choice.decision.value;
        }

        if (choice.next) {
            this.loadScene(choice.next);
        }
    }

    showMirror(textLength) {
        const moses = this.data.mosesPath;
        const player = this.data.decisions;

        const label = (val) => {
            if (val === 'asked') return 'asked';
            if (val === 'silent') return 'silent';
            return '—';
        };

        const fmt = (path) =>
            `${label(path.boat)}&nbsp;&nbsp;·&nbsp;&nbsp;${label(path.boy)}&nbsp;&nbsp;·&nbsp;&nbsp;${label(path.wall)}`;

        const playerMatchesMoses =
            player.boat === moses.boat &&
            player.boy === moses.boy &&
            player.wall === moses.wall;

        this.journeyMirror.innerHTML = `
            <div class="mirror-inner">
                <p class="mirror-caption">Moses told you he would not be able to bear it.<br>He was right. He asked all three times.</p>
                <table class="mirror-table" aria-label="Journey comparison">
                    <tbody>
                        <tr>
                            <td class="mirror-name">Moses</td>
                            <td class="mirror-choices">${fmt(moses)}</td>
                        </tr>
                        <tr>
                            <td class="mirror-name mirror-name-you">You</td>
                            <td class="mirror-choices mirror-choices-you">${fmt(player)}</td>
                        </tr>
                    </tbody>
                </table>
                ${playerMatchesMoses ? '<p class="mirror-echo">You made every choice he made.</p>' : ''}
            </div>
        `;

        // Delay the mirror slightly so it arrives after the ending text settles
        const delay = (textLength * 0.12) + 0.6;
        this.journeyMirror.style.animationDelay = `${delay}s`;
        this.journeyMirror.style.display = 'block';
        this.journeyMirror.classList.add('mirror-reveal');
    }

    restart() {
        this.data.currentScene = 'start';
        this.data.decisions = { boat: null, boy: null, wall: null };
        this.journeyMirror.classList.remove('mirror-reveal');
        this.journeyMirror.style.display = 'none';
        this.restartBtn.style.display = 'none';
        this.loadScene('start');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new GameEngine(gameData);
});
