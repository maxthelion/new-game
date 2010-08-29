var GridManager = function(grid, canvasWidth, canvasHeight){
	var self = this;
	var width = grid[0].length;
	var height = grid.length;
	
	this.cellWidth = canvasWidth / width;
	this.cellHeight = canvasHeight / height;

	this.pointCenterXY = function(x, y){
		return [ pixelC(x), pixelC(y) ]
	};
	
	this.cellFromPosition = function(position){
		var xIndex = MF( position[0] / cellWidth )
		var yIndex = MF( position[1] / cellHeight )
		return [xIndex, yIndex];
	};
	
	this.targetAtPos = function(x, y){
		// if there is something here
		return cellPointFromXY(x, y);
	};
	
	var cellPointFromXY = function(x, y){
		px = Math.floor(x/self.cellWidth)
		py = Math.floor(y/self.cellHeight)
		return {
			cX: self.cellWidth * px + (	self.cellWidth / 2) ,
			cY: self.cellHeight * py + (	self.cellHeight / 2),
			pX: px,
			pY: py
		}
	};
}