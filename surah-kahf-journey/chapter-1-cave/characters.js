// Characters for Cave Sleepers
// ISLAMIC COMPLIANCE: Abstract silhouettes only, no detailed faces

class CharacterFactory {
    // Create abstract believer (companion)
    static createBeliever() {
        const group = new THREE.Group();
        
        // Simple robed figure (no face detail)
        const bodyGeometry = new THREE.CylinderGeometry(0.3, 0.4, 1.6, 6);
        const bodyMaterial = new THREE.MeshBasicMaterial({
            color: 0x5a7a8a,
            transparent: true,
            opacity: 0.7
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = 0.8;
        group.add(body);
        
        // Head (no face)
        const headGeometry = new THREE.SphereGeometry(0.2, 6, 6);
        const headMaterial = new THREE.MeshBasicMaterial({
            color: 0x5a7a8a,
            transparent: true,
            opacity: 0.7
        });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.y = 1.8;
        group.add(head);
        
        return group;
    }
    
    // Create dog (permissible - animal)
    static createDog() {
        const dog = new THREE.Group();
        
        const bodyGeometry = new THREE.BoxGeometry(0.6, 0.3, 0.4);
        const dogMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x8b7355,
            flatShading: true
        });
        const body = new THREE.Mesh(bodyGeometry, dogMaterial);
        body.position.y = 0.2;
        dog.add(body);
        
        const headGeometry = new THREE.BoxGeometry(0.25, 0.2, 0.25);
        const head = new THREE.Mesh(headGeometry, dogMaterial);
        head.position.set(0.35, 0.2, 0);
        dog.add(head);
        
        return dog;
    }
}
