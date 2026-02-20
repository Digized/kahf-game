// animations.js - Animation sequences for The Two Gardens

export function animateGardenTour(camera, duration = 5000) {
    return new Promise((resolve) => {
        const startPos = { x: camera.position.x, y: camera.position.y, z: camera.position.z };
        const startRot = { x: camera.rotation.x, y: camera.rotation.y, z: camera.rotation.z };
        
        const endPos = { x: -8, y: 3, z: 8 };
        const endRot = { x: -0.3, y: -0.8, z: 0 };
        
        const startTime = Date.now();
        
        function animate() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeInOutCubic(progress);
            
            camera.position.x = startPos.x + (endPos.x - startPos.x) * eased;
            camera.position.y = startPos.y + (endPos.y - startPos.y) * eased;
            camera.position.z = startPos.z + (endPos.z - startPos.z) * eased;
            
            camera.rotation.x = startRot.x + (endRot.x - startRot.x) * eased;
            camera.rotation.y = startRot.y + (endRot.y - startRot.y) * eased;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                resolve();
            }
        }
        
        animate();
    });
}

export function animateBoasting(character, duration = 2000) {
    return new Promise((resolve) => {
        if (character.userData.type !== 'wealthy') {
            resolve();
            return;
        }
        
        const startTime = Date.now();
        const startY = character.position.y;
        
        function animate() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Bob up and down
            const bob = Math.sin(progress * Math.PI * 4) * 0.2;
            character.position.y = startY + bob;
            
            // Rotate slowly
            character.rotation.y += 0.02;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                character.position.y = startY;
                resolve();
            }
        }
        
        animate();
    });
}

export function animateWarning(character, duration = 2000) {
    return new Promise((resolve) => {
        if (character.userData.type !== 'humble') {
            resolve();
            return;
        }
        
        const startTime = Date.now();
        const rightArm = character.children.find(c => 
            c.position.x > 0 && 
            c.geometry?.type === 'CylinderGeometry' && 
            c.position.y > 0.5
        );
        
        if (!rightArm) {
            resolve();
            return;
        }
        
        const startRotZ = rightArm.rotation.z;
        const targetRotZ = -Math.PI / 2.5;
        const startPosY = rightArm.position.y;
        const targetPosY = 1.0;
        
        function animate() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeInOutCubic(progress);
            
            rightArm.rotation.z = startRotZ + (targetRotZ - startRotZ) * eased;
            rightArm.position.y = startPosY + (targetPosY - startPosY) * eased;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                resolve();
            }
        }
        
        animate();
    });
}

export function animateDestruction(environment, scene, THREE, duration = 3000) {
    return new Promise((resolve) => {
        const startTime = Date.now();
        
        // Collect all vegetation
        const vegetation = [];
        environment.traverse((child) => {
            if (child.isMesh && child.material) {
                vegetation.push({
                    mesh: child,
                    originalColor: child.material.color.clone(),
                    originalScale: child.scale.clone()
                });
            }
        });
        
        // Create falling particles
        const particles = [];
        for (let i = 0; i < 30; i++) {
            const particleGeometry = new THREE.SphereGeometry(0.1, 4, 4);
            const particleMaterial = new THREE.MeshBasicMaterial({ 
                color: 0x3d3020,
                transparent: true,
                opacity: 0.8
            });
            const particle = new THREE.Mesh(particleGeometry, particleMaterial);
            particle.position.set(
                (Math.random() - 0.5) * 20,
                3 + Math.random() * 2,
                (Math.random() - 0.5) * 20
            );
            particle.userData.velocity = {
                x: (Math.random() - 0.5) * 0.1,
                y: -0.05 - Math.random() * 0.05,
                z: (Math.random() - 0.5) * 0.1
            };
            scene.add(particle);
            particles.push(particle);
        }
        
        function animate() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeInOutCubic(progress);
            
            // Wither vegetation
            vegetation.forEach(item => {
                const deadColor = new THREE.Color(0x3d3020);
                item.mesh.material.color.lerpColors(item.originalColor, deadColor, eased);
                
                // Shrink and droop
                const shrink = 1 - (eased * 0.3);
                item.mesh.scale.set(
                    item.originalScale.x * shrink,
                    item.originalScale.y * shrink,
                    item.originalScale.z * shrink
                );
                
                // Tilt trees
                if (item.mesh.parent && item.mesh.parent.type === 'Group' && 
                    item.mesh.geometry?.type === 'CylinderGeometry' &&
                    item.mesh.position.y > 1) {
                    item.mesh.parent.rotation.z = eased * 0.3;
                }
            });
            
            // Animate particles
            particles.forEach(particle => {
                particle.position.x += particle.userData.velocity.x;
                particle.position.y += particle.userData.velocity.y;
                particle.position.z += particle.userData.velocity.z;
                
                if (particle.position.y < 0.1) {
                    particle.material.opacity *= 0.95;
                }
            });
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // Clean up particles
                particles.forEach(particle => {
                    scene.remove(particle);
                    particle.geometry.dispose();
                    particle.material.dispose();
                });
                resolve();
            }
        }
        
        animate();
    });
}

