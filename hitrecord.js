class HitRecord {
    constructor() {
        this._p;
        this._normal;
        this._t;
        this._front_face;
        this._material;
    }

    get p() {
        return this._p;
    }
    get normal() {
        return this._normal;
    }
    get t() {
        return this._t;
    }

    get front_face() {
        return this._front_face;
    }

    get material() {
        return this._material;
    }

    set material(mat) {
        this._material = mat;
    }

    set front_face(value) {
        this._front_face = value;
    }

    set p(value) {
        this._p = value;
    }

    set normal(value) {
        this._normal = value;
    }

    set t(value) {
        this._t = value;
    }

    set_face_normal(r, outward_normal) {
        this._front_face = r.direction.dot(outward_normal) < 0;
        this._normal = this._front_face
            ? outward_normal
            : outward_normal.negate;
    }
}
