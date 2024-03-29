var ysdk = null;
var advlock = false;
var lwdata = 0;

function sdk(callback){
  if(platform == platforms.yandex) {
    var apiurl = 'https://yandex.ru/games/sdk/v2';
    var initFunc = function(){
      YaGames.init().then(ysdk => {
        window.isMobile = !ysdk.deviceInfo.isDesktop() && ysdk.deviceInfo._type != null;
				window.isPC = ysdk.deviceInfo.isDesktop() || ysdk.deviceInfo._type == null;
				window.lang = ysdk.environment.i18n.lang;
        window.gp = null;
        $('#langselector').remove();

        ysdk.getLeaderboards().then(lb => {
					window.lb = lb;
			  });
        callback(ysdk);
      });
    }
  } else if(platform == platforms.vkplay) {
    var apiurl = 'https://vkplay.ru/app/'+gameid+'/static/mailru.core.js';
    var initFunc = function(){
      iframeApi({appid: gameid, adsCallback: adsCallback
      }).then(function(api){
        const queryString = window.location.search.slice(1);
        if (queryString) {
          const paramsArray = queryString.split('&');
          window.paramsObject = {};

          paramsArray.forEach(param => {
              const [key, value] = param.split('=');
              paramsObject[key.toLowerCase()] = value.toLowerCase();
          });

          if(localStorage['savelang'] != null) {
      			window.lang = localStorage['savelang'];
      		}
      		else window.lang = paramsObject.lang == 'ru_ru' ? 'ru' : 'en';
        }
        else window.lang = 'en';

        $('#langselector').show();

        window.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        window.isPC = !window.isMobile;

        window.lb = null;
        window.gp = null;

        callback({adv:{
          hideBannerAdv: function(){
            console.log("Попытка скрыть стики баннер. Sticky-баннер не обнаружен.");
          },
          showBannerAdv: function(){
            console.log("Попытка показать стики баннер. VKPlay Mini не поддерживает Sticky-баннер");
          },
          showFullscreenAdv: function(info){
            let cb = info.callbacks;
            adsCallback.onClose = cb.onClose;
            adsCallback.onRewarded = cb.onRewarded;
            api.showAds({interstitial: true});
          },
          showRewardedVideo: function(info){
            let cb = info.callbacks;
            adsCallback.onClose = cb.onClose;
            adsCallback.onRewarded = cb.onRewarded;
            api.showAds({interstitial: false});
          }
        }
      });
      });
    }
  }
  else if(platform == platforms.gamepush){
    var apiurl = 'https://gamepush.com/sdk/gamepush.js?projectId=13090&publicToken=zh7EZK6dyF5KkaFHfKbWm67o8jImszza&callback=onGPInit';
    var initFunc = null;
    window.onGPInit = function (_gp) {
      console.log("Game push ready!");
      window.gp = _gp;
      window.isMobile = gp.isMobile;
      window.isPC = !gp.isMobile;
      window.lang = gp.language;
      window.lb = null;
      callback({adv: {
        showFullscreenAdv: function(info){
          const cb = info.callbacks;
          gp.ads.showFullscreen();
          // Закончился показ
          gp.ads.on('fullscreen:close', (success) => cb.onClose);
        },
        showRewardedVideo: function(info){
          const cb = info.callbacks;
          // Показать rewarded video, возвращает промис
          gp.ads.showRewardedVideo();
          // Закончился показ
          gp.ads.on('rewarded:close', (success) => {
            cb.onClose();
            cb.onRewarded();
          });
          // Получена награда
          gp.ads.on('rewarded:reward', () => {});
        },
        hideBannerAdv: function(){
          gp.ads.closeSticky();
        },
        showBannerAdv: function(){
          gp.ads.showSticky();
        }
      }});

      if(!gp.platform.isExternalLinksAllowed){
        $('.moregamesbutton').remove();
      }

      gp.gameStart();
    }
  }

  var t = document.getElementsByTagName('script')[0];
  var s = document.createElement('script');
  s.src = apiurl;
  s.async = true;
  t.parentNode.insertBefore(s, t);
  s.onload = initFunc;
}

function adsCallback(){
  if(adsCallback.onClose != null) adsCallback.onClose();
  if(adsCallback.onRewarded != null) adsCallback.onRewarded();
}

function banner(end) {
  if(advlock){
    return;
  }

  if((new Date() - lwdata) / 1000 >= 200){
    advlock = true;
    pauseMusic();
    SoundsEnable = false;
    StopAllSound();
    ysdk.adv.showFullscreenAdv({callbacks: {onClose: function(){
      advlock = false;
      SoundsEnable = true;
      playMusic();
      end(true);
      lwdata = new Date();
    }}});
  }
  else{
    end(false);
  }
}

function rbanner(reward,end, mEnable = true){
  if(advlock){
    return;
  }
  advlock = true;

  if(window['ysdk'] == null){
    end();
  }

  if(window['ysdk'] == null){
    reward();
    end();
  }

  pauseMusic();
  SoundsEnable = false;
  StopAllSound();
  ysdk.adv.showRewardedVideo({callbacks: {onRewarded:reward, onClose: function(){advlock = false;SoundsEnable = true; if(mEnable){playMusic();} end();} }});
}
