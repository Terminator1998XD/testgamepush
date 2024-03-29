class Dim {
  constructor(background) {
    this.map = [];
    this.background = background;
  }

  addGameObject(obj) {
    const z = obj.pos.z;
    const n = this.map.length;
    let i = 0;

    for (; i < n; i++) {
      if (this.map[i].pos.z >= z) {
        break;
      }
    }

    if (i === n) {
      this.map.push(obj);
    } else if (i === 0) {
      this.map.unshift(obj);
    } else {
      this.map.splice(i, 0, obj);
    }
  }

  addGameObjectRange(range, z) {
    const n = this.map.length;
    let i = 0;

    for (; i < n; i++) {
      if (this.map[i].pos.z >= z) {
        break;
      }
    }

    if (i === n) {
      this.map.push(...range);
    } else if (i === 0) {
      this.map.unshift(...range);
    } else {
      this.map.splice(i, 0, ...range);
    }
  }
}
