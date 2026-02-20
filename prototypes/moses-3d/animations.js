// Animation and Vision System for Moses & Khidr
class AnimationController {
    
    // Animate boat breaking
    static breakBoat(boat, onComplete) {
        if (!boat || boat.userData.damaged) {
            if (onComplete) onComplete();
            return;
        }
        
        const duration = 2000; // 2 seconds
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            if (progress < 0.3) {
                // Khidr raises arms
                // (already handled by character positioning)
            } else if (progress < 0.7) {
                // Boat shakes and cracks appear
                boat.rotation.z = Math.sin(progress * 30) * 0.08;
                
                if (progress > 0.5 && !boat.userData.cracked) {
                    // Add damage visuals
                    EnvironmentFactory.damageBoat(boat);
                    boat.userData.cracked = true;
                }
            } else {
                // Settle
                boat.rotation.z *= 0.9;
            }
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                boat.rotation.z = 0;
                if (onComplete) onComplete();
            }
        };
        
        animate();
    }
    
    // Animate child falling (handled sensitively - quick fade)
    static childFallSequence(scene, childCharacter, onComplete) {
        if (!childCharacter) {
            if (onComplete) onComplete();
            return;
        }
        
        const duration = 1500;
        const startTime = Date.now();
        const startY = childCharacter.position.y;
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            if (progress < 0.4) {
                // Child stumbles
                childCharacter.rotation.x = progress * Math.PI * 0.3;
            } else {
                // Fade out quickly
                childCharacter.traverse(obj => {
                    if (obj.material) {
                        obj.material.transparent = true;
                        obj.material.opacity = Math.max(0, 1 - ((progress - 0.4) / 0.6));
                    }
                });
                
                childCharacter.position.y = startY - ((progress - 0.4) * 0.5);
            }
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                scene.remove(childCharacter);
                if (onComplete) onComplete();
            }
        };
        
        animate();
    }
    
    // Animate wall repair
    static repairWall(wall, onComplete) {
        if (!wall || !wall.userData.damaged) {
            if (onComplete) onComplete();
            return;
        }
        
        const duration = 3000; // 3 seconds
        const startTime = Date.now();
        
        // Store original broken blocks
        const brokenBlocks = [];
        for (let i = 6; i < wall.children.length; i++) {
            brokenBlocks.push({
                mesh: wall.children[i],
                startY: wall.children[i].position.y,
                startRotZ: wall.children[i].rotation.z,
                startRotY: wall.children[i].rotation.y
            });
        }
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            if (progress < 0.6) {
                // Blocks gradually straighten and move into place
                brokenBlocks.forEach((block, i) => {
                    const blockProgress = Math.max(0, (progress - i * 0.1) / 0.6);
                    block.mesh.rotation.z = block.startRotZ * (1 - blockProgress);
                    block.mesh.rotation.y = block.startRotY * (1 - blockProgress);
                    block.mesh.position.y = block.startY - (blockProgress * 0.3);
                });
            } else if (progress < 0.8) {
                // Blocks fade and new cap appears
                brokenBlocks.forEach(block => {
                    block.mesh.traverse(obj => {
                        if (obj.material) {
                            obj.material.transparent = true;
                            obj.material.opacity = Math.max(0, 1 - ((progress - 0.6) / 0.2));
                        }
                    });
                });
                
                if (progress > 0.7 && wall.userData.damaged) {
                    EnvironmentFactory.repairWall(wall);
                }
            }
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                if (onComplete) onComplete();
            }
        };
        
        animate();
    }
    
    // Show vision overlay (revelation scenes)
    static showVision(scene, visionType, onComplete) {
        const visionGroup = new THREE.Group();
        visionGroup.position.set(0, 2, 0);
        
        // Create vision based on type
        switch (visionType) {
            case 'tyrant-boats':
                this.createTyrantVision(visionGroup);
                break;
            case 'boy-future':
                this.createBoyFutureVision(visionGroup);
                break;
            case 'treasure':
                this.createTreasureVision(visionGroup);
                break;
        }
        
        scene.add(visionGroup);
        
        // Fade in, hold, fade out
        const duration = 4000;
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            let opacity = 0;
            if (progress < 0.2) {
                // Fade in
                opacity = progress / 0.2;
            } else if (progress < 0.8) {
                // Hold
                opacity = 1;
            } else {
                // Fade out
                opacity = 1 - ((progress - 0.8) / 0.2);
            }
            
            // Rotate slowly
            visionGroup.rotation.y = progress * Math.PI * 0.3;
            
            // Apply opacity
            visionGroup.traverse(obj => {
                if (obj.material) {
                    obj.material.transparent = true;
                    obj.material.opacity = opacity * 0.7;
                }
            });
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                scene.remove(visionGroup);
                if (onComplete) onComplete();
            }
        };
        
        animate();
    }
    
    // Vision: Tyrant seizing boats
    static createTyrantVision(group) {
        // Small boat
        const boatGeo = new THREE.BoxGeometry(1.5, 0.3, 0.8);
        const boatMat = new THREE.MeshLambertMaterial({ 
            color: 0x5D4E37, 
            flatShading: true 
        });
        const boat = new THREE.Mesh(boatGeo, boatMat);
        boat.position.set(-2, 0, 0);
        group.add(boat);
        
        // Tyrant figure (imposing)
        const tyrant = new THREE.Group();
        
        // Body (large, dark armor)
        const bodyGeo = new THREE.CylinderGeometry(0.4, 0.5, 1.2, 6);
        const bodyMat = new THREE.MeshLambertMaterial({ 
            color: 0x1A1A1A, 
            flatShading: true 
        });
        const body = new THREE.Mesh(bodyGeo, bodyMat);
        body.position.y = 0.6;
        tyrant.add(body);
        
        // Head (helmeted)
        const headGeo = new THREE.BoxGeometry(0.35, 0.4, 0.35);
        const headMat = new THREE.MeshLambertMaterial({ 
            color: 0x2A2A2A, 
            flatShading: true 
        });
        const head = new THREE.Mesh(headGeo, headMat);
        head.position.y = 1.4;
        tyrant.add(head);
        
        // Crown/helmet top
        const crownGeo = new THREE.ConeGeometry(0.25, 0.3, 6);
        const crownMat = new THREE.MeshLambertMaterial({ 
            color: 0x8B7355, 
            flatShading: true 
        });
        const crown = new THREE.Mesh(crownGeo, crownMat);
        crown.position.y = 1.75;
        tyrant.add(crown);
        
        // Reaching hand (pointing at boat)
        const armGeo = new THREE.CylinderGeometry(0.08, 0.1, 0.8, 5);
        const arm = new THREE.Mesh(armGeo, bodyMat);
        arm.position.set(-0.6, 0.8, 0);
        arm.rotation.z = Math.PI / 3;
        tyrant.add(arm);
        
        tyrant.position.set(2, 0, 0);
        tyrant.scale.set(1.3, 1.3, 1.3); // Larger/imposing
        group.add(tyrant);
        
        // Frightened fisherman
        const fisherman = CharacterFactory.createSimpleCharacter(0x6B5A4A, 0.8);
        fisherman.position.set(-1, 0, -1);
        fisherman.rotation.y = Math.PI / 4;
        group.add(fisherman);
    }
    
    // Vision: Boy's dark future (symbolic - shadow figure, no violence)
    static createBoyFutureVision(group) {
        // Shadow silhouette of grown man (ominous)
        const shadowGeo = new THREE.CylinderGeometry(0.4, 0.5, 1.8, 6);
        const shadowMat = new THREE.MeshLambertMaterial({ 
            color: 0x0A0A0A, 
            flatShading: true,
            transparent: true,
            opacity: 0.8
        });
        const shadow = new THREE.Mesh(shadowGeo, shadowMat);
        shadow.position.set(0, 0.9, 0);
        group.add(shadow);
        
        // Dark aura around figure
        const auraGeo = new THREE.SphereGeometry(1.2, 8, 8);
        const auraMat = new THREE.MeshBasicMaterial({ 
            color: 0x4A0000, 
            transparent: true,
            opacity: 0.3,
            wireframe: true
        });
        const aura = new THREE.Mesh(auraGeo, auraMat);
        aura.position.y = 1;
        group.add(aura);
        
        // Broken heart symbol (parents' grief)
        const heartGeo = new THREE.SphereGeometry(0.25, 6, 6);
        const heartMat = new THREE.MeshLambertMaterial({ 
            color: 0x8B4513,
            flatShading: true
        });
        const heart1 = new THREE.Mesh(heartGeo, heartMat);
        heart1.position.set(-0.8, 1.5, 1);
        heart1.scale.set(0.7, 1, 0.7);
        const heart2 = new THREE.Mesh(heartGeo, heartMat);
        heart2.position.set(0.8, 1.5, 1);
        heart2.scale.set(0.7, 1, 0.7);
        group.add(heart1);
        group.add(heart2);
    }
    
    // Vision: Treasure revealed
    static createTreasureVision(group) {
        // Treasure chest
        const chest = new THREE.Group();
        
        // Base
        const baseGeo = new THREE.BoxGeometry(1, 0.6, 0.7);
        const baseMat = new THREE.MeshLambertMaterial({ 
            color: 0x6B4423, 
            flatShading: true 
        });
        const base = new THREE.Mesh(baseGeo, baseMat);
        base.position.y = 0.3;
        chest.add(base);
        
        // Lid (open)
        const lidGeo = new THREE.BoxGeometry(1, 0.1, 0.7);
        const lid = new THREE.Mesh(lidGeo, baseMat);
        lid.position.set(0, 0.8, -0.3);
        lid.rotation.x = -Math.PI / 3;
        chest.add(lid);
        
        // Gold bands
        const bandGeo = new THREE.BoxGeometry(1.05, 0.08, 0.08);
        const bandMat = new THREE.MeshLambertMaterial({ 
            color: 0xC9A84C, 
            flatShading: true 
        });
        const band1 = new THREE.Mesh(bandGeo, bandMat);
        band1.position.y = 0.15;
        chest.add(band1);
        const band2 = new THREE.Mesh(bandGeo, bandMat);
        band2.position.y = 0.45;
        chest.add(band2);
        
        // Glowing coins/treasure inside
        for (let i = 0; i < 8; i++) {
            const coinGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.03, 8);
            const coinMat = new THREE.MeshBasicMaterial({ 
                color: 0xFFD700
            });
            const coin = new THREE.Mesh(coinGeo, coinMat);
            coin.position.set(
                (Math.random() - 0.5) * 0.6,
                0.4 + Math.random() * 0.2,
                (Math.random() - 0.5) * 0.4
            );
            coin.rotation.x = Math.PI / 2;
            chest.add(coin);
        }
        
        chest.position.set(0, 0, 0);
        group.add(chest);
        
        // Two orphan boys (small figures)
        const boy1 = CharacterFactory.createSimpleCharacter(0x6B5A4A, 0.6);
        boy1.position.set(-1.2, 0, 0.5);
        boy1.rotation.y = Math.PI / 6;
        group.add(boy1);
        
        const boy2 = CharacterFactory.createSimpleCharacter(0x7A6A5A, 0.6);
        boy2.position.set(1.2, 0, 0.5);
        boy2.rotation.y = -Math.PI / 6;
        group.add(boy2);
        
        // Glow effect
        const glowGeo = new THREE.SphereGeometry(0.8, 8, 8);
        const glowMat = new THREE.MeshBasicMaterial({ 
            color: 0xFFD700, 
            transparent: true,
            opacity: 0.2,
            wireframe: true
        });
        const glow = new THREE.Mesh(glowGeo, glowMat);
        glow.position.y = 0.5;
        group.add(glow);
    }
}
