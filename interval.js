class Interval {
    constructor(min = Infinity, max = -Infinity) {
        this._min = min;
        this._max = max;
    }

    get min() {
        return this._min;
    }
    get max() {
        return this._max;
    }

    set min(value) {
        this._min = value;
    }
    set max(value) {
        this._max = value;
    }

    contains(x) {
        return this._min <= x && x <= this._max;
    }

    surrounds(x) {
        return this._min < x && x < this._max;
    }

    static empty() {
        return new Interval(Infinity, -Infinity);
    }

    static universe() {
        return new Interval(-Infinity, Infinity);
    }
}
