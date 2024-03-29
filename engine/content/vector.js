class Vector3 {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  toString() {
    return `[Vector3 X=${this.x}, Y=${this.y}, Z=${this.z}]`;
  }

  static Distance(first, second) {
    return Math.abs(first.x - second.x) + Math.abs(first.y - second.y);
  }

  vec2() {
    return new Vector2(this.x, this.y);
  }
}

class Vector2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Size {
  constructor(w, h) {
    this.w = w;
    this.h = h;
  }
}

class Rectangle {
  constructor(x, y,w,h) {
    this.x = x;
    this.y = y;
	this.w = w;
	this.h = h;
  }
}
