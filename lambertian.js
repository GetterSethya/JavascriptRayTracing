class Lambertian extends Material {
    constructor(a) {
        super();
        if (a instanceof Texture) {
            this._albedo = a;
        } else {
            this._albedo = new SolidColor(a);
        }
    }

    scatter(r_in, rec, attenuation, scattered) {
        let scatter_direction = rec.normal.add(Vec3.random_unit_vector());

        if (scatter_direction.near_zero()) {
            scatter_direction = rec.normal;
        }
        scattered.origin = rec.p;
        scattered.direction = scatter_direction;
        scattered.time = r_in.time;
        const colval = this._albedo.value(rec.u, rec.v, rec.p);
        attenuation.x = colval.x;
        attenuation.y = colval.y;
        attenuation.z = colval.z;

        // console.log(attenuation);
        return true;
    }
}
