class Ball extends GameObject{

  static radius = 32;

  constructor(map_part, color, angle = 0){
    super(map_part.getVec(angle), new Size(64,64));
    this.map_part = map_part;
    this.a = angle;
    this.color = color;
    this.OnUpdate = true;
    this.isReady = true;
  }

  Explode(){
    dim.map.splice(dim.map.indexOf(this),1);
    new Explode(this.pos,this.size);
    PlaySound('b');

    if(!_loseflag){
      AddScore(1);
    }
  }

  OnRender(rect){
    drawBall(this.color);
  }

  Update(){
    const ballspeed = this.map_part.ballspeed;
    if(isMove) this.a+=ballspeed;
    else{
      const pool = this.map_part.pool;
      const index = pool.indexOf(this);
      let next = pool[index+1];
      next = next == null ? 0 : next.a;
      if(this.a - next > this.map_part.balloffset){
        this.a-=ballspeed;
        moveReady = false;
        this.isReady = false;
      }
      else this.isReady = true;
    }

    this.pos = this.map_part.getVec(this.a);

    if(this.a > 6.19){
      Lose();
    }
  }
}
