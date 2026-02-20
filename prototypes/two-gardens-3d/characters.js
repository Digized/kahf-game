// characters.js - Character models for The Two Gardens

export function createWealthyMan(THREE) {
    const character = new THREE.Group();
    
    // Materials
    const richRobeMaterial = new THREE.MeshLambertMaterial({ color: 0x8b4513 }); // Rich brown
    const goldMaterial = new THREE.MeshLambertMaterial({ color: 0xd4af37 }); // Gold jewelry
    const skinMaterial = new THREE.MeshLambertMaterial({ color: 0xc68642 });
    
    // Body (robe)
    const bodyGeometry = new THREE.CylinderGeometry(0.4, 0.5, 1.2, 8);
    const body = new THREE.Mesh(bodyGeometry, richRobeMaterial);
    body.position.y = 0.6;
    character.add(body);
    
    // Head
    const headGeometry = new THREE.SphereGeometry(0.25, 8, 8);
    const head = new THREE.Mesh(headGeometry, skinMaterial);
    head.position.y = 1.4;
    character.add(head);
    
    // Turban (elaborate)
    const turbanGeometry = new THREE.CylinderGeometry(0.28, 0.28, 0.2, 8);
    const turban = new THREE.Mesh(turbanGeometry, richRobeMaterial);
    turban.position.y = 1.6;
    character.add(turban);
    
    // Gold band on turban
    const bandGeometry = new THREE.TorusGeometry(0.28, 0.05, 8, 8);
    const band = new THREE.Mesh(bandGeometry, goldMaterial);
    band.rotation.x = Math.PI / 2;
    band.position.y = 1.6;
    character.add(band);
    
    // Arms (outstretched for boasting)
    const armGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.6, 6);
    
    const leftArm = new THREE.Mesh(armGeometry, richRobeMaterial);
    leftArm.position.set(-0.5, 0.9, 0);
    leftArm.rotation.z = Math.PI / 3;
    character.add(leftArm);
    
    const rightArm = new THREE.Mesh(armGeometry, richRobeMaterial);
    rightArm.position.set(0.5, 0.9, 0);
    rightArm.rotation.z = -Math.PI / 3;
    character.add(rightArm);
    
    // Gold bracelets
    const braceletGeometry = new THREE.TorusGeometry(0.1, 0.03, 6, 8);
    
    const leftBracelet = new THREE.Mesh(braceletGeometry, goldMaterial);
    leftBracelet.position.set(-0.7, 0.7, 0);
    leftBracelet.rotation.z = Math.PI / 3;
    character.add(leftBracelet);
    
    const rightBracelet = new THREE.Mesh(braceletGeometry, goldMaterial);
    rightBracelet.position.set(0.7, 0.7, 0);
    rightBracelet.rotation.z = -Math.PI / 3;
    character.add(rightBracelet);
    
    // Shadow
    const shadowGeometry = new THREE.CircleGeometry(0.6, 16);
    const shadowMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x000000, 
        transparent: true, 
        opacity: 0.3 
    });
    const shadow = new THREE.Mesh(shadowGeometry, shadowMaterial);
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = 0.01;
    character.add(shadow);
    
    character.userData.type = 'wealthy';
    return character;
}

