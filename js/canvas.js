var canvas,ctx,h,w,sizes;	// Initializing global canvas variables
/*window.onresize=setSizes;
window.addEventListener('resize',setSizes);
function setSizes(){
	initCanvas(false);
	drawShit();
}*/
function initCanvas(firstTime){
	sizes = viewport();
	var tw = Math.floor(sizes.width/10);
	var th = Math.floor(sizes.height/10);
	// w and h need to be in a ratio of 2 to 1, and divisible by 10, while also being small.
	// Time for some math to make sure a whole bunch of conditions are possible, while also
	// having a flexible viewport
	tw-=2;
	th-=2;
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
	w*=	10;
	h*= 10;
	canvas = document.getElementById("canvas");
	canvas.width = w;
	canvas.height = h;	
	ctx = canvas.getContext('2d');
	if(firstTime){main();}
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