// Improved Village Environment for Moses Chapter
// Ancient Middle Eastern village with clay houses

class ImprovedVillage {
    static create(scene) {
        // Ground - dusty earth with variation
        const groundGeometry = new THREE.PlaneGeometry(100, 100, 30, 30);
        const positions = groundGeometry.attributes.position;
        for (let i = 0; i < positions.count; i++) {
            positions.setZ(i, (Math.random() - 0.5) * 0.5);
        }
        groundGeometry.computeVertexNormals();
        
        const groundMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xa67c52,
            roughness: 0.95,
            metalness: 0.05
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        ground.userData.environment = true;
        scene.add(ground);
        
        // Create village layout
        const housePositions = [
            { x: -10, z: -8, size: 1.2 },
            { x: 8, z: -10, size: 1.0 },
            { x: -7, z: -15, size: 1.3 },
            { x: 12, z: -18, size: 0.9 },
            { x: 0, z: -20, size: 1.4 },
            { x: -15, z: -12, size: 1.1 },
            { x: 5, z: -25, size: 1.0 }
        ];
        
        housePositions.forEach(pos => {
            const house = this.createClayHouse(pos.size);
            house.position.set(pos.x, 0, pos.z);
            house.rotation.y = Math.random() * Math.PI * 2;
            house.userData.environment = true;
            scene.add(house);
        });
        
        // Central dirt path
        const pathGeometry = new THREE.PlaneGeometry(3, 40);
        const pathMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x8b7355,
            roughness: 0.95
        });
        const path = new THREE.Mesh(pathGeometry, pathMaterial);
        path.rotation.x = -Math.PI / 2;
        path.position.set(0, 0.05, -15);
        path.userData.environment = true;
        scene.add(path);
        
        // Wells and market area
        const well = this.createWell();
        well.position.set(-3, 0, -12);
        well.userData.environment = true;
        scene.add(well);
        
        // Stone walls/fences
        for (let i = 0; i < 8; i++) {
            const wall = this.createStoneWall();
            wall.position.set(
                (Math.random() - 0.5) * 30,
                0,
                -10 + Math.random() * -20
            );
            wall.rotation.y = Math.random() * Math.PI;
            wall.userData.environment = true;
            scene.add(wall);
        }
        
        // Scattered rocks and debris
        for (let i = 0; i < 25; i++) {
            const rockSize = Math.random() * 0.4 + 0.2;
            const rockGeometry = new THREE.DodecahedronGeometry(rockSize, 0);
            const rockMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x6b5a4a,
                roughness: 0.9
            });
            const rock = new THREE.Mesh(rockGeometry, rockMaterial);
            rock.position.set(
                (Math.random() - 0.5) * 40,
                rockSize * 0.3,
                (Math.random() - 0.5) * 30 - 10
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
        
        // Sparse desert vegetation
        for (let i = 0; i < 10; i++) {
            const bush = this.createDesertBush();
            bush.position.set(
                (Math.random() - 0.5) * 50,
                0,
                (Math.random() - 0.5) * 40 - 10
            );
            bush.userData.environment = true;
            scene.add(bush);
        }
    }
    
    static createClayHouse(scale = 1) {
        const house = new THREE.Group();
        
        // Clay color variations
        const clayColors = [0xc19a6b, 0xd2b48c, 0xb8956a];
        const clayColor = clayColors[Math.floor(Math.random() * clayColors.length)];
        
        // Main walls
        const wallsGeometry = new THREE.BoxGeometry(3 * scale, 2.5 * scale, 3 * scale);
        const wallsMaterial = new THREE.MeshStandardMaterial({ 
            color: clayColor,
            roughness: 0.9,
            metalness: 0.05
        });
        const walls = new THREE.Mesh(wallsGeometry, wallsMaterial);
        walls.position.y = (2.5 * scale) / 2;
        walls.castShadow = true;
        walls.receiveShadow = true;
        house.add(walls);
        
        // Flat clay roof
        const roofGeometry = new THREE.BoxGeometry(3.5 * scale, 0.3 * scale, 3.5 * scale);
        const roofMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xa0826d,
            roughness: 0.95
        });
        const roof = new THREE.Mesh(roofGeometry, roofMaterial);
        roof.position.y = 2.5 * scale + 0.15 * scale;
        roof.castShadow = true;
        house.add(roof);
        
        // Door (dark opening)
        const doorGeometry = new THREE.BoxGeometry(0.8 * scale, 1.5 * scale, 0.1 * scale);
        const doorMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x3d2817,
            roughness: 0.85
        });
        const door = new THREE.Mesh(doorGeometry, doorMaterial);
        door.position.set(0, 0.75 * scale, 1.51 * scale);
        house.add(door);
        
        // Small window
        const windowGeometry = new THREE.BoxGeometry(0.5 * scale, 0.5 * scale, 0.1 * scale);
        const windowMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x1a1a1a,
            roughness: 0.3,
            metalness: 0.1
        });
        const window1 = new THREE.Mesh(windowGeometry, windowMaterial);
        window1.position.set(0.8 * scale, 1.5 * scale, 1.51 * scale);
        house.add(window1);
        
        // Wooden beam details
        const beamGeometry = new THREE.BoxGeometry(3.6 * scale, 0.1 * scale, 0.15 * scale);
        const beamMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x5d4e37,
            roughness: 0.8
        });
        const beam = new THREE.Mesh(beamGeometry, beamMaterial);
        beam.position.set(0, 2.4 * scale, 1.6 * scale);
        house.add(beam);
        
        return house;
    }
    
    static createWell() {
        const well = new THREE.Group();
        
        // Stone ring
        const ringGeometry = new THREE.TorusGeometry(0.8, 0.2, 8, 12);
        const stoneMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x6b5a4a,
            roughness: 0.9
        });
        const ring = new THREE.Mesh(ringGeometry, stoneMaterial);
        ring.rotation.x = Math.PI / 2;
        ring.position.y = 0.4;
        ring.castShadow = true;
        well.add(ring);
        
        // Supporting posts
        const postGeometry = new THREE.CylinderGeometry(0.08, 0.08, 1.5, 8);
        const woodMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x5d4e37,
            roughness: 0.8
        });
        
        const post1 = new THREE.Mesh(postGeometry, woodMaterial);
        post1.position.set(0.7, 0.75, 0);
        well.add(post1);
        
        const post2 = post1.clone();
        post2.position.set(-0.7, 0.75, 0);
        well.add(post2);
        
        // Cross beam with rope wheel
        const beamGeometry = new THREE.CylinderGeometry(0.06, 0.06, 1.6, 8);
        const beam = new THREE.Mesh(beamGeometry, woodMaterial);
        beam.rotation.z = Math.PI / 2;
        beam.position.y = 1.4;
        well.add(beam);
        
        // Bucket hanging
        const bucketGeometry = new THREE.CylinderGeometry(0.2, 0.25, 0.3, 8);
        const bucket = new THREE.Mesh(bucketGeometry, woodMaterial);
        bucket.position.set(0, 0.8, 0.5);
        well.add(bucket);
        
        return well;
    }
    
    static createStoneWall() {
        const wall = new THREE.Group();
        
        const stoneMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x8b8680,
            roughness: 0.95
        });
        
        // Create irregular stone wall
        for (let i = 0; i < 5; i++) {
            const stoneGeometry = new THREE.BoxGeometry(
                0.4 + Math.random() * 0.3,
                0.4 + Math.random() * 0.2,
                0.3
            );
            const stone = new THREE.Mesh(stoneGeometry, stoneMaterial);
            stone.position.set(i * 0.5 - 1, 0.2 + Math.random() * 0.1, 0);
            stone.rotation.set(
                (Math.random() - 0.5) * 0.3,
                (Math.random() - 0.5) * 0.3,
                (Math.random() - 0.5) * 0.2
            );
            stone.castShadow = true;
            wall.add(stone);
        }
        
        return wall;
    }
    
    static createDesertBush() {
        const bush = new THREE.Group();
        
        const leafMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x6b8e23,
            roughness: 0.9
        });
        
        // Sparse desert plant
        for (let i = 0; i < 5; i++) {
            const leafGeometry = new THREE.ConeGeometry(0.1, 0.4 + Math.random() * 0.3, 4);
            const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
            leaf.position.set(
                (Math.random() - 0.5) * 0.3,
                0.2,
                (Math.random() - 0.5) * 0.3
            );
            leaf.rotation.set(
                Math.random() * 0.5,
                Math.random() * Math.PI * 2,
                Math.random() * 0.5
            );
            bush.add(leaf);
        }
        
        return bush;
    }
}
