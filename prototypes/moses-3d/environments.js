// Environment creation for each scene
class EnvironmentFactory {
    
    // Create ocean/water scene with boat
    static createBoatScene(scene) {
        // Clear existing objects
        EnvironmentFactory.clearScene(scene);
        
        // Water plane
        const waterGeometry = new THREE.PlaneGeometry(50, 50);
        const waterMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x1e5a8e,
            side: THREE.DoubleSide 
        });
        const water = new THREE.Mesh(waterGeometry, waterMaterial);
        water.rotation.x = -Math.PI / 2;
        water.position.y = -0.5;
        scene.add(water);
        
        // Boat
        const boat = new THREE.Group();
        
        // Hull
        const hullGeometry = new THREE.BoxGeometry(3, 0.5, 1.5);
        const hullMaterial = new THREE.MeshLambertMaterial({ color: 0x654321 });
        const hull = new THREE.Mesh(hullGeometry, hullMaterial);
        hull.position.y = 0.25;
        boat.add(hull);
        
        // Bow (front)
        const bowGeometry = new THREE.ConeGeometry(0.75, 1, 4);
        const bowMaterial = new THREE.MeshLambertMaterial({ color: 0x654321 });
        const bow = new THREE.Mesh(bowGeometry, bowMaterial);
        bow.rotation.z = -Math.PI / 2;
        bow.position.set(2, 0.25, 0);
        boat.add(bow);
        
        // Mast
        const mastGeometry = new THREE.CylinderGeometry(0.1, 0.1, 3, 6);
        const mastMaterial = new THREE.MeshLambertMaterial({ color: 0x8b4513 });
        const mast = new THREE.Mesh(mastGeometry, mastMaterial);
        mast.position.y = 2;
        boat.add(mast);
        
        // Sail
        const sailGeometry = new THREE.PlaneGeometry(1.5, 2);
        const sailMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xf5f5dc,
            side: THREE.DoubleSide 
        });
        const sail = new THREE.Mesh(sailGeometry, sailMaterial);
        sail.position.set(0.5, 2.5, 0);
        boat.add(sail);
        
        boat.position.y = 0;
        scene.add(boat);
        scene.userData.boat = boat;
        
        // Sky
        scene.background = new THREE.Color(0x87ceeb);
        scene.fog = new THREE.Fog(0x87ceeb, 10, 50);
        
        return boat;
    }
    
    // Create village scene
    static createVillageScene(scene) {
        EnvironmentFactory.clearScene(scene);
        
        // Ground
        const groundGeometry = new THREE.PlaneGeometry(40, 40);
        const groundMaterial = new THREE.MeshLambertMaterial({ color: 0x8b7355 });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -0.5;
        scene.add(ground);
        
        // Houses
        const houses = [];
        const housePositions = [
            [-5, 0, -5], [5, 0, -5], [-5, 0, 5], [5, 0, 5],
            [-8, 0, 0], [8, 0, 0], [0, 0, -8], [0, 0, 8]
        ];
        
        housePositions.forEach(pos => {
            const house = EnvironmentFactory.createHouse();
            house.position.set(...pos);
            scene.add(house);
            houses.push(house);
        });
        
        // Village square (open area in center)
        const squareGeometry = new THREE.PlaneGeometry(8, 8);
        const squareMaterial = new THREE.MeshLambertMaterial({ color: 0xa0826d });
        const square = new THREE.Mesh(squareGeometry, squareMaterial);
        square.rotation.x = -Math.PI / 2;
        square.position.y = -0.49;
        scene.add(square);
        
        // Trees
        for (let i = 0; i < 8; i++) {
            const tree = EnvironmentFactory.createTree();
            const angle = (i / 8) * Math.PI * 2;
            const radius = 12;
            tree.position.set(
                Math.cos(angle) * radius,
                0,
                Math.sin(angle) * radius
            );
            scene.add(tree);
        }
        
        // Sky
        scene.background = new THREE.Color(0xffd89b);
        scene.fog = new THREE.Fog(0xffd89b, 15, 40);
        
        return houses;
    }
    
    // Create town scene with wall
    static createTownScene(scene) {
        EnvironmentFactory.clearScene(scene);
        
        // Ground
        const groundGeometry = new THREE.PlaneGeometry(50, 50);
        const groundMaterial = new THREE.MeshLambertMaterial({ color: 0x9b8b7e });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -0.5;
        scene.add(ground);
        
        // Larger, wealthier houses
        const housePositions = [
            [-8, 0, -6], [8, 0, -6], [-8, 0, 6], [8, 0, 6],
            [-12, 0, 0], [12, 0, 0], [0, 0, -10], [0, 0, 10]
        ];
        
        housePositions.forEach(pos => {
            const house = EnvironmentFactory.createHouse(1.5, 0xc4a574); // Larger, stone color
            house.position.set(...pos);
            scene.add(house);
        });
        
        // The important wall
        const wall = EnvironmentFactory.createWall();
        wall.position.set(-15, 0, -8);
        scene.add(wall);
        scene.userData.wall = wall;
        
        // Road/path
        const pathGeometry = new THREE.PlaneGeometry(40, 3);
        const pathMaterial = new THREE.MeshLambertMaterial({ color: 0x8b7d6b });
        const path = new THREE.Mesh(pathGeometry, pathMaterial);
        path.rotation.x = -Math.PI / 2;
        path.position.y = -0.48;
        scene.add(path);
        
        // Sky - evening
        scene.background = new THREE.Color(0xff9966);
        scene.fog = new THREE.Fog(0xff9966, 20, 50);
        
        return wall;
    }
    
    // Helper: Create a simple house
    static createHouse(scale = 1, wallColor = 0xd4a574) {
        const house = new THREE.Group();
        
        // Walls
        const wallGeometry = new THREE.BoxGeometry(2 * scale, 2 * scale, 2 * scale);
        const wallMaterial = new THREE.MeshLambertMaterial({ color: wallColor });
        const walls = new THREE.Mesh(wallGeometry, wallMaterial);
        walls.position.y = 1 * scale;
        house.add(walls);
        
        // Roof
        const roofGeometry = new THREE.ConeGeometry(1.7 * scale, 1 * scale, 4);
        const roofMaterial = new THREE.MeshLambertMaterial({ color: 0x8b4513 });
        const roof = new THREE.Mesh(roofGeometry, roofMaterial);
        roof.position.y = 2.5 * scale;
        roof.rotation.y = Math.PI / 4;
        house.add(roof);
        
        // Door
        const doorGeometry = new THREE.BoxGeometry(0.6 * scale, 1.2 * scale, 0.1 * scale);
        const doorMaterial = new THREE.MeshLambertMaterial({ color: 0x654321 });
        const door = new THREE.Mesh(doorGeometry, doorMaterial);
        door.position.set(0, 0.6 * scale, 1 * scale);
        house.add(door);
        
        return house;
    }
    
    // Helper: Create a tree
    static createTree() {
        const tree = new THREE.Group();
        
        // Trunk
        const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.3, 2, 6);
        const trunkMaterial = new THREE.MeshLambertMaterial({ color: 0x654321 });
        const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
        trunk.position.y = 1;
        tree.add(trunk);
        
        // Foliage
        const foliageGeometry = new THREE.SphereGeometry(1, 6, 6);
        const foliageMaterial = new THREE.MeshLambertMaterial({ color: 0x2d5016 });
        const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
        foliage.position.y = 2.5;
        tree.add(foliage);
        
        return tree;
    }
    
    // Helper: Create the wall that needs repair
    static createWall() {
        const wall = new THREE.Group();
        
        // Base of wall
        const baseGeometry = new THREE.BoxGeometry(6, 3, 0.5);
        const baseMaterial = new THREE.MeshLambertMaterial({ color: 0x8b8680 });
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        base.position.y = 1.5;
        wall.add(base);
        
        // Crumbling top section (offset blocks)
        const blockGeometry = new THREE.BoxGeometry(1, 0.5, 0.5);
        const blockMaterial = new THREE.MeshLambertMaterial({ color: 0x9b9690 });
        
        for (let i = 0; i < 5; i++) {
            const block = new THREE.Mesh(blockGeometry, blockMaterial);
            block.position.set(
                (i - 2) * 1.2,
                3 + Math.random() * 0.3,
                Math.random() * 0.2
            );
            block.rotation.z = (Math.random() - 0.5) * 0.3;
            wall.add(block);
        }
        
        wall.userData.damaged = true;
        return wall;
    }
    
    // Repair the wall (visual change)
    static repairWall(wall) {
        if (!wall.userData.damaged) return;
        
        // Remove old crumbling blocks
        while (wall.children.length > 1) {
            wall.remove(wall.children[wall.children.length - 1]);
        }
        
        // Add repaired top section
        const topGeometry = new THREE.BoxGeometry(6, 0.8, 0.5);
        const topMaterial = new THREE.MeshLambertMaterial({ color: 0xa0a098 });
        const top = new THREE.Mesh(topGeometry, topMaterial);
        top.position.y = 3.4;
        wall.add(top);
        
        wall.userData.damaged = false;
    }
    
    // Damage the boat (visual change)
    static damageBoat(boat) {
        if (!boat || boat.userData.damaged) return;
        
        // Add a visible crack/hole
        const holeGeometry = new THREE.BoxGeometry(0.5, 0.3, 0.2);
        const holeMaterial = new THREE.MeshLambertMaterial({ color: 0x000000 });
        const hole = new THREE.Mesh(holeGeometry, holeMaterial);
        hole.position.set(-0.5, 0.2, 0.8);
        hole.rotation.y = 0.3;
        boat.add(hole);
        
        boat.userData.damaged = true;
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
