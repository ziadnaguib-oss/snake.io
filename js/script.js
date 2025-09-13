var canvasSnake = document.getElementById("canvasSnake");
var ctxSnake = canvasSnake.getContext("2d");
var ctxFood = document.getElementById("canvasFood").getContext("2d");
var ctxHex = document.getElementById("canvasHex").getContext("2d");
var ut = new Util();
var mouseDown = false,
	cursor = new Point(0, 0);
var game = new Game(ctxSnake, ctxFood, ctxHex);
// --- Full-window + DPR scaling ---
function fitCanvas(cnv, ctx) {
  const dpr = Math.max(1, window.devicePixelRatio || 1);
  const rect = cnv.getBoundingClientRect();
  cnv.width  = Math.max(1, Math.round(rect.width  * dpr));
  cnv.height = Math.max(1, Math.round(rect.height * dpr));
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
function resizeAll() {
  fitCanvas(document.getElementById('canvasHex'),  ctxHex);
  fitCanvas(document.getElementById('canvasFood'), ctxFood);
  fitCanvas(document.getElementById('canvasSnake'),ctxSnake);
  game.SCREEN_SIZE.x = window.innerWidth;
  game.SCREEN_SIZE.y = window.innerHeight;
  if (typeof game.onResize === 'function') game.onResize();
}
window.addEventListener('resize', resizeAll);
resizeAll();


canvasSnake.onmousemove = function(e){
	if(true /* always steer; mouseDown = boost */){		
		cursor = ut.getMousePos(canvasSnake, e);	
		var ang = ut.getAngle(game.snakes[0].arr[0], cursor);				
		game.snakes[0].changeAngle(ang);		
	}
}

canvasSnake.onmousedown = function(e){
	mouseDown = true;	
}

canvasSnake.onmouseup = function(e){	
	mouseDown = false;
}

function start(){	
	game.init();
	update();
}


var updateId,	
previousDelta = 0,
fpsLimit = 20;
function update(currentDelta){
	updateId = requestAnimationFrame(update);
	var delta = currentDelta - previousDelta;
    if (fpsLimit && delta < 1000 / fpsLimit) return;
    previousDelta = currentDelta;

    //clear all
	ctxFood.clearRect(0, 0, game.SCREEN_SIZE.x, game.SCREEN_SIZE.y);
	ctxSnake.clearRect(0, 0, game.SCREEN_SIZE.x, game.SCREEN_SIZE.y);
	ctxHex.clearRect(0, 0, game.SCREEN_SIZE.x, game.SCREEN_SIZE.y);

	//draw all
	game.draw();	
}


start();






