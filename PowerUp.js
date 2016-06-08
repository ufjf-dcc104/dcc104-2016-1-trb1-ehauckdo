/*
	PowerUp class
	art: 
	- Ripped from Touhou Subterranean Animism 
*/	

function PowerUp(){
	this.x = 300;
	this.y = 0;
	this.raio = 30;
	this.sprite = new Image();
	this.sprite.src = "png/powerup.png";
	this.vy = 150;
	this.ativo = true;
}

PowerUp.prototype.desenhar = function(){
	ctx.drawImage(this.sprite, this.x, this.y)
}

PowerUp.prototype.mover = function(){
	this.y += this.vy*dt;
}

PowerUp.prototype.restricoes = function(){
	if(this.y > limitBottom){
		this.invalido = true;
	}
}

