/*
	Boss class
	art: 
	-http://opengameart.org/content/spaceship-set-32x32px
*/	


function Boss(){
	this.initialX = limitRight/2 - 50;
	this.initialY = -150;
	
	this.w = 100;
	this.h = 100
	this.raio = 50;

	this.restart();
	this.bullets = [];
	
}

Boss.prototype.restart = function(){
	this.sprite = new Image();
	this.sprite.src = "png/boss.png";
	this.x = this.initialX;
	this.y = this.initialY;
	this.cx = this.x + this.raio;
	this.cy = this.y + this.raio;
	this.ativo = true;
	this.invalido = false;
	this.counter = 0;
	this.col = 0;
	this.colLimit = 4;
	this.vx = 0;
	this.vy = 100;
	this.life = 50;
	this.atirarCooldown1 = 0;
	this.atirarCooldown2 = 0;
}

Boss.prototype.desenhar = function(){

	if(this.ativo == true){
		ctx.drawImage(this.sprite,
				Math.floor(this.col)*this.w, 0, this.w, this.h,
				this.x, this.y, this.w, this.h);

		this.col += 3*dt;
			if(this.col >= this.colLimit)
				this.col  = 0;
	}

	for(var i in this.bullets){
		this.bullets[i].desenhar();
	}

}

Boss.prototype.mover = function(){
	if(this.ativo == true){
		this.x += this.vx*dt;
		this.y += this.vy*dt;
		this.cx = this.x + this.raio;
		this.cy = this.y + this.raio;
	}

	for(var i in this.bullets){
		this.bullets[i].mover();
	}
}

Boss.prototype.restricoes = function(){
	if(this.ativo){
		if(this.y > 100){
			this.vy = 0;
			this.vx = 100;
			this.y = 100;
		}
		if(this.x > limitRight-32-this.w){
			this.vx = -100;
			this.x = limitRight-32-this.w;
		}
		if(this.x < limitLeft+32){
			this.vx = 100;
			this.x = limitLeft+32;
		}
		
		this.atirar1();
		this.atirar2();
	}
	else if (this.bullets.length == 0){
		this.invalido = true;
		return;
	}

	for(var i in this.bullets){
		this.bullets[i].restricoes();
		if(this.bullets[i].invalido == true){
			this.bullets.splice(i, 1);		
		}					
	}	

}

Boss.prototype.atirar1 = function(){
	this.atirarCooldown1 -= 100*dt;
	if(this.atirarCooldown1 <= 0){
		this.atirarCooldown1 = 100;
	
		v = 350;
		d = Math.sqrt(Math.pow(this.x-player.x,2)+Math.pow(this.y-player.y,2));
		vx = -v*((this.x-player.x)/d);
		vy = -v*((this.y-player.y)/d);

		this.bullets.push(new Bullet(this.cx, this.cy, 2, vx, vy));
	}
}

Boss.prototype.atirar2 = function(){
	if(this.ativo == false) 
		return;	
	this.atirarCooldown2 -= 40*dt;
	if(this.atirarCooldown2 <= 0){
		this.atirarCooldown2 = 100;
		maxspeed = 200;
		vx = -200;
		vy = 0;
		x = this.x;
		y = this.y;
		for(var i = 0; i < 20; i++){
			vx = 200*Math.cos(i*2*Math.PI/20);
			vy = 200*Math.sin(i*2*Math.PI/20);
			this.bullets.push(new Bullet(this.cx, this.cy, 3, vx, vy));
		}
	}
	
}


Boss.prototype.damage = function(){
	this.life -= 1;
	if(this.life <= 0){
		this.ativo = false;
		clearInterval(this.id1);
		clearInterval(this.id2);
	}
}