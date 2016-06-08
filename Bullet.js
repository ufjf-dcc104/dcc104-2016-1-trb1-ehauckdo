/*
	Bullet class
	TODO:
	-find function to make bullet come from exactly middle of ship
	(distancia de x a player.x+raio igual a x' ate player.x+raio)
	art:
	-bullet 1: Ripped from Touhou Subterranean Animism 
	-bullet 2: http://opengameart.org/content/bullet-collection-2-m484-games
	-bullet 3: Ripped from Touhou Subterranean Animism 
*/	

function Bullet(x, y, type, vx, vy){
	this.x = x;
	this.y = y;
	this.invalido = false;
	this.load(type, vx, vy);
}

Bullet.prototype.load = function(type, vx, vy){
	this.sprite = new Image();
	this.col = 0;
	if(type == 1){
		this.sprite.src = "png/bullet2.png";
		this.raio = 5;
		this.w = 10;
		this.h = 10;
		this.x += 8;
		this.vx = (vx)?vx:0;
		this.vy = (vy)?vy:-500;
		this.colLimit = 1;
	}
	else if(type ==2){
		this.sprite.src = "png/bullet1.png";
		this.raio = 8;
		this.w = 16;
		this.h = 16;
		this.x += 8;
		this.vx = (vx)?vx:0;
		this.vy = (vy)?vy:500;
		this.colLimit = 1;
	}
	else{
		this.sprite.src = "png/bullet3.png";
		this.w = 24;
		this.h = 24;
		this.raio = 8;
		this.x += 12;
		vxx = (Math.floor(Math.random() * 150))-150;
		if(vx == undefined)
			this.vx = vxx;
		else
			this.vx = vx;
		if(vy == undefined)
			this.vy = 200;
		else
			this.vy = vy;
		this.colLimit = 2;
	}
}

Bullet.prototype.desenhar = function(){

	ctx.drawImage(this.sprite,
				Math.floor(this.col)*this.w, 0, this.w, this.h,
				this.x, this.y, this.w, this.h);
	
	this.col += 3*dt;
	if(this.col > this.colLimit)
		this.col = 0;

}

Bullet.prototype.mover = function(){

	this.y += this.vy*dt;
	this.x += this.vx*dt;
}

Bullet.prototype.restricoes = function(){
	if(this.y+this.h < limitTop || this.y > limitBottom || this.x < limitLeft || this.x > limitRight){
		this.invalido = true;
	}
}

Bullet.prototype.colisao = function(alvo){
	var distancia = Math.sqrt(Math.pow(alvo.x+(alvo.raio/2) - (this.x+(this.raio/2)), 2)+Math.pow(alvo.y+(alvo.raio/2) - (this.y+(this.raio/2)), 2));
	return(distancia<(alvo.raio+this.raio))
}