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
	}for(var j=21;j<40;j++){ // River
		entmap[j][15] = new Entity("null",0,true);
	}
	map = new Entity("map",0,0,w,h);

	// Trees
	xs = [25,29,31,32,34,35,35,36,36,36,37,37,38]
	ys = [6,11,6,3,11,5,7,1,9,13,4,2,2]
	for(var j=0;j<xs.length;j++){
		entmap[xs[j]][ys[j]] = new Entity("null-tree",0,true);
		entmap[xs[j]][ys[j]-1] = new Entity("null-tree",0,true);
		entmap[xs[j]+1][ys[j]] = new Entity("null-tree",0,true);
		entmap[xs[j]+1][ys[j]-1] = new Entity("null-tree",0,true);

		entmap[xs[j]][ys[j]].hasWood = true; // for branches
		entmap[xs[j]][ys[j]-1].hasWood = true;
		entmap[xs[j]+1][ys[j]].hasWood = true;
		entmap[xs[j]+1][ys[j]-1].hasWood = true;

		entmap[xs[j]][ys[j]].activate = function(){
			if(!this.hasWood){
				writeLog("This part of the tree has no more branches to pick.","guy_static");
			}else{
				this.hasWood = false;
				guy.sticks++;
				writeLog("Took some branches ("+guy.sticks+").","guy_static");
			}
		}
		entmap[xs[j]][ys[j]-1].activate = entmap[xs[j]][ys[j]].activate;
		entmap[xs[j]+1][ys[j]].activate = entmap[xs[j]][ys[j]].activate;
		entmap[xs[j]+1][ys[j]-1].activate = entmap[xs[j]][ys[j]].activate;
	}

	guy = {
		turnedOnPower:false,
		hasFloatie:false,
		hasOpenedUtil:false,
		sticks:0,
		litSticks:0,
	}
	snowbro = {
		hasRetractedAwning:false,
		hasOpenedGarage:false,
		hasKey:false,
	}

	entmap[18][19] = new Entity("snowbro",0,true);
	entmap[22][19] = new Entity("guy_static",0,true);
	// entmap[5][4].activate = function(){ // Example trigger system
	// 	writeLog("Triggered!");
	// }
	entmap[9][2] = new Entity("closed-door",0,true); // Utility room door
	entmap[9][3] = new Entity("closed-door",0,true);
	entmap[20][7] = new Entity("closed-door",0,true); // Front door door
	entmap[20][8] = new Entity("closed-door",0,true);
	entmap[30][2] = new Entity("closed-door",0,true); // Garage door
	entmap[30][1] = new Entity("closed-door",0,true);

	entmap[21][19] = new Entity("switch",0,true);
	entmap[21][19].activate = function(){ // Turn on house power
		if(guy.turnedOnPower){
			writeLog("You've already turned on the power!","guy_static");
		}else{
			guy.turnedOnPower = true;
			// Code to undim the left screen
			writeLog("The power is back on in the house!","guy_static");
			writeBanner("The power is on", "Now that the power is back on, the house's thermostat starts to heat up. Find a way to save Snowman from melting and Guy from freezing!")
		}
	}

	entmap[21][18] = new Entity("onning-4",0,true); // Awning
	entmap[22][18] = new Entity("onning-3",0,true);
	entmap[22][17] = new Entity("onning-2",0,true);
	entmap[21][17] = new Entity("onning-1",0,true);
	entmap[19][19] = new Entity("switch-right",0,true);
	entmap[19][19].activate = function(){
		if(!guy.turnedOnPower){ // If no power
			writeLog("The power is out, and the awning doesn't move!","snowbro");
		}else if(snowbro.hasRetractedAwning){
			writeLog("You've already retracted the awning!","snowbro");
		}else{
			snowbro.hasRetractedAwning = true;
			entmap[21][18] = 0;
			entmap[22][18] = 0;
			entmap[22][17] = 0;
			entmap[21][17] = 0;
			entmap[21][18] = new Entity("snow_4",0,true); // Snowpile currently
			entmap[21][18].activate = function(){
				if(guy.hasFloaties){
					writeLog("You've already picked up floaties","guy_static");
				}else{
					guy.hasFloaties = true;
					writeLog("Picked up floaties, maybe you can cross the river now.","guy_static");
					for(var j=21;j<40;j++){ // River
						entmap[j][15] = 0;
					}
				}
			}
			writeLog("Retracted awning.","snowbro");
			writeLog("Looks like a snow pile fell off!","snowbro");
			entmap[21][18].draw();
		}
	}	
	
	entmap[19][5] = new Entity("switch-right",0,true);
	entmap[19][5].activate = function(){ // Garage opener
		if(snowbro.hasOpenedGarage){
			writeLog("You've already opened the garage!","snowbro");
		}else{
			entmap[30][2] = 0;
			entmap[30][1] = 0;
			writeLog("Opened garage!","snowbro");
			snowbro.hasOpenedGarage = true;
		}
		
	}

	entmap[21][4] = new Entity("wire-off",0,true);
	entmap[21][4].activate = function(){
		writeLog("These wires are useless off. But if you could somehow turn them on...","guy_static");
	}

	entmap[21][2] = new Entity("switch",0,true);
	entmap[21][2].activate = function(){
		if(guy.hasOpenedUtil){
			writeLog("You've already opened the utility room!","guy_static");
		}else{
			entmap[9][2] = 0;
			entmap[9][3] = 0;
			writeLog("You've also sparked some wires outside...","guy_static");
			entmap[21][4] = new Entity("wire-on",0,true);
			entmap[21][4].activate = function(){
				if(guy.sticks==0){
					writeLog("You might be able to use this to start a fire, but you'll need some wood...","guy_static");
				}else{
					guy.sticks--;
					guy.litSticks++;
					writeLog("The electricity ignites your stick! ("+guy.litSticks+") lit sticks");
				}
			}
			writeLog("Opened utility room!","guy_static");
			guy.hasOpenedUtil = true;
		}
	}

	entmap[21][11] = new Entity("log-1",0,true);
	entmap[21][12] = new Entity("log-2",0,true); // woodpile
	entmap[21][11].activate = function(){
		if(guy.litSticks<5){
			writeLog("Maybe you could start a fire? You'll need more fire than that!","guy_static");
		}else{
			writeLog("You decide you're cold and light a fire and ");
			setTimeout(function(){writeLog("OMFG YOU LIT YOUR HOUSE ON FIRE","guy_static")},500);
			setTimeout(function(){writeLog("Well at least you're warm. Good game! You win :)","guy_static")},2000);
		}
	}

	entmap[0][3] = new Entity("thermostat",0,true);
	entmap[0][3].activate = function(){
		writeLog("You're literally melting, so you turn off the heat.","snowbro");
		setTimeout(function(){writeLog("And now the boy can't make a fire nor go anywhere warm!","snowbro")},1000);
		setTimeout(function(){writeLog("You killed your boy.","snowbro")},2000);
		setTimeout(function(){writeLog("Good game. Shame on you.","snowbro")},3000);
		if(snowbro.hasKey){
			setTimeout(function(){writeLog("WAIT WAIT WAIT YOU HAD A KEY, AND YOU STILL KILLED HIM?","snowbro")},5000);
			setTimeout(function(){writeLog("Dude, you're a dick.","snowbro")},7000);
		}
	}

	entmap[4][2] = new Entity("table-4",0,true);
	entmap[5][2] = new Entity("table-3",0,true);
	entmap[5][1] = new Entity("table-2",0,true);
	entmap[4][1] = new Entity("table-1",0,true);

	entmap[4][1].activate = function(){
		snowbro.hasKey = true;
		entmap[4][1] = new Entity("table-1-no-key",0,true);
		writeLog("DON'T ASK WHY IT'S LOCKED FROM THE INSIDE","snowbro");
		writeLog("You've picked up a key, should open the front door.","snowbro");
	}

	entmap[20][7] = new Entity("closed-door",0,true);
	entmap[20][8] = new Entity("closed-door",0,true);

	entmap[20][7].activate = function(){
		if(!snowbro.hasKey) {
			writeLog("Locked. Damn");
		}else{
			entmap[20][7] = 0;
			entmap[20][8] = 0;
			writeLog("You open the door, and now you can go outside and be comfy, while your boy can keep himself warm. Good game!","snowbro");
		}
	}
	entmap[20][8].activate = entmap[20][7].activate;

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
			var c = find(currentCharecter);
			entmap[c.x][c.y].trigger(entmap[c.x][c.y].d);
		}else if (key == 81){
			console.log(find("snowbro"));
		}else if (key == 67){
			console.log(find("guy_static"));
		}
	}, true);
	console.log("Debug commands:\nq = snowbro location\nc = dude location\ne = trigger boy\nf = trigger snowman");
}

function tutorial() {
	writeBanner('A boy and his Snowman','Let\'s get started. Use the arrow keys to move. You can interact with the lever to your left by pressing \'e\'', function(){});
}