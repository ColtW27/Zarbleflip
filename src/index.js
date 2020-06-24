import "./styles/index.scss";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

  var scene = new THREE.Scene();
  var spotLight = new THREE.SpotLight(0xeeece);
    spotLight.position.set(1000, 1000, 1000);
    scene.add(spotLight);
  var spotLight2 = new THREE.SpotLight(0xffffff);
    spotLight2.position.set(-200, -200, -200);
    scene.add(spotLight2);

  var camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  


  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);


    var geometry = new THREE.SphereGeometry(0.5, 16, 16);


    var material = new THREE.MeshPhongMaterial( {
    color: 0xdab520,
    specular: 0xbcbabc,
    } );
   var sphere = new THREE.Mesh(geometry, material);
   sphere.name = "sphere";
   
   scene.add(sphere);

   camera.position.z = 3;
    function setupKeyControls() {
      var object = scene.getObjectByName("sphere");

      document.onkeydown = function (e) {
        switch (e.keyCode) {
          case 37:
            object.position.x -= 0.1 //left
            break;

          case 38:
            object.position.y += 0.1 //up
            break;

          case 39:
            object.position.x += 0.1 //right
            break;

          case 40:
            object.position.y -= 0.1; //down
            break;

          case 65:
            object.rotation.z -= 0.1; // barrel roll left
            break;

          case 83:
            object.rotation.z += 0.1; // barrel roll right
            break;
        }
      };
    }

    // function animate () {
    //     requestAnimationFrame( animate );
    //     sphere.rotation.x += 0.01;
    //     sphere.rotation.y += 0.01;
    //     renderer.render( scene, camera )
    // };
    setupKeyControls();
    function render () {
      renderer.render( scene, camera );
      requestAnimationFrame(render);
    };
  render();
// });
    // document.addEventListener("keydown", () => {setupKeyControls();})

