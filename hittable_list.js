class HittableList extends Hittable {
    constructor() {
        super();
        this._objects = [];
    }

    get objects() {
        return this._objects;
    }

    set objects(obj) {
        this._objects = obj;
    }

    add(obj) {
        this._objects.push(obj);
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
