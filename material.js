class Material {
    scatter(r_in, rec, attenuation, scattered) {
        throw new Error("Scatter method must be implemented in subclass");
    }

    emitted(u, v, p) {
        return new Vec3(0, 0, 0);
    }
}
