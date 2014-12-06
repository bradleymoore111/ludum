var canvas; 
var ctx; 

function main(){
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext('2d');
	for(i=0;i<600;i+=200){
		for(j=0;j<600;j+=200){
			putImage("doge.png",i,j,200,200)
		}
	}
	
}

function putImage(resource,x,y,sizex,sizey){
	var img = new Image();
    img.src=resource
    img.onload = function(){
    	ctx.drawImage(img, x, y, sizex, sizey);
    }
}

function Entity(inputname){
	name=inputname;
	x=0; // Are going from the top left corner
	y=0; // of the resource image
	collision=0;
	resource=name+".jpg";
}