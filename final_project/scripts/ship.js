// <reference path="/scripts/babylon.js" />
var engine;
var canvas;
var scene;
document.addEventListener("DOMContentLoaded", startGame, false);
function startGame() {
    if (BABYLON.Engine.isSupported()) {
        canvas = document.getElementById("renderCanvas");
        engine = new BABYLON.Engine(canvas, true);
        BABYLON.SceneLoader.Load("./assets/", "ship.babylon", engine, function (loadedScene) {
            scene = loadedScene;
   
            // Wait for textures and shaders to be ready
            scene.executeWhenReady(function () {

                var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(-60, 60, 80), scene);
                light.intensity = 0.7;	
                // Attach camera to canvas inputs

                var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, 1.0, 210, BABYLON.Vector3.Zero(), scene);
    
                camera.attachControl(canvas, true)
                // scene.activeCamera.attachControl(canvas);
                
                // Once the scene is loaded, just register a render loop to render it
                engine.runRenderLoop(function () {
                    scene.render();
                });
            });
        }, function (progress) {
            // To do: give progress feedback to user
        });
    }
}