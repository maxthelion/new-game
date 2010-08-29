function GridGenerator(width, height){
	var	result = new Array(height);
	for(var	j, i = 0; i < height; i++) {
		result[i] = new Array(width);
		for(j = 0; j < width; j++)
			result[i][j] = 0
	};
	return result;
};

var currentSoldiers = [];
var frameNum = 0;
var currentAction;

var frameFunction = function(){
	frameNum ++;
	spritesProgress();
	mycanvas.public_draw();
}

sprites_img = new Image(); 

var start = function(){
	playing = true;
	globalInterval = setInterval(frameFunction, 60);
	addSoldier(50, 100);
	addBase(20, 100)
}

$().ready(function(){	
	grid = GridGenerator(40, 10);		
	myGridManager = new GridManager(grid, 800, 200);
	mycanvas = new CanvasManager('canvas', grid);
	
	sprites_img.src = 'soldier.png';
	sprites_img.onload = function(){
		mycanvas.public_draw();
		start()
	}
});

var addBase = function(x, y){
	var b = new Base(x, y);
	attrs = {
		 name: 'base',
		 health: 30,
		 type: Base,
		 spriteX: 160
	}
	for (i in attrs) {
		b[i] = attrs[i]
	};
	addSprite('b', b)
}

var addSoldier = function(x, y){
	var s = new Soldier(x, y);
	attrs = {
		 name: 'lightInfantry',
		 speed: 2,
		 health: 30,
		 bounty: 1,
		 type: Soldier,
		 spriteX: 0
	}
	for (i in attrs) {
		s[i] = attrs[i]
	};
	addSprite('s', s)
}
var checkSoldiersWithinSelection = function(x1, y1, x, y){
	var soldiers = []
	for (var i=0; i < spritesArray.length; i++) {
		u = spritesArray[i]
		if ( u.cX > Math.min(x1, x) && u.cX < Math.max(x1, x) &&
		 	u.cY > Math.min(y1, y) && u.cY < Math.max(y1, y)
		){
			soldiers.push(u)
		}
	};
	return soldiers;
}

var checkSoldierAtLocation = function(x, y){
	var soldiers = []
	for (var i=0; i < spritesArray.length; i++) {
		u = spritesArray[i]
		if ( Math.abs(u.cX - x) < 20 && Math.abs(u.cY - y) < 20 ){
			soldiers.push(u)
		}
	};
	return soldiers;
}

setSelectedUnits = function(soldiers){
	$('#units').empty()
	for(i in currentSoldiers){
		currentSoldiers[i].selected = false
	}
	currentSoldiers = [];
	showActionsForSoldier(soldiers[0])
	for (i in soldiers){
		soldiers[i].selected = true
		currentSoldiers.push(soldiers[i])
		$('#units').append('<p> soldier '+soldiers[i].id+'</p>').data('foo', soldiers[i]).click(function(){	
			setSelectedUnits([$(this).data('foo')]);
		});
	}
}
showActionsForSoldier = function(s){
	$('#tools').empty()
	if (s){
		for (i in s.actions){
			var button = $('<a href="#"></a>').text(s.actions[i])
			button.data('foo', s.actions[i])
			button.click(function(){
				setCurrentAction($(this).data('foo'))
				$(this).addClass('selected');
			})
			$('#tools').append(button)
		}
	}
}
executeCurrentAction = function(x, y){
	for (i in currentSoldiers){
		currentSoldiers[i].doCurrentAction(currentAction, x,y)
	}
	currentAction = null
	$('.selected').removeClass('selected');
}

var setCurrentAction = function(a){
	if (a == "stop"){
		for (i in currentSoldiers){
			currentSoldiers[i].stop()
		}
	} else if (a == 'trainSoldier'){
		for (i in currentSoldiers){
			currentSoldiers[i].trainSoldier()
		}
	} else {
		currentAction = a;
	}
}
var spritesProgress = function(){
	// aim the turrets and fire if possible
	for(var i =0; i < spritesArray.length; i++){
		if (spritesArray[i].enterFrame){ 
			spritesArray[i].enterFrame();
		}
	}
}
