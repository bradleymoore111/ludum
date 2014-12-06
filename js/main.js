var canvas,ctx,h,w,speed=50,imgs=1,ents=[],map;					// Initialalizing variables for global access
function main(){ 											// Runs onload of body
	canvas = document.getElementById("canvas"); 			// Initializing canvas
	ctx = canvas.getContext('2d');							//
	h = canvas.height; 										// Easy access variables
	w = canvas.width;										//
	map = new Entity("map",0,0,w,h);
	ents[0] = new Entity("doge",0,0,50,50); 							// Creates our entity to play with for now
	ents[1] = new Entity("cate",50,50,50,50);							//
	drawShit(); 											// Initial render
	document.addEventListener('keydown', function(event) { 	// Keyboard input manager
		var key = event.keyCode;							//
		if (key > 36 && key < 41){ 							// 37 is left, 38 is up, 39 is right, 40 is down
			ents[0].move(key-37); 							// for 4 directions, left, up, right, down, condenses to 0-3
		}else if (key == 87){
			ents[1].move(1);
		}else if (key == 65){
			ents[1].move(0);
		}else if (key == 83){
			ents[1].move(3);
		}else if (key == 68){
			ents[1].move(2);
		}
	}, true);
}