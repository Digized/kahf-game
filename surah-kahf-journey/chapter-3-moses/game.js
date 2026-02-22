// Chapter 3: Musa & Al-Khidr
// CRITICAL ISLAMIC COMPLIANCE: First-person ONLY. Never show Prophet Musa (AS)

class MosesKhidrGame {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        
        this.patience = 3;
        this.maxPatience = 3;
        this.currentSceneId = 'start';
        this.animationTime = 0;
        
        this.khidr = null; // Abstract silhouette only
        this.currentEnvironment = null;
        
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
            0.1,
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
        // Subtle head movement with mouse
        let mouseX = 0;
        let mouseY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
            
            // Subtle camera rotation (limited range)
            this.camera.rotation.y = mouseX * 0.3;
            this.camera.rotation.x = mouseY * 0.2;
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
        this.updatePatienceDisplay();
        
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
            case 'shore':
                EnvironmentFactory.createShore(this.scene);
                break;
            case 'boat':
                EnvironmentFactory.createBoatScene(this.scene);
                this.khidr = CharacterFactory.createKhidr();
                this.khidr.position.set(2, 0.5, -1);
                this.scene.add(this.khidr);
                break;
            case 'village':
                EnvironmentFactory.createVillage(this.scene);
                this.khidr = CharacterFactory.createKhidr();
                this.khidr.position.set(3, 0, -2);
                this.scene.add(this.khidr);
                break;
            case 'town':
                EnvironmentFactory.createTown(this.scene);
                this.khidr = CharacterFactory.createKhidr();
                this.khidr.position.set(4, 0, -3);
                this.scene.add(this.khidr);
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
        if (choice.type === 'question') {
            this.patience--;
            this.updatePatienceDisplay();
        }
        
        if (choice.next) {
            this.loadScene(choice.next);
        }
    }
    
    updatePatienceDisplay() {
        const fill = document.getElementById('patience-fill');
        const count = document.getElementById('patience-count');
        
        const percentage = (this.patience / this.maxPatience) * 100;
        fill.style.width = percentage + '%';
        
        fill.classList.remove('medium', 'low');
        if (this.patience === 2) {
            fill.classList.add('medium');
        } else if (this.patience <= 1) {
            fill.classList.add('low');
        }
        
        count.textContent = `${this.patience} / ${this.maxPatience}`;
    }
    
    updateVerseDisplay(verse) {
        const verseDisplay = document.getElementById('verse-display');
        const verseText = verseDisplay.querySelector('.verse-text');
        const verseRef = verseDisplay.querySelector('.verse-ref');
        
        verseRef.textContent = verse.ref;
        verseText.textContent = verse.text;
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        this.animationTime += 0.016;
        
        // Animate Khidr (if present)
        if (this.khidr) {
            CharacterFactory.animateIdle(this.khidr, this.animationTime);
        }
        
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
window.addEventListener('DOMContentLoaded', () => {
    new MosesKhidrGame();
});
