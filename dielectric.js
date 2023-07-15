class Dielectric extends Material {
    constructor(index_of_refraction) {
        super();
        this._index_of_refraction = index_of_refraction;
    }

    get ior() {
        return this._index_of_refraction;
    }
    set ior(value) {
        this._index_of_refraction = value;
    }

    scatter(r_in, rec, attenuation, scattered) {
        attenuation.x = 1.0;
        attenuation.y = 1.0;
        attenuation.z = 1.0;

        const refraction_ratio = rec.front_face
            ? 1.0 / this._index_of_refraction
            : this._index_of_refraction;

        const unit_direction = r_in.direction.unit;
        const cos_theta = Math.min(unit_direction.negate.dot(rec.normal), 1.0);
        const sin_theta = Math.sqrt(1.0 - cos_theta * cos_theta);
        const cannot_refract = refraction_ratio * sin_theta > 1.0;

        scattered.origin = rec.p;
        if (
            cannot_refract ||
            Dielectric.reflectance(cos_theta, refraction_ratio) >
                random_double()
        ) {
            scattered.direction = Vec3.reflect(unit_direction, rec.normal);
        } else {
            scattered.direction = Vec3.refract(
                unit_direction,
                rec.normal,
                refraction_ratio
            );
        }

        scattered.time = r_in.time;

        return true;
    }

    static reflectance(cosine, ref_idx) {
        let r0 = (1 - ref_idx) / (1 + ref_idx);
        r0 = r0 * r0;

        return r0 + (1 - r0) * Math.pow(1 - cosine, 5);
    }
}
