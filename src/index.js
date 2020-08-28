import "./styles/index.scss";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
  
// function start() {
  var scene = new THREE.Scene(); //creates a new scene 
  var spotLight = new THREE.SpotLight(0xeeece); //adds a spotlight to the scene
    spotLight.position.set(1000, 1000, 1000);
    scene.add(spotLight);
  var spotLight2 = new THREE.SpotLight(0xffffff); //adds a spotlight to the scene
    spotLight2.position.set(-200, -200, -200);
    scene.add(spotLight2);
  var spotLight3 = new THREE.AmbientLight(0xffffff); //adds a spotlight to the scene
    spotLight3.position.set( 0, 5, -10);
    scene.add(spotLight3);


  var camera = new THREE.PerspectiveCamera( // creates a new camera of type perspective
    75,      // field of view. FOV is the extent of the scene that is seen on the display at any given moment. The value is in degrees.
    window.innerWidth / window.innerHeight, // aspect ratio. You almost always want to use the width of the element divided by the height
    0.1, //near clipping plane
    1000 //far clipping plane
  );

    
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight); //size in which we render our app
  document.body.appendChild(renderer.domElement);

    //Plane import
  let plane;
    var loader = new GLTFLoader();
      
  loader.load('assets/models/f-22_raptor/scene.gltf', function (gltf) {
    
    plane = gltf.scene;
    
    scene.add(plane);
    plane.rotation.y = 20.5;
    plane.name = "plane";
    plane.position.z = -2;

    setupKeyControls(plane);
    // render();
      
    }, undefined, function (error) {

      console.error(error);

    });

  //sky
  var loader = new GLTFLoader();

  loader.load('assets/models/ship_in_clouds/scene.gltf', function (gltf) {
    const sky_background = gltf.scene
    scene.add(sky_background);
    sky_background.position.z = 750
  }, undefined, function (error) {

    console.error(error);

  });
    
  //   var geometry = new THREE.SphereGeometry(2, 64, 64); //creates a sphere frame

  //   var material = new THREE.MeshPhongMaterial( { //creates a material
  //   color: 0xd726ff,
  //   specular: 0xbcbabc,
  //   } );
  //  var sphere = new THREE.Mesh(geometry, material); // places material over sphere frame
  //  sphere.name = "sphere";
  //  sphere.position.z = -55;
  //  scene.add(sphere);   //adds sphere to the scene to be rendered

  //  hoops
  var HoopsArray = []
  objectHoop();
  function objectHoop() {

    for (let i = 0; i < 1000; i++) { //generates random hoops to fly through
      const radius = 5.9;
      const tubeRadius = .5;
      const radialSegments = 6;
      const tubularSegments = 21;
      const hoopGeo = new THREE.TorusBufferGeometry(radius, tubeRadius, radialSegments, tubularSegments);
      const hoopMat = new THREE.MeshPhongMaterial({ //creates a material
        color: 0x12dbd4,
        specular: 0xbcbabc,
      });

      const hoop = new THREE.Mesh(hoopGeo, hoopMat); // places material over frame
      hoop.name = "hoop";

      let num = Math.floor(Math.random() * 45) + 1; // this will get a number for x between 1 and 45;
      num *= Math.floor(Math.random() * 2) == 1 ? 1 : -1; // this will add minus sign in half of cases

      let num2 = Math.floor(Math.random() * 25) + 1; // this will get a number for y between 1 and 25;
      num2 *= Math.floor(Math.random() * 2) == 1 ? 1 : -1; // this will add minus sign in half of cases
                      //x    y    z
      hoop.position.set(num, num2, -15 - i * 200);
      hoop.receiveShadow = true;

      scene.add(hoop);
      HoopsArray.push(hoop);
      
    }

  }

    camera.position.z = 3; //moves camera so that sphere isnt rendered at the same point as the camera
    camera.position.y = 1;


  function setupKeyControls(gtfl) { //allows keyboard inputs to adjust the position of an object 
      
    var object = scene.getObjectByName(gtfl.name);

    document.onkeydown = function (e) {
      e.preventDefault();
      switch (e.keyCode) {
        case 37:
          object.position.x -= .42 //left arrow
          break;

        case 38:
          object.position.y += .42 //up arrow 
          break;

        case 39:
          object.position.x += .42 //right arrow
          break;

        case 40:
          object.position.y -= .42 //down arrow
          break;

        case 65:
          object.rotation.z -= 0.7; // barrel roll left A key
          break;

        case 83:
          object.rotation.y += 0.5;
          // object.rotation.z -= 0.5; // barrel roll right S key
          break;
      }
    };
  }
  
  // function animate () {
  //     requestAnimationFrame( animate ); constant animation to rotate sphere
  //     sphere.rotation.x += 0.01;
  //     sphere.rotation.y += 0.01;
  //     renderer.render( scene, camera )
  // };

  // generateHoops();
  // loop that runs every frame to render scene and camera
  var clock = new THREE.Clock();
  var time = 0;
  var delta = 0;
  var direction = new THREE.Vector3(0, 0, 1);
  var speed = 100; // units a second - 2 seconds

window.render = function render() { //render function rerenders page so that changes update 
    requestAnimationFrame(render);
    
    delta = clock.getDelta();
    time += delta;

    HoopsArray.forEach(function (hoop) {
      hoop.position.addScaledVector(direction, speed * delta);
      if (hoop.position.z >= 100) {
        scene.remove(hoop);
      } 
    });
    renderer.render( scene, camera );
  };  
// }
