// Animation sequences for key story moments
class AnimationController {
    
    // Fleeing animation - believers running to cave
    static fleeing(believers, progress) {
        believers.forEach((believer, index) => {
            const offset = index * 0.8;
            const adjustedProgress = Math.max(0, Math.min(1, progress - offset * 0.1));
            
            // Move from city toward camera (fleeing)
            const startZ = -5;
            const endZ = 2;
            believer.position.z = startZ + (endZ - startZ) * adjustedProgress;
            
            // Running motion
            const runCycle = Math.sin(progress * 20 + index * 2) * 0.3;
            believer.rotation.x = runCycle;
            
            // Bob up and down while running
            believer.position.y = Math.abs(Math.sin(progress * 15 + index * 2)) * 0.3;
            
            // Slight side-to-side variation
            believer.position.x = -2 + index * 1.2 + Math.sin(progress * 10 + index) * 0.2;
        });
    }
    
    // Entering cave - believers walk into darkness
    static enteringCave(believers, progress) {
        believers.forEach((believer, index) => {
            const offset = index * 0.15;
            const adjustedProgress = Math.max(0, Math.min(1, progress - offset));
            
            // Walk forward
            const startZ = 3;
            const endZ = 0;
            believer.position.z = startZ + (endZ - startZ) * adjustedProgress;
            
            // Walking animation
            const walkCycle = Math.sin(progress * 12 + index * 2) * 0.15;
            believer.rotation.z = walkCycle;
            
            // Position in semi-circle
            const angle = (index - 2) * 0.4;
            believer.position.x = Math.sin(angle) * 2.5;
            
            // Gentle vertical movement
            believer.position.y = Math.abs(Math.sin(progress * 10 + index)) * 0.1;
            
            // Face forward
            believer.rotation.y = 0;
        });
    }
    
    // Sleeping animation - believers lie down and fade
    static sleeping(believers, dog, progress) {
        believers.forEach((believer, index) => {
            // Position in sleeping circle
            const angle = (index / believers.length) * Math.PI * 2;
            const radius = 2.5;
            
            believer.position.x = Math.cos(angle) * radius;
            believer.position.z = Math.sin(angle) * radius;
            
            // Gradual lying down
            const layProgress = Math.min(1, progress * 2);
            believer.rotation.x = layProgress * Math.PI / 2;
            believer.position.y = (1 - layProgress) * 0.5;
            
            // Look toward center
            if (progress < 0.5) {
                believer.lookAt(0, 0, 0);
                believer.rotation.x = layProgress * Math.PI / 2;
            }
        });
        
        // Dog curls up in center
        if (dog) {
            dog.position.set(0, 0, 0.5);
            dog.rotation.y = progress * Math.PI * 2;
            dog.scale.set(1, 1 - progress * 0.3, 1);
        }
    }
    
    // Time passage effect - visual indication of centuries passing
    static timePassage(scene, progress) {
        // Fade environment in/out
        scene.traverse(object => {
            if (object.material && object.userData.environment) {
                const originalOpacity = object.material.opacity !== undefined ? object.material.opacity : 1;
                
                if (!object.userData.originalOpacity) {
                    object.userData.originalOpacity = originalOpacity;
                }
                
                if (object.material.transparent === undefined) {
                    object.material.transparent = true;
                }
                
                // Pulsing fade effect
                const pulse = Math.sin(progress * Math.PI * 4) * 0.3 + 0.7;
                object.material.opacity = object.userData.originalOpacity * pulse;
            }
        });
    }
    
    // Waking animation - believers stir and stand
    static waking(believers, progress) {
        believers.forEach((believer, index) => {
            const offset = index * 0.12;
            const adjustedProgress = Math.max(0, Math.min(1, progress - offset));
            
            // Position remains from sleeping
            const angle = (index / believers.length) * Math.PI * 2;
            const radius = 2.5;
            
            believer.position.x = Math.cos(angle) * radius;
            believer.position.z = Math.sin(angle) * radius;
            
            // Gradually stand up
            believer.rotation.x = (1 - adjustedProgress) * Math.PI / 2;
            believer.position.y = adjustedProgress * 0.5;
            
            // Stretch animation
            if (adjustedProgress > 0.5) {
                const stretchProgress = (adjustedProgress - 0.5) * 2;
                believer.scale.y = 1 + Math.sin(stretchProgress * Math.PI) * 0.15;
            }
            
            // Confusion - look around
            if (adjustedProgress > 0.7) {
                const lookProgress = (adjustedProgress - 0.7) * 3.33;
                believer.rotation.y = Math.sin(lookProgress * Math.PI * 2) * 0.5;
            }
        });
    }
    
