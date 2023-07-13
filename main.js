function ray_color(r, world, depth) {
    if (depth <= 0) {
        return new Vec3(0, 0, 0);
    }
    const rec = new HitRecord();
    if (world.hit(r, new Interval(0.001, Infinity), rec)) {
        let scattered = new Ray(new Vec3(0, 0, 0), new Vec3(0, 0, 0));
        let attenuation = new Vec3(0, 0, 0);

        if (rec.material.scatter(r, rec, attenuation, scattered)) {
            const color = ray_color(scattered, world, depth - 1);

            return new Vec3(
                attenuation.x * color.x,
                attenuation.y * color.y,
                attenuation.z * color.z
            );
        }

        return new Vec3(0, 0, 0);
    }

    let unit_direction = r.direction.unit;
    t = 0.5 * (unit_direction.y + 1.0);
    let white = new Vec3(1.0, 1.0, 1.0);
    let blue = new Vec3(0.5, 0.7, 1.0);

    return white.multiply(1.0 - t).add(blue.multiply(t));
}

async function render() {
    const aspect_ratio = 16.0 / 9.0;
    const width = 512;
    const height = width / aspect_ratio;
    const samples_per_pixel = 50;
    const max_depth = 12;

    //canvas
    const canvas = document.getElementById("main_canvas");
    canvas.setAttribute("width", width);
    canvas.setAttribute("height", height);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);

    //world
    let world = new HittableList();

    let material_ground = new Lambertian(new Vec3(0.8, 0.8, 0.0));
    let material_center = new Lambertian(new Vec3(1, 0.1, 0.1));
    let material_left = new Metal(new Vec3(0.8, 0.8, 0.8), 0.3);
    let material_right = new Metal(new Vec3(0.8, 0.6, 0.2), 1.0);
    let material_dielectric = new Dielectric(1.5);

    world.add(new Sphere(new Vec3(0, -100.5, -1), 100, material_ground));
    world.add(new Sphere(new Vec3(0, 0, -1), 0.5, material_center));
    world.add(new Sphere(new Vec3(-1.0, 0.0, -1.0), 0.5, material_dielectric));
    world.add(new Sphere(new Vec3(-1.0, 0.0, -1.0), -0.4, material_dielectric));
    world.add(new Sphere(new Vec3(1.0, 0.0, -1.0), 0.5, material_right));

    //camera
    const cam = new Camera(
        new Vec3(-2, 2, 1),
        new Vec3(0, 0, -1),
        new Vec3(0, 1, 0),
        20
    );

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