export function createHumbleCompanion(THREE) {
    const character = new THREE.Group();
    
    // Materials
    const simpleRobeMaterial = new THREE.MeshLambertMaterial({ color: 0x5d4e37 }); // Simple brown
    const skinMaterial = new THREE.MeshLambertMaterial({ color: 0xc68642 });
    
    // Body (simple robe)
    const bodyGeometry = new THREE.CylinderGeometry(0.35, 0.45, 1.2, 8);
    const body = new THREE.Mesh(bodyGeometry, simpleRobeMaterial);
    body.position.y = 0.6;
    character.add(body);
    
    // Head
    const headGeometry = new THREE.SphereGeometry(0.22, 8, 8);
    const head = new THREE.Mesh(headGeometry, skinMaterial);
    head.position.y = 1.35;
    character.add(head);
    
    // Simple head covering
    const headCoverGeometry = new THREE.ConeGeometry(0.25, 0.3, 8);
    const headCover = new THREE.Mesh(headCoverGeometry, simpleRobeMaterial);
    headCover.position.y = 1.55;
    character.add(headCover);
    
    // Arms (at sides, humble posture)
    const armGeometry = new THREE.CylinderGeometry(0.07, 0.07, 0.5, 6);
    
    const leftArm = new THREE.Mesh(armGeometry, simpleRobeMaterial);
    leftArm.position.set(-0.4, 0.8, 0);
    leftArm.rotation.z = Math.PI / 12;
    character.add(leftArm);
    
    const rightArm = new THREE.Mesh(armGeometry, simpleRobeMaterial);
    rightArm.position.set(0.4, 0.8, 0);
    rightArm.rotation.z = -Math.PI / 12;
    character.add(rightArm);
    
    // Hands in prayer position (optional detail)
    const handGeometry = new THREE.SphereGeometry(0.08, 6, 6);
    const leftHand = new THREE.Mesh(handGeometry, skinMaterial);
    leftHand.position.set(-0.45, 0.55, 0.1);
    character.add(leftHand);
    
    const rightHand = new THREE.Mesh(handGeometry, skinMaterial);
    rightHand.position.set(0.45, 0.55, 0.1);
    character.add(rightHand);
    
    // Shadow
    const shadowGeometry = new THREE.CircleGeometry(0.5, 16);
    const shadowMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x000000, 
        transparent: true, 
        opacity: 0.3 
    });
    const shadow = new THREE.Mesh(shadowGeometry, shadowMaterial);
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = 0.01;
    character.add(shadow);
    
    character.userData.type = 'humble';
    return character;
}

// Animation helpers
export function createBoastingPose(character) {
    if (character.userData.type !== 'wealthy') return;
    
    // Animate arms spreading wider
    const leftArm = character.children.find(c => c.position.x < 0 && c.geometry?.type === 'CylinderGeometry' && c.position.y > 0.5);
    const rightArm = character.children.find(c => c.position.x > 0 && c.geometry?.type === 'CylinderGeometry' && c.position.y > 0.5);
    
    if (leftArm) leftArm.rotation.z = Math.PI / 2.5;
    if (rightArm) rightArm.rotation.z = -Math.PI / 2.5;
}

export function createRegretPose(character) {
    if (character.userData.type !== 'wealthy') return;
    
    // Hunched, arms down
    const body = character.children.find(c => c.geometry?.type === 'CylinderGeometry' && c.position.y > 0.5);
    if (body) {
        body.rotation.x = Math.PI / 12;
    }
    
    const head = character.children.find(c => c.geometry?.type === 'SphereGeometry' && c.position.y > 1);
    if (head) {
        head.position.y -= 0.1;
        head.rotation.x = Math.PI / 6;
    }
    
    const leftArm = character.children.find(c => c.position.x < 0 && c.geometry?.type === 'CylinderGeometry' && c.position.y > 0.5);
    const rightArm = character.children.find(c => c.position.x > 0 && c.geometry?.type === 'CylinderGeometry' && c.position.y > 0.5);
    
    if (leftArm) leftArm.rotation.z = Math.PI / 6;
    if (rightArm) rightArm.rotation.z = -Math.PI / 6;
}

export function createWarningGesture(character) {
    if (character.userData.type !== 'humble') return;
    
    // Raise one hand gently
    const rightArm = character.children.find(c => c.position.x > 0 && c.geometry?.type === 'CylinderGeometry' && c.position.y > 0.5);
    if (rightArm) {
        rightArm.rotation.z = -Math.PI / 2.5;
        rightArm.position.y = 1.0;
    }
}
