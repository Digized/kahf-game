// Environment Factory for Dhul-Qarnayn Chapter

class EnvironmentFactory {
    static clearScene(scene) {
        const objectsToRemove = [];
        scene.traverse((child) => {
            if (child.userData && child.userData.environment) {
                objectsToRemove.push(child);
            }
        });
        objectsToRemove.forEach(obj => scene.remove(obj));
    }
    
    static createThroneRoom(scene) {
        scene.background = new THREE.Color(0x2a2838);
        scene.fog = new THREE.Fog(0x2a2838, 20, 60);
        
        // Stone floor
        const floorGeometry = new THREE.PlaneGeometry(50, 50);
        const floorMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x6b6660,
            roughness: 0.8
        });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        floor.userData.environment = true;
        scene.add(floor);
        
        // Pillars
        for (let x of [-10, -5, 5, 10]) {
            const pillar = new THREE.Mesh(
                new THREE.CylinderGeometry(0.5, 0.6, 6, 12),
                new THREE.MeshStandardMaterial({ color: 0x8b8070, roughness: 0.9 })
            );
            pillar.position.set(x, 3, -8);
            pillar.castShadow = true;
            pillar.userData.environment = true;
            scene.add(pillar);
        }
        
        // Throne platform
        const platform = new THREE.Mesh(
            new THREE.BoxGeometry(4, 0.5, 3),
            new THREE.MeshStandardMaterial({ color: 0xd4a860, roughness: 0.7, metalness: 0.3 })
        );
        platform.position.set(0, 0.25, -10);
        platform.userData.environment = true;
        scene.add(platform);
    }
    
    static createSunsetShore(scene) {
        scene.background = new THREE.Color(0xff6b35);
        scene.fog = new THREE.Fog(0xff6b35, 30, 80);
        
        // Sand
        const groundGeometry = new THREE.PlaneGeometry(150, 150);
        const groundMaterial = new THREE.MeshStandardMaterial({ color: 0xc2b280, roughness: 0.95 });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        ground.userData.environment = true;
        scene.add(ground);
        
        // Dark murky water
        const waterGeometry = new THREE.CircleGeometry(30, 32);
        const waterMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x1a1a2a,
            transparent: true,
            opacity: 0.8,
            roughness: 0.3,
            metalness: 0.4
        });
        const water = new THREE.Mesh(waterGeometry, waterMaterial);
        water.rotation.x = -Math.PI / 2;
        water.position.set(0, 0.1, -30);
        water.userData.environment = true;
        water.userData.isWater = true;
        scene.add(water);
        
        // Rocks
        for (let i = 0; i < 20; i++) {
            const rock = new THREE.Mesh(
                new THREE.DodecahedronGeometry(Math.random() * 0.8 + 0.4, 0),
                new THREE.MeshStandardMaterial({ color: 0x5a4a3a, roughness: 0.95 })
            );
            rock.position.set(
                (Math.random() - 0.5) * 100,
                0.3,
                (Math.random() - 0.5) * 60
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
    }
    
    static createWesternCity(scene) {
        scene.background = new THREE.Color(0xff8c42);
        scene.fog = new THREE.Fog(0xff8c42, 20, 60);
        
        // Ground
        const groundGeometry = new THREE.PlaneGeometry(100, 100);
        const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x8b7355, roughness: 0.9 });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        ground.userData.environment = true;
        scene.add(ground);
        
        // Simple buildings
        for (let i = 0; i < 10; i++) {
            const building = new THREE.Mesh(
                new THREE.BoxGeometry(3, 2 + Math.random() * 2, 3),
                new THREE.MeshStandardMaterial({ color: 0xb89968, roughness: 0.9 })
            );
            building.position.set(
                (Math.random() - 0.5) * 40,
                building.geometry.parameters.height / 2,
                -10 + (Math.random() - 0.5) * 30
            );
            building.castShadow = true;
            building.userData.environment = true;
            scene.add(building);
        }
    }
    
    static createSunrisePlain(scene) {
        scene.background = new THREE.Color(0xffd166);
        scene.fog = new THREE.Fog(0xffd166, 30, 80);
        
        // Ground
        const groundGeometry = new THREE.PlaneGeometry(150, 150, 20, 20);
        const positions = groundGeometry.attributes.position;
        for (let i = 0; i < positions.count; i++) {
            positions.setZ(i, (Math.random() - 0.5) * 0.8);
        }
        groundGeometry.computeVertexNormals();
        
        const groundMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xe8d4a0,
            roughness: 0.95
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        ground.userData.environment = true;
        scene.add(ground);
        
        // Sparse vegetation
        for (let i = 0; i < 30; i++) {
            const bush = new THREE.Mesh(
                new THREE.SphereGeometry(0.3, 6, 6),
                new THREE.MeshStandardMaterial({ color: 0x6b7c3e, roughness: 0.9 })
            );
            bush.scale.set(1, 0.6, 1);
            bush.position.set(
                (Math.random() - 0.5) * 120,
                0.2,
                (Math.random() - 0.5) * 120
            );
            bush.userData.environment = true;
            scene.add(bush);
        }
    }
    
    static createMountainPass(scene) {
        scene.background = new THREE.Color(0x6b7c8a);
        scene.fog = new THREE.Fog(0x6b7c8a, 15, 50);
        
        // Ground
        const groundGeometry = new THREE.PlaneGeometry(100, 100, 30, 30);
        const positions = groundGeometry.attributes.position;
        for (let i = 0; i < positions.count; i++) {
            positions.setZ(i, (Math.random() - 0.5) * 3);
        }
        groundGeometry.computeVertexNormals();
        
        const groundMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x6b6660,
            roughness: 0.95
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        ground.userData.environment = true;
        scene.add(ground);
        
        // Mountains (left and right)
        for (let side of [-1, 1]) {
            const mountain = new THREE.Mesh(
                new THREE.ConeGeometry(15, 30, 8),
                new THREE.MeshStandardMaterial({ color: 0x5a5550, roughness: 0.95 })
            );
            mountain.position.set(side * 25, 15, -20);
            mountain.castShadow = true;
            mountain.userData.environment = true;
            scene.add(mountain);
        }
        
        // Rocks
        for (let i = 0; i < 25; i++) {
            const rock = new THREE.Mesh(
                new THREE.DodecahedronGeometry(Math.random() * 1.2 + 0.5, 0),
                new THREE.MeshStandardMaterial({ color: 0x4a4540, roughness: 0.95 })
            );
            rock.position.set(
                (Math.random() - 0.5) * 80,
                rock.geometry.parameters.radius * 0.5,
                (Math.random() - 0.5) * 60
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
    }
    
    static createConstructionSite(scene) {
        scene.background = new THREE.Color(0x8b8680);
        scene.fog = new THREE.Fog(0x8b8680, 15, 50);
        
        // Ground
        const groundGeometry = new THREE.PlaneGeometry(100, 100);
        const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x6b6660, roughness: 0.95 });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        ground.userData.environment = true;
        scene.add(ground);
        
        // Partial wall construction
        for (let i = 0; i < 8; i++) {
            const wallSection = new THREE.Mesh(
                new THREE.BoxGeometry(1.5, 3 + i * 0.5, 1),
                new THREE.MeshStandardMaterial({ 
                    color: 0x5a5050,
                    roughness: 0.85,
                    metalness: 0.4
                })
            );
            wallSection.position.set(i * 1.8 - 6, (3 + i * 0.5) / 2, -10);
            wallSection.castShadow = true;
            wallSection.userData.environment = true;
            scene.add(wallSection);
        }
        
        // Iron sheets scattered
        for (let i = 0; i < 15; i++) {
            const sheet = new THREE.Mesh(
                new THREE.BoxGeometry(1, 0.05, 2),
                new THREE.MeshStandardMaterial({ 
                    color: 0x4a4a4a,
                    roughness: 0.6,
                    metalness: 0.8
                })
            );
            sheet.position.set(
                (Math.random() - 0.5) * 30,
                0.05,
                (Math.random() - 0.5) * 20
            );
            sheet.rotation.set(
                (Math.random() - 0.5) * 0.5,
                Math.random() * Math.PI,
                (Math.random() - 0.5) * 0.5
            );
            sheet.userData.environment = true;
            scene.add(sheet);
        }
    }
    
    static createCompletedWall(scene) {
        scene.background = new THREE.Color(0x87ceeb);
        scene.fog = new THREE.Fog(0x87ceeb, 20, 60);
        
        // Ground
        const groundGeometry = new THREE.PlaneGeometry(100, 100);
        const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x7b7560, roughness: 0.95 });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        ground.userData.environment = true;
        scene.add(ground);
        
        // The great wall
        const wallGeometry = new THREE.BoxGeometry(30, 12, 2);
        const wallMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x5a4540,
            roughness: 0.9,
            metalness: 0.3
        });
        const wall = new THREE.Mesh(wallGeometry, wallMaterial);
        wall.position.set(0, 6, -15);
        wall.castShadow = true;
        wall.userData.environment = true;
        scene.add(wall);
        
        // Copper details
        for (let i = 0; i < 5; i++) {
            const copperBand = new THREE.Mesh(
                new THREE.BoxGeometry(32, 0.5, 2.1),
                new THREE.MeshStandardMaterial({ 
                    color: 0xb87333,
                    roughness: 0.4,
                    metalness: 0.8
                })
            );
            copperBand.position.set(0, 2 + i * 2, -15);
            copperBand.userData.environment = true;
            scene.add(copperBand);
        }
    }
    
    static createBattlefield(scene) {
        scene.background = new THREE.Color(0x4a3a2a);
        scene.fog = new THREE.Fog(0x4a3a2a, 15, 50);
        
        // Scorched ground
        const groundGeometry = new THREE.PlaneGeometry(150, 150, 30, 30);
        const positions = groundGeometry.attributes.position;
        for (let i = 0; i < positions.count; i++) {
            positions.setZ(i, (Math.random() - 0.5) * 2);
        }
        groundGeometry.computeVertexNormals();
        
        const groundMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x3a2a1a,
            roughness: 0.98
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        ground.userData.environment = true;
        scene.add(ground);
        
        // Broken weapons/debris
        for (let i = 0; i < 20; i++) {
            const debris = new THREE.Mesh(
                new THREE.CylinderGeometry(0.05, 0.05, 1.5, 6),
                new THREE.MeshStandardMaterial({ color: 0x4a4a4a, roughness: 0.7, metalness: 0.6 })
            );
            debris.position.set(
                (Math.random() - 0.5) * 80,
                0.3,
                (Math.random() - 0.5) * 80
            );
            debris.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.PI / 2 + (Math.random() - 0.5) * 0.5
            );
            debris.userData.environment = true;
            scene.add(debris);
        }
    }
    
    static createRuinedKingdom(scene) {
        scene.background = new THREE.Color(0x3d3d3d);
        scene.fog = new THREE.Fog(0x3d3d3d, 15, 45);
        
        // Cracked ground
        const groundGeometry = new THREE.PlaneGeometry(150, 150);
        const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x3a3530, roughness: 0.98 });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        ground.userData.environment = true;
        scene.add(ground);
        
        // Ruined buildings
        for (let i = 0; i < 8; i++) {
            const ruin = new THREE.Mesh(
                new THREE.BoxGeometry(3, 1 + Math.random() * 2, 3),
                new THREE.MeshStandardMaterial({ color: 0x5a5050, roughness: 0.95 })
            );
            ruin.position.set(
                (Math.random() - 0.5) * 60,
                ruin.geometry.parameters.height / 2,
                -10 + (Math.random() - 0.5) * 40
            );
            ruin.rotation.set(
                (Math.random() - 0.5) * 0.3,
                Math.random() * Math.PI,
                (Math.random() - 0.5) * 0.3
            );
            ruin.castShadow = true;
            ruin.userData.environment = true;
            scene.add(ruin);
        }
    }
    
    static animateEnvironment(scene, time) {
        scene.traverse((child) => {
            if (child.userData && child.userData.isWater) {
                child.position.y = 0.1 + Math.sin(time * 0.5) * 0.05;
            }
        });
    }
}
