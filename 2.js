window.onload = function() {
	init();
};

var contenedor, canvas, context, sky, mountain, posLunaX, posLunaY, stars;

var texto = document.getElementById('alert');

var requestAnimationFrame = window.requestAnimationFrame || 
                            window.mozRequestAnimationFrame || 
                            window.webkitRequestAnimationFrame || 
                            window.msRequestAnimationFrame;

function init() {

 	contenedor = document.getElementById('container');

	if (Modernizr.canvas) {

		texto.innerHTML = ': Your browser support HTML5 canvas';

		//Creacion del canvas
		canvas = document.createElement('canvas');
		context = canvas.getContext('2d');
		context.clearRect(0,0,720,300);

		//Creacion del fondo
		sky = context.createLinearGradient(0,0,0,150);
		sky.addColorStop(0, '#001848');
		sky.addColorStop(1, '#301860');

		context.fillStyle = sky;
		context.fillRect(0,0,720,300);

		contenedor.appendChild(canvas);

		posLunaX = 100;
		posLunaY = canvas.height;
		//Llamado hacia otras funciones.
		callFunctions();

	} else {

		texto.innerHTML = ': Your browser does not support HTML5 canvas ';
		fallBackImage();
	
	}	
};

//callFunctions
function callFunctions() {
	createStars();	
	createMoon();
	createMountains();
	animate();
}


function createStars() {
	var _self = this;
	stars = new Image();
	stars.src = "assets/stars.png";
	stars.onload = function() {
		_self.drawStars();
	}
}

function drawStars() {
	context.drawImage(stars, 0, 0, canvas.width, canvas.height);
}

//Moon
function createMoon() {
	var _self = this;
	moon = new Image();
	moon.src = "assets/moon.png";
	moon.onload = function() {
		_self.animate();
	}
}

function drawMoon() {
	context.drawImage(moon, posLunaX, posLunaY, 50, 48);
}
//animate
function animate() {

	context.fillRect(0, 0, canvas.width, canvas.height);
	drawStars();
	drawMoon();
	

	if (posLunaY== -30) {
    	posLunaY=canvas.height;
    	posLunaX=100;
    } else {
    	posLunaX+=1;
    	posLunaY-=1;
     }
    	
	drawMountains();

	 setTimeout(function(){
    	requestAnimationFrame(animate);

	}, 100);
}

function createMountains() {

	var _self = this;

	mountain = new Image();
	mountain.src = 'assets/mountains.png';

	mountain.onload = function() {
		_self.drawMountains();
	}

}

function drawMountains() {
	context.drawImage(mountain, 0, 50, 300, 100);
} 

//fallBackImage 

function fallBackImage() {

	fallBackImage = document.createElement('img');
	fallBackImage.setAttribute('src', "assets/night.jpg");
	contenedor.appendChild(fallBackImage);

}