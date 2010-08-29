var Base = function(x, y){
	var self = this
	this.cX = x;
	this.cY = y;
	this.actions = [ 
		{ name: 'trainSoldier', requiresTarget: false }
	];
	this.healthPercent = 1;
	
	this.trainSoldier = function(){
		
		addSoldier(self.cX + 30, self.cY)
	}
}