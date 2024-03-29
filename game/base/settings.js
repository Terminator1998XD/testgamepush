function fillSettings(){
  const mus = new Checkbox(TXT('mus'),'UserMusEnable', true);
  const sound = new Checkbox(TXT('snd'),'UserSoundEnable', true);

  $('.settings').each(function() {
    $(this).append([(isMobile&&platform == platforms.yandex) ? null : mus.getNode(),sound.getNode()]);
  });

  if(!(isMobile&&platform == platforms.yandex))mus.loadFromLocalStorage();
  sound.loadFromLocalStorage();
}

class Checkbox{
  constructor(text, globalvar, autocheck){
    this.text = text;
    this.globalvar = globalvar;
    this.els = [];
    this.checked = autocheck;
    this.defaultchecked = autocheck;
    this.enableCallback = null;
    this.disableCallback = null;
  }

  getNode(){
    var _this = this;

    let btn = $('<div class="cb_button">').click(function(){_this.click(_this);}).append([
    $('<div class="cb_inner">').addClass(this.checked ? 'cb_align_right' : 'cb_align_left'),
    $('<span class="cb_inner2">').css({'float': (this.checked ? 'left' : 'right')}).text(TXT(this.checked ? 'on' : 'off'))]
  ).css({'background-color':(this.checked ? 'green' : 'red')});

    let el = $('<div class="checkbox">').append([
        btn, $('<span>').text(this.text)
    ]);
    this.els.push(btn);
    return el;
  }

  loadFromLocalStorage(){
    if(localStorage.getItem(this.globalvar) !== null){
      this.click(this);
    }
  }

  click(_this){
    _this.checked = !_this.checked;
    window[_this.globalvar] = _this.checked;

    for(let i = 0; i < _this.els.length; i++){
      const e = _this.els[i];
      if(_this.checked){
        e.css({'background-color':'green'})
        e.find('.cb_inner').removeClass('cb_align_left').addClass('cb_align_right');
        e.find('.cb_inner2').css({'float':'left'}).text(TXT('on'));
        if(this.defaultchecked) localStorage.removeItem(_this.globalvar);
        else localStorage.setItem(_this.globalvar, 'false');
        if(_this.enableCallback != null) _this.enableCallback();
      }
      else{
        e.css({'background-color':'red'})
        e.find('.cb_inner').removeClass('cb_align_right').addClass('cb_align_left');
        e.find('.cb_inner2').css({'float':'right'}).text(TXT('off'));
        if(this.defaultchecked)localStorage.setItem(_this.globalvar, 'false');
        else localStorage.removeItem(_this.globalvar);
        if(_this.disableCallback != null) _this.disableCallback();
      }
    }
  };
}
