class GameObject {
  constructor(pos, size) {
    this.pos = pos;
  	this.size = size;
  	this.Visible = true;
  	this.Rotate = 0;
  	this.CurrentTexture = 0;
  	this.Animate = false;
  	this.OnUpdate = false;
    this.pivot = new Vector2(0,0);
    this.components = [];
    this.updcomponents = [];
    this.allwaysdraw = false;
  }

  AddComponent(comp, props={}){
    const c = new comp();
    c.Apply(this,props);
    this.components.push(c);
    if(c.OnUpdate) this.updcomponents.push(c);
    return c;
  }

  GetComponent(ctype){
    for(let i = 0; i < this.components.length; i++){
      if(this.components[i] instanceof ctype){
        return this.components[i];
      }
    }
    return null;
  }

  DestroyComponents(){
    for(let i = 0; i < this.components.length; i++){
      this.components[i].Destroy();
    }
    this.components = [];
  }

  setTexture(texture)  {
	  this.Animate = false;
	  this.texData = [texture];
  }

  setAnim(anim)  {
	  this.Animate = true;
	  this.animData = [anim];
  }

  setTextures(textures)  {
	  this.Animate = false;
	  this.texData = textures;
  }

  setAnims(anims)  {
	  this.Animate = true;
	  this.animData = anims;
  }

  NextFrame() {
	   return this.Animate ? this.animData[this.CurrentTexture].nextFrame() : this.texData[this.CurrentTexture];
  }

  OnRender(rect)  {
	  g.drawImage(this.NextFrame(),rect.x,rect.y,rect.w,rect.h);
  }

  Update()  {

  }
}
