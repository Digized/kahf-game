// Character creation using low-poly geometries
class CharacterFactory {
    
    // Create young believer (Cave Sleeper)
    static createBeliever(index = 0) {
        const believer = new THREE.Group();
        
        // Color variations for different believers
        const robeColors = [
            0x3A5A4A, // Teal-green
            0x4A5A6B, // Blue-gray
            0x6B4A3A, // Brown
            0x5A4A6B, // Purple-gray
            0x4A6B5A, // Forest green
        ];
        const robeColor = robeColors[index % robeColors.length];
        
        // Body (simple robe)
        const bodyGeometry = new THREE.CylinderGeometry(0.28, 0.48, 1.5, 8);
        const bodyMaterial = new THREE.MeshLambertMaterial({ 
            color: robeColor,
            flatShading: true 
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = 0.75;
        believer.add(body);
        
        // Head
        const headGeometry = new THREE.SphereGeometry(0.24, 10, 10);
        const headMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xC4A07A, // Warm skin tone
            flatShading: true
        });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.y = 1.65;
        believer.add(head);
        
        // Simple head covering
        const capGeometry = new THREE.ConeGeometry(0.26, 0.2, 8);
        const capMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x3A3A3A,
            flatShading: true
        });
        const cap = new THREE.Mesh(capGeometry, capMaterial);
        cap.position.y = 1.82;
        believer.add(cap);
        
        // Belt
        const beltGeometry = new THREE.CylinderGeometry(0.29, 0.29, 0.12, 8);
        const beltMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x5D4E37,
            flatShading: true
        });
        const belt = new THREE.Mesh(beltGeometry, beltMaterial);
        belt.position.y = 0.85;
        believer.add(belt);
        
        // Feet
        const footGeometry = new THREE.BoxGeometry(0.14, 0.07, 0.22);
        const footMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x6B5A4A,
            flatShading: true
        });
        const leftFoot = new THREE.Mesh(footGeometry, footMaterial);
        leftFoot.position.set(-0.16, 0.04, 0.14);
        const rightFoot = new THREE.Mesh(footGeometry, footMaterial);
        rightFoot.position.set(0.16, 0.04, 0.14);
        believer.add(leftFoot);
        believer.add(rightFoot);
        
        believer.userData = { type: 'believer', index };
        believer.castShadow = true;
        return believer;
    }
    
    // Create guard/persecutor
    static createGuard() {
        const guard = new THREE.Group();
        
        // Body (armor-like tunic)
        const bodyGeometry = new THREE.CylinderGeometry(0.32, 0.52, 1.6, 8);
        const bodyMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x5A3A3A, // Dark red armor
            flatShading: true 
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = 0.8;
        guard.add(body);
        
        // Chest plate
        const chestGeometry = new THREE.BoxGeometry(0.5, 0.6, 0.15);
        const chestMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x4A2A2A,
            flatShading: true
        });
        const chest = new THREE.Mesh(chestGeometry, chestMaterial);
        chest.position.set(0, 1.1, 0.2);
        guard.add(chest);
        
        // Head
        const headGeometry = new THREE.SphereGeometry(0.22, 10, 10);
        const headMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xB89970,
            flatShading: true
        });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.y = 1.75;
        guard.add(head);
        
        // Helmet
        const helmetGeometry = new THREE.CylinderGeometry(0.24, 0.26, 0.25, 8);
        const helmetMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x3A3A3A,
            flatShading: true
        });
        const helmet = new THREE.Mesh(helmetGeometry, helmetMaterial);
        helmet.position.y = 1.92;
        guard.add(helmet);
        
        // Spear
        const spearGeometry = new THREE.CylinderGeometry(0.03, 0.04, 2.5, 6);
        const spearMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x5D4E37,
            flatShading: true
        });
        const spear = new THREE.Mesh(spearGeometry, spearMaterial);
        spear.position.set(0.5, 1.2, 0);
        guard.add(spear);
        
        // Spear tip
        const tipGeometry = new THREE.ConeGeometry(0.08, 0.25, 6);
        const tipMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x6A6A6A,
            flatShading: true
        });
        const tip = new THREE.Mesh(tipGeometry, tipMaterial);
        tip.position.set(0.5, 2.55, 0);
        guard.add(tip);
        
        // Feet
        const footGeometry = new THREE.BoxGeometry(0.16, 0.08, 0.24);
        const footMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x4A3A2A,
            flatShading: true
        });
        const leftFoot = new THREE.Mesh(footGeometry, footMaterial);
        leftFoot.position.set(-0.18, 0.04, 0.15);
        const rightFoot = new THREE.Mesh(footGeometry, footMaterial);
        rightFoot.position.set(0.18, 0.04, 0.15);
        guard.add(leftFoot);
        guard.add(rightFoot);
        
        guard.userData = { type: 'guard' };
        guard.castShadow = true;
        return guard;
    }
    
    // Create townsperson (future era)
    static createTownsperson(index = 0) {
        const person = new THREE.Group();
        
        // Color variations
        const colors = [0x6B8A7A, 0x7A6B8A, 0x8A7A6B, 0x6B7A8A];
        const color = colors[index % colors.length];
        
        // Body
        const bodyGeometry = new THREE.CylinderGeometry(0.26, 0.45, 1.4, 8);
        const bodyMaterial = new THREE.MeshLambertMaterial({ 
            color: color,
            flatShading: true 
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = 0.7;
        person.add(body);
        
        // Head
        const headGeometry = new THREE.SphereGeometry(0.22, 10, 10);
        const headMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xC4A07A,
            flatShading: true
        });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.y = 1.55;
        person.add(head);
        
        // Turban/head covering
        const turbanGeometry = new THREE.CylinderGeometry(0.24, 0.22, 0.22, 8);
        const turbanMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xE8DCC8,
            flatShading: true
        });
        const turban = new THREE.Mesh(turbanGeometry, turbanMaterial);
        turban.position.y = 1.72;
        person.add(turban);
        
        // Feet
        const footGeometry = new THREE.BoxGeometry(0.13, 0.06, 0.20);
        const footMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x6B5A4A,
            flatShading: true
        });
        const leftFoot = new THREE.Mesh(footGeometry, footMaterial);
        leftFoot.position.set(-0.15, 0.03, 0.13);
        const rightFoot = new THREE.Mesh(footGeometry, footMaterial);
        rightFoot.position.set(0.15, 0.03, 0.13);
        person.add(leftFoot);
        person.add(rightFoot);
        
        person.userData = { type: 'townsperson', index };
        person.castShadow = true;
        return person;
    }
    
    // Create market vendor
    static createVendor() {
        const vendor = new THREE.Group();
        
        // Body (robed merchant)
        const bodyGeometry = new THREE.CylinderGeometry(0.32, 0.55, 1.5, 8);
        const bodyMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x8A6B4A, // Rich brown
            flatShading: true 
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = 0.75;
        vendor.add(body);
        
        // Head
        const headGeometry = new THREE.SphereGeometry(0.25, 10, 10);
        const headMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xB89970,
            flatShading: true
        });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.y = 1.65;
        vendor.add(head);
        
        // Beard
        const beardGeometry = new THREE.ConeGeometry(0.18, 0.35, 6);
        const beardMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x5A5A5A,
            flatShading: true
        });
        const beard = new THREE.Mesh(beardGeometry, beardMaterial);
        beard.position.set(0, 1.5, 0.14);
        beard.rotation.x = Math.PI;
        vendor.add(beard);
        
        // Turban
        const turbanGeometry = new THREE.CylinderGeometry(0.27, 0.25, 0.28, 8);
        const turbanMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xC9A84C, // Gold accent
            flatShading: true
        });
        const turban = new THREE.Mesh(turbanGeometry, turbanMaterial);
        turban.position.y = 1.88;
        vendor.add(turban);
        
        // Apron
        const apronGeometry = new THREE.PlaneGeometry(0.5, 0.7);
        const apronMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xE8DCC8,
            flatShading: true,
            side: THREE.DoubleSide
        });
        const apron = new THREE.Mesh(apronGeometry, apronMaterial);
        apron.position.set(0, 0.9, 0.3);
        vendor.add(apron);
        
        // Feet
        const footGeometry = new THREE.BoxGeometry(0.15, 0.07, 0.22);
        const footMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x6B5A4A,
            flatShading: true
        });
        const leftFoot = new THREE.Mesh(footGeometry, footMaterial);
        leftFoot.position.set(-0.18, 0.04, 0.14);
        const rightFoot = new THREE.Mesh(footGeometry, footMaterial);
        rightFoot.position.set(0.18, 0.04, 0.14);
        vendor.add(leftFoot);
        vendor.add(rightFoot);
        
        vendor.userData = { type: 'vendor' };
        vendor.castShadow = true;
        return vendor;
    }
    
    // Create dog companion
    static createDog() {
        const dog = new THREE.Group();
        
        // Body
        const bodyGeometry = new THREE.BoxGeometry(0.5, 0.3, 0.3);
        const bodyMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x6B5A3A, // Brown fur
            flatShading: true
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = 0.25;
        dog.add(body);
        
        // Head
        const headGeometry = new THREE.BoxGeometry(0.25, 0.22, 0.22);
        const headMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x6B5A3A,
            flatShading: true
        });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.set(0.35, 0.25, 0);
        dog.add(head);
        
        // Snout
        const snoutGeometry = new THREE.BoxGeometry(0.15, 0.12, 0.15);
        const snoutMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x5A4A2A,
            flatShading: true
        });
        const snout = new THREE.Mesh(snoutGeometry, snoutMaterial);
        snout.position.set(0.5, 0.22, 0);
        dog.add(snout);
        
        // Ears
        const earGeometry = new THREE.ConeGeometry(0.08, 0.15, 4);
        const earMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x5A4A2A,
            flatShading: true
        });
        const leftEar = new THREE.Mesh(earGeometry, earMaterial);
        leftEar.position.set(0.35, 0.38, -0.1);
        leftEar.rotation.z = -0.3;
        const rightEar = new THREE.Mesh(earGeometry, earMaterial);
        rightEar.position.set(0.35, 0.38, 0.1);
        rightEar.rotation.z = 0.3;
        dog.add(leftEar);
        dog.add(rightEar);
        
        // Tail
        const tailGeometry = new THREE.CylinderGeometry(0.04, 0.05, 0.3, 5);
        const tailMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x6B5A3A,
            flatShading: true
        });
        const tail = new THREE.Mesh(tailGeometry, tailMaterial);
        tail.position.set(-0.28, 0.3, 0);
        tail.rotation.z = Math.PI / 4;
        dog.add(tail);
        
        // Legs
        const legGeometry = new THREE.CylinderGeometry(0.04, 0.05, 0.2, 5);
        const legMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x5A4A2A,
            flatShading: true
        });
        
        const positions = [
            { x: 0.15, z: -0.12 },
            { x: 0.15, z: 0.12 },
            { x: -0.15, z: -0.12 },
            { x: -0.15, z: 0.12 }
        ];
        
        positions.forEach(pos => {
            const leg = new THREE.Mesh(legGeometry, legMaterial);
            leg.position.set(pos.x, 0.1, pos.z);
            dog.add(leg);
        });
        
        dog.position.y = 0; // Ground level
        dog.userData = { type: 'dog' };
        dog.castShadow = true;
        return dog;
    }
    
    // Animate character (gentle idle bob + breathing)
    static animateIdle(character, time) {
        const baseY = character.userData.baseY || character.position.y;
        if (!character.userData.baseY) character.userData.baseY = baseY;
        
        // Gentle bob (except for dog)
        if (character.userData.type !== 'dog') {
            character.position.y = baseY + Math.sin(time * 1.8) * 0.04;
            character.rotation.y = Math.sin(time * 0.9) * 0.05;
        } else {
            // Dog tail wag
            const tail = character.children.find(c => c.position.x < -0.2);
            if (tail) {
                tail.rotation.x = Math.sin(time * 4) * 0.3;
            }
        }
    }
    
    // Make character look at target
    static lookAt(character, target) {
        character.lookAt(target);
        character.rotation.x = 0;
        character.rotation.z = 0;
    }
}
