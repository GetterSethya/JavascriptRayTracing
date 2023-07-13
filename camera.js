class Camera {
    constructor(lookfrom, lookat, vup, vfov = 40) {
        this._lookfrom = lookfrom;
        this._lookat = lookat;
        this._vup = vup;
        this._vfov = vfov;
        const aspect_ratio = 16.0 / 9.0;
        const theta = degrees_to_radians(this._vfov);
        const h = Math.tan(theta / 2);

        const viewport_height = 2.0 * h;
        const viewport_width = aspect_ratio * viewport_height;
        const focal_length = 1.0;

        const w = this._lookfrom.subtract(this._lookat).unit;
        const u = this._vup.cross(w).unit;
        const v = w.cross(u);

        this._origin = this._lookfrom;
        this._horizontal = u.multiply(viewport_width);
        this._vertical = v.multiply(viewport_height);
        this._lower_left_corner = this._origin
            .subtract(this._horizontal.multiply(0.5))
            .subtract(this._vertical.multiply(0.5))
            .subtract(w);
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
        return new Ray(
            this._origin,
            this._lower_left_corner
                .add(this._horizontal.multiply(s))
                .add(this._vertical.multiply(t))
                .subtract(this._origin)
        );
    }
}
