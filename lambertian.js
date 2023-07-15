class Lambertian extends Material {
    constructor(albedo) {
        super();
        this._albedo = albedo;
    }

    scatter(r_in, rec, attenuation, scattered) {
        let scatter_direction = rec.normal.add(Vec3.random_unit_vector());

        if (scatter_direction.near_zero()) {
            scatter_direction = rec.normal;
        }
        scattered.origin = rec.p;
        scattered.direction = scatter_direction;
        scattered.time = r_in.time;
        attenuation.x = this._albedo.x;
        attenuation.y = this._albedo.y;
        attenuation.z = this._albedo.z;

        // console.log(attenuation);
        return true;
    }
}
