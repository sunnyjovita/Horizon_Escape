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
            var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2, 12, BABYLON.Vector3.Zero(), scene);
            camera.attachControl(canvas, true);
        
            var box = BABYLON.BoxBuilder.CreateBox("root", {size: 2});
            box.alwaysSelectAsActiveMesh = true;
        
            let instanceCount = 20;
            let colorData = new Float32Array(4 * instanceCount);
        
            for (var index = 0; index < instanceCount; index++) {
                colorData[index * 4] = Math.random();
                colorData[index * 4 + 1] = Math.random();
                colorData[index * 4 + 2] = Math.random();
                colorData[index * 4 + 3] = 1.0;
            }
        
            var buffer = new BABYLON.VertexBuffer(engine, colorData, BABYLON.VertexBuffer.ColorKind, false, false, 4, true);
            box.setVerticesBuffer(buffer);
        
            box.material = new BABYLON.StandardMaterial("material");
            
            
            box.material.disableLighting = true;
             
            box.material.emissiveColor = BABYLON.Color3.White();
         
        
            for (var index = 0; index < instanceCount - 1; index++) {
                let instance = new BABYLON.StandardMaterial ("material" + index);
               
            }
        
            for (var index = 0; index < instanceCount - 1; index++) {
                let instance = BABYLON.Mesh.CreateBox (("box" + index), 2, scene)
                instance.position.x = 10 - Math.random() * 40;
                
                instance.position.z = 10 - Math.random() * 40;
                instance.alwaysSelectAsActiveMesh = true;
            }
        
        
        var step = 0;
        
        var boxRotation = function() {
        
                box.rotate(BABYLON.Axis.Y, -step, BABYLON.Space.LOCAL);
        
            };
        
        var startBoxRotation = scene.onBeforeRenderObservable.add(boxRotation);
        
        


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