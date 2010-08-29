var GridManager = function(grid, canvasWidth, canvasHeight){
	var width = grid[0].length;
	var height = grid.length;
	
	
	this.gridXInterval = canvasWidth / width;
	this.gridYInterval = canvasHeight / height;

	
}