class Ray extends Vec3 {
    constructor(origin, direction, time = 0.0) {
        super();
        this._origin = origin;
        this._direction = direction;
        this._tm = time;
    }

    get origin() {
        return this._origin;
    }

    get direction() {
        return this._direction;
    }

    get time() {
        return this._tm;
    }

    set time(time_) {
        this._tm = time_;
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
