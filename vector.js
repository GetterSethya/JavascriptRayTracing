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

    near_zero() {
        const s = 1e-8;
        return (
            Math.abs(this._x) < s &&
            Math.abs(this._y) < s &&
            Math.abs(this._z) < s
        );
    }

    static reflect(v, n) {
        return v.subtract(n.multiply(2 * v.dot(n)));
    }

    static refract(uv, n, etai_over_etat) {
        let cos_theta = Math.min(uv.negate.dot(n), 1.0);
        let r_out_perp = uv.add(n.multiply(cos_theta)).multiply(etai_over_etat);
        let r_out_parallel = n.multiply(
            -Math.sqrt(Math.abs(1.0 - r_out_perp.squaredLength))
        );
        return r_out_perp.add(r_out_parallel);
    }

    static random() {
        return new Vec3(random_double(), random_double(), random_double());
    }

    static randomMinMax(min, max) {
        return new Vec3(
            random_double_mm(min, max),
            random_double_mm(min, max),
            random_double_mm(min, max)
        );
    }

    static randomInUnitSphere() {
        while (true) {
            const p = Vec3.randomMinMax(-1, 1);
            if (p.squaredLength >= 1) continue;
            return p;
        }
    }

    static random_unit_vector() {
        return Vec3.randomInUnitSphere().unit;
    }

    static randomInHemisphere(normal) {
        const in_unit_sphere = Vec3.randomInUnitSphere();
        if (in_unit_sphere.dot(normal) > 0) {
            return in_unit_sphere;
        } else {
            return in_unit_sphere.negate;
        }
    }

    static random_in_unit_disk() {
        while (true) {
            const p = new Vec3(
                random_double_mm(-1, 1),
                random_double_mm(-1, 1),
                0
            );
            if (p.squaredLength >= 1) {
                continue;
            } else {
                return p;
            }
        }
    }
}
