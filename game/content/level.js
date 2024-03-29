var colors = null;
var allcolors = null;
var isMove = false;
var moveReady = false;
var kills = 0;
var games_play_count = 0;
var mapid = 0;
var map = null;

function spawnEnable(advend){

  if(window['maps'] == null){
    window.maps = [
      new Map(Ring),
      new Map(custom_part_0,custom_part_1),
      new Map(custom_part_2),
      new Map(custom_part_3, custom_part_4)
    ];
  }

  games_play_count++;

  if(games_play_count == 2){
    localStorage['ms'] = true;
    $('#mapselector').show();
  }

  if(menumap < 0){
    map = maps[mapid];
    mapid++;
    if(mapid >= maps.length) mapid = 0;
  } else {
    map = maps[menumap];
  }

  allcolors = getTexs('f/',9);
  colors = getTexs('f/',4);
  kills = 0;
  scoremul = 1;
  $('#levelup').hide();

  map.Init(advend);
  new Bullet();

  if(advend){
    $('#air').show(100);
    isMove = false;
  }
  else{
    if(gp != null) gp.gameplayStart();
    isMove = true;
  }
}

function AddScore(_score){
  kills++;

	score = parseInt(score + (_score * scoremul));
	scoreui.text(score);

  if(kills == 30 && colors.length != allcolors.length){
    colors.push(allcolors[colors.length]);
    kills = 0;
    scoremul++;

    $('#levelup').show(500);
    setTimeout(function(){
      $('#levelup').hide(500);
    }, 4000);
  }
}

function spawnBall(map_part){
  let col = 0;
  do{
    col = getrand(0,colors.length);
  }
  while(col == map_part.lastcol);
  const b = new Ball(map_part, colors[col]);
  dim.addGameObject(b);
  map_part.lastcol = col;
  return b;
}

function drawBall(data){
  const radius = Ball.radius;
  g.drawImage(data, -radius, -radius, radius * 2, radius * 2);
}
