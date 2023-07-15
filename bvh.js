class BVHNode extends Hittable {
    constructor(srcObjects) {
        super();
        this._left = null;
        this._right = null;
        this._bbox = null;

        const objects = Array.from(srcObjects);
        const axis = random_int(0, 2);

        function compare(a, b) {
            if (axis === 0) {
                return BVHNode.box_x_compare(a, b);
            } else if (axis === 1) {
                return BVHNode.box_y_compare(a, b);
            } else {
                return BVHNode.box_z_compare(a, b);
            }
        }

        const objectSpan = objects.length;

        if (objectSpan === 1) {
            this._left = this._right = objects[0];
        } else if (objectSpan === 2) {
            if (compare(objects[0], objects[1]) < 0) {
                this._left = objects[0];
                this._right = objects[1];
            } else {
                this._left = objects[1];
                this._right = objects[0];
            }
        } else if (objectSpan > 2) {
            objects.sort(compare);
            const mid = Math.floor(objectSpan / 2);
            this._left = new BVHNode(objects.slice(0, mid));
            this._right = new BVHNode(objects.slice(mid));
        }

        this._bbox = AABB.merge(
            this._left ? this._left.bounding_box() : null,
            this._right ? this._right.bounding_box() : null
        );
    }

    hit(r, ray_t, rec) {
        if (!this._bbox.hit(r, ray_t)) {
            return false;
        }

        const hitLeft = this._left ? this._left.hit(r, ray_t, rec) : false;
        const hitRight = this._right
            ? this._right.hit(
                  r,
                  new Interval(ray_t.min, hitLeft ? rec.t : ray_t.max),
                  rec
              )
            : false;

        return hitLeft || hitRight;
    }

    bounding_box() {
        return this._bbox;
    }

    static box_compare(a, b, axisIndex) {
        return (
            a.bounding_box().axis(axisIndex).min <
            b.bounding_box().axis(axisIndex).min
        );
    }

    static box_x_compare(a, b) {
        return BVHNode.box_compare(a, b, 0);
    }

    static box_y_compare(a, b) {
        return BVHNode.box_compare(a, b, 1);
    }

    static box_z_compare(a, b) {
        return BVHNode.box_compare(a, b, 2);
    }
}
