// environments.js - Garden environments with flourishing/destroyed states

export function createGardenEnvironment(THREE, flourishing = true) {
    const environment = new THREE.Group();
    
    if (flourishing) {
        createFlourishingGarden(THREE, environment);
    } else {
        createDestroyedGarden(THREE, environment);
    }
    
    return environment;
}

function createFlourishingGarden(THREE, environment) {
    // Ground
    const groundGeometry = new THREE.PlaneGeometry(40, 40);
    const groundMaterial = new THREE.MeshLambertMaterial({ 
        color: 0x4a6741, // Rich green
        side: THREE.DoubleSide 
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    environment.add(ground);
    
    // Grass patches (scattered)
    for (let i = 0; i < 30; i++) {
        const patchGeometry = new THREE.CircleGeometry(0.5 + Math.random() * 0.5, 8);
        const patchMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x5a7a51,
            side: THREE.DoubleSide 
        });
        const patch = new THREE.Mesh(patchGeometry, patchMaterial);
        patch.rotation.x = -Math.PI / 2;
        patch.position.set(
            (Math.random() - 0.5) * 35,
            0.01,
            (Math.random() - 0.5) * 35
        );
        environment.add(patch);
    }
    
    // Palm trees
    for (let i = 0; i < 8; i++) {
        const palm = createPalmTree(THREE, true);
        palm.position.set(
            (Math.random() - 0.5) * 30,
            0,
            (Math.random() - 0.5) * 30
        );
        environment.add(palm);
    }
    
    // Grape vines (arched)
    for (let i = 0; i < 5; i++) {
        const vine = createGrapeVine(THREE, true);
        vine.position.set(
            (Math.random() - 0.5) * 25,
            0,
            (Math.random() - 0.5) * 25
        );
        environment.add(vine);
    }
    
    // Fruit bushes
    for (let i = 0; i < 15; i++) {
        const bush = createFruitBush(THREE, true);
        bush.position.set(
            (Math.random() - 0.5) * 30,
            0,
            (Math.random() - 0.5) * 30
        );
        environment.add(bush);
    }
    
    // River
    const river = createRiver(THREE, true);
    river.position.set(0, 0.05, 0);
    environment.add(river);
    
    // Stone walls
    const wall1 = createStoneWall(THREE, true);
    wall1.position.set(-15, 0, 0);
    environment.add(wall1);
    
    const wall2 = createStoneWall(THREE, true);
    wall2.position.set(15, 0, 0);
    environment.add(wall2);
    
    environment.userData.state = 'flourishing';
}

function createDestroyedGarden(THREE, environment) {
    // Ground (cracked, dry)
    const groundGeometry = new THREE.PlaneGeometry(40, 40);
    const groundMaterial = new THREE.MeshLambertMaterial({ 
        color: 0x3d3020, // Dry brown
        side: THREE.DoubleSide 
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    environment.add(ground);
    
    // Cracked earth patches
    for (let i = 0; i < 40; i++) {
        const crackGeometry = new THREE.PlaneGeometry(
            0.2 + Math.random() * 0.3,
            2 + Math.random() * 3
        );
        const crackMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x1a1410,
            side: THREE.DoubleSide 
        });
        const crack = new THREE.Mesh(crackGeometry, crackMaterial);
        crack.rotation.x = -Math.PI / 2;
        crack.rotation.z = Math.random() * Math.PI;
        crack.position.set(
            (Math.random() - 0.5) * 35,
            0.02,
            (Math.random() - 0.5) * 35
        );
        environment.add(crack);
    }
    
    // Dead palm trees
    for (let i = 0; i < 8; i++) {
        const palm = createPalmTree(THREE, false);
        palm.position.set(
            (Math.random() - 0.5) * 30,
            0,
            (Math.random() - 0.5) * 30
        );
        palm.rotation.z = (Math.random() - 0.5) * 0.3; // Tilted
        environment.add(palm);
    }
    
    // Dead vines
    for (let i = 0; i < 5; i++) {
        const vine = createGrapeVine(THREE, false);
        vine.position.set(
            (Math.random() - 0.5) * 25,
            0,
            (Math.random() - 0.5) * 25
        );
        environment.add(vine);
    }
    
    // Dead bushes
    for (let i = 0; i < 15; i++) {
        const bush = createFruitBush(THREE, false);
        bush.position.set(
            (Math.random() - 0.5) * 30,
            0,
            (Math.random() - 0.5) * 30
        );
        environment.add(bush);
    }
    
    // Dry riverbed
    const river = createRiver(THREE, false);
    river.position.set(0, 0.02, 0);
    environment.add(river);
    
    // Collapsed walls
    const wall1 = createStoneWall(THREE, false);
    wall1.position.set(-15, 0, 0);
    environment.add(wall1);
    
    const wall2 = createStoneWall(THREE, false);
    wall2.position.set(15, 0, 0);
    environment.add(wall2);
    
    // Ash particles (static)
    for (let i = 0; i < 20; i++) {
        const ashGeometry = new THREE.SphereGeometry(0.05, 4, 4);
        const ashMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x555555,
            transparent: true,
            opacity: 0.6
        });
        const ash = new THREE.Mesh(ashGeometry, ashMaterial);
        ash.position.set(
            (Math.random() - 0.5) * 30,
            Math.random() * 2,
            (Math.random() - 0.5) * 30
        );
        environment.add(ash);
    }
    
    environment.userData.state = 'destroyed';
}

