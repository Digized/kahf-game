// Improved 3D Boat Model for Moses Chapter
// More detailed wooden fishing boat

class ImprovedBoat {
    static create() {
        const boat = new THREE.Group();
        
        // Materials
        const darkWood = new THREE.MeshStandardMaterial({ 
            color: 0x4a3728,
            roughness: 0.8,
            metalness: 0.1
        });
        const lightWood = new THREE.MeshStandardMaterial({ 
            color: 0x8b6f47,
            roughness: 0.7,
            metalness: 0.1
        });
        const rope = new THREE.MeshStandardMaterial({ 
            color: 0x8b7355,
            roughness: 0.9
        });
        
        // Hull - curved bottom using multiple segments
        const hullShape = new THREE.Shape();
        hullShape.moveTo(-2.5, 0);
        hullShape.quadraticCurveTo(-2.5, -0.8, -2, -1);
        hullShape.lineTo(2, -1);
        hullShape.quadraticCurveTo(2.5, -0.8, 2.5, 0);
        hullShape.lineTo(-2.5, 0);
        
        const extrudeSettings = {
            depth: 1.5,
            bevelEnabled: true,
            bevelThickness: 0.1,
            bevelSize: 0.1,
            bevelSegments: 2
        };
        
        const hullGeometry = new THREE.ExtrudeGeometry(hullShape, extrudeSettings);
        const hull = new THREE.Mesh(hullGeometry, darkWood);
        hull.rotation.y = Math.PI / 2;
        hull.position.set(0, 0, -0.75);
        boat.add(hull);
        
        // Deck planks (individual boards)
        for (let i = -2; i <= 2; i += 0.5) {
            const plank = new THREE.Mesh(
                new THREE.BoxGeometry(0.4, 0.08, 1.4),
                lightWood
            );
            plank.position.set(i, 0.2, 0);
            plank.castShadow = true;
            boat.add(plank);
        }
        
        // Side benches/seats
        const seatGeometry = new THREE.BoxGeometry(4, 0.2, 0.4);
        const leftSeat = new THREE.Mesh(seatGeometry, darkWood);
        leftSeat.position.set(0, 0.3, 0.6);
        leftSeat.castShadow = true;
        boat.add(leftSeat);
        
        const rightSeat = leftSeat.clone();
        rightSeat.position.z = -0.6;
        boat.add(rightSeat);
        
        // Oars (2 sets)
        for (let side of [-0.7, 0.7]) {
            const oarPole = new THREE.Mesh(
                new THREE.CylinderGeometry(0.04, 0.04, 3, 8),
                lightWood
            );
            oarPole.rotation.z = Math.PI / 2;
            oarPole.rotation.y = side > 0 ? 0.3 : -0.3;
            oarPole.position.set(side > 0 ? 1.5 : -1.5, 0.4, side);
            boat.add(oarPole);
            
            // Oar blade
            const blade = new THREE.Mesh(
                new THREE.BoxGeometry(0.4, 0.02, 0.25),
                darkWood
            );
            blade.position.set(
                side > 0 ? 3 : -3,
                0.4,
                side
            );
            boat.add(blade);
        }
        
        // Mast (thicker, tapered)
        const mastGeometry = new THREE.CylinderGeometry(0.08, 0.15, 5, 12);
        const mast = new THREE.Mesh(mastGeometry, darkWood);
        mast.position.set(0.5, 2.7, 0);
        mast.castShadow = true;
        boat.add(mast);
        
        // Cross beam
        const crossBeam = new THREE.Mesh(
            new THREE.CylinderGeometry(0.05, 0.05, 2.5, 8),
            lightWood
        );
        crossBeam.rotation.z = Math.PI / 2;
        crossBeam.position.set(0.5, 4.5, 0);
        boat.add(crossBeam);
        
        // Sail (furled/damaged appearance)
        const sailGeometry = new THREE.PlaneGeometry(2, 3.5, 5, 10);
        const sailMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xf0e6d2,
            side: THREE.DoubleSide,
            roughness: 0.9,
            transparent: true,
            opacity: 0.9
        });
        
        // Animate sail vertices for wind effect
        const positions = sailGeometry.attributes.position;
        for (let i = 0; i < positions.count; i++) {
            const y = positions.getY(i);
            const x = positions.getX(i);
            positions.setZ(i, Math.sin(y * 0.5) * 0.15 + Math.random() * 0.05);
        }
        sailGeometry.computeVertexNormals();
        
        const sail = new THREE.Mesh(sailGeometry, sailMaterial);
        sail.position.set(0.5, 3.5, 0.3);
        sail.rotation.y = 0.1;
        boat.add(sail);
        
        // Ropes
        for (let i = 0; i < 3; i++) {
            const ropeGeometry = new THREE.CylinderGeometry(0.02, 0.02, 5, 6);
            const ropeMesh = new THREE.Mesh(ropeGeometry, rope);
            ropeMesh.position.set(i === 1 ? 0.5 : (i === 0 ? -0.5 : 1.5), 2.7, 0);
            ropeMesh.rotation.x = 0.3;
            boat.add(ropeMesh);
        }
        
        // Storage crates (fishermen's gear)
        const crateGeometry = new THREE.BoxGeometry(0.5, 0.4, 0.5);
        const crate1 = new THREE.Mesh(crateGeometry, darkWood);
        crate1.position.set(-1.5, 0.35, 0.3);
        crate1.rotation.y = 0.3;
        crate1.castShadow = true;
        boat.add(crate1);
        
        const crate2 = crate1.clone();
        crate2.position.set(1.8, 0.35, -0.2);
        crate2.rotation.y = -0.5;
        boat.add(crate2);
        
        // Fishing net (simple)
        const netGeometry = new THREE.PlaneGeometry(1, 0.8, 8, 8);
        const netMaterial = new THREE.MeshStandardMaterial({
            color: 0x8b7355,
            wireframe: true,
            transparent: true,
            opacity: 0.6
        });
        const net = new THREE.Mesh(netGeometry, netMaterial);
        net.position.set(-2, 0.3, -0.4);
        net.rotation.x = -Math.PI / 4;
        boat.add(net);
        
        // Position boat on water
        boat.position.y = 0.3;
        boat.userData.isBoat = true;
        
        return boat;
    }
    
    // Animate boat bobbing and rocking
    static animate(boat, time) {
        if (!boat || !boat.userData.isBoat) return;
        
        // Gentle bobbing
        boat.position.y = 0.3 + Math.sin(time * 0.8) * 0.15;
        
        // Slight rocking
        boat.rotation.z = Math.sin(time * 0.6) * 0.04;
        boat.rotation.x = Math.cos(time * 0.5) * 0.03;
    }
}
