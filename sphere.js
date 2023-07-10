class Sphere extends Hittable {
    constructor(center, radius) {
        super();
        this._center = center;
        this._radius = radius;
    }

    get center() {
        return this._center;
    }
    get radius() {
        return this._radius;
    }

    set center(value) {
        this._center = value;
    }
    set radius(value) {
        this._radius = value;
    }

    hit(r, t_min, t_max, rec) {
        const oc = r.origin.subtract(this.center);
        const a = r.direction.dot(r.direction);
        const b = oc.dot(r.direction);
        const c = oc.dot(oc) - this.radius * this.radius;
        const discriminant = b * b - a * c;

        if (discriminant > 0) {
            let temp = (-b - Math.sqrt(discriminant)) / a;
            if (temp < t_max && temp > t_min) {
                rec.t = temp;
                rec.p = r.pointAt(rec.t);
                const outward_normal = rec.p
                    .subtract(this._center)
                    .divide(this._radius);
                rec.set_face_normal(r, outward_normal);
                return true;
            }
            temp = (-b + Math.sqrt(discriminant)) / a;
            if (temp < t_max && temp > t_min) {
                rec.t = temp;
                rec.p = r.pointAt(rec.t);
                const outward_normal = rec.p
                    .subtract(this._center)
                    .divide(this._radius);

                rec.set_face_normal(r, outward_normal);
                return true;
            }
        }

        return false;
    }
}
