/*
	Background class
	art:
	-http://blog.sklambert.com/html5-canvas-game-panning-a-background/
*/

function Background(){
	this.x = 0;
	this.y = -800;
	this.vy = 100;
	this.sprite = new Image();
	this.sprite.src = "png/background.png"
}

Background.prototype.mover = function (){
	this.y = this.y + this.vy*dt;
}

Background.prototype.desenhar = function (){
	ctx.drawImage(this.sprite, this.x, this.y);
}

Background.prototype.restricoes = function(){
	if(this.y >= 0){
		this.y = -800;
	}
}