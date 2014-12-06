var canvas,ctx,h,w,speed=50,imgs=1,ents=[];					// Initialalizing variables for global access
function main(){ 											// Runs onload of body
	canvas = document.getElementById("canvas"); 			// Initializing canvas
	ctx = canvas.getContext('2d');
	h = canvas.height; 										// Easy access variables
	w = canvas.width;
	ents[0] = new Entity("doge"); 							// Creates our entity to play with for now
	ents[1] = new Entity("cate");
	drawShit(); 										// Initial render
	document.addEventListener('keydown', function(event) { 	// Keyboard input manager
		if (event.keyCode > 36 && event.keyCode < 41){ 		// 37 is left, 38 is up, 39 is right, 40 is down
			move(ents[0],event.keyCode-37); 				// for 4 directions, left, up, right, down, condenses to 0-3
		}else if (event.keyCode == 87){
			move(ents[1],1);
		}else if (event.keyCode == 65){
			move(ents[1],0);
		}else if (event.keyCode == 83){
			move(ents[1],3);
		}else if (event.keyCode == 68){
			move(ents[1],2);
		}
	}, true);

}
function load(j){
	imgs--;
	if(imgs==0){
		drawShit();
	}
}
function drawShit(){
	clear();
	for(var k=0;k<ents.length;k++){
		ents[k].draw();
	}
}
// left = 0, up = 1, right = 2, down = 3
function move(e, d) { 							// e is an entity, d is direction
	if(d%2==0){ 								// Is it even, can only be 0 or 2, thus left or right, so horizontally, or working with x
		temp = e.x - (speed - (d*speed)); 		// Generate value without collision
		if(temp>w-e.w||temp<0){ 				// Check if new position would be out of map
			return 0; 							// Break out of move() before new position is set
		}e.x = temp; 							// Set new position
	}else{ 										// Is it odd, or 1 or 3, thus up or down, so vertically, working with y
		temp = e.y - (speed - ((d-1)*speed)); 	// Generate value without collision
		if(temp>h-e.h||temp<0){ 				// Check if new position would be out of map
			return 0; 							// Break out of move() before new position is set, so no need to redraw
		}e.y = temp; 							// Set new position
	}
	drawShit(); 									// Redraw image with new position
}

var Entity = function Entity(inputName){
	this.name=inputName;
	this.x=0; 									// Are going from the top left corner
	this.w=50;
	this.y=0; 									// of the resource image
	this.h=50;
	this.resource=inputName+".png";				// Each resource will be it's name.png
	this.img=new Image();
	this.img.src=this.resource;
	this.img.onload=function(){
		load();									// Could be used later for loading bar, making things clean
	}
	this.collision=0;							// Implemented later for collision
	this.draw = function () {					// Draw is now a method within each ent
		ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
	}
}
function clear(){
	ctx.clearRect(0,0,600,600);
};