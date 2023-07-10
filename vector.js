class Vec3 {
  constructor(x = 0.0, y = 0.0, z = 0.0) {
    this._x = x;
    this._y = y;
    this._z = z;
  }

  get x() {
    return this._x;
  }
  get y() {
    return this._y;
  }
  get z() {
    return this._z;
  }

  set x(val) {
    return (this._x = val);
  }
  set y(val) {
    return (this._y = val);
  }
  set z(val) {
    return (this._z = val);
  }

  get negate() {
    return new Vec3(-this._x, -this._y, -this._z);
  }

  add(v) {
    if (v instanceof Vec3) {
      return new Vec3(this._x + v.x, this._y + v.y, this._z + v.z);
    } else {
      return new Vec3(this._x + v, this._y + v, this._z + v);
    }
  }

  subtract(v) {
    if (v instanceof Vec3) {
      return new Vec3(this._x - v.x, this._y - v.y, this._z - v.z);
    } else {
      return new Vec3(this._x - v, this._y - v, this._z - v);
    }
  }

  multiply(v) {
    if (v instanceof Vec3) {
      return new Vec3(this._x * v.x, this._y * v.y, this._z * v.z);
    } else {
      return new Vec3(this._x * v, this._y * v, this._z * v);
    }
  }

  divide(v) {
    if (v instanceof Vec3) {
      return new Vec3(this._x / v.x, this._y / v.y, this._z / v.z);
    } else {
      return new Vec3(this._x / v, this._y / v, this._z / v);
    }
  }

  dot(v) {
    return this._x * v.x + this._y * v.y + this._z * v.z;
  }

  cross(v) {
    return new Vec3(
      this._y * v.z - this._z * v.y,
      this._z * v.x - this._x * v.z,
      this._x * v.y - this._y * v.x
    );
  }

  get length() {
    return Math.sqrt(this.dot(this));
  }

  get unit() {
    return this.divide(this.length);
  }

  get squaredLength() {
    return this._x * this._x + this._y * this._y + this._z * this._z;
  }

  toString() {
    return String(this._x + "," + this._y + "," + this._z);
  }
}
