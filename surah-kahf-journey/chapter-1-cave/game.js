// Chapter 1: People of the Cave
// First-person perspective - you ARE one of the youths

class CaveSleepersGame {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        
        this.currentSceneId = 'start';
        this.animationTime = 0;
        this.faithLevel = 100;
        
        this.init();
    }
    
    init() {
        this.setupThreeJS();
        this.setupLighting();
        this.setupUI();
        this.loadScene('start');
        this.animate();
        
        setTimeout(() => {
            document.getElementById('loading-screen').classList.add('hidden');
        }, 1500);
    }
    
    setupThreeJS() {
        this.scene = new THREE.Scene();
        
        // First-person camera (you ARE one of the youths)
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 1.7, 0);
        
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        document.getElementById('canvas-container').appendChild(this.renderer.domElement);
        
        // Subtle mouse look
        this.setupFirstPersonView();
        
        window.addEventListener('resize', () => this.onWindowResize(), false);
    }
    
    setupFirstPersonView() {
        let mouseX = 0;
        let mouseY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
            
            this.camera.rotation.y = mouseX * 0.3;
            this.camera.rotation.x = mouseY * 0.2;
        });
    }
    
    setupLighting() {
        const ambientLight = new THREE.AmbientLight(0xFFE8D0, 0.6);
        this.scene.add(ambientLight);
        
        const dirLight = new THREE.DirectionalLight(0xFFD89B, 0.8);
        dirLight.position.set(10, 20, 5);
        dirLight.castShadow = true;
        this.scene.add(dirLight);
    }
    
    setupUI() {
        this.updateFaithDisplay();
        
        document.getElementById('return-btn').addEventListener('click', () => {
            window.location.href = '../index.html';
        });
    }
    
    loadScene(sceneId) {
        const sceneData = SCENES[sceneId];
        if (!sceneData) return;
        
        this.currentSceneId = sceneId;
        
        // Update environment
        this.updateEnvironment(sceneData.environment);
        
        // Display text
        document.getElementById('story-text').innerHTML = sceneData.text;
        
        // Display choices
        this.displayChoices(sceneData.choices);
        
        // Camera position
        if (sceneData.cameraPosition) {
            this.camera.position.copy(sceneData.cameraPosition);
        }
    }
    
    updateEnvironment(envType) {
        EnvironmentFactory.clearScene(this.scene);
        
        switch (envType) {
            case 'city':
                EnvironmentFactory.createCity(this.scene);
                break;
            case 'cave_entrance':
                EnvironmentFactory.createCaveEntrance(this.scene);
                break;
            case 'cave_dark':
                EnvironmentFactory.createCaveDark(this.scene);
                break;
            case 'cave_light':
                EnvironmentFactory.createCaveLight(this.scene);
                break;
        }
    }
    
    displayChoices(choices) {
        const choicesEl = document.getElementById('choices');
        choicesEl.innerHTML = '';
        
        if (!choices || choices.length === 0) {
            const returnBtn = document.createElement('button');
            returnBtn.className = 'choice-btn';
            returnBtn.textContent = 'Return to Menu';
            returnBtn.addEventListener('click', () => {
                if (window.SurahKahfLauncher) {
                    window.SurahKahfLauncher.markChapterComplete(1);
                }
                window.location.href = '../index.html';
            });
            choicesEl.appendChild(returnBtn);
            return;
        }
        
        choices.forEach(choice => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.textContent = choice.text;
            
            btn.addEventListener('click', () => {
                if (choice.next) {
                    this.loadScene(choice.next);
                }
            });
            
            choicesEl.appendChild(btn);
        });
    }
    
    updateFaithDisplay() {
        const fill = document.getElementById('faith-fill');
        fill.style.width = this.faithLevel + '%';
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        this.animationTime += 0.016;
        
        EnvironmentFactory.animateEnvironment(this.scene, this.animationTime);
        
        this.renderer.render(this.scene, this.camera);
    }
    
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    new CaveSleepersGame();
});
