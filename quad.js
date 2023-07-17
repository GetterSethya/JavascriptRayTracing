class Quad extends Hittable {
    constructor(q, u, v, mat) {
        super();
        this._q = q;
        this._u = u;
        this._v = v;
        this._material = mat;
        this._bbox = this.set_bounding_box();

        const n = u.cross(v);

        this._normal = n.unit;
        this._d = this._normal.dot(this._q);
        this._w = n.divide(n.dot(n));
    }

    get q() {
        return this._q;
    }
    get u() {
        return this._u;
    }
    get v() {
        return this._v;
    }
    get mat() {
        return this._material;
    }

    set q(q) {
        this._q = q;
    }
    set u(u) {
        this._u = u;
    }
    set v(v) {
        this._v = v;
    }
    set mat(mat) {
        this._material = mat;
    }

    set_bounding_box() {
        return AABB.fromPoints(
            this._q,
            this._q.add(this._u).add(this._v)
        ).pad();
    }

    bounding_box() {
        return this._bbox;
    }

    hit(r, ray_t, rec) {
        const denom = this._normal.dot(r.direction);

        if (Math.abs(denom) < 1e-8) {
            return false;
        }

        const t = (this._d - this._normal.dot(r.origin)) / denom;

        if (!ray_t.contains(t)) {
            return false;
        }

        const intersection = r.pointAt(t);
        const planar_hitpt_vector = intersection.subtract(this._q);
        const alpha = this._w.dot(planar_hitpt_vector.cross(this._v));
        const beta = this._w.dot(this._u.cross(planar_hitpt_vector));

        if (!this.is_interior(alpha, beta, rec)) {
            return false;
        }

        rec.t = t;
        rec.p = intersection;
        rec.material = this._material;
        rec.set_face_normal(r, this._normal);

        return true;
    }

    is_interior(a, b, rec) {
        if (a < 0 || 1 < a || b < 0 || 1 < b) {
            return false;
        }

        rec.u = a;
        rec.v = b;
        return true;
    }
}
