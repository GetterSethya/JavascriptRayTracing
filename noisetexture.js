class NoiseTexture extends Texture {
    constructor(scale) {
        super();
        this._noise = new Perlin();
        this._scale = scale;
    }

    value(u, v, p) {
        const s = p.multiply(this._scale);
        const vec = new Vec3(1, 1, 1).multiply(
            0.5 * (1 + Math.sin(s.z + 10 * this._noise.turb(s)))
        );
        // console.log(vec);
        return vec;
    }
}
