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
        this.loadScene('start');
        this.animate();
        
        // Hide loading screen after a moment
        setTimeout(() => {
            document.getElementById('loading-screen').classList.add('hidden');
        }, 1000);
    }
    
    setupThreeJS() {
        // Scene
        this.scene = new THREE.Scene();
        
        // Camera
        this.camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 5, 10);
        
        // Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        document.getElementById('canvas-container').appendChild(this.renderer.domElement);
        
        // Controls
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.minDistance = 5;
        this.controls.maxDistance = 20;
        this.controls.maxPolarAngle = Math.PI / 2;
        
        // Handle window resize
        window.addEventListener('resize', () => this.onWindowResize(), false);
    }
    
    setupLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);
        
        // Directional light (sun)
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
        dirLight.position.set(5, 10, 5);
        this.scene.add(dirLight);
        
        // Hemisphere light for better ambiance
        const hemiLight = new THREE.HemisphereLight(0x87ceeb, 0x8b7355, 0.3);
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
        
        // Position based on environment
        switch(environment) {
            case 'boat':
                this.moses.position.set(-0.5, 0.5, 0);
                this.khidr.position.set(0.5, 0.5, 0);
                break;
            case 'village':
                this.moses.position.set(-1.5, 0, 2);
                this.khidr.position.set(1.5, 0, 2);
                // Add a boy character
                const boy = CharacterFactory.createSimpleCharacter(0x6ba3d4, 0.6);
                boy.position.set(0, 0, -2);
                this.scene.add(boy);
                this.scene.userData.boy = boy;
                break;
            case 'town':
                this.moses.position.set(-1, 0, 0);
                this.khidr.position.set(1, 0, 0);
                break;
            default: // meeting
                this.moses.position.set(-2, 0, 0);
                this.khidr.position.set(2, 0, 0);
                this.khidr.rotation.y = Math.PI;
        }
        
        this.scene.add(this.moses);
        this.scene.add(this.khidr);
    }
    
    setCameraForScene(sceneId) {
        let targetPos = { x: 0, y: 5, z: 10 };
        
        if (sceneId.includes('boat')) {
            targetPos = { x: 0, y: 3, z: 8 };
        } else if (sceneId.includes('village') || sceneId.includes('boy')) {
            targetPos = { x: 0, y: 4, z: 10 };
        } else if (sceneId.includes('town') || sceneId.includes('wall')) {
            targetPos = { x: -5, y: 5, z: 8 };
        }
        
        // Smooth camera transition
        this.smoothCameraMove(targetPos);
    }
    
    smoothCameraMove(targetPos, duration = 1000) {
        const startPos = {
            x: this.camera.position.x,
            y: this.camera.position.y,
            z: this.camera.position.z
        };
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = this.easeInOutQuad(progress);
            
            this.camera.position.x = startPos.x + (targetPos.x - startPos.x) * eased;
            this.camera.position.y = startPos.y + (targetPos.y - startPos.y) * eased;
            this.camera.position.z = startPos.z + (targetPos.z - startPos.z) * eased;
            
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
        
        // Animate boat bobbing
        const boat = this.scene.userData.boat;
        if (boat) {
            boat.position.y = Math.sin(this.animationTime * 0.5) * 0.1;
            boat.rotation.z = Math.sin(this.animationTime * 0.3) * 0.02;
        }
        
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
    
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    // Scene data (simplified from original game)
    getSceneData(sceneId) {
        const scenes = {
            start: {
                text: `You are Moses, the prophet and leader of your people.

You have traveled far, seeking knowledge and understanding. Your reputation as a wise teacher has spread across the lands.

One day, a message comes: there is one who knows what you do not. A mysterious figure named Khidr, possessed of divine knowledge.

You must seek him out.`,
                choices: [
                    { text: 'Seek out Khidr', next: 'meeting' }
                ]
            },
            
            meeting: {
                text: `You find Khidr by the shore, a cloaked figure gazing at the horizon.

"I have come to learn from you," you say.

Khidr turns, his eyes ancient and knowing. "You will not have patience with me, Moses."

"You will find me patient, if God wills it," you reply.

"Then come," Khidr says. "But do not question what I do. When the time is right, I will explain. Can you accept this?"`,
                choices: [
                    { text: 'I accept. I will be patient.', next: 'journey_start' },
                    { text: 'How can I learn without asking questions?', next: 'meeting_question', isQuestion: true }
                ]
            },
            
            meeting_question: {
                text: `Khidr's expression softens slightly.

"Learning is not always through questioning," he says. "Sometimes it is through witnessing, through patience, through trusting that understanding will come."

"Will you journey with me in silence, or will you stay behind?"`,
                choices: [
                    { text: 'I will try to be patient. Let us begin.', next: 'journey_start' }
                ]
            },
            
            journey_start: {
                text: `You journey together in silence, walking along the coast. The sun reflects off the water.

After some time, you reach a small harbor where a boat is moored. Poor fishermen are preparing it for the day's work.

Khidr approaches the boat. "May we have passage?" he asks.

The fishermen, recognizing his bearing, offer the boat freely.

You board together. The boat pushes off from shore.`,
                choices: [
                    { text: 'Continue', next: 'boat_damage' }
                ]
            },
            
            boat_damage: {
                text: `The journey is peaceful at first. Then, without warning, Khidr stands and begins tearing at the planks of the boat.

Wood splinters. Water seeps in.

The fishermen cry out in alarm, rushing to plug the hole. The boat is damaged, but still floats.

You stare at Khidr in shock. These men gave passage freely. They are poor. This boat is their livelihood.

Why would he do this?`,
                choices: [
                    { text: 'Say nothing. I promised patience.', next: 'boat_silence' },
                    { text: 'Why did you damage their boat? They showed us kindness!', next: 'boat_question', isQuestion: true }
                ]
            },
            
            boat_silence: {
                text: `You bite your tongue, though every fiber wants to speak.

Khidr meets your eyes. He sees your struggle, your restraint.

"Well done," he says quietly.

The boat limps to shore. You and Khidr disembark and continue your journey.`,
                choices: [
                    { text: 'Continue', next: 'village_arrival' }
                ]
            },
            
            boat_question: {
                text: `Khidr looks at you steadily.

"Did I not say you would lack patience with me?"

"These are poor men!" you protest. "They offered kindness, and you repay them with destruction?"

"You have broken your promise," Khidr says. "But I will continue, for now."

The boat reaches shore. You disembark in troubled silence.`,
                choices: [
                    { text: 'Continue', next: 'village_arrival' }
                ]
            },
            
            village_arrival: {
                text: `You travel inland and reach a small village as evening falls.

Children play in the streets. Their laughter echoes between clay houses.

Khidr watches them with an unreadable expression.

One boy runs past, his face bright with joy.

Khidr steps forward.`,
                choices: [
                    { text: 'Continue', next: 'boy_death' }
                ]
            },
            
            boy_death: {
                text: `What happens next is almost too quick to process.

Khidr strikes the boy. The child falls.

He does not rise.

Khidr has killed a child.

Horror floods through you.`,
                choices: [
                    { text: 'Keep silent, though it tears at your heart', next: 'boy_silence' },
                    { text: 'Have you killed an innocent soul?!', next: 'boy_question', isQuestion: true }
                ]
            },
            
            boy_silence: {
                text: `You cannot speak. Your throat is tight with grief and shock.

Khidr begins walking away from the village. You follow, numb.

The boy's laughter still echoes in your memory.

How can this be right? How can this be divine wisdom?

But you said you would trust. You said you would be patient.

You walk on in anguished silence.`,
                choices: [
                    { text: 'Continue', next: 'town_arrival' }
                ]
            },
            
            boy_question: {
                text: `"Have you killed an innocent soul?!" you cry out. "A child who had done no wrong?!"

Khidr stops walking.

"Did I not tell you that you would not have patience with me?"

"Patience?" Your voice breaks. "You have killed a child!"

"You have questioned me twice now, Moses," Khidr says. "If you question me once more, we must part ways."

The weight of his words hangs between you.`,
                choices: [
                    { text: 'Continue in silence', next: 'town_arrival' }
                ]
            },
            
            town_arrival: {
                text: `Days pass in heavy silence. You reach a wealthy town.

The houses are large, well-maintained. Well-dressed merchants hurry past without acknowledgment.

You and Khidr ask for food and shelter. Door after door closes.

"We have no room for wanderers."

The town is prosperous, but its people are stingy and inhospitable.

Finally, you sit hungry in an alley as evening falls.`,
                choices: [
                    { text: 'Continue', next: 'wall_repair' }
                ]
            },
            
            wall_repair: {
                text: `Khidr rises and walks to the edge of town where an old wall stands, crumbling and neglected.

Without a word, he begins repairing it. Stone by stone, he rebuilds the structure with care and precision.

You watch, exhausted and hungry.

These people refused you hospitality. They showed no kindness.

Yet Khidr labors for their benefit, asking nothing in return.

Why help those who would not help you?`,
                choices: [
                    { text: 'Stay silent. This is the last test.', next: 'wall_silence' },
                    { text: 'Why repair their wall? They gave us nothing!', next: 'wall_question', isQuestion: true }
                ]
            },
            
            wall_silence: {
                text: `You bite back your words. Your stomach growls. Your feet ache.

But you remain silent.

Khidr completes the wall and stands back, examining his work.

He turns to you with something like sadness in his eyes.

"You have done well to remain patient, Moses. But I see the questions burning within you."

"Come. It is time for us to part. But first, I will explain."`,
                choices: [
                    { text: 'Listen to the explanation', next: 'revelation_patient' }
                ]
            },
            
            wall_question: {
                text: `"Why repair their wall?" you demand. "They refused us food and shelter! If you must work, at least ask payment!"

Khidr sets down the stone he was holding.

"This is the third time you have questioned me, Moses."

"We must part ways now. But before we do, I will tell you the meaning of what you could not bear to witness in patience."`,
                choices: [
                    { text: 'Listen to the explanation', next: 'revelation_impatient' }
                ]
            },
            
            revelation_patient: {
                text: `Khidr speaks:

"The boat belonged to poor fishermen. But a tyrannical king patrols these waters, seizing every perfect vessel for his navy. By damaging the boat, I made it unfit for seizure. The fishermen will repair it and keep their livelihood.

The boy was destined to grow into a man of great evil. He would have driven his righteous parents to unbelief through his cruelty. God will grant them a better child, one who will be their comfort.

The wall conceals a treasure belonging to two orphan boys in this town. Their father was righteous. When they come of age, they will discover it and be provided for."

He places a hand on your shoulder.

"These were not my decisions, Moses. This is the knowledge of God, beyond human understanding."`,
                choices: [
                    { text: 'Reflect on the lesson', next: 'ending_patient' }
                ]
            },
            
            revelation_impatient: {
                text: `Khidr speaks:

"The boat belonged to poor fishermen. But a tyrannical king patrols these waters, seizing every perfect vessel. By damaging it, I saved their livelihood.

The boy was destined to become evil, driving his parents to unbelief. God will grant them a better child.

The wall conceals treasure for two orphan boys whose father was righteous. If it had fallen, the townspeople would have seized it."

He becomes firm but not unkind.

"These were not my decisions, Moses. This is the knowledge of God."

"You are a great prophet, wise and strong. But even you could not witness the divine will without demanding explanation."

"Patience is harder than knowledge, Moses. Remember this."`,
                choices: [
                    { text: 'Accept the lesson', next: 'ending_impatient' }
                ]
            },
            
            ending_patient: {
                text: `You stand in the fading light, overwhelmed.

Every act of seeming cruelty was mercy in disguise. Every inexplicable deed was divine wisdom beyond human sight.

You maintained patience longer than most could. Yet even you stumbled at the limits of human understanding.

Khidr's words echo in your mind: "This is the knowledge of God, beyond human understanding."

You are Moses, prophet and leader. But in this moment, you are simply a student, humbled before mysteries you cannot fully grasp.

And perhaps that is the greatest wisdom of all.

---

ENDING: The Patient Seeker

You maintained patience through the journey, learning the deepest lessons.`,
                choices: []
            },
            
            ending_impatient: {
                text: `You stand alone as Khidr disappears into the distance.

Every act of seeming cruelty was mercy in disguise. Every inexplicable deed was divine wisdom beyond human sight.

You are Moses, prophet and leader, beloved of God. Yet you could not witness these acts without demanding explanation. Your wisdom, great as it is, has limits.

Patience—true patience—is harder than knowledge.

Humility cuts deeper than any other lesson.

You will carry this teaching for the rest of your days.

---

ENDING: The Humbled Prophet

You questioned Khidr multiple times, breaking your promise of patience. Yet in this failure, you learned the deepest truth: human wisdom, no matter how great, cannot comprehend divine will without humility.`,
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
