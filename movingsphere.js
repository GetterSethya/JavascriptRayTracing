class MovingSphere extends Sphere {
    constructor(center1, center2, radius, material) {
        super(center1, radius, material);
        this._center2 = center2;
        this._centerVec = this._center2.subtract(this._center);
        this._isMoving = true;
        this._box1 = AABB.fromPoints(
            this._center.subtract(this._rvec),
            this._center.add(this._rvec)
        );
        this._box2 = AABB.fromPoints(
            this._center2.subtract(this._rvec),
            this._center2.add(this._rvec)
        );

        this._bbox = AABB.merge(this._box1, this._box2);
    }

    center(time) {
        return this._center.add(this._centerVec.multiply(time));
    }

    hit(r, ray_t, rec) {
        const center = this._isMoving ? this.center(r.time) : this._center;
        const oc = r.origin.subtract(center);
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
    }
}
