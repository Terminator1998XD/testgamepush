const lbc = {};
var uilead = [];
var curlead = 0;

function getLeaderBord(arrid, db, capt, isUpgrade, errorHendler = null){

  const lb_data = $('<div class="leaderbord_data_rows">');

  lb.getLeaderboardEntries(db).then(result => {
    lbc[db] = result;
    viewData(result);
  }).catch(err => {
    if(errorHendler != null && lbc[db] == null){
       errorHendler();
     }
     viewData(lbc[db]);
  });

  function viewData(result){
    const players = result.entries;

    if(players.length == 0){
      lb_data.html(lang == 'ru' ? "<p><center>Пусто</center></p>" : "<p><center>Empty</center></p>")
    }

    for(let i = 0; i < players.length; i++){
      const p = players[i];

      const avatar = p.player.getAvatarSrc();
      const nick = p.player.publicName;
      const score = p.score;

      lb_data.append(getRow([
        getColumn('<span>№'+parseInt(i+1)+'</span>').css({'width':'3%', 'float':'left'}),
        getColumn("<img src='"+avatar+"'>"),
        getColumn('<span>'+(nick == '' ? (lang == 'ru' ? "Игрок" : "Player") : nick)+'</span>'),
        getColumn('<span>'+ (isUpgrade ? ('<img src="'+getTexSrcUpgradeByLevel(db,score)+'" alt="'+score+'">') : score)+'</span>').css({'float': 'right'})
      ]));
    }
  }

  /*window['testlb_' + db] = function(){
    for(let i = 0; i < 50; i++){
      const avatar = '';
      const nick = 'Тестовый типок 228';
      const score = 1000000;

      lb_data.append(getRow([
        getColumn('<span>№'+parseInt(i+1)+'</span>'),
        getColumn("<img src='"+avatar+"'>"),
        getColumn('<span>'+nick+'</span>'),
        getColumn('<span>'+score+'</span>')
      ]));
    }
  }*/

  const dtc = new DateTimeClock(1);

  const lbbbb = $('<div class="leaderbord">').append([
    $('<div class="lbhead">').append([
      $('<img src="textures/arr2.png">').css({'float':'left'}).click(function(){
        if(dtc.check()){
          lbbbb.hide(200);
          let w = arrid - 1;
          if(w < 0) w = uilead.length - 1;
          uilead[w].show(200);
        }
      }),
      $('<span>').text(capt),
      $('<img src="textures/arr3.png">').css({'float':'right'}).click(function(){
        if(dtc.check()){
          lbbbb.hide(200);
          let w = arrid + 1;
          if(w >= uilead.length) w = 0;
          uilead[w].show(200);
        }
      })
    ]),
    $('<div class="leaderbord_data">').append(lb_data)
  ]);

  if(isUpgrade) lbbbb.hide();

  lbbbb.createScroll = () => CreateScrollLBData(lb_data);

  return lbbbb;

  function getRow(data){
    return $('<div class="row">').append(data);
  }

  function getColumn(data){
    return $('<div class="col">').append(data);
  }
}

function CreateScrollLBData(lb_data){
  const jselem = lb_data[0];

  var mousedown = false;
  var sx = 0, sy = 0, cx = 0, cy = 0;
  var start_topoffset = 0, last_topoffset = 0;

  function validate(){
    if(last_topoffset > 0){
      last_topoffset = 0;
    }

    const innerH = lb_data.parent().innerHeight() - lb_data.innerHeight();

    if(innerH > last_topoffset){
      last_topoffset = innerH;
    }

    jselem.style.top = last_topoffset + 'px';
  }

  function onScroll(){
    if(mousedown){
      last_topoffset = start_topoffset - (sy - cy);
      validate();
    }
  }

  jselem.addEventListener('mousewheel', function(event) {
    if(mousedown) return;
    if (event.deltaY > 0) {
      last_topoffset -= 20;
    } else {
      last_topoffset += 20;
    }
    validate();
  }, false);

  jselem.addEventListener('mousemove', function(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    cx = event.clientX - rect.left; // Получаем координату X точки нажатия мышью
    cy = event.clientY - rect.top; // Получаем координату Y точки нажатия мышью
    onScroll();
  });

  jselem.addEventListener('touchmove', function(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    cx = event.touches[0].clientX - rect.left; // Получаем координату X точки нажатия
    cy = event.touches[0].clientY - rect.top; // Получаем координату Y точки нажатия
    onScroll();
  });

  jselem.addEventListener('mousedown', function(event) {
    mousedown = true;
    const rect = event.currentTarget.getBoundingClientRect();
    sx = event.clientX - rect.left; // Получаем координату X точки нажатия мышью
    sy = event.clientY - rect.top; // Получаем координату Y точки нажатия мышью
  });

  jselem.addEventListener('touchstart', function(event) {
    mousedown = true;
    const rect = event.currentTarget.getBoundingClientRect();
    const touch = event.touches[0]; // Получаем первое касание
    sx = event.touches[0].clientX - rect.left; // Получаем координату X точки нажатия
    sy = event.touches[0].clientY - rect.top; // Получаем координату Y точки нажатия
  });

  const toel = [jselem, CreateScrollLBData.temp[0],CreateScrollLBData.temp.parent()[0]];
  for(let i = 0; i < toel.length; i++){
    const el = toel[i];

    el.addEventListener('mouseup', function(event) {
      mousedown = false;
      start_topoffset = last_topoffset;
    });

    el.addEventListener('touchend', function(event) {
      mousedown = false;
      start_topoffset = last_topoffset;
    });
  }
}

function showlb(){
  curlead = 0;
  const langflag = lang == 'ru';
  uilead = [
    getLeaderBord(0,'lead', langflag ? 'Лучшие рекорды' : 'Best records', false),
    getLeaderBord(1,'pers', langflag ? 'Топ покупок персонажей' : 'Top character purchases', true),
    getLeaderBord(2,'house', langflag ? 'Топ покупок домов' : 'Top Home Purchases', true),
    getLeaderBord(3,'car', langflag ? 'Топ покупок наземного транспорта' : 'Top Land Transport Purchases', true),
    getLeaderBord(4,'ship', langflag ? 'Топ покупок водного транспорта' : 'Top purchases of water transport', true)
  ];

  CreateScrollLBData.temp = getOverlay();
  CreateScrollLBData.temp.append(
    $('<div class="leaderbords">').append(uilead),
    $('<p>').append(
      $('<button>').text(lang == 'ru' ? "Назад" : "Back").click(function(){
        $('.jsoverlay').remove();
      })
    )
  ).hide().show(200);

  for(let i = 0; i < uilead.length; i++){
    uilead[i].createScroll();
    uilead[i].createScroll = null;
  }
}

function getOverlay(){
  const overlay = $('<div class="jsoverlay">').css({
    'position': 'fixed',
    'top': 0,
    'left': 0,
    'color':'white',
    'width': '100%',
    'height': '100%',
    'background': 'rgba(0,0,0,0.9)',
    'display': 'flex',
    'justify-content': 'center',
    'align-items': 'center',
    'z-index': 9999
  });

  const content = $('<div>').css({'text-align':'center'});//блок content, чтобы центрировать

  $('body').append(overlay.append(content));

  return content;
}
