// function ray_color(r, world, depth, background = new Vec3(0, 0, 0)) {
//     if (depth <= 0) {
//         return new Vec3(0, 0, 0);
//     }
//     const rec = new HitRecord();

//     if (world.hit(r, new Interval(0.001, Infinity), rec)) {
//         let scattered = new Ray(new Vec3(0, 0, 0), new Vec3(0, 0, 0));
//         let attenuation = new Vec3(0, 0, 0);

//         if (rec.material.scatter(r, rec, attenuation, scattered)) {
//             const color = ray_color(scattered, world, depth - 1);

//             return new Vec3(
//                 attenuation.x * color.x,
//                 attenuation.y * color.y,
//                 attenuation.z * color.z
//             );
//         }

//         return new Vec3(0, 0, 0);
//     }

//     let unit_direction = r.direction.unit;
//     t = 0.5 * (unit_direction.y + 1.0);
//     let white = new Vec3(1.0, 1.0, 1.0);
//     let blue = new Vec3(0.5, 0.7, 1.0);

//     return white.multiply(1.0 - t).add(blue.multiply(t));
// }

function ray_color(r, world, depth) {
    if (depth <= 0) {
        return new Vec3(0, 0, 0);
    }
    const rec = new HitRecord();
    const bg = new Vec3(0, 0, 0);

    if (world.hit(r, new Interval(0.001, Infinity), rec)) {
        let scattered = new Ray(new Vec3(0, 0, 0), new Vec3(0, 0, 0));
        let attenuation = new Vec3(0, 0, 0);
        const color_from_emission = rec.material.emitted(rec.u, rec.v, rec.p);

        if (rec.material.scatter(r, rec, attenuation, scattered)) {
            const color = ray_color(scattered, world, depth - 1);
            const color_from_scatter = new Vec3(
                attenuation.x * color.x,
                attenuation.y * color.y,
                attenuation.z * color.z
            );

            return color_from_emission.add(color_from_scatter);
        } else {
            return color_from_emission;
        }
    } else {
        let unit_direction = r.direction.unit;
        t = 0.5 * (unit_direction.y + 1.0);
        let white = new Vec3(1.0, 1.0, 1.0);
        let blue = new Vec3(0.5, 0.7, 1.0);

        return new Vec3(0.5, 0.5, 0.5);
    }
}

function random_scene() {
    let world = new HittableList();

    const solidColor1 = new Vec3(0.2, 0.3, 0.1);
    const solidColor2 = new Vec3(0.9, 0.9, 0.9);
    const checkertexture = new CheckerTexture(
        1.0,
        new SolidColor(solidColor1),
        new SolidColor(solidColor2)
    );
    const checkermaterial = new Lambertian(checkertexture);

    const ground_material = new Lambertian(new Vec3(0.5, 0.5, 0.5));
    world.add(new Sphere(new Vec3(0, -1000, 0), 1000, checkermaterial));

    // for (let a = -5; a < 5; a++) {
    //     for (let b = -5; b < 5; b++) {
    //         const chose_mat = random_double();
    //         const center = new Vec3(
    //             a + 0.9 * random_double(),
    //             0.2,
    //             b + 0.9 * random_double()
    //         );

    //         if (new Vec3(4, 0.2, 0).subtract(center).length > 0.9) {
    //             let sphere_material;

    //             if (chose_mat < 0.8) {
    //                 const albedo = Vec3.random().multiply(Vec3.random());
    //                 sphere_material = new Lambertian(albedo);
    //                 world.add(new Sphere(center, 0.2, sphere_material));
    //             } else if (chose_mat < 0.95) {
    //                 const albedo = Vec3.randomMinMax(0.5, 1);
    //                 const fuzz = random_double_mm(0, 0.5);
    //                 sphere_material = new Metal(albedo, fuzz);
    //                 world.add(new Sphere(center, 0.2, sphere_material));
    //             } else {
    //                 sphere_material = new Dielectric(1.5);
    //                 world.add(new Sphere(center, 0.2, sphere_material));
    //             }
    //         }
    //     }
    // }

    const diff_light = new DiffuseLight(new Vec3(4, 4, 4));

    const center = new Vec3(4, 1, 0);
    const center2 = new Vec3(0.0, random_double_mm(0.0, 0.5, 0.0));
    const perlin_noise = new NoiseTexture(4);
    const material_perlin = new Lambertian(perlin_noise);

    const material1 = new Dielectric(1.5);
    world.add(new Sphere(new Vec3(0, 1, 0), 1.0, diff_light));

    const material2 = new Lambertian(new Vec3(0.4, 0.2, 0.1));
    world.add(new Sphere(new Vec3(-4, 1, 0), 1.0, material2));

    const material3 = new Metal(new Vec3(0.7, 0.6, 0.5), 0.0);
    world.add(new Sphere(center, 1.0, material_perlin));

    const left_red = new Lambertian(new Vec3(1.0, 0.2, 0.2));
    const back_green = new Lambertian(new Vec3(0.2, 1.0, 0.2));
    const right_blue = new Lambertian(new Vec3(0.2, 0.2, 1.0));
    const upper_orange = new Lambertian(new Vec3(1.0, 0.5, 0.0));
    const lower_teal = new Lambertian(new Vec3(0.2, 0.8, 0.8));

    const q1 = new Quad(
        new Vec3(-3, -2, 5),
        new Vec3(0, 0, -4),
        new Vec3(0, 4, 0),
        left_red
    );

    const q2 = new Quad(
        new Vec3(-2, -2, 0),
        new Vec3(4, 0, 0),
        new Vec3(0, 4, 0),
        back_green
    );

    const q3 = new Quad(
        new Vec3(3, -2, 1),
        new Vec3(0, 0, 4),
        new Vec3(0, 4, 0),
        right_blue
    );

    const q4 = new Quad(
        new Vec3(-2, 3, 1),
        new Vec3(4, 0, 0),
        new Vec3(0, 0, 4),
        upper_orange
    );

    const q5 = new Quad(
        new Vec3(-2, -3, 5),
        new Vec3(4, 0, 0),
        new Vec3(0, 0, -4),
        lower_teal
    );

    // world.add(q1);
    // world.add(q2);
    // world.add(q3);
    // world.add(q4);
    // world.add(q5);

    const qlight = new Quad(
        new Vec3(3, 1, -2),
        new Vec3(2, 0, 0),
        new Vec3(0, 2, 0),
        diff_light
    );

    world.add(qlight);

    // world = new HittableList(new BVHNode(world));
    // console.log(world);
    return world;
}

