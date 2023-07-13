class Camera {
    constructor(lookfrom, lookat, vup, vfov = 40, aperture, focus_dist) {
        this._lookfrom = lookfrom;
        this._lookat = lookat;
        this._vup = vup;
        this._vfov = vfov;
        this._aperture = aperture;
        this._focus_dist = focus_dist;
        const aspect_ratio = 16.0 / 9.0;
        const theta = degrees_to_radians(this._vfov);
        const h = Math.tan(theta / 2);

        const viewport_height = 2.0 * h;
        const viewport_width = aspect_ratio * viewport_height;
        const focal_length = 1.0;

        this._w = this._lookfrom.subtract(this._lookat).unit;
        this._u = this._vup.cross(this._w).unit;
        this._v = this._w.cross(this._u);

        this._origin = this._lookfrom;
        this._horizontal = this._u.multiply(this._focus_dist * viewport_width);
        this._vertical = this._v.multiply(this._focus_dist * viewport_height);
        this._lower_left_corner = this._origin
            .subtract(this._horizontal.multiply(0.5))
            .subtract(this._vertical.multiply(0.5))
            .subtract(this._w.multiply(this._focus_dist));
        this._lens_radius = this._aperture / 2;
    }
    get vfov() {
        return this._vfov;
    }
    get origin() {
        return this._origin;
    }
    get horizontal() {
        return this._horizontal;
    }
    get vertical() {
        return this._vertical;
    }
    get lower_left_corner() {
        return this._lower_left_corner;
    }

    set vfov(fov) {
        this._vfov = fov;
    }

    set origin(vector) {
        this._origin = vector;
    }

    get_ray(s, t) {
        const rd = Vec3.random_in_unit_disk().multiply(this._lens_radius);
        const offset = this._u.multiply(rd.x).add(this._v.multiply(rd.y));

        return new Ray(
            this._origin.add(offset),
            this._lower_left_corner
                .add(this._horizontal.multiply(s))
                .add(this._vertical.multiply(t))
                .subtract(this._origin)
                .subtract(offset)
        );
    }
}
