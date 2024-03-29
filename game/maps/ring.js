class Ring extends MapPart{

  static Radius = 350;

  constructor(){
    super(new Vector3(900/2,1600/2,0), new Size(1,1));
    this.spawnpoint = this.getVec(0);
    this.ballspeed = 0.01;
    this.balloffset = 0.2;
  }

  OnRender(rect){
    g.beginPath();
    g.arc(0, 0, Ring.Radius, 0, 2 * Math.PI);
    g.strokeStyle = 'white';
    g.lineWidth = 10;
    g.stroke();
  }

  getVec(angle){
    const pos = this.pos;
    const centerX = pos.x - 21;
    const centerY = pos.y - 21;

    const x = centerX + Math.cos(angle) * Ring.Radius;
    const y = centerY + Math.sin(angle) * Ring.Radius;

    return new Vector3(x, y, 2);
  }
}
