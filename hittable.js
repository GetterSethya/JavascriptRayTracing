class Hittable {
    hit(r, ray_t, rec) {
        throw new Error("Hit method not implemented in subclass");
    }
    bounding_box() {
        throw new Error("Hit method not implemented in subclass");
    }
}
