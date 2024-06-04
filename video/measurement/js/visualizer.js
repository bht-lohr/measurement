var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, $(window).width() / $(window).height(), 1, 100);
var renderer = new THREE.WebGLRenderer();
var cubes = new Array();
var controls;
var CubeKoef=100;

function initVisualizer() {
	renderer.setClearColor(0x303050);
	document.body.appendChild(renderer.domElement);

	var i = 0;
	for(var x = 0; x < CubeKoef; x += 1) {
		var j = 0;
		cubes[i] = new Array();
		for(var y = 0; y < CubeKoef; y += 1) {
			var geometry = new THREE.CubeGeometry(.5, .5, .5);
			
			var material = new THREE.MeshPhongMaterial({
				color: randomFairColor(),
				ambient: 0x808080,
				specular: 0xffffff,
				shininess: 20,
				reflectivity: 5.5 
			});
			
			cubes[i][j] = new THREE.Mesh(geometry, material);
			cubes[i][j].position = new THREE.Vector3(y, x, 0);
			
			scene.add(cubes[i][j]);
			j++;
		}
		i++;
	}

	var light = new THREE.AmbientLight(0x505050);
	scene.add(light);

	var directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
	directionalLight.position.set(0, 1, 1);
	scene.add(directionalLight);

	directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
	directionalLight.position.set(1, 1, 0);
	scene.add(directionalLight);


	directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
	directionalLight.position.set(0, -1, -1);
	scene.add(directionalLight);

	directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
	directionalLight.position.set(-1, -1, 0);
	scene.add(directionalLight);

	camera.position.z = 10;
	camera.position.x = 0;
	camera.position.y = -30;

	controls = new THREE.OrbitControls(camera);
	controls.addEventListener('change', render);

	for(var i = 0; i < 7; i++) {
		controls.pan(new THREE.Vector3( 1, 0, 0 ));
		controls.pan(new THREE.Vector3( 0, 1, 0 ));
	}
	
render();
renderer.setSize($(window).width(), $(window).height());
}
var render = function () {
// console.log(freqByteData);
	if(typeof freqByteData === 'object' && freqByteData.length > 0) {
		var k = 0;
		for(var i = 0; i < cubes.length; i++) {
			for(var j = 0; j < cubes[i].length; j++) {
				var boost = 0.2;
				var scale = (freqByteData[k] * boost) ;
				//var scale = (freqByteData[k] + boost) / CubeKoef;

				cubes[i][j].scale.z = (scale < 1 ? 1 : scale);
				k += (k < freqByteData.length ? 1 : 0);
			}
		}
	}

	requestAnimationFrame(render);
	controls.update();
	renderer.render(scene, camera);
};


function randomFairColor() {
	var min = 64;
	var max = 224;
	var r = (Math.floor(Math.random() * (max - min + 1)) + min) * 65536;
	var g = (Math.floor(Math.random() * (max - min + 1)) + min) * 256;
	var b = (Math.floor(Math.random() * (max - min + 1)) + min);
	return r + g + b;
}
