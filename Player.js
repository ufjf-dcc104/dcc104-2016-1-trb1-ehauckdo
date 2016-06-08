/*
	Player class
	art: 
	-http://opengameart.org/content/spaceship-set-32x32px
*/	

function Player(){
	this.initialX = 300;
	this.initialY = 700;
	this.raio = 16
	this.sprite = new Image();
	this.sprite.src = "png/player.png";
	this.col = 0;
	this.colLimit = 2;
	this.vidas = 3;
	this.bullets = [];
	this.powerup = false;
	this.v = 200;
	this.left = 0;
	this.right = 0;
	this.up = 0;
	this.down = 0;
	this.restart();
}

Player.prototype.restart = function(){
	this.x = this.initialX;
	this.y = this.initialY;
	this.vx = 0;
	this.vy = 0;
	this.hit = 0;
	this.cooldown = 0;
	this.invulneravel = 1;
	this.ativo = true;
	var that = this;
	setTimeout(function(){that.invulneravel = 0}, 2400);
}

Player.prototype.desenhar = function(){
	if(this.ativo == true ){

		for(var i in this.bullets){
			this.bullets[i].desenhar();
		}

		ctx.drawImage(this.sprite,
					Math.floor(this.col)*32, this.invulneravel*32, 32, 32,
					this.x, this.y, 32, 32);

		this.col += 5*dt;
		if(this.col >= this.colLimit)
			this.col  = 0;

	}

	for(var i = 0; i < this.vidas; i++){
		ctx.drawImage(this.sprite,
				0, 0, 32, 32,
				i*32, 0, 32, 32);
	}	
}

Player.prototype.mover = function(){
	if(this.ativo == false)
		return

	this.x += (this.left*this.v+this.right*this.v)*dt;
	this.y += (this.up*this.v+this.down*this.v)*dt;

	for(var i in this.bullets){
		this.bullets[i].mover();
	}
}

Player.prototype.restricoes = function(){
	if(this.ativo == false)
		return

	if(this.x < limitLeft){
		this.x = limitLeft;
		this.vx = 0;
	}
	if(this.x > limitRight-32){
		this.x = limitRight-32;
		this.vx = 0;
	}
	if(this.y > limitBottom-32){
		this.y = limitBottom-32;
		this.vy = 0;
	}
	if(this.y < limitTop){
		this.y = limitTop;
		this.vy = 0;
	}

	this.cooldown -= 500*dt;

	for(var i in this.bullets){
		this.bullets[i].restricoes();
		if(this.bullets[i].invalido == true){
			this.bullets.splice(i, 1);		
		}					
	}


}

Player.prototype.damage = function(){
	if(this.invulneravel == true)
		return

	var that = this;
	this.hit = 3;
	this.vidas -= 1;
	this.x = 900;
	this.y = 500;
	this.ativo = false;
	this.powerup = false;
	for(var i = this.bullets.length; i >= 0; i--){
		this.bullets.splice(i, 1);
	}
	setTimeout(function() {that.restart();}, 1000);
	
}

Player.prototype.colisao = function(alvo){
	if(this.ativo == false || alvo.ativo == false || this.invulneravel == true)
		if(alvo instanceof PowerUp == false)
			return false

	var distancia = Math.sqrt(Math.pow(alvo.x - this.x, 2)+Math.pow(alvo.y - this.y, 2));
	return(distancia<(alvo.raio+this.raio))
}

Player.prototype.atirar = function(){

	if(this.ativo == false || this.cooldown > 0)
		return
	if(this.powerup == false)
		this.bullets.push(new Bullet(this.x, this.y, 1));
	else{
		this.bullets.push(new Bullet(this.x, this.y, 1, -80));
		this.bullets.push(new Bullet(this.x, this.y, 1));
		this.bullets.push(new Bullet(this.x, this.y, 1, 80));
	}
	this.cooldown = 100;
}

Player.prototype.objeto = function(object){
	this.powerup = true;
}