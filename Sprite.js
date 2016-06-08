function Sprite(){
	this.x = 110;
	this.y = 115;
	this.vx = 0;
	this.ax = 0;
	this.vy = 0;
	this.ay = 0;
	this.raio = 15;
	this.cor = "ligthgray"
}

Sprite.prototype.mover = function (){
	this.vx = this.vx + this.ax*dt;
	this.x = this.x + this.vx*dt;
	this.vy = this.vy + this.ay*dt;
	this.y = this.y + this.vy*dt;
}

Sprite.prototype.desenhar = function (){
	ctx.fillStyle = this.cor;
	ctx.strokeStyle = "rgb(150, 50, 50)";
	ctx.lineWidth = 3;
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.raio, 0, 2*Math.PI);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
}

Sprite.prototype.restricoes = function(){
	if(this.x<15){
		this.x = 15;
		this.vx = 0;
		this.ax = 0;
	}
	if(this.x>tela.width-15) {
		this.x=tela.width-15;
		this.vx = 0;
		this.ax = 0;
	}
	if(this.y<15){
		this.y = 15;
		this.vy = 0;
		this.ay = 0;
	}
	if(this.y>tela.height-15) {
		this.y=tela.height-15;
		this.vy = 0;
		this.ay = 0;
	}
}

Sprite.prototype.colidiuComCircular = function(alvo){
	var distancia = Math.sqrt(Math.pow(alvo.x - this.x, 2)+Math.pow(alvo.y - this.y, 2));
	return(distancia<(alvo.raio+this.raio))
}