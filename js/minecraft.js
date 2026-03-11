import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.160.0/examples/jsm/controls/OrbitControls.js';

let scene, camera, renderer, controls;

init();
animate();

function init(){

scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB);

camera = new THREE.PerspectiveCamera(
75,
window.innerWidth / window.innerHeight,
0.1,
1000
);

renderer = new THREE.WebGLRenderer({ antialias:true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


controls = new OrbitControls(camera, renderer.domElement);


camera.position.set(20,20,20);
controls.update();


// LUZ

const light = new THREE.DirectionalLight(0xffffff,1);
light.position.set(10,20,10);
scene.add(light);

const ambient = new THREE.AmbientLight(0xffffff,0.4);
scene.add(ambient);


// MATERIAL TIPO BLOQUE

const material = new THREE.MeshLambertMaterial({color:0x55aa55});


// GENERAR TERRENO

for(let x = -10; x < 10; x++){

for(let z = -10; z < 10; z++){

let height = Math.floor(Math.random()*3);

for(let y = 0; y < height; y++){

const geometry = new THREE.BoxGeometry(1,1,1);
const cube = new THREE.Mesh(geometry, material);

cube.position.set(x,y,z);

scene.add(cube);

}

}

}


// GRID

const grid = new THREE.GridHelper(40,40);
scene.add(grid);


// RESIZE

window.addEventListener('resize',()=>{

camera.aspect = window.innerWidth/window.innerHeight;
camera.updateProjectionMatrix();

renderer.setSize(window.innerWidth,window.innerHeight);

});

}


function animate(){

requestAnimationFrame(animate);

renderer.render(scene,camera);

}