class Explode extends GameObject{
  constructor(pos, size){
    super(pos, size);
    this.setTextures(exp);
    this.effectID = effects_push(this);
    this.tswap = new DateTimeClock(0.03);
  }

  OnRender(rect){
    super.OnRender(rect);

    if(this.tswap.check()){
      this.CurrentTexture++;

      if(this.CurrentTexture >= exp.length){
        this.CurrentTexture = exp.length - 1;
        effects_remove(this);
      }
    }
  }
}
