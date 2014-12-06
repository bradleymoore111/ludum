var Entity = function Entity(inputName,ix,iy,iw,ih){
	this.name=inputName;
	this.x=ix; 															// Are going from the top left corner
	this.w=iw;															// of the resource image, like a mouse
	this.y=iy; 															
	this.h=ih;												
	this.resource="resources/"+inputName+".png";						// Each resource will be it's name.png,
	this.img=new Image();												// referenced from the resources folder as
	this.img.src=this.resource;											// viewed from index.html, not from the js
	this.img.onload=function(){load();}									// Could be used later for loading bar, making things clean 
	this.col=true;														// Implemented later for collision	
	if(this.col){colmap[this.x/sizex][this.y/sizey]=1}										 
}
Entity.prototype.move = function(d) {									// left = 0, up = 1, right = 2, down = 3
	var ox = this.x,oy = this.y;
	if(d%2==0){ 														// Is it even, can only be 0 or 2, thus left or right, so horizontally, or working with x
		var tempx = this.x - (speedx - (d*speedx)); 					// Generate value without collision
		if(tempx>w-this.w||tempx<0||(this.col&&colmap[tempx/sizex][this.y/sizey])){ // Check if new position would be out of map
			return 0; 													// Break out of move() before new position is set
		}this.x = tempx; 												// Set new position
	}else{ 																// Is it odd, or 1 or 3, thus up or down, so vertically, working with y
		var tempy = this.y - (speedy - ((d-1)*speedy)); 				// Generate value without collision
		if(tempy>h-this.h||tempy<0||(this.col&&colmap[this.x/sizex][tempy/sizey])){	// Check if new position would be out of map
			return 0; 													// Break out of move() before new position is set, so no need to redraw
		}this.y = tempy; 												// Set new position
	}
	if(this.col){
		colmap[ox/sizex][oy/sizey]=0;
		colmap[this.x/sizex][this.y/sizey]=1;
	}
	drawShit(); 
};
function openDoor(e){
	console.log("here");
	var tx=ents[e].x,ty=ents[e].y,tw=ents[e].w,th=ents[e].h;
	ents[e] = new Entity("open-door",tx,ty,tw,th);
	ents[e].col = false;
	drawShit();
	colmap[ents[e].x/sizex][ents[e].y/sizey]=0;
}