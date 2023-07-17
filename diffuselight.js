class DiffuseLight extends Material {
    constructor(color) {
        super();
        if (color instanceof Texture) {
            this._emit = color;
        } else {
            this._emit = new SolidColor(color);
        }
    }

    get emit() {
        return this._emit;
    }
    set emit(value) {
        this._emit = value;
    }

    scatter(r_in, rec, attenuation, scattered) {
        return false;
    }

    emitted(u, v, p) {
        return this._emit.value(u, v, p);
    }
}
