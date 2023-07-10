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

    hit(r, t_min, t_max, rec) {
        let hitAnything = false;
        let closestSoFar = t_max;

        for (const object of this._objects) {
            if (object.hit(r, t_min, closestSoFar, rec)) {
                hitAnything = true;
                closestSoFar = rec.t;
            }
        }

        return hitAnything;
    }
}
