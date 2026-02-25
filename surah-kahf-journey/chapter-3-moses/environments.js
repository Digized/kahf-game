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
        
        // Ground (sand with texture variation)
        const groundGeometry = new THREE.PlaneGeometry(100, 100, 20, 20);
        const positions = groundGeometry.attributes.position;
        for (let i = 0; i < positions.count; i++) {
            positions.setZ(i, Math.random() * 0.3 - 0.15);
        }
        groundGeometry.computeVertexNormals();
        
        const groundMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xc2b280,
            roughness: 0.95,
            metalness: 0.05
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = 0;
        ground.receiveShadow = true;
        ground.userData.environment = true;
        scene.add(ground);
        
        // Water (ocean) with waves
        const waterGeometry = new THREE.PlaneGeometry(100, 50, 30, 20);
        const waterPositions = waterGeometry.attributes.position;
        for (let i = 0; i < waterPositions.count; i++) {
            const x = waterPositions.getX(i);
            const y = waterPositions.getY(i);
            const wave = Math.sin(x * 0.1) * Math.cos(y * 0.1) * 0.4;
            waterPositions.setZ(i, wave);
        }
        waterGeometry.computeVertexNormals();
        
        const waterMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x1e5a8e,
            transparent: true,
            opacity: 0.8,
            roughness: 0.3,
            metalness: 0.2
        });
        const water = new THREE.Mesh(waterGeometry, waterMaterial);
        water.rotation.x = -Math.PI / 2;
        water.position.set(0, 0.1, -30);
        water.userData.environment = true;
        water.userData.isWater = true;
        scene.add(water);
        
        // Larger, more varied rocks
        const rockMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x6b5a4a,
            roughness: 0.9,
            metalness: 0.1
        });
        
        for (let i = 0; i < 20; i++) {
            const rockSize = Math.random() * 0.8 + 0.4;
            const rockGeometry = new THREE.DodecahedronGeometry(rockSize, Math.random() > 0.5 ? 1 : 0);
            const rock = new THREE.Mesh(rockGeometry, rockMaterial);
            rock.position.set(
                (Math.random() - 0.5) * 35,
                rockSize * 0.4,
                (Math.random() - 0.5) * 20
            );
            rock.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );
            rock.scale.set(
                1 + Math.random() * 0.5,
                0.5 + Math.random() * 0.5,
                1 + Math.random() * 0.5
            );
            rock.castShadow = true;
            rock.userData.environment = true;
            scene.add(rock);
        }
        
        // Palm trees with more detail
        for (let i = 0; i < 8; i++) {
            const palm = this.createPalmTree();
            palm.position.set(
                (Math.random() - 0.5) * 45,
                0,
                Math.random() * 15 + 5
            );
            palm.rotation.y = Math.random() * Math.PI * 2;
            palm.castShadow = true;
            palm.userData.environment = true;
            scene.add(palm);
        }
        
        // Add some driftwood
        for (let i = 0; i < 5; i++) {
            const logGeometry = new THREE.CylinderGeometry(0.15, 0.2, 2 + Math.random() * 2, 8);
            const logMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x5d4e37,
                roughness: 0.85
            });
            const log = new THREE.Mesh(logGeometry, logMaterial);
            log.rotation.z = Math.PI / 2;
            log.rotation.y = Math.random() * Math.PI;
            log.position.set(
                (Math.random() - 0.5) * 25,
                0.2,
                (Math.random() - 0.5) * 10
            );
            log.castShadow = true;
            log.userData.environment = true;
            scene.add(log);
        }
    }
    
    // Create boat scene
    static createBoatScene(scene) {
        scene.background = new THREE.Color(0x87ceeb);
        scene.fog = new THREE.Fog(0x87ceeb, 15, 50);
        
        // Ocean (all around) - improved with animated waves
        const waterGeometry = new THREE.PlaneGeometry(200, 200, 50, 50);
        const waterMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x1e5a8e,
            transparent: true,
            opacity: 0.85,
            roughness: 0.4,
            metalness: 0.1
        });
        
        // Add wave-like displacement
        const positions = waterGeometry.attributes.position;
        for (let i = 0; i < positions.count; i++) {
            const x = positions.getX(i);
            const y = positions.getY(i);
            const wave = Math.sin(x * 0.1) * Math.cos(y * 0.1) * 0.3;
            positions.setZ(i, wave);
        }
        waterGeometry.computeVertexNormals();
        
        const water = new THREE.Mesh(waterGeometry, waterMaterial);
        water.rotation.x = -Math.PI / 2;
        water.position.y = 0;
        water.userData.environment = true;
        water.userData.isWater = true;
        scene.add(water);
        
        // Use improved boat model
        const boat = ImprovedBoat.create();
        boat.userData.environment = true;
        scene.add(boat);
        
        // Distant shoreline
        const shoreGeometry = new THREE.BoxGeometry(100, 3, 10);
        const shoreMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xa0826d,
            roughness: 0.9
        });
        const shore = new THREE.Mesh(shoreGeometry, shoreMaterial);
        shore.position.set(0, 1, -40);
        shore.userData.environment = true;
        scene.add(shore);
    }
    
    // Create village
    static createVillage(scene) {
        scene.background = new THREE.Color(0xd4a574);
        scene.fog = new THREE.Fog(0xd4a574, 20, 60);
        
        ImprovedVillage.create(scene);
    }
    
    // Old village (backup)
    static createVillageOld(scene) {
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
        
        ImprovedTown.create(scene);
    }
    
    // Old town (backup)
    static createTownOld(scene) {
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
    
    // Animate water and environment elements
    static animateEnvironment(scene, time) {
        scene.traverse((child) => {
            // Animated water surface
            if (child.userData && child.userData.isWater && child.geometry) {
                const positions = child.geometry.attributes.position;
                if (positions) {
                    for (let i = 0; i < positions.count; i++) {
                        const x = positions.getX(i);
                        const y = positions.getY(i);
                        const wave = Math.sin(x * 0.1 + time) * Math.cos(y * 0.1 + time * 0.7) * 0.3;
                        positions.setZ(i, wave);
                    }
                    positions.needsUpdate = true;
                    child.geometry.computeVertexNormals();
                }
            }
            
            // Animated boat
            if (child.userData && child.userData.isBoat) {
                ImprovedBoat.animate(child, time);
            }
        });
    }
}
