class AABB {
    constructor(ix, iy, iz) {
        this._x = ix;
        this._y = iy;
        this._z = iz;
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

    set x(value) {
        this._x = value;
    }
    set y(value) {
        this._y = value;
    }
    set z(value) {
        this._z = value;
    }

    axis(n) {
        if (n === 1) {
            return this._y;
        }
        if (n === 2) {
            return this._z;
        }

        return this._x;
    }

    hit(ray, ray_t) {
        for (let a = 0; a < 3; a++) {
            const invD = 1 / ray.direction[a];
            let t0 = (this.axis(a).min - ray.origin[a]).divide(
                ray.direction[a]
            );
            let t1 = (this.axis(a).max - ray.origin[a]).divide(
                ray.direction[a]
            );
            if (invD < 0) {
                [t0, t1] = [t1, t0];
            }

            ray_t.min = Math.min(t0, ray_t.mim);
            ray_t.max = Math.max(t1, ray_t.max);

            if (ray_t.max <= ray_t.min) {
                return false;
            }
        }
        return true;
    }

    pad() {
        const delta = 0.0001;
        const new_x = this._x.size() >= delta ? this._x : this.x.expand(delta);
        const new_y = this._y.size() >= delta ? this._y : this._y.expand(delta);
        const new_z = this._z.size() >= delta ? this._z : this._z.expand(delta);

        return new AABB(new_x, new_y, new_z);
    }

    static fromPoints(a, b) {
        const min = new Vec3(
            Math.min(a.x, b.x),
            Math.min(a.y, b.y),
            Math.min(a.z, b.z)
        );
        const max = new Vec3(
            Math.max(a.x, b.x),
            Math.max(a.y, b.y),
            Math.max(a.z, b.z)
        );
        const ix = new Interval(min.x, max.x);
        const iy = new Interval(min.y, max.y);
        const iz = new Interval(min.z, max.z);

        return new AABB(ix, iy, iz);
    }

    static merge(box0, box1) {
        const x = new Interval(
            Math.min(box0.x.min, box1.x.min),
            Math.max(box0.x.max, box1.x.max)
        );
        const y = new Interval(
            Math.min(box0.y.min, box1.y.min),
            Math.max(box0.y.max, box1.y.max)
        );
        const z = new Interval(
            Math.min(box0.z.min, box1.z.min),
            Math.max(box0.z.max, box1.z.max)
        );

        return new AABB(x, y, z); //
    }
}
