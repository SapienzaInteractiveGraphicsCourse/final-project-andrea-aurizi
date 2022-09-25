
// Get the canvas DOM element
var canvas = document.getElementById('renderCanvas');
// Load the 3D engine
var engine = new BABYLON.Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true});
// CreateScene function that creates and return the scene


// Instrumentation
var instrumentation = new BABYLON.EngineInstrumentation(engine);
instrumentation.captureGPUFrameTime = true;
instrumentation.captureShaderCompilationTime = true;

var createScene = function(){
    // Create a basic BJS Scene object
    var scene = new BABYLON.Scene(engine);

    //CAMERA

    // Parameters : name, position, scene
    var camera = new BABYLON.FollowCamera("FollowCamera", new BABYLON.Vector3(0,10,-150), scene);
    camera.rotationOffset = 180; 

    // Targets the camera to a particular position. In this case the scene origin
    //camera.setTarget(BABYLON.Vector3.Zero());

    // Attach the camera to the canvas
    camera.attachControl(canvas, true);

    // GUI
    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, scene);

    var rect1 = new BABYLON.GUI.Rectangle();
    rect1.width = 0.2;
    rect1.height = "40px";
    rect1.width = "150px";
    rect1.color = "red";
    rect1.background = "black";
    rect1.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    rect1.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    advancedTexture.addControl(rect1);

    var life1 = new BABYLON.GUI.TextBlock();
    var life = 10;
    life1.text = ""+life;
    life1.left = "25px";
    life1.color = "white";
    life1.fontFamily = "Lucida Console";
    rect1.addControl(life1);

    //addRadio("Easy", panel2 ,life1);
    //addRadio("Medium", panel2, life1);
    //addRadio("Hard", panel2, life1);

    var life2 = new BABYLON.GUI.TextBlock();
    life2.text = "LIFE: ";
    life2.left = "-15px";
    life2.color = "white";
    life2.fontFamily = "Lucida Console";
    rect1.addControl(life2);

    var rect2 = new BABYLON.GUI.Rectangle();
    rect2.width = 0.2;
    rect2.height = "150px";
    rect2.width = "200px";
    rect2.color = "red";
    rect2.background = "black";
    rect2.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    rect2.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    advancedTexture.addControl(rect2);

    var hint = new BABYLON.GUI.TextBlock("hint");
    hint.textWrapping = true;
    hint.fontFamily = "Lucida Console";
    hint.text = "Tutorial:\nW: Up S: Down\nA: Left D: Right\nB: Camera Switch";
    hint.color = "white";

    rect2.addControl(hint);

    //
    var scream = new BABYLON.Sound("screamsound", "./sounds/scream.mp3",scene, null, {volume: 0.3});


    /*var label = new BABYLON.GUI.TextBlock();
    label.fontFamily = "Lucida Console";
    label.text = "Press Spacebar to jump!";
    label.color = "white";
    advancedTexture.addControl(label);


    var label3 = new BABYLON.GUI.TextBlock();
    label3.width = 10;
    label3.height = "30px";
    label3.fontSize = 15;
    label3.fontFamily = "Lucida Console";
    label3.text = "DON'T TOUCH BOXES";
    label3.color = "white";*/
        
    //Enabling the physics engine
    var gravityVector = new BABYLON.Vector3(0,-9.81, 0);
    var physicsPlugin = new BABYLON.CannonJSPlugin();
    scene.enablePhysics(gravityVector, physicsPlugin);
    var physicsViewer = new BABYLON.Debug.PhysicsViewer();
    var physicsHelper = new BABYLON.PhysicsHelper(scene);


    //SKYBOX
    var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 1000.0 }, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("./skybox2/skybox2", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.freeze();
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skybox.material = skyboxMaterial;
    
    // Create a basic light, aiming 0, 1, 0 - meaning, to the sky
    var flag_change_light = false;
    var flag_light = 0;

    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
    var light1 = new BABYLON.SpotLight("light1", new BABYLON.Vector3(-40, 40, 35), new BABYLON.Vector3(1, -1, 1), Math.PI/5, 0, scene);  
    light1.diffuse = new BABYLON.Color3(1,0,0);
    var light2 = new BABYLON.SpotLight("light2", new BABYLON.Vector3(-40, 40, 20), new BABYLON.Vector3(1, -1, 1), Math.PI/5, 0, scene);  
    light2.diffuse = new BABYLON.Color3(1,0,0);
    light2.diffuseColor = new BABYLON.Color3(1,0,0);
    var light3 = new BABYLON.SpotLight("light3", new BABYLON.Vector3(-40, 40, 35), new BABYLON.Vector3(1, -1, 1), Math.PI/5, 0, scene);  
    light3.diffuse = new BABYLON.Color3(0,1,0);
    var light4 = new BABYLON.SpotLight("light4", new BABYLON.Vector3(-40, 40, 20), new BABYLON.Vector3(1, -1, 1), Math.PI/5, 0, scene);  
    light4.diffuse = new BABYLON.Color3(0,1,0);
    var light5 = new BABYLON.SpotLight("light5", new BABYLON.Vector3(-40, 40, 35), new BABYLON.Vector3(1, -1, 1), Math.PI/5, 0, scene);  
    light5.diffuse = new BABYLON.Color3(0,0,1);
    var light6 = new BABYLON.SpotLight("light6", new BABYLON.Vector3(-40, 40, 20), new BABYLON.Vector3(1, -1, 1), Math.PI/5, 0, scene);  
    light6.diffuse = new BABYLON.Color3(0,0,1);

    light1.setEnabled(false);
    light2.setEnabled(false);
    light3.setEnabled(false);
    light4.setEnabled(false);
    light5.setEnabled(false);
    light6.setEnabled(false);
    


    //HIT BOXES-----------------------------------------------------------------------------------------------------------------------------------
    var body, left_building_box, right_building_box;
    var hit_box_visible = false;
    //Body
    body = BABYLON.MeshBuilder.CreateBox("body", {height: 1.8, width: 0.6, depth: 0.4});
    body.visibility = hit_box_visible;
    camera.lockedTarget = body;
    body.position = new BABYLON.Vector3(0, 0.9, -150); 
    
    let bodyMaterial = new BABYLON.StandardMaterial("Body Material", scene);
    body.material = bodyMaterial;
    body.material.diffuseColor = BABYLON.Color3.Red();
    body.physicsImpostor = new BABYLON.PhysicsImpostor(body, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 80, restitution: 0});
    body.physicsImpostor.physicsBody.inertia.setZero();
    body.physicsImpostor.physicsBody.invInertia.setZero();
    body.physicsImpostor.physicsBody.invInertiaWorld.setZero();

    //Body tank
    body_tank = BABYLON.MeshBuilder.CreateBox("body_tank", {height: 4, width: 5, depth: 4});
    body_tank.visibility = hit_box_visible;
    body_tank.position = new BABYLON.Vector3(0, 1, 60); 
    
    body_tank.material = bodyMaterial;
    body_tank.physicsImpostor = new BABYLON.PhysicsImpostor(body_tank, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 8000, restitution: 0});
    body_tank.physicsImpostor.physicsBody.inertia.setZero();
    body_tank.physicsImpostor.physicsBody.invInertia.setZero();
    body_tank.physicsImpostor.physicsBody.invInertiaWorld.setZero();

    

    
    //left building block
    left_building_box = BABYLON.MeshBuilder.CreateBox("left_building_box", {height: 10, width: 2, depth: 320});
    left_building_box.visibility = hit_box_visible;
    left_building_box.position = new BABYLON.Vector3(-12.8, 5, 0); 
    
    let left_building_box_material = new BABYLON.StandardMaterial("left_building_box Material", scene);
    left_building_box.material = left_building_box_material;
    left_building_box.material.diffuseColor = BABYLON.Color3.Red();
    left_building_box.physicsImpostor = new BABYLON.PhysicsImpostor(left_building_box, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 0, restitution: 0});
    left_building_box.physicsImpostor.physicsBody.inertia.setZero();
    left_building_box.physicsImpostor.physicsBody.invInertia.setZero();
    left_building_box.physicsImpostor.physicsBody.invInertiaWorld.setZero();

    //right building block
    right_building_box = BABYLON.MeshBuilder.CreateBox("right_building_box", {height: 10, width: 2, depth: 320});
    right_building_box.visibility = hit_box_visible;
    right_building_box.position = new BABYLON.Vector3(+12.8, 5, 0); 
    
    let right_building_box_material = new BABYLON.StandardMaterial("right_building_box Material", scene);
    right_building_box.material = right_building_box_material;
    right_building_box.material.diffuseColor = BABYLON.Color3.Red();
    right_building_box.physicsImpostor = new BABYLON.PhysicsImpostor(right_building_box, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 0, restitution: 0});
    right_building_box.physicsImpostor.physicsBody.inertia.setZero();
    right_building_box.physicsImpostor.physicsBody.invInertia.setZero();
    right_building_box.physicsImpostor.physicsBody.invInertiaWorld.setZero();

    //crate box
    right_crate_box = BABYLON.MeshBuilder.CreateBox("right_crate_box", {height: 10, width: 5, depth: 20});
    right_crate_box.visibility = hit_box_visible;
    right_crate_box.position = new BABYLON.Vector3(9.5, 5, -52); 
    
    let right_crate_box_material = new BABYLON.StandardMaterial("right_crate_box Material", scene);
    right_crate_box.material = right_crate_box_material;
    right_crate_box.material.diffuseColor = BABYLON.Color3.Red();
    right_crate_box.physicsImpostor = new BABYLON.PhysicsImpostor(right_crate_box, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 0, restitution: 0});
    right_crate_box.physicsImpostor.physicsBody.inertia.setZero();
    right_crate_box.physicsImpostor.physicsBody.invInertia.setZero();
    right_crate_box.physicsImpostor.physicsBody.invInertiaWorld.setZero();

    
    left_crate_box = BABYLON.MeshBuilder.CreateBox("left_crate_box", {height: 10, width: 5, depth: 20});
    left_crate_box.visibility = hit_box_visible;
    left_crate_box.position = new BABYLON.Vector3(-9.5, 5, -52); 
    
    let left_crate_box_material = new BABYLON.StandardMaterial("left_crate_box Material", scene);
    left_crate_box.material = left_crate_box_material;
    left_crate_box.material.diffuseColor = BABYLON.Color3.Red();
    left_crate_box.physicsImpostor = new BABYLON.PhysicsImpostor(left_crate_box, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 0, restitution: 0});
    left_crate_box.physicsImpostor.physicsBody.inertia.setZero();
    left_crate_box.physicsImpostor.physicsBody.invInertia.setZero();
    left_crate_box.physicsImpostor.physicsBody.invInertiaWorld.setZero();
    
    //MESHES-------------------------------------------------------------------------------------------------------------------------------------
    //character mesh
    var character;
    var basic_position = [];
    var basic_rotation = [];
    BABYLON.SceneLoader.ImportMesh("", "./Assets-master/meshes/dude/", "dude.babylon", scene, function (meshes, particleSystems, skeletons){
        character = meshes[0];
        skeleton = skeletons[0];
        character.position = new BABYLON.Vector3(0, 0, 0);
        character.scaling = new BABYLON.Vector3(0.02, 0.02, 0.02);    
        character.rotate(BABYLON.Axis.Y, 0, BABYLON.Space.LOCAL);
        //camera.radius = 20;
        //camera.heightOffset = 20;   
        character.parent = body;   
        character.position.y -= 0.9; 
        skeleton.bones[32].rotate(BABYLON.Axis.Y, -0.5, BABYLON.Space.LOCAL);
        skeleton.bones[13].rotate(BABYLON.Axis.Y, +0.5, BABYLON.Space.LOCAL);
        for(k = 0; k < skeleton.bones.length; k++){
            basic_position[k] = skeleton.bones[k].getPosition();
            basic_rotation[k] = skeleton.bones[k].getRotation();
        }
    });
    
	/*var shadowGenerator = new BABYLON.ShadowGenerator(1024, light1);
	shadowGenerator.addShadowCaster(skeletons);
	//shadowGenerator.useExponentialShadowMap = true;

	var shadowGenerator2 = new BABYLON.ShadowGenerator(1024, light2);
	shadowGenerator2.addShadowCaster(skeletons);
	//shadowGenerator2.usePoissonSampling = true;

	ground.receiveShadows = true;*/
   

    //buildings and lights meshes
    var lamp, building, house;
    BABYLON.SceneLoader.ImportMesh("", "./Assets-master/meshes/", "lamp.babylon", scene, function (meshes) {
        lamp = meshes[0];
        lamp.scaling = new BABYLON.Vector3(0.3, 0.3, 0.3);
        lamp.position = new BABYLON.Vector3(10, 0, -135);
        lamp.rotate(BABYLON.Axis.Y, Math.PI, BABYLON.Space.LOCAL);
    });
    BABYLON.SceneLoader.ImportMesh("", "./Assets-master/meshes/", "lamp.babylon", scene, function (meshes) {
        lamp = meshes[0];
        lamp.scaling = new BABYLON.Vector3(0.3, 0.3, 0.3);
        lamp.position = new BABYLON.Vector3(-10, 0, -135);
        //lamp.rotate(BABYLON.Axis.Y, -Math.PI, BABYLON.Space.LOCAL);
    });
    var building2;
    
    BABYLON.SceneLoader.ImportMesh("", "./Assets-master/meshes/building/", "scene.gltf", scene, function (meshes){ 
        building = meshes[0];  
        building.scaling = new BABYLON.Vector3(0.015, 0.015, 0.015);
        building.position = new BABYLON.Vector3(16, 0, -145);
        building.rotate(BABYLON.Axis.Y, Math.PI, BABYLON.Space.LOCAL);
        for(i=1; i<=13; i++){
            building2 = building.clone("");
            if(i%2 != 0){
                building2.position = new BABYLON.Vector3(16, 0, -126+(45.1*((i-1)/2)));
                building2.position.x *= (-1);
            }else{
               building.position = new BABYLON.Vector3(16, 0, -99.5+(45.1*((i/2)-1)));
            }
        }
    });

    BABYLON.SceneLoader.ImportMesh("", "./Assets-master/meshes/chicago_buildings/", "scene.gltf", scene, function (meshes){   
        house = meshes[0];
        house.scaling = new BABYLON.Vector3(0.1, 0.1, 0.1);
        house.position = new BABYLON.Vector3(-12.1, 0.7, -150);
        house.rotate(BABYLON.Axis.Y, -Math.PI/2, BABYLON.Space.LOCAL);
        for(i=1; i<=13; i++){
            house2 = house.clone("");
            if(i%2 != 0){
                house2.position = new BABYLON.Vector3(-12.1, 0.35, -120.5+(45.1*((i-1)/2)));
                house2.position.x *= (-1);
                house2.rotate(BABYLON.Axis.Y, Math.PI, BABYLON.Space.LOCAL);
            }else{
                house2.position = new BABYLON.Vector3(-12.1, 0.35, -104.5+(45.1*((i/2)-1)));
            }
        }
    });

    //adding a simple ground
    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width:50, height:320});
    const groundMat = new BABYLON.StandardMaterial("groundMat");
    groundMat.diffuseTexture = new BABYLON.Texture("./Assets-master/materials/asfalto.png");
    groundMat.diffuseTexture.uScale = 6.5;
    groundMat.diffuseTexture.vScale = 18.0;
    ground.material = groundMat;
    ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0}, scene);

    const groundToxic = BABYLON.MeshBuilder.CreateBox("groundToxic", {height: 0.001, width: 23.4, depth: 30});
    groundToxic.position = new BABYLON.Vector3(0,0.1,-5);
    const groundToxicMat = new BABYLON.StandardMaterial("groundToxicMat");
    groundToxicMat.diffuseTexture = new BABYLON.Texture("./Assets-master/textures/poison.png");
    groundToxic.material = groundToxicMat;
    groundToxic.physicsImpostor = new BABYLON.PhysicsImpostor(groundToxic, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0}, scene);



    //Hierarchical model    
    var temp = 0;
    var engaged = false;
    var done = false;
    var finish = false;
    var final_boss = false;
    var right_direction = false;
    var restart = false;

    var box_lower = BABYLON.MeshBuilder.CreateBox("box_lower", {height: 1.5, width: 5.4, depth: 3});
    box_lower.position = new BABYLON.Vector3(0, -1, 0);
    box_lower.parent = body_tank;
    
    var box_upper = BABYLON.MeshBuilder.CreateBox("box_upper", {height: 0.65, width: 2.8, depth: 2});
    box_upper.parent = box_lower; 
    box_upper.position = new BABYLON.Vector3(0, 1, 0);

    const container1 = BABYLON.MeshBuilder.CreateBox("container1", {height: 0.7, width: 5, depth: 0.1});
    container1.parent = box_lower; 
    container1.position = new BABYLON.Vector3(0, -0.4, -1.55);

    const container2 = BABYLON.MeshBuilder.CreateBox("container2", {height: 0.7, width: 5, depth: 0.1});
    container2.parent = box_lower; 
    container2.position = new BABYLON.Vector3(0, -0.4, +1.55);

    var wheel1 = BABYLON.MeshBuilder.CreateCylinder("wheel1", {height:0.4, diameterTop:0.9, diameterBottom:0.9, tessellation:12, subdivisions:1} , scene);
    wheel1.parent = container2;
    wheel1.position = new BABYLON.Vector3(0, -0.2, 0.2);
    wheel1.rotate(BABYLON.Axis.X, Math.PI/2, BABYLON.Space.LOCAL);
    
    var wheel2 = BABYLON.MeshBuilder.CreateCylinder("wheel2", {height:0.4, diameterTop:0.9, diameterBottom:0.9, tessellation:12, subdivisions:1} , scene);
    wheel2.parent = container2;
    wheel2.position = new BABYLON.Vector3(-1.95, -0.2, 0.2);
    wheel2.rotate(BABYLON.Axis.X, Math.PI/2, BABYLON.Space.LOCAL);
    
    var wheel3 = BABYLON.MeshBuilder.CreateCylinder("wheel3", {height:0.4, diameterTop:0.9, diameterBottom:0.9, tessellation:12, subdivisions:1} , scene);
    wheel3.parent = container2;
    wheel3.position = new BABYLON.Vector3(1.95, -0.2, 0.2);
    wheel3.rotate(BABYLON.Axis.X, Math.PI/2, BABYLON.Space.LOCAL);
    
    var wheel4 = BABYLON.MeshBuilder.CreateCylinder("wheel4", {height:0.4, diameterTop:0.9, diameterBottom:0.9, tessellation:12, subdivisions:1} , scene);
    wheel4.parent = container1; 
    wheel4.position = new BABYLON.Vector3(0, -0.2, -0.2);
    wheel4.rotate(BABYLON.Axis.X, Math.PI/2, BABYLON.Space.LOCAL);
    
    var wheel5 = BABYLON.MeshBuilder.CreateCylinder("wheel5", {height:0.4, diameterTop:0.9, diameterBottom:0.9, tessellation:12, subdivisions:1} , scene);
    wheel5.parent = container1; 
    wheel5.position = new BABYLON.Vector3(-1.95, -0.2, -0.2);
    wheel5.rotate(BABYLON.Axis.X, Math.PI/2, BABYLON.Space.LOCAL);
    
    var wheel6 = BABYLON.MeshBuilder.CreateCylinder("wheel6", {height:0.4, diameterTop:0.9, diameterBottom:0.9, tessellation:12, subdivisions:1} , scene);
    wheel6.parent = container1; 
    wheel6.position = new BABYLON.Vector3(1.95, -0.2, -0.2);
    wheel6.rotate(BABYLON.Axis.X, Math.PI/2, BABYLON.Space.LOCAL);
    
    const sphere = BABYLON.Mesh.CreateSphere("sphere", 16, 1.4, scene, Math.PI/2); //optional parameters after scene
    sphere.parent = box_upper;
    sphere.position = new BABYLON.Vector3(0,0.4,0);
    sphere.rotate(BABYLON.Axis.Z, -Math.PI/30, BABYLON.Space.LOCAL);

    var cannon = BABYLON.MeshBuilder.CreateCylinder("cannon", {height:3, diameterTop:0.25, diameterBottom:0.35, tessellation:12, subdivisions:1} , scene);
    cannon.parent = sphere; 
    cannon.position = new BABYLON.Vector3(1.5, 0.3, 0);
    cannon.rotate(BABYLON.Axis.X, Math.PI/2, BABYLON.Space.LOCAL);
    cannon.rotate(BABYLON.Axis.Z, Math.PI/2, BABYLON.Space.LOCAL);
    
    const antenna_based = BABYLON.MeshBuilder.CreateCylinder("antenna_based", {height:0.5, diameterTop:0.1, diameterBottom:0.1, tessellation:12, subdivisions:1} , scene);
    antenna_based.parent = box_lower;
    antenna_based.position = new BABYLON.Vector3(-2,1,1);
    antenna_based.rotate(BABYLON.Axis.Y, -Math.PI/15, BABYLON.Space.LOCAL);
    
    const antenna_upper = BABYLON.MeshBuilder.CreateCylinder("antenna_upper", {height:0.6, diameterTop:0.15, diameterBottom:0.15, tessellation:12, subdivisions:1} , scene);
    antenna_upper.parent = antenna_based;
    antenna_upper.position = new BABYLON.Vector3(0,0.32,0);
    antenna_upper.rotate(BABYLON.Axis.Z, Math.PI/2, BABYLON.Space.LOCAL);

    const cone_4 = BABYLON.MeshBuilder.CreateCylinder("cone_4", {height:0.6, diameterTop:0.16, diameterBottom:0, tessellation:12, subdivisions:1} , scene);
    cone_4.parent = wheel4;
    cone_4.position = new BABYLON.Vector3(0,-0.4,0.2);
    cone_4.rotate(BABYLON.Axis.X, -Math.PI/8, BABYLON.Space.LOCAL);

    const cone_5 = BABYLON.MeshBuilder.CreateCylinder("cone_5", {height:0.6, diameterTop:0.16, diameterBottom:0, tessellation:12, subdivisions:1} , scene);
    cone_5.parent = wheel5;
    cone_5.position = new BABYLON.Vector3(-0.2,-0.4,-0.1);
    cone_5.rotate(BABYLON.Axis.Z, -Math.PI/8, BABYLON.Space.LOCAL);

    const cone_6 = BABYLON.MeshBuilder.CreateCylinder("cone_6", {height:0.6, diameterTop:0.16, diameterBottom:0, tessellation:12, subdivisions:1} , scene);
    cone_6.parent = wheel6;
    cone_6.position = new BABYLON.Vector3(0.25,-0.4,0);
    cone_6.rotate(BABYLON.Axis.Z, Math.PI/8, BABYLON.Space.LOCAL);

    const tankMat = new BABYLON.StandardMaterial("tankMat");
    tankMat.diffuseTexture = new BABYLON.Texture("./Assets-master/materials/verde_militare.png");
    const coneMat = new BABYLON.StandardMaterial("coneMat");
    coneMat.diffuseTexture = new BABYLON.Texture("./Assets-master/materials/fire.jpg");
    const steelMat = new BABYLON.StandardMaterial("steelMat");
    steelMat.diffuseTexture = new BABYLON.Texture("./Assets-master/materials/grey.jpg");
    const containerMat = new BABYLON.StandardMaterial("containerMat");
    containerMat.diffuseColor = new BABYLON.Color3(0, 0, 0);

    box_lower.material = tankMat;
    box_upper.material = tankMat;
    container1.material = containerMat;
    container2.material = containerMat;
    wheel1.material = tankMat;
    wheel2.material = tankMat;
    wheel3.material = tankMat;
    wheel4.material = tankMat;
    wheel5.material = tankMat;
    wheel6.material = tankMat;
    cone_4.material = coneMat;
    cone_5.material = coneMat;
    cone_6.material = coneMat;
    antenna_based.material = steelMat;
    antenna_upper.material = steelMat;
    sphere.material = steelMat;
    cannon.material = steelMat;

    //LEVEL #1
    //HIT BOXES OF WALL
    wall_box1 = BABYLON.MeshBuilder.CreateBox("wall_box1", {height: 4, width: 2, depth: 2});
    wall_box1.visibility = hit_box_visible;
    wall_box1.position = new BABYLON.Vector3(-11, 2, -90); 
    wall_box1.material = bodyMaterial;
    wall_box1.physicsImpostor = new BABYLON.PhysicsImpostor(wall_box1, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 0, restitution: 0});
    wall_box1.physicsImpostor.physicsBody.inertia.setZero();
    wall_box1.physicsImpostor.physicsBody.invInertia.setZero();
    wall_box1.physicsImpostor.physicsBody.invInertiaWorld.setZero();
    
    wall_box2 = BABYLON.MeshBuilder.CreateBox("wall_box2", {height: 4, width: 18, depth: 2});
    wall_box2.visibility = hit_box_visible;
    wall_box2.position = new BABYLON.Vector3(3, 2, -90); 
    wall_box2.material = bodyMaterial;
    wall_box2.physicsImpostor = new BABYLON.PhysicsImpostor(wall_box2, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 0, restitution: 0});
    wall_box2.physicsImpostor.physicsBody.inertia.setZero();
    wall_box2.physicsImpostor.physicsBody.invInertia.setZero();
    wall_box2.physicsImpostor.physicsBody.invInertiaWorld.setZero();
    

    wall_box3 = BABYLON.MeshBuilder.CreateBox("wall_box3", {height: 4, width: 10, depth: 2});
    wall_box3.visibility = hit_box_visible;
    wall_box3.position = new BABYLON.Vector3(-7, 2, -89.5); 
    wall_box3.material = bodyMaterial;
    wall_box3.physicsImpostor = new BABYLON.PhysicsImpostor(wall_box3, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 0, restitution: 0});
    wall_box3.physicsImpostor.physicsBody.inertia.setZero();
    wall_box3.physicsImpostor.physicsBody.invInertia.setZero();
    wall_box3.physicsImpostor.physicsBody.invInertiaWorld.setZero();
    
    wall_box4 = BABYLON.MeshBuilder.CreateBox("wall_box4", {height: 4, width: 10, depth: 2});
    wall_box4.visibility = hit_box_visible;
    wall_box4.position = new BABYLON.Vector3(7.5, 2, -89.5); 
    wall_box4.material = bodyMaterial;
    wall_box4.physicsImpostor = new BABYLON.PhysicsImpostor(wall_box4, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 0, restitution: 0});
    wall_box4.physicsImpostor.physicsBody.inertia.setZero();
    wall_box4.physicsImpostor.physicsBody.invInertia.setZero();
    wall_box4.physicsImpostor.physicsBody.invInertiaWorld.setZero();
    

    wall_box5 = BABYLON.MeshBuilder.CreateBox("wall_box5", {height: 4, width: 6, depth: 2});
    wall_box5.visibility = hit_box_visible;
    wall_box5.position = new BABYLON.Vector3(-8.5, 2, -89); 
    wall_box5.material = bodyMaterial;
    wall_box5.physicsImpostor = new BABYLON.PhysicsImpostor(wall_box5, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 0, restitution: 0});
    wall_box5.physicsImpostor.physicsBody.inertia.setZero();
    wall_box5.physicsImpostor.physicsBody.invInertia.setZero();
    wall_box5.physicsImpostor.physicsBody.invInertiaWorld.setZero();
    
    wall_box6 = BABYLON.MeshBuilder.CreateBox("wall_box6", {height: 4, width: 14.5, depth: 2});
    wall_box6.visibility = hit_box_visible;
    wall_box6.position = new BABYLON.Vector3(4.5, 2, -89); 
    wall_box6.material = bodyMaterial;
    wall_box6.physicsImpostor = new BABYLON.PhysicsImpostor(wall_box6, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 0, restitution: 0});
    wall_box6.physicsImpostor.physicsBody.inertia.setZero();
    wall_box6.physicsImpostor.physicsBody.invInertia.setZero();
    wall_box6.physicsImpostor.physicsBody.invInertiaWorld.setZero();
    
    
    wall_box7 = BABYLON.MeshBuilder.CreateBox("wall_box7", {height: 4, width: 19, depth: 2});
    wall_box7.visibility = hit_box_visible;
    wall_box7.position = new BABYLON.Vector3(-2, 2, -88.5); 
    wall_box7.material = bodyMaterial;
    wall_box7.physicsImpostor = new BABYLON.PhysicsImpostor(wall_box7, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 0, restitution: 0});
    wall_box7.physicsImpostor.physicsBody.inertia.setZero();
    wall_box7.physicsImpostor.physicsBody.invInertia.setZero();
    wall_box7.physicsImpostor.physicsBody.invInertiaWorld.setZero();

    wall_box8 = BABYLON.MeshBuilder.CreateBox("wall_box8", {height: 4, width: 1, depth: 2});
    wall_box8.visibility = hit_box_visible;
    wall_box8.position = new BABYLON.Vector3(11.5, 2, -88.5); 
    wall_box8.material = bodyMaterial;
    wall_box8.physicsImpostor = new BABYLON.PhysicsImpostor(wall_box8, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 0, restitution: 0});
    wall_box8.physicsImpostor.physicsBody.inertia.setZero();
    wall_box8.physicsImpostor.physicsBody.invInertia.setZero();
    wall_box8.physicsImpostor.physicsBody.invInertiaWorld.setZero();
    
    
    wall_box9 = BABYLON.MeshBuilder.CreateBox("wall_box9", {height: 4, width: 15, depth: 2});
    wall_box9.visibility = hit_box_visible;
    wall_box9.position = new BABYLON.Vector3(-4.5, 2, -88); 
    wall_box9.material = bodyMaterial;
    wall_box9.physicsImpostor = new BABYLON.PhysicsImpostor(wall_box9, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 0, restitution: 0});
    wall_box9.physicsImpostor.physicsBody.inertia.setZero();
    wall_box9.physicsImpostor.physicsBody.invInertia.setZero();
    wall_box9.physicsImpostor.physicsBody.invInertiaWorld.setZero();

    wall_box10 = BABYLON.MeshBuilder.CreateBox("wall_box10", {height: 4, width: 5, depth: 2});
    wall_box10.visibility = hit_box_visible;
    wall_box10.position = new BABYLON.Vector3(9, 2, -88); 
    wall_box10.material = bodyMaterial;
    wall_box10.physicsImpostor = new BABYLON.PhysicsImpostor(wall_box10, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 0, restitution: 0});
    wall_box10.physicsImpostor.physicsBody.inertia.setZero();
    wall_box10.physicsImpostor.physicsBody.invInertia.setZero();
    wall_box10.physicsImpostor.physicsBody.invInertiaWorld.setZero();
    


    //WALLS
    const wallMat = new BABYLON.StandardMaterial("wallMat");
    wallMat.diffuseTexture = new BABYLON.Texture("./Assets-master/materials/wall_material.jpg");
    wallMat.diffuseTexture.uScale = 6.5;
    wallMat.diffuseTexture.vScale = 2.0;

    wall1 = BABYLON.MeshBuilder.CreateBox("wall1", {height: 4, width: 2, depth: 1});
    wall1.position = new BABYLON.Vector3(0,0,0.5);
    wall1.material = wallMat;
    wall1.parent = wall_box1; 
    wall2 = BABYLON.MeshBuilder.CreateBox("wall2", {height: 4, width: 18, depth: 1});
    wall2.position = new BABYLON.Vector3(0,0,0.5);
    wall2.material = wallMat;
    wall2.parent = wall_box2; 
    
    wall3 = BABYLON.MeshBuilder.CreateBox("wall3", {height: 4, width: 10, depth: 1});
    wall3.position = new BABYLON.Vector3(0,0,0.5); 
    wall3.material = wallMat;
    wall3.parent = wall_box3;
    wall4 = BABYLON.MeshBuilder.CreateBox("wall4", {height: 4, width: 10, depth: 1});
    wall4.position = new BABYLON.Vector3(0,0,0.5);
    wall4.material = wallMat;
    wall4.parent = wall_box4;
    
    wall5 = BABYLON.MeshBuilder.CreateBox("wall5", {height: 4, width: 6, depth: 1});
    wall5.position = new BABYLON.Vector3(0,0,0.5);
    wall5.material = wallMat;
    wall5.parent = wall_box5;
    wall6 = BABYLON.MeshBuilder.CreateBox("wall6", {height: 4, width: 14.5, depth: 1});
    wall6.position = new BABYLON.Vector3(0,0,0.5);
    wall6.material = wallMat;
    wall6.parent = wall_box6;
    
    wall7 = BABYLON.MeshBuilder.CreateBox("wall7", {height: 4, width: 19, depth: 1});
    wall7.position = new BABYLON.Vector3(0,0,0.5);
    wall7.material = wallMat;
    wall7.parent = wall_box7;
    wall8 = BABYLON.MeshBuilder.CreateBox("wall8", {height: 4, width: 1, depth: 1});
    wall8.position = new BABYLON.Vector3(0,0,0.5); 
    wall8.material = wallMat;
    wall8.parent = wall_box8;
    
    wall9 = BABYLON.MeshBuilder.CreateBox("wall9", {height: 4, width: 15, depth: 1});
    wall9.position = new BABYLON.Vector3(0,0,0.5); 
    wall9.material = wallMat;
    wall9.parent = wall_box9;
    wall10 = BABYLON.MeshBuilder.CreateBox("wall10", {height: 4, width: 5, depth: 1});
    wall10.position = new BABYLON.Vector3(0,0,0.5);
    wall10.material = wallMat; 
    wall10.parent = wall_box10;

    //input keyboard
    var camera_check = false;
    var jump_check = true;

    /*const deviceSourceManager = new BABYLON.DeviceSourceManager(scene.getEngine());
    deviceSourceManager.onDeviceConnectedObservable.add((deviceSource) => {
        if (deviceSource.deviceType === BABYLON.DeviceType.Keyboard) {
            deviceSource.onInputChangedObservable.add((eventData) => {
                if(eventData.inputIndex=="87"){
                    body.position.z+=0.2;
                    console.log(body.position.z);
                }
                if(eventData.inputIndex=="65"){
                    body.position.x-=0.15;
                }
                if(eventData.inputIndex=="83"){
                    body.position.z-=0.2;
                }
                if(eventData.inputIndex=="68"){
                    body.position.x+=0.15;
                }
                console.log(eventData.inputIndex);
                if(eventData.inputIndex=="32"){
                    if(jump_check){
                        jump_check = false;
                        body.physicsImpostor.applyImpulse(new BABYLON.Vector3(0.5, 400, -1), body.getAbsolutePosition());
                    }
                }


            });
        }
    });
    window.addEventListener("keyup", function (evt) {
        if(evt.keyCode == 67){
            if(!camera_check){
            
                camera.maxZ = 10000;
                camera.radius = 20;
                camera.heightOffset = 10;
                camera.rotationOffset = 180;
    
                camera_check = true;
            }
            else{
                
                camera.maxZ = 270;
                camera.radius = 25;
                camera.heightOffset = 20;
                camera.rotationOffset = 180;
                camera_check = false;
            }
        }
    });*/

    
    /**** Keyboard Events *****/
    var flag_cam = false;
    var flag_light_one_time = false;
    var inputMap = {};
    scene.actionManager = new BABYLON.ActionManager(scene);
    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
    console.log(evt.sourceEvent.key)
        inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
        flag_cam = true;
        flag_light_one_time = true;
    }));
    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
        inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
        flag_cam = false;
        flag_light_one_time = false;
    }));

    var updown = false;
    var moving_speed = 0.2;
    var countwalk = 0;
    var walkup = false;
    var walkdown = false;
    var walkright = false;
    var walkleft = false;
    var lefthand = false;
    var righthand = false;
    var flag_s = false;
    var flag_a = false;
    var flag_d = false;


    //Rendering loop (executed for everyframe)
    scene.onBeforeRenderObservable.add(() => {
        var keydown = false;
        //console.log(inputMap);
        //Manage the movements of the character (e.g. position, direction)
        /*if (inputMap["w"] || inputMap["W"] || inputMap["a"] || inputMap["A"] || inputMap["s"] || inputMap["S"] || inputMap["d"] || inputMap["D"]) {
            console.log(skeleton.bones[7].position);        
            console.log(character.position);        
            if(skeleton.bones[7].position.Y > 1.7) {
                updown = false;
            }
            else if(skeleton.bones[7].position.Y < 1.7 ) {
                updown = true;
            }
            if(updown){
                skeleton.bones[7].translate(new BABYLON.Vector3(0, 0.2, 0));
            } 
            else{
                skeleton.bones[7].translate(new BABYLON.Vector3(0, -0.2, 0));
            } 
        }*/
        if (inputMap["w"] || inputMap["W"]) {
            //character.moveWithCollisions(character.forward.scaleInPlace(characterSpeed));
            body.position.z += moving_speed;
            keydown = true;
            
            if(!walkup && !walkright && !walkdown && !walkleft){
                walkup = true;
            }
            if(walkup){
                if (countwalk>10){
                    lefthand = false;
                }
                else if(countwalk < -10){
                    lefthand= true;
                }
                if(lefthand){
                    //arms
                    skeleton.bones[32].rotate(BABYLON.Axis.X, 0.075, BABYLON.Space.LOCAL);
                    skeleton.bones[13].rotate(BABYLON.Axis.X, 0.075, BABYLON.Space.LOCAL);
            
                    skeleton.bones[50].translate(new BABYLON.Vector3(0, 0.5, 0));
                    skeleton.bones[54].translate(new BABYLON.Vector3(0, -0.5, 0));
            
            
                    skeleton.bones[51].rotate(BABYLON.Axis.Z, -0.04, BABYLON.Space.LOCAL);
                    skeleton.bones[55].rotate(BABYLON.Axis.Z, 0.04, BABYLON.Space.LOCAL);
                    skeleton.bones[51].translate(new BABYLON.Vector3(0, 0.5, 0));
                    skeleton.bones[55].translate(new BABYLON.Vector3(0, -0.5, 0));
            
            
                    countwalk = countwalk +1;
                }
                else{
                    //arms
                    skeleton.bones[32].rotate(BABYLON.Axis.X, -0.075, BABYLON.Space.LOCAL);
                    skeleton.bones[13].rotate(BABYLON.Axis.X, -0.075, BABYLON.Space.LOCAL);
            
                    skeleton.bones[50].translate(new BABYLON.Vector3(0, -0.5, 0));
                    skeleton.bones[54].translate(new BABYLON.Vector3(0, 0.5, 0));
            
                    skeleton.bones[51].rotate(BABYLON.Axis.Z, 0.04, BABYLON.Space.LOCAL);
                    skeleton.bones[55].rotate(BABYLON.Axis.Z, -0.04, BABYLON.Space.LOCAL);
                    skeleton.bones[51].translate(new BABYLON.Vector3(0, -0.5, 0));
                    skeleton.bones[55].translate(new BABYLON.Vector3(0, 0.5, 0));
            
            
                    countwalk = countwalk-1;
                }
            }
        }
        if (inputMap["s"] || inputMap["S"]) {
            //character.moveWithCollisions(character.forward.scaleInPlace(-characterSpeedBackwards));
            body.position.z -= moving_speed;
            keydown = true;   
            if(!walkup && !walkright && !walkdown && !walkleft){
                walkdown = true;
                flag_s = true;
                character.rotate(BABYLON.Axis.Y, Math.PI, BABYLON.Space.LOCAL);
            }
            if(walkdown){
                if (countwalk>10){
                    lefthand = false;
                }
                else if(countwalk < -10){
                    lefthand= true;
                }
                if(lefthand){
                    //arms
                    skeleton.bones[32].rotate(BABYLON.Axis.X, 0.075, BABYLON.Space.LOCAL);
                    skeleton.bones[13].rotate(BABYLON.Axis.X, 0.075, BABYLON.Space.LOCAL);
            
                    skeleton.bones[50].translate(new BABYLON.Vector3(0, 0.5, 0));
                    skeleton.bones[54].translate(new BABYLON.Vector3(0, -0.5, 0));
            
            
                    skeleton.bones[51].rotate(BABYLON.Axis.Z, -0.04, BABYLON.Space.LOCAL);
                    skeleton.bones[55].rotate(BABYLON.Axis.Z, 0.04, BABYLON.Space.LOCAL);
                    skeleton.bones[51].translate(new BABYLON.Vector3(0, 0.5, 0));
                    skeleton.bones[55].translate(new BABYLON.Vector3(0, -0.5, 0));
            
            
                    countwalk = countwalk +1;
                }
                else{
                    //arms
                    skeleton.bones[32].rotate(BABYLON.Axis.X, -0.075, BABYLON.Space.LOCAL);
                    skeleton.bones[13].rotate(BABYLON.Axis.X, -0.075, BABYLON.Space.LOCAL);
            
                    skeleton.bones[50].translate(new BABYLON.Vector3(0, -0.5, 0));
                    skeleton.bones[54].translate(new BABYLON.Vector3(0, 0.5, 0));
            
                    skeleton.bones[51].rotate(BABYLON.Axis.Z, 0.04, BABYLON.Space.LOCAL);
                    skeleton.bones[55].rotate(BABYLON.Axis.Z, -0.04, BABYLON.Space.LOCAL);
                    skeleton.bones[51].translate(new BABYLON.Vector3(0, -0.5, 0));
                    skeleton.bones[55].translate(new BABYLON.Vector3(0, 0.5, 0));
            
            
                    countwalk = countwalk-1;
                }
                
            }
        }
        if (inputMap["d"] || inputMap["D"]) {
            //character.rotate(BABYLON.Vector3.Up(), -characterRotationSpeed);
            body.position.x += moving_speed;
            keydown = true;
            if(!walkup && !walkright && !walkdown && !walkleft){
                walkright = true;
                flag_d = true;
                character.rotate(BABYLON.Axis.Y, Math.PI/2, BABYLON.Space.LOCAL);
            }
            if(walkright){
                if (countwalk>10){
                    lefthand = false;
                }
                else if(countwalk < -10){
                    lefthand= true;
                }
                if(lefthand){
                    //arms
                    skeleton.bones[32].rotate(BABYLON.Axis.X, 0.075, BABYLON.Space.LOCAL);
                    skeleton.bones[13].rotate(BABYLON.Axis.X, 0.075, BABYLON.Space.LOCAL);
            
                    skeleton.bones[50].translate(new BABYLON.Vector3(0, 0.5, 0));
                    skeleton.bones[54].translate(new BABYLON.Vector3(0, -0.5, 0));
            
            
                    skeleton.bones[51].rotate(BABYLON.Axis.Z, -0.04, BABYLON.Space.LOCAL);
                    skeleton.bones[55].rotate(BABYLON.Axis.Z, 0.04, BABYLON.Space.LOCAL);
                    skeleton.bones[51].translate(new BABYLON.Vector3(0, 0.5, 0));
                    skeleton.bones[55].translate(new BABYLON.Vector3(0, -0.5, 0));
            
            
                    countwalk = countwalk +1;
                }
                else{
                    //arms
                    skeleton.bones[32].rotate(BABYLON.Axis.X, -0.075, BABYLON.Space.LOCAL);
                    skeleton.bones[13].rotate(BABYLON.Axis.X, -0.075, BABYLON.Space.LOCAL);
            
                    skeleton.bones[50].translate(new BABYLON.Vector3(0, -0.5, 0));
                    skeleton.bones[54].translate(new BABYLON.Vector3(0, 0.5, 0));
            
                    skeleton.bones[51].rotate(BABYLON.Axis.Z, 0.04, BABYLON.Space.LOCAL);
                    skeleton.bones[55].rotate(BABYLON.Axis.Z, -0.04, BABYLON.Space.LOCAL);
                    skeleton.bones[51].translate(new BABYLON.Vector3(0, -0.5, 0));
                    skeleton.bones[55].translate(new BABYLON.Vector3(0, 0.5, 0));
            
            
                    countwalk = countwalk-1;
                }
                
            }
        }
        if (inputMap["a"] || inputMap["A"]) {
            //character.rotate(BABYLON.Vector3.Up(), characterRotationSpeed);
            body.position.x-=0.2;
            keydown = true;
            if(!walkup && !walkright && !walkdown && !walkleft){
                walkleft = true;
                flag_a = true;
                character.rotate(BABYLON.Axis.Y, -Math.PI/2, BABYLON.Space.LOCAL);
            }
            if(walkleft){
                if (countwalk>10){
                    lefthand = false;
                }
                else if(countwalk < -10){
                    lefthand= true;
                }
                if(lefthand){
                    //arms
                    skeleton.bones[32].rotate(BABYLON.Axis.X, 0.075, BABYLON.Space.LOCAL);
                    skeleton.bones[13].rotate(BABYLON.Axis.X, 0.075, BABYLON.Space.LOCAL);
            
                    skeleton.bones[50].translate(new BABYLON.Vector3(0, 0.5, 0));
                    skeleton.bones[54].translate(new BABYLON.Vector3(0, -0.5, 0));
            
            
                    skeleton.bones[51].rotate(BABYLON.Axis.Z, -0.04, BABYLON.Space.LOCAL);
                    skeleton.bones[55].rotate(BABYLON.Axis.Z, 0.04, BABYLON.Space.LOCAL);
                    skeleton.bones[51].translate(new BABYLON.Vector3(0, 0.5, 0));
                    skeleton.bones[55].translate(new BABYLON.Vector3(0, -0.5, 0));
            
            
                    countwalk = countwalk +1;
                }
                else{
                    //arms
                    skeleton.bones[32].rotate(BABYLON.Axis.X, -0.075, BABYLON.Space.LOCAL);
                    skeleton.bones[13].rotate(BABYLON.Axis.X, -0.075, BABYLON.Space.LOCAL);
            
                    skeleton.bones[50].translate(new BABYLON.Vector3(0, -0.5, 0));
                    skeleton.bones[54].translate(new BABYLON.Vector3(0, 0.5, 0));
            
                    skeleton.bones[51].rotate(BABYLON.Axis.Z, 0.04, BABYLON.Space.LOCAL);
                    skeleton.bones[55].rotate(BABYLON.Axis.Z, -0.04, BABYLON.Space.LOCAL);
                    skeleton.bones[51].translate(new BABYLON.Vector3(0, -0.5, 0));
                    skeleton.bones[55].translate(new BABYLON.Vector3(0, 0.5, 0));
            
            
                    countwalk = countwalk-1;
                }
                
            }
        }
        if (inputMap["b"] || inputMap["B"]) {

            if(flag_cam){
                if(!camera_check){
                    camera.maxZ = 270;
                    camera.radius = 20;
                    camera.heightOffset = 15;
                    camera.rotationOffset = 180;
                    camera_check = true;
                }
                else{
                    camera.maxZ = 10000;
                    camera.radius = 15;
                    camera.heightOffset = 3;
                    camera.rotationOffset = 180;
                    camera_check = false;
                }
                flag_cam = false;
            }
            
        }
        if(inputMap[" "]){
            if(jump_check){
                jump_check = false;
                body.physicsImpostor.applyImpulse(new BABYLON.Vector3(0.5, 400, -1), body.getAbsolutePosition());
            }
        }
        if((inputMap["r"] || inputMap["R"]) && restart){
            location.reload();
        }
        if(inputMap["k"] || inputMap["K"]){
            if(flag_change_light && flag_light_one_time){
                flag_light = (flag_light+1)%3;
                if(flag_light == 0){        
                    light3.setEnabled(false);
                    light4.setEnabled(false);
                    light5.setEnabled(false);
                    light6.setEnabled(false);
                    light1.setEnabled(true);
                    light2.setEnabled(true);
                }
                else if(flag_light == 1){  
                    light5.setEnabled(false);
                    light6.setEnabled(false);                  
                    light1.setEnabled(false);
                    light2.setEnabled(false);
                    light3.setEnabled(true);
                    light4.setEnabled(true);
                } else {                        
                    light1.setEnabled(false);
                    light2.setEnabled(false);         
                    light3.setEnabled(false);
                    light4.setEnabled(false);
                    light5.setEnabled(true);
                    light6.setEnabled(true);
                }
                flag_light_one_time = false;
            }
        }

        //Manage animations to be played  
        if (keydown) {
           /* if (!animating) {
                animating = true;
                if (inputMap["s"]) {
                    //Walk backwards
                    walkBackAnim.start(true, 1.0, walkBackAnim.from, walkBackAnim.to, false);
                }
                else if
                    (inputMap["b"]) {
                    //Dance
                    danceAnim.start(true, 1.0, danceAnim.from, danceAnim.to, false);
                }
                else {
                    //Walk
                    walkAnim.start(true, 1.0, walkAnim.from, walkAnim.to, false);
                }
            }*/
        }
        else {
            if(flag_s){
                character.rotate(BABYLON.Axis.Y, Math.PI, BABYLON.Space.LOCAL);
                flag_s = false;
            }
            if(flag_d){
                character.rotate(BABYLON.Axis.Y, -Math.PI/2, BABYLON.Space.LOCAL);
                flag_d = false;
            }
            if(flag_a){
                character.rotate(BABYLON.Axis.Y, Math.PI/2, BABYLON.Space.LOCAL);
                flag_a = false;
            }
            countwalk = 0;
            walkup = false;
            walkdown = false;
            walkright = false;
            walkleft = false;
            if (!flag_s && !flag_a && !flag_d){
                for(i=0; i<basic_position.length;i++){
                    skeleton.bones[i].position = basic_position[i];
                    skeleton.bones[i].rotation = basic_rotation[i];
                    //player.rotation.y = 0;
                    countwalk = 0;
                    lefthand = true;
                }
            }
        }
    });


    
    var wall_go1 = false;
    var wall_go2 = false;
    var wall_go3 = false;
    var wall_go4 = false;
    var wall_go5 = false;

    //LEVEL #2
    //
    var demMaterial = new BABYLON.StandardMaterial("demmat", scene);
    demMaterial.diffuseTexture = new BABYLON.Texture("./Assets-master/materials/grey.jpg", scene);
    var demoler1 = BABYLON.Mesh.CreateSphere("s1", 32, 2, scene);
    demoler1.position = new BABYLON.Vector3(0,1.5,-60);
    demoler1.material = demMaterial;
    demoler1.physicsImpostor = new BABYLON.PhysicsImpostor(demoler1, BABYLON.PhysicsImpostor.SphereImpostor, {mass: 50000, restitution: 0});
    var demoler2 = BABYLON.Mesh.CreateSphere("s2", 32, 2, scene);
    demoler2.position = new BABYLON.Vector3(0,1.5,-55);
    demoler2.material = demMaterial;
    demoler2.physicsImpostor = new BABYLON.PhysicsImpostor(demoler2, BABYLON.PhysicsImpostor.SphereImpostor, {mass: 50000, restitution: 0});
    var demoler3 = BABYLON.Mesh.CreateSphere("s3", 32, 2, scene);
    demoler3.position = new BABYLON.Vector3(0,1.5,-50);
    demoler3.material = demMaterial;
    demoler3.physicsImpostor = new BABYLON.PhysicsImpostor(demoler3, BABYLON.PhysicsImpostor.SphereImpostor, {mass: 50000, restitution: 0});
    var demoler4 = BABYLON.Mesh.CreateSphere("s4", 32, 2, scene);
    demoler4.position = new BABYLON.Vector3(0,1.5,-45);
    demoler4.material = demMaterial;
    demoler4.physicsImpostor = new BABYLON.PhysicsImpostor(demoler4, BABYLON.PhysicsImpostor.SphereImpostor, {mass: 50000, restitution: 0});
    
    var pointup1 = BABYLON.Mesh.CreateSphere("pup1", 32, 2, scene);
    pointup1.position = new BABYLON.Vector3(0,11.5,-60);
    pointup1.visibility = true;
    pointup1.physicsImpostor = new BABYLON.PhysicsImpostor(pointup1, BABYLON.PhysicsImpostor.SphereImpostor, {mass: 0, restitution: 0});
    var distanceJoint = new BABYLON.DistanceJoint({ maxDistance: 10 });
    demoler1.physicsImpostor.addJoint(pointup1.physicsImpostor, distanceJoint);
    demoler1.physicsImpostor.applyImpulse(new BABYLON.Vector3(300000, 0, 0), demoler1.getAbsolutePosition());

    var pointup2 = BABYLON.Mesh.CreateSphere("pup2", 32, 2, scene);
    pointup2.position = new BABYLON.Vector3(0,10.5,-55);
    pointup2.visibility = true;
    pointup2.physicsImpostor = new BABYLON.PhysicsImpostor(pointup2, BABYLON.PhysicsImpostor.SphereImpostor, {mass: 0, restitution: 0});
    var distanceJoint2 = new BABYLON.DistanceJoint({ maxDistance: 9});
    demoler2.physicsImpostor.addJoint(pointup2.physicsImpostor, distanceJoint2);
    demoler2.physicsImpostor.applyImpulse(new BABYLON.Vector3(-300000, 0, 0), demoler2.getAbsolutePosition());

    var pointup3 = BABYLON.Mesh.CreateSphere("pup3", 32, 2, scene);
    pointup3.position = new BABYLON.Vector3(0,11,-50);
    pointup3.visibility = true;
    pointup3.physicsImpostor = new BABYLON.PhysicsImpostor(pointup3, BABYLON.PhysicsImpostor.SphereImpostor, {mass: 0, restitution: 0});
    var distanceJoint3 = new BABYLON.DistanceJoint({ maxDistance: 9.5 });
    demoler3.physicsImpostor.addJoint(pointup3.physicsImpostor, distanceJoint3);
    demoler3.physicsImpostor.applyImpulse(new BABYLON.Vector3(300000, 0, 0), demoler3.getAbsolutePosition());

    var pointup4 = BABYLON.Mesh.CreateSphere("pup4", 32, 2, scene);
    pointup4.position = new BABYLON.Vector3(0,12,-45);
    pointup4.visibility = true;
    pointup4.physicsImpostor = new BABYLON.PhysicsImpostor(pointup4, BABYLON.PhysicsImpostor.SphereImpostor, {mass: 0, restitution: 0});
    var distanceJoint4 = new BABYLON.DistanceJoint({ maxDistance: 10.5 });
    demoler4.physicsImpostor.addJoint(pointup4.physicsImpostor, distanceJoint4);
    demoler4.physicsImpostor.applyImpulse(new BABYLON.Vector3(-300000, 0, 0), demoler4.getAbsolutePosition());

    var line1 = new BABYLON.Mesh.CreateLines("line1",[pointup1.position, demoler1.position],scene,true);
    line1.color = "black";
    var line2 = new BABYLON.Mesh.CreateLines("line2",[pointup2.position, demoler2.position],scene,true);
    line2.color = "black";
    var line3 = new BABYLON.Mesh.CreateLines("line3",[pointup3.position, demoler3.position],scene,true);
    line3.color = "black";
    var line4 = new BABYLON.Mesh.CreateLines("line4",[pointup4.position, demoler4.position],scene,true);
    line4.color = "black";
    scene.registerAfterRender(function() {
        line1 = BABYLON.Mesh.CreateLines("line1", [pointup1.position, demoler1.position], null, null, line1);
        line2 = BABYLON.Mesh.CreateLines("line2", [pointup2.position, demoler2.position], null, null, line2);
        line3 = BABYLON.Mesh.CreateLines("line3", [pointup3.position, demoler3.position], null, null, line3);
        line4 = BABYLON.Mesh.CreateLines("line4", [pointup4.position, demoler4.position], null, null, line4);
    });

    //LEVEL #3
    var crate, crate2, crate3, crate4;
    var rock1, rock2, rock3, rock4, rock5, rock6, rock7, rock8, rock9, rock10, rock11, rock12, rock13;
    BABYLON.SceneLoader.ImportMesh("", "./Assets-master/meshes/villagePack/crate2/gltf/", "crate2.gltf", scene, function (meshes) {
        crate = meshes[0];
        crate.scaling = new BABYLON.Vector3(1.8, 1.8, 1.8);
        crate.position = new BABYLON.Vector3(8, 0, -60);
        
        for(i=1; i<=18; i++){
            crate2 = crate.clone("");
            crate3 = crate.clone("");
            crate4 = crate.clone("");
            if(i%2 != 0){
                crate2.position = new BABYLON.Vector3(8, 0, -60+(2*((i-1)/2)));
                crate3.position = new BABYLON.Vector3(10, 0, -60+(2*((i-1)/2)));
                if(i<=16){
                    crate4.position = new BABYLON.Vector3(9, 1.5, -59+(2*((i-1)/2)));
                }

            }else{
               crate2.position = new BABYLON.Vector3(-8, 0, -60+(2*((i/2)-1)));
               crate3.position = new BABYLON.Vector3(-10, 0, -60+(2*((i/2)-1)));
               if(i<=16){
                   crate4.position = new BABYLON.Vector3(-9, 1.5, -59+(2*((i/2)-1)));
               }
            }
        }
    });

    rock1 = BABYLON.MeshBuilder.CreateBox("rock1", {height: 1, width: 2, depth: 2});
    rock1.position = new BABYLON.Vector3(-6, 0.5, -17);
    rock1.material = wallMat;
    rock1.physicsImpostor = new BABYLON.PhysicsImpostor(rock1, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 0, restitution: 0});
    rock1.physicsImpostor.physicsBody.inertia.setZero();
    rock1.physicsImpostor.physicsBody.invInertia.setZero();
    rock1.physicsImpostor.physicsBody.invInertiaWorld.setZero();

    rock2 = BABYLON.MeshBuilder.CreateBox("rock2", {height: 1, width: 2, depth: 2});
    rock2.position = new BABYLON.Vector3(0, 0.5, -17);
    rock2.material = wallMat;
    rock2.physicsImpostor = new BABYLON.PhysicsImpostor(rock2, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 0, restitution: 0});
    rock2.physicsImpostor.physicsBody.inertia.setZero();
    rock2.physicsImpostor.physicsBody.invInertia.setZero();
    rock2.physicsImpostor.physicsBody.invInertiaWorld.setZero();
    
    rock3 = BABYLON.MeshBuilder.CreateBox("rock3", {height: 1, width: 2, depth: 2});
    rock3.position = new BABYLON.Vector3(6, 0.5, -17);
    rock3.material = wallMat;    
    rock3.physicsImpostor = new BABYLON.PhysicsImpostor(rock3, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 0, restitution: 0});
    rock3.physicsImpostor.physicsBody.inertia.setZero();
    rock3.physicsImpostor.physicsBody.invInertia.setZero();
    rock3.physicsImpostor.physicsBody.invInertiaWorld.setZero();

    rock4 = BABYLON.MeshBuilder.CreateBox("rock4", {height: 1, width: 2, depth: 2});
    rock4.position = new BABYLON.Vector3(3, 0.5, -11);
    rock4.material = wallMat;
    rock4.physicsImpostor = new BABYLON.PhysicsImpostor(rock4, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 0, restitution: 0});
    rock4.physicsImpostor.physicsBody.inertia.setZero();
    rock4.physicsImpostor.physicsBody.invInertia.setZero();
    rock4.physicsImpostor.physicsBody.invInertiaWorld.setZero();

    rock5 = BABYLON.MeshBuilder.CreateBox("rock5", {height: 1, width: 2, depth: 2});
    rock5.position = new BABYLON.Vector3(-3, 0.5, -11);
    rock5.material = wallMat;    
    rock5.physicsImpostor = new BABYLON.PhysicsImpostor(rock5, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 0, restitution: 0});
    rock5.physicsImpostor.physicsBody.inertia.setZero();
    rock5.physicsImpostor.physicsBody.invInertia.setZero();
    rock5.physicsImpostor.physicsBody.invInertiaWorld.setZero();

    rock6 = BABYLON.MeshBuilder.CreateBox("rock6", {height: 1, width: 2, depth: 2});
    rock6.position = new BABYLON.Vector3(-6, 0.5, -5);
    rock6.material = wallMat;
    rock6.physicsImpostor = new BABYLON.PhysicsImpostor(rock6, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 0, restitution: 0});
    rock6.physicsImpostor.physicsBody.inertia.setZero();
    rock6.physicsImpostor.physicsBody.invInertia.setZero();
    rock6.physicsImpostor.physicsBody.invInertiaWorld.setZero();

    rock7 = BABYLON.MeshBuilder.CreateBox("rock7", {height: 1, width: 2, depth: 2});
    rock7.position = new BABYLON.Vector3(0, 0.5, -5);
    rock7.material = wallMat;
    rock7.physicsImpostor = new BABYLON.PhysicsImpostor(rock7, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 0, restitution: 0});
    rock7.physicsImpostor.physicsBody.inertia.setZero();
    rock7.physicsImpostor.physicsBody.invInertia.setZero();
    rock7.physicsImpostor.physicsBody.invInertiaWorld.setZero();
    
    rock8 = BABYLON.MeshBuilder.CreateBox("rock8", {height: 1, width: 2, depth: 2});
    rock8.position = new BABYLON.Vector3(6, 0.5, -5);
    rock8.material = wallMat;    
    rock8.physicsImpostor = new BABYLON.PhysicsImpostor(rock8, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 0, restitution: 0});
    rock8.physicsImpostor.physicsBody.inertia.setZero();
    rock8.physicsImpostor.physicsBody.invInertia.setZero();
    rock8.physicsImpostor.physicsBody.invInertiaWorld.setZero();

    rock9 = BABYLON.MeshBuilder.CreateBox("rock9", {height: 1, width: 2, depth: 2});
    rock9.position = new BABYLON.Vector3(3, 0.5, 1);
    rock9.material = wallMat;
    rock9.physicsImpostor = new BABYLON.PhysicsImpostor(rock9, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 0, restitution: 0});
    rock9.physicsImpostor.physicsBody.inertia.setZero();
    rock9.physicsImpostor.physicsBody.invInertia.setZero();
    rock9.physicsImpostor.physicsBody.invInertiaWorld.setZero();

    rock10 = BABYLON.MeshBuilder.CreateBox("rock10", {height: 1, width: 2, depth: 2});
    rock10.position = new BABYLON.Vector3(-3, 0.5, 1);
    rock10.material = wallMat;    
    rock10.physicsImpostor = new BABYLON.PhysicsImpostor(rock10, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 0, restitution: 0});
    rock10.physicsImpostor.physicsBody.inertia.setZero();
    rock10.physicsImpostor.physicsBody.invInertia.setZero();
    rock10.physicsImpostor.physicsBody.invInertiaWorld.setZero();

    rock11 = BABYLON.MeshBuilder.CreateBox("rock11", {height: 1, width: 2, depth: 2});
    rock11.position = new BABYLON.Vector3(-6, 0.5, 7);
    rock11.material = wallMat;
    rock11.physicsImpostor = new BABYLON.PhysicsImpostor(rock11, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 0, restitution: 0});
    rock11.physicsImpostor.physicsBody.inertia.setZero();
    rock11.physicsImpostor.physicsBody.invInertia.setZero();
    rock11.physicsImpostor.physicsBody.invInertiaWorld.setZero();

    rock12 = BABYLON.MeshBuilder.CreateBox("rock12", {height: 1, width: 2, depth: 2});
    rock12.position = new BABYLON.Vector3(0, 0.5, 7);
    rock12.material = wallMat;
    rock12.physicsImpostor = new BABYLON.PhysicsImpostor(rock12, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 0, restitution: 0});
    rock12.physicsImpostor.physicsBody.inertia.setZero();
    rock12.physicsImpostor.physicsBody.invInertia.setZero();
    rock12.physicsImpostor.physicsBody.invInertiaWorld.setZero();
    
    rock13 = BABYLON.MeshBuilder.CreateBox("rock13", {height: 1, width: 2, depth: 2});
    rock13.position = new BABYLON.Vector3(6, 0.5, 7);
    rock13.material = wallMat;    
    rock13.physicsImpostor = new BABYLON.PhysicsImpostor(rock13, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 0, restitution: 0});
    rock13.physicsImpostor.physicsBody.inertia.setZero();
    rock13.physicsImpostor.physicsBody.invInertia.setZero();
    rock13.physicsImpostor.physicsBody.invInertiaWorld.setZero();

    /*for(i=0; i<=4; i++){
        rock1 = rock.clone("");
        rock2 = rock.clone("");
        rock3 = rock.clone("");
        if(i%2 != 0){
            rock1.position = new BABYLON.Vector3(3, 0, (6*i));
            rock2.position = new BABYLON.Vector3(9, 0, (6*i));

        }else{
            rock1.position = new BABYLON.Vector3(0, 0, (6*i));
            rock2.position = new BABYLON.Vector3(6, 0, (6*i));
            rock3 = rock.clone("");
            rock3.position = new BABYLON.Vector3(12, 0, (6*i));
        }
    }*/
    var current_position;
    var ammo;
    var animation = function(){
        var ammo = BABYLON.Mesh.CreateSphere("ammo", 32, 0.5, scene, Math.PI/2); //optional parameters after scene
        ammo.position.x = body_tank.position.x;
        ammo.position.y = body_tank.position.y + 0.25;
        ammo.position.z = body_tank.position.z - 3;
        ammo.material = wallMat;
        ammo.physicsImpostor = new BABYLON.PhysicsImpostor(ammo, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 0, friction: 0.5, restition: 0.3 }, scene);
        ammo.life = 0;
        

        body.physicsImpostor.registerOnPhysicsCollide(ammo.physicsImpostor, function() {
            if(!scream.isPlaying){
                scream.play();
            }
            if(!damage){
                life-=1;
                life1.text = ""+life;
                if(life == 0){
                    hint.text = "GAME OVER";
                    restart = true;
                } 
                damage = true;
                setTimeout(function(){damage = false}, 1000);
            }
        });
        
        ammo.step = ()=>{
            ammo.life++;
            ammo.position.z -= 1;
            ammo.position.y -= 0.1;
            if(ammo.life>20 && ammo.physicsImpostor){
                ammo.physicsImpostor.dispose()
                ammo.dispose()                
            }   
        }
        
        scene.onBeforeRenderObservable.add(ammo.step) 
    }


    var stopper1;
    var damage = false;
    scene.registerBeforeRender(function () {
        //Collisions
        body.physicsImpostor.registerOnPhysicsCollide(ground.physicsImpostor, function() {
            jump_check = true;
        });
        body.physicsImpostor.registerOnPhysicsCollide(groundToxic.physicsImpostor, function() {
            jump_check = true;
            if(!scream.isPlaying){
                scream.play();
            }
            if(!damage){
                life-=1;
                life1.text = ""+life;
                if(life == 0){
                    hint.text = "GAME OVER";
                    restart = true;
                } 
                damage = true;
                setTimeout(function(){damage = false}, 1000);
            }
        });
        body.physicsImpostor.registerOnPhysicsCollide(rock1.physicsImpostor, function() {
            jump_check = true;
        });
        body.physicsImpostor.registerOnPhysicsCollide(rock2.physicsImpostor, function() {
            jump_check = true;
        });
        body.physicsImpostor.registerOnPhysicsCollide(rock3.physicsImpostor, function() {
            jump_check = true;
        });
        body.physicsImpostor.registerOnPhysicsCollide(rock4.physicsImpostor, function() {
            jump_check = true;
        });
        body.physicsImpostor.registerOnPhysicsCollide(rock5.physicsImpostor, function() {
            jump_check = true;
        });
        body.physicsImpostor.registerOnPhysicsCollide(rock6.physicsImpostor, function() {
            jump_check = true;
        });
        body.physicsImpostor.registerOnPhysicsCollide(rock7.physicsImpostor, function() {
            jump_check = true;
        });
        body.physicsImpostor.registerOnPhysicsCollide(rock8.physicsImpostor, function() {
            jump_check = true;
        });
        body.physicsImpostor.registerOnPhysicsCollide(rock9.physicsImpostor, function() {
            jump_check = true;
        });
        body.physicsImpostor.registerOnPhysicsCollide(rock10.physicsImpostor, function() {
            jump_check = true;
        });
        body.physicsImpostor.registerOnPhysicsCollide(rock11.physicsImpostor, function() {
            jump_check = true;
        });
        body.physicsImpostor.registerOnPhysicsCollide(rock12.physicsImpostor, function() {
            jump_check = true;
        });
        body.physicsImpostor.registerOnPhysicsCollide(rock13.physicsImpostor, function() {
            jump_check = true;
        });
        body.physicsImpostor.registerOnPhysicsCollide(wall_box1.physicsImpostor, function() {
            if(!scream.isPlaying){
                scream.play();
            }
            if(!damage){
                life-=1;
                life1.text = ""+life;
                if(life == 0){
                    hint.text = "GAME OVER";
                    restart = true;
                } 
                damage = true;
                setTimeout(function(){damage = false}, 1000);
            }
        });
        body.physicsImpostor.registerOnPhysicsCollide(wall_box2.physicsImpostor, function() {
            if(!scream.isPlaying){
                scream.play();
            }
            if(!damage){
                life-=1;
                life1.text = ""+life;
                if(life == 0){
                    hint.text = "GAME OVER";
                    restart = true;
                } 
                damage = true;
                setTimeout(function(){damage = false}, 1000);
            }
        });
        body.physicsImpostor.registerOnPhysicsCollide(wall_box3.physicsImpostor, function() {
            if(!scream.isPlaying){
                scream.play();
            }
            if(!damage){
                life-=1;
                life1.text = ""+life;
                if(life == 0){
                    hint.text = "GAME OVER";
                    restart = true;
                } 
                damage = true;
                setTimeout(function(){damage = false}, 1000);
            }
        });
        body.physicsImpostor.registerOnPhysicsCollide(wall_box4.physicsImpostor, function() {
            if(!scream.isPlaying){
                scream.play();
            }
            if(!damage){
                life-=1;
                life1.text = ""+life;
                if(life == 0){
                    hint.text = "GAME OVER";
                    restart = true;
                } 
                damage = true;
                setTimeout(function(){damage = false}, 1000);
            }
        });
        body.physicsImpostor.registerOnPhysicsCollide(wall_box5.physicsImpostor, function() {
            if(!scream.isPlaying){
                scream.play();
            }
            if(!damage){
                life-=1;
                life1.text = ""+life;
                if(life == 0){
                    hint.text = "GAME OVER";
                    restart = true;
                } 
                damage = true;
                setTimeout(function(){damage = false}, 1000);
            }
        });
        body.physicsImpostor.registerOnPhysicsCollide(wall_box6.physicsImpostor, function() {
            if(!scream.isPlaying){
                scream.play();
            }
            if(!damage){
                life-=1;
                life1.text = ""+life;
                if(life == 0){
                    hint.text = "GAME OVER";
                    restart = true;
                } 
                damage = true;
                setTimeout(function(){damage = false}, 1000);
            }
        });
        body.physicsImpostor.registerOnPhysicsCollide(wall_box7.physicsImpostor, function() {
            if(!scream.isPlaying){
                scream.play();
            }
            if(!damage){
                life-=1;
                life1.text = ""+life;
                if(life == 0){
                    hint.text = "GAME OVER";
                    restart = true;
                } 
                damage = true;
                setTimeout(function(){damage = false}, 1000);
            }
        });
        body.physicsImpostor.registerOnPhysicsCollide(wall_box8.physicsImpostor, function() {
            if(!scream.isPlaying){
                scream.play();
            }
            if(!damage){
                life-=1;
                life1.text = ""+life;
                if(life == 0){
                    hint.text = "GAME OVER";
                    restart = true;
                } 
                damage = true;
                setTimeout(function(){damage = false}, 1000);
            }
        });
        body.physicsImpostor.registerOnPhysicsCollide(wall_box9.physicsImpostor, function() {
            if(!scream.isPlaying){
                scream.play();
            }
            if(!damage){
                life-=1;
                life1.text = ""+life;
                if(life == 0){
                    hint.text = "GAME OVER";
                    restart = true;
                } 
                damage = true;
                setTimeout(function(){damage = false}, 1000);
            }
        });
        body.physicsImpostor.registerOnPhysicsCollide(wall_box10.physicsImpostor, function() {
            if(!scream.isPlaying){
                scream.play();
            }
            if(!damage){
                life-=1;
                life1.text = ""+life;
                if(life == 0){
                    hint.text = "GAME OVER";
                    restart = true;
                } 
                damage = true;
                setTimeout(function(){damage = false}, 1000);
            }   
        });
        body.physicsImpostor.registerOnPhysicsCollide(demoler1.physicsImpostor, function() {
            if(!scream.isPlaying){
                scream.play();
            }
            if(!damage){
                life-=1;
                life1.text = ""+life;
                if(life == 0){
                    hint.text = "GAME OVER";
                    restart = true;
                } 
                damage = true;
                setTimeout(function(){damage = false}, 1000);
            }   
        });
        body.physicsImpostor.registerOnPhysicsCollide(demoler2.physicsImpostor, function() {
            if(!scream.isPlaying){
                scream.play();
            }
            if(!damage){
                life-=1;
                life1.text = ""+life;
                if(life == 0){
                    hint.text = "GAME OVER";
                    restart = true;
                } 
                damage = true;
                setTimeout(function(){damage = false}, 1000);
            }   
        });
        body.physicsImpostor.registerOnPhysicsCollide(demoler3.physicsImpostor, function() {
            if(!scream.isPlaying){
                scream.play();
            }
            if(!damage){
                life-=1;
                life1.text = ""+life;
                if(life == 0){
                    hint.text = "GAME OVER";
                    restart = true;
                } 
                damage = true;
                setTimeout(function(){damage = false}, 1000);
            }   
        });
        body.physicsImpostor.registerOnPhysicsCollide(demoler4.physicsImpostor, function() {
            if(!scream.isPlaying){
                scream.play();
            }
            if(!damage){
                life-=1;
                life1.text = ""+life;
                if(life == 0){
                    hint.text = "GAME OVER";
                    restart = true;
                } 
                damage = true;
                setTimeout(function(){damage = false}, 1000);
            }   
        }); 

        if(body.position.z > -145 && body.position.z <= -140) hint.text = "Hint: \n Try to jump!";

        if(body.position.z > -140 && body.position.z <= -130) hint.text = "Hint: \n Well done!";

        if(body.position.z > -130 && body.position.z <= -80){
            hint.text = "Hint: \n Attention! \n The walking walls do damage. \n Avoid them!";
  
            stopper1 = BABYLON.MeshBuilder.CreateBox("stopper1", {height: 26, width: 26, depth: 1});
            stopper1.visibility = true;
            stopper1.position = new BABYLON.Vector3(0,0,-131); 
            stopper1.material = bodyMaterial;
            stopper1.visibility = hit_box_visible;
            stopper1.physicsImpostor = new BABYLON.PhysicsImpostor(stopper1, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 0, restitution: 0});
            stopper1.physicsImpostor.physicsBody.inertia.setZero();
            stopper1.physicsImpostor.physicsBody.invInertia.setZero();
            stopper1.physicsImpostor.physicsBody.invInertiaWorld.setZero();

        }
        if(body.position.z > -120 && body.position.z <= 80 && wall_box1.position.z>-145){ 
            wall_go1 = true;
        }
        if(wall_box1.position.z<-130){ 
            if(wall_box1.position.z<-125){
                wall_go1 = false;
                wall1.dispose();
                wall2.dispose();
            }
            wall_go2 = true;
        }
        if(wall_box3.position.z<-130){
            if(wall_box3.position.z<-125){
                wall_go2= false;
                wall3.dispose();
                wall4.dispose();
            }
            wall_go3 = true;
        }
        if(wall_box5.position.z<-130){
            if(wall_box5.position.z<-125){
                wall_go3= false;
                wall5.dispose();
                wall6.dispose();
            }
            wall_go4 = true;
        }
        if(wall_box7.position.z<-130){
            if(wall_box7.position.z<-125){
                wall_go4= false;
                wall7.dispose();
                wall8.dispose();
            }
            wall_go5 = true;
        }
        if(wall_box9.position.z<-130){ 
            if(wall_box9.position.z<-125){
                wall_go5= false;
                wall9.dispose();
                wall10.dispose();
            }
        }
        if(wall_go1){
            wall_box1.position.z -=0.1;
            wall_box2.position.z -=0.1;
        }
        if(wall_go2){
            wall_box3.position.z -=0.1;
            wall_box4.position.z -=0.1;
        }
        if(wall_go3){
            wall_box5.position.z -=0.1;
            wall_box6.position.z -=0.1;
        }
        if(wall_go4){
            wall_box7.position.z -=0.1;
            wall_box8.position.z -=0.1;
        }
        if(wall_go5){
            wall_box9.position.z -=0.1;
            wall_box10.position.z -=0.1;
        }
        
        if(body.position.z > -80 && body.position.z <= -5){
            hint.text = "Hint: \n Attention! \n There are some wrecking balls. \n Avoid them!";

        }
        if(body.position.z > -35 && body.position.z <= 0){
            hint.text = "Hint: \n Attention! \n There is a poisonous soil. \n Jump on the blocks!";
  
            stopper2 = BABYLON.MeshBuilder.CreateBox("stopper1", {height: 26, width: 26, depth: 1});
            stopper2.visibility = true;
            stopper2.position = new BABYLON.Vector3(0,0,-36); 
            stopper2.material = bodyMaterial;
            stopper2.visibility = hit_box_visible;
            stopper2.physicsImpostor = new BABYLON.PhysicsImpostor(stopper2, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 0, restitution: 0});
            stopper2.physicsImpostor.physicsBody.inertia.setZero();
            stopper2.physicsImpostor.physicsBody.invInertia.setZero();
            stopper2.physicsImpostor.physicsBody.invInertiaWorld.setZero();

        }

        
        
        if(final_boss){
            if(body_tank.position.x >9) right_direction = false;
            else if(body_tank.position.x < -9) right_direction = true;
            console.log(body_tank.position.x);
            if(right_direction){
                body_tank.position.x += 0.1;
                wheel4.rotate(BABYLON.Axis.Y, -0.2, BABYLON.Space.LOCAL);
                wheel5.rotate(BABYLON.Axis.Y, -0.2, BABYLON.Space.LOCAL);
                wheel6.rotate(BABYLON.Axis.Y, -0.2, BABYLON.Space.LOCAL);
            }
            else{
                console.log(right_direction);
                body_tank.position.x -= 0.1;
                wheel4.rotate(BABYLON.Axis.Y, 0.2, BABYLON.Space.LOCAL);
                wheel5.rotate(BABYLON.Axis.Y, 0.2, BABYLON.Space.LOCAL);
                wheel6.rotate(BABYLON.Axis.Y, 0.2, BABYLON.Space.LOCAL);
            }
        }

        if(body.position.z > 38.2 ){ 
            if(!done){
                done = true;
                hint.text = "Hint: \n You have been seen. \n Survive until its ammo runs out. \n Avoid its attack!";
                light.setEnabled(false);
                light1.setEnabled(true);
                light2.setEnabled(true);
                flag_change_light = true;
        
                stopper3 = BABYLON.MeshBuilder.CreateBox("stopper3", {height: 26, width: 26, depth: 1});
                stopper3.visibility = true;
                stopper3.position = new BABYLON.Vector3(0,0,38); 
                stopper3.material = bodyMaterial;
                stopper3.visibility = hit_box_visible;
                stopper3.physicsImpostor = new BABYLON.PhysicsImpostor(stopper3, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 0, restitution: 0});
                stopper3.physicsImpostor.physicsBody.inertia.setZero();
                stopper3.physicsImpostor.physicsBody.invInertia.setZero();
                stopper3.physicsImpostor.physicsBody.invInertiaWorld.setZero();
                
                stopper4 = BABYLON.MeshBuilder.CreateBox("stopper4", {height: 26, width: 26, depth: 1});
                stopper4.visibility = true;
                stopper4.position = new BABYLON.Vector3(0,0,50); 
                stopper4.material = bodyMaterial;
                stopper4.visibility = hit_box_visible;
                stopper4.physicsImpostor = new BABYLON.PhysicsImpostor(stopper4, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 0, restitution: 0});
                stopper4.physicsImpostor.physicsBody.inertia.setZero();
                stopper4.physicsImpostor.physicsBody.invInertia.setZero();
                stopper4.physicsImpostor.physicsBody.invInertiaWorld.setZero();
            }
               
            antenna_based.rotate(BABYLON.Axis.Y, Math.PI/90, BABYLON.Space.LOCAL);
            if(temp < 45){
                sphere.rotate(BABYLON.Axis.Y, Math.PI/90, BABYLON.Space.LOCAL);
                temp++;
            }
            else if(temp >= 45 && temp <55){
                sphere.rotate(BABYLON.Axis.Z, -Math.PI/270, BABYLON.Space.LOCAL);
                temp++;
            }
            else if(temp == 55 && !finish){
                if(!engaged){
                    engaged = true;
                    setTimeout(function(){
                        final_boss = true;
                        var stage1 = setInterval(function(){
                            animation();
                        },1000);
                        //stop after 25 second and goes to lv2
                        setTimeout(function(){
                            clearInterval(stage1);
                            //speed = 1;
                            var stage2 = setInterval(function(){
                                animation();
                            }, 500);
                            //after other 10 sec go to lv3
                            setTimeout(function(){
                                clearInterval(stage2);
                                //speed = 1.5;
                                var stage3 = setInterval(function(){
                                    animation();
                                },200);
                                //after lv3 the boss is defeated and you win the game
                                setTimeout(function(){
                                    clearInterval(stage3);
                                    final_boss  = false;
                                    finish = true;
                                    hint.text = "Congratulation! \n You win!";
                                }, 10000);
                            }, 15000);
                        },15000);
                    },5000);
                }
            }
        }
    });


    // Return the created scene
    return scene;
}

// call the createScene function
var scene = createScene();


scene.autoClear = false;
scene.autoClearDepthAndStencil = false;
scene.blockMaterialDirtyMechanism = true;

scene.useGeometryIdsMap = true;
scene.useMaterialMeshMap = true;
scene.useClonedMeshMap = true;

const options = new BABYLON.SceneOptimizerOptions();
options.addOptimization(new BABYLON.HardwareScalingOptimization(0, 1.5));
// Decalare an Optimizer
var optimizer = new BABYLON.SceneOptimizer(scene, options);


scene.registerAfterRender(function(){

if(engine.getFps()<60){
    optimizer.start();
}
});
// run the render loop
engine.runRenderLoop(function(){
    scene.render();
});
// the canvas/window resize event handler
window.addEventListener('resize', function(){
    engine.resize();
});