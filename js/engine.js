var Entity = function Entity(inputName){
	this.name=inputName;
	this.x=0; 												// Are going from the top left corner
	this.w=50;												// of the resource image, like a mouse
	this.y=0; 												// 
	this.h=50;												//
	this.resource="resources/"+inputName+".png";			// Each resource will be it's name.png,
	this.img=new Image();									// referenced from the resources folder as
	this.img.src=this.resource;								// viewed from index.html, not from the js
	this.img.onload=function(){load();}						// Could be used later for loading bar, making things clean 
	this.collision=0;										// Implemented later for collision
	this.draw=function() {									// Draw is now a method within each ent
		ctx.drawImage(this.img, this.x, this.y, this.w, this.h);//tall code...
	}														// 
	this.move=function(d){ 									// left = 0, up = 1, right = 2, down = 3
		if(d%2==0){ 										// Is it even, can only be 0 or 2, thus left or right, so horizontally, or working with x
			var temp = this.x - (speed - (d*speed)); 		// Generate value without collision
			if(temp>w-this.w||temp<0){ 						// Check if new position would be out of map
				return 0; 									// Break out of move() before new position is set
			}this.x = temp; 								// Set new position
		}else{ 												// Is it odd, or 1 or 3, thus up or down, so vertically, working with y
			var temp = this.y - (speed - ((d-1)*speed)); 	// Generate value without collision
			if(temp>h-this.h||temp<0){ 						// Check if new position would be out of map
				return 0; 									// Break out of move() before new position is set, so no need to redraw
			}this.y = temp; 								// Set new position
		}													//
		drawShit(); 										// Redraw image with new position
	}
}