    // Discovery animation - townspeople gather around cave
    static discovery(townspeople, believers, progress) {
        // Townspeople approach from distance
        townspeople.forEach((person, index) => {
            const offset = index * 0.1;
            const adjustedProgress = Math.max(0, Math.min(1, progress - offset));
            
            // Start far, move close
            const startDistance = 15;
            const endDistance = 4;
            const distance = startDistance + (endDistance - startDistance) * adjustedProgress;
            
            const angle = (index / townspeople.length) * Math.PI * 2;
            person.position.x = Math.cos(angle) * distance;
            person.position.z = Math.sin(angle) * distance;
            
            // Look toward believers
            person.lookAt(0, 1, 0);
            
            // Walking animation
            person.position.y = Math.abs(Math.sin(progress * 10 + index * 2)) * 0.1;
        });
        
        // Believers stand uncertainly
        believers.forEach((believer, index) => {
            // Remain in circle
            const angle = (index / believers.length) * Math.PI * 2;
            const radius = 2;
            
            believer.position.x = Math.cos(angle) * radius;
            believer.position.z = Math.sin(angle) * radius;
            believer.position.y = 0.5;
            
            // Look outward at townspeople
            believer.lookAt(
                Math.cos(angle) * 10,
                1,
                Math.sin(angle) * 10
            );
            
            // Nervous fidgeting
            believer.rotation.y += Math.sin(progress * 5 + index) * 0.02;
        });
    }
    
    // Currency scene - believer at market
    static currencyScene(believer, vendor, progress) {
        // Believer approaches vendor
        const approachProgress = Math.min(1, progress * 2);
        
        believer.position.x = -3 + approachProgress * 2;
        believer.position.z = -1;
        believer.position.y = 0.5;
        believer.rotation.y = Math.PI / 4;
        
        // Vendor reacts with surprise
        if (vendor && progress > 0.5) {
            const reactionProgress = (progress - 0.5) * 2;
            
            // Lean back in surprise
            vendor.rotation.z = -reactionProgress * 0.3;
            
            // Point at coin
            vendor.rotation.y = Math.sin(reactionProgress * Math.PI * 2) * 0.2;
        }
    }
    
    // Prayer animation - believers bow in supplication
    static prayer(believers, progress) {
        believers.forEach((believer, index) => {
            // Position in line
            believer.position.x = -2 + index * 1.2;
            believer.position.z = 0;
            
            // Bowing motion
            const bowProgress = Math.min(1, progress * 1.5);
            believer.rotation.x = bowProgress * Math.PI / 3; // Bow forward
            
            // Hands raised (simplified - just body posture)
            believer.position.y = 0.5 - bowProgress * 0.2;
            
            // Slight synchronized sway
            const sway = Math.sin(progress * 3 + index * 0.5) * 0.05;
            believer.rotation.z = sway;
        });
    }
    
    // Reset all character transforms
    static resetCharacter(character) {
        character.position.set(0, 0, 0);
        character.rotation.set(0, 0, 0);
        character.scale.set(1, 1, 1);
    }
    
    // Smooth camera transition
    static transitionCamera(camera, controls, targetPosition, targetLookAt, progress) {
        // Ease in-out
        const eased = progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        
        // Interpolate position
        camera.position.x += (targetPosition.x - camera.position.x) * eased * 0.1;
        camera.position.y += (targetPosition.y - camera.position.y) * eased * 0.1;
        camera.position.z += (targetPosition.z - camera.position.z) * eased * 0.1;
        
        // Update controls target
        if (controls) {
            controls.target.x += (targetLookAt.x - controls.target.x) * eased * 0.1;
            controls.target.y += (targetLookAt.y - controls.target.y) * eased * 0.1;
            controls.target.z += (targetLookAt.z - controls.target.z) * eased * 0.1;
        }
    }
    
    // Fade transition helper
    static fadeTransition(scene, fadeOut, progress) {
        scene.traverse(object => {
            if (object.material) {
                if (!object.userData.originalOpacity) {
                    object.userData.originalOpacity = object.material.opacity !== undefined ? object.material.opacity : 1;
                }
                
                if (object.material.transparent === undefined) {
                    object.material.transparent = true;
                }
                
                const targetOpacity = fadeOut ? 0 : object.userData.originalOpacity;
                const currentOpacity = object.material.opacity;
                object.material.opacity = currentOpacity + (targetOpacity - currentOpacity) * progress * 0.1;
            }
        });
    }
}