function createPalmTree(THREE, alive) {
    const tree = new THREE.Group();
    
    // Trunk
    const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.3, 4, 6);
    const trunkMaterial = new THREE.MeshLambertMaterial({ 
        color: alive ? 0x8b6f47 : 0x3d3020 
    });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.y = 2;
    tree.add(trunk);
    
    // Palm fronds
    const frondCount = alive ? 6 : 3;
    for (let i = 0; i < frondCount; i++) {
        const frondGeometry = new THREE.ConeGeometry(0.3, 2, 4);
        const frondMaterial = new THREE.MeshLambertMaterial({ 
            color: alive ? 0x4a6741 : 0x3d3020 
        });
        const frond = new THREE.Mesh(frondGeometry, frondMaterial);
        frond.position.y = 4;
        frond.rotation.z = (Math.PI / 3) + (i * Math.PI / 3);
        frond.rotation.y = i * (Math.PI * 2) / frondCount;
        
        if (!alive) {
            frond.rotation.z += Math.PI / 4; // Drooping
        }
        
        tree.add(frond);
    }
    
    return tree;
}

function createGrapeVine(THREE, alive) {
    const vine = new THREE.Group();
    
    // Arch support
    const postGeometry = new THREE.CylinderGeometry(0.1, 0.1, 2.5, 6);
    const postMaterial = new THREE.MeshLambertMaterial({ color: 0x4a3f35 });
    
    const leftPost = new THREE.Mesh(postGeometry, postMaterial);
    leftPost.position.set(-1, 1.25, 0);
    vine.add(leftPost);
    
    const rightPost = new THREE.Mesh(postGeometry, postMaterial);
    rightPost.position.set(1, 1.25, 0);
    vine.add(rightPost);
    
    // Top bar
    const barGeometry = new THREE.CylinderGeometry(0.08, 0.08, 2.2, 6);
    const bar = new THREE.Mesh(barGeometry, postMaterial);
    bar.rotation.z = Math.PI / 2;
    bar.position.y = 2.5;
    vine.add(bar);
    
    // Vines
    const vineColor = alive ? 0x3a5a2a : 0x3d3020;
    for (let i = 0; i < 5; i++) {
        const vineGeometry = new THREE.CylinderGeometry(0.03, 0.03, 2, 4);
        const vineMaterial = new THREE.MeshLambertMaterial({ color: vineColor });
        const vinePart = new THREE.Mesh(vineGeometry, vineMaterial);
        vinePart.position.set(-0.8 + i * 0.4, 1.5, 0);
        vine.add(vinePart);
        
        // Grapes
        if (alive) {
            for (let j = 0; j < 3; j++) {
                const grapeGeometry = new THREE.SphereGeometry(0.1, 6, 6);
                const grapeMaterial = new THREE.MeshLambertMaterial({ color: 0x6b3fa0 });
                const grape = new THREE.Mesh(grapeGeometry, grapeMaterial);
                grape.position.set(-0.8 + i * 0.4, 1 - j * 0.2, 0.1);
                vine.add(grape);
            }
        }
    }
    
    return vine;
}

