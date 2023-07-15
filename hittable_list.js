class HittableList extends Hittable {
    constructor() {
        super();
        this._objects = [];
        this._bbox = null;
    }

    get objects() {
        return this._objects;
    }

    set objects(obj) {
        this._objects = obj;
    }

    add(obj) {
        this._objects.push(obj);
        if (!this._bbox) {
            this._bbox = obj.bounding_box();
        } else {
            this._bbox = AABB.merge(this._bbox, obj.bounding_box());
        }
    }

    bounding_box() {
        return this._bbox;
    }

    clear() {
        this._objects = [];
    }

    hit(r, ray_t, rec) {
        // let temp_rec = new HitRecord();
        let hitAnything = false;
        let closestSoFar = ray_t.max;

        for (const object of this._objects) {
            if (object.hit(r, new Interval(ray_t.min, closestSoFar), rec)) {
                hitAnything = true;
                // closestSoFar = temp_rec.t;
                closestSoFar = rec.t;
                // rec = temp_rec;
            }
        }

        return hitAnything;
    }
}
