// <reference path="/scripts/babylon.js" />
var engine;
var canvas;
var scene;
document.addEventListener("DOMContentLoaded", startGame, false);
function startGame() {
    if (BABYLON.Engine.isSupported()) {
        const canvas = document.getElementById("renderCanvas"); // Get the canvas element
        const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

          // Add your code here matching the playground format
          const createScene = function () {
    
            // const scene = new BABYLON.Scene(engine);  
            // // BABYLON.SceneLoader.ImportMeshAsync("", "https://raw.githubusercontent.com/sunnyjovita/Horizon_Escape/master/final_project/assets/", "ship.babylon");

            // const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));
            // camera.attachControl(canvas, true);
            // // const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

            // var spot = new BABYLON.SpotLight("spot", new BABYLON.Vector3(0, 30, 10), new BABYLON.Vector3(0, -1, 0), 17, 1, scene);
            // spot.diffuse = new BABYLON.Color3(1, 1, 1);
            // spot.specular = new BABYLON.Color3(0, 0, 0);
            // spot.intensity = 0.3;
        
            // var skybox = BABYLON.Mesh.CreateBox('skybox', 1000.0, scene);
            // var skyboxMaterial = new BABYLON.StandardMaterial('skybox', scene);
            // skyboxMaterial.backFaceCulling = false;
            // skybox.material = skyboxMaterial;
            
            // skybox.infiniteDistance = true;
            // skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture('https://raw.githubusercontent.com/sunnyjovita/Horizon_Escape/master/skybox/assets/sky', scene);    
            
            // skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
            
            // scene 0
            var scene = new BABYLON.Scene(engine);  
            // var camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));
            
            var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2,7 * Math.PI / 16, 10, BABYLON.Vector3.Zero(), scene);

            camera.attachControl(canvas, true);
            // const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

            var spot = new BABYLON.SpotLight("spot", new BABYLON.Vector3(0, 30, 10), new BABYLON.Vector3(0, -1, 0), 17, 1, scene);
            spot.diffuse = new BABYLON.Color3(1, 1, 1);
            spot.specular = new BABYLON.Color3(0, 0, 0);
            spot.intensity = 0.3;
        
            var skybox = BABYLON.Mesh.CreateBox('skybox', 1000.0, scene);
            var skyboxMaterial = new BABYLON.StandardMaterial('skybox', scene);
            skyboxMaterial.backFaceCulling = false;
            skybox.material = skyboxMaterial;
            
            skybox.infiniteDistance = true;
            skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture('https://raw.githubusercontent.com/sunnyjovita/Horizon_Escape/master/skybox/assets/sky', scene);    
            
            skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
            

   // scene 1
	var scene1 = new BABYLON.Scene(engine);
    scene1.clearColor = BABYLON.Color3.Black();
    scene1.autoClear = false;

    //Create a light
    var light = new BABYLON.PointLight("light", new BABYLON.Vector3(-60, 60, 80), scene1);
	
    // create camera
    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2,7 * Math.PI / 16, 10, BABYLON.Vector3.Zero(), scene1);

    // var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, 1.0, 210, BABYLON.Vector3.Zero(), scene);
    
    camera.attachControl(canvas, true);

	//Create a custom mesh  
	var customMesh = new BABYLON.Mesh("custom", scene1);
	
	//Set arrays for positions and indices
	var positions = [];
    var colors = [];

    var pointsCount = 10000;

    var positions = new Array(3 * pointsCount);
    positions.fill(0);

    var velocity = [];

    var theta = 0;
    var psi = 0;
    var x = 0;
    var y = 0;
    var z = 0;
    for(var p = 0; p<pointsCount; p++) {

        theta = 2 * Math.random() * Math.PI;
        psi = 2 * Math.random() * Math.PI;
        
        velocity[3 * p] = Math.sin(theta) * Math.cos(psi)* 10; // * Math.random();
        velocity[3 * p + 1] = Math.sin(theta) * Math.sin(psi)* 10; // * Math.random();
        velocity[3 * p + 2] = Math.cos(theta) * 10; // * Math.random(); 
    }

    var colors = new Array(4 * pointsCount);
    colors = colors.fill(0).map((x) => {
        return 1 - (Math.random()/4);
    })

	var vertexData = new BABYLON.VertexData();

	//Assign positions
	vertexData.positions = positions;
    vertexData.colors = colors;

	//Apply vertexData to custom mesh
	vertexData.applyToMesh(customMesh, true);
	
    var mat = new BABYLON.StandardMaterial("mat", scene1);
	mat.emissiveColor = new BABYLON.Color3(1, 1, 1);
    mat.disableLighting = true;
    mat.pointsCloud = true;
    mat.pointSize = 1;
	
	customMesh.material = mat;

    var dir = true;
    document.onkeydown = ()=>{
        dir = !dir
    }

    var posLen = positions.length;


    var IntervalhidgesID2 = setInterval(myMethod2, 100);
    function myMethod2() {                          
        for(var p = 0; p < posLen; p++) {
            if(dir){
                positions[p] += velocity[p];
            }else{
                positions[p] -= velocity[p];
            }
            
       }
        customMesh.updateVerticesData(BABYLON.VertexBuffer.PositionKind, positions);
    }
    
    
    //runRenderLoop inside a setTimeout is neccesary in the Playground
    //to stop the PG's runRenderLoop.
    setTimeout(function() {
        engine.stopRenderLoop();

        engine.runRenderLoop(function () {
            scene.render();
            scene1.render();
        });
    }, 500);

    return scene;
          
        };

        const scene = createScene(); //Call the createScene function

        // Register a render loop to repeatedly render the scene
        engine.runRenderLoop(function () {
                scene.render();
        });

        // Watch for browser/canvas resize events
        window.addEventListener("resize", function () {
                engine.resize();
        });
    }
}