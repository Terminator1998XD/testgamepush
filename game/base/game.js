function Init(){
	if(window['lang'] != null) return;
	window.backgroundTexture = getTex('back');

	window.lang = 'ru';
	window.scoreui = $('#score');
	window._advprompt = [];
	window.score = 0;
	window.scoremul = 1;
	window.exp = getTexs('exp/e',22);
	camera.y = 1600;

	loadBackgroundTrackPosition();

	let rec = localStorage['myrecord'];

  if(rec != null && rec > 0){
			$('.record').html(parseInt(rec));
	}
	else{
		$('#startGame .record').parent().remove();
	}

	window.isPC = false;
	$('.overlay').show();
	hideTexts();

	EngineRun();

	sdk(ysdk => {
        console.log('SDK initialized');
        window.ysdk = ysdk;
				if(isPC && myOrentation==orentations.vertical){
					$('body').css({'background-image': 'url("textures/htmlback.jpg")','background-size':'cover'});
					const neonColor = 'rgb(255, 255, 255)'; // Здесь вы можете выбрать цвет неона
					const border = '1px solid white';
					$(canvas).css({
					  'box-shadow': `0 0 10px ${neonColor}`,
					  'border-left': border,
					  'border-right': border
					});
				}

				if(window.lb == null){
					$('#crown').remove();
				}

				InitMenu();
				translateBlocks();
				$('#levelup').hide();
				$('#air').hide();
				fillSettings();
				resizeCanvas();
    });
}

var _loseflag = false;
function Lose(){
	if(_loseflag) return;


	if(gp != null) gp.gameplayStop();

	_loseflag = true;
	OnPause = true;
	PlaySound('lose');

	dead_advprompt(TXT('losetext'),preAlive,postAlive);

	function preAlive(){
		map.AlivePlayer();
	}

	function postAlive(){
		OnPause = false;
		_loseflag = false;
		if(gp != null) gp.gameplayStart();
	}
}

function PlayClick(){
	banner(function(arg){
		if(PlayClick.flag){
			NewGame();
		}

		GoGame();
		spawnEnable(arg);
		PlayClick.flag = true;

		$('.overlay').hide();
		if(isMobile) ysdk.adv.hideBannerAdv();
		OnPause = false;
		playMusic();
	});
}

function NewGame(){
	dim.map = [];
	score = 0;
	scoreui.text(0);
	_loseflag = false;
	_advprompt = [];
}

PlayClick.flag = false;

function TogglePause(){
	OnPause = !OnPause;
	saveBackgroundTrackPosition();

	if(OnPause){
		updlb();
		$('.overlay').show(500).css({'background-color': 'rgba(0,0,0,0.7)'});
		$('#pausem').show();
	}
	else {
		$('.overlay').hide().css({'background-color': 'unset'});
		$('#pausem').hide();
		playMusic();
	}
}

document.addEventListener("visibilitychange", function() {
  if (document.visibilityState === "hidden") {
		if(!OnPause){
			OnPause = true;
			updlb();
			$('.overlay').show(500).css({'background-color': 'rgba(0,0,0,0.7)'});
			$('#pausem').show();
		}
		pauseMusic();
		StopAllSound();
  }
});
