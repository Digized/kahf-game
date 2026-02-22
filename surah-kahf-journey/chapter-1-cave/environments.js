// Environment Factory for Cave Sleepers chapter

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
    
    static createCity(scene) {
        scene.background = new THREE.Color(0xc9a86a);
        scene.fog = new THREE.Fog(0xc9a86a, 15, 50);
        
        // Ground
        const groundGeometry = new THREE.PlaneGeometry(100, 100);
        const groundMaterial = new THREE.MeshLambertMaterial({ color: 0x8b7355 });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.userData.environment = true;
        scene.add(ground);
        
        // Buildings
        for (let i = 0; i < 12; i++) {
            const building = this.createBuilding();
            building.position.set(
                (Math.random() - 0.5) * 40,
                0,
                -10 - Math.random() * 30
            );
            building.userData.environment = true;
            scene.add(building);
        }
        
        // Idol statue (abstract, not detailed)
        const idolGeometry = new THREE.CylinderGeometry(0.5, 0.8, 3, 6);
        const idolMaterial = new THREE.MeshLambertMaterial({ color: 0x666666 });
        const idol = new THREE.Mesh(idolGeometry, idolMaterial);
        idol.position.set(0, 1.5, -8);
        idol.userData.environment = true;
        scene.add(idol);
    }
    
    static createCaveEntrance(scene) {
        scene.background = new THREE.Color(0x4a5568);
        scene.fog = new THREE.Fog(0x4a5568, 10, 40);
        
        // Rocky ground
        const groundGeometry = new THREE.PlaneGeometry(100, 100);
        const groundMaterial = new THREE.MeshLambertMaterial({ color: 0x6b5a4a });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.userData.environment = true;
        scene.add(ground);
        
        // Cave entrance (dark opening)
        const entranceGeometry = new THREE.SphereGeometry(5, 8, 8, 0, Math.PI);
        const entranceMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x2a2a2a,
            side: THREE.BackSide
        });
        const entrance = new THREE.Mesh(entranceGeometry, entranceMaterial);
        entrance.position.set(0, 3, -10);
        entrance.rotation.y = Math.PI;
        entrance.userData.environment = true;
        scene.add(entrance);
        
        // Rocks
        for (let i = 0; i < 20; i++) {
            const rock = this.createRock();
            rock.position.set(
                (Math.random() - 0.5) * 30,
                0,
                (Math.random() - 0.5) * 20 - 10
            );
            rock.userData.environment = true;
            scene.add(rock);
        }
    }
    
    static createCaveDark(scene) {
        scene.background = new THREE.Color(0x1a1a1a);
        scene.fog = new THREE.Fog(0x1a1a1a, 2, 10);
        
        // Cave floor
        const floorGeometry = new THREE.PlaneGeometry(20, 20);
        const floorMaterial = new THREE.MeshLambertMaterial({ color: 0x3a3a3a });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        floor.userData.environment = true;
        scene.add(floor);
        
        // Cave walls (rough)
        const wallGeometry = new THREE.SphereGeometry(10, 8, 8, 0, Math.PI * 2, 0, Math.PI / 2);
        const wallMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x4a4a4a,
            side: THREE.BackSide
        });
        const walls = new THREE.Mesh(wallGeometry, wallMaterial);
        walls.position.y = 5;
        walls.userData.environment = true;
        scene.add(walls);
        
        // Very dim light
        const dimLight = new THREE.PointLight(0x6b8cae, 0.2, 15);
        dimLight.position.set(0, 3, -5);
        scene.add(dimLight);
    }
    
    static createCaveLight(scene) {
        scene.background = new THREE.Color(0x4a5568);
        scene.fog = new THREE.Fog(0x4a5568, 5, 20);
        
        // Cave floor
        const floorGeometry = new THREE.PlaneGeometry(20, 20);
        const floorMaterial = new THREE.MeshLambertMaterial({ color: 0x6b5a4a });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        floor.userData.environment = true;
        scene.add(floor);
        
        // Cave walls
        const wallGeometry = new THREE.SphereGeometry(10, 8, 8, 0, Math.PI * 2, 0, Math.PI / 2);
        const wallMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x7a6a5a,
            side: THREE.BackSide
        });
        const walls = new THREE.Mesh(wallGeometry, wallMaterial);
        walls.position.y = 5;
        walls.userData.environment = true;
        scene.add(walls);
        
        // Sunlight streaming in
        const sunlight = new THREE.DirectionalLight(0xffd89b, 1.2);
        sunlight.position.set(0, 10, -8);
        scene.add(sunlight);
    }
    
    static createBuilding() {
        const building = new THREE.Group();
        
        const width = Math.random() * 3 + 3;
        const height = Math.random() * 4 + 4;
        const depth = Math.random() * 3 + 3;
        
        const wallsGeometry = new THREE.BoxGeometry(width, height, depth);
        const wallsMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xa89968,
            flatShading: true
        });
        const walls = new THREE.Mesh(wallsGeometry, wallsMaterial);
        walls.position.y = height / 2;
        building.add(walls);
        
        const roofGeometry = new THREE.BoxGeometry(width + 0.5, 0.3, depth + 0.5);
        const roofMaterial = new THREE.MeshLambertMaterial({ color: 0x8b7355 });
        const roof = new THREE.Mesh(roofGeometry, roofMaterial);
        roof.position.y = height;
        building.add(roof);
        
        return building;
    }
    
    static createRock() {
        const size = Math.random() * 0.8 + 0.4;
        const rockGeometry = new THREE.DodecahedronGeometry(size, 0);
        const rockMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x6b5a4a,
            flatShading: true
        });
        const rock = new THREE.Mesh(rockGeometry, rockMaterial);
        rock.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );
        return rock;
    }
    
    static animateEnvironment(scene, time) {
        // Gentle ambient movement
    }
}
