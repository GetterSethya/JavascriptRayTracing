// class Perlin {
//     constructor() {
//         this._point_count = 256;
//         this._ranvec = new Array(this._point_count);
//         for (let i = 0; i < this._point_count; i++) {
//             this._ranvec[i] = Vec3.randomMinMax(-1, 1).unit;
//         }

//         this._perm_x = this.perlin_generate_perm();
//         this._perm_y = this.perlin_generate_perm();
//         this._perm_z = this.perlin_generate_perm();
//     }

//     noise(p) {
//         const u = p.x - Math.floor(p.x);
//         const v = p.y - Math.floor(p.y);
//         const w = p.z - Math.floor(p.z);

//         // const i = Math.floor(4 * p.x) & 255;
//         // const j = Math.floor(4 * p.y) & 255;
//         // const k = Math.floor(4 * p.z) & 255;

//         const i = Math.floor(p.x);
//         const j = Math.floor(p.y);
//         const k = Math.floor(p.z);
//         const c = new Array(2)
//             .fill(null)
//             .map(() =>
//                 new Array(2).fill(null).map(() => new Array(2).fill(null))
//             );
//         for (let di = 0; di < 2; di++) {
//             for (let dj = 0; dj < 2; dj++) {
//                 for (let dk = 0; dk < 2; dk++) {
//                     const index =
//                         this._perm_x[(i + di) & 255] ^
//                         this._perm_y[(j + dj) & 255] ^
//                         this._perm_z[(k + dk) & 255];
//                     c[di][dj][dk] = this._ranvec[index];
//                 }
//             }
//         }

//         return Perlin.perlin_interp(c, u, v, w);
//     }

//     perlin_generate_perm() {
//         const p = new Array(this._point_count);
//         for (let i = 0; i < this._point_count; i++) {
//             p[i] = i;
//         }

//         Perlin.permute(p, this._point_count);

//         return p;
//     }

//     static trilinear_interp(c, u, v, w) {
//         let accum = 0.0;
//         for (let i = 0; i < 2; i++) {
//             for (let j = 0; j < 2; j++) {
//                 for (let k = 0; k < 2; k++) {
//                     accum +=
//                         (i * u + (1 - i) * (1 - u)) *
//                         (j * v + (1 - j) * (1 - v)) *
//                         (k * w + (1 - k) * (1 - w)) *
//                         c[i][j][k];
//                 }
//             }
//         }

//         return accum;
//     }

//     static perlin_interp(c, u, v, w) {
//         const uu = u * u * (3 - 2 * u);
//         const vv = v * v * (3 - 2 * v);
//         const ww = w * w * (3 - 2 * w);
//         let accum = 0.0;

//         for (let i = 0; i < 2; i++) {
//             for (let j = 0; j < 2; j++) {
//                 for (let k = 0; k < 2; k++) {
//                     const weight_v = new Vec3(u - i, v - j, w - k);
//                     accum +=
//                         (i * uu + (1 - i) * (1 - uu)) *
//                         (j * vv + (1 + j) * (1 - vv)) *
//                         (k * ww + (1 - k) * (1 - ww)) *
//                         weight_v.dot(c[i][j][k]);
//                 }
//             }
//         }
//         return accum;
//     }

//     static permute(p, n) {
//         for (let i = n - 1; i > 0; i--) {
//             const target = random_int(0, i);
//             const tmp = p[i];
//             p[i] = p[target];
//             p[target] = tmp;
//         }
//     }
// }

class Perlin {
    constructor() {
        this._point_count = 256;
        this._ranvec = new Array(this._point_count);
        this._perm_x = this.perlinGeneratePerm();
        this._perm_y = this.perlinGeneratePerm();
        this._perm_z = this.perlinGeneratePerm();

        for (let i = 0; i < this._point_count; i++) {
            this._ranvec[i] = Vec3.randomMinMax(-1, 1).unit;
        }
    }

    perlinGeneratePerm() {
        const perm = new Array(this._point_count);
        for (let i = 0; i < this._point_count; i++) {
            perm[i] = i;
        }
        this.permute(perm, this._point_count);
        return perm;
    }

    permute(array, n) {
        for (let i = n - 1; i > 0; --i) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    noise(p) {
        const u = p.x - Math.floor(p.x);
        const v = p.y - Math.floor(p.y);
        const w = p.z - Math.floor(p.z);
        const i = Math.floor(p.x);
        const j = Math.floor(p.y);
        const k = Math.floor(p.z);
        const c = new Array(2)
            .fill(null)
            .map(() => new Array(2).fill(null).map(() => new Array(2)));

        for (let di = 0; di < 2; ++di) {
            for (let dj = 0; dj < 2; ++dj) {
                for (let dk = 0; dk < 2; ++dk) {
                    c[di][dj][dk] =
                        this._ranvec[
                            this._perm_x[(i + di) & 255] ^
                                this._perm_y[(j + dj) & 255] ^
                                this._perm_z[(k + dk) & 255]
                        ];
                }
            }
        }

        return this.perlinInterp(c, u, v, w);
    }

    perlinInterp(c, u, v, w) {
        const uu = u * u * (3 - 2 * u);
        const vv = v * v * (3 - 2 * v);
        const ww = w * w * (3 - 2 * w);

        let accum = 0;

        for (let i = 0; i < 2; ++i) {
            for (let j = 0; j < 2; ++j) {
                for (let k = 0; k < 2; ++k) {
                    const weightV = new Vec3(u - i, v - j, w - k);
                    accum +=
                        (i * uu + (1 - i) * (1 - uu)) *
                        (j * vv + (1 - j) * (1 - vv)) *
                        (k * ww + (1 - k) * (1 - ww)) *
                        c[i][j][k].dot(weightV);
                }
            }
        }

        return accum;
    }

    delete() {
        delete this._ranvec;
        delete this._perm_x;
        delete this._perm_y;
        delete this._perm_z;
    }

    turb(p, depth = 7) {
        let accum = 0.0;
        let temp_p = p;
        let weight = 1.0;

        for (let i = 0; i < depth; i++) {
            accum += weight * this.noise(temp_p);
            weight *= 0.5;
            temp_p.multiply(2);
        }

        return Math.abs(accum);
    }
}
