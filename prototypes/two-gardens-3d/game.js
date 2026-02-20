// game.js - Main game controller for The Two Gardens

import { createWealthyMan, createHumbleCompanion, createBoastingPose, createRegretPose, createWarningGesture } from './characters.js';
import { createGardenEnvironment, createMeetingPlace } from './environments.js';
import { animateGardenTour, animateBoasting, animateWarning, animateDestruction, animateRegret, animateCameraTo, animateFadeTransition } from './animations.js';

// Game state
const gameState = {
    currentScene: 'loading',
    gratitudeMeter: 0, // -100 (arrogant) to 100 (grateful)
    choices: [],
    scene: null,
    camera: null,
    renderer: null,
    controls: {
        mouseDown: false,
        mouseX: 0,
        mouseY: 0
    }
};

// Initialize
window.addEventListener('DOMContentLoaded', () => {
    initGame();
});

function initGame() {
    // Show loading screen
    const loadingScreen = document.getElementById('loading-screen');
    const loadingProgress = document.querySelector('.loading-progress');
    
    // Simulate loading
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                showTitleScreen();
            }, 500);
        }
        loadingProgress.style.width = progress + '%';
    }, 200);
}

function showTitleScreen() {
    const titleScreen = document.getElementById('title-screen');
    titleScreen.style.display = 'flex';
    
    document.getElementById('start-button').addEventListener('click', () => {
        titleScreen.style.display = 'none';
        startGame();
    });
}

function startGame() {
    // Initialize Three.js
    const canvas = document.getElementById('game-canvas');
    gameState.scene = new THREE.Scene();
    gameState.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    gameState.renderer = new THREE.WebGLRenderer({ 
        canvas,
        antialias: true 
    });
    gameState.renderer.setSize(window.innerWidth, window.innerHeight);
    gameState.renderer.setClearColor(0x87ceeb); // Sky blue
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    gameState.scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffd700, 0.8);
    directionalLight.position.set(10, 20, 10);
    gameState.scene.add(directionalLight);
    
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(-10, 10, -10);
    gameState.scene.add(fillLight);
    
    // Camera controls
    setupCameraControls();
    
    // Show UI overlay
    document.getElementById('ui-overlay').style.display = 'block';
    updateGratitudeMeter();
    
    // Start first scene
    playScene1_Introduction();
    
    // Render loop
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    gameState.renderer.render(gameState.scene, gameState.camera);
}

function setupCameraControls() {
    const canvas = document.getElementById('game-canvas');
    
    // Mouse controls
    canvas.addEventListener('mousedown', (e) => {
        gameState.controls.mouseDown = true;
        gameState.controls.mouseX = e.clientX;
        gameState.controls.mouseY = e.clientY;
    });
    
    canvas.addEventListener('mouseup', () => {
        gameState.controls.mouseDown = false;
    });
    
    canvas.addEventListener('mousemove', (e) => {
        if (gameState.controls.mouseDown) {
            const deltaX = e.clientX - gameState.controls.mouseX;
            const deltaY = e.clientY - gameState.controls.mouseY;
            
            gameState.camera.rotation.y += deltaX * 0.005;
            gameState.camera.rotation.x += deltaY * 0.005;
            
            // Clamp vertical rotation
            gameState.camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, gameState.camera.rotation.x));
            
            gameState.controls.mouseX = e.clientX;
            gameState.controls.mouseY = e.clientY;
        }
    });
    
    // Touch controls
    canvas.addEventListener('touchstart', (e) => {
        if (e.touches.length > 0) {
            gameState.controls.mouseDown = true;
            gameState.controls.mouseX = e.touches[0].clientX;
            gameState.controls.mouseY = e.touches[0].clientY;
        }
    });
    
    canvas.addEventListener('touchend', () => {
        gameState.controls.mouseDown = false;
    });
    
    canvas.addEventListener('touchmove', (e) => {
        if (gameState.controls.mouseDown && e.touches.length > 0) {
            const deltaX = e.touches[0].clientX - gameState.controls.mouseX;
            const deltaY = e.touches[0].clientY - gameState.controls.mouseY;
            
            gameState.camera.rotation.y += deltaX * 0.005;
            gameState.camera.rotation.x += deltaY * 0.005;
            
            gameState.camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, gameState.camera.rotation.x));
            
            gameState.controls.mouseX = e.touches[0].clientX;
            gameState.controls.mouseY = e.touches[0].clientY;
        }
    });
}

