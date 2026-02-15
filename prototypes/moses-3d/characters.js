// Character creation using low-poly geometries
class CharacterFactory {
    
    // Create Moses character
    static createMoses() {
        const moses = new THREE.Group();
        
        // Body (robe) - cone shape
        const bodyGeometry = new THREE.ConeGeometry(0.4, 1.5, 6);
        const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0x4a6fa5 }); // Blue robe
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = 0.75;
        moses.add(body);
        
        // Head
        const headGeometry = new THREE.SphereGeometry(0.25, 8, 8);
        const headMaterial = new THREE.MeshLambertMaterial({ color: 0xd4a574 });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.y = 1.7;
        moses.add(head);
        
        // Beard
        const beardGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.2);
        const beardMaterial = new THREE.MeshLambertMaterial({ color: 0x4a4a4a });
        const beard = new THREE.Mesh(beardGeometry, beardMaterial);
        beard.position.y = 1.5;
        beard.position.z = 0.1;
        moses.add(beard);
        
        // Staff
        const staffGeometry = new THREE.CylinderGeometry(0.03, 0.03, 2, 6);
        const staffMaterial = new THREE.MeshLambertMaterial({ color: 0x654321 });
        const staff = new THREE.Mesh(staffGeometry, staffMaterial);
        staff.position.y = 0.8;
        staff.position.x = 0.5;
        moses.add(staff);
        
        moses.userData = { type: 'moses' };
        return moses;
    }
    
    // Create Khidr character
    static createKhidr() {
        const khidr = new THREE.Group();
        
        // Body (green robe) - cone shape
        const bodyGeometry = new THREE.ConeGeometry(0.4, 1.5, 6);
        const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0x2d5016 }); // Dark green robe
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = 0.75;
        khidr.add(body);
        
        // Head
        const headGeometry = new THREE.SphereGeometry(0.25, 8, 8);
        const headMaterial = new THREE.MeshLambertMaterial({ color: 0xc4a574 });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.y = 1.7;
        khidr.add(head);
        
        // Hood
        const hoodGeometry = new THREE.ConeGeometry(0.35, 0.5, 6);
        const hoodMaterial = new THREE.MeshLambertMaterial({ color: 0x1a3a0f });
        const hood = new THREE.Mesh(hoodGeometry, hoodMaterial);
        hood.position.y = 2.0;
        khidr.add(hood);
        
        // Eyes (mysterious glow)
        const eyeGeometry = new THREE.SphereGeometry(0.05, 4, 4);
        const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0x88ccaa });
        const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        leftEye.position.set(-0.1, 1.75, 0.2);
        const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        rightEye.position.set(0.1, 1.75, 0.2);
        khidr.add(leftEye);
        khidr.add(rightEye);
        
        khidr.userData = { type: 'khidr' };
        return khidr;
    }
    
    // Create a simple low-poly character (for boy/villagers)
    static createSimpleCharacter(color, scale = 1) {
        const character = new THREE.Group();
        
        // Body
        const bodyGeometry = new THREE.BoxGeometry(0.4 * scale, 0.8 * scale, 0.3 * scale);
        const bodyMaterial = new THREE.MeshLambertMaterial({ color: color });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = 0.5 * scale;
        character.add(body);
        
        // Head
        const headGeometry = new THREE.BoxGeometry(0.3 * scale, 0.3 * scale, 0.3 * scale);
        const headMaterial = new THREE.MeshLambertMaterial({ color: 0xd4a574 });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.y = 1.0 * scale;
        character.add(head);
        
        // Legs
        const legGeometry = new THREE.BoxGeometry(0.15 * scale, 0.5 * scale, 0.15 * scale);
        const legMaterial = new THREE.MeshLambertMaterial({ color: color });
        const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
        leftLeg.position.set(-0.1 * scale, 0.0, 0);
        const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
        rightLeg.position.set(0.1 * scale, 0.0, 0);
        character.add(leftLeg);
        character.add(rightLeg);
        
        return character;
    }
    
    // Animate character (simple idle bob)
    static animateIdle(character, time) {
        character.position.y = Math.sin(time * 2) * 0.05;
    }
    
    // Make character look at target
    static lookAt(character, target) {
        character.lookAt(target);
    }
}
