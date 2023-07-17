class SolidColor extends Texture {
    constructor(colorValue) {
        super();
        this._colorValue = colorValue;
    }

    value(u, v, p) {
        return this._colorValue;
    }
}
