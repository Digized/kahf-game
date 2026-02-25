// Improved Town Environment for Moses Chapter
// Prosperous town with stone buildings and walls

class ImprovedTown {
    static create(scene) {
        // Ground - paved stone streets
        const groundGeometry = new THREE.PlaneGeometry(100, 100, 25, 25);
        const positions = groundGeometry.attributes.position;
        for (let i = 0; i < positions.count; i++) {
            positions.setZ(i, (Math.random() - 0.5) * 0.2);
        }
        groundGeometry.computeVertexNormals();
        
        const groundMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x8b8680,
            roughness: 0.9,
            metalness: 0.1
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        ground.userData.environment = true;
        scene.add(ground);
        
        // Create town buildings (larger, more prosperous)
        const buildingPositions = [
            { x: -12, z: -8, width: 4, height: 3.5, depth: 4 },
            { x: 10, z: -10, width: 5, height: 4, depth: 4.5 },
            { x: -8, z: -16, width: 3.5, height: 3, depth: 3.5 },
            { x: 15, z: -20, width: 4.5, height: 4.5, depth: 5 },
            { x: 0, z: -24, width: 6, height: 5, depth: 5 },
            { x: -16, z: -14, width: 4, height: 3.5, depth: 4 },
            { x: 8, z: -28, width: 3.5, height: 3, depth: 3.5 }
        ];
        
        buildingPositions.forEach(pos => {
            const building = this.createStoneBuilding(pos.width, pos.height, pos.depth);
            building.position.set(pos.x, 0, pos.z);
            building.rotation.y = (Math.random() - 0.5) * 0.5;
            building.userData.environment = true;
            scene.add(building);
        });
        
        // Main street
        const streetGeometry = new THREE.PlaneGeometry(4, 50);
        const streetMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x6b6660,
            roughness: 0.85
        });
        const street = new THREE.Mesh(streetGeometry, streetMaterial);
        street.rotation.x = -Math.PI / 2;
        street.position.set(0, 0.05, -18);
        street.userData.environment = true;
        scene.add(street);
        
        // Town wall (the one Al-Khidr repairs)
        const damagedWall = this.createDamagedWall();
        damagedWall.position.set(18, 0, -5);
        damagedWall.rotation.y = -Math.PI / 6;
        damagedWall.userData.environment = true;
        damagedWall.userData.isTargetWall = true;
        scene.add(damagedWall);
        
        // Market stalls
        for (let i = 0; i < 6; i++) {
            const stall = this.createMarketStall();
            stall.position.set(
                -4 + (i % 2) * 8,
                0,
                -8 - Math.floor(i / 2) * 4
            );
            stall.rotation.y = (i % 2) === 0 ? Math.PI / 2 : -Math.PI / 2;
            stall.userData.environment = true;
            scene.add(stall);
        }
        
        // Decorative elements
        for (let i = 0; i < 12; i++) {
            const pot = this.createCeramicPot();
            pot.position.set(
                (Math.random() - 0.5) * 30,
                0,
                -5 + (Math.random() - 0.5) * 30
            );
            pot.userData.environment = true;
            scene.add(pot);
        }
        
        // Stone benches
        for (let i = 0; i < 5; i++) {
            const bench = this.createStoneBench();
            bench.position.set(
                (Math.random() - 0.5) * 25,
                0,
                -10 + Math.random() * -20
            );
            bench.rotation.y = Math.random() * Math.PI * 2;
            bench.userData.environment = true;
            scene.add(bench);
        }
    }
    
    static createStoneBuilding(width, height, depth) {
        const building = new THREE.Group();
        
        // Stone walls
        const wallsGeometry = new THREE.BoxGeometry(width, height, depth);
        const wallsMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xc0b8a8,
            roughness: 0.85,
            metalness: 0.1
        });
        const walls = new THREE.Mesh(wallsGeometry, wallsMaterial);
        walls.position.y = height / 2;
        walls.castShadow = true;
        walls.receiveShadow = true;
        building.add(walls);
        
        // Stone blocks texture (details)
        const blockMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xa0988a,
            roughness: 0.9
        });
        
        // Add stone block details to corners
        for (let corner of [-1, 1]) {
            for (let i = 0; i < height; i += 0.5) {
                const block = new THREE.Mesh(
                    new THREE.BoxGeometry(0.15, 0.4, 0.15),
                    blockMaterial
                );
                block.position.set(corner * width / 2, i + 0.2, depth / 2);
                building.add(block);
            }
        }
        
        // Flat roof with parapet
        const roofGeometry = new THREE.BoxGeometry(width + 0.4, 0.3, depth + 0.4);
        const roofMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xa89968,
            roughness: 0.95
        });
        const roof = new THREE.Mesh(roofGeometry, roofMaterial);
        roof.position.y = height + 0.15;
        roof.castShadow = true;
        building.add(roof);
        
        // Parapet walls
        const parapetGeometry = new THREE.BoxGeometry(width + 0.5, 0.4, 0.2);
        const parapetMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xb0a898,
            roughness: 0.9
        });
        
        const parapet1 = new THREE.Mesh(parapetGeometry, parapetMaterial);
        parapet1.position.set(0, height + 0.5, depth / 2 + 0.25);
        building.add(parapet1);
        
        const parapet2 = parapet1.clone();
        parapet2.position.z = -depth / 2 - 0.25;
        building.add(parapet2);
        
        // Arched doorway
        const doorGeometry = new THREE.BoxGeometry(1, 2, 0.2);
        const doorMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x4a3020,
            roughness: 0.8
        });
        const door = new THREE.Mesh(doorGeometry, doorMaterial);
        door.position.set(0, 1, depth / 2 + 0.1);
        building.add(door);
        
        // Arch top
        const archGeometry = new THREE.TorusGeometry(0.6, 0.1, 8, 12, Math.PI);
        const archMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x8b8070,
            roughness: 0.9
        });
        const arch = new THREE.Mesh(archGeometry, archMaterial);
        arch.rotation.x = Math.PI / 2;
        arch.position.set(0, 2, depth / 2 + 0.15);
        building.add(arch);
        
        // Windows
        const windowGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.1);
        const windowMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x2a2a2a,
            roughness: 0.3,
            metalness: 0.2
        });
        
        for (let i = 0; i < 2; i++) {
            const window1 = new THREE.Mesh(windowGeometry, windowMaterial);
            window1.position.set((i - 0.5) * width * 0.5, height * 0.6, depth / 2 + 0.05);
            building.add(window1);
        }
        
        return building;
    }
    
    static createDamagedWall() {
        const wall = new THREE.Group();
        
        const stoneMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x8b8070,
            roughness: 0.95
        });
        
        // Create wall sections (some fallen/damaged)
        const sections = [
            { x: 0, y: 1.2, height: 2.5, intact: true },
            { x: 1.5, y: 0.8, height: 1.8, intact: false }, // Damaged section
            { x: 3, y: 1, height: 2.2, intact: true },
            { x: 4.5, y: 0.5, height: 1.2, intact: false }, // Damaged section
            { x: 6, y: 1.1, height: 2.3, intact: true }
        ];
        
        sections.forEach(section => {
            const sectionGeometry = new THREE.BoxGeometry(1.2, section.height, 0.6);
            const sectionMesh = new THREE.Mesh(sectionGeometry, stoneMaterial);
            sectionMesh.position.set(section.x, section.y, 0);
            
            if (!section.intact) {
                // Tilt damaged sections
                sectionMesh.rotation.z = (Math.random() - 0.5) * 0.4;
                sectionMesh.rotation.x = (Math.random() - 0.5) * 0.3;
            }
            
            sectionMesh.castShadow = true;
            wall.add(sectionMesh);
        });
        
        // Fallen stones around base
        for (let i = 0; i < 8; i++) {
            const stoneSize = 0.2 + Math.random() * 0.3;
            const stoneGeometry = new THREE.BoxGeometry(stoneSize, stoneSize * 0.8, stoneSize);
            const stone = new THREE.Mesh(stoneGeometry, stoneMaterial);
            stone.position.set(
                Math.random() * 6,
                stoneSize * 0.4,
                (Math.random() - 0.5) * 2
            );
            stone.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );
            stone.castShadow = true;
            wall.add(stone);
        }
        
        return wall;
    }
    
    static createMarketStall() {
        const stall = new THREE.Group();
        
        // Frame posts
        const postGeometry = new THREE.CylinderGeometry(0.05, 0.05, 2, 8);
        const woodMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x5d4e37,
            roughness: 0.8
        });
        
        for (let x of [-0.8, 0.8]) {
            for (let z of [-0.6, 0.6]) {
                const post = new THREE.Mesh(postGeometry, woodMaterial);
                post.position.set(x, 1, z);
                stall.add(post);
            }
        }
        
        // Canopy
        const canopyGeometry = new THREE.BoxGeometry(2, 0.1, 1.5);
        const canopyMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xd4a574,
            roughness: 0.85
        });
        const canopy = new THREE.Mesh(canopyGeometry, canopyMaterial);
        canopy.position.y = 2;
        stall.add(canopy);
        
        // Counter
        const counterGeometry = new THREE.BoxGeometry(1.8, 0.8, 0.5);
        const counter = new THREE.Mesh(counterGeometry, woodMaterial);
        counter.position.set(0, 0.4, 0.4);
        stall.add(counter);
        
        // Goods (crates/baskets)
        const crateGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
        for (let i = 0; i < 3; i++) {
            const crate = new THREE.Mesh(crateGeometry, woodMaterial);
            crate.position.set(-0.5 + i * 0.5, 0.95, 0.3);
            stall.add(crate);
        }
        
        return stall;
    }
    
    static createCeramicPot() {
        const potGeometry = new THREE.CylinderGeometry(0.3, 0.25, 0.5, 12);
        const potMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xc19a6b,
            roughness: 0.7,
            metalness: 0.1
        });
        const pot = new THREE.Mesh(potGeometry, potMaterial);
        pot.position.y = 0.25;
        pot.castShadow = true;
        return pot;
    }
    
    static createStoneBench() {
        const bench = new THREE.Group();
        
        const stoneMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x8b8680,
            roughness: 0.9
        });
        
        // Seat
        const seatGeometry = new THREE.BoxGeometry(1.5, 0.2, 0.4);
        const seat = new THREE.Mesh(seatGeometry, stoneMaterial);
        seat.position.y = 0.4;
        seat.castShadow = true;
        bench.add(seat);
        
        // Legs
        const legGeometry = new THREE.BoxGeometry(0.2, 0.4, 0.2);
        for (let x of [-0.6, 0.6]) {
            const leg = new THREE.Mesh(legGeometry, stoneMaterial);
            leg.position.set(x, 0.2, 0);
            bench.add(leg);
        }
        
        return bench;
    }
}
