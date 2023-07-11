class Material {
    scatter(r_in, rec, attenuation, scattered) {
        throw new Error("Scatter method must be implemented in subclass");
    }
}
