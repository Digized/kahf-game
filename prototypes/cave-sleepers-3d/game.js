// Main Game Controller for Cave Sleepers
class CaveSleepersGame {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        
        this.believers = [];
        this.guards = [];
        this.townspeople = [];
        this.vendor = null;
        this.dog = null;
        
        this.faith = 3;
        this.maxFaith = 3;
        this.currentScene = 'start';
        this.animationTime = 0;
        this.animationProgress = 0;
        this.isAnimating = false;
        
        this.init();
    }
    
    init() {
        this.setupThreeJS();
        this.setupLighting();
        this.setupUI();
        this.setupTitleScreen();
        this.loadScene('start');
        this.animate();
        
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
        this.scene = new THREE.Scene();
        
        this.camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            0.5,
            1000
        );
        this.camera.position.set(0, 5, 10);
        
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: false
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        document.getElementById('canvas-container').appendChild(this.renderer.domElement);
        
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.08;
        this.controls.minDistance = 6;
        this.controls.maxDistance = 18;
        this.controls.maxPolarAngle = Math.PI / 2.2;
        this.controls.minPolarAngle = Math.PI / 8;
        this.controls.target.set(0, 1, 0);
        this.controls.enablePan = false;
        
        window.addEventListener('resize', () => this.onWindowResize(), false);
    }
    
    setupLighting() {
        const ambientLight = new THREE.AmbientLight(0xFFE8D0, 0.5);
        this.scene.add(ambientLight);
        
        const dirLight = new THREE.DirectionalLight(0xFFD89B, 0.9);
        dirLight.position.set(5, 10, 5);
        dirLight.castShadow = true;
        dirLight.shadow.mapSize.width = 1024;
        dirLight.shadow.mapSize.height = 1024;
        this.scene.add(dirLight);
        
        const fillLight = new THREE.DirectionalLight(0xB8A890, 0.3);
        fillLight.position.set(-5, 5, -5);
        this.scene.add(fillLight);
    }
    
    setupUI() {
        this.updateFaithMeter();
        
        const restartBtn = document.getElementById('restart-btn');
        if (restartBtn) {
            restartBtn.addEventListener('click', () => {
                this.faith = this.maxFaith;
                this.currentScene = 'start';
                this.loadScene('start');
                restartBtn.style.display = 'none';
            });
        }
    }
    
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    updateFaithMeter() {
        const faithFill = document.getElementById('faith-fill');
        const faithCount = document.getElementById('faith-count');
        
        if (faithFill && faithCount) {
            const percentage = (this.faith / this.maxFaith) * 100;
            faithFill.style.width = percentage + '%';
            faithCount.textContent = `${this.faith} / ${this.maxFaith}`;
            
            faithFill.classList.remove('medium', 'low');
            if (this.faith === 2) faithFill.classList.add('medium');
            if (this.faith <= 1) faithFill.classList.add('low');
        }
    }
    
    loadScene(sceneKey) {
        this.currentScene = sceneKey;
        const sceneData = this.getSceneData(sceneKey);
        
        if (!sceneData) {
            console.error('Scene not found:', sceneKey);
            return;
        }
        
        // Update story text
        const storyText = document.getElementById('story-text');
        if (storyText) {
            storyText.innerHTML = sceneData.text.split('\n\n').map(p => `<p>${p}</p>`).join('');
        }
        
        // Update choices
        this.renderChoices(sceneData.choices || []);
        
        // Load 3D environment
        if (sceneData.environment) {
            this.loadEnvironment(sceneData.environment);
        }
        
        // Load characters
        if (sceneData.characters) {
            this.loadCharacters(sceneData.characters);
        }
        
        // Trigger animation
        if (sceneData.animation) {
            this.triggerAnimation(sceneData.animation);
        }
        
        // Camera position
        if (sceneData.camera) {
            this.setCameraPosition(sceneData.camera);
        }
    }
    
    renderChoices(choices) {
        const choicesContainer = document.getElementById('choices-container');
        if (!choicesContainer) return;
        
        choicesContainer.innerHTML = '';
        
        choices.forEach(choice => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.textContent = choice.text;
            
            if (choice.costsFaith) {
                btn.classList.add('question');
            }
            
            btn.addEventListener('click', () => {
                if (choice.costsFaith && this.faith > 0) {
                    this.faith--;
                    this.updateFaithMeter();
                }
                
                if (choice.next) {
                    this.loadScene(choice.next);
                }
            });
            
            choicesContainer.appendChild(btn);
        });
    }
    
    loadEnvironment(envType) {
        switch(envType) {
            case 'ancient_city':
                EnvironmentFactory.createAncientCity(this.scene);
                break;
            case 'cave':
                EnvironmentFactory.createCaveInterior(this.scene);
                break;
            case 'future_city':
                EnvironmentFactory.createFutureCity(this.scene);
                break;
        }
    }
    
    loadCharacters(charConfig) {
        // Clear existing characters
        this.believers.forEach(b => this.scene.remove(b));
        this.guards.forEach(g => this.scene.remove(g));
        this.townspeople.forEach(t => this.scene.remove(t));
        if (this.vendor) this.scene.remove(this.vendor);
        if (this.dog) this.scene.remove(this.dog);
        
        this.believers = [];
        this.guards = [];
        this.townspeople = [];
        this.vendor = null;
        this.dog = null;
        
        // Create believers
        if (charConfig.believers) {
            for (let i = 0; i < charConfig.believers; i++) {
                const believer = CharacterFactory.createBeliever(i);
                believer.position.x = -2 + i * 1.2;
                believer.position.z = 0;
                this.believers.push(believer);
                this.scene.add(believer);
            }
        }
        
        // Create guards
        if (charConfig.guards) {
            for (let i = 0; i < charConfig.guards; i++) {
                const guard = CharacterFactory.createGuard();
                guard.position.x = -3 + i * 2.5;
                guard.position.z = -6;
                guard.rotation.y = 0;
                this.guards.push(guard);
                this.scene.add(guard);
            }
        }
        
        // Create townspeople
        if (charConfig.townspeople) {
            for (let i = 0; i < charConfig.townspeople; i++) {
                const person = CharacterFactory.createTownsperson(i);
                this.townspeople.push(person);
                this.scene.add(person);
            }
        }
        
        // Create vendor
        if (charConfig.vendor) {
            this.vendor = CharacterFactory.createVendor();
            this.vendor.position.set(-1, 0, -1);
            this.scene.add(this.vendor);
        }
        
        // Create dog
        if (charConfig.dog) {
            this.dog = CharacterFactory.createDog();
            this.dog.position.set(1.5, 0, 1);
            this.scene.add(this.dog);
        }
    }
    
    triggerAnimation(animType) {
        this.isAnimating = true;
        this.animationProgress = 0;
        this.currentAnimation = animType;
    }
    
    setCameraPosition(camConfig) {
        if (camConfig.position) {
            this.camera.position.set(
                camConfig.position.x,
                camConfig.position.y,
                camConfig.position.z
            );
        }
        if (camConfig.lookAt) {
            this.controls.target.set(
                camConfig.lookAt.x,
                camConfig.lookAt.y,
                camConfig.lookAt.z
            );
        }
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        this.animationTime += 0.016;
        
        // Update controls
        this.controls.update();
        
        // Animate environment
        EnvironmentFactory.animateEnvironment(this.scene, this.animationTime);
        
        // Character idle animations
        this.believers.forEach(b => CharacterFactory.animateIdle(b, this.animationTime));
        this.guards.forEach(g => CharacterFactory.animateIdle(g, this.animationTime));
        this.townspeople.forEach(t => CharacterFactory.animateIdle(t, this.animationTime));
        if (this.vendor) CharacterFactory.animateIdle(this.vendor, this.animationTime);
        if (this.dog) CharacterFactory.animateIdle(this.dog, this.animationTime);
        
        // Scene-specific animations
        if (this.isAnimating && this.currentAnimation) {
            this.animationProgress += 0.008;
            
            switch(this.currentAnimation) {
                case 'fleeing':
                    AnimationController.fleeing(this.believers, this.animationProgress);
                    break;
                case 'entering_cave':
                    AnimationController.enteringCave(this.believers, this.animationProgress);
                    break;
                case 'sleeping':
                    AnimationController.sleeping(this.believers, this.dog, this.animationProgress);
                    break;
                case 'time_passage':
                    AnimationController.timePassage(this.scene, this.animationProgress);
                    break;
                case 'waking':
                    AnimationController.waking(this.believers, this.animationProgress);
                    break;
                case 'discovery':
                    AnimationController.discovery(this.townspeople, this.believers, this.animationProgress);
                    break;
                case 'currency':
                    AnimationController.currencyScene(this.believers[0], this.vendor, this.animationProgress);
                    break;
                case 'prayer':
                    AnimationController.prayer(this.believers, this.animationProgress);
                    break;
            }
            
            if (this.animationProgress >= 1) {
                this.isAnimating = false;
                this.currentAnimation = null;
            }
        }
        
        this.renderer.render(this.scene, this.camera);
    }
    
    // Scene data with Quranic alignment
    getSceneData(sceneKey) {
        const scenes = {
            start: {
                text: `You are one of the youth of the city.\n\nThe emperor demands worship of idols. Stone faces that see nothing. Altars that demand everything.\n\nYour companions have refused. You have refused.\n\nThe city is no longer safe.`,
                choices: [
                    { text: 'Gather with the believers', next: 'gathering' }
                ],
                environment: 'ancient_city',
                characters: { believers: 5, guards: 3 },
                camera: { position: { x: 0, y: 5, z: 10 }, lookAt: { x: 0, y: 1, z: 0 } }
            },
            
            gathering: {
                text: `Seven of you meet in secret — young believers, hearts firm despite the danger.\n\n"They're arresting anyone who refuses to bow," one says. "The persecution grows worse."\n\nAnother speaks: "There's a cave in the hills. We could seek refuge there."\n\nLeaving means abandoning everything. Staying means compromise or death.`,
                choices: [
                    { text: 'We flee together. Our faith matters more than comfort.', next: 'prayer_before_flight' },
                    { text: 'Perhaps we can negotiate with the authorities?', next: 'no_negotiation', costsFaith: true }
                ],
                environment: 'ancient_city',
                characters: { believers: 5, guards: 3 },
                camera: { position: { x: 2, y: 4, z: 8 }, lookAt: { x: 0, y: 1, z: 0 } }
            },
            
            no_negotiation: {
                text: `One of your companions — his name is Yamlikha — shakes his head firmly.\n\n"There is no negotiating with empire. They want our souls, not our taxes. If we stay, we die. Or worse — we become like them."\n\nThe truth is clear. Compromise is not an option.`,
                choices: [
                    { text: 'You are right. We must leave.', next: 'prayer_before_flight' }
                ],
                environment: 'ancient_city',
                characters: { believers: 5, guards: 3 }
            },
            
            prayer_before_flight: {
                text: `Before you flee, you stand together and raise your hands in prayer.\n\n<em>"Our Lord, grant us mercy from Yourself, and provide for us right guidance in our affair."</em> (18:10)\n\nYour voices are quiet but certain. Whatever comes next, you face it together.`,
                choices: [
                    { text: 'Flee the city', next: 'fleeing_city' }
                ],
                environment: 'ancient_city',
                characters: { believers: 5 },
                animation: 'prayer',
                camera: { position: { x: 0, y: 3, z: 8 }, lookAt: { x: 0, y: 1, z: 0 } }
            },
            
            fleeing_city: {
                text: `You slip out before dawn, taking only what you can carry.\n\nThe city gates are watched, but the shepherd paths are not. You move quickly, fear and faith driving every step.\n\nBehind you, the city fades. Ahead, the hills offer shelter.`,
                choices: [
                    { text: 'Continue to the cave', next: 'finding_cave' }
                ],
                environment: 'ancient_city',
                characters: { believers: 5, guards: 2 },
                animation: 'fleeing',
                camera: { position: { x: 0, y: 4, z: 12 }, lookAt: { x: 0, y: 1, z: 2 } }
            },
            
            finding_cave: {
                text: `By midday, you reach the cave. It is dark, cool, hidden by overgrowth.\n\nSafe.\n\nA stray dog follows you inside — perhaps it too seeks refuge.`,
                choices: [
                    { text: 'Enter the cave', next: 'entering_cave' }
                ],
                environment: 'cave',
                characters: { believers: 5, dog: true },
                camera: { position: { x: 0, y: 3, z: 12 }, lookAt: { x: 0, y: 1, z: 0 } }
            },
            
            entering_cave: {
                text: `Inside, the air is still. The sunlight barely reaches past the entrance.\n\nYou sit together. Someone lights a small fire. The dog curls up near the warmth.\n\nExhaustion overtakes you. The fear, the flight, the uncertainty — it all weighs heavy.\n\nYou lie down on the stone floor, surrounded by your companions.`,
                choices: [
                    { text: 'Rest...', next: 'divine_sleep' }
                ],
                environment: 'cave',
                characters: { believers: 5, dog: true },
                animation: 'entering_cave',
                camera: { position: { x: 0, y: 4, z: 10 }, lookAt: { x: 0, y: 1, z: 0 } }
            },
            
            divine_sleep: {
                text: `And God sealed their ears in the cave for years. (18:11)\n\nYou sleep — not the sleep of ordinary rest, but a divine preservation. Your breathing slows. The world outside continues, unaware.\n\nEmpires rise and fall. Tyrants die and are forgotten. Generations pass.\n\nAnd you sleep, protected by the One who created time itself.`,
                choices: [
                    { text: '...', next: 'time_passage' }
                ],
                environment: 'cave',
                characters: { believers: 5, dog: true },
                animation: 'sleeping',
                camera: { position: { x: 0, y: 6, z: 8 }, lookAt: { x: 0, y: 0, z: 0 } }
            },
            
            time_passage: {
                text: `Three hundred years pass. Solar years. (18:25)\n\nThe emperor you fled is dust. The idols are ruins. The city has transformed.\n\nBut you remain, suspended between eras, a sign waiting to be revealed.`,
                choices: [
                    { text: 'Centuries later...', next: 'waking' }
                ],
                environment: 'cave',
                characters: { believers: 5, dog: true },
                animation: 'time_passage',
                camera: { position: { x: 0, y: 6, z: 8 }, lookAt: { x: 0, y: 0, z: 0 } }
            },
            
            waking: {
                text: `You wake suddenly.\n\nYour companions stir, groaning, stretching. The dog yawns.\n\n"How long did we sleep?" someone asks. "A day? Two?"\n\nYour stomach growls. You feel rested, but disoriented.`,
                choices: [
                    { text: 'Check the cave entrance', next: 'confusion_about_time' }
                ],
                environment: 'cave',
                characters: { believers: 5, dog: true },
                animation: 'waking',
                camera: { position: { x: 0, y: 4, z: 10 }, lookAt: { x: 0, y: 1, z: 0 } }
            },
            
            confusion_about_time: {
                text: `You move to the entrance. Sunlight filters through — it looks like morning.\n\n"How long have we stayed?" They were disputing among themselves about their affair. (18:21)\n\nOne says: "A day, or part of a day."\n\nAnother shakes his head: "No, longer. I feel like I haven't eaten in ages."\n\nYamlikha speaks: "Your Lord knows best how long you have stayed. We should send someone to the city for food."`,
                choices: [
                    { text: 'I will go to the city', next: 'volunteer_mission' },
                    { text: 'Yamlikha should go — he knows the markets', next: 'yamlikha_mission' }
                ],
                environment: 'cave',
                characters: { believers: 5, dog: true },
                camera: { position: { x: 0, y: 3, z: 8 }, lookAt: { x: 0, y: 1, z: 0 } }
            },
            
            volunteer_mission: {
                text: `"I'll go," you say.\n\nYamlikha presses silver coins into your palm. Old currency, stamped with the tyrant's face.\n\n"Be cautious. Let him look for which food is purest, and let him bring you provision from it. And let him be careful, and let no one be aware of you." (18:19)`,
                choices: [
                    { text: 'Walk toward the city', next: 'approaching_city' }
                ],
                environment: 'cave',
                characters: { believers: 5 },
                camera: { position: { x: 0, y: 3, z: 8 }, lookAt: { x: 0, y: 1, z: 0 } }
            },
            
            yamlikha_mission: {
                text: `Yamlikha nods. "I'll be careful."\n\nHe takes the silver coins and wraps his cloak tight.\n\n"Let him look for which food is purest, and let him bring you provision from it. And let him be careful, and let no one be aware of you." (18:19)\n\nYou watch him leave, his silhouette fading into the morning light.`,
                choices: [
                    { text: 'Wait in the cave', next: 'waiting_anxiously' }
                ],
                environment: 'cave',
                characters: { believers: 4, dog: true },
                camera: { position: { x: 0, y: 3, z: 8 }, lookAt: { x: 0, y: 1, z: 0 } }
            },
            
            approaching_city: {
                text: `The walk takes longer than you remember.\n\nAs you crest the final hill, you stop.\n\nThe city is... wrong.\n\nThe walls are weathered beyond recognition. The temple of idols is a ruin. There are new buildings, new towers. A mosque rises where the tyrant's palace once stood.\n\nYour heart pounds. How long were we asleep?`,
                choices: [
                    { text: 'Enter the city gates', next: 'currency_shock' },
                    { text: 'Turn back — something is very wrong', next: 'early_return', costsFaith: true }
                ],
                environment: 'future_city',
                characters: { believers: 1, townspeople: 4 },
                camera: { position: { x: 8, y: 5, z: 10 }, lookAt: { x: 0, y: 1, z: 0 } }
            },
            
            currency_shock: {
                text: `You approach a baker's stall, trying to appear calm.\n\n"Bread, please." You hold out a silver coin.\n\nThe vendor takes it, frowns, then stares.\n\n"Where did you get this?"\n\n"I... it's silver, isn't it?"\n\n"It's ancient," he breathes. "From before the awakening. Before the city turned to God. This coin is three hundred years old."`,
                choices: [
                    { text: '"How long ago was that?"', next: 'revelation_of_time' }
                ],
                environment: 'future_city',
                characters: { believers: 1, vendor: true, townspeople: 3 },
                animation: 'currency',
                camera: { position: { x: 3, y: 4, z: 8 }, lookAt: { x: -1, y: 1, z: -1 } }
            },
            
            revelation_of_time: {
                text: `"Three hundred years," the baker repeats, louder now.\n\nPeople are gathering. Staring.\n\n"The sleepers," someone whispers. "The story is true. They're waking up."\n\nYou stumble backward. Three. Hundred. Years.\n\nYour parents are dust. The tyrant is forgotten. Everyone you knew is gone.`,
                choices: [
                    { text: 'Run back to the cave', next: 'return_with_news' },
                    { text: 'Stay and listen to the crowd', next: 'crowd_reaction', costsFaith: true }
                ],
                environment: 'future_city',
                characters: { believers: 1, vendor: true, townspeople: 5 },
                camera: { position: { x: 0, y: 4, z: 10 }, lookAt: { x: 0, y: 1, z: 0 } }
            },
            
            waiting_anxiously: {
                text: `Hours pass. Then, finally — running footsteps.\n\nYamlikha bursts into the cave, wild-eyed.\n\n"We need to leave. Now."\n\n"What happened?"\n\nHe's shaking. "The city — it's not our city. The coin I used — they said it was ancient. They're calling us 'sleepers.' Coming to find us."`,
                choices: [
                    { text: 'How long were we asleep?', next: 'yamlikha_reveals' }
                ],
                environment: 'cave',
                characters: { believers: 5, dog: true },
                camera: { position: { x: 0, y: 3, z: 8 }, lookAt: { x: 0, y: 1, z: 0 } }
            },
            
            yamlikha_reveals: {
                text: `"Three hundred years," Yamlikha whispers.\n\nThe words hang in the air, impossible.\n\nOne of your companions speaks: "Everyone we loved is dead."\n\nAnother: "But we're alive. God kept us alive."\n\nThe youngest starts crying.\n\nOutside, you hear voices approaching — searchers.`,
                choices: [
                    { text: 'We face this together', next: 'choose_emergence' },
                    { text: 'We hide deeper in the cave', next: 'choose_hiding', costsFaith: true }
                ],
                environment: 'cave',
                characters: { believers: 5, dog: true },
                camera: { position: { x: 0, y: 3, z: 8 }, lookAt: { x: 0, y: 1, z: 0 } }
            },
            
            return_with_news: {
                text: `You run back to the cave, lungs burning.\n\nYour companions look up as you enter.\n\n"What happened? Where's the food?"\n\nYou collapse, gasping. "We slept. We slept for centuries."\n\nThe silence is absolute.\n\nThen, slowly, they understand. The world they knew is gone.`,
                choices: [
                    { text: 'We stay hidden here', next: 'choose_hiding', costsFaith: true },
                    { text: 'We are a sign from God — we must bear witness', next: 'choose_emergence' }
                ],
                environment: 'cave',
                characters: { believers: 5, dog: true },
                camera: { position: { x: 0, y: 3, z: 8 }, lookAt: { x: 0, y: 1, z: 0 } }
            },
            
            crowd_reaction: {
                text: `You stay, frozen by shock and curiosity.\n\nThe crowd grows. They're not hostile — they're awed.\n\n"You fled the tyrant," an old scholar says. "God preserved you. You're proof — proof that faith outlasts empires."\n\nSomeone reaches for your hand. "Bless us. You've seen both worlds."\n\nThis is overwhelming.`,
                choices: [
                    { text: 'Ask them to take you back to the cave', next: 'crowd_follows' }
                ],
                environment: 'future_city',
                characters: { believers: 1, townspeople: 6 },
                camera: { position: { x: 0, y: 4, z: 12 }, lookAt: { x: 0, y: 1, z: 0 } }
            },
            
            crowd_follows: {
                text: `"Take me back to the cave," you manage to say. "My companions..."\n\n"We'll come with you," the scholar insists. "This is a sign. The people must know."\n\nYou try to protest, but they're already moving — a tide of reverence and curiosity.\n\nYou lead them to the hills, dread growing with each step.`,
                choices: [
                    { text: 'Approach the cave with the crowd', next: 'discovery_scene' }
                ],
                environment: 'cave',
                characters: { believers: 5, townspeople: 6, dog: true },
                animation: 'discovery',
                camera: { position: { x: 0, y: 6, z: 15 }, lookAt: { x: 0, y: 1, z: 0 } }
            },
            
            early_return: {
                text: `Fear overtakes you. This is too much. Too strange.\n\nYou turn and run back to the cave without entering the city.\n\nWhen you arrive, breathless, your companions look up.\n\n"What happened?"\n\n"The city... it's wrong. Changed. We need to hide."\n\nBut hide from what? From when?`,
                choices: [
                    { text: 'We stay in the cave, away from this strange world', next: 'ending_fearful_isolation' }
                ],
                environment: 'cave',
                characters: { believers: 5, dog: true },
                camera: { position: { x: 0, y: 3, z: 8 }, lookAt: { x: 0, y: 1, z: 0 } }
            },
            
            discovery_scene: {
                text: `The crowd reaches the cave entrance.\n\nYour companions emerge, blinking in sunlight, confused.\n\n"What's happening?" Yamlikha asks.\n\nThe scholar steps forward, tears streaming. "You are the Sleepers. The faithful who fled tyranny. God preserved you across three centuries as a sign."\n\nAnd thus We made them known to the people, that they might know that the promise of God is true. (18:21)`,
                choices: [
                    { text: 'Accept what we have become', next: 'ending_sign' },
                    { text: 'Reject this and retreat into the cave', next: 'ending_rejection', costsFaith: true }
                ],
                environment: 'cave',
                characters: { believers: 5, townspeople: 7, dog: true },
                animation: 'discovery',
                camera: { position: { x: 0, y: 6, z: 15 }, lookAt: { x: 0, y: 1, z: 0 } }
            },
            
            choose_emergence: {
                text: `"We face this," you say. "Whatever's out there — it's the world God preserved us for."\n\nYamlikha looks uncertain, but nods.\n\nOne by one, your companions stand.\n\nYou hear voices approaching. Not soldiers — people. Curious, reverent.\n\n"Let them come," you say.\n\nYou step toward the light.`,
                choices: [
                    { text: 'Step into the new world', next: 'ending_faith_witness' }
                ],
                environment: 'cave',
                characters: { believers: 5, dog: true },
                camera: { position: { x: 0, y: 3, z: 8 }, lookAt: { x: 0, y: 1, z: 0 } }
            },
            
            choose_hiding: {
                text: `"We stay," you say. "This world... it's not ours. We don't belong here."\n\nYamlikha nods slowly. The others gather closer.\n\nYou move deeper into the cave, away from the voices, away from the light.\n\nThe darkness is familiar. Safe.\n\nBut is safety the same as purpose?`,
                choices: [
                    { text: 'Settle in the shadows', next: 'ending_hidden' }
                ],
                environment: 'cave',
                characters: { believers: 5, dog: true },
                camera: { position: { x: 0, y: 2, z: 6 }, lookAt: { x: 0, y: 1, z: 0 } }
            },
            
            // ═══════════════════════════════════════
            // ENDINGS
            // ═══════════════════════════════════════
            
            ending_sign: {
                text: `You stand among the crowd, strange and ancient and alive.\n\nThey ask questions: What was the tyrant like? How did you keep faith? What did you see in your sleep?\n\nYou answer what you can.\n\nThey build a structure over the cave. Debates rage: "How many were they? Some will say they were three, their dog the fourth. Some will say five, their dog the sixth, guessing at the unseen. Some will say seven, and their dog the eighth." (18:22)\n\nYour Lord knows best concerning them. (18:22)\n\nYou became a sign — proof that faith outlasts empires, that God's promise is true, that time itself bends to divine will.\n\n✦ You witnessed the preservation of faith across centuries ✦`,
                choices: [],
                environment: 'future_city',
                characters: { believers: 5, townspeople: 8, dog: true },
                camera: { position: { x: 0, y: 5, z: 12 }, lookAt: { x: 0, y: 1, z: 0 } }
            },
            
            ending_faith_witness: {
                text: `You step out of the cave together into the sunlight.\n\nThe world is overwhelming — sounds, colors, people, change. But you face it.\n\nScholars come to hear your story. Children stare wide-eyed. Pilgrims touch your hands.\n\nYou are no longer who you were. You are witnesses now — to faith that survives empire, to God's preservation, to the strangeness of time.\n\nYou don't fully belong to this era, but you make space in it.\n\nFaith did not mean hiding — it meant bearing witness.\n\n✦ You chose to live in the new world ✦`,
                choices: [],
                environment: 'future_city',
                characters: { believers: 5, townspeople: 6, dog: true },
                camera: { position: { x: 0, y: 5, z: 12 }, lookAt: { x: 0, y: 1, z: 0 } }
            },
            
            ending_hidden: {
                text: `You stay in the cave, deeper than before.\n\nDays pass — or what you think are days. Time feels meaningless now.\n\nYou pray together. Eat sparingly. Speak less and less.\n\nOutside, the world moves on. Inside, you are suspended — no longer of the past, refusing the present.\n\nOne by one, your companions fall into a sleep deeper than before.\n\nThe cave became both sanctuary and tomb.\n\n✦ You chose safety over witness ✦`,
                choices: [],
                environment: 'cave',
                characters: { believers: 5, dog: true },
                camera: { position: { x: 0, y: 2, z: 6 }, lookAt: { x: 0, y: 0, z: 0 } }
            },
            
            ending_fearful_isolation: {
                text: `You convince them to flee deeper into the cave.\n\nThe tunnels are darker, colder, away from any entrance.\n\nYou huddle there, eating the last scraps, whispering prayers in the dark.\n\nNo one comes looking. Or maybe they do, and you're too deep to hear.\n\nTime becomes meaningless. You lose track of who is speaking. Who is sleeping. Who has stopped breathing.\n\nThe darkness is total.\n\nFear decided for you.\n\n✦ You were preserved, but never revealed ✦`,
                choices: [],
                environment: 'cave',
                characters: { believers: 5, dog: true },
                camera: { position: { x: 0, y: 1, z: 4 }, lookAt: { x: 0, y: 0, z: 0 } }
            },
            
            ending_rejection: {
                text: `"No," you say. "This is too much."\n\nYou turn back to the cave. Your companions follow.\n\nThe crowd tries to stop you — "Wait! Stay! Teach us!" — but you push past them.\n\nInside, you collapse.\n\n"We're not signs," you say bitterly. "We're just... displaced."\n\nYamlikha puts a hand on your shoulder. "Maybe that's still a lesson."\n\nYou stay in the cave. People come to the entrance, but you don't emerge.\n\nEventually, you stop hearing voices.\n\nEventually, you sleep again.\n\nThe world wanted a story. You wanted rest.\n\n✦ You refused to be a miracle ✦`,
                choices: [],
                environment: 'cave',
                characters: { believers: 5, dog: true },
                camera: { position: { x: 0, y: 3, z: 7 }, lookAt: { x: 0, y: 1, z: 0 } }
            }
        };
        
        // Show restart button for endings
        if (sceneKey.startsWith('ending_')) {
            setTimeout(() => {
                document.getElementById('restart-btn').style.display = 'block';
            }, 2000);
        }
        
        return scenes[sceneKey];
    }
}

// Initialize game when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
    new CaveSleepersGame();
});
