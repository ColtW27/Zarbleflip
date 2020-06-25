import "./styles/index.scss";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

  var scene = new THREE.Scene(); //creates a new scene 
  var spotLight = new THREE.SpotLight(0xeeece); //adds a spotlight to the scene
    spotLight.position.set(1000, 1000, 1000);
    scene.add(spotLight);
  var spotLight2 = new THREE.SpotLight(0xffffff); //adds a spotlight to the scene
    spotLight2.position.set(-200, -200, -200);
    scene.add(spotLight2);

  var camera = new THREE.PerspectiveCamera( // creates a new camera of type perspective
    75,      // field of view. FOV is the extent of the scene that is seen on the display at any given moment. The value is in degrees.
    window.innerWidth / window.innerHeight, // aspect ratio. You almost always want to use the width of the element divided by the height
    0.1, //near clipping plane
    1000 //far clipping plane
  );

  
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight); //size in which we render our app
  document.body.appendChild(renderer.domElement);


    var geometry = new THREE.SphereGeometry(2, 64, 64); //creates a sphere frame

    var material = new THREE.MeshPhongMaterial( { //creates a material
    color: 0xdab520,
    specular: 0xbcbabc,
    } );
   var sphere = new THREE.Mesh(geometry, material); // places material over sphere frame
   sphere.name = "sphere";
   sphere.position.z = -15;
   scene.add(sphere);   //adds sphere to the scene to be rendered

  //  loops
 

    // const radius = 5.9;
    // const tubeRadius = 1.0;
    // const radialSegments = 6;
    // const tubularSegments = 21;
  
    // var geometry = new THREE.TorusBufferGeometry(radius, tubeRadius,radialSegments, tubularSegments);
  
    // var material = new THREE.MeshPhongMaterial({ //creates a material
    //   color: 0xdab520,
    //   specular: 0xbcbabc,
    // });
    // var hoop = new THREE.Mesh(geometry, material); // places material over sphere frame
    // hoop.name = "hoop";
    // hoop.position.z = -100; //places hoop's starting position in the background
    // scene.add(hoop);
var HoopsArray = []
objectHoop();
function objectHoop() {

  for (let i = 0; i < 100; i++) {
    const radius = 5.9;
    const tubeRadius = 1.0;
    const radialSegments = 6;
    const tubularSegments = 21;
    const hoopGeo = new THREE.TorusBufferGeometry(radius, tubeRadius, radialSegments, tubularSegments);
    const hoopMat = new THREE.MeshPhongMaterial({ //creates a material
      color: 0xdab520,
      specular: 0xbcbabc,
    });

    const hoop = new THREE.Mesh(hoopGeo, hoopMat); // places material over frame
    hoop.name = "hoop";
                    //x  y    z
    hoop.position.set(0, 0, -15 - i * 50);
    hoop.receiveShadow = true;

    scene.add(hoop);
    HoopsArray.push(hoop);
  }

}



  camera.position.z = 3; //moves camera so that sphere isnt rendered at the same point as the camera
  camera.position.y = 1;





    function setupKeyControls() { //allows keyboard inputs to adjust the location of an object 
      var object = scene.getObjectByName("sphere");

      document.onkeydown = function (e) {
        switch (e.keyCode) {
          case 37:
            object.position.x -= 0.7 //left arrow
            break;

          case 38:
            object.position.y += 0.7 //up arrow 
            break;

          case 39:
            object.position.x += 0.7 //right arrow
            break;

          case 40:
            object.position.y -= 0.7; //down arrow
            break;

          case 65:
            object.rotation.z -= 0.1; // barrel roll left A key
            break;

          case 83:
            object.rotation.z += 0.1; // barrel roll right S key
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

    function render () { //render function rerenders page so that changed update 
      requestAnimationFrame(render);
     
      delta = clock.getDelta();
      time += delta;

      HoopsArray.forEach(function (hoop) {
        hoop.position.addScaledVector(direction, speed * delta);
        if (hoop.position.z >= 100) {
          hoop.position.z = -100;
        } else {
        }
      });
      renderer.render( scene, camera );
    };
    
    setupKeyControls();
    render();
    // });
    
    
    
    // if (hoop.position.z === 3){
    //   scene.remove(hoop);
    // } else {
    //   hoop.position.z += .6;
      
    // }