function updateGratitudeMeter() {
    const fill = document.getElementById('gratitude-fill');
    const status = document.getElementById('gratitude-status');
    
    // Map -100 to 100 range to 0 to 100 percentage
    const percentage = ((gameState.gratitudeMeter + 100) / 200) * 100;
    fill.style.width = percentage + '%';
    
    // Update color and status
    fill.classList.remove('low', 'medium', 'high');
    if (gameState.gratitudeMeter < -30) {
        fill.classList.add('low');
        status.textContent = 'Arrogant';
    } else if (gameState.gratitudeMeter < 30) {
        fill.classList.add('medium');
        status.textContent = 'Uncertain';
    } else {
        fill.classList.add('high');
        status.textContent = 'Grateful';
    }
}

function showDialogue(speaker, text, choices = null) {
    const dialogueBox = document.getElementById('dialogue-box');
    const speakerName = document.getElementById('speaker-name');
    const dialogueText = document.getElementById('dialogue-text');
    const actionsDiv = document.getElementById('dialogue-actions');
    
    speakerName.textContent = speaker;
    dialogueText.textContent = text;
    actionsDiv.innerHTML = '';
    
    if (choices) {
        choices.forEach(choice => {
            const button = document.createElement('button');
            button.className = 'choice-button';
            if (choice.humble) button.classList.add('humble');
            button.textContent = choice.text;
            button.onclick = () => {
                dialogueBox.style.display = 'none';
                if (choice.gratitudeChange) {
                    gameState.gratitudeMeter += choice.gratitudeChange;
                    gameState.gratitudeMeter = Math.max(-100, Math.min(100, gameState.gratitudeMeter));
                    updateGratitudeMeter();
                }
                gameState.choices.push(choice.id);
                if (choice.callback) choice.callback();
            };
            actionsDiv.appendChild(button);
        });
    } else {
        const continueButton = document.createElement('button');
        continueButton.className = 'continue-button';
        continueButton.textContent = 'Continue';
        continueButton.onclick = () => {
            dialogueBox.style.display = 'none';
        };
        actionsDiv.appendChild(continueButton);
    }
    
    dialogueBox.style.display = 'block';
}

function showSceneTitle(title, duration = 3000) {
    const sceneTitle = document.getElementById('scene-title');
    const titleText = sceneTitle.querySelector('.scene-title-text');
    titleText.textContent = title;
    sceneTitle.style.display = 'block';
    
    setTimeout(() => {
        sceneTitle.style.display = 'none';
    }, duration);
}

function clearScene() {
    // Remove all objects except lights and camera
    const objectsToRemove = [];
    gameState.scene.traverse((object) => {
        if (object !== gameState.camera && !(object instanceof THREE.Light)) {
            objectsToRemove.push(object);
        }
    });
    objectsToRemove.forEach(object => {
        if (object.parent) object.parent.remove(object);
    });
}

// Scene 1: Introduction (18:32)
async function playScene1_Introduction() {
    gameState.currentScene = 'introduction';
    showSceneTitle('The Two Men');
    
    // Create flourishing garden
    const garden = createGardenEnvironment(THREE, true);
    gameState.scene.add(garden);
    
    // Create meeting place
    const meeting = createMeetingPlace(THREE);
    gameState.scene.add(meeting);
    
    // Create characters
    const wealthyMan = createWealthyMan(THREE);
    wealthyMan.position.set(-2, 0, 0);
    gameState.scene.add(wealthyMan);
    
    const humbleCompanion = createHumbleCompanion(THREE);
    humbleCompanion.position.set(2, 0, 0);
    gameState.scene.add(humbleCompanion);
    
    // Position camera
    gameState.camera.position.set(0, 2, 8);
    gameState.camera.lookAt(0, 1, 0);
    
    setTimeout(() => {
        showDialogue(
            'Narrator',
            'And present to them an example of two men: We granted to one of them two gardens of grapevines, and We bordered them with palm trees and placed between them fields of crops.',
            [{ text: 'Continue', callback: playScene2_GardenDescription }]
        );
    }, 3000);
}

// Scene 2: Garden Description (18:32-33)
async function playScene2_GardenDescription() {
    showSceneTitle('The Flourishing Gardens');
    
    await animateGardenTour(gameState.camera, 5000);
    
    setTimeout(() => {
        showDialogue(
            'Narrator',
            'Each of the two gardens produced its fruit and did not fall short thereof in anything. And We caused to gush forth within them a river.',
            [{ text: 'Continue', callback: playScene3_ArrogantBoast }]
        );
    }, 1000);
}

