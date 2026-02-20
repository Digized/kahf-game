// Environment creation for each scene
class EnvironmentFactory {
    
    // Clear existing scene objects
    static clearScene(scene) {
        const objectsToRemove = [];
        scene.traverse(object => {
            if (object.userData && (
                object.userData.environment ||
                object.userData.type === 'believer' ||
                object.userData.type === 'guard' ||
                object.userData.type === 'townsperson' ||
                object.userData.type === 'vendor' ||
                object.userData.type === 'dog'
            )) {
                objectsToRemove.push(object);
            }
        });
        objectsToRemove.forEach(obj => {
            if (obj.parent) obj.parent.remove(obj);
        });
    }
    
    // Ancient city (persecution era)
    static createAncientCity(scene) {
        EnvironmentFactory.clearScene(scene);
        
        // Ground (warm sandstone)
        const groundGeometry = new THREE.PlaneGeometry(50, 50, 8, 8);
        const groundMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xC4A07A,
            flatShading: true
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        ground.userData.environment = true;
        scene.add(ground);
        
        // City walls (oppressive)
        const wallGeometry = new THREE.BoxGeometry(25, 6, 1.5);
        const wallMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x8A7D6A,
            flatShading: true
        });
        
        const backWall = new THREE.Mesh(wallGeometry, wallMaterial);
        backWall.position.set(0, 3, -10);
        backWall.castShadow = true;
        backWall.userData.environment = true;
        scene.add(backWall);
        
        // Buildings (ancient architecture)
        const buildingPositions = [
            { x: -8, z: -8, w: 3, h: 4, d: 3 },
            { x: -4, z: -7, w: 2.5, h: 5, d: 2.5 },
            { x: 4, z: -8, w: 3.5, h: 3.5, d: 3 },
            { x: 8, z: -7, w: 2.8, h: 4.5, d: 2.8 },
        ];
        
        buildingPositions.forEach(pos => {
            const buildingGeometry = new THREE.BoxGeometry(pos.w, pos.h, pos.d);
            const buildingMaterial = new THREE.MeshLambertMaterial({ 
                color: 0xA89880,
                flatShading: true
            });
            const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
            building.position.set(pos.x, pos.h / 2, pos.z);
            building.castShadow = true;
            building.userData.environment = true;
            scene.add(building);
            
            // Flat roof
            const roofGeometry = new THREE.BoxGeometry(pos.w + 0.3, 0.2, pos.d + 0.3);
            const roofMaterial = new THREE.MeshLambertMaterial({ 
                color: 0x8A7560,
                flatShading: true
            });
            const roof = new THREE.Mesh(roofGeometry, roofMaterial);
            roof.position.set(pos.x, pos.h + 0.1, pos.z);
            roof.castShadow = true;
            roof.userData.environment = true;
            scene.add(roof);
        });
        
        // Idol statue (ominous)
        const idolBase = new THREE.CylinderGeometry(0.8, 1, 0.6, 8);
        const idolBaseMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x6A6A6A,
            flatShading: true
        });
        const base = new THREE.Mesh(idolBase, idolBaseMaterial);
        base.position.set(0, 0.3, -5);
        base.userData.environment = true;
        scene.add(base);
        
        const idolBody = new THREE.CylinderGeometry(0.4, 0.5, 2, 8);
        const idolMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x5A5A5A,
            flatShading: true
        });
        const idol = new THREE.Mesh(idolBody, idolMaterial);
        idol.position.set(0, 1.6, -5);
        idol.castShadow = true;
        idol.userData.environment = true;
        scene.add(idol);
        
        const idolHead = new THREE.SphereGeometry(0.35, 8, 8);
        const head = new THREE.Mesh(idolHead, idolMaterial);
        head.position.set(0, 2.9, -5);
        head.userData.environment = true;
        scene.add(head);
        
        // Torch stands (oppressive lighting)
        const torchPositions = [
            { x: -6, z: -4 },
            { x: 6, z: -4 }
        ];
        
        torchPositions.forEach(pos => {
            const standGeometry = new THREE.CylinderGeometry(0.08, 0.12, 2.5, 6);
            const standMaterial = new THREE.MeshLambertMaterial({ 
                color: 0x3A3A3A,
                flatShading: true
            });
            const stand = new THREE.Mesh(standGeometry, standMaterial);
            stand.position.set(pos.x, 1.25, pos.z);
            stand.userData.environment = true;
            scene.add(stand);
            
            // Fire glow
            const flameGeometry = new THREE.ConeGeometry(0.15, 0.4, 6);
            const flameMaterial = new THREE.MeshBasicMaterial({ 
                color: 0xFF6B2B,
            });
            const flame = new THREE.Mesh(flameGeometry, flameMaterial);
            flame.position.set(pos.x, 2.7, pos.z);
            flame.userData.environment = true;
            scene.add(flame);
        });
    }
    
    // Cave interior (sanctuary)
    static createCaveInterior(scene) {
        EnvironmentFactory.clearScene(scene);
        
        // Cave floor (rough stone)
        const floorGeometry = new THREE.CircleGeometry(8, 12);
        const floorMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x5A4A3A,
            flatShading: true
        });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        floor.userData.environment = true;
        scene.add(floor);
        
        // Cave walls (irregular)
        const wallSegments = 8;
        for (let i = 0; i < wallSegments; i++) {
            const angle = (i / wallSegments) * Math.PI * 2;
            const x = Math.cos(angle) * 7;
            const z = Math.sin(angle) * 7;
            
            const wallGeometry = new THREE.BoxGeometry(2.5, 4 + Math.random(), 1.2);
            const wallMaterial = new THREE.MeshLambertMaterial({ 
                color: 0x4A3A2A,
                flatShading: true
            });
            const wall = new THREE.Mesh(wallGeometry, wallMaterial);
            wall.position.set(x, 2, z);
            wall.lookAt(0, 2, 0);
            wall.castShadow = true;
            wall.userData.environment = true;
            scene.add(wall);
        }
        
        // Cave ceiling (low and organic)
        const ceilingGeometry = new THREE.ConeGeometry(8, 3, 12);
        const ceilingMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x3A2A1A,
            flatShading: true,
            side: THREE.DoubleSide
        });
        const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
        ceiling.position.y = 5.5;
        ceiling.rotation.x = Math.PI;
        ceiling.userData.environment = true;
        scene.add(ceiling);
        
        // Stalactites
        const stalactitePositions = [
            { x: -3, z: 2 },
            { x: 2, z: -3 },
            { x: -2, z: -2 },
            { x: 3, z: 3 }
        ];
        
        stalactitePositions.forEach(pos => {
            const stalactiteGeometry = new THREE.ConeGeometry(0.2, 0.8 + Math.random() * 0.5, 6);
            const stalactiteMaterial = new THREE.MeshLambertMaterial({ 
                color: 0x6A5A4A,
                flatShading: true
            });
            const stalactite = new THREE.Mesh(stalactiteGeometry, stalactiteMaterial);
            stalactite.position.set(pos.x, 5.2, pos.z);
            stalactite.userData.environment = true;
            scene.add(stalactite);
        });
        
        // Small fire pit (warmth)
        const firePitGeometry = new THREE.CylinderGeometry(0.5, 0.6, 0.2, 8);
        const firePitMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x3A3A3A,
            flatShading: true
        });
        const firePit = new THREE.Mesh(firePitGeometry, firePitMaterial);
        firePit.position.set(0, 0.1, 2);
        firePit.userData.environment = true;
        scene.add(firePit);
        
        const fireGeometry = new THREE.ConeGeometry(0.3, 0.5, 6);
        const fireMaterial = new THREE.MeshBasicMaterial({ 
            color: 0xFFA84C,
        });
        const fire = new THREE.Mesh(fireGeometry, fireMaterial);
        fire.position.set(0, 0.45, 2);
        fire.userData.environment = true;
        fire.userData.isFlame = true;
        scene.add(fire);
        
        // Cave entrance (dim light from outside)
        const entranceGeometry = new THREE.PlaneGeometry(3, 3);
        const entranceMaterial = new THREE.MeshBasicMaterial({ 
            color: 0xFFE8D0,
            transparent: true,
            opacity: 0.15
        });
        const entrance = new THREE.Mesh(entranceGeometry, entranceMaterial);
        entrance.position.set(0, 1.5, -7.8);
        entrance.userData.environment = true;
        scene.add(entrance);
    }
    
    // Future city (Muslim rule, transformed)
    static createFutureCity(scene) {
        EnvironmentFactory.clearScene(scene);
        
        // Ground (paved market square)
        const groundGeometry = new THREE.PlaneGeometry(50, 50, 10, 10);
        const groundMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xD4C4AA,
            flatShading: true
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        ground.userData.environment = true;
        scene.add(ground);
        
        // Mosque in background
        const mosqueBase = new THREE.BoxGeometry(6, 4, 5);
        const mosqueBaseMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xE8DCC8,
            flatShading: true
        });
        const mosque = new THREE.Mesh(mosqueBase, mosqueBaseMaterial);
        mosque.position.set(0, 2, -12);
        mosque.castShadow = true;
        mosque.userData.environment = true;
        scene.add(mosque);
        
        // Dome
        const domeGeometry = new THREE.SphereGeometry(2, 10, 10, 0, Math.PI * 2, 0, Math.PI / 2);
        const domeMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xC9A84C,
            flatShading: true
        });
        const dome = new THREE.Mesh(domeGeometry, domeMaterial);
        dome.position.set(0, 4, -12);
        dome.userData.environment = true;
        scene.add(dome);
        
        // Minaret
        const minaretGeometry = new THREE.CylinderGeometry(0.4, 0.5, 6, 8);
        const minaretMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xD4C4AA,
            flatShading: true
        });
        const minaret = new THREE.Mesh(minaretGeometry, minaretMaterial);
        minaret.position.set(-4, 3, -11);
        minaret.castShadow = true;
        minaret.userData.environment = true;
        scene.add(minaret);
        
        const minaretTop = new THREE.ConeGeometry(0.6, 1.2, 8);
        const top = new THREE.Mesh(minaretTop, domeMaterial);
        top.position.set(-4, 6.6, -11);
        top.userData.environment = true;
        scene.add(top);
        
        // Market stalls
        const stallPositions = [
            { x: -5, z: -2 },
            { x: -2, z: -1 },
            { x: 2, z: -1.5 },
            { x: 5, z: -2.5 }
        ];
        
        stallPositions.forEach(pos => {
            // Stall structure
            const poleGeometry = new THREE.CylinderGeometry(0.06, 0.07, 2.5, 6);
            const poleMaterial = new THREE.MeshLambertMaterial({ 
                color: 0x5D4E37,
                flatShading: true
            });
            
            [-0.6, 0.6].forEach(xOff => {
                [-0.6, 0.6].forEach(zOff => {
                    const pole = new THREE.Mesh(poleGeometry, poleMaterial);
                    pole.position.set(pos.x + xOff, 1.25, pos.z + zOff);
                    pole.userData.environment = true;
                    scene.add(pole);
                });
            });
            
            // Canopy
            const canopyGeometry = new THREE.BoxGeometry(1.6, 0.1, 1.6);
            const canopyMaterial = new THREE.MeshLambertMaterial({ 
                color: 0xC9A84C,
                flatShading: true
            });
            const canopy = new THREE.Mesh(canopyGeometry, canopyMaterial);
            canopy.position.set(pos.x, 2.5, pos.z);
            canopy.userData.environment = true;
            scene.add(canopy);
            
            // Table
            const tableGeometry = new THREE.BoxGeometry(1.2, 0.1, 0.8);
            const tableMaterial = new THREE.MeshLambertMaterial({ 
                color: 0x8A7560,
                flatShading: true
            });
            const table = new THREE.Mesh(tableGeometry, tableMaterial);
            table.position.set(pos.x, 0.9, pos.z);
            table.userData.environment = true;
            scene.add(table);
            
            // Goods (simple boxes)
            const goodsGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
            const goodsMaterial = new THREE.MeshLambertMaterial({ 
                color: 0xAA8866,
                flatShading: true
            });
            for (let i = 0; i < 3; i++) {
                const goods = new THREE.Mesh(goodsGeometry, goodsMaterial);
                goods.position.set(pos.x + (i - 1) * 0.3, 1.1, pos.z);
                goods.userData.environment = true;
                scene.add(goods);
            }
        });
        
        // Fountain (prosperity)
        const fountainBase = new THREE.CylinderGeometry(1.2, 1.5, 0.5, 8);
        const fountainMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xA89880,
            flatShading: true
        });
        const base = new THREE.Mesh(fountainBase, fountainMaterial);
        base.position.set(8, 0.25, 3);
        base.userData.environment = true;
        scene.add(base);
        
        const fountainPillar = new THREE.CylinderGeometry(0.3, 0.4, 1.5, 8);
        const pillar = new THREE.Mesh(fountainPillar, fountainMaterial);
        pillar.position.set(8, 1.25, 3);
        pillar.userData.environment = true;
        scene.add(pillar);
        
        // Water (simplified)
        const waterGeometry = new THREE.CircleGeometry(1.1, 12);
        const waterMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x6A9AB5,
            transparent: true,
            opacity: 0.7
        });
        const water = new THREE.Mesh(waterGeometry, waterMaterial);
        water.rotation.x = -Math.PI / 2;
        water.position.set(8, 0.52, 3);
        water.userData.environment = true;
        scene.add(water);
    }
    
    // Animate environment elements
    static animateEnvironment(scene, time) {
        scene.traverse(object => {
            // Animate flames
            if (object.userData.isFlame) {
                object.scale.y = 1 + Math.sin(time * 8) * 0.15;
                object.rotation.y = time * 2;
            }
        });
    }
}