export function animateRegret(character, duration = 2000) {
    return new Promise((resolve) => {
        if (character.userData.type !== 'wealthy') {
            resolve();
            return;
        }
        
        const startTime = Date.now();
        const body = character.children.find(c => 
            c.geometry?.type === 'CylinderGeometry' && 
            c.position.y > 0.5
        );
        const head = character.children.find(c => 
            c.geometry?.type === 'SphereGeometry' && 
            c.position.y > 1
        );
        
        if (!body || !head) {
            resolve();
            return;
        }
        
        const startBodyRotX = body.rotation.x;
        const startHeadPosY = head.position.y;
        const startHeadRotX = head.rotation.x;
        
        const targetBodyRotX = Math.PI / 12;
        const targetHeadPosY = head.position.y - 0.1;
        const targetHeadRotX = Math.PI / 6;
        
        function animate() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeInOutCubic(progress);
            
            body.rotation.x = startBodyRotX + (targetBodyRotX - startBodyRotX) * eased;
            head.position.y = startHeadPosY + (targetHeadPosY - startHeadPosY) * eased;
            head.rotation.x = startHeadRotX + (targetHeadRotX - startHeadRotX) * eased;
            
            // Sway slightly
            const sway = Math.sin(elapsed * 0.003) * 0.05;
            character.rotation.z = sway;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                resolve();
            }
        }
        
        animate();
    });
}

export function animateCameraTo(camera, targetPos, targetRot, duration = 2000) {
    return new Promise((resolve) => {
        const startPos = { 
            x: camera.position.x, 
            y: camera.position.y, 
            z: camera.position.z 
        };
        const startRot = { 
            x: camera.rotation.x, 
            y: camera.rotation.y, 
            z: camera.rotation.z 
        };
        
        const startTime = Date.now();
        
        function animate() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeInOutCubic(progress);
            
            camera.position.x = startPos.x + (targetPos.x - startPos.x) * eased;
            camera.position.y = startPos.y + (targetPos.y - startPos.y) * eased;
            camera.position.z = startPos.z + (targetPos.z - startPos.z) * eased;
            
            camera.rotation.x = startRot.x + (targetRot.x - startRot.x) * eased;
            camera.rotation.y = startRot.y + (targetRot.y - startRot.y) * eased;
            camera.rotation.z = startRot.z + (targetRot.z - startRot.z) * eased;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                resolve();
            }
        }
        
        animate();
    });
}

export function animateFadeTransition(callback, duration = 1000) {
    return new Promise((resolve) => {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: black;
            opacity: 0;
            transition: opacity ${duration/2}ms ease;
            z-index: 999;
            pointer-events: none;
        `;
        document.body.appendChild(overlay);
        
        setTimeout(() => {
            overlay.style.opacity = '1';
        }, 10);
        
        setTimeout(() => {
            if (callback) callback();
            overlay.style.opacity = '0';
            
            setTimeout(() => {
                document.body.removeChild(overlay);
                resolve();
            }, duration / 2);
        }, duration / 2);
    });
}

// Easing function
function easeInOutCubic(t) {
    return t < 0.5 
        ? 4 * t * t * t 
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
