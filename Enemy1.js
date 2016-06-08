/*
	Enemy1 class
	art: 
	-http://opengameart.org/content/spaceship-set-32x32px
*/	

function Enemy1(){
	this.x = ((Math.floor(Math.random() * 568)+1));
	this.y = -32 - ((Math.floor(Math.random() * 100)+1));
	this.invalido = false;
	this.col = 0;
	this.raio = 16
	this.sprite = new Image();
	this.sprite.src = "png/enemy_1.png";
	this.ativo = true;
	this.invalido = false;
	this.vx = 0;	
	if(this.x < player.x){
		this.vx = 100;
	}
	else{
		this.vx = -100;
	}
	
	this.vy = 350;
	this.bullets = [];
}


Enemy1.prototype.desenhar = function(){
	ctx.drawImage(this.sprite,
				Math.floor(this.col)*32, 0, 32, 32,
				this.x, this.y, 32, 32);
}

Enemy1.prototype.mover = function(){
	this.x += this.vx*dt;
	this.y += this.vy*dt;
}

Enemy1.prototype.restricoes = function(){
	if(this.y > limitBottom){
		this.invalido = true;
	}
}

Enemy1.prototype.damage = function(){
	this.invalido = true;
}

