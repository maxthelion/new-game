var selectedUnit;
var Grid = function(canvas_id, grid) {
	var self = this;
	var canvas = document.getElementById(canvas_id)
	var ctx = canvas.getContext('2d'); 
	var width = grid[0].length;
	var height = grid.length;
	var gridXInterval = canvas.width / width;
	var gridYInterval = canvas.height / height;
	var gridHeight = canvas.height;
	var gridWidth = canvas.width;
	var highlight;
	
	var draw = function(){
		ctx.clearRect(0,0,gridWidth, gridHeight);
		ctx.fillStyle = '#e3d19b'
		ctx.fillRect(0,0,gridWidth, gridHeight);
		if (endSelectionX && endSelectionY){
			ctx.fillStyle = 'rgba(0, 255, 0, 0.5)'
			ctx.fillRect(endSelectionX-10,endSelectionY-10,20, 20);
		}
		// draw the selection marquee
		if(
			startSelectionX &&
			startSelectionY &&
			endSelectionX &&
			endSelectionY
			){
			ctx.fillStyle = 'yellow'
			ctx.fillRect(startSelectionX,endSelectionY,
				endSelectionX - startSelectionX, 
				startSelectionY - endSelectionY);	
		}
		if (highlight){
			ctx.fillStyle = 'cyan'
			ctx.fillRect(
				highlight.pX * gridXInterval,
				highlight.pY * gridYInterval,
				gridXInterval,
				gridYInterval
			);
		}
		// draw soldiers
		for(var i =0; i < spritesArray.length; i++){
			u = spritesArray[i]
			if (u.selected) {
				ctx.fillStyle = 'yellow'
				ctx.fillRect(u.cX - 20,u.cY - 20,40, 40);
			}
			if (u.firing){
				ctx.fillStyle = 'orange'
				ctx.fillRect(u.cX - 20,u.cY - 20,40, 40);
			}
			drawHealth(u.cX, u.cY - 20, 30, 5, u.healthPercent)
			drawSprite(u.spriteX, u.cX, u.cY)
		}
	};
	
	// called from the setinterval
	this.public_draw = function(){
		draw();
	}

	
	var getNewCoords = function(x1, y1, x2, y2, radius){
		var dx = x2 - x1;
		var dy = y2 - y1;
		var theta = Math.atan2(dy, dx);
		return [
			x1 + (Math.cos(theta) * radius),
			y1 + (Math.sin(theta) * radius)
		]
	}
	
	var pixelC = function(p){
		return p * gridXInterval + (gridXInterval / 2);
	}
	
	var drawHealth = function(x,y,w,h,health){
		//background
		ctx.fillStyle = 'red'
		ctx.fillRect(x-w/2, y, w, h)
		ctx.fillStyle = 'rgb(0,255, 0)'
		ctx.fillRect(x-w/2, y, w*health, h)
	}
  
	var drawSprite = function(sx, x, y){
		cw = 20
		ch = 20
		ctx.drawImage(sprites_img, sx, 0, cw, ch, x - cw/2, y - cw/2, cw, ch)
	}
	
	var cellPointFromXY = function(x, y){
		return {
			cX: x,
			cY: y,
			pX: Math.floor(x/gridXInterval),
			pY: Math.floor(y/gridYInterval)
		}
	};
	
	this.pointCenterXY = function(x, y){
		return [ pixelC(x), pixelC(y) ]
	};
	
	this.cellFromPosition = function(position){
		var xIndex = MF( position[0] / gridXInterval )
		var yIndex = MF( position[1] / gridYInterval )
		return [xIndex, yIndex];
	};
	
	var startSelectionX,
	    startSelectionY,
		endSelectionX,
		endSelectionY
		
	$(canvas).mousedown(function(evt){
		startSelectionX = evt.offsetX
		startSelectionY = evt.offsetY
		selecting = true
	})
	
	
	$(canvas).mousemove(function(evt){
		endSelectionX = evt.offsetX
		endSelectionY = evt.offsetY
		highlight = cellPointFromXY(evt.offsetX, evt.offsetY)
		selecting = true
	})
	
	
	$(canvas).mouseup(function(evt){
		// var xIndex = MF( evt.offsetX/gridXInterval )
		// var yIndex = MF( evt.offsetY/gridYInterval )
		var x = evt.offsetX
		var y = evt.offsetY
		if ( currentAction ){
			executeCurrentAction(x, y)
		} else {
			// check if there is a soldier here already
			if(startSelectionX ==  x && startSelectionY == y){
				soldiers = checkSoldierAtLocation(x,y)
			} else {
				soldiers = checkSoldiersWithinSelection(startSelectionX, startSelectionY, x,y)
			}
			setSelectedUnits(soldiers)
		}
		draw();
		startSelectionX = null
		startSelectionY = null
		endSelectionX = null
		endSelectionY = null
		selecting = false;
	});

};
