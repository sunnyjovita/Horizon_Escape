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

            var scene = new BABYLON.Scene(engine);    
            scene.clearColor = BABYLON.Color3.Gray();
            
            // This creates and positions a free camera (non-mesh)
            var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

            // This targets the camera to scene origin
            camera.setTarget(BABYLON.Vector3.Zero());

            // This attaches the camera to the canvas
            camera.attachControl(canvas, true);

            var light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(0, -1, -0.3), scene);
            light.position = new BABYLON.Vector3(20, 60, 30);

            // Ground
            var ground = BABYLON.Mesh.CreateGround("ground1", 50, 50, 2, scene);
            ground.receiveShadows = true;

            var array_instances = [];
            // Trees

            // BABYLON.SceneLoader.ImportMeshAsync("", "https://raw.githubusercontent.com/sunnyjovita/Horizon_Escape/master/final_project/assets/", "ship.babylon");

            BABYLON.SceneLoader.ImportMesh("", "https://raw.githubusercontent.com/sunnyjovita/Horizon_Escape/master/final_project/assets/rock/", "rochers.babylon", scene, function (newMeshes, particleSystems, skeletons) {
               var rabbit = newMeshes[1];
               rabbit.isVisible = false;

               var range = 50;
               var count = 100;
               for (var index = 0; index < count; index++) {
                  var newInstance = rabbit.createInstance("i" + index);
                  var x = range / 2 - Math.random() * range;
                  var z = range / 2 - Math.random() * range;

                  newInstance.position = new BABYLON.Vector3(x, 0, z);
                  newInstance.scaling = new BABYLON.Vector3(0.05, 0.05, 0.05);
                  array_instances.push(newInstance);
               }	
            });
           


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