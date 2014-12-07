var entmap=[],map;
function main(){
	for(var j=0;j<mapRatio*2;j++){
		entmap[j]=[];
		for(var k=0;k<mapRatio;k++){
			entmap[j][k]=0;
		}
	}
	map = new Entity("map",0,0,w,h);
	entmap[2][4] = new Entity("snowbro",0,true,"l");
	entmap[15][4] = new Entity("guy_static",0,true,"r");
	entmap[5][4] = new Entity("null",0,true,"r");
	entmap[5][4].activate = function(){ // Example trigger system
		write("Triggered!");
	}
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
		}
	}, true);
}