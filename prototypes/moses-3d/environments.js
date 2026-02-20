// Environment creation for each scene
class EnvironmentFactory {
    
    // Create ocean/water scene with boat
    static createBoatScene(scene) {
        // Clear existing objects
        EnvironmentFactory.clearScene(scene);
        
        // Water plane (warm Mediterranean blue)
        const waterGeometry = new THREE.PlaneGeometry(60, 60, 10, 10);
        const waterMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x3A5F7D,
            flatShading: true,
            side: THREE.DoubleSide 
        });
        const water = new THREE.Mesh(waterGeometry, waterMaterial);
        water.rotation.x = -Math.PI / 2;
        water.position.y = -0.5;
        
        // Add gentle wave variation
        const positions = water.geometry.attributes.position;
        for (let i = 0; i < positions.count; i++) {
            const x = positions.getX(i);
            const y = positions.getY(i);
            positions.setZ(i, Math.sin(x * 0.5) * 0.1 + Math.cos(y * 0.5) * 0.1);
        }
        positions.needsUpdate = true;
        
        scene.add(water);
        scene.userData.water = water;
        
        // Boat (improved detail)
        const boat = new THREE.Group();
        
        // Hull (more realistic shape)
        const hullGeometry = new THREE.BoxGeometry(3.2, 0.6, 1.8);
        const hullMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x5D4E37,
            flatShading: true
        });
        const hull = new THREE.Mesh(hullGeometry, hullMaterial);
        hull.position.y = 0.3;
        boat.add(hull);
        
        // Hull sides (darker)
        const sideGeometry = new THREE.BoxGeometry(3.2, 0.4, 0.1);
        const sideMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x4A3A25,
            flatShading: true
        });
        const leftSide = new THREE.Mesh(sideGeometry, sideMaterial);
        leftSide.position.set(0, 0.5, 0.95);
        const rightSide = new THREE.Mesh(sideGeometry, sideMaterial);
        rightSide.position.set(0, 0.5, -0.95);
        boat.add(leftSide);
        boat.add(rightSide);
        
        // Bow (front)
        const bowGeometry = new THREE.ConeGeometry(0.9, 1.2, 6);
        const bowMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x5D4E37,
            flatShading: true
        });
        const bow = new THREE.Mesh(bowGeometry, bowMaterial);
        bow.rotation.z = -Math.PI / 2;
        bow.position.set(2.2, 0.3, 0);
        boat.add(bow);
        
        // Deck planks (raised to prevent z-fighting)
        const plankGeometry = new THREE.BoxGeometry(3.0, 0.08, 0.3);
        const plankMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x6B5A4A,
            flatShading: true
        });
        for (let i = -2; i <= 2; i++) {
            const plank = new THREE.Mesh(plankGeometry, plankMaterial);
            plank.position.set(0, 0.68, i * 0.4);  // Raised from 0.65 to 0.68
            boat.add(plank);
        }
        
        // Mast
        const mastGeometry = new THREE.CylinderGeometry(0.12, 0.14, 3.2, 8);
        const mastMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x6B4423,
            flatShading: true
        });
        const mast = new THREE.Mesh(mastGeometry, mastMaterial);
        mast.position.y = 2.2;
        boat.add(mast);
        
        // Sail (warm linen)
        const sailGeometry = new THREE.PlaneGeometry(1.6, 2.2);
        const sailMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xE8DCC8,
            flatShading: true,
            side: THREE.DoubleSide 
        });
        const sail = new THREE.Mesh(sailGeometry, sailMaterial);
        sail.position.set(0.6, 2.8, 0);
        sail.rotation.y = Math.PI * 0.05; // Slight billow
        boat.add(sail);
        
        // Crossbeam
        const beamGeometry = new THREE.CylinderGeometry(0.06, 0.06, 1.8, 6);
        const beamMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x6B4423,
            flatShading: true
        });
        const beam = new THREE.Mesh(beamGeometry, beamMaterial);
        beam.rotation.z = Math.PI / 2;
        beam.position.set(0.6, 3.5, 0);
        boat.add(beam);
        
        boat.position.y = 0;
        scene.add(boat);
        scene.userData.boat = boat;
        
        // Sky (warm Mediterranean)
        scene.background = new THREE.Color(0x7BA8C7);
        scene.fog = new THREE.Fog(0x7BA8C7, 15, 60);
        
        return boat;
    }
    
    // Create village scene
    static createVillageScene(scene) {
        EnvironmentFactory.clearScene(scene);
        
        // Ground (warm sandy earth)
        const groundGeometry = new THREE.PlaneGeometry(50, 50, 5, 5);
        const groundMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xC4A07A,
            flatShading: true
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -0.5;
        
        // Add subtle terrain variation
        const positions = ground.geometry.attributes.position;
        for (let i = 0; i < positions.count; i++) {
            positions.setZ(i, Math.random() * 0.08);
        }
        positions.needsUpdate = true;
        
        scene.add(ground);
        
        // Houses (clay colored)
        const houses = [];
        const housePositions = [
            [-6, 0, -6], [6, 0, -6], [-6, 0, 6], [6, 0, 6],
            [-9, 0, 0], [9, 0, 0], [0, 0, -9], [0, 0, 9]
        ];
        
        housePositions.forEach(pos => {
            const house = EnvironmentFactory.createHouse(1.0, 0xD4A574);
            house.position.set(...pos);
            scene.add(house);
            houses.push(house);
        });
        
        // Village square (packed earth - raised to prevent z-fighting)
        const squareGeometry = new THREE.PlaneGeometry(9, 9);
        const squareMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xB89970,
            flatShading: true
        });
        const square = new THREE.Mesh(squareGeometry, squareMaterial);
        square.rotation.x = -Math.PI / 2;
        square.position.y = -0.45;  // Raised from -0.48 to -0.45
        scene.add(square);
        
        // Palm trees
        for (let i = 0; i < 8; i++) {
            const tree = EnvironmentFactory.createPalmTree();
            const angle = (i / 8) * Math.PI * 2;
            const radius = 13;
            tree.position.set(
                Math.cos(angle) * radius,
                0,
                Math.sin(angle) * radius
            );
            scene.add(tree);
        }
        
        // Sky (warm afternoon)
        scene.background = new THREE.Color(0xFFD89B);
        scene.fog = new THREE.Fog(0xFFD89B, 18, 45);
        
        return houses;
    }
    
    // Create town scene with wall
    static createTownScene(scene) {
        EnvironmentFactory.clearScene(scene);
        
        // Ground (lighter stone/sand)
        const groundGeometry = new THREE.PlaneGeometry(60, 60, 5, 5);
        const groundMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xB89970,
            flatShading: true
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -0.5;
        scene.add(ground);
        
        // Wealthier houses (stone colored)
        const housePositions = [
            [-9, 0, -7], [9, 0, -7], [-9, 0, 7], [9, 0, 7],
            [-13, 0, 0], [13, 0, 0], [0, 0, -11], [0, 0, 11]
        ];
        
        housePositions.forEach(pos => {
            const house = EnvironmentFactory.createHouse(1.6, 0xC9B896);
            house.position.set(...pos);
            scene.add(house);
        });
        
        // The important wall
        const wall = EnvironmentFactory.createWall();
        wall.position.set(-16, 0, -9);
        scene.add(wall);
        scene.userData.wall = wall;
        
        // Stone path (raised to prevent z-fighting)
        const pathGeometry = new THREE.PlaneGeometry(45, 3.5);
        const pathMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xA89880,
            flatShading: true
        });
        const path = new THREE.Mesh(pathGeometry, pathMaterial);
        path.rotation.x = -Math.PI / 2;
        path.position.y = -0.45;  // Raised from -0.48 to -0.45
        scene.add(path);
        
        // Sky - warm evening
        scene.background = new THREE.Color(0xE8A870);
        scene.fog = new THREE.Fog(0xE8A870, 22, 55);
        
        return wall;
    }
    
    // Helper: Create a house
    static createHouse(scale = 1, wallColor = 0xD4A574) {
        const house = new THREE.Group();
        
        // Walls
        const wallGeometry = new THREE.BoxGeometry(2.2 * scale, 2.2 * scale, 2.2 * scale);
        const wallMaterial = new THREE.MeshLambertMaterial({ 
            color: wallColor,
            flatShading: true
        });
        const walls = new THREE.Mesh(wallGeometry, wallMaterial);
        walls.position.y = 1.1 * scale;
        house.add(walls);
        
        // Roof (flat with slight dome)
        const roofGeometry = new THREE.CylinderGeometry(1.6 * scale, 1.6 * scale, 0.3 * scale, 8);
        const roofMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x9B7355,
            flatShading: true
        });
        const roof = new THREE.Mesh(roofGeometry, roofMaterial);
        roof.position.y = 2.35 * scale;
        house.add(roof);
        
        // Door
        const doorGeometry = new THREE.BoxGeometry(0.7 * scale, 1.3 * scale, 0.15 * scale);
        const doorMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x5D4E37,
            flatShading: true
        });
        const door = new THREE.Mesh(doorGeometry, doorMaterial);
        door.position.set(0, 0.65 * scale, 1.1 * scale);
        house.add(door);
        
        // Window
        const windowGeometry = new THREE.BoxGeometry(0.5 * scale, 0.5 * scale, 0.1 * scale);
        const windowMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x4A3A2A,
            flatShading: true
        });
        const window = new THREE.Mesh(windowGeometry, windowMaterial);
        window.position.set(0.7 * scale, 1.4 * scale, 1.1 * scale);
        house.add(window);
        
        house.castShadow = true;
        return house;
    }
    
    // Helper: Create a palm tree
    static createPalmTree() {
        const tree = new THREE.Group();
        
        // Trunk (segmented)
        for (let i = 0; i < 4; i++) {
            const trunkGeometry = new THREE.CylinderGeometry(
                0.2 - i * 0.01, 
                0.22 - i * 0.01, 
                0.6, 
                6
            );
            const trunkMaterial = new THREE.MeshLambertMaterial({ 
                color: 0x8B6F47,
                flatShading: true
            });
            const segment = new THREE.Mesh(trunkGeometry, trunkMaterial);
            segment.position.y = 0.6 + i * 0.6;
            tree.add(segment);
        }
        
        // Palm fronds
        const frondGeometry = new THREE.BoxGeometry(0.15, 1.8, 0.1);
        const frondMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x4A5A2A,
            flatShading: true
        });
        
        for (let i = 0; i < 6; i++) {
            const frond = new THREE.Mesh(frondGeometry, frondMaterial);
            const angle = (i / 6) * Math.PI * 2;
            frond.position.set(
                Math.cos(angle) * 0.4,
                3.0,
                Math.sin(angle) * 0.4
            );
            frond.rotation.z = Math.cos(angle) * 0.4;
            frond.rotation.x = Math.sin(angle) * 0.4;
            tree.add(frond);
        }
        
        tree.castShadow = true;
        return tree;
    }
    
    // Helper: Create the wall that needs repair
    static createWall() {
        const wall = new THREE.Group();
        
        // Base of wall (weathered stone)
        const baseGeometry = new THREE.BoxGeometry(6.5, 3.2, 0.6);
        const baseMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x9B8B7E,
            flatShading: true
        });
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        base.position.y = 1.6;
        wall.add(base);
        
        // Stone texture details
        const detailGeometry = new THREE.BoxGeometry(6.5, 0.3, 0.65);
        const detailMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x8A7A6D,
            flatShading: true
        });
        for (let i = 0; i < 5; i++) {
            const detail = new THREE.Mesh(detailGeometry, detailMaterial);
            detail.position.y = 0.5 + i * 0.65;
            wall.add(detail);
        }
        
        // Crumbling top section (offset blocks)
        const blockGeometry = new THREE.BoxGeometry(1.1, 0.55, 0.55);
        const blockMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xAA9B8E,
            flatShading: true
        });
        
        for (let i = 0; i < 5; i++) {
            const block = new THREE.Mesh(blockGeometry, blockMaterial);
            block.position.set(
                (i - 2) * 1.3,
                3.2 + Math.random() * 0.4,
                Math.random() * 0.25
            );
            block.rotation.z = (Math.random() - 0.5) * 0.4;
            block.rotation.y = (Math.random() - 0.5) * 0.2;
            wall.add(block);
        }
        
        wall.userData.damaged = true;
        wall.castShadow = true;
        return wall;
    }
    
    // Repair the wall (visual change)
    static repairWall(wall) {
        if (!wall.userData.damaged) return;
        
        // Remove old crumbling blocks (keep base and details)
        while (wall.children.length > 6) {
            wall.remove(wall.children[wall.children.length - 1]);
        }
        
        // Add repaired top section
        const topGeometry = new THREE.BoxGeometry(6.5, 0.9, 0.6);
        const topMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xB8A898, // Fresher stone
            flatShading: true
        });
        const top = new THREE.Mesh(topGeometry, topMaterial);
        top.position.y = 3.65;
        wall.add(top);
        
        // Cap stones
        const capGeometry = new THREE.BoxGeometry(6.5, 0.2, 0.7);
        const capMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xC9B896,
            flatShading: true
        });
        const cap = new THREE.Mesh(capGeometry, capMaterial);
        cap.position.y = 4.15;
        wall.add(cap);
        
        wall.userData.damaged = false;
    }
    
    // Damage the boat (visual change)
    static damageBoat(boat) {
        if (!boat || boat.userData.damaged) return;
        
        // Add visible crack/hole
        const holeGeometry = new THREE.BoxGeometry(0.6, 0.4, 0.25);
        const holeMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x1A1A1A,
            flatShading: true
        });
        const hole = new THREE.Mesh(holeGeometry, holeMaterial);
        hole.position.set(-0.6, 0.25, 0.9);
        hole.rotation.y = 0.4;
        hole.rotation.z = -0.2;
        boat.add(hole);
        
        // Splintered wood
        const splinterGeometry = new THREE.BoxGeometry(0.15, 0.3, 0.08);
        const splinterMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x4A3A25,
            flatShading: true
        });
        for (let i = 0; i < 3; i++) {
            const splinter = new THREE.Mesh(splinterGeometry, splinterMaterial);
            splinter.position.set(
                -0.6 + (Math.random() - 0.5) * 0.4,
                0.3,
                0.9 + (Math.random() - 0.5) * 0.3
            );
            splinter.rotation.set(
                Math.random() * 0.5,
                Math.random() * Math.PI,
                Math.random() * 0.5
            );
            boat.add(splinter);
        }
        
        boat.userData.damaged = true;
    }
    
    // Animate water (subtle wave motion)
    static animateWater(water, time) {
        if (!water) return;
        const positions = water.geometry.attributes.position;
        for (let i = 0; i < positions.count; i++) {
            const x = positions.getX(i);
            const y = positions.getY(i);
            const wave = Math.sin(x * 0.3 + time) * 0.12 + Math.cos(y * 0.3 + time * 0.7) * 0.12;
            positions.setZ(i, wave);
        }
        positions.needsUpdate = true;
    }
    
    // Clear scene except lights and camera
    static clearScene(scene) {
        const objectsToRemove = [];
        scene.traverse(obj => {
            if (obj !== scene && obj.type !== 'DirectionalLight' && 
                obj.type !== 'AmbientLight' && obj.type !== 'HemisphereLight') {
                objectsToRemove.push(obj);
            }
        });
        objectsToRemove.forEach(obj => {
            if (obj.parent === scene) scene.remove(obj);
        });
    }
}