function createFruitBush(THREE, alive) {
    const bush = new THREE.Group();
    
    // Bush body
    const bushGeometry = new THREE.SphereGeometry(0.5, 6, 6);
    const bushMaterial = new THREE.MeshLambertMaterial({ 
        color: alive ? 0x4a6741 : 0x3d3020 
    });
    const bushMesh = new THREE.Mesh(bushGeometry, bushMaterial);
    bushMesh.position.y = 0.5;
    bushMesh.scale.set(1, 0.8, 1);
    bush.add(bushMesh);
    
    // Fruits
    if (alive) {
        for (let i = 0; i < 5; i++) {
            const fruitGeometry = new THREE.SphereGeometry(0.1, 6, 6);
            const fruitMaterial = new THREE.MeshLambertMaterial({ color: 0xd4af37 }); // Golden fruit
            const fruit = new THREE.Mesh(fruitGeometry, fruitMaterial);
            fruit.position.set(
                (Math.random() - 0.5) * 0.6,
                0.5 + (Math.random() - 0.5) * 0.4,
                (Math.random() - 0.5) * 0.6
            );
            bush.add(fruit);
        }
    }
    
    return bush;
}

function createRiver(THREE, flowing) {
    const river = new THREE.Group();
    
    // River bed
    const riverGeometry = new THREE.PlaneGeometry(30, 3);
    const riverMaterial = new THREE.MeshLambertMaterial({ 
        color: flowing ? 0x4a90e2 : 0x6b5d52, // Blue or dry brown
        transparent: flowing,
        opacity: flowing ? 0.7 : 1,
        side: THREE.DoubleSide
    });
    const riverMesh = new THREE.Mesh(riverGeometry, riverMaterial);
    riverMesh.rotation.x = -Math.PI / 2;
    riverMesh.rotation.z = Math.PI / 4;
    river.add(riverMesh);
    
    // River rocks
    for (let i = 0; i < 10; i++) {
        const rockGeometry = new THREE.DodecahedronGeometry(0.2 + Math.random() * 0.2, 0);
        const rockMaterial = new THREE.MeshLambertMaterial({ color: 0x666666 });
        const rock = new THREE.Mesh(rockGeometry, rockMaterial);
        rock.position.set(
            (Math.random() - 0.5) * 28,
            0.1,
            (Math.random() - 0.5) * 2.5
        );
        rock.rotation.z = Math.PI / 4;
        river.add(rock);
    }
    
    return river;
}

function createStoneWall(THREE, intact) {
    const wall = new THREE.Group();
    
    const wallHeight = intact ? 2 : 1;
    const segments = intact ? 10 : 7;
    
    for (let i = 0; i < segments; i++) {
        const stoneGeometry = new THREE.BoxGeometry(
            1 + Math.random() * 0.3,
            0.4,
            0.4
        );
        const stoneMaterial = new THREE.MeshLambertMaterial({ color: 0x8b8680 });
        const stone = new THREE.Mesh(stoneGeometry, stoneMaterial);
        
        stone.position.set(
            0,
            (i % 2) * 0.4 + ((Math.floor(i / 2) * 0.4)),
            i * 1.2 - 6
        );
        
        if (!intact) {
            stone.rotation.z = (Math.random() - 0.5) * 0.5;
            stone.position.x += (Math.random() - 0.5) * 0.5;
        }
        
        wall.add(stone);
    }
    
    return wall;
}

export function createMeetingPlace(THREE) {
    const meeting = new THREE.Group();
    
    // Clearing ground
    const clearingGeometry = new THREE.CircleGeometry(5, 16);
    const clearingMaterial = new THREE.MeshLambertMaterial({ 
        color: 0x7a6a4a,
        side: THREE.DoubleSide 
    });
    const clearing = new THREE.Mesh(clearingGeometry, clearingMaterial);
    clearing.rotation.x = -Math.PI / 2;
    meeting.add(clearing);
    
    // Stone bench
    const benchGeometry = new THREE.BoxGeometry(2, 0.3, 0.6);
    const benchMaterial = new THREE.MeshLambertMaterial({ color: 0x8b8680 });
    const bench = new THREE.Mesh(benchGeometry, benchMaterial);
    bench.position.set(0, 0.4, 0);
    meeting.add(bench);
    
    // Bench legs
    const legGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.4, 6);
    const leg1 = new THREE.Mesh(legGeometry, benchMaterial);
    leg1.position.set(-0.7, 0.2, 0.2);
    meeting.add(leg1);
    
    const leg2 = new THREE.Mesh(legGeometry, benchMaterial);
    leg2.position.set(0.7, 0.2, 0.2);
    meeting.add(leg2);
    
    const leg3 = new THREE.Mesh(legGeometry, benchMaterial);
    leg3.position.set(-0.7, 0.2, -0.2);
    meeting.add(leg3);
    
    const leg4 = new THREE.Mesh(legGeometry, benchMaterial);
    leg4.position.set(0.7, 0.2, -0.2);
    meeting.add(leg4);
    
    return meeting;
}
