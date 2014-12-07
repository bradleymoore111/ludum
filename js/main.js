var entmap=[],map,xs=[],ys=[],guy,snowman;
function main(){
	for(var j=0;j<mapRatio*2;j++){
		entmap[j]=[];
		for(var k=0;k<mapRatio;k++){
			entmap[j][k]=0;
		}
	}

	// Map collision
	xs = [8,8,9,9,9,8,8,9,7,6,5,4,3,2,1,0,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,19,17,17,19,19,21,21,25,26,26,25,29,30,30,29,34,35,35,34,37,36,36,37,37,36,36,37,32,31,31,32,32,33,33,32,36,35,35,36,36,35,35,36,37,37,37,38,38,38,39,39,38,37,36,36,37,30,29,29,30,28,27,26,25,24,23,22,21]
	ys = [0,1,1,0,4,4,5,5,5,5,5,5,5,5,5,5,0,1,2,3,4,5,6,9,10,11,12,13,14,15,16,17,18,19,9,9,6,6,6,6,9,6,6,5,5,11,11,10,10,10,10,11,11,13,13,12,12,9,9,8,8,6,6,5,5,3,3,2,2,5,5,4,4,3,3,2,2,2,3,4,4,3,2,2,1,1,1,1,0,0,0,0,3,3,3,3,3,3,3,3,3,3]
	for(var j=0;j<xs.length;j++){
		entmap[xs[j]][ys[j]] = new Entity("null",0,true);
	}
	map = new Entity("map",0,0,w,h);

	guy = {
		hasShovel:false,
	}
	snowman = {}

	entmap[18][19] = new Entity("snowbro",0,true);
	entmap[22][19] = new Entity("guy_static",0,true);
	// entmap[5][4].activate = function(){ // Example trigger system
	// 	writeLog("Triggered!");
	// }
	entmap[9][2] = new Entity("closed-door",0,true); // Utility room door
	entmap[9][3] = new Entity("closed-door",0,true);
	entmap[20][7] = new Entity("closed-door",0,true); // Front door door
	entmap[20][8] = new Entity("closed-door",0,true);
	entmap[30][2] = new Entity("closed-door",0,true); // Outside room
	entmap[30][1] = new Entity("closed-door",0,true);

	entmap[31][17] = new Entity("null",0,true);
	entmap[32][17] = new Entity("null",0,true);

	entmap[31][17].activate = function(){
		if(!guy.hasShovel){
			guy.hasShovel = true;
			writeLog("Picked up shovel.","guy");
			console.log("got shovel!");
		}
		return 0;
	}
	entmap[32][17].activate = entmap[31][17].activate;
	

	document.addEventListener('keydown', function(event) { 	
		var key = event.keyCode;				
		var g = find("guy_static");	
		var s = find("snowbro");		
		if (key > 36 && key < 41){ 							// 37 is left, 38 is up, 39 is right, 40 is down
			entmap[g.x][g.y].move(key-37,0,0); 							// for 4 directions, left, up, right, down, condenses to 0-3
		}else if (key == 87){
			entmap[s.x][s.y].move(1);
		}else if (key == 65){
			entmap[s.x][s.y].move(0);
		}else if (key == 83){
			entmap[s.x][s.y].move(3);
		}else if (key == 68){
			entmap[s.x][s.y].move(2);
		}else if (key == 69){
			entmap[g.x][g.y].trigger(entmap[g.x][g.y].d);
		}else if (key == 81){
			console.log(find("snowbro"));
		}else if (key == 67){
			console.log(find("guy_static"));
		}
	}, true);
	console.log("Debug commands:\nq = snowbro location\nc = dude location\ne = trigger");
}