class Ray extends Vec3 {
  constructor(origin, direction) {
    this.origin = new Vec3(origin);
    this.direction = new Vec3(direction);
  }

  get origin() {
    return this.origin;
  }

  get direction() {
    return this.direction;
  }

  set origin(v) {
    this.origin = v;
  }

  set direction(v) {
    this.direction = v;
  }

  pointAt(pos) {
    return this.origin.add(this.direction.multiply(pos));
  }
}
