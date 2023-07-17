class Translate extends Hittable {
    constructor(obj, offset) {
        super();
        this._object = obj;
        this._offset = offset;
        this._bbox = AABB.add(obj.bounding_box(), this._offset);
    }

    get object() {
        return this._object;
    }
    get offset() {
        return this._offset;
    }

    set object(obj) {
        this._object = obj;
    }
    set offset(val) {
        this._offset = val;
    }

    hit(ray, ray_t, rec) {
        const offset_ray = new Ray(
            ray.origin.subtract(this._offset),
            ray.direction,
            ray.time
        );

        if (!this._object.hit(offset_ray, ray_t, rec)) {
            return false;
        }

        rec.p = rec.p.add(this._offset);

        return true;
    }

    bounding_box() {
        return this._bbox;
    }
}
