var canvas,ctx,h,w,sizes,mapRatio=20;	// Initializing global canvas variables
window.onresize=setSizes;
window.addEventListener('resize',setSizes);
function setSizes(){
	var ow = w;
	var oh = h;
	initCanvas(false);
	resizeEnts(ents,ow,oh);
	drawShit();
}
function initCanvas(firstTime){
	sizes = viewport();
	var tw = Math.floor(sizes.width/mapRatio);
	var th = Math.floor(sizes.height/mapRatio);
	// w and h need to be in a ratio of 2 to 1, and divisible by mapRatio, while also being small.
	// Time for some math to make sure a whole bunch of conditions are possible, while also
	// having a flexible viewport
	tw-=1;
	th-=1;
	while(tw>2*th){
		tw--;
	}
	if(tw%2!=0){tw--;}
	while(tw<2*th){
		th--;
	}
	w = tw;
	h = th;
	speedx = w/2;
	speedy = h;
	sizex = w/2;
	sizey = h;
	w*=	mapRatio;
	h*= mapRatio;
	canvas = document.getElementById("canvas");
	canvas.width = w;
	canvas.height = h;	
	ctx = canvas.getContext('2d');
	if(firstTime){main();}
}
function resizeEnts(e,ow,oh){
	map.x/=ow;
	map.x*=w;
	map.y/=oh;
	map.y*=h;
	map.w/=ow;
	map.w*=w;
	map.h/=oh;
	map.h*=h;
	for(var k=0;k<e.length;k++){
		ents[k].x/=ow;
		ents[k].x*=w;
		ents[k].y/=oh;
		ents[k].y*=h;
		ents[k].w/=ow;
		ents[k].w*=w;
		ents[k].h/=oh;
		ents[k].h*=h;
	}
}
function drawShit(){
	ctx.clearRect(0,0,w,h)
	map.draw();
	for(k in ents){
		ents[k].draw();
	}
}
function load(j){
	imgs--;
	if(imgs==0){
		drawShit();
	}
}
Entity.prototype.draw = function() {
	ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
}
function viewport()	{
	var e=window
	,a='inner';
	if(!('innerWidth' in window)){
		a='client';
		e=document.documentElement||document.body;
	}
	return { 
		width:e[a+'Width'],
		height:e[a+'Height'],
	}
}