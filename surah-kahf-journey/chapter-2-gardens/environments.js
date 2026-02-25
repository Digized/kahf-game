// Environment Factory for Two Gardens Chapter

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
    
    static createGardensLush(scene) {
        scene.background = new THREE.Color(0x87ceeb);
        scene.fog = new THREE.Fog(0x87ceeb, 30, 80);
        
        // Ground - fertile soil
        const groundGeometry = new THREE.PlaneGeometry(150, 150, 30, 30);
        const positions = groundGeometry.attributes.position;
        for (let i = 0; i < positions.count; i++) {
            positions.setZ(i, (Math.random() - 0.5) * 0.5);
        }
        groundGeometry.computeVertexNormals();
        
        const groundMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x5a4a2f,
            roughness: 0.95
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        ground.userData.environment = true;
        scene.add(ground);
        
        // Grass patches
        for (let i = 0; i < 40; i++) {
            const grassPatch = this.createGrassPatch();
            grassPatch.position.set(
                (Math.random() - 0.5) * 100,
                0.05,
                (Math.random() - 0.5) * 100
            );
            grassPatch.userData.environment = true;
            scene.add(grassPatch);
        }
        
        // Fruit trees (date palms)
        for (let i = 0; i < 20; i++) {
            const palm = this.createDatePalm();
            palm.position.set(
                (Math.random() - 0.5) * 80,
                0,
                (Math.random() - 0.5) * 80
            );
            palm.userData.environment = true;
            scene.add(palm);
        }
        
        // Grape vines on trellises
        for (let i = 0; i < 15; i++) {
            const vine = this.createGrapeVine();
            vine.position.set(
                (Math.random() - 0.5) * 70,
                0,
                (Math.random() - 0.5) * 70
            );
            vine.rotation.y = Math.random() * Math.PI;
            vine.userData.environment = true;
            scene.add(vine);
        }
        
        // Streams
        this.createStream(scene, [
            { x: -20, z: -40 },
            { x: -15, z: -20 },
            { x: -10, z: 0 },
            { x: -5, z: 20 },
            { x: 0, z: 40 }
        ]);
    }
    
    static createGardensFlourishing(scene) {
        this.createGardensLush(scene);
        
        // Add golden glow to represent divine blessing
        const ambientGlow = new THREE.AmbientLight(0xffd700, 0.3);
        ambientGlow.userData.environment = true;
        scene.add(ambientGlow);
        
        // Extra abundant fruit
        scene.traverse((child) => {
            if (child.userData && child.userData.isFruit) {
                child.scale.multiplyScalar(1.3);
            }
        });
    }
    
    static createGardensDying(scene) {
        scene.background = new THREE.Color(0x6b7280);
        scene.fog = new THREE.Fog(0x6b7280, 20, 60);
        
        // Darkened ground
        const groundGeometry = new THREE.PlaneGeometry(150, 150, 30, 30);
        const groundMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x4a3a2a,
            roughness: 0.95
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        ground.userData.environment = true;
        scene.add(ground);
        
        // Wilted trees
        for (let i = 0; i < 15; i++) {
            const palm = this.createDatePalm(true); // wilted = true
            palm.position.set(
                (Math.random() - 0.5) * 80,
                0,
                (Math.random() - 0.5) * 80
            );
            palm.rotation.z = (Math.random() - 0.5) * 0.3; // Leaning
            palm.userData.environment = true;
            scene.add(palm);
        }
        
        // Storm effects
        const rain = this.createRain();
        rain.userData.environment = true;
        scene.add(rain);
    }
    
    static createGardensDestroyed(scene) {
        scene.background = new THREE.Color(0x3d3d3d);
        scene.fog = new THREE.Fog(0x3d3d3d, 15, 50);
        
        // Muddy, destroyed ground
        const groundGeometry = new THREE.PlaneGeometry(150, 150, 40, 40);
        const positions = groundGeometry.attributes.position;
        for (let i = 0; i < positions.count; i++) {
            positions.setZ(i, (Math.random() - 0.5) * 2); // Rough terrain
        }
        groundGeometry.computeVertexNormals();
        
        const groundMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x3a2f1f,
            roughness: 0.98
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        ground.userData.environment = true;
        scene.add(ground);
        
        // Toppled trees
        for (let i = 0; i < 12; i++) {
            const log = new THREE.Mesh(
                new THREE.CylinderGeometry(0.3, 0.4, 5, 8),
                new THREE.MeshStandardMaterial({ color: 0x5d4e37, roughness: 0.9 })
            );
            log.rotation.set(
                Math.PI / 2 + (Math.random() - 0.5) * 0.5,
                Math.random() * Math.PI,
                (Math.random() - 0.5) * 0.5
            );
            log.position.set(
                (Math.random() - 0.5) * 80,
                0.5,
                (Math.random() - 0.5) * 80
            );
            log.castShadow = true;
            log.userData.environment = true;
            scene.add(log);
        }
        
        // Debris
        for (let i = 0; i < 30; i++) {
            const debris = new THREE.Mesh(
                new THREE.BoxGeometry(
                    Math.random() * 0.5 + 0.2,
                    Math.random() * 0.3 + 0.1,
                    Math.random() * 0.5 + 0.2
                ),
                new THREE.MeshStandardMaterial({ 
                    color: 0x4a3a2a,
                    roughness: 0.9
                })
            );
            debris.position.set(
                (Math.random() - 0.5) * 90,
                0.15,
                (Math.random() - 0.5) * 90
            );
            debris.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );
            debris.userData.environment = true;
            scene.add(debris);
        }
    }
    
    static createGrassPatch() {
        const group = new THREE.Group();
        const grassMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x4a7c3e,
            roughness: 0.9,
            side: THREE.DoubleSide
        });
        
        for (let i = 0; i < 20; i++) {
            const blade = new THREE.Mesh(
                new THREE.PlaneGeometry(0.05, 0.3),
                grassMaterial
            );
            blade.position.set(
                (Math.random() - 0.5) * 2,
                0.15,
                (Math.random() - 0.5) * 2
            );
            blade.rotation.y = Math.random() * Math.PI;
            group.add(blade);
        }
        
        return group;
    }
    
    static createDatePalm(wilted = false) {
        const tree = new THREE.Group();
        
        // Trunk
        const trunkGeometry = new THREE.CylinderGeometry(0.3, 0.4, 8, 8);
        const trunkMaterial = new THREE.MeshStandardMaterial({ 
            color: wilted ? 0x5a4a3a : 0x6b5a4a,
            roughness: 0.9
        });
        const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
        trunk.position.y = 4;
        trunk.castShadow = true;
        tree.add(trunk);
        
        // Palm fronds
        const frondColor = wilted ? 0x5a5a3a : 0x2d5016;
        const frondMaterial = new THREE.MeshStandardMaterial({ 
            color: frondColor,
            roughness: 0.85
        });
        
        for (let i = 0; i < 8; i++) {
            const frond = new THREE.Mesh(
                new THREE.BoxGeometry(0.2, 3, 0.1),
                frondMaterial
            );
            frond.position.y = 8;
            frond.rotation.set(
                wilted ? 1.2 : 0.8,
                (Math.PI * 2 / 8) * i,
                0
            );
            tree.add(frond);
        }
        
        // Date clusters
        if (!wilted) {
            for (let i = 0; i < 4; i++) {
                const dates = new THREE.Mesh(
                    new THREE.SphereGeometry(0.3, 8, 8),
                    new THREE.MeshStandardMaterial({ 
                        color: 0x8b6f47,
                        roughness: 0.7
                    })
                );
                dates.position.set(
                    Math.cos((Math.PI * 2 / 4) * i) * 0.8,
                    7,
                    Math.sin((Math.PI * 2 / 4) * i) * 0.8
                );
                dates.userData.isFruit = true;
                tree.add(dates);
            }
        }
        
        return tree;
    }
    
    static createGrapeVine() {
        const vine = new THREE.Group();
        
        // Trellis
        const woodMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x5d4e37,
            roughness: 0.8
        });
        
        for (let x of [-1, 1]) {
            const post = new THREE.Mesh(
                new THREE.CylinderGeometry(0.08, 0.08, 2, 8),
                woodMaterial
            );
            post.position.set(x, 1, 0);
            vine.add(post);
        }
        
        const crossbar = new THREE.Mesh(
            new THREE.CylinderGeometry(0.05, 0.05, 2.2, 8),
            woodMaterial
        );
        crossbar.rotation.z = Math.PI / 2;
        crossbar.position.y = 2;
        vine.add(crossbar);
        
        // Vines (simplified)
        const vineMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x3d5016,
            roughness: 0.9
        });
        
        for (let i = 0; i < 5; i++) {
            const strand = new THREE.Mesh(
                new THREE.CylinderGeometry(0.02, 0.02, 2.5, 6),
                vineMaterial
            );
            strand.position.set(-0.8 + i * 0.4, 1.2, 0);
            strand.rotation.x = 0.3;
            vine.add(strand);
            
            // Grape clusters
            const grapes = new THREE.Mesh(
                new THREE.SphereGeometry(0.15, 8, 8),
                new THREE.MeshStandardMaterial({ 
                    color: 0x6b2c6b,
                    roughness: 0.6
                })
            );
            grapes.position.set(-0.8 + i * 0.4, 0.8, 0);
            grapes.userData.isFruit = true;
            vine.add(grapes);
        }
        
        return vine;
    }
    
    static createStream(scene, points) {
        const waterMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x4a90e2,
            transparent: true,
            opacity: 0.7,
            roughness: 0.2,
            metalness: 0.3
        });
        
        for (let i = 0; i < points.length - 1; i++) {
            const start = points[i];
            const end = points[i + 1];
            
            const streamSegment = new THREE.Mesh(
                new THREE.PlaneGeometry(2, Math.hypot(end.x - start.x, end.z - start.z)),
                waterMaterial
            );
            
            streamSegment.rotation.x = -Math.PI / 2;
            streamSegment.position.set(
                (start.x + end.x) / 2,
                0.02,
                (start.z + end.z) / 2
            );
            streamSegment.rotation.z = Math.atan2(end.z - start.z, end.x - start.x) - Math.PI / 2;
            streamSegment.userData.environment = true;
            streamSegment.userData.isWater = true;
            scene.add(streamSegment);
        }
    }
    
    static createRain() {
        const rain = new THREE.Group();
        const rainMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x888888,
            transparent: true,
            opacity: 0.3
        });
        
        for (let i = 0; i < 200; i++) {
            const drop = new THREE.Mesh(
                new THREE.CylinderGeometry(0.02, 0.02, 1, 4),
                rainMaterial
            );
            drop.position.set(
                (Math.random() - 0.5) * 100,
                Math.random() * 20 + 10,
                (Math.random() - 0.5) * 100
            );
            rain.add(drop);
        }
        
        return rain;
    }
    
    static animateEnvironment(scene, time) {
        scene.traverse((child) => {
            // Animate water
            if (child.userData && child.userData.isWater) {
                child.position.y = 0.02 + Math.sin(time * 2) * 0.02;
            }
            
            // Animate rain
            if (child.geometry && child.geometry.type === 'CylinderGeometry' && child.material.opacity < 0.5) {
                child.position.y -= 0.5;
                if (child.position.y < 0) {
                    child.position.y = 30;
                }
            }
        });
    }
}
