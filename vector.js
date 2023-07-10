class Vec3 {
  constructor(x = 0.0, y = 0.0, z = 0.0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  get x() {
    return this.x;
  }
  get y() {
    return this.y;
  }
  get z() {
    return this.z;
  }

  set x(x) {
    return (this.x = x);
  }
  set y(y) {
    return (this.y = y);
  }
  set z(z) {
    return (this.z = z);
  }

  get negate() {
    return new Vec3(-this.x, -this.y, -this.z);
  }

  add(v) {
    if (v instanceof Vec3) {
      return new Vec3(this.x + v.x, this.y + v.y, this.z + v.z);
    } else {
      return new Vec3(this.x + v, this.y + v, this.z + v);
    }
  }

  sub(v) {
    if (v instanceof Vec3) {
      return new Vec3(this.x - v.x, this.y - v.y, this.z - v.z);
    } else {
      return new Vec3(this.x - v, this.y - v, this.z - v);
    }
  }

  multiply(v) {
    if (v instanceof Vec3) {
      return new Vec3(this.x * v.x, this.y * v.y, this.z * v.z);
    } else {
      return new Vec3(this.x * v, this.y * v, this.z * v);
    }
  }

  divide(v) {
    if (v instanceof Vec3) {
      return new Vec3(this.x / v.x, this.y / v.y, this.z / v.z);
    } else {
      return new Vec3(this.x / v, this.y / v, this.z / v);
    }
  }

  dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  cross(v) {
    return new Vec3(
      this.y * v.z - this.z * v.y,
      this.z * v.x - this.x * v.z,
      this.x * v.y - this.y * v.x
    );
  }

  get length() {
    return Math.sqrt(this.dot(this));
  }

  get unit() {
    return this.divide(this.length());
  }
  get squaredLength() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
}
