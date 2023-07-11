class Metal extends Material {
    constructor(albedo, fuzz) {
        super();
        this._albedo = albedo;
        this._fuzz = fuzz < 1 ? fuzz : 1;
    }

    get albedo() {
        return this._albedo;
    }
    set albedo(val) {
        this._albedo = val;
    }

    scatter(r_in, rec, attenuation, scattered) {
        const reflected = Vec3.reflect(r_in.direction, rec.normal);
        scattered.origin = rec.p;
        scattered.direction = reflected.add(
            Vec3.randomInUnitSphere().multiply(this._fuzz)
        );

        attenuation.x = this._albedo.x;
        attenuation.y = this._albedo.y;
        attenuation.z = this._albedo.z;

        return scattered.direction.dot(rec.normal) > 0;
    }
}
