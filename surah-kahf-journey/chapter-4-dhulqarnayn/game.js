// Chapter 4: Dhul-Qarnayn
// Journey of a just ruler

class DhulQarnaynGame {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        
        this.currentSceneId = 'start';
        this.animationTime = 0;
        this.currentEnvironment = null;
        
        // Progress tracking
        this.sceneHistory = [];
        this.totalScenes = Object.keys(SCENES || {}).length;
        
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
        // Scene
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog(0x87ceeb, 20, 60);
        
        // Camera (FIRST PERSON - this IS Musa's eyes)
        this.camera = new THREE.PerspectiveCamera(
            75, // Wide FOV for immersion
            window.innerWidth / window.innerHeight,
            0.5, // Fixed near plane to prevent clipping
            1000
        );
        this.camera.position.set(0, 1.7, 0); // Eye height
        
        // Renderer
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: false
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        document.getElementById('canvas-container').appendChild(this.renderer.domElement);
        
        // First-person controls (minimal mouse movement for looking around)
        this.setupFirstPersonView();
        
        window.addEventListener('resize', () => this.onWindowResize(), false);
    }
    
    setupFirstPersonView() {
        // First-person look controls
        let mouseX = 0;
        let mouseY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
            
            // Full 360° horizontal, limited vertical
            this.camera.rotation.y = mouseX * Math.PI;
            this.camera.rotation.x = mouseY * 0.4;
        });
    }
    
    setupLighting() {
        // Warm ambient light
        const ambientLight = new THREE.AmbientLight(0xFFE8D0, 0.6);
        this.scene.add(ambientLight);
        
        // Directional sun light
        const dirLight = new THREE.DirectionalLight(0xFFD89B, 0.8);
        dirLight.position.set(10, 20, 5);
        dirLight.castShadow = true;
        dirLight.shadow.mapSize.width = 2048;
        dirLight.shadow.mapSize.height = 2048;
        this.scene.add(dirLight);
        
        // Hemisphere light (sky/ground)
        const hemiLight = new THREE.HemisphereLight(0x87ceeb, 0xc2b280, 0.5);
        this.scene.add(hemiLight);
    }
    
    setupUI() {
        document.getElementById('return-btn').addEventListener('click', () => {
            window.location.href = '../index.html';
        });
    }
    
    loadScene(sceneId) {
        const sceneData = SCENES[sceneId];
        if (!sceneData) {
            console.error('Scene not found:', sceneId);
            return;
        }
        
        this.currentSceneId = sceneId;
        this.sceneHistory.push(sceneId);
        this.updateProgressDisplay();
        
        // Update environment
        this.updateEnvironment(sceneData.environment);
        
        // Display story text
        this.displayStoryText(sceneData.text);
        
        // Display choices
        this.displayChoices(sceneData.choices);
        
        // Update verse display
        if (sceneData.verse) {
            this.updateVerseDisplay(sceneData.verse);
        }
        
        // Position camera for scene
        if (sceneData.cameraPosition) {
            this.camera.position.copy(sceneData.cameraPosition);
        }
        if (sceneData.cameraRotation) {
            this.camera.rotation.y = sceneData.cameraRotation.y || 0;
            this.camera.rotation.x = sceneData.cameraRotation.x || 0;
        }
    }
    
    updateEnvironment(envType) {
        if (this.currentEnvironment === envType) return;
        
        // Clear previous environment
        EnvironmentFactory.clearScene(this.scene);
        
        // Create new environment
        switch (envType) {
            case 'throne_room':
                EnvironmentFactory.createThroneRoom(this.scene);
                break;
            case 'sunset_shore':
                EnvironmentFactory.createSunsetShore(this.scene);
                break;
            case 'western_city':
                EnvironmentFactory.createWesternCity(this.scene);
                break;
            case 'sunrise_plain':
                EnvironmentFactory.createSunrisePlain(this.scene);
                break;
            case 'mountain_pass':
                EnvironmentFactory.createMountainPass(this.scene);
                break;
            case 'construction_site':
                EnvironmentFactory.createConstructionSite(this.scene);
                break;
            case 'completed_wall':
                EnvironmentFactory.createCompletedWall(this.scene);
                break;
            case 'battlefield':
                EnvironmentFactory.createBattlefield(this.scene);
                break;
            case 'ruined_kingdom':
                EnvironmentFactory.createRuinedKingdom(this.scene);
                break;
        }
        
        this.currentEnvironment = envType;
    }
    
    displayStoryText(text) {
        const storyTextEl = document.getElementById('story-text');
        storyTextEl.innerHTML = text;
    }
    
    displayChoices(choices) {
        const choicesEl = document.getElementById('choices');
        choicesEl.innerHTML = '';
        
        if (!choices || choices.length === 0) {
            // End of chapter
            const returnBtn = document.createElement('button');
            returnBtn.className = 'choice-btn';
            returnBtn.textContent = 'Return to Menu';
            returnBtn.addEventListener('click', () => {
                // Mark chapter complete
                if (window.SurahKahfLauncher) {
                    window.SurahKahfLauncher.markChapterComplete(3);
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
            
            if (choice.type === 'question') {
                btn.classList.add('question');
            }
            
            btn.addEventListener('click', () => {
                this.makeChoice(choice);
            });
            
            choicesEl.appendChild(btn);
        });
    }
    
    makeChoice(choice) {
        if (choice.next) {
            this.loadScene(choice.next);
        }
    }
    
    updateVerseDisplay(verse) {
        const verseDisplay = document.getElementById('verse-display');
        const verseText = verseDisplay.querySelector('.verse-text');
        const verseRef = verseDisplay.querySelector('.verse-ref');
        
        verseRef.textContent = verse.ref;
        verseText.textContent = verse.text;
    }
    
    updateProgressDisplay() {
        // Optional progress display - only if element exists
        const verseDisplay = document.getElementById('verse-display');
        if (!verseDisplay) return;
        
        let progressDiv = document.getElementById('scene-progress');
        
        if (!progressDiv) {
            progressDiv = document.createElement('div');
            progressDiv.id = 'scene-progress';
            progressDiv.style.cssText = 'margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(212,175,55,0.3); text-align: center; color: #888; font-size: 0.9rem;';
            verseDisplay.appendChild(progressDiv);
        }
        
        const uniqueScenes = new Set(this.sceneHistory).size;
        progressDiv.textContent = `Scene ${uniqueScenes} / ${this.totalScenes}`;
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        this.animationTime += 0.016;
        
        // Animate environment elements
        EnvironmentFactory.animateEnvironment(this.scene, this.animationTime);
        
        this.renderer.render(this.scene, this.camera);
    }
    
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

// Start game when page loads
let game;
window.addEventListener('DOMContentLoaded', () => {
    game = new DhulQarnaynGame();
});
