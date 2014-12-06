function drawShit(){
	ctx.clearRect(0,0,w,h)
	for(var k=0;k<ents.length;k++){
		ents[k].draw();
	}
}

function load(j){
	imgs--;
	if(imgs==0){
		drawShit();
	}
}