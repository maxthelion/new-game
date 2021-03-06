function Helicopter(startPoint, endPoint, grid, template, id) {
	var self = this;
	var currentPosition = mygrid.pointCenterXY(startPoint[0], startPoint[1])
	this.cX = currentPosition[0];
	this.cY = currentPosition[1];
	var nextPosition = mygrid.pointCenterXY(endPoint[0], endPoint[1])
	var currentSpeed = template['speed'];
	var initialHealth = template['health'];
	this.health = initialHealth;
	this.healthpercent = 1;
	this.bounty = template['bounty'];
	this.sprite = template['sprite']
	this.id = id;
	
	this.enterFrame = function(){
    getNewPos()
		var cell = mygrid.cellFromPosition( [self.cX, self.cY] );
		if ( cell[0] == endPoint[0] && cell[1] == endPoint[1]) {
			self.destC()
		}
	}
	
	var getNewPos = function(){
	  // kludge
		if (nextPosition[0] > self.cX){
			self.cX += currentSpeed;
		} else {
			self.cX -= currentSpeed;
		}
		if (nextPosition[1] > self.cY){
			self.cY += currentSpeed;
		} else {
			self.cY -= currentSpeed;
		}
	}
	
	this.takeBullet = function(damage) {
		self.health -= damage;
		self.healthpercent = self.health / initialHealth; 
		if ( self.health <= 0 ){
			self.dC();
		}
	}
	
	this.destC = function(){
		addExplosion(self.cX, self.cY, 1, frameNum, 0);
		mSM.removeSoldier(self);
		loseLife();
	}
	
	this.dC = function(){
	  incrementKills(self.bounty);
		mSM.removeSoldier(self);
	}
}