// Scene 3: Arrogant Boast (18:34-36)
async function playScene3_ArrogantBoast() {
    showSceneTitle('Pride and Arrogance');
    
    const wealthyMan = gameState.scene.children.find(c => c.userData.type === 'wealthy');
    if (wealthyMan) {
        createBoastingPose(wealthyMan);
        await animateBoasting(wealthyMan);
    }
    
    await animateCameraTo(gameState.camera, { x: -3, y: 2, z: 5 }, { x: -0.2, y: 0.5, z: 0 });
    
    setTimeout(() => {
        showDialogue(
            'Wealthy Man',
            '"I am greater than you in wealth and mightier in numbers of men."',
            [{ text: 'Continue', callback: () => {
                setTimeout(() => {
                    showDialogue(
                        'Wealthy Man',
                        '"I do not think that the Hour will ever come. But even if I should be brought back to my Lord, I will surely find better than this as a return."',
                        [{ text: 'Continue', callback: playScene4_FirstChoice }]
                    );
                }, 500);
            }}]
        );
    }, 1000);
}

// Scene 4: First Choice - Acknowledgment
function playScene4_FirstChoice() {
    showDialogue(
        'Your Thoughts',
        'As you survey your magnificent gardens, what do you feel?',
        [
            {
                id: 'boast',
                text: '"All this is mine by my own effort."',
                gratitudeChange: -20,
                callback: playScene5_CompanionWarning
            },
            {
                id: 'acknowledge',
                text: '"This is a blessing from Allah."',
                gratitudeChange: 20,
                humble: true,
                callback: playScene5_CompanionWarning
            }
        ]
    );
}

// Scene 5: Companion's Warning (18:37-38)
async function playScene5_CompanionWarning() {
    showSceneTitle('A Gentle Warning');
    
    const humbleCompanion = gameState.scene.children.find(c => c.userData.type === 'humble');
    if (humbleCompanion) {
        createWarningGesture(humbleCompanion);
        await animateWarning(humbleCompanion);
    }
    
    await animateCameraTo(gameState.camera, { x: 3, y: 2, z: 5 }, { x: -0.2, y: -0.5, z: 0 });
    
    setTimeout(() => {
        showDialogue(
            'Humble Companion',
            '"Do you disbelieve in He who created you from dust and then from a drop and then proportioned you as a man?"',
            [{ text: 'Continue', callback: () => {
                setTimeout(() => {
                    showDialogue(
                        'Humble Companion',
                        '"But as for me, He is Allah, my Lord, and I do not associate with my Lord anyone."',
                        [{ text: 'Continue', callback: playScene6_MaShaAllah }]
                    );
                }, 500);
            }}]
        );
    }, 1000);
}

// Scene 6: Ma sha Allah (18:39-41)
async function playScene6_MaShaAllah() {
    showSceneTitle('The Reminder');
    
    await animateCameraTo(gameState.camera, { x: 0, y: 2.5, z: 6 }, { x: -0.3, y: 0, z: 0 });
    
    setTimeout(() => {
        showDialogue(
            'Humble Companion',
            '"Why did you not say, when you entered your garden: \'Ma sha Allah, la quwwata illa billah\' (As God wills, there is no power except with Allah)?"',
            [{ text: 'Continue', callback: playScene7_SecondChoice }]
        );
    }, 1000);
}

// Scene 7: Second Choice - Response to Warning
function playScene7_SecondChoice() {
    showDialogue(
        'Your Response',
        'How do you respond to your companion\'s warning?',
        [
            {
                id: 'dismiss',
                text: '"You worry too much. I have earned this."',
                gratitudeChange: -25,
                callback: playScene8_CompanionWisdom
            },
            {
                id: 'consider',
                text: '"Perhaps you are right... Ma sha Allah."',
                gratitudeChange: 30,
                humble: true,
                callback: playScene8_CompanionWisdom
            }
        ]
    );
}

// Scene 8: Companion's Wisdom (18:39-41)
function playScene8_CompanionWisdom() {
    showDialogue(
        'Humble Companion',
        '"Although you see me less than you in wealth and children, it may be that my Lord will give me better than your garden and will send upon it a calamity from the sky, and it will become a smooth, dusty ground."',
        [{ text: 'Continue', callback: () => {
            setTimeout(() => {
                showDialogue(
                    'Humble Companion',
                    '"Or its water will become sunken into the earth, so you would never be able to seek it."',
                    [{ text: 'Continue', callback: playScene9_ThirdChoice }]
                );
            }, 500);
        }}]
    );
}

// Scene 9: Third Choice - Before Destruction
function playScene9_ThirdChoice() {
    showDialogue(
        'A Final Moment',
        'The night falls. Do you reflect on your companion\'s words?',
        [
            {
                id: 'refuse',
                text: '"My gardens are secure. Nothing can harm them."',
                gratitudeChange: -30,
                callback: playScene10_Destruction
            },
            {
                id: 'reflect',
                text: '"La quwwata illa billah... there is no power except with Allah."',
                gratitudeChange: 40,
                humble: true,
                callback: playScene10_Destruction
            }
        ]
    );
}

