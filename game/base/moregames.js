function openGame(id){
  if(platform == platforms.yandex){
    var tr = localStorage['transfer'] == null ? 1 : parseInt(parseInt(localStorage['transfer']) + 1);
    localStorage['transfer'] = tr;
    const tld = ysdk.environment.i18n.tld;
    open('https://yandex.'+tld+'/games/play/'+id + "?lang="+lang, '_blank');
    if(lb != null) lb.setLeaderboardScore('trans', tr);
  }
  else if(platform == platforms.vkplay){
    open('https://mini.vkplay.ru/play/game/'+id,'_blank');
  }
}

function moregames(id){
  moregames.lastID = id;
  if(moregames.gamecont == null){
    moregames.gamecont = $('#moregames').prepend($('<div>').append(getMoreGames()));
  }
  let gamecont = moregames.gamecont;

  $(id).hide(100);
  $('#moregames').show(1000);
}

function moregamesback(){
  $('#moregames').hide(100);
  $(moregames.lastID).show(100);
}

function getMoreGames(){
  const games = [
    {
      'id':283060,
      'ru': 'https://avatars.mds.yandex.net/get-games/1881364/2a0000018cb5f7edcda8d5f9ecd7b47b7e9f/cover1',
      'en': 'https://avatars.mds.yandex.net/get-games/10152950/2a0000018d11d1b024a4330befb3205ca1f7/cover1',
      'mobile': false,
      'pc': true,
      'platform':platforms.yandex
    },
    {
      'id':296816,
      'ru': 'https://avatars.mds.yandex.net/get-games/12797757/2a0000018dd4c6dfa937e5819dbdad29cc19/cover1',
      'en': 'https://avatars.mds.yandex.net/get-games/12797757/2a0000018dd4c6dfa937e5819dbdad29cc19/cover1',
      'mobile': true,
      'pc': true,
      'platform':platforms.yandex
    },
    {
      'id':290170,
      'ru': 'https://avatars.mds.yandex.net/get-games/10152950/2a0000018d558886629fa4eee604de406902/cover1',
      'en': 'https://avatars.mds.yandex.net/get-games/10152950/2a0000018d558886629fa4eee604de406902/cover1',
      'mobile': true,
      'pc': true,
      'platform':platforms.yandex
    },
    {
      'id': 292538,
      'ru':'https://avatars.mds.yandex.net/get-games/11374519/2a0000018da68f8dbcab392567e24786eb87/cover1',
      'en':'https://avatars.mds.yandex.net/get-games/11374519/2a0000018da68f8dbcab392567e24786eb87/cover1',
      'mobile': true,
      'pc': true,
      'platform':platforms.yandex
    },
    {
      'id': 296645,
      'ru':'https://avatars.mds.yandex.net/get-games/6238841/2a0000018ddfeb7815e2fbd97aeba0642db6/cover1',
      'en':'https://avatars.mds.yandex.net/get-games/6238841/2a0000018ddfeb7815e2fbd97aeba0642db6/cover1',
      'mobile': true,
      'pc': true,
      'platform':platforms.yandex
    },
    {
      'id': 296180,
      'ru':'https://avatars.mds.yandex.net/get-games/12797757/2a0000018dcb5b169defc4154f4e25732c57/cover1',
      'en':'https://avatars.mds.yandex.net/get-games/11385414/2a0000018dcb5ac97f576ce401bab03bfb52/cover1',
      'mobile':true,
      'pc': false,
      'platform':platforms.yandex
    },
    {
      'id': 'gun',
      'ru': 'https://developers.vkplay.ru/hotbox/showcase/gamelocale/picture/9c12844f-a09f-4f23-baab-99ad73456cf3.jpg',
      'en': 'https://developers.vkplay.ru/hotbox/showcase/gamelocale/picture/b7f5c0cd-55fd-4cfa-b966-0bc3686b2929.jpg',
      'platform':platforms.vkplay,
      'pc':true,
      'mobile': true
    },
    {
      'id': 'angry_toilets',
      'ru': 'https://developers.vkplay.ru/hotbox/showcase/gamelocale/picture/23fe8c1a-eb47-4a89-bb2a-ac4fc9bef5e6.jpg',
      'en': 'https://developers.vkplay.ru/hotbox/showcase/gamelocale/picture/23fe8c1a-eb47-4a89-bb2a-ac4fc9bef5e6.jpg',
      'platform':platforms.vkplay,
      'pc':true,
      'mobile': true
    },
    {
      'id': '2048_shooter',
      'ru': 'https://developers.vkplay.ru/hotbox/showcase/gamelocale/picture/f404f257-a83a-4a9b-a51a-d330d1b4d09c.jpg',
      'en': 'https://developers.vkplay.ru/hotbox/showcase/gamelocale/picture/f404f257-a83a-4a9b-a51a-d330d1b4d09c.jpg',
      'platform':platforms.vkplay,
      'pc':true,
      'mobile': true
    },
    {
      'id': 'gta',
      'ru': 'https://developers.vkplay.ru/hotbox/showcase/gamelocale/picture/6cf1f871-5246-4d8e-a1a8-5f7dfd81472d.jpg',
      'en': 'https://developers.vkplay.ru/hotbox/showcase/gamelocale/picture/530a7f81-0d3c-415d-bf78-ed50f33a3f19.jpg',
      'platform':platforms.vkplay,
      'pc':true,
      'mobile': false
    },
    {
      'id': 'gta6',
      'ru': 'https://developers.vkplay.ru/hotbox/showcase/gamelocale/picture/2130c4b2-4816-4b8c-b290-4679056489cf.jpg',
      'en': 'https://developers.vkplay.ru/hotbox/showcase/gamelocale/picture/469ae4e9-d3e7-4f72-a7c0-92641b585c0a.jpg',
      'platform':platforms.vkplay,
      'pc':true,
      'mobile': false
    },
    {
      'id': 'pranker',
      'ru': 'https://developers.vkplay.ru/hotbox/showcase/gamelocale/picture/4815828e-dd94-455d-a97b-a0578d3da100.jpg',
      'en': 'https://developers.vkplay.ru/hotbox/showcase/gamelocale/picture/039bf66f-6c22-47fe-953d-41027aaa61b1.jpg',
      'platform':platforms.vkplay,
      'pc':true,
      'mobile': false
    }
  ];

  function getGame(game){
    if((isMobile && !game.mobile) || (!isMobile && !game.pc)) return null;
    return $("<div class='game'>").append($("<img>").attr('src',game[lang])).click(function(){
      openGame(game.id);
    });
  }

  const componentChields = [];

  for(let i = 0; i < games.length; i++){
    if(games[i].platform == platform) componentChields.push(getGame(games[i]));
  }

  return componentChields;
}
