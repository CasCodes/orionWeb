import './style.css'

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


const scene = new THREE.Scene();

// Add "eyeball CAMERA", viewing in 75 deg. angle, aspect ratio (based of browser window), view frustum
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  alpha: true,
});

// scaling and positioning
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight);
renderer.setClearColor(0xfffff, 0);

camera.position.setZ(6);
camera.position.setY(8);

// 3d model
const loader = new GLTFLoader();

loader.load( 'resources/planetColored.glb', function ( gltf ) {
  
  gltf.scene.rotation.y += 0.8;
  gltf.scene.rotation.z += 4;
	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );
scene.add(loader);

// let there be light
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(-3, 6, 4);
const pointLight2 = new THREE.PointLight(0xffffff);
pointLight2.position.set(0, -2, -10);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);

scene.add(pointLight, pointLight2, ambientLight);

// helpers
const lightHelper = new THREE.PointLightHelper(pointLight);
const lightHelper2 = new THREE.PointLightHelper(pointLight2);
const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(lightHelper, lightHelper2);
//scene.add(gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

// *shiny*
function addStar(){
  const geometry = new THREE.SphereGeometry(0.05);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});

  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(50));
  star.position.set(x, y, z);

  scene.add(star);
}
Array(100).fill().forEach(addStar);

controls.noPan = false;
controls.maxDistance = controls.minDistance = 10;  
controls.noZoom = true;

// scroll me boys to cuba
function moveCamera() {
  scene.children[103].rotation.y += 0.02;
  scene.children[103].rotation.z += 0.02;
}
document.body.onscroll = moveCamera;

// infinte loop that calls the render method
function animate() {
  scene.rotation.y += 0.003;

  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  controls.update();
}
animate()

// refresh page on resize
window.addEventListener('resize', function () { 
    "use strict";
    window.location.reload(); 
});

// fancy cursor
let mouseCursor = document.querySelector('.cursor');
let navLinks = document.querySelectorAll('.navbar a');
let button = document.querySelectorAll('.contact_btn');
window.addEventListener('mousemove', cursor);

function cursor(e){
  mouseCursor.style.top = e.pageY + 'px';
  mouseCursor.style.left = e.pageX + 'px';
}

navLinks.forEach(link => {
  link.addEventListener('mousemove',() =>{
    mouseCursor.classList.add('link-grow');
    link.classList.add('hovered-link')
  });
  link.addEventListener('mouseleave',() =>{
    mouseCursor.classList.remove('link-grow');
    link.classList.remove('hovered-link')
  });
});

button.forEach(link => {
  link.addEventListener('mousemove',() =>{
    mouseCursor.classList.add('link-grow');
    link.classList.add('hovered-link')
  });
  link.addEventListener('mouseleave',() =>{
    mouseCursor.classList.remove('link-grow');
    link.classList.remove('hovered-link')
  });
});