var currentCharecter;
var Entity = function Entity(name,d,col){
	this.name=name;
	this.d=d;															// left = 0, up = 1, right = 2, down = 3
	this.resource="resources/"+name+".png";								// Each resource will be it's name.png,
	this.img=new Image();												// referenced from the resources folder as
	this.img.src=this.resource;											// viewed from index.html, not from the js
	this.img.onload=function(){load();}									// Could be used later for loading bar, making things clean 
	this.col=col;														// Implemented later for collision	
	this.activate=function(){writeLog("Nothing to be activated!")};
}
Entity.prototype.trigger = function(d) {
	var p = find(this.name);
	function no(){
		writeLog("Nothing to trigger!");
		return 0;
	}
	if(d==0){
		if(typeof entmap[p.x-1][p.y]!="object") no();
		else entmap[p.x-1][p.y].activate();
	}else if(d==2){
		if(typeof entmap[p.x+1][p.y]!="object") no();
		else entmap[p.x+1][p.y].activate();
	}else if(d==1){
		if(typeof entmap[p.x][p.y-1]!="object") no();
		else entmap[p.x][p.y-1].activate();
	}else if(d==3){
		if(typeof entmap[p.x][p.y+1]!="object") no();
		else entmap[p.x][p.y+1].activate();
	}
};
Entity.prototype.move = function(d,x,y){
	currentCharecter = this.name;
	writeLog('I take a step')
	// Lets do collision
	var p = find(this.name); // p = previous location
	if(d==0){ // left
		this.d = 0;
		if(p.x==0||entmap[p.x-1][p.y].col==true){
			return 0;
		}
		entmap[p.x-1][p.y] = this;
	} // right
	else if(d==2){
		this.d = 2;
		if(p.x==mapRatio*2-1||entmap[p.x+1][p.y].col==true){
			return 0;
		}
		entmap[p.x+1][p.y] = this;
	}
	else if(d==1){ // up
		this.d = 1;
		if(p.y==0||entmap[p.x][p.y-1].col==true){
			return 0;
		}
		entmap[p.x][p.y-1] = this;
	}
	else if(d==3){
		this.d = 3;
		if(p.y==mapRatio-1||entmap[p.x][p.y+1].col==true){
			return 0;
		}
		entmap[p.x][p.y+1] = this;
	}
	entmap[p.x][p.y] = 0;
	drawShit();
}
function find(sent){ // Move to India
	for(j in entmap){
		for(k in entmap[j]){
			if(entmap[j][k].name===sent){
				return {x:parseInt(j),y:parseInt(k)}
			}
		}
	}
}
function writeLog(message,charecter){
	if (!charecter) {
		charecter = currentCharecter;
	};
	var log = document.createElement('p');
	var logContainer = document.getElementById('notification');
	log.innerText = message;
	log.className = charecter;
	logContainer.insertBefore(log,logContainer.firstChild);
}
function writeBanner(heading,description){
	var banner = document.getElementById('banner');
	banner.className = '';
	banner.innerHTML = '';

	var title = document.createElement('h1');
	title.innerText = heading;
	banner.appendChild(title);
	if (description) {
		var paragraph = document.createElement('h3');
		paragraph.innerText = description;
		banner.appendChild(paragraph);
	};
	var click = document.createElement('p');
	click.innerText = '(click to continue)';
	banner.appendChild(click);
}
function hideBanner() {
	var banner = document.getElementById('banner');
	banner.className = 'hidden';
}
