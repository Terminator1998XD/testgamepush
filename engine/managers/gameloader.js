class GameLoader{

  static textures = [];

  constructor(){
    this.ready = null;
    this.reslist = [];
  }

  download(){
    const len = this.reslist.length;
    var complited = 0;
    for(let i = 0; i < len; i++){
      const url = this.reslist[i];
      const img = new Image();
      img.onload = () => {
        complited++;
        if(complited == len){
          this.ready();
        }
      };
      GameLoader.textures[url.toLowerCase()] = img;
      img.src = url;
    }
  }

  AddTexArr(name, count){
    const reslist = this.reslist;
  	for(let i = 0; i < count; i++){
  		reslist.push('textures/'+name.toLowerCase()+i+'.png');
  	}
  }
}

function getTex(name){
	return GameLoader.textures['textures/'+name.toLowerCase()+".png"];
}

function getTexs(name,count){
	let arr = [];

	for(let i = 0; i < count;i++)	{
		arr.push(GameLoader.textures['textures/'+name.toLowerCase()+i+".png"]);
	}

	return arr;
}

function getTexs2(name,start,count){
	let arr = [];

	for(let i = start; i < count;i++)	{
		arr.push(GameLoader.textures['textures/'+name.toLowerCase()+i+".png"]);
	}

	return arr;
}

function getTile(map, tileID){
	return GameLoader.textures['textures/'+map.toLowerCase()+"/tile_"+tileID+".png"];
}

function getPuzzTexs(name,count){
	let arr = [];

	for(let i = 0; i < count;i++)	{
		arr.push(getPuzzTex(name+i));
	}

	return arr;
}

function getPuzzTex(texName, NW = 12, NH = 20){

    const cret = getPuzzTex.cash[texName];
    if(cret != null){
      return {
        orig: cret.orig,
        puzz: [...cret.puzz],
        width: cret.orig.width,
        height: cret.orig.height
      };
    }

    const tex = GameLoader.textures['textures/'+texName.toLowerCase()+".png"];
    //console.log("get tex "+'textures/'+texName+".png"+" result: " + tex);
    const w = tex.width/NW;
    const h = tex.height/NH;
    let ret = [];

    for (let i = 0; i < NH; i++) {
      for (let j = 0; j < NW; j++) {
        // Создание канваса для каждого кусочка изображения
        const cnv = document.createElement('canvas');
        cnv.width = w;
        cnv.height = h;
        cnv.x = j*w;
        cnv.y = i*h;
        const ctx = cnv.getContext('2d');
        ctx.drawImage(tex, j * (tex.width / NW), i * (tex.height / NH), tex.width / NW, tex.height / NH, 0, 0, w, h);
        ret.push(cnv);
      }
    }

    getPuzzTex.cash[texName] = {
      orig: tex,
      puzz: [...ret]
    };

    return {
      orig: tex,
      puzz: ret,
      width: tex.width,
      height: tex.height
    };
}

getPuzzTex.cash = {};
