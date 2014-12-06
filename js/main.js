var speedx,speedy,sizex,sizey,imgs=3,ents=[],map,colmap=[[]];	// Initializing global game variables
function main(){ 											// Runs onload of body
	for(var j=0;j<mapRatio*2;j++){
		colmap[j]=[];
		for(var k=0;k<mapRatio;k++){
			colmap[j][k]=0;
		}
	}	
	map = new Entity("map",0,0,w,h);						//
	ents[0] = new Entity("snowbro",0,0,sizex,speedy);		// Creates our entity to play with for now
	ents[1] = new Entity("cate",sizex,sizey,sizex,sizey);	// Creates our entity to play with for now
	for(var j=0;j<9;j++){
		ents[2+j] = new Entity("black",w/2,j*sizey,sizex,sizey);
	}
	for(var j=0;j<9	;j++){
		ents[11+j] = new Entity("black",w/2,(j+11)*sizey,sizex,sizey);
	}
	ents[20] = new Entity("closed-door",w/2,9*sizey,sizex,sizey);
	ents[21] = new Entity("closed-door",w/2,10*sizey,sizex,sizey);

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