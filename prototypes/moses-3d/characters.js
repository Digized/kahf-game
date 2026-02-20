// Character creation using low-poly geometries
class CharacterFactory {
    
    // Create Moses character
    static createMoses() {
        const moses = new THREE.Group();
        
        // Body (layered robe) - more detailed
        const bodyGeometry = new THREE.CylinderGeometry(0.3, 0.55, 1.6, 8);
        const bodyMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x2E4A6B, // Deep blue-gray robe
            flatShading: true 
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = 0.8;
        moses.add(body);
        
        // Under-robe (slight offset for layering)
        const underRobeGeometry = new THREE.CylinderGeometry(0.25, 0.5, 1.5, 8);
        const underRobeMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x4A6B8A,
            flatShading: true
        });
        const underRobe = new THREE.Mesh(underRobeGeometry, underRobeMaterial);
        underRobe.position.y = 0.75;
        moses.add(underRobe);
        
        // Head (slightly elongated)
        const headGeometry = new THREE.SphereGeometry(0.28, 10, 10);
        const headMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xC4A07A, // Warm skin tone
            flatShading: true
        });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.y = 1.85;
        head.scale.y = 1.15;
        moses.add(head);
        
        // Beard (layered)
        const beardGeometry = new THREE.ConeGeometry(0.2, 0.45, 6);
        const beardMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x3A3A3A,
            flatShading: true
        });
        const beard = new THREE.Mesh(beardGeometry, beardMaterial);
        beard.position.set(0, 1.6, 0.15);
        beard.rotation.x = Math.PI;
        moses.add(beard);
        
        // Turban/head covering
        const turbanGeometry = new THREE.CylinderGeometry(0.3, 0.28, 0.25, 8);
        const turbanMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x8A7560,
            flatShading: true
        });
        const turban = new THREE.Mesh(turbanGeometry, turbanMaterial);
        turban.position.y = 2.15;
        moses.add(turban);
        
        // Staff (more detailed)
        const staffGeometry = new THREE.CylinderGeometry(0.04, 0.05, 2.2, 6);
        const staffMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x5D4E37,
            flatShading: true
        });
        const staff = new THREE.Mesh(staffGeometry, staffMaterial);
        staff.position.set(0.55, 0.9, 0);
        staff.rotation.z = -0.15;
        moses.add(staff);
        
        // Staff top ornament
        const staffTopGeometry = new THREE.SphereGeometry(0.08, 6, 6);
        const staffTopMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x8B7355,
            flatShading: true
        });
        const staffTop = new THREE.Mesh(staffTopGeometry, staffTopMaterial);
        staffTop.position.set(0.58, 2.0, 0);
        moses.add(staffTop);
        
        // Feet (simple sandals)
        const footGeometry = new THREE.BoxGeometry(0.15, 0.08, 0.25);
        const footMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x6B5A4A,
            flatShading: true
        });
        const leftFoot = new THREE.Mesh(footGeometry, footMaterial);
        leftFoot.position.set(-0.18, 0.04, 0.15);
        const rightFoot = new THREE.Mesh(footGeometry, footMaterial);
        rightFoot.position.set(0.18, 0.04, 0.15);
        moses.add(leftFoot);
        moses.add(rightFoot);
        
        moses.userData = { type: 'moses' };
        moses.castShadow = true;
        return moses;
    }
    
    // Create Khidr character
    static createKhidr() {
        const khidr = new THREE.Group();
        
        // Body (flowing green robe)
        const bodyGeometry = new THREE.CylinderGeometry(0.3, 0.6, 1.7, 8);
        const bodyMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x2A4520, // Deep forest green
            flatShading: true
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = 0.85;
        khidr.add(body);
        
        // Inner robe layer
        const innerRobeGeometry = new THREE.CylinderGeometry(0.25, 0.55, 1.6, 8);
        const innerRobeMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x3A5A30,
            flatShading: true
        });
        const innerRobe = new THREE.Mesh(innerRobeGeometry, innerRobeMaterial);
        innerRobe.position.y = 0.8;
        khidr.add(innerRobe);
        
        // Head
        const headGeometry = new THREE.SphereGeometry(0.26, 10, 10);
        const headMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xB89970, // Weathered skin tone
            flatShading: true
        });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.y = 1.9;
        khidr.add(head);
        
        // Hood (large, mysterious)
        const hoodGeometry = new THREE.ConeGeometry(0.42, 0.65, 8);
        const hoodMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x1A3015,
            flatShading: true
        });
        const hood = new THREE.Mesh(hoodGeometry, hoodMaterial);
        hood.position.y = 2.25;
        hood.rotation.y = Math.PI / 8;
        khidr.add(hood);
        
        // Eyes (subtle glow - amber instead of green)
        const eyeGeometry = new THREE.SphereGeometry(0.04, 5, 5);
        const eyeMaterial = new THREE.MeshBasicMaterial({ 
            color: 0xC9A84C, // Amber glow
            transparent: true,
            opacity: 0.9
        });
        const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        leftEye.position.set(-0.09, 1.92, 0.22);
        const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        rightEye.position.set(0.09, 1.92, 0.22);
        khidr.add(leftEye);
        khidr.add(rightEye);
        
        // Belt/sash
        const beltGeometry = new THREE.CylinderGeometry(0.32, 0.32, 0.15, 8);
        const beltMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x7A6230,
            flatShading: true
        });
        const belt = new THREE.Mesh(beltGeometry, beltMaterial);
        belt.position.y = 0.9;
        khidr.add(belt);
        
        // Feet
        const footGeometry = new THREE.BoxGeometry(0.15, 0.08, 0.25);
        const footMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x4A3A2A,
            flatShading: true
        });
        const leftFoot = new THREE.Mesh(footGeometry, footMaterial);
        leftFoot.position.set(-0.2, 0.04, 0.15);
        const rightFoot = new THREE.Mesh(footGeometry, footMaterial);
        rightFoot.position.set(0.2, 0.04, 0.15);
        khidr.add(leftFoot);
        khidr.add(rightFoot);
        
        khidr.userData = { type: 'khidr' };
        khidr.castShadow = true;
        return khidr;
    }
    
    // Create a simple low-poly character (for boy/villagers)
    static createSimpleCharacter(color, scale = 1) {
        const character = new THREE.Group();
        
        // Body (tunic)
        const bodyGeometry = new THREE.CylinderGeometry(0.25 * scale, 0.35 * scale, 0.9 * scale, 6);
        const bodyMaterial = new THREE.MeshLambertMaterial({ 
            color: color,
            flatShading: true
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = 0.55 * scale;
        character.add(body);
        
        // Head
        const headGeometry = new THREE.SphereGeometry(0.18 * scale, 8, 8);
        const headMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xC4A07A,
            flatShading: true
        });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.y = 1.15 * scale;
        character.add(head);
        
        // Hair/cap
        const capGeometry = new THREE.ConeGeometry(0.2 * scale, 0.15 * scale, 6);
        const capMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x3A3A3A,
            flatShading: true
        });
        const cap = new THREE.Mesh(capGeometry, capMaterial);
        cap.position.y = 1.28 * scale;
        cap.rotation.y = Math.PI / 6;
        character.add(cap);
        
        // Legs
        const legGeometry = new THREE.CylinderGeometry(0.08 * scale, 0.09 * scale, 0.5 * scale, 5);
        const legMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x8B7355,
            flatShading: true
        });
        const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
        leftLeg.position.set(-0.12 * scale, 0.15 * scale, 0);
        const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
        rightLeg.position.set(0.12 * scale, 0.15 * scale, 0);
        character.add(leftLeg);
        character.add(rightLeg);
        
        // Feet
        const footGeometry = new THREE.BoxGeometry(0.12 * scale, 0.06 * scale, 0.18 * scale);
        const footMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x6B5A4A,
            flatShading: true
        });
        const leftFoot = new THREE.Mesh(footGeometry, footMaterial);
        leftFoot.position.set(-0.12 * scale, 0.03 * scale, 0.08 * scale);
        const rightFoot = new THREE.Mesh(footGeometry, footMaterial);
        rightFoot.position.set(0.12 * scale, 0.03 * scale, 0.08 * scale);
        character.add(leftFoot);
        character.add(rightFoot);
        
        character.castShadow = true;
        return character;
    }
    
    // Animate character (gentle idle bob + breathing)
    static animateIdle(character, time) {
        const baseY = character.userData.baseY || character.position.y;
        if (!character.userData.baseY) character.userData.baseY = baseY;
        
        // Gentle bob
        character.position.y = baseY + Math.sin(time * 1.8) * 0.04;
        
        // Subtle rotation sway
        character.rotation.y = Math.sin(time * 0.9) * 0.05;
    }
    
    // Make character look at target
    static lookAt(character, target) {
        character.lookAt(target);
        // Keep upright (only Y rotation)
        character.rotation.x = 0;
        character.rotation.z = 0;
    }
}
