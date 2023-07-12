class Sphere extends Hittable {
    constructor(center, radius, material) {
        super();
        this._center = center;
        this._radius = radius;
        this._material = material;
    }

    get center() {
        return this._center;
    }
    get radius() {
        return this._radius;
    }
    get material() {
        return this._material;
    }

    set material(mat) {
        return (this._material = mat);
    }
    set center(value) {
        this._center = value;
    }
    set radius(value) {
        this._radius = value;
    }

    hit(r, ray_t, rec) {
        const oc = r.origin.subtract(this.center);
        const a = r.direction.dot(r.direction);
        const half_b = oc.dot(r.direction);
        const c = oc.squaredLength - this._radius * this._radius;
        const discriminant = half_b * half_b - a * c;

        if (discriminant < 0) {
            return false;
        }

        const sqrtd = Math.sqrt(discriminant);
        let root = (-half_b - sqrtd) / a;
        if (!ray_t.surrounds(root)) {
            root = (-half_b + sqrtd) / a;
            if (!ray_t.surrounds(root)) {
                return false;
            }
        }

        rec.t = root;
        rec.p = r.pointAt(rec.t);
        const outward_normal = rec.p
            .subtract(this._center)
            .divide(this._radius);
        rec.set_face_normal(r, outward_normal);
        rec.material = this._material;
        return true;

        // if (discriminant > 0) {
        //     let temp = (-b - Math.sqrt(discriminant)) / a;
        //     if (temp < ray_t.max && temp > ray_t.min) {
        //         rec.t = temp;
        //         rec.p = r.pointAt(rec.t);
        //         const outward_normal = rec.p
        //             .subtract(this._center)
        //             .divide(this._radius);
        //         rec.set_face_normal(r, outward_normal);
        //         rec.material = this._material;
        //         return true;
        //     }
        //     temp = (-b + Math.sqrt(discriminant)) / a;
        //     if (temp < ray_t.max && temp > ray_t.min) {
        //         rec.t = temp;
        //         rec.p = r.pointAt(rec.t);
        //         const outward_normal = rec.p
        //             .subtract(this._center)
        //             .divide(this._radius);
        //         rec.set_face_normal(r, outward_normal);
        //         rec.material = this._material;
        //         return true;
        //     }
        // }

        // return false;
    }
}
