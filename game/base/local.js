var _localization_ = {
  "ru":{
    reborn: "Последний шанс",
    scm: "Умножить очки x2",
    adv:"за рекламу",
    on: "Вкл.",off: "Выкл.",
    mus: "Музыка", snd: "Звуки",
    losetext: "Кот не должен был коснуться линии",
    car: "Наземный<br>транспорт",
    house: "Жилище",
    pers: "Персонаж",
    ship:"Водный<br>транспорт"
  },
  "en":{
    scm:"Multiply points x2",
    adv:"for viewing ads",
    reborn:"Second life",
    on: "On",off: "Off",
    mus: "Music", snd: "Sounds",
    losetext:"The cat should not have touched the line",
    car: "Ground<br>transportation",
    house: "Dwelling",
    pers: "Character",
    ship:"Water<br>transport"
  }
}

function TXT(id){
  return _localization_[lang][id];
}

function hideTexts(){
  $('[translate]').hide();
}

function translateBlocks(){
  if(platform == platforms.yandex){
     $('[translate]').each(function() {
      if(lang != 'ru'){
        var value = $(this).attr('translate');
        $(this).html(value);
      }
      $(this).show();
    });
  } else {
    if(translateBlocks.flag){
      $('[translate]').each(function() {
        $(this).attr('translate_ru',$(this).html());
      });
      translateBlocks.flag = false;
    }

      $('[translate]').each(function() {
        const value = $(this).attr(lang == 'ru' ? 'translate_ru':'translate');
        $(this).html(value);
      $(this).show();
    });
  }
}

translateBlocks.flag = true;

function setlang(l){
  window.lang = l;
  translateBlocks();
  localStorage['savelang'] = l;
  $('#levelup').hide();
  $('#air').hide();
  $('.upgrade').remove();
  $('#minigame').prepend(getMinigame());
}
