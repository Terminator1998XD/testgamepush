class Component{
  constructor(){
    this.OnUpdate = false;
  }

  Apply(gameobj, props){
    this.gameobj = gameobj;
    Object.assign(this, props);
    this.Start();
  }

  Destroy(){

  }

  Start(){

  }

  Update(){

  }
}