// Scene 10: Destruction (18:42)
async function playScene10_Destruction() {
    showSceneTitle('The Night of Devastation', 4000);
    
    await animateFadeTransition(() => {
        gameState.renderer.setClearColor(0x2d1f0f); // Dark sky
    });
    
    const garden = gameState.scene.children.find(c => c.userData.state === 'flourishing');
    if (garden) {
        await animateDestruction(garden, gameState.scene, THREE, 3000);
    }
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    await animateFadeTransition(() => {
        gameState.renderer.setClearColor(0x87ceeb); // Day sky again
    });
    
    setTimeout(() => {
        showDialogue(
            'Narrator',
            'And his fruits were encompassed by ruin, so he began to turn his hands about in dismay over what he had spent on it, while it had collapsed upon its trellises.',
            [{ text: 'Continue', callback: playScene11_Regret }]
        );
    }, 1000);
}

// Scene 11: Regret (18:42-43)
async function playScene11_Regret() {
    showSceneTitle('The Morning After');
    
    const wealthyMan = gameState.scene.children.find(c => c.userData.type === 'wealthy');
    if (wealthyMan) {
        createRegretPose(wealthyMan);
        await animateRegret(wealthyMan);
    }
    
    await animateCameraTo(gameState.camera, { x: -2, y: 1.5, z: 4 }, { x: -0.1, y: 0.3, z: 0 });
    
    setTimeout(() => {
        showDialogue(
            'Wealthy Man',
            '"Oh, I wish I had not associated with my Lord anyone!"',
            [{ text: 'Continue', callback: playScene12_NoHelp }]
        );
    }, 1000);
}

// Scene 12: No Help (18:43-44)
function playScene12_NoHelp() {
    showDialogue(
        'Narrator',
        'And there was for him no company to aid him other than Allah, nor could he defend himself. There the authority is entirely for Allah, the Truth. He is best in reward and best in consequence.',
        [{ text: 'Reflect', callback: determineEnding }]
    );
}

// Determine ending based on choices
function determineEnding() {
    let ending;
    
    if (gameState.gratitudeMeter >= 50) {
        ending = {
            title: 'The Path of Gratitude',
            text: 'Though you witnessed the destruction, your heart remained anchored in gratitude. You recognized that all blessings are from Allah, and this humility preserved your spirit even as the gardens fell.',
            verse: '"Ma sha Allah, la quwwata illa billah" - As Allah wills, there is no power except with Allah. Your acknowledgment brought peace to your heart.'
        };
    } else if (gameState.gratitudeMeter >= 0) {
        ending = {
            title: 'Late Awakening',
            text: 'Only when the gardens crumbled did you truly understand. The regret is bitter, but this painful lesson opened your eyes to the truth: all power belongs to Allah alone.',
            verse: '"Would that I had not associated anyone with my Lord" - Your regret is sincere, and sincere regret is the beginning of return.'
        };
    } else if (gameState.gratitudeMeter >= -50) {
        ending = {
            title: 'The Weight of Arrogance',
            text: 'Your pride blinded you until it was too late. The gardens you trusted in have turned to dust, and you are left grasping at what can never return. Yet even now, the door of repentance remains open.',
            verse: '"There the authority is entirely for Allah, the Truth" - He is the only protector, the only source of all that was and all that remains.'
        };
    } else {
        ending = {
            title: 'Deep Regret',
            text: 'You refused every warning, dismissed every sign, until devastation was complete. The gardens are gone, and all your boasting has turned to bitter lamentation. This is the consequence of denying the Source of all blessings.',
            verse: '"And there was for him no company to aid him other than Allah, nor could he defend himself" - In the end, only Allah remains.'
        };
    }
    
    showEnding(ending);
}

function showEnding(ending) {
    const restartOverlay = document.getElementById('restart-overlay');
    const endingTitle = document.getElementById('ending-title');
    const endingText = document.getElementById('ending-text');
    const endingVerse = document.getElementById('ending-verse');
    
    endingTitle.textContent = ending.title;
    endingText.textContent = ending.text;
    endingVerse.textContent = ending.verse;
    
    restartOverlay.style.display = 'flex';
    
    document.getElementById('restart-button').onclick = () => {
        restartOverlay.style.display = 'none';
        resetGame();
        startGame();
    };
}

function resetGame() {
    gameState.gratitudeMeter = 0;
    gameState.choices = [];
    gameState.currentScene = 'loading';
    clearScene();
    document.getElementById('ui-overlay').style.display = 'none';
}

// Handle window resize
window.addEventListener('resize', () => {
    if (gameState.camera && gameState.renderer) {
        gameState.camera.aspect = window.innerWidth / window.innerHeight;
        gameState.camera.updateProjectionMatrix();
        gameState.renderer.setSize(window.innerWidth, window.innerHeight);
    }
});
