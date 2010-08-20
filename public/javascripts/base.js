var Base = function(x, y){
	this.cX = x;
	this.cY = y;
	this.actions = [ 'trainSoldier' ];
	
	this.doCurrentAction = function(action, x, y){
		if (action == 'trainSoldier') {			
			addSoldier(x, y)
		}
	}
}