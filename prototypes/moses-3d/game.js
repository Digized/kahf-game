// Main Game Controller
class MosesKhidrGame {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        
        this.moses = null;
        this.khidr = null;
        this.currentEnvironment = null;
        
        this.patience = 3;
        this.maxPatience = 3;
        this.currentScene = 'start';
        this.animationTime = 0;
        
        this.init();
    }
    
    init() {
        this.setupThreeJS();
        this.setupLighting();
        this.setupUI();
        this.setupTitleScreen();
        this.loadScene('start');
        this.animate();
        
        // Hide loading screen after a moment
        setTimeout(() => {
            document.getElementById('loading-screen').classList.add('hidden');
        }, 1000);
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
    
    setupThreeJS() {
        // Scene
        this.scene = new THREE.Scene();
        
        // Camera (near plane increased to prevent clipping)
        this.camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            0.5,  // Increased from 0.1 to reduce near-plane clipping
            1000
        );
        this.camera.position.set(0, 5, 10);
        
        // Renderer (optimized for smooth rendering)
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: false,
            depth: true,
            logarithmicDepthBuffer: false,
            precision: 'highp'
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.sortObjects = true; // Enable proper depth sorting
        this.renderer.autoClear = true;
        this.renderer.autoClearColor = true;
        this.renderer.autoClearDepth = true;
        this.renderer.autoClearStencil = true;
        document.getElementById('canvas-container').appendChild(this.renderer.domElement);
        
        // Controls (constrained to prevent clipping)
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.08;
        this.controls.minDistance = 6;  // Increased from 5 to prevent getting too close
        this.controls.maxDistance = 18; // Reduced from 20 for tighter framing
        this.controls.maxPolarAngle = Math.PI / 2.2; // Prevent going below ground
        this.controls.minPolarAngle = Math.PI / 8; // Prevent looking straight down
        this.controls.target.set(0, 1, 0); // Look at character height, not ground
        this.controls.enablePan = false; // Disable panning to keep scene centered
        
        // Handle window resize
        window.addEventListener('resize', () => this.onWindowResize(), false);
    }
    
    setupLighting() {
        // Ambient light (warm)
        const ambientLight = new THREE.AmbientLight(0xFFE8D0, 0.5);
        this.scene.add(ambientLight);
        
        // Directional light (warm sun)
        const dirLight = new THREE.DirectionalLight(0xFFD89B, 0.9);
        dirLight.position.set(6, 12, 4);
        dirLight.castShadow = true;
        dirLight.shadow.mapSize.width = 1024;
        dirLight.shadow.mapSize.height = 1024;
        this.scene.add(dirLight);
        
        // Hemisphere light (warm sky, warm earth)
        const hemiLight = new THREE.HemisphereLight(0xE8A870, 0xC4A07A, 0.4);
        this.scene.add(hemiLight);
    }
    
    setupUI() {
        this.updatePatienceDisplay();
        document.getElementById('restart-btn').addEventListener('click', () => this.restart());
    }
    
    loadScene(sceneId) {
        const sceneData = this.getSceneData(sceneId);
        if (!sceneData) return;
        
        this.currentScene = sceneId;
        
        // Update environment based on scene
        this.updateEnvironment(sceneId);
        
        // Update story text
        this.displayStoryText(sceneData.text);
        
        // Update choices
        this.displayChoices(sceneData.choices);
        
        // Update camera position for scene
        this.setCameraForScene(sceneId);
        
        // Trigger animations for specific scenes
        this.triggerSceneAnimation(sceneId);
    }
    
    triggerSceneAnimation(sceneId) {
        // Delay slightly to let scene settle
        setTimeout(() => {
            switch(sceneId) {
                case 'boat_damage':
                    const boat = this.scene.userData.boat;
                    if (boat) {
                        AnimationController.breakBoat(boat, null);
                    }
                    break;
                    
                case 'boy_death':
                    // Create a simple child character for the animation
                    const child = CharacterFactory.createSimpleCharacter(0x7A6A5A, 0.7);
                    child.position.set(2, 0, -2);
                    this.scene.add(child);
                    this.scene.userData.childCharacter = child;
                    
                    // Trigger fall after a moment
                    setTimeout(() => {
                        AnimationController.childFallSequence(this.scene, child, null);
                    }, 800);
                    break;
                    
                case 'wall_repair':
                    const wall = this.scene.userData.wall;
                    if (wall) {
                        // Start repair after brief pause
                        setTimeout(() => {
                            AnimationController.repairWall(wall, null);
                        }, 1500);
                    }
                    break;
                    
                case 'revelation_patient':
                case 'revelation_impatient':
                    // Show visions in sequence
                    this.playRevelationVisions();
                    break;
            }
        }, 500);
    }
    
    playRevelationVisions() {
        // Show three visions in sequence
        setTimeout(() => {
            AnimationController.showVision(this.scene, 'tyrant-boats', () => {
                setTimeout(() => {
                    AnimationController.showVision(this.scene, 'boy-future', () => {
                        setTimeout(() => {
                            AnimationController.showVision(this.scene, 'treasure', null);
                        }, 500);
                    });
                }, 500);
            });
        }, 1000);
    }
    
    updateEnvironment(sceneId) {
        // Determine which environment to show
        if (sceneId.includes('boat') || sceneId.includes('journey_start')) {
            if (this.currentEnvironment !== 'boat') {
                EnvironmentFactory.createBoatScene(this.scene);
                this.createCharacters('boat');
                this.currentEnvironment = 'boat';
            }
        } else if (sceneId.includes('village') || sceneId.includes('boy')) {
            if (this.currentEnvironment !== 'village') {
                EnvironmentFactory.createVillageScene(this.scene);
                this.createCharacters('village');
                this.currentEnvironment = 'village';
            }
        } else if (sceneId.includes('town') || sceneId.includes('wall')) {
            if (this.currentEnvironment !== 'town') {
                EnvironmentFactory.createTownScene(this.scene);
                this.createCharacters('town');
                this.currentEnvironment = 'town';
            }
        } else {
            // Meeting/start scene - simple environment
            if (this.currentEnvironment !== 'meeting') {
                this.createMeetingScene();
                this.currentEnvironment = 'meeting';
            }
        }
        
        // Handle special scene events
        if (sceneId === 'boat_damage') {
            const boat = this.scene.userData.boat;
            if (boat) EnvironmentFactory.damageBoat(boat);
        }
        
        if (sceneId === 'wall_silence' || sceneId === 'revelation_patient_3') {
            const wall = this.scene.userData.wall;
            if (wall) EnvironmentFactory.repairWall(wall);
        }
    }
    
    createMeetingScene() {
        EnvironmentFactory.clearScene(this.scene);
        
        // Ground (shore)
        const groundGeometry = new THREE.PlaneGeometry(30, 30);
        const groundMaterial = new THREE.MeshLambertMaterial({ color: 0xc2b280 });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -0.5;
        this.scene.add(ground);
        
        // Water in distance
        const waterGeometry = new THREE.PlaneGeometry(50, 20);
        const waterMaterial = new THREE.MeshLambertMaterial({ color: 0x1e5a8e });
        const water = new THREE.Mesh(waterGeometry, waterMaterial);
        water.rotation.x = -Math.PI / 2;
        water.position.set(0, -0.5, -15);
        this.scene.add(water);
        
        // Sky
        this.scene.background = new THREE.Color(0x87ceeb);
        this.scene.fog = new THREE.Fog(0x87ceeb, 15, 40);
        
        this.createCharacters('meeting');
    }
    
    createCharacters(environment) {
        // Remove old characters
        if (this.moses) this.scene.remove(this.moses);
        if (this.khidr) this.scene.remove(this.khidr);
        
        // Create new characters
        this.moses = CharacterFactory.createMoses();
        this.khidr = CharacterFactory.createKhidr();
        
        // Position based on environment (y=0.1 to ensure above ground plane at y=-0.5)
        switch(environment) {
            case 'boat':
                this.moses.position.set(-0.6, 0.65, 0.3);  // On boat deck
                this.khidr.position.set(0.6, 0.65, -0.3);
                this.moses.rotation.y = Math.PI / 6;
                this.khidr.rotation.y = -Math.PI / 6;
                break;
            case 'village':
                this.moses.position.set(-2, 0.1, 2.5);
                this.khidr.position.set(1.5, 0.1, 2);
                this.moses.rotation.y = -Math.PI / 4;
                this.khidr.rotation.y = Math.PI / 3;
                // Add a boy character
                const boy = CharacterFactory.createSimpleCharacter(0x6ba3d4, 0.6);
                boy.position.set(0.5, 0.1, -2.5);
                this.scene.add(boy);
                this.scene.userData.boy = boy;
                break;
            case 'town':
                this.moses.position.set(-1.5, 0.1, 1);
                this.khidr.position.set(1.2, 0.1, -0.5);
                this.moses.rotation.y = Math.PI / 8;
                this.khidr.rotation.y = -Math.PI / 8;
                break;
            default: // meeting
                this.moses.position.set(-2.5, 0.1, 0.5);
                this.khidr.position.set(2.5, 0.1, -0.5);
                this.moses.rotation.y = Math.PI / 6;
                this.khidr.rotation.y = Math.PI + Math.PI / 6;
        }
        
        this.scene.add(this.moses);
        this.scene.add(this.khidr);
    }
    
    setCameraForScene(sceneId) {
        let targetPos = { x: 0, y: 4.5, z: 9 };
        let targetLookAt = { x: 0, y: 1, z: 0 };
        
        if (sceneId.includes('boat')) {
            targetPos = { x: 1, y: 3.5, z: 7 };
            targetLookAt = { x: 0, y: 1, z: 0 };
        } else if (sceneId.includes('village') || sceneId.includes('boy')) {
            targetPos = { x: -1, y: 4, z: 9 };
            targetLookAt = { x: 0, y: 1.2, z: 0 };
        } else if (sceneId.includes('town') || sceneId.includes('wall')) {
            targetPos = { x: -4, y: 4.5, z: 7 };
            targetLookAt = { x: -2, y: 1.5, z: -2 };
        }
        
        // Smooth camera transition
        this.smoothCameraMove(targetPos, targetLookAt);
    }
    
    smoothCameraMove(targetPos, targetLookAt = null, duration = 1200) {
        const startPos = {
            x: this.camera.position.x,
            y: this.camera.position.y,
            z: this.camera.position.z
        };
        
        const startLookAt = {
            x: this.controls.target.x,
            y: this.controls.target.y,
            z: this.controls.target.z
        };
        
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = this.easeInOutQuad(progress);
            
            // Move camera
            this.camera.position.x = startPos.x + (targetPos.x - startPos.x) * eased;
            this.camera.position.y = startPos.y + (targetPos.y - startPos.y) * eased;
            this.camera.position.z = startPos.z + (targetPos.z - startPos.z) * eased;
            
            // Update lookAt target if provided
            if (targetLookAt) {
                this.controls.target.x = startLookAt.x + (targetLookAt.x - startLookAt.x) * eased;
                this.controls.target.y = startLookAt.y + (targetLookAt.y - startLookAt.y) * eased;
                this.controls.target.z = startLookAt.z + (targetLookAt.z - startLookAt.z) * eased;
            }
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    }
    
    easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }
    
    displayStoryText(text) {
        const storyTextEl = document.getElementById('story-text');
        storyTextEl.innerHTML = '';
        
        const paragraphs = text.trim().split('\n\n');
        paragraphs.forEach(para => {
            const p = document.createElement('p');
            p.textContent = para.trim();
            storyTextEl.appendChild(p);
        });
    }
    
    displayChoices(choices) {
        const choicesContainer = document.getElementById('choices-container');
        choicesContainer.innerHTML = '';
        
        if (choices.length === 0) {
            document.getElementById('restart-btn').style.display = 'block';
            return;
        }
        
        document.getElementById('restart-btn').style.display = 'none';
        
        choices.forEach(choice => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.textContent = choice.text;
            
            if (choice.isQuestion) {
                btn.classList.add('question');
            }
            
            btn.addEventListener('click', () => this.makeChoice(choice));
            choicesContainer.appendChild(btn);
        });
    }
    
    makeChoice(choice) {
        // Handle patience reduction
        if (choice.isQuestion) {
            this.patience--;
            this.updatePatienceDisplay();
        }
        
        // Load next scene
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
    
    restart() {
        this.patience = this.maxPatience;
        this.currentScene = 'start';
        this.currentEnvironment = null;
        this.updatePatienceDisplay();
        this.loadScene('start');
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        this.animationTime += 0.016;
        
        // Animate characters
        if (this.moses) {
            CharacterFactory.animateIdle(this.moses, this.animationTime);
        }
        if (this.khidr) {
            CharacterFactory.animateIdle(this.khidr, this.animationTime + 0.5);
        }
        
        // Animate boat bobbing (gentle)
        const boat = this.scene.userData.boat;
        if (boat) {
            boat.position.y = Math.sin(this.animationTime * 0.4) * 0.06;  // Reduced amplitude
            boat.rotation.z = Math.sin(this.animationTime * 0.25) * 0.015; // Smoother rotation
        }
        
        // Animate water
        const water = this.scene.userData.water;
        if (water) {
            EnvironmentFactory.animateWater(water, this.animationTime);
        }
        
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
    
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    // Scene data
    getSceneData(sceneId) {
        const scenes = {
            start: {
                text: `You are Moses, the prophet and leader of your people.

You have come far — through years of wandering, revelation, and divine encounter. Few in all the world have spoken to God as you have.

And then the word reaches you: there exists a man, somewhere along the confluence of two seas, who carries knowledge you do not possess.

The thought sits with you longer than you expect.`,
                choices: [
                    { text: 'Seek out Khidr', next: 'meeting' }
                ]
            },
            
            meeting: {
                text: `You find Khidr by the shore, a cloaked figure gazing at the horizon.

"I have come to learn from you," you say.

Khidr turns. His eyes are ancient, unhurried. "You will not have patience with me, Moses."

"You will find me patient, if God wills it," you reply.

"Then come," he says. "But do not question what I do. When the time is right, I will explain. Can you accept this?"`,
                choices: [
                    { text: 'I accept. I will be patient.', next: 'journey_start' },
                    { text: 'How can I learn without asking questions?', next: 'meeting_question', isQuestion: true }
                ]
            },
            
            meeting_question: {
                text: `Khidr's expression softens, slightly.

"Learning is not always through questioning," he says. "Sometimes it is through witnessing. Through patience. Through trusting that understanding will come."

"Will you journey with me in silence, or will you stay behind?"`,
                choices: [
                    { text: 'I will try. Let us begin.', next: 'journey_start' }
                ]
            },
            
            journey_start: {
                text: `You journey together in silence, walking along the coast. The sun glitters off the water.

After some time, you reach a small harbor where a boat is moored. Poor fishermen are preparing it for the day's work.

Khidr approaches. "May we have passage?"

The fishermen, recognizing his bearing, offer it freely. "No payment necessary, honored one."

You board. The boat pushes off from shore.`,
                choices: [
                    { text: 'Walk on', next: 'boat_damage' }
                ]
            },
            
            boat_damage: {
                text: `The journey is peaceful at first. Then, without warning, Khidr stands and begins tearing at the planks of the boat.

Wood splinters. Water seeps in.

The fishermen cry out, rushing to plug the hole. The boat is damaged but still floats.

You stare at Khidr. These men gave passage freely. They are poor. This boat is their livelihood.

Why would he do this?`,
                choices: [
                    { text: 'Say nothing. I promised patience.', next: 'boat_silence' },
                    { text: 'Why did you damage their boat? They showed us kindness!', next: 'boat_question', isQuestion: true }
                ]
            },
            
            boat_silence: {
                text: `You bite your tongue, though every part of you wants to speak.

Khidr meets your eyes. He sees your struggle, your restraint.

"Well done," he says quietly.

The boat limps to shore. The fishermen see you off without anger.

You and Khidr disembark and continue walking.`,
                choices: [
                    { text: 'Walk on', next: 'village_arrival' }
                ]
            },
            
            boat_question: {
                text: `Khidr looks at you steadily.

"Did I not say you would lack patience with me?"

"These are poor men," you protest. "They offered kindness, and you repay them with destruction?"

"You have broken your promise," Khidr says. "But I will continue, for now."

The boat reaches shore. You disembark in troubled silence.`,
                choices: [
                    { text: 'Walk on', next: 'village_arrival' }
                ]
            },
            
            village_arrival: {
                text: `You travel inland and reach a small village as evening falls.

Children play in the streets. Their laughter echoes between the clay houses.

Khidr watches them with an unreadable expression.

One boy, perhaps twelve years old, runs past chasing a ball. His face is bright with joy.

Khidr steps forward.`,
                choices: [
                    { text: 'Watch', next: 'boy_death' }
                ]
            },
            
            boy_death: {
                text: `What happens next is almost too quick to process.

Khidr strikes the boy. The child falls.

He does not rise.

You stand frozen. The laughter, the running, the joy — gone in an instant.

Khidr has killed a child.

Horror floods through you.`,
                choices: [
                    { text: 'Keep silent, though it tears at you', next: 'boy_silence' },
                    { text: 'Have you killed an innocent soul?!', next: 'boy_question', isQuestion: true }
                ]
            },
            
            boy_silence: {
                text: `You cannot speak. Your throat is tight with grief and shock.

Khidr begins walking away from the village. You follow, numb.

The boy's laughter still echoes in your memory.

How can this be right? How can this be wisdom?

But you said you would trust. You said you would be patient.

You walk on in anguished silence.`,
                choices: [
                    { text: 'Press forward', next: 'town_arrival' }
                ]
            },
            
            boy_question: {
                text: `"Have you killed an innocent soul?!" you cry out. "A child who had done nothing wrong?!"

Khidr stops walking.

"Did I not tell you that you would not have patience with me?"

"Patience?" Your voice breaks. "You have killed a child."

"You have questioned me twice now, Moses," Khidr says. "If you question me once more, we must part ways."

The weight of those words hangs between you.`,
                choices: [
                    { text: 'Walk on in silence', next: 'town_arrival' }
                ]
            },
            
            town_arrival: {
                text: `Days pass. You reach a wealthy town as evening falls.

The houses are large and well-kept. Well-dressed merchants hurry past without acknowledgment.

You and Khidr ask for food and shelter. Door after door closes.

"We have no room for wanderers."
"Try elsewhere."
"Don't loiter here."

The town is prosperous. Its people are not.

You sit hungry in an alley as the stars come out.`,
                choices: [
                    { text: 'Wait', next: 'wall_repair' }
                ]
            },
            
            wall_repair: {
                text: `Khidr rises and walks to the edge of town where an old wall stands, crumbling and neglected.

Without a word, he begins repairing it. Stone by stone, careful and unhurried.

You watch. Exhausted. Hungry.

These people refused you shelter. Refused you food. Showed no kindness.

Yet Khidr labors for them, asking nothing in return.`,
                choices: [
                    { text: 'Stay silent. This is the last test.', next: 'wall_silence' },
                    { text: 'Why repair their wall? They gave us nothing!', next: 'wall_question', isQuestion: true }
                ]
            },
            
            wall_silence: {
                text: `You hold your tongue. Your stomach growls. Your feet ache.

But you stay silent.

Khidr completes the wall and steps back to examine his work.

He turns to you — and there is something like sadness in his eyes.

"You have done well to remain patient, Moses. But I see the questions burning within you."

"Come. It is time for us to part. But first, I will explain."`,
                choices: [
                    { text: 'Listen', next: 'revelation_patient' }
                ]
            },
            
            wall_question: {
                text: `"Why repair their wall?" you demand. "They refused us food and shelter. If you must work, at least ask payment!"

Khidr sets down the stone he was holding.

"This is the third time you have questioned me, Moses."

"We must part ways now. But before we do — I will tell you what you could not bear to witness in patience."`,
                choices: [
                    { text: 'Listen', next: 'revelation_impatient' }
                ]
            },
            
            revelation_patient: {
                text: `Khidr speaks.

"The boat belonged to poor fishermen. But a tyrannical king patrols these waters, seizing every vessel that is whole and sound. By damaging it, I made it unfit for seizure. The fishermen will repair it. They will keep their livelihood.

The boy was destined to become a man of great cruelty. He would have driven his righteous parents — through grief and sin — away from their faith. God will give them a better child. One who will be their comfort.

The wall conceals a treasure belonging to two orphan boys in this town. Their father was a righteous man. When they come of age, they will find it and be provided for. If the wall had crumbled, the townspeople would have seized it."

He places a hand on your shoulder.

"These were not my decisions, Moses. This is the knowledge of God — beyond the reach of what any eye can see."

"You remained patient longer than most could. Yet even you, with all your wisdom, could not bear witness without needing to understand."

He is not unkind when he says it. Just honest.`,
                choices: [
                    { text: 'Sit with this', next: 'ending_patient' }
                ]
            },
            
            revelation_impatient: {
                text: `Khidr speaks.

"The boat belonged to poor fishermen. But a tyrannical king patrols these waters, seizing every vessel that is whole and sound. By damaging it, I made it unfit for seizure. The fishermen will repair it. They will keep their livelihood.

The boy was destined to become a man of great cruelty. He would have driven his righteous parents — through grief and sin — away from their faith. God will give them a better child. One who will be their comfort.

The wall conceals a treasure belonging to two orphan boys in this town. Their father was a righteous man. When they come of age, they will find it and be provided for. If the wall had crumbled, the townspeople would have seized it."

Khidr's voice becomes firm — but not unkind.

"These were not my decisions, Moses. This is the knowledge of God."

"You are a great prophet. Wise and strong. But even you could not stand still and let the divine will unfold without demanding an account."

He begins to walk away.

"Patience is harder than knowledge, Moses. Remember this."`,
                choices: [
                    { text: 'Let it settle', next: 'ending_impatient' }
                ]
            },
            
            ending_patient: {
                text: `You stand in the fading light, overwhelmed.

Every act of seeming cruelty — mercy in disguise.
Every inexplicable deed — wisdom beyond what eyes can reach.

You maintained patience longer than most. Yet even you stumbled at the edge of human understanding.

Khidr's words stay with you:

*"This is the knowledge of God — beyond the reach of what any eye can see."*

You are Moses, prophet and leader. But in this moment, you are simply a student, humbled before something too large for certainty.

Perhaps that, too, is part of the lesson.`,
                choices: []
            },
            
            ending_impatient: {
                text: `You stand alone as Khidr disappears into the distance.

The truth settles like dust after a storm.

Every act of seeming cruelty — mercy in disguise.
Every inexplicable deed — wisdom beyond what any eyes could reach.

You are Moses, beloved of God, leader of your people. And you could not stand still.

Patience — real patience — turns out to be harder than any knowledge you have gained.

Humility cuts deeper than any other lesson.

You will carry this for the rest of your days.`,
                choices: []
            }
        };
        
        return scenes[sceneId];
    }
}

// Start the game when page loads
window.addEventListener('DOMContentLoaded', () => {
    new MosesKhidrGame();
});