async function render() {
    const aspect_ratio = 16.0 / 9.0;
    const width = 512;
    const height = width / aspect_ratio;
    const samples_per_pixel = 50;
    const max_depth = 6;

    //canvas
    const canvas = document.getElementById("main_canvas");
    canvas.setAttribute("width", width);
    canvas.setAttribute("height", height);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);

    //world
    let world = random_scene();

    // let material_ground = new Lambertian(new Vec3(0.8, 0.8, 0.0));
    // let material_center = new Lambertian(new Vec3(1, 0.1, 0.1));
    // let material_left = new Metal(new Vec3(0.8, 0.8, 0.8), 0.3);
    // let material_right = new Metal(new Vec3(0.8, 0.6, 0.2), 0.02);
    // let material_dielectric = new Dielectric(1.5);

    // world.add(new Sphere(new Vec3(0, -100.5, -1), 100, material_ground));
    // world.add(new Sphere(new Vec3(0, 0, -1), 0.5, material_center));
    // world.add(new Sphere(new Vec3(-1.0, 0.0, -1.0), 0.5, material_dielectric));
    // world.add(new Sphere(new Vec3(-1.0, 0.0, -1.0), -0.4, material_dielectric));
    // world.add(new Sphere(new Vec3(1.0, 0.0, -1.0), 0.5, material_right));

    //camera
    const lookfrom = new Vec3(13, 2, 3);
    const lookat = new Vec3(0, 0, 0);
    const vup = new Vec3(0, 1, 0);
    const dist_to_focus = 10.0;
    const aperture = 0.05;

    // const lookfrom = new Vec3(0, 0, 10);
    // const lookat = new Vec3(0, 0, 0);
    // const vup = new Vec3(0, 1, 0);
    // const dist_to_focus = 10.0;
    // const aperture = 0.05;

    const cam = new Camera(lookfrom, lookat, vup, 20, aperture, dist_to_focus);

    let imageData = new ImageData(width, height);
    let arrppm = [];

    let j = height - 1;
    let ppm_body = "";

    function renderChunk() {
        for (let i = 0; i < width; i++) {
            let pixel_color = new Vec3(0, 0, 0);

            for (let s = 0; s < samples_per_pixel; s++) {
                const u = (i + random_double()) / (width - 1);
                const v = (j + random_double()) / (height - 1);
                const r = cam.get_ray(u, v);
                pixel_color = pixel_color.add(ray_color(r, world, max_depth));
            }
            const scale = 1.0 / samples_per_pixel;
            const scaled_color = pixel_color.multiply(scale);

            const ir = Math.floor(
                255.999 * clamp(Math.sqrt(scaled_color.x), 0.0, 0.999)
            );
            const ig = Math.floor(
                255.999 * clamp(Math.sqrt(scaled_color.y), 0.0, 0.999)
            );
            const ib = Math.floor(
                255.999 * clamp(Math.sqrt(scaled_color.z), 0.0, 0.999)
            );

            ppm_body += `${ir} ${ig} ${ib}\n`;
        }

        j--;

        if (ppm_body.length >= 5000 && j >= 0) {
            updateCanvas(ppm_body);
            ppm_body = "";
            setTimeout(renderChunk, 0);
        } else if (j < 0) {
            updateCanvas(ppm_body);
        }
    }

    function updateCanvas(ppmData) {
        ppmData = ppmData.trim().split("\n");
        for (let index = 0; index < ppmData.length; index++) {
            arrppm.push(
                parseFloat(ppmData[index].split(" ")[0]),
                parseFloat(ppmData[index].split(" ")[1]),
                parseFloat(ppmData[index].split(" ")[2]),
                255
            );
        }

        for (let data = 0; data < imageData.data.length; data++) {
            imageData.data[data] = arrppm[data];
        }

        ctx.putImageData(imageData, 0, 0);
    }

    renderChunk();
}

render();
