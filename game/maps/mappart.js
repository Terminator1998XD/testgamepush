class MapPart extends GameObject{
  constructor(pos,size){
    super(pos,size);
    this.pool = [];
    this.ballspeed = 0.01;
    this.lastcol = 0;
  }

  OnRender(rect){
    console.log("Метод OnRender у наследника MapPart не реализован");
  }

  getVec(t){
    console.log("Метод OnRender у наследника getVec не реализован");
    return new Vector3(0,0,0);
  }

  Export(){
    console.log("Метод Export у наследника getVec не реализован");
  }

  Update(){
    const pool = this.pool;
    if(Vector3.Distance(this.ls.pos, this.spawnpoint) > 70){
      const b = spawnBall(this);
      this.ls = b;
      pool.push(b);
    }

    const len = pool.length;
    for(let i = 0; i < len; i++){
      const ball = pool[i];
      const color = ball.color;
      const combo = [ball];

      for(let j = i + 1; j < len; j++){
        const jball = pool[j];

        if(color == jball.color){
          combo.push(jball);
        }
        else break;
      }

      const combolen = combo.length;
      if(combolen >= 3){
        for(let j = 0; j < combolen; j++){
          const cball = combo[j];
          pool.splice(pool.indexOf(cball),1);
          cball.Explode();
        }
        if(pool.length > 0) isMove =  false;
        else{
          const b = spawnBall(this);
          this.ls = b;
          pool.push(b);
        }
        break;
      }
    }
  }
}
