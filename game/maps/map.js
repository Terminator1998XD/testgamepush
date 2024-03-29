class Map{
  constructor(...parts){
    this.parts = parts;
  }

  Init(advend){
    this.partsInstance = [];
    this.mapready = !advend;

    const parts = this.parts;
    const len = parts.length;
    for(let i = 0; i < len; i++){
      const clazz = parts[i];
      const p = clazz instanceof Array ? new CustomPart(clazz) : new clazz();
      dim.addGameObject(p);
      p.ls = spawnBall(p);
      p.pool.push(p.ls);

      if(advend){
        p.ls.OnUpdate = false;
      }
      else{
        p.OnUpdate = true;
      }

      this.partsInstance.push(p);
    }
  }

  AlivePlayer(){
    const parts = this.partsInstance;
    const pc = parts.length;
    for(let j = 0; j < pc; j++){
      const p = parts[j];
      const pool = p.pool;
  		for(let i = 0; i < 10; i++){
  			pool[i].Explode();
  		}
  		pool.splice(0,10);
    }
  }

  MakeReady(){
    $('#air').hide();

    const parts = this.partsInstance;
    const pc = parts.length;
    for(let j = 0; j < pc; j++){
      const p = parts[j];
      p.ls.OnUpdate = true;
      p.OnUpdate = true;
    }

    isMove = true;
    this.mapready = true;

    if(gp != null) gp.gameplayStart();
  }

  CheckBulletContact(bullet){
    const parts = this.partsInstance;
    const pc = parts.length;
    for(let j = 0; j < pc; j++){
      const part_ = parts[j];
      const pool = part_.pool;
      const bulletpos = bullet.pos;
      const balloffset = part_.balloffset;
      let pasteMode = true;
      let paste_in_noready = false;
      for(let i = pool.length - 1; i > -1; i--){
        const ball = pool[i];
        if(pasteMode){
          if(Vector3.Distance(ball.pos, bulletpos) < 64){
            const instance = new Ball(parts[j], bullet.color, ball.a + balloffset);
            pool.splice(i, 0, instance);
            dim.map.splice(dim.map.indexOf(bullet),1);
            dim.addGameObject(instance);
            pasteMode = false;
            paste_in_noready = !ball.isReady;
          }
        } else if(ball.isReady || paste_in_noready){
          ball.a += balloffset + 0.01;
        }
      }
    }
  }

  GetBulletColor(){
    const parts = this.partsInstance;
    const randpart = parts[getrand(0,parts.length)].pool;
    const ball = randpart[getrand(0,randpart.length)];
    return ball == null ? allcolors[0] : ball.color;
  }

  Export(){
    const parts = this.partsInstance;
    const pc = parts.length;
    for(let j = 0; j < pc; j++){
      const p = parts[j];
      p.Export();
    }
  }
}
