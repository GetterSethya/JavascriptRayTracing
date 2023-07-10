class Camera {
    constructor() {
        const aspect_ratio = 16.0 / 9.0;
        const viewport_height = 2.0;
        const viewport_width = aspect_ratio * viewport_height;
        const focal_length = 1.0;

        this._origin = new Vec3(0, 0, 0);
        this._horizontal = new Vec3(viewport_width, 0.0, 0.0);
        this._vertical = new Vec3(0.0, viewport_height, 0.0);
        this._lower_left_corner = this._origin
            .subtract(this._horizontal.multiply(0.5))
            .subtract(this._vertical.multiply(0.5))
            .subtract(new Vec3(0, 0, focal_length));
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

    set origin(vector) {
        this._origin = vector;
    }

    get_ray(u, v) {
        return new Ray(
            this._origin,
            this._lower_left_corner
                .add(this._horizontal.multiply(u))
                .add(this._vertical.multiply(v))
                .subtract(this._origin)
        );
    }
}
