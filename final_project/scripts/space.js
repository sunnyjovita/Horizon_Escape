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
    
            const scene = new BABYLON.Scene(engine);  
            // BABYLON.SceneLoader.ImportMeshAsync("", "https://raw.githubusercontent.com/sunnyjovita/Horizon_Escape/master/final_project/assets/", "ship.babylon");

            const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));
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
            

            //
            // var sun = BABYLON.Mesh.CreateSphere("sun", 16, 1, scene);
            // sun.position = new BABYLON.Vector3(0, 0, 0);
            // var material = new BABYLON.StandardMaterial("sunmaterial", scene);
            // sun.material = material;
            // sun.material.emissiveColor = new BABYLON.Color3(1, 1, 0);
        
            // sun light
            // var light0 = new BABYLON.PointLight("Omni0", sun.position, scene);
            // light0.diffuse = new BABYLON.Color3(1, 1, 1);
            
            // // planet
            // var planet = BABYLON.MeshBuilder.CreateSphere("earth", {}, scene);
            // var planet = BABYLON.Mesh.CreateSphere("planet", 16, 2, scene);
            // planet.parent = sun;
            
            // var planetMaterial = new BABYLON.StandardMaterial("planetSurface", scene);
            // // planetMaterial.diffuseTexture = new BABYLON.Texture("textures/sky", scene);
        
            // planetMaterial.diffuseTexture = new BABYLON.Texture("https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/2004_satellite_picture_of_Istanbul_and_the_Bosphorus.jpg/640px-2004_satellite_picture_of_Istanbul_and_the_Bosphorus.jpg", scene);
            // planet.material = planetMaterial;
            // planet.material.diffuseColor = new BABYLON.Color3(1, 1, 1);
            // planet.material.specularColor = new BABYLON.Color3(0, 0, 0);
        
            // // moon
            // var moon = BABYLON.Mesh.CreateSphere("moon", 16, 0.7, scene);
            // moon.translate(planet.position, 5, BABYLON.Space.WORLD);
            // moon.parent = planet;
        
            // // Animations
            // var alpha = 0;
            // scene.beforeRender = function () {
            //     planet.position = new BABYLON.Vector3(10 * Math.sin(alpha), planet.parent.position.y, 10 * Math.cos(alpha));
            //     moon.position = new BABYLON.Vector3(5 * Math.sin(alpha), moon.parent.position.y, 5 * Math.cos(alpha));
                        
            //     alpha += 0.005;
                        
            // };
        
            // //Create a custom mesh  
            // var customMesh = new BABYLON.Mesh("custom", scene);
            
            // //Set arrays for positions and indices
            // var positions = [];
            // var colors = [];
        
            // var pointsCount = 10000;
        
            // var positions = new Array(3 * pointsCount);
            // positions.fill(0);
        
            // var velocity = [];
        
            // var theta = 0;
            // var psi = 0;
            // var x = 0;
            // var y = 0;
            // var z = 0;
            // for(var p = 0; p<pointsCount; p++) {
        
            //     theta = 2 * Math.random() * Math.PI;
            //     psi = 2 * Math.random() * Math.PI;
                
            //     velocity[3 * p] = Math.sin(theta) * Math.cos(psi)* 10; // * Math.random();
            //     velocity[3 * p + 1] = Math.sin(theta) * Math.sin(psi)* 10; // * Math.random();
            //     velocity[3 * p + 2] = Math.cos(theta) * 10; // * Math.random(); 
            // }
        
            // var colors = new Array(4 * pointsCount);
            // colors = colors.fill(0).map((x) => {
            //     return 1 - (Math.random()/4);
            // })
        
            // var vertexData = new BABYLON.VertexData();
        
            // //Assign positions
            // vertexData.positions = positions;
            // vertexData.colors = colors;
        
            // //Apply vertexData to custom mesh
            // vertexData.applyToMesh(customMesh, true);
            
            // var mat = new BABYLON.StandardMaterial("mat", scene);
            // mat.emissiveColor = new BABYLON.Color3(1, 1, 1);
            // mat.disableLighting = true;
            // mat.pointsCloud = true;
            // mat.pointSize = 1;
            
            // customMesh.material = mat;
        
            // var dir = true;
            // document.onkeydown = ()=>{
            //     dir = !dir
            // }
        
            // var posLen = positions.length;
        
            // var IntervalhidgesID2 = setInterval(myMethod2, 100);
            // function myMethod2() {                          
            //     for(var p = 0; p < posLen; p++) {
            //         if(dir){
            //             positions[p] += velocity[p];
            //         }else{
            //             positions[p] -= velocity[p];
            //         }
                    
            //    }
            //     customMesh.updateVerticesData(BABYLON.VertexBuffer.PositionKind, positions);
            // } 
          

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