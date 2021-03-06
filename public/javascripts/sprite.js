var id = 0;
var sprites = {}
var spritesArray = []
sprites['s'] = {} // terrain
sprites['b'] = {} // buildings
sprites['bits'] = {} //bits of bodies

var redoSprites = function(){
	spritesArray = []
	for (i in sprites){
		for(j in sprites[i]){
			spritesArray.push(sprites[i][j])
		}
	}
}

var removeSprite = function(key, id){
	delete sprites[key][id];
	redoSprites();
}

var addSprite = function(k, sprite) {
	id++;
	sprites[k][id] = sprite;
	redoSprites();
	sprite.id = id;
}