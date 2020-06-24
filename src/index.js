import "./styles/index.scss";

// window.addEventListener('DOMContentLoaded ', () => {
//     alert('Loaded')
// })
// document.addEventListener("DOMContentLoaded", () => {
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

  const manager = new THREE.LoadingManager();
  manager.onLoad = init;
  const models = {
    jet: { url: "assets/models/f-22_raptor/scene.gltf" },
   
  };
  {
    const gltfLoader = new GLTFLoader(manager);
    for (const model of Object.values(models)) {
      gltfLoader.load(model.url, (gltf) => {
        model.gltf = gltf;
      });
    }
  }

  function intit(){

  }

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);


    var geometry = new THREE.SphereGeometry(1, 32, 32);


    var material = new THREE.MeshPhongMaterial( {
    color: 0xdab520,
    specular: 0xbcbabc,
    } );
   var sphere = new THREE.Mesh(geometry, material);
   scene.add(sphere);
   camera.position.z = 3;

    function animate () {
        requestAnimationFrame( animate );
        sphere.rotation.x += 0.01;
        sphere.rotation.y += 0.01;
        renderer.render( scene, camera )
    };


  animate();
// });


