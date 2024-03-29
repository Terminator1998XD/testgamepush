function getUpgrade(name, maxlevel){
  const caption = TXT(name);
  var level = 0;

  if(localStorage[name] != null){
    level = parseInt(localStorage[name]);
  }

  const image = $('<img>').attr('src',getTexSrcUpgradeByLevel(name,level));
  const upginf = $('<div>').text((level+1) + '/'+(maxlevel+1));
  const priceblock = $('<div>').text(getBuyButtonText());
  const buybutton = $('<img>');

  const element = $('<div class="upgrade">').append([
    $('<div class="leftcont">').append(image),
    $('<div class="leftcont">').html(caption).append(upginf),
    $('<div class="rightcont">').append([
      buybutton.attr("src","textures/arr.png").click(upgradeClick).css({'height': '50%', 'margin-top': '1vh'}),
      priceblock
    ])
  ]);

  baloc_hendlers.push(balanceOnChanged);
  function balanceOnChanged(){//money
    if(money >= getNextLevelPrice() || level >= maxlevel){
      buybutton.removeClass('nobuyallow');
    }
    else buybutton.addClass('nobuyallow');
  }

  balanceOnChanged();

  function upgradeClick(){
    const price = getNextLevelPrice();
    if(money >= price && level != maxlevel){
      AddBalance(-price);
      level++;
      localStorage[name] = level;
      if(lb != null)lb.setLeaderboardScore(name, parseInt(level));

      priceblock.text(getBuyButtonText());
      upginf.text((level+1) + '/'+(maxlevel+1));
      image.attr('src',getTexSrcUpgradeByLevel(name,level));
    }
  }

  function getBuyButtonText(){
    return level >= maxlevel ? (lang == 'ru' ? "Макс" : "Max") : (getNextLevelPrice() + "$");
  }

  function getNextLevelPrice(){
    return level+1 * parseInt((level*2+1).toString() + '00');
  }

  return element;
}

function getMinigame(){
  return [
    getUpgrade('pers',3), getUpgrade('house',7), getUpgrade('car',6), getUpgrade('ship',6)
  ];
}

function getTexSrcUpgradeByLevel(name,bylevel){
  return 'textures/minigame/'+name+"_"+bylevel+".png";
}
