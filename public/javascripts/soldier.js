function Soldier(x, y) {
	var self = this;
	this.cX = x;
	this.cY = y;
	this.spriteType = Soldier
	var myPath;
	var pathIndex = 0;
	var currentPoint;
	var nextPoint;
	var target;
	var agro = false
	this.actions = [ 'move', 'stop', 'attack' ]
	var range = 40;
	this.firing = false
	this.healthPercent = 1
	this.dead = false
	
	this.enterFrame = function(){
		currentSpeed = self.speed;
		if(target){
			if ( distance(self,target) < range && agro){
				if(!target.dead){
					self.firing = true
					target.takeHit(1)
				} else {
					self.firing = false
					agro = false
					target = null
				}				
			} else {
				getNewPos()
			}
		}

		// if (nextPoint == undefined){
		// 	self.destC();
		// 	return false
		// } else if ( cell[0] == nextPoint[0] && cell[1] == nextPoint[1]) {
		// 	pathIndex++
		// 	if (pathIndex < myPath.length){
		// 		currentPoint = myPath[pathIndex];
		// 		nextPoint		= myPath[pathIndex + 1];
		// 		if (nextPoint)
		// 			nextPosition = mygrid.pointCenterXY(nextPoint[0], nextPoint[1]);
		// 	} 
		// }
	}
	
	this.takeHit = function(damage){
		if(self.currentHealth < 1){
			self.dead = true
			removeSprite('s', self.id);
			addCorpse(self.cX, self.cY);
		} else {
			self.currentHealth = (self.currentHealth != undefined) ? self.currentHealth : self.health
			self.currentHealth -= damage
			self.healthPercent = self.currentHealth / self.health
			self.hitInFrame = frameNum
		}
	}
	
	this.doCurrentAction = function(action, x, y){
		if (action == 'move') {			
			target = {
				cX: x,
				cY: y
			}
		} else if(action == 'attack'){
			var potentialTargets = checkSoldierAtLocation(x, y);
			if (potentialTargets.length > 0){
				target = potentialTargets[0]
				agro = true
			} else {
				target = {
					cX: x,
					cY: y
				}
			}
		}
	}
	
	this.stop = function(){
		target = null
	}
	
	// var getNewPos = function(){
  //     if(nextPoint){
  //    xSpeed = (nextPoint[0] == currentPoint[0]) ? currentSpeed : currentSpeed * (nextPoint[0] - currentPoint[0])
  //   if (Math.abs(nextPosition[0] - self.cX) >= currentSpeed){
  //     self.cX += xSpeed;
  //   } else {
  //     self.cX = nextPosition[0];
  //   }
  //    ySpeed = (nextPoint[1] == currentPoint[1]) ? currentSpeed : currentSpeed * (nextPoint[1] - currentPoint[1])
  //   if (Math.abs(nextPosition[1] - self.cY) >= currentSpeed){
  //     self.cY += ySpeed;
  //   } else {
  //     self.cY = nextPosition[1];
  //   }
  //  }
	// }
	
	var distance = function(p1,p2){
	 var dist,dx,dy;
	 dx = p2.cX-p1.cX;
	 dy = p2.cY-p1.cY;
	 dist = Math.sqrt(dx*dx + dy*dy);
	 return dist
	}
	
	var getNewPos = function(){
		if (target){
			if(distance(self,target) < currentSpeed){
				self.cX = target.cX
				self.cY = target.cY
			}else{
				if (target.cX > self.cX){
					self.cX += currentSpeed;
				} else {
					self.cX -= currentSpeed;
				}
				if (target.cY > self.cY){
					self.cY += currentSpeed;
				} else {
					self.cY -= currentSpeed;
				}
			}
		}
	}
	
	// this.regeneratePath = function(){
	// 	var newPath = AStar(grid, currentPoint, endPoint, "Manhattan");
	// 	if (newPath.length == 0){
	// 		return false;
	// 	} else {
	// 		pathIndex = 0;
	// 		myPath = newPath;
	// 		return true;			
	// 	};
	// }

	// var initialise = function(){
	// 	myPath = AStar(grid, startPoint, endPoint, "Manhattan");
	// 	currentPoint = myPath[pathIndex];
	// 	nextPoint = myPath[pathIndex + 1];
	// }
	// 
	// initialise();
}