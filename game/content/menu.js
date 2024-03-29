function GoMenu(){
  if(isMobile) ysdk.adv.showBannerAdv();
  $('#scoreblock').hide();
  $('#levelup').hide();
  AddBalance(score);

  const interval = setInterval(function(){
    camera.y += 60;
    if(camera.y >= 1600){
        camera.y = 1600;
        clearInterval(interval);
        MenuReady();
    }
  }, 1000/60);

  function MenuReady(){
    $('#deadscr').show();
    $('.overlay').show();
  }
}

var menumap = -1;
var menumaps = [
  -1,0,1,2,3
]
var menumap_pointer = 0;

function leftmap(){
  menumap_pointer--;
  if(menumap_pointer < 0){
    menumap_pointer = menumaps.length - 1;
  }
  menumap = menumaps[menumap_pointer];
  localStorage['selectmap'] = menumap_pointer;
  mapOnChanged();
}

function rightmap(){
  menumap_pointer++;
  if(menumap_pointer >= menumaps.length){
    menumap_pointer = 0;
  }
  menumap = menumaps[menumap_pointer];
  localStorage['selectmap'] = menumap_pointer;
  mapOnChanged();
}

function mapOnChanged() {
  $('#ms_info').text(menumap >= 0 ? ('#'+(menumap + 1).toString()) : (lang == 'ru' ? "случайная" : "random" ))
}

function GoGame(){
  const interval = setInterval(function(){
    camera.y -= 60;
    if(camera.y < 1){
        camera.y = 0;
        clearInterval(interval);
        $('#scoreblock').show();
        $('#deadscr').hide();
    }
  }, 1000/60);
}

var money = 0;
var baloc_hendlers = [];
function InitMenu(){
  if(localStorage['money'] != null){
    money = parseInt(localStorage['money']);
  }
  $('#balance').text(money);

  if(localStorage['selectmap'] != null){
    menumap_pointer = parseInt(localStorage['selectmap']);
    menumap = menumaps[menumap_pointer];
    mapOnChanged();
  }

  if(localStorage['ms'] != null){
    $('#mapselector').show();
  }

  $('#minigame').prepend(getMinigame());

  for(let i = 0; i < baloc_hendlers.length; i++){
    baloc_hendlers[i]();
  }
}

function AddBalance(add){
  money = parseInt(money + add);
  $('#balance').text(money);
  localStorage['money'] = money;

  for(let i = 0; i < baloc_hendlers.length; i++){
    baloc_hendlers[i]();
  }
}
