function advprompt(text, accept, deny){
  if (_advprompt.includes(text)) {
    deny();
    return;
  }
  _advprompt.push(text);
  text = TXT(text) + "\n" + TXT('adv');

  var procent = 100;
  var interval = null;

  $('body').append(
    $('<div class="advp">').append([
      $('<div class="pbar">').css({'width':(procent+'%')}),
      $('<center>').append($('<button>').css({'display':'block'}).text(text).click(function(){
          clearInterval(interval);
          interval = null;
          $('.advp').remove();
          rbanner(function(){},accept);
      }))
    ])
  );

  interval = setInterval(function(){
      if(interval == null) return;
      procent--;
      $('.pbar').css({'width':(procent+'%')});
      if(procent == 0){
        clearInterval(interval);
        $('.advp').remove();
        deny();
      }
  }, 20);
}

var _advprompt = [];

function dead_advprompt(killer, prealive, postalive){
  updlb();
  saveBackgroundTrackPosition();
  pauseMusic();

  if(score < 1){
    GoMenu();
    return;
  }

  advprompt('reborn',
  function(){ //accept
    prealive();
    timer_go(function(){
      postalive();
      playMusic();
    });
  },
  function(){ //deny
    advprompt('scm',
    function(){ //accept
      score = score * 2;
      scoreui.text(parseInt(score));
      updlb();
      GoMenu();
    },
    GoMenu, false
    );
  });
}

function timer_go(tp){
	window.tm = $('<div id="timer">');
  $('body').append(window.tm);
	window.labels = [];

	for(let i = 0; i < 3; i++){
		let span = $('<span>').html(3-i).hide();
		labels.push(span);
		tm.append(span);
	}

	tm.show(100);
	labels[0].show();
	window.nextlabel = 1;
	window.callfunc = tp;

	setTimeout(tmfunc,1200);
}

function tmfunc(){
	if(document.visibilityState === "hidden"){
		setTimeout(tmfunc,1200);
		return;
	}

	window.labels[window.nextlabel-1].hide(200);

	if(window.nextlabel >= window.labels.length){
		window.callfunc();
    window.tm.remove();
		return;
	}

	window.labels[window.nextlabel].show(200);
	window.nextlabel+=1;
	setTimeout(tmfunc,1000);
}
