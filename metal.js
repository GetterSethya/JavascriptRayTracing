class Metal extends Material {
    constructor(albedo) {
        super();
        this._albedo = albedo;
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
        scattered.direction = reflected;
        attenuation.x = this._albedo.x;
        attenuation.y = this._albedo.y;
        attenuation.z = this._albedo.z;

        return scattered.direction.dot(rec.normal) > 0;
    }
}
