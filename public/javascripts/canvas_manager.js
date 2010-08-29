var selectedUnit;
var CanvasManager = function(canvas_id, grid) {
	var self = this;
	var canvas = document.getElementById(canvas_id)
	var ctx = canvas.getContext('2d'); 
	var highlight;
	var gridHeight = canvas.height;
	var gridWidth = canvas.width;
	
	var draw = function(){
		ctx.clearRect(0,0,gridWidth, gridHeight);
		ctx.fillStyle = '#e3d19b'
		ctx.fillRect(0,0,gridWidth, gridHeight);
		if (endSelectionX && endSelectionY){
			ctx.fillStyle = 'rgba(0, 255, 0, 0.5)'
			ctx.fillRect(
				endSelectionX-(myGridManager.cellWidth /2),
				endSelectionY-(myGridManager.cellWidth /2),
				myGridManager.cellWidth, 
				myGridManager.cellHeight
			);
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
				highlight.pX * myGridManager.cellWidth,
				highlight.pY * myGridManager.cellHeight,
				myGridManager.cellWidth,
				myGridManager.cellHeight
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
		drawLines();
	};
	
	var drawLines = function(){
		ctx.beginPath()
		for (var i=0; i < grid[0].length; i++) {
			ctx.moveTo( i * myGridManager.cellWidth, 0)
			ctx.lineTo( i * myGridManager.cellWidth, gridHeight)
		};
		
		for (var i=0; i < grid.length; i++) {
			ctx.moveTo( 0, i * myGridManager.cellWidth)
			ctx.lineTo( gridWidth, i * myGridManager.cellWidth)
		};
		ctx.stroke()
	}
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
		return p * cellWidth + (cellWidth / 2);
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
		highlight = myGridManager.targetAtPos(evt.offsetX, evt.offsetY)
		selecting = true
	})
	
	
	$(canvas).mouseup(function(evt){
		// var xIndex = MF( evt.offsetX/cellWidth )
		// var yIndex = MF( evt.offsetY/cellHeight )
		var x = evt.offsetX
		var y = evt.offsetY
		if ( currentAction ){
			target = myGridManager.targetAtPos(x,y)
			executeCurrentAction(target)
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
