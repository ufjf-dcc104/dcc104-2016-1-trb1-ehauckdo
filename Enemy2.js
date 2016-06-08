/*
	Enemy2 class
	art: 
	-http://opengameart.org/content/spaceship-set-32x32px
*/	


function Enemy2(x , y){
	this.x = ((Math.floor(Math.random() * 584)+1));
	this.y =  -34 ;
	this.ativo = true;
	this.invalido = false;
	this.col = 0;
	this.bullets = [];
	this.raio = 16
	this.sprite = new Image();
	this.sprite.src = "png/enemy_2.png";
	this.vx = 0;
	this.vy = 180;
	this.atirarCooldown = 0;
}


Enemy2.prototype.desenhar = function(){

	if(this.ativo){
		ctx.drawImage(this.sprite,
			Math.floor(this.col)*32, 0, 32, 32,
			this.x, this.y, 32, 32);
	}

	for(var i in this.bullets){
		this.bullets[i].desenhar();
	}

}

Enemy2.prototype.mover = function(){
	if(this.ativo){
		this.x += this.vx*dt;
		this.y += this.vy*dt;
	}

	for(var i in this.bullets){
		this.bullets[i].mover();
	}
}

Enemy2.prototype.restricoes = function(){
	
	for(var i in this.bullets){
		this.bullets[i].restricoes();
		if(this.bullets[i].invalido == true){
			this.bullets.splice(i, 1);		
		}					
	}	

	if(this.y > limitBottom || (this.ativo == false && this.bullets.length == 0)){
		this.invalido = true;
		return;
	}

	this.atirar();
		
}

Enemy2.prototype.damage = function(){
	this.ativo = false;
}


Enemy2.prototype.atirar = function(){
	if(this.ativo == false) 
		return;	
	this.atirarCooldown -= 100*dt;
	if(this.atirarCooldown <= 0){
		this.atirarCooldown = 100;
		this.bullets.push(new Bullet(this.x, this.y, 2));
	}
}
