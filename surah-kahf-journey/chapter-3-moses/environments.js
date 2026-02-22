// Environment Factory - Creates detailed, realistic environments
// Focus on nature and architecture (permissible in Islam)

class EnvironmentFactory {
    // Clear scene (remove old environment)
    static clearScene(scene) {
        const objectsToRemove = [];
        scene.traverse((child) => {
            if (child.userData && child.userData.environment) {
                objectsToRemove.push(child);
            }
        });
        objectsToRemove.forEach(obj => scene.remove(obj));
    }
    
    // Create shore environment
    static createShore(scene) {
        scene.background = new THREE.Color(0x87ceeb);
        scene.fog = new THREE.Fog(0x87ceeb, 20, 60);
        
        // Ground (sand)
        const groundGeometry = new THREE.PlaneGeometry(100, 100);
        const groundMaterial = new THREE.MeshLambertMaterial({ color: 0xc2b280 });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = 0;
        ground.receiveShadow = true;
        ground.userData.environment = true;
        scene.add(ground);
        
        // Water (ocean)
        const waterGeometry = new THREE.PlaneGeometry(100, 50);
        const waterMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x1e5a8e,
            transparent: true,
            opacity: 0.8
        });
        const water = new THREE.Mesh(waterGeometry, waterMaterial);
        water.rotation.x = -Math.PI / 2;
        water.position.set(0, 0.1, -30);
        water.userData.environment = true;
        water.userData.isWater = true;
        scene.add(water);
        
        // Rocks scattered on shore
        for (let i = 0; i < 15; i++) {
            const rockSize = Math.random() * 0.5 + 0.3;
            const rockGeometry = new THREE.DodecahedronGeometry(rockSize, 0);
            const rockMaterial = new THREE.MeshLambertMaterial({ 
                color: 0x6b5a4a,
                flatShading: true
            });
            const rock = new THREE.Mesh(rockGeometry, rockMaterial);
            rock.position.set(
                (Math.random() - 0.5) * 30,
                rockSize * 0.3,
                (Math.random() - 0.5) * 15
            );
            rock.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );
            rock.castShadow = true;
            rock.userData.environment = true;
            scene.add(rock);
        }
        
        // Palm trees
        for (let i = 0; i < 5; i++) {
            const palm = this.createPalmTree();
            palm.position.set(
                (Math.random() - 0.5) * 40,
                0,
                Math.random() * 10 + 5
            );
            palm.userData.environment = true;
            scene.add(palm);
        }
    }
    
    // Create boat scene
    static createBoatScene(scene) {
        scene.background = new THREE.Color(0x87ceeb);
        scene.fog = new THREE.Fog(0x87ceeb, 15, 50);
        
        // Ocean (all around)
        const waterGeometry = new THREE.PlaneGeometry(200, 200);
        const waterMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x1e5a8e,
            transparent: true,
            opacity: 0.9
        });
        const water = new THREE.Mesh(waterGeometry, waterMaterial);
        water.rotation.x = -Math.PI / 2;
        water.position.y = 0;
        water.userData.environment = true;
        water.userData.isWater = true;
        scene.add(water);
        
        // Simple boat (wooden planks)
        const boat = new THREE.Group();
        
        // Hull
        const hullGeometry = new THREE.BoxGeometry(5, 0.8, 2.5);
        const woodMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x5d4e37,
            flatShading: true
        });
        const hull = new THREE.Mesh(hullGeometry, woodMaterial);
        hull.position.y = 0.4;
        boat.add(hull);
        
        // Deck
        const deckGeometry = new THREE.BoxGeometry(4.5, 0.15, 2.2);
        const deck = new THREE.Mesh(deckGeometry, woodMaterial);
        deck.position.y = 0.85;
        boat.add(deck);
        
        // Side planks
        const plankGeometry = new THREE.BoxGeometry(5, 0.5, 0.1);
        const leftPlank = new THREE.Mesh(plankGeometry, woodMaterial);
        leftPlank.position.set(0, 0.6, 1.25);
        boat.add(leftPlank);
        
        const rightPlank = leftPlank.clone();
        rightPlank.position.z = -1.25;
        boat.add(rightPlank);
        
        // Mast
        const mastGeometry = new THREE.CylinderGeometry(0.1, 0.12, 4, 8);
        const mast = new THREE.Mesh(mastGeometry, woodMaterial);
        mast.position.set(0, 3, 0);
        boat.add(mast);
        
        // Simple sail
        const sailGeometry = new THREE.PlaneGeometry(3, 2.5);
        const sailMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xf5f5dc,
            side: THREE.DoubleSide
        });
        const sail = new THREE.Mesh(sailGeometry, sailMaterial);
        sail.position.set(0, 3, 0.2);
        boat.add(sail);
        
        boat.position.y = 0.5;
        boat.userData.environment = true;
        boat.userData.isBoat = true;
        scene.add(boat);
    }
    
    // Create village
    static createVillage(scene) {
        scene.background = new THREE.Color(0xd4a574);
        scene.fog = new THREE.Fog(0xd4a574, 20, 60);
        
        // Ground (earth/dirt)
        const groundGeometry = new THREE.PlaneGeometry(100, 100);
        const groundMaterial = new THREE.MeshLambertMaterial({ color: 0xa67c52 });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        ground.userData.environment = true;
        scene.add(ground);
        
        // Simple clay houses (abstract, no people visible)
        const housePositions = [
            { x: -8, z: -10 },
            { x: 8, z: -12 },
            { x: -6, z: -18 },
            { x: 10, z: -20 },
            { x: 0, z: -25 }
        ];
        
        housePositions.forEach(pos => {
            const house = this.createSimpleHouse();
            house.position.set(pos.x, 0, pos.z);
            house.userData.environment = true;
            scene.add(house);
        });
        
        // Trees
        for (let i = 0; i < 8; i++) {
            const tree = this.createSimpleTree();
            tree.position.set(
                (Math.random() - 0.5) * 40,
                0,
                (Math.random() - 0.5) * 30 - 10
            );
            tree.userData.environment = true;
            scene.add(tree);
        }
    }
    
    // Create town
    static createTown(scene) {
        scene.background = new THREE.Color(0xc9a86a);
        scene.fog = new THREE.Fog(0xc9a86a, 20, 60);
        
        // Ground (stone street)
        const groundGeometry = new THREE.PlaneGeometry(100, 100);
        const groundMaterial = new THREE.MeshLambertMaterial({ color: 0x8b7355 });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        ground.userData.environment = true;
        scene.add(ground);
        
        // Stone buildings
        const buildingPositions = [
            { x: -12, z: -15, w: 6, h: 5, d: 6 },
            { x: 10, z: -18, w: 7, h: 6, d: 5 },
            { x: -8, z: -25, w: 5, h: 4, d: 7 },
            { x: 14, z: -28, w: 6, h: 7, d: 6 }
        ];
        
        buildingPositions.forEach(pos => {
            const building = this.createStoneBuilding(pos.w, pos.h, pos.d);
            building.position.set(pos.x, 0, pos.z);
            building.userData.environment = true;
            scene.add(building);
        });
        
        // The wall (important to story)
        const wallGeometry = new THREE.BoxGeometry(15, 3, 0.8);
        const wallMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x9b8b7a,
            flatShading: true
        });
        const wall = new THREE.Mesh(wallGeometry, wallMaterial);
        wall.position.set(5, 1.5, -5);
        wall.castShadow = true;
        wall.receiveShadow = true;
        wall.userData.environment = true;
        wall.userData.isWall = true;
        scene.add(wall);
    }
    
    // Helper: Create palm tree
    static createPalmTree() {
        const tree = new THREE.Group();
        
        // Trunk
        const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.3, 4, 6);
        const trunkMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x6b4423,
            flatShading: true
        });
        const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
        trunk.position.y = 2;
        tree.add(trunk);
        
        // Leaves (simplified)
        const leavesGeometry = new THREE.ConeGeometry(1.5, 2, 6);
        const leavesMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x2d5016,
            flatShading: true
        });
        const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
        leaves.position.y = 4.5;
        tree.add(leaves);
        
        return tree;
    }
    
    // Helper: Create simple tree
    static createSimpleTree() {
        const tree = new THREE.Group();
        
        const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.25, 2.5, 6);
        const trunkMaterial = new THREE.MeshLambertMaterial({ color: 0x4a3728, flatShading: true });
        const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
        trunk.position.y = 1.25;
        tree.add(trunk);
        
        const leavesGeometry = new THREE.SphereGeometry(1.2, 6, 6);
        const leavesMaterial = new THREE.MeshLambertMaterial({ color: 0x3a5a2a, flatShading: true });
        const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
        leaves.position.y = 3;
        tree.add(leaves);
        
        return tree;
    }
    
    // Helper: Create simple house
    static createSimpleHouse() {
        const house = new THREE.Group();
        
        // Walls
        const wallsGeometry = new THREE.BoxGeometry(4, 2.5, 4);
        const wallsMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xc2a67a,
            flatShading: true
        });
        const walls = new THREE.Mesh(wallsGeometry, wallsMaterial);
        walls.position.y = 1.25;
        walls.castShadow = true;
        house.add(walls);
        
        // Roof
        const roofGeometry = new THREE.ConeGeometry(3, 1.5, 4);
        const roofMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x8b6f47,
            flatShading: true
        });
        const roof = new THREE.Mesh(roofGeometry, roofMaterial);
        roof.position.y = 3.25;
        roof.rotation.y = Math.PI / 4;
        house.add(roof);
        
        return house;
    }
    
    // Helper: Create stone building
    static createStoneBuilding(width, height, depth) {
        const building = new THREE.Group();
        
        const wallsGeometry = new THREE.BoxGeometry(width, height, depth);
        const wallsMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xa89968,
            flatShading: true
        });
        const walls = new THREE.Mesh(wallsGeometry, wallsMaterial);
        walls.position.y = height / 2;
        walls.castShadow = true;
        building.add(walls);
        
        // Flat roof
        const roofGeometry = new THREE.BoxGeometry(width + 0.5, 0.3, depth + 0.5);
        const roofMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x8b7355,
            flatShading: true
        });
        const roof = new THREE.Mesh(roofGeometry, roofMaterial);
        roof.position.y = height;
        building.add(roof);
        
        return building;
    }
    
    // Animate water
    static animateEnvironment(scene, time) {
        scene.traverse((child) => {
            if (child.userData && child.userData.isWater) {
                child.position.y = Math.sin(time * 0.5) * 0.1;
            }
            if (child.userData && child.userData.isBoat) {
                child.position.y = 0.5 + Math.sin(time * 0.4) * 0.15;
                child.rotation.z = Math.sin(time * 0.3) * 0.05;
            }
        });
    }
}
