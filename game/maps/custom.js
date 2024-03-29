class CustomPart extends MapPart{
  constructor(curve){
    super(new Vector3(10,10,0), new Size(1,1));
    this.curve = curve;
    this.CalcTotalLength();
    this.spawnpoint = this.getVec(0);
    this.ballspeed = 0.01;
    this.balloffset = curve.foffset == null ? 0.09 : curve.foffset;
    console.log(this.balloffset);

    if(this.curve.length == 0){
      this.Visible = false;
      this.Update = () => {
        this.ls.OnUpdate = false;
        if(AnyMouseDown){
          AnyMouseDown = false;
          this.curve.push({x: parseInt(mx), y: parseInt(my)});
          this.CalcTotalLength();
          this.Visible = true;
        }

        if(isKeyDown['Space']){
          isKeyDown = {};
          this.curve.splice(this.curve.length-1,1);
        }
      };
    }
  }

  OnRender(rect){
    g.strokeStyle = 'white';
    g.lineWidth = 10;
    // Начинаем путь
    g.beginPath();
    const points = this.curve;
    // Перемещаемся к первой точке
    g.moveTo(points[0].x, points[0].y);
    // Рисуем кривую линию через остальные точки
    const len = points.length;
    for (let i = 1; i < len; i++) {
        g.lineTo(points[i].x, points[i].y);
    }
    // Отрисовываем линию
    g.stroke();
  }

  getVec(angle){
    angle = angle / 6.28;
    const points = this.curve;
    /*if(points.length < 2){
      return {x:1, y:1,z:2};
    }*/
    const totalLength = this.totalLength;
    // Находим длину, соответствующую заданному углу
    var targetLength = totalLength * angle;
    // Находим точку на кривой по углу
    var currentLength = 0;
    for (var i = 1; i < points.length; i++) {
        var dx = points[i].x - points[i - 1].x;
        var dy = points[i].y - points[i - 1].y;
        var segmentLength = Math.sqrt(dx * dx + dy * dy);

        if (currentLength + segmentLength >= targetLength) {
            var percentOnSegment = (targetLength - currentLength) / segmentLength;
            return {
                x: points[i - 1].x + dx * percentOnSegment,
                y: points[i - 1].y + dy * percentOnSegment,
                z: 2
            };
        }

        currentLength += segmentLength;
    }

    // Если что-то пошло не так, вернуть последнюю точку
    return { x: points[points.length - 1].x, y: points[points.length - 1].y, z: 2};
  }

  CalcTotalLength(){
    var totalLength = 0;
    const points = this.curve;
    for (var i = 1; i < points.length; i++) {
        var dx = points[i].x - points[i - 1].x;
        var dy = points[i].y - points[i - 1].y;
        totalLength += Math.sqrt(dx * dx + dy * dy);
    }
    this.totalLength = totalLength;
  }

  Export(){
    console.log(this.curve);
  }
}

const custom_part_0 = [ { "x": 138, "y": 227 }, { "x": 766.5, "y": 227 }, { "x": 807, "y": 277 }, { "x": 790.5, "y": 318 }, { "x": 154.5, "y": 326 }, { "x": 144, "y": 399 }, { "x": 196.5, "y": 442 }, { "x": 799.5, "y": 442 }, { "x": 823.5, "y": 506 }, { "x": 784.5, "y": 536 }, { "x": 162, "y": 532 }, { "x": 138, "y": 595 }, { "x": 192, "y": 633 }, { "x": 795, "y": 643 }];
const custom_part_1 = [ { "x": 738, "y": 1389 }, { "x": 157, "y": 1389 }, { "x": 126, "y": 1326 }, { "x": 174, "y": 1278 }, { "x": 738, "y": 1287 }, { "x": 762, "y": 1222 }, { "x": 739, "y": 1175 }, { "x": 151, "y": 1166 }, { "x": 136, "y": 1112 }, { "x": 192, "y": 1062 }, { "x": 738, "y": 1071 }, { "x": 777, "y": 1008 }, { "x": 747, "y": 968 }, { "x": 162, "y": 957 }];
const custom_part_2 = [ { "x": 796, "y": 69 }, { "x": 804, "y": 1238 }, { "x": 754, "y": 1341 }, { "x": 112, "y": 1327 }, { "x": 76, "y": 1260 }, { "x": 94, "y": 262 }, { "x": 162, "y": 206 }, { "x": 700, "y": 207 }, { "x": 706, "y": 1187 }, { "x": 636, "y": 1233 }, { "x": 231, "y": 1232 }, { "x": 187, "y": 1184 }, { "x": 189, "y": 376 }, { "x": 253, "y": 341 }, { "x": 597, "y": 343 }];
const custom_part_3 = [ { "x": 198, "y": 486 }, { "x": 775, "y": 480 }, { "x": 828, "y": 559 }, { "x": 804, "y": 1004 }, { "x": 684, "y": 1030 }, { "x": 273, "y": 1035 }, { "x": 241, "y": 978 }, { "x": 261, "y": 738 }, { "x": 295, "y": 710 }, { "x": 607, "y": 717 }];
const custom_part_4 = [ { "x": 778, "y": 1121 }, { "x": 234, "y": 1118 }, { "x": 189, "y": 1058 }, { "x": 166, "y": 963 }, { "x": 166, "y": 834 }, { "x": 183, "y": 712 }, { "x": 249, "y": 608 }, { "x": 459, "y": 575 }, { "x": 624, "y": 598 }, { "x": 681, "y": 663 }, { "x": 706, "y": 753 }, { "x": 699, "y": 824 }, { "x": 649, "y": 918 }, { "x": 511, "y": 960 }]
custom_part_3.foffset = 0.2;
custom_part_4.foffset = 0.2;
for(let i = 0; i < custom_part_3.length; i++){
  custom_part_3[i].y -= 50;
}
for(let i = 0; i < custom_part_4.length; i++){
  custom_part_4[i].y -= 50;
}
