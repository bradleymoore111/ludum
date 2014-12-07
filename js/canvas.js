var canvas,ctx,h,w,sizes,mapRatio=20,imgs=1,sizex,sizey;	// Initializing global canvas variables
window.onresize=setSizes;
window.addEventListener('resize',setSizes);
function setSizes(){
	var ow = w;
	var oh = h;
	resizeShit();
	drawShit();
}
function init(firstTime){
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
function resizeShit(){
	init(false)
}

function load(j){
	imgs--;
	if(imgs==0){
		drawShit();
	}
}
function drawShit(){
	ctx.clearRect(0,0,w,h);
	map.draw(0,0,w,h);
	for(j in entmap){
		for(k in entmap[j]){
			if(entmap[j][k]!=0){
				entmap[j][k].draw(j*sizex,k*sizey,sizex,sizey);
			}
		}
	}
}
Entity.prototype.draw = function(x,y,w,h) {
	ctx.drawImage(this.img, x, y, w, h);
}
function viewport()	{
	var e=window,a='inner';
	if(!('innerWidth' in window)){
		a='client';
		e=document.documentElement||document.body;
	}
	return { 
		width:e[a+'Width'],
		height:e[a+'Height'],
	}
}