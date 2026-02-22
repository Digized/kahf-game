// Character Factory - ISLAMIC COMPLIANCE
// CRITICAL: Al-Khidr shown as ABSTRACT SILHOUETTE ONLY
// NO FACES. NO DETAILED HUMAN FORMS.

class CharacterFactory {
    // Create Al-Khidr as abstract silhouette
    static createKhidr() {
        const group = new THREE.Group();
        
        // Semi-transparent abstract form (not detailed human)
        const bodyGeometry = new THREE.CylinderGeometry(0.3, 0.4, 1.8, 6);
        const bodyMaterial = new THREE.MeshBasicMaterial({
            color: 0x2a4520,
            transparent: true,
            opacity: 0.7,
            side: THREE.DoubleSide
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = 0.9;
        group.add(body);
        
        // Head (no face - just silhouette)
        const headGeometry = new THREE.SphereGeometry(0.25, 6, 6);
        const headMaterial = new THREE.MeshBasicMaterial({
            color: 0x2a4520,
            transparent: true,
            opacity: 0.7
        });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.y = 2.0;
        group.add(head);
        
        // Hood/cloak (abstract)
        const hoodGeometry = new THREE.ConeGeometry(0.4, 0.6, 6);
        const hoodMaterial = new THREE.MeshBasicMaterial({
            color: 0x1a3015,
            transparent: true,
            opacity: 0.8
        });
        const hood = new THREE.Mesh(hoodGeometry, hoodMaterial);
        hood.position.y = 2.3;
        group.add(hood);
        
        // Ethereal glow (mystical but not supernatural)
        const glowGeometry = new THREE.SphereGeometry(0.6, 8, 8);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: 0xc9a84c,
            transparent: true,
            opacity: 0.15,
            side: THREE.BackSide
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        glow.position.y = 1.2;
        group.add(glow);
        
        group.userData = { type: 'khidr' };
        return group;
    }
    
    // Animate idle (gentle sway)
    static animateIdle(character, time) {
        if (!character) return;
        
        const baseY = character.userData.baseY || character.position.y;
        if (!character.userData.baseY) character.userData.baseY = baseY;
        
        // Gentle vertical bob
        character.position.y = baseY + Math.sin(time * 1.2) * 0.05;
        
        // Subtle rotation
        character.rotation.y = Math.sin(time * 0.6) * 0.1;
    }
}
