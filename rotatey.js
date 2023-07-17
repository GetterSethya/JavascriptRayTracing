class RotateY extends Hittable {
    constructor(p, angle) {
        super();
        this._object = p;
        const radians = (Math.PI / 180) * angle;
        this._sinTheta = Math.sin(radians);
        this._cosTheta = Math.cos(radians);
        this._bbox = this.calculateBoundingBox();
    }

    hit(r, ray_t, rec) {
        let origin = r.origin;
        let direction = r.direction;

        origin.x = this._cosTheta * r.origin.x - this._sinTheta * r.origin.z;
        origin.z = this._sinTheta * r.origin.x + this._cosTheta * r.origin.z;

        direction.x =
            this._cosTheta * r.direction.x - this._sinTheta * r.direction.z;

        direction.z =
            this._sinTheta * r.direction.x + this._cosTheta * r.direction.z;

        const rotated_r = new Ray(origin, direction, r.time);

        if (!this._object.hit(rotated_r, ray_t, rec)) {
            return false;
        }

        const p = rec.p;
        p.x = this._cosTheta * rec.p.x + this._sinTheta * rec.p.z;
        p.z = -this._sinTheta * rec.p.x + this._cosTheta * rec.p.z;

        const normal = rec.normal;

        normal.x =
            this._cosTheta * rec.normal.x + this._sinTheta * rec.normal.z;
        normal.z =
            -this._sinTheta * rec.normal.x + this._cosTheta * rec.normal.z;

        rec.p = p;
        rec.normal = normal;

        return true;
    }

    bounding_box() {
        return this._bbox;
    }

    calculateBoundingBox() {
        let bbox = this._object.bounding_box();
        console.log(bbox);
        let min = new Vec3(Infinity, Infinity, Infinity);
        let max = new Vec3(-Infinity, -Infinity, -Infinity);

        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                for (let k = 0; k < 2; k++) {
                    const x = i * bbox.y.max + (1 - j) * bbox.x.min;
                    const y = j * bbox.y.max + (1 - j) * bbox.y.min;
                    const z = k * bbox.z.max + (1 - k) * bbox.z.min;

                    const newx = this._cosTheta * x + this._sinTheta * z;
                    const newz = -this._sinTheta * x + this._cosTheta * z;

                    const tester = new Vec3(newx, y, newz);

                    for (let c = 0; c < 3; c++) {
                        min[c] = Math.min(min[c], tester[c]);
                        max[c] = Math.max(max[c], tester[c]);
                    }
                }
            }
        }

        return AABB.fromPoints(min, max);
    }
}
