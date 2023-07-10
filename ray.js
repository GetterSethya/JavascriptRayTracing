class Ray extends Vec3 {
  constructor(origin, direction) {
    super();
    this._origin = origin;
    this._direction = direction;
  }

  get origin() {
    return this._origin;
  }

  get direction() {
    return this._direction;
  }

  set origin(v) {
    this._origin = v;
  }

  set direction(v) {
    this._direction = v;
  }

  pointAt(pos) {
    return this._origin.add(this._direction.multiply(pos));
  }
}
