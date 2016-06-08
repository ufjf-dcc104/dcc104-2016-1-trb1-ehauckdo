/*
	Spawner class

*/	


function Spawner(){
	this.state = 0;
}

Spawner.prototype.spawn = function(){
	var that = this;
	switch(this.state){
		case 0:
			for(var i = 0; i < 30; i++){
				setTimeout(function(){that.wave1();}, i*200);
			}
			this.state += 1;
			break;
		case 1:
			setTimeout(function(){objects.push(new PowerUp());}, 500);
			for(var i = 0; i < 30; i++){
				setTimeout(function(){that.wave2();}, i*800);
			}
			this.state += 1;
			break;
		case 2:
			this.boss();
			this.state = 0;
			break;
	}
}

Spawner.prototype.wave1 = function(){
	enemies.push(new Enemy1());
}

Spawner.prototype.wave2 = function(){
	enemies.push(new Enemy1());
	enemies.push(new Enemy2());
}

Spawner.prototype.boss = function(){
	var that = this;
	enemies.push(new Boss());
}