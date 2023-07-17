class CheckerTexture extends Texture {
    constructor(scale, even, odd) {
        super();
        this._scale = scale;
        this._invScale = 1.0 / scale;
        this._even = even;
        this._odd = odd;
    }

    value(u, v, p) {
        const xInteger = Math.floor(this._invScale * p.x);
        const yInteger = Math.floor(this._invScale * p.y);
        const zInteger = Math.floor(this._invScale * p.z);
        const isEven = (xInteger + yInteger + zInteger) % 2 === 0;

        return isEven ? this._even.value(u, v, p) : this._odd.value(u, v, p);
    }